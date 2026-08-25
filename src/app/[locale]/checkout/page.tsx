import { Metadata } from "next";
import React from "react";
import StepsFlow from "./_components/steps-flow";
import Summary from "@/components/shared/summary";

export const metadata: Metadata = {
  title: "Checkout Page",
};

export default function page() {
  return (
    <div className="flex justify-center pt-8 pb-16">
      <div className="container">
        <div className="flex  gap-32">
          {/* left section */}
          <StepsFlow />
          <div className=" ">
            {/* right section */}
            <Summary />
          </div>
        </div>
      </div>
    </div>
  );
}
