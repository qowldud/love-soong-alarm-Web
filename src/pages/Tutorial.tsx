import React, { useState, useCallback } from "react";

import { TutorialMap } from "../components/home/TutorialMap";

import { Tutorial_1 } from "../components/tutorial/Tutorial_1";
import { Tutorial_2 } from "../components/tutorial/Tutorial_2";
import { Tutorial_3 } from "../components/tutorial/Tutorial_3";
import { Tutorial_4 } from "../components/tutorial/Tutorial_4";

const BackgroundLayer = () => (
  <div className="absolute inset-0 z-20">
    <div className="absolute inset-0">
      <TutorialMap />
    </div>
  </div>
);

const HalfClickNavigator = ({
  canGoPrev,
  isLast,
  onPrev,
  onNext,
  onExit,
  disableNextOnLast = true,
}: {
  canGoPrev: boolean;
  isLast: boolean;
  onPrev: () => void;
  onNext: () => void;
  onExit: () => void;
  disableNextOnLast?: boolean;
}) => {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft") {
        if (canGoPrev) onPrev();
      }
      if (e.key === "ArrowRight") {
        if (isLast) {
          if (!disableNextOnLast) onExit();
        } else {
          onNext();
        }
      }
    },
    [canGoPrev, isLast, disableNextOnLast, onPrev, onNext, onExit]
  );

  const rightDisabled = isLast && disableNextOnLast;

  return (
    <div
      className="absolute inset-0 z-40 flex"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <button
        aria-label="previous"
        className="w-1/2 h-full bg-transparent"
        onClick={() => {
          if (canGoPrev) onPrev();
        }}
      />
      <button
        aria-label={isLast ? "finish" : "next"}
        aria-disabled={rightDisabled}
        className={[
          "w-1/2 h-full bg-transparent",
          rightDisabled ? "pointer-events-none opacity-0" : "",
        ].join(" ")}
        onClick={() => {
          if (rightDisabled) return;
          if (isLast) onExit();
          else onNext();
        }}
      />
    </div>
  );
};

const Dots = ({
  count,
  index,
  onJump,
}: {
  count: number;
  index: number;
  onJump: (i: number) => void;
}) => (
  <div
    className="absolute top-1/3 left-2 -translate-y-1/2 z-30
               flex flex-col items-center gap-2"
  >
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        aria-label={`go to slide ${i + 1}`}
        onClick={() => onJump(i)}
        className={[
          "w-2 rounded-full transition-all",
          i === index ? "h-6 bg-white/90" : "h-2 bg-white/50",
        ].join(" ")}
      />
    ))}
  </div>
);

export const Tutorial = ({
  setIsTutorial,
}: {
  setIsTutorial: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [index, setIndex] = useState(0);
  const slides = [
    <Tutorial_1 key="t1" />,
    <Tutorial_2 key="t2" />,
    <Tutorial_3 key="t3" />,
    <Tutorial_4 key="t4" setIsTutorial={setIsTutorial} />,
  ];
  const isLast = index === slides.length - 1;

  const goPrev = () => setIndex((i) => Math.max(0, i - 1));
  const goNext = () => setIndex((i) => Math.min(slides.length - 1, i + 1));
  const jumpTo = (i: number) => setIndex(i);
  const exit = () => setIsTutorial(false);

  return (
    <div className="relative w-full h-dvh">
      <BackgroundLayer />

      <div className="relative z-20 w-full h-full">{slides[index]}</div>

      <HalfClickNavigator
        canGoPrev={index > 0}
        isLast={isLast}
        onPrev={goPrev}
        onNext={goNext}
        onExit={exit}
        disableNextOnLast={false}
      />

      <Dots count={slides.length} index={index} onJump={jumpTo} />
    </div>
  );
};
