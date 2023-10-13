"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import sleep from "@/helpers/sleep";
import PlayTutorialStepWrapper from "./PlayTutorialStepWrapper";

function PlayTutorialStep5() {
  const [feedbackColor, setFeedbackColor] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(async () => {
      setFeedbackColor("green");
      await sleep(1000);
      setFeedbackColor("");
      await sleep(1250);
      setFeedbackColor("red");
      await sleep(1000);
      setFeedbackColor("");
      await sleep(1250);
      setFeedbackColor("blue");
      await sleep(1000);
      setFeedbackColor("");
      await sleep(1250);
    }, 6750);

    return () => clearInterval(interval);
  }, []);

  return (
    <PlayTutorialStepWrapper step={7}>
      <ul className="mb-4 space-y-3 font-semibold leading-tight h-md:mb-10">
        <li>
          En las{" "}
          <strong className="font-extrabold">primeras 10 partidas</strong> que
          juegues te vamos a <strong className="font-extrabold">ayudar</strong>{" "}
          un poco.
        </li>
        <li>
          Si <strong className="font-extrabold">pulsas</strong>{" "}
          <strong className="font-extrabold"></strong> el botón{" "}
          <strong className="font-extrabold">cuando debes</strong> el fondo se
          pondrá de <strong className="font-extrabold">color verde</strong>.
        </li>
        <li>
          Si <strong className="font-extrabold">pulsas</strong>{" "}
          <strong className="font-extrabold"></strong> el botón{" "}
          <strong className="font-extrabold">cuando no debes</strong> el fondo
          se pondrá de <strong className="font-extrabold">color rojo</strong>.
        </li>
        <li>
          Si <strong className="font-extrabold">no pulsas</strong>{" "}
          <strong className="font-extrabold"></strong> el botón{" "}
          <strong className="font-extrabold">
            cuando deberías haberlo pulsado
          </strong>{" "}
          el fondo se pondrá de{" "}
          <strong className="font-extrabold">color azul</strong>.
        </li>
      </ul>
      <div className="flex h-full items-center justify-center gap-2 h-sm:gap-4">
        <div
          className={twMerge(
            "aspect-square h-[min(100%,calc(100vw-2rem),24rem)] rounded-xl bg-cyan-50 transition duration-300",
            feedbackColor === "green" && "bg-green-200",
            feedbackColor === "red" && "bg-red-200",
            feedbackColor === "blue" && "bg-sky-200",
          )}
        ></div>
      </div>
    </PlayTutorialStepWrapper>
  );
}

export default PlayTutorialStep5;
