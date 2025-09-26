"use client"

import MyPositions from "@/components/Positions/MyPositions";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();

  return (
    <main>
      <MyPositions onBack={() => router.push("/markets")} />
    </main>
  );
};

export default page;
