"use client";

import { useEffect, useState } from "react";
import PlayTutorialButtons from "./PlayTutorialButtons";
import PlayTutorialSquares from "./PlayTutorialSquares";
import sleep from "@/helpers/sleep";

interface Props {
  setStep: (step: number) => void;
}

function PlayTutorialStep1({ setStep }: Props) {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      setSelectedSquare(Math.trunc(Math.random() * 8));
      await sleep(1000);
      setSelectedSquare(null);
      await sleep(1000);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="mt-8 flex items-center justify-center text-teal-950">
      <div>
        <h1 className="text-4xl font-bold">Instrucciones</h1>
        <h2 className="mb-6 text-lg font-semibold text-teal-900">Paso 1</h2>
        <ul className="mb-10 font-semibold">
          <li>
            Hay <strong className="font-extrabold">8 cuadrados</strong> como se
            muestra a continuación.
          </li>
          <li>
            Cada cierto tiempo se va a{" "}
            <strong className="font-extrabold">iluminar uno</strong> de ellos.
          </li>
          <li>
            Tienes que intentar{" "}
            <strong className="font-extrabold">recordar</strong> qué cuadrados
            se iluminan.
          </li>
        </ul>
        <div className="flex items-center justify-center">
          <div className="relative mb-10 grid aspect-square h-96 grid-cols-3 grid-rows-3">
            <PlayTutorialSquares selectedSquare={selectedSquare} />
          </div>
        </div>
        <PlayTutorialButtons step={1} setStep={setStep} />
      </div>
    </div>
  );
}

export default PlayTutorialStep1;
