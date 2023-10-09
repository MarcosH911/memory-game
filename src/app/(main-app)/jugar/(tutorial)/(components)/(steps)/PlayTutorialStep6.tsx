"use client";

import Image from "next/image";

import PlayTutorialStepWrapper from "./PlayTutorialStepWrapper";
import PlayTutorialLevelTitle from "../PlayTutorialLevelTitle";

function PlayTutorialStep5() {
  return (
    <PlayTutorialStepWrapper step={6}>
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

      <div className="flex h-full flex-col items-center justify-center">
        <div className="mb-2 flex items-center justify-center h-md:mb-4 h-lg:mb-8">
          <PlayTutorialLevelTitle level={2} type="small" />
        </div>
        <div className="relative aspect-[2] h-[min(15rem,100%,calc((100vw-2rem)/2))]">
          <Image
            src="/tutorial/Example-2.png"
            alt="Example image"
            quality={100}
            fill
            sizes="30rem"
          />
        </div>
      </div>
    </PlayTutorialStepWrapper>
  );
}

export default PlayTutorialStep5;
