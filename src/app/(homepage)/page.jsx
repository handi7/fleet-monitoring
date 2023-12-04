import Image from "next/image";
import React from "react";

function HomePage() {
  return (
    <div className="h-full flex justify-center bg-gray-100 text-primary">
      <div className="w-[1200px] max-w-[1200px] py-10 px-10 xl:px-5">
        <div className="w-full aspect-[2/1] relative rounded-xl overflow-hidden">
          <Image
            src="/images/homebg.jpg"
            alt="home"
            layout="fill"
            className="object-cover"
            placeholder="blur"
            blurDataURL="/images/homebg.jpg"
          />
          <div className="absolute w-full h-full flex flex-col items-center text-white bg-black/50 pt-[5%] space-y-3">
            <h1 className="text-5xl font-bold">fleet management</h1>
            <p className="w-[720px] text-lg text-center">
              Fleet Management offers the single platform that your company
              needs to monitor, plan and report your operations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
