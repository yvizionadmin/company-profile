import { TextReveal } from "@/components/animation/TextReveal";
import { Reveal } from "@/components/animation/Reveal";
import { Counter } from "@/components/animation/Counter";
import { stats } from "@/lib/data";

type StatsProps = {
  statement?: string;
};

/** Editorial statement beside animated counters. */
export function Stats({
  statement = "We build the websites, apps, and growth systems behind ambitious Middle East brands.",
}: StatsProps) {
  return (
    <section className="border-y border-line">
      <div className="container-x grid gap-16 py-24 sm:py-32 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal direction="up" distance={20}>
            <p className="label-mono text-lime">( Where ambition meets execution )</p>
          </Reveal>
          <TextReveal as="h2" split="words" className="display-md mt-6 font-bold">
            {statement}
          </TextReveal>
        </div>

        <div className="grid grid-cols-2">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.08}
              className="border-line p-8 odd:border-r [&:nth-child(-n+2)]:border-b"
            >
              <p className="text-4xl font-extrabold text-lime sm:text-5xl">
                <Counter
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={"decimals" in stat ? stat.decimals : 0}
                />
              </p>
              <p className="mt-2 text-sm text-white/50">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
