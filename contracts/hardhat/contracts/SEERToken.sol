// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC20} from "openzeppelin-contracts/token/ERC20/ERC20.sol";

contract DAGSToken is ERC20 {
    address public owner;

    constructor() ERC20("DAGSeer Token", "DAGS") {
        owner = msg.sender;
        _mint(msg.sender, 1_000_000_000 * 10 ** 18);
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner");
        _mint(to, amount);
    }

    // Faucet for testing: mint 100 tokens to caller (remove in production)
    function faucet() external {
        _mint(msg.sender, 100 * 10 ** decimals());
    }
}
