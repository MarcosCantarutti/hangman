import { useCallback, useEffect, useState } from 'react';
import words from './wordList.json';

import { HangmanDrawing } from './HangmanDrawing.tsx';
import { HangmanWord } from './HangmanWord.tsx';
import { Keyboard } from './Keyboard.tsx';

function App() {
  function getWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  const [wordToGuess, setWordToGuess] = useState(getWord);

  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter),
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || isLoser || isWinner) return;

      setGuessedLetters((currentLetters) => [...currentLetters, letter]);
    },
    [guessedLetters, isWinner, isLoser],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (!key.match(/^[a-z]$/)) return;

      e.preventDefault();
      addGuessedLetter(key);
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [guessedLetters]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;

      if (key !== 'Enter') return;

      e.preventDefault();
      setGuessedLetters([]);
      setWordToGuess(getWord());
    };

    document.addEventListener('keypress', handler);

    return () => {
      document.removeEventListener('keypress', handler);
    };
  }, [guessedLetters]);

  return (
    <div
      style={{
        maxWidth: '900px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
        margin: '0 auto',
        alignItems: 'center',
        padding: '2rem',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '24px',
        boxShadow: 'var(--shadow-xl)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
      }}
      className="fade-in"
    >
      <h1
        style={{
          fontSize: '3rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--bg-gradient-end) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          marginBottom: '1rem',
          letterSpacing: '-0.02em',
        }}
      >
        Hangman Game
      </h1>

      {(isWinner || isLoser) && (
        <div
          style={{
            fontSize: '1.5rem',
            textAlign: 'center',
            padding: '1.5rem 2rem',
            borderRadius: '16px',
            fontWeight: '600',
            color: isWinner ? 'var(--success-color)' : 'var(--error-color)',
            background: isWinner
              ? 'rgba(16, 185, 129, 0.1)'
              : 'rgba(239, 68, 68, 0.1)',
            border: `2px solid ${isWinner ? 'var(--success-color)' : 'var(--error-color)'}`,
            animation: isWinner ? 'pulse 2s ease-in-out infinite' : 'shake 0.5s ease-in-out',
          }}
        >
          {isWinner && '🎉 Winner! Press Enter to play again 🎉'}
          {isLoser && '💀 Nice try! Press Enter to try again! 💀'}
        </div>
      )}

      <HangmanDrawing numberOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLoser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />

      <div style={{ alignSelf: 'stretch', width: '100%' }}>
        <Keyboard
          disabled={isWinner || isLoser}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter),
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  );
}

export default App;
