import { useState } from "react";
import { nanoid } from "nanoid";
import { useWindowSize } from "react-use";
import clsx from "clsx";
import Confetti from "react-confetti";

import { getFarewellText, getRandomWord } from "./utils";
import { languages } from "./languages";

function Hangman() {
  // state values
  const [currentWord, setCurrentWord] = useState(() => getRandomWord());
  const [userGuessedLetters, setUserGuessedLetters] = useState([]);

  // Derived values
  const wrongGuessCount = userGuessedLetters.filter(
    (letter) => !currentWord.includes(letter)
  ).length;
  const isGameWon = currentWord
    .split("")
    .every((letter) => userGuessedLetters.includes(letter));
  const isGameLost = wrongGuessCount >= languages.length - 1;
  const isGameOver = isGameWon || isGameLost;
  const lastGuessedLetter = userGuessedLetters[userGuessedLetters.length - 1];
  const isLastGuessIncorrect =
    lastGuessedLetter && !currentWord.includes(lastGuessedLetter);

  const { width, height } = useWindowSize();

  // Static values
  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const handleGuessedLetter = (letter) => {
    setUserGuessedLetters((prevLetter) =>
      prevLetter.includes(letter) ? prevLetter : [...prevLetter, letter]
    );
  };

  const startNewGame = () => {
    setCurrentWord(getRandomWord());
    setUserGuessedLetters([]);
  };

  const keyboardElements = alphabet.split("").map((letter) => {
    const isGuessed = userGuessedLetters.includes(letter);
    const isCorrect = isGuessed && currentWord.split("").includes(letter);
    const isWrong = isGuessed && !currentWord.split("").includes(letter);

    const keyboardElementsClass = clsx(
      "size-[50px] rounded-[4px] p-[4px] border-1 font-semibold border-[#D7D7D7] text-[#1E1E1E] bg-[#FCBA29] text-2xl disabled:opacity-40 disabled:cursor-not-allowed",
      {
        "bg-green-500": isCorrect,
        "bg-red-500": isWrong,
      }
    );

    return (
      <button
        onClick={() => handleGuessedLetter(letter)}
        key={nanoid()}
        disabled={isGameOver}
        className={keyboardElementsClass}
      >
        {letter.toUpperCase()}
      </button>
    );
  });

  const letterElements = currentWord.split("").map((letter) => {
    const shouldRevealLetter =
      isGameLost || userGuessedLetters.includes(letter);
    const letterClassName = clsx(
      "size-[60px] bg-[#323232] flex-center border-b-3 border-b-[#F9F4DA] text-3xl font-bold",
      {
        "text-red-500": isGameLost && !userGuessedLetters.includes(letter),
      }
    );

    return (
      <span key={nanoid()} className={letterClassName}>
        {shouldRevealLetter ? letter.toUpperCase() : ""}
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

  function renderGameStatus() {
    if (!isGameOver && isLastGuessIncorrect) {
      return (
        <p className="text-3xl">
          {getFarewellText(languages[wrongGuessCount - 1].name)}
        </p>
      );
    }

    if (isGameWon) {
      return (
        <>
          <h2 className="text-3xl">You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    }
    if (isGameLost) {
      return (
        <>
          <h2 className="text-3xl">Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
    return null;
  }

  const gameStatusClass = clsx(
    "w-full md:w-2/3 lg:w-[50%] mx-auto rounded-[4px] h-[60px]  text-[#F9F4DA] font-medium flex-center flex-col py-10 mt-6",
    {
      "bg-[#10A95B]": isGameWon,
      "bg-[#BA2A2A]": isGameLost,
      "bg-[#7A5EA7] border-1 border-dashed italic":
        !isGameOver && isLastGuessIncorrect,
    }
  );

  console.log(currentWord);
  return (
    <main>
      {isGameWon && <Confetti width={width} height={height} />}
      <header className="flex-center flex-col mt-15 w-full md:w-2/3 lg:w-[50%] md:mx-auto">
        <h1 className="md:text-4xl text-3xl text-center font-semibold text-[#F9F4DA]">
          Assembly: Endgame
        </h1>
        <p className="text-center font-medium text-xl text-[#8E8E8E] mt-2">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </p>
      </header>
      <section className={gameStatusClass}>{renderGameStatus()}</section>
      <section className="flex-center flex-wrap gap-1 max-w-[400px] mx-auto my-10 ">
        {languagesBox}
      </section>
      <section className="w-full md:w-[90%] flex-center gap-1 mx-auto flex-wrap">
        {letterElements}
      </section>
      <section className="flex-center flex-wrap gap-3 mt-8 w-full md:w-[80%] lg:w-[50%] mx-auto">
        {keyboardElements}
      </section>
      {isGameOver && (
        <button
          onClick={startNewGame}
          className="bg-[#11B5E5] border-1 border-[#D7D7D7] rounded-[4px] text-[#1E1E1E] text-xl font-bold font-Hanken px-[6px] text-center block w-[225px] h-[40px] mx-auto mt-10 cursor-pointer"
        >
          New Game
        </button>
      )}
    </main>
  );
}

export default Hangman;
