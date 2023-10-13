"use client";

import { useEffect, useState } from "react";

import PlayTutorialStepWrapper from "./PlayTutorialStepWrapper";
import PlayTutorialLevelTitle from "../PlayTutorialLevelTitle";

function PlayTutorialStep2() {
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
    <PlayTutorialStepWrapper step={2}>
      <ul className="space-y-3 pb-4 font-semibold leading-tight h-md:pb-10">
        <li>
          Tienes un <strong className="font-extrabold">nivel</strong> que va
          subiendo o bajando.
        </li>
        <li>
          Si juegas <strong className="font-extrabold">bien</strong>,{" "}
          <strong className="font-extrabold">subes</strong> de nivel. Si juegas{" "}
          <strong className="font-extrabold">mal</strong>,{" "}
          <strong className="font-extrabold">bajas</strong>.
        </li>
        <li>
          Cuanto <strong className="font-extrabold">más alto</strong> el nivel,{" "}
          <strong className="font-extrabold">más difícil</strong> se vuelve el
          juego.
        </li>
      </ul>

      <div className="flex h-full items-center justify-center">
        <PlayTutorialLevelTitle level={level} />
      </div>
    </PlayTutorialStepWrapper>
  );
}

export default PlayTutorialStep2;
