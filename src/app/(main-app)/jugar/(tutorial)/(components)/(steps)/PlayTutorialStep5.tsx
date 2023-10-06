"use client";

import Image from "next/image";

import PlayTutorialStepWrapper from "./PlayTutorialStepWrapper";
import PlayTutorialLevelTitle from "../PlayTutorialLevelTitle";

function PlayTutorialStep5() {
  return (
    <PlayTutorialStepWrapper>
      <ul className="mb-4 space-y-3 font-semibold leading-tight h-md:mb-10">
        <li>
          En cada <strong className="font-extrabold">recuadro</strong> del
          ejemplo hay una <strong className="font-extrabold">pantalla</strong>
        </li>
        <li>
          Las pantallas van de{" "}
          <strong className="font-extrabold">izquierda a derecha</strong> y de{" "}
          <strong className="font-extrabold">arriba a abajo</strong>
        </li>
        <li>
          Las pantallas con{" "}
          <strong className="font-extrabold">fondo verde</strong> son en las que
          debes <strong className="font-extrabold">activar el botón</strong>
        </li>
        <li>
          La <strong className="font-extrabold">flecha roja</strong> señala{" "}
          <strong className="font-extrabold">por qué</strong> debes activar el
          botón
        </li>
      </ul>

      <div className="my-auto">
        {/* <div className="h-lg:mb-8 h-md:mb-4 mb-2 flex items-center justify-center">
          <PlayTutorialLevelTitle level={1} type="small" />
        </div> */}
        <div className="relative aspect-[2]">
          <Image
            src="/tutorial/Example-1.png"
            alt="Example image"
            quality={100}
            fill
          />
        </div>
      </div>
    </PlayTutorialStepWrapper>
  );
}

export default PlayTutorialStep5;
