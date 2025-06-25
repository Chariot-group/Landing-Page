import { About } from "@/components/modules/About";
import { Contact } from "@/components/modules/Contact";
import { Hero } from "@/components/modules/Hero";
import { Pricing } from "@/components/modules/Pricing";
import { Team } from "@/components/modules/Team";
import { Thanks } from "@/components/modules/Thanks";

export default function Home() {
  return (
    <div className="flex flex-col items-center h-full w-full">
      <Hero />
      <div className="bg-card w-full">
        <About />
      </div>
      <Pricing />
      <div className="bg-card w-full">
        <Team />
      </div>
      <Thanks />
      <div className="bg-card w-full">
        <Contact />
      </div>
    </div>
  );
}
