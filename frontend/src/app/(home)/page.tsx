"use client";

import Footer from "@/components/layouts/footer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Outfit } from "next/font/google";
import Link from "next/link";

const outfit = Outfit({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-[#0059FF90] -z-10 size-[1026px] absolute -top-[496px] left-0 blur-[100px] rounded-full" />
        <div className="bg-[#22C55E90] -z-10 size-[1026px] absolute -top-[496px] -right-[100px] blur-[600px] rounded-full overflow-hidden" />
      </div>

      <HeroSection />

      <WhySeer />

      <HowItWorks />

      {/* <TrendingMarket /> */}

      {/* <AboutSEERToken /> */}

      <Footer />
    </>
  );
}

function HeroSection() {
  return (
    <main>
      <div className="background-glow top-left"></div>
      <div className="background-glow top-right"></div>

      <div className="container mx-auto min-h-[calc(100vh-140px)] flex flex-col gap-4 items-center justify-center py-20 px-2">
        <h1
          className={cn(
            "max-w-[1138px] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.1] text-center",
            outfit.className
          )}
        >
          The simplest way to stake on what matters.
        </h1>
        <p className="max-w-[448px] text-muted-foreground text-center text-base md:text-lg lg:text-xl">
          Forecast the future, on-chain. Say Yes or No, stake BDAG, and earn
          when you’re right.
        </p>

        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <Link href="/markets">
            <Button variant="default">View Market</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

const features = [
  {
    title: "Diverse Markets",
    description:
      "Trade on sports, crypto, politics, and custom events with real-time odds and transparent outcomes.",
  },
  {
    title: "Secure & Transparent",
    description:
      "Built on BlockDAG's revolutionary architecture, ensuring fast, secure, and transparent transactions.",
  },
  // {
  //   title: "Community Powered",
  //   description: "Markets are shaped by what people care about most.",
  // },
  {
    title: "Earn Rewards",
    description:
      "Stake BDAG tokens on your predictions and earn rewards when you join the winning side.",
  },
];

function WhySeer() {
  return (
    <section className="py-20 min-h-[600px] px-2 flex justify-center items-center flex-col gap-8">
      <div className="container mx-auto px-2">
        {/* header */}
        <div className="flex flex-col items-center gap-2">
          <p className="uppercase text-xl">Why DAGSeer</p>
          <h3 className="font-bold text-3xl text-center">
            Built for Simplicity, Transparency, and Speed
          </h3>
        </div>

        {/* list */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col gap-4 bg-white/5 border  dark:border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <h4 className="text-xl font-semibold">{feature.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const howItWorks = [
  {
    step: 1,
    title: "Connect Wallet",
    description: "Link your BlockDAG wallet in one click.",
  },
  {
    step: 2,
    title: "Choose a Market",
    description: "Browse open Yes/No prediction markets.",
  },
  {
    step: 3,
    title: "Predict & Stake",
    description:
      "Pick a side, stake BDAG tokens, and claim rewards if your side wins.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 flex justify-center bg-neutral-100 dark:bg-neutral-900 items-center flex-col gap-8">
      <div className="container mx-auto px-2">
        {/* header */}
        <div className="flex flex-col items-center gap-2">
          <p className="uppercase text-xl">How It Works</p>
          <h3 className="font-bold text-3xl text-center">
            Predict in 3 Simple Steps
          </h3>
        </div>

        {/* steps */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {howItWorks.map((item) => (
            <div
              key={item.step}
              className="flex flex-col gap-4 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mb-4 text-white font-bold">
                {item.step}
              </div>
              <h4 className="text-xl font-semibold">{item.title}</h4>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrendingMarket() {
  return (
    <section className="py-20 flex justify-center items-center flex-col gap-8">
      <div className="container mx-auto px-2">
        {/* header */}
        <div className="flex flex-col items-center gap-2">
          <p className="uppercase text-xl">Trending Market</p>
          <h3 className="font-bold text-[40px] text-center">
            See What&apos;s Trending Right Now
          </h3>
        </div>

        {/* market card */}
        <div className="mt-12 max-w-md mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
          <h4 className="text-2xl font-semibold mb-4">
            Will Bitcoin (BTC) close above $30,000 on December 31, 2024?
          </h4>
          <p className="text-white/70 mb-6">
            Join the prediction market and stake your BDAG tokens now!
          </p>
        </div>
      </div>
    </section>
  );
}

export const aboutSEER = [
  {
    question: "What is the SEER token?",
    answer: "A utility token designed to power prediction markets on DAGSeer.",
  },
  {
    question: "Future Utility",
    answer: "Will be used for staking, governance, and exclusive markets.",
  },
  {
    question: "Healthy Ecosystem",
    answer: "Built with fairness, transparency, and sustainability in mind.",
  },
  {
    question: "Vision",
    answer:
      "Seer will evolve into the core incentive layer, rewarding users who forecast the future, on-chain.",
  },
];

export function AboutSEERToken() {
  return (
    <section className="py-20 flex justify-center items-center flex-col gap-8">
      <div className="container mx-auto px-2">
        {/* header */}
        <div className="flex flex-col items-center gap-2">
          <p className="uppercase text-xl">About SEER Token</p>
          <h3 className="font-bold text-3xl text-center">
            Fueling the Future of On-Chain Predictions
          </h3>
        </div>

        {/* content */}
        <div className="mt-12 max-w-3xl mx-auto text-center">
          <p className="text-white/70 mb-4">
            The SEER token is the native utility token of the DAGSeer platform,
            designed to incentivize accurate predictions and active
            participation in the ecosystem.
          </p>
          <p className="text-white/70 mb-4">
            Holders can stake SEER tokens to participate in prediction markets,
            earn rewards for accurate predictions, and help secure the network.
          </p>
        </div>
      </div>
    </section>
  );
}
