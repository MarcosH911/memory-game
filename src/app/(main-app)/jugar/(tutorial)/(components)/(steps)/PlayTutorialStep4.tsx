"use client";

import { useEffect, useState } from "react";

import PlayTutorialStepWrapper from "./PlayTutorialStepWrapper";
import PlayTutorialSpaceButton from "../PlayTutorialSpaceButton";
import sleep from "@/helpers/sleep";
import PlayTutorialSquares from "../PlayTutorialSquares";
import PlayTutorialLevelTitle from "../PlayTutorialLevelTitle";
import PlayTutorialButtons from "../PlayTutorialButtons";

function PlayTutorialStep4() {
  const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      setSelectedSquare(0);
      setIsSpacePressed(true);
      await sleep(1000);
      setIsSpacePressed(false);
      setSelectedSquare(null);
      await sleep(1000);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <PlayTutorialStepWrapper step={4}>
      <ul className="mb-4 space-y-3 font-semibold leading-tight h-md:mb-10">
        <li>
          Debes <strong className="font-extrabold">activar</strong> el botón
          cuando se{" "}
          <strong className="font-extrabold">
            ilumine el mismo cuadrado que <em>N</em> veces atrás
          </strong>
          , donde <em>N</em> es el nivel en el que estas{" "}
        </li>
        <li>
          Mira los <strong className="font-extrabold">ejemplos</strong> de las{" "}
          <strong className="font-extrabold">siguientes secciones</strong> para
          entenderlo mejor.
        </li>
      </ul>

      <div className="flex h-full flex-col items-center justify-center gap-2 h-sm:gap-4">
        <PlayTutorialLevelTitle level={1} type="small" />
        <div className="aspect-square h-full">
          <PlayTutorialSquares selectedSquare={selectedSquare} type="small" />
        </div>
        <PlayTutorialSpaceButton
          isSpacePressed={isSpacePressed}
          setIsSpacePressed={null}
          type="small"
        />
      </div>
    </PlayTutorialStepWrapper>
  );
}

export default PlayTutorialStep4;
