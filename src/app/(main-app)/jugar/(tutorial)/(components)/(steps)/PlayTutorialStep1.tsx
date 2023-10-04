"use client";

import { useEffect, useState } from "react";

import sleep from "@/helpers/sleep";
import PlayTutorialStepWrapper from "./PlayTutorialStepWrapper";
import PlayTutorialSquares from "../PlayTutorialSquares";

function PlayTutorialStep1() {
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
    <PlayTutorialStepWrapper>
      <ul className="h-md:mb-10 mb-4 space-y-3 font-semibold leading-tight">
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
          <strong className="font-extrabold">recordar</strong> qué cuadrados se
          iluminan.
        </li>
      </ul>
      <div className="h-full flex items-center justify-center">
        <div className="flex h-full items-center justify-center">
          <PlayTutorialSquares selectedSquare={selectedSquare} />
        </div>
      </div>
    </PlayTutorialStepWrapper>
  );
}

export default PlayTutorialStep1;
