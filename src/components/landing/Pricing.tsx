'use client'

import React from "react";
import { BackgroundBeams } from "../ui/background-beams";

interface Plan {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  billedInfo?: string;
  buttonText: string;
  badge?: string;
  features: string[];
}

const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    description: "Comece agora mesmo e explore o básico sem custos.",
    priceMonthly: 0,
    billedInfo: "Para sempre grátis",
    buttonText: "Experimentar",
    features: ["Avalie recursos essenciais", "Modelos de agentes padrão"],
  },
  {
    id: "pro-annual",
    name: "Pro ✦",
    description: "Companheiro de entrevistas com IA para profissionais.",
    priceMonthly: 25,
    billedInfo: "2 meses grátis no anual",
    buttonText: "Assinar",
    badge: "Mais popular",
    features: [
      "Screenshots ilimitadas",
      "Agentes avançados (debug, otimizações)",
      "Uso ilimitado",
      "Modelos de IA potentes",
      "Suporte 24/7",
      "Acesso antecipado a novos agentes",
    ],
  },
  {
    id: "pro-monthly",
    name: "Pro Flex ✦",
    description: "Mesma potência da IA, pago mês a mês.",
    priceMonthly: 30,
    billedInfo: "",
    buttonText: "Assinar",
    features: [
      "Screenshots ilimitadas",
      "Agentes avançados (debug, otimizações)",
      "Uso ilimitado",
      "Modelos de IA potentes",
      "Suporte 24/7",
      "Acesso antecipado a novos agentes",
    ],
  },
];

export function Pricing() {
  return (
    <section className="z-10 w-full bg-black py-24 px-4 text-white">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <div className="relative mx-auto flex w-fit items-center justify-center p-4">
          <h2 className="capitalize tracking-[-0.06em] text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-zinc-300 dark:to-zinc-500 ml-4 pb-2">
            Preços
          </h2>
        </div>

        {/* <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto"> */}
        <p className="font-primary tracking-tight text-zinc-800 dark:text-zinc-200 max-w-3xl md:text-xl text-pretty px-4 text-center mx-auto">
          Escolha o plano que melhor se adapta às suas necessidades.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="bg-card text-card-foreground relative max-w-[300px] overflow-hidden rounded-2xl border shadow-lg mx-auto"
          >
            <div className="flex flex-col gap-8 p-4">
              {/* Header */}
              <div className="flex flex-col">
                <h2 className="text-base font-semibold leading-7">{plan.name}</h2>
                <p className="h-12 text-sm leading-5">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="flex flex-row items-end justify-start gap-1">
                <span className="text-4xl font-bold leading-7">${plan.priceMonthly}</span>
                <span className="mb-1 text-xs">/month</span>
              </div>
              {plan.billedInfo ? (
                <p className="-mt-6 text-xs italic text-neutral-400">
                  {plan.billedInfo}
                </p>
              ) : (
                /* dá pra ajustar o h-5 caso queira mais/menos espaço */
                <div className="-mt-6 h-4" aria-hidden />
              )}

              {/* CTA */}
              <button className="group relative inline-flex h-10 w-full items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-md bg-primary px-4 py-2 text-lg font-semibold tracking-tighter text-primary-foreground ring-offset-current transition-all duration-300 ease-out hover:bg-primary/90 hover:ring-2 hover:ring-primary hover:ring-offset-2">
                <span>{plan.buttonText}</span>
                <span className="absolute right-0 -mt-12 h-32 w-8 translate-x-12 rotate-12 transform-gpu bg-black opacity-10 transition-all duration-1000 ease-out group-hover:-translate-x-96" />
              </button>

              {/* Divider */}
              <div className="m-0 h-px w-full shrink-0 bg-gradient-to-r from-neutral-200/0 via-neutral-500/30 to-neutral-200/0" />

              {/* Features */}
              <ul className="flex flex-col gap-2 font-normal">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-xs font-medium">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5 rounded-full bg-green-400 p-1"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    <span className="flex">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <BackgroundBeams className="absolute inset-0 -z-9 pointer-events-none" />
    </section>
  );
}