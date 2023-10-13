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
    <PlayTutorialStepWrapper step={1}>
      <ul className="mb-4 space-y-3 font-semibold leading-tight h-md:mb-10">
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
      <div className="flex h-full items-center justify-center gap-2 h-sm:gap-4">
        <div className="aspect-square h-[min(100%,calc(100vw-2rem),24rem)]">
          <PlayTutorialSquares selectedSquare={selectedSquare} />
        </div>
      </div>
    </PlayTutorialStepWrapper>
  );
}

export default PlayTutorialStep1;
