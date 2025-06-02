import { useState } from "react";
import { nanoid } from "nanoid";
import clsx from "clsx";

import { languages } from "./languages";

function Hangman() {
  const [currentWord, setCurrentWord] = useState("typescript");
  const [userGuessedLetters, setUserGuessedLetters] = useState([]);

  const wrongGuessCount = userGuessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const handleGuessedLetter = (letter) => {
    setUserGuessedLetters((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
    );
  };

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = userGuessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.split("").includes(letter);
    const isWrong = isGuessed && !currentWord.split("").includes(letter);

    const keyboardElementsClass = clsx(
      "size-[50px] rounded-[4px] p-[4px] border-1 font-semibold border-[#D7D7D7] text-[#1E1E1E] bg-[#FCBA29] text-2xl ",
      {
        "bg-green-500": isCorrect,
        "bg-red-500": isWrong,
      }
    );

    return (
      <button
        onClick={() => handleGuessedLetter(letter)}
        key={nanoid()}
        className={keyboardElementsClass}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const letterElements = currentWord.split("").map((letter) => {
    return (
      <span
        key={nanoid()}
        className="size-[60px] bg-[#323232] flex-center border-b-3 border-b-[#F9F4DA] text-3xl font-bold"
      >
        {userGuessedLetters.includes(letter) ? letter.toUpperCase() : ""}
      </span>
    );
  });

  const languagesBox = languages.map(
    ({ name, backgroundColor, color }, index) => {
      const isLanguageLost = index < wrongGuessCount;

      return (
        <span
          key={name}
          style={{ backgroundColor: backgroundColor, color: color }}
          className={`chip ${isLanguageLost ? "lost" : ""} `}
        >
          {name}
        </span>
      );
    }
  );

  return (
    <main>
      <header className="flex-center flex-col mt-15 w-full md:w-2/3 lg:w-[50%] md:mx-auto">
        <h1 className="md:text-4xl text-3xl text-center font-semibold text-[#F9F4DA]">
          Assembly: Endgame
        </h1>
        <p className="text-center font-medium text-xl text-[#8E8E8E] mt-2">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className="w-full md:w-2/3 lg:w-[50%] mx-auto rounded-[4px] h-[60px] bg-[#10A95B] text-[#F9F4DA] font-medium flex-center flex-col py-10 mt-6">
        <h2 className="text-2xl">You win!</h2>
        <p className="text-xl font-normal">Well done! 🎉</p>
      </section>
      <section className="flex-center flex-wrap gap-1 max-w-[400px] mx-auto my-10 ">
        {languagesBox}
      </section>
      <section className="w-full md:w-[90%] flex-center gap-1 mx-auto flex-wrap">
        {letterElements}
      </section>
      <section className="flex-center flex-wrap gap-3 mt-8 w-full md:w-[80%] lg:w-[50%] mx-auto">
        {keyboardElements}
      </section>
      <button className="bg-[#11B5E5] border-1 border-[#D7D7D7] rounded-[4px] text-[#1E1E1E] text-xl font-bold font-Hanken px-[6px] text-center block w-[225px] h-[40px] mx-auto mt-10 cursor-pointer">
        New Game
      </button>
    </main>
  );
}

export default Hangman;
