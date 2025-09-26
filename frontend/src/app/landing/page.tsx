"use client"

import Landing from "@/components/landing/landing";


const page = () => {
  

  return (
    <main>
      <Landing onConnectWallet={function (): void {
              throw new Error("Function not implemented.");
          } } />
    </main>
  );
};

export default page;
