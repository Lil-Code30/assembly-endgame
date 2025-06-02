import { useState } from "react";
import { nanoid } from "nanoid";

import { languages } from "./languages";

function Hangman() {
  const [currentWord, setCurrentWord] = useState("typescript");

  const letterElements = currentWord.split("").map((letter) => {
    return (
      <span
        key={nanoid()}
        className="size-[60px] bg-[#323232] flex-center border-b-3 border-b-[#F9F4DA] text-3xl font-bold"
      >
        {letter.toUpperCase()}
      </span>
    );
  });

  const languagesBox = languages.map(({ name, backgroundColor, color }) => {
    return (
      <div
        key={name}
        style={{ backgroundColor: backgroundColor, color: color }}
        className="w-auto rounded-[3px] font-bold py-1 px-2 flex-center"
      >
        {name}
      </div>
    );
  });

  return (
    <main>
      <header className="flex-center flex-col mt-15 md:w-[80%] md:mx-auto">
        <h1 className="md:text-4xl text-3xl text-center font-semibold text-[#F9F4DA]">
          Assembly: Endgame
        </h1>
        <p className="text-center font-medium text-xl text-[#8E8E8E] mt-2">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="w-full md:w-[80%] mx-auto rounded-[4px] h-[60px] bg-[#10A95B] text-[#F9F4DA] font-medium flex-center flex-col py-10 mt-6">
        <h2 className="text-2xl">You win!</h2>
        <p className="text-xl font-normal">Well done! 🎉</p>
      </section>
      <section className="flex-center flex-wrap gap-1 max-w-[400px] mx-auto my-10">
        {languagesBox}
      </section>
      <section className="w-full md:w-[90%] flex-center gap-1 mx-auto flex-wrap">
        {letterElements}
      </section>
    </main>
  );
}

export default Hangman;
