import React from 'react';

interface CardData {
  title: string;
  description: string;
  variant: 'svg' | 'img' | 'canvas';
  span: string;
}

const cards: CardData[] = [
  {
    title: 'Compartilhamento Invisível',
    description:
      'O Ghost Coder não aparece em nenhum software de gravação de tela, tornando-o ideal para entrevistas técnicas.',
    variant: 'svg',
    span: 'md:col-span-3',
  },
  {
    title: 'Detecção de Aba Ativa',
    description:
      'Alterne sua janela sem perder o foco do cursor e continue codando sem interrupções.',
    variant: 'svg',
    span: 'md:col-span-2',
  },
  {
    title: 'Raciocínio Explicado',
    description:
      'Cada solução vem com comentários passo a passo, detalhando lógica e estratégias do código.',
    variant: 'svg',
    span: 'md:col-span-2',
  },
  {
    title: 'Sobreposição de Webcam',
    description:
      'Mova a janela para sobrepor seu editor, mantendo o contato visual durante toda a entrevista.',
    variant: 'svg',
    span: 'md:col-span-3',
  },
];

export function Features() {
  return (
    <div className="relative z-10 preview flex min-h-[350px] w-full justify-center p-2 sm:p-10 items-center">
      <div className="mx-auto my-10 w-full max-w-7xl px-4 md:px-8">
        <div className="relative mx-auto flex w-fit items-center justify-center p-4">
          <h2 className="capitalize tracking-[-0.06em] text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 to-zinc-500 dark:from-zinc-300 dark:to-zinc-500 ml-4">
            Você vê. <br /> Eles não.
          </h2>
        </div>

        {/* <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto"> */}
        <p className="font-primary tracking-tight text-zinc-800 dark:text-zinc-200 max-w-3xl md:text-xl text-pretty px-4 text-center mx-auto">
          Enquanto você impressiona o entrevistador, o Ghost Coder atua nos bastidores para otimizar sua performance.
        </p>

        <div className="cols-1 mt-20 grid gap-4 md:auto-rows-[25rem] md:grid-cols-5">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className={`group isolate overflow-hidden rounded-2xl bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] dark:bg-neutral-900 flex flex-col justify-between ${card.span}`}
            >
              <div className="p-6 h-40">
                <h3 className="font-sans text-base font-medium tracking-tight text-neutral-700 dark:text-neutral-100">
                  {card.title}
                </h3>
                <p className="mt-2 max-w-xs font-sans text-base font-normal tracking-tight text-neutral-500 dark:text-neutral-400">
                  {card.description}
                </p>
              </div>

              {card.variant === 'svg' && (
                <div className="relative h-full w-full overflow-hidden">
                  {/* SVGs ilustrativos para cada card aqui */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
