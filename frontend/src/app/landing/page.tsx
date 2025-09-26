"use client"

import Landing from "@/components/Landing/landing";
// import { useRouter } from "next/navigation";

const page = () => {
//   const router = useRouter();

  return (
    <main>
      <Landing onConnectWallet={function (): void {
              throw new Error("Function not implemented.");
          } } />
    </main>
  );
};

export default page;
