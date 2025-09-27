// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Stake is ReentrancyGuard {
    // Track if winnings have been paid for a market
    mapping(string => bool) public marketPaid;

    // Stake Payload structure
    struct StakePayload {
        bool choice;
        uint256 amount;
        string userId;
        string marketId;
        uint256 minAmount;
    }

    // Event for stake placement
    event StakePlaced(
        address indexed user,
        bool choice,
        uint256 amount,
        string userId,
        string marketId,
        bool success
    );

    // Event for payout
    event WinningsDistributed(
        string indexed marketId,
        bool winningChoice,
        uint256 totalWinning,
        uint256 totalLosing
    );

    struct StakeInfo {
        address staker;
        uint256 amount;
        bool choice;
        uint256 timestamp;
    }

    IERC20 public blockdagToken;

    constructor(address _blockdagToken) {
        blockdagToken = IERC20(_blockdagToken);
    }

    // Mapping from marketId to array of stakes for that market
    mapping(string => StakeInfo[]) public marketStakes;

    function placeStake(StakePayload memory payload) external nonReentrant {
        require(payload.amount >= payload.minAmount, "Stake below minimum");
        require(
            blockdagToken.balanceOf(msg.sender) >= payload.amount,
            "Insufficient token balance"
        );
        require(
            blockdagToken.allowance(msg.sender, address(this)) >=
                payload.amount,
            "Insufficient allowance"
        );

        bool sent = blockdagToken.transferFrom(
            msg.sender,
            address(this),
            payload.amount
        );
        if (!sent) {
            emit StakePlaced(
                msg.sender,
                payload.choice,
                payload.amount,
                payload.userId,
                payload.marketId,
                false
            );
            revert("Transfer failed");
        }

        marketStakes[payload.marketId].push(
            StakeInfo({
                staker: msg.sender,
                amount: payload.amount,
                choice: payload.choice,
                timestamp: block.timestamp
            })
        );

        emit StakePlaced(
            msg.sender,
            payload.choice,
            payload.amount,
            payload.userId,
            payload.marketId,
            true
        );
    }

    // Get all stakes for a market (by marketId as string)
    function getAllStakesForMarket(
        string memory marketId
    ) external view returns (StakeInfo[] memory) {
        return marketStakes[marketId];
    }

    // Get all stakes for a market with choice == true
    function getStakesByChoiceTrue(
        string memory marketId
    ) external view returns (StakeInfo[] memory) {
        StakeInfo[] memory allStakes = marketStakes[marketId];
        uint256 count = 0;
        for (uint256 i = 0; i < allStakes.length; i++) {
            if (allStakes[i].choice) {
                count++;
            }
        }
        StakeInfo[] memory result = new StakeInfo[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < allStakes.length; i++) {
            if (allStakes[i].choice) {
                result[j] = allStakes[i];
                j++;
            }
        }
        return result;
    }

    // Get all stakes for a market with choice == false
    function getStakesByChoiceFalse(
        string memory marketId
    ) external view returns (StakeInfo[] memory) {
        StakeInfo[] memory allStakes = marketStakes[marketId];
        uint256 count = 0;
        for (uint256 i = 0; i < allStakes.length; i++) {
            if (!allStakes[i].choice) {
                count++;
            }
        }
        StakeInfo[] memory result = new StakeInfo[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < allStakes.length; i++) {
            if (!allStakes[i].choice) {
                result[j] = allStakes[i];
                j++;
            }
        }
        return result;
    }

    // Distribute winnings to users who staked on the winning choice
    function distributeWinnings(
        string memory marketId,
        bool winningChoice
    ) external nonReentrant {
        require(!marketPaid[marketId], "Winnings already distributed");
        StakeInfo[] storage allStakes = marketStakes[marketId];
        uint256 totalWinning = 0;
        uint256 totalLosing = 0;
        uint256 i;
        // Calculate total pools
        for (i = 0; i < allStakes.length; i++) {
            if (allStakes[i].choice == winningChoice) {
                totalWinning += allStakes[i].amount;
            } else {
                totalLosing += allStakes[i].amount;
            }
        }

        // If no losers, winners get their stake back
        if (totalLosing == 0) {
            for (i = 0; i < allStakes.length; i++) {
                if (allStakes[i].choice == winningChoice) {
                    bool sent = blockdagToken.transfer(
                        allStakes[i].staker,
                        allStakes[i].amount
                    );
                    require(sent, "Payout failed");
                }
            }
        }
        // If no winners, losers get their stake back
        else if (totalWinning == 0) {
            for (i = 0; i < allStakes.length; i++) {
                if (allStakes[i].choice != winningChoice) {
                    bool sent = blockdagToken.transfer(
                        allStakes[i].staker,
                        allStakes[i].amount
                    );
                    require(sent, "Payout failed");
                }
            }
        }
        // Normal case: distribute losing pool to winners
        else {
            for (i = 0; i < allStakes.length; i++) {
                if (allStakes[i].choice == winningChoice) {
                    uint256 share = (allStakes[i].amount * totalLosing) /
                        totalWinning;
                    uint256 payout = allStakes[i].amount + share;
                    bool sent = blockdagToken.transfer(
                        allStakes[i].staker,
                        payout
                    );
                    require(sent, "Payout failed");
                }
            }
        }
        marketPaid[marketId] = true;
        emit WinningsDistributed(
            marketId,
            winningChoice,
            totalWinning,
            totalLosing
        );
        // Optionally: clear stakes for this market to prevent double payout
        // delete marketStakes[marketId];
    }
}
