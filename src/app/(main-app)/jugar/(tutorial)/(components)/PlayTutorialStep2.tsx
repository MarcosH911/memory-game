"use client";

import { useEffect, useState } from "react";
import PlayTutorialButtons from "./PlayTutorialButtons";
import PlayTutorialLevelTitle from "./PlayTutorialLevelTitle";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  totalSteps: number;
}

function PlayTutorialStep2({ setStep, totalSteps }: Props) {
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setLevel((level) => (level % 5) + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mt-8 flex items-center justify-center text-teal-950">
      <div>
        <h1 className="text-4xl font-bold">Instrucciones</h1>
        <h2 className="mb-6 text-lg font-semibold text-teal-900">Paso 1</h2>
        <ul className="mb-10 font-semibold space-y-3 leading-tight">
          <li>
            Tienes un <strong className="font-extrabold">nivel</strong> que va
            subiendo o bajando.
          </li>
          <li>
            Si juegas <strong className="font-extrabold">bien</strong>,{" "}
            <strong className="font-extrabold">subes</strong> de nivel, si
            juegas <strong className="font-extrabold">mal</strong>,{" "}
            <strong className="font-extrabold">bajas</strong>.
          </li>
          <li>
            Cuanto <strong className="font-extrabold">más alto</strong> el
            nivel, <strong className="font-extrabold">más difícil</strong> se
            vuelve el juego
          </li>
        </ul>

        <div className="flex items-center justify-center mb-10">
          <PlayTutorialLevelTitle level={level} />
        </div>

        <PlayTutorialButtons
          step={2}
          setStep={setStep}
          totalSteps={totalSteps}
        />
      </div>
    </div>
  );
}

export default PlayTutorialStep2;
