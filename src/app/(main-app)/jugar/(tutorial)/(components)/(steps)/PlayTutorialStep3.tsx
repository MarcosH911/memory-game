"use client";

import { useEffect, useState } from "react";

import PlayTutorialStepWrapper from "./PlayTutorialStepWrapper";
import PlayTutorialSpaceButton from "../PlayTutorialSpaceButton";
import sleep from "@/helpers/sleep";
import PlayTutorialButtons from "../PlayTutorialButtons";

function PlayTutorialStep3() {
  const [isSpacePressed, setIsSpacePressed] = useState(false);

  useEffect(() => {
    const handleSpacePress = async () => {
      if (isSpacePressed) {
        await sleep(1000);
        setIsSpacePressed(false);
      }
    };

    handleSpacePress();
  }, [isSpacePressed]);

  return (
    <PlayTutorialStepWrapper step={3}>
      <ul className="mb-4 space-y-3 font-semibold leading-tight h-md:mb-10">
        <li>
          Tienes un <strong className="font-extrabold">botón</strong> que puedes
          activar.
        </li>
        <li>
          Lo puedes activar tocando la{" "}
          <strong className="font-extrabold">tecla espacio</strong>, o{" "}
          <strong className="font-extrabold">haciendo click</strong> en él.
        </li>
        <li>
          Cuando se ilumine un nuevo cuadrado se{" "}
          <strong className="font-extrabold">desactivará solo</strong>.
        </li>
        <li>
          <strong className="font-extrabold">Prueba a activar</strong> el botón
          de abajo de las dos formas mencionadas.
        </li>
      </ul>

      <div className="flex h-full items-center justify-center">
        <PlayTutorialSpaceButton
          isSpacePressed={isSpacePressed}
          setIsSpacePressed={setIsSpacePressed}
        />
      </div>
    </PlayTutorialStepWrapper>
  );
}

export default PlayTutorialStep3;
