"use client";

import { Eyebrow, Reveal } from "./primitives";
import CapabilityOrbit from "./CapabilityOrbit";

const Capabilities = () => (
  <section id="services" className="py-24 sm:py-32">
    <div className="shell pad-x">
      <div className="max-w-2xl">
        <Reveal><Eyebrow>Capabilities</Eyebrow></Reveal>
        <Reveal delay={80}>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.2vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
            What I do
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <p className="mt-5 max-w-sm text-muted-foreground">
            Overlapping disciplines — hover a node to see how they connect.
          </p>
        </Reveal>
      </div>

      <Reveal delay={200}>
        <div className="mt-14">
          <CapabilityOrbit />
        </div>
      </Reveal>
    </div>
  </section>
);

export default Capabilities;
