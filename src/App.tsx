/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  GameScreen,
  Character,
  MazeData,
  MazeGate,
  Question,
  GameStats,
} from './types';
import { Navbar } from './components/Navbar';
import { HomeScreen } from './components/HomeScreen';
import { MaterialReader } from './components/MaterialReader';
import { LevelSetup, CHARACTERS } from './components/LevelSetup';
import { MazeBoard } from './components/MazeBoard';
import { GateQuestionModal } from './components/GateQuestionModal';
import { VictoryModal } from './components/VictoryModal';
import { InstructionModal } from './components/InstructionModal';
import { getMazeForLevel } from './data/mazeData';
import { getQuestionsForLevel, shuffleArray } from './data/questions';
import { soundManager, speechManager } from './utils/sound';

export default function App() {
  const [screen, setScreen] = useState<GameScreen>('home');
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Player & Level Config
  const [character, setCharacter] = useState<Character>(CHARACTERS.boy);
  const [playerName, setPlayerName] = useState<string>('Bima Petualang');
  const [level, setLevel] = useState<1 | 2 | 3>(1);

  // Maze State
  const [maze, setMaze] = useState<MazeData>(() => getMazeForLevel(1));
  const [playerPos, setPlayerPos] = useState<[number, number]>([1, 1]);
  const [score, setScore] = useState<number>(0);
  const [coinsCollected, setCoinsCollected] = useState<number>(0);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0);
  const [wrongAnswers, setWrongAnswers] = useState<number>(0);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [bannerMessage, setBannerMessage] = useState<string>(
    'Temukan jalan menuju pintu keluar FINISH!'
  );

  // Active Gate & Question
  const [activeGate, setActiveGate] = useState<MazeGate | null>(null);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const questionPoolRef = useRef<Question[]>([]);
  const questionIndexRef = useRef<number>(0);

  // Game Victory Stats
  const [stats, setStats] = useState<GameStats | null>(null);

  // Timer interval while playing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (screen === 'playing') {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [screen]);

  // Monster subtle pacing animation
  useEffect(() => {
    if (screen !== 'playing') return;

    const monsterInterval = setInterval(() => {
      setMaze((prev) => {
        const updatedMonsters = prev.monsters.map((m) => {
          // Subtle patrol step (1 tile back and forth horizontally or vertically if path free)
          const deltas: Record<string, [number, number]> = {
            left: [0, -1],
            right: [0, 1],
            up: [-1, 0],
            down: [1, 0],
          };
          const [dr, dc] = deltas[m.direction];
          const newR = m.row + dr;
          const newC = m.col + dc;

          // Check if destination is inside bounds and is a walkable path without wall or gate
          const isPath =
            newR >= 0 &&
            newR < prev.rows &&
            newC >= 0 &&
            newC < prev.cols &&
            prev.grid[newR][newC] === 0 &&
            !prev.gates.some((g) => g.row === newR && g.col === newC);

          if (isPath) {
            return { ...m, row: newR, col: newC };
          } else {
            // Reverse direction
            const reversed: Record<string, 'up' | 'down' | 'left' | 'right'> = {
              left: 'right',
              right: 'left',
              up: 'down',
              down: 'up',
            };
            return { ...m, direction: reversed[m.direction] };
          }
        });

        return { ...prev, monsters: updatedMonsters };
      });
    }, 1800);

    return () => clearInterval(monsterInterval);
  }, [screen]);

  // Start new level game
  const handleStartGame = (
    chosenCharacter: Character,
    name: string,
    chosenLevel: 1 | 2 | 3
  ) => {
    setCharacter(chosenCharacter);
    setPlayerName(name);
    setLevel(chosenLevel);

    const newMaze = getMazeForLevel(chosenLevel);
    setMaze(newMaze);
    setPlayerPos([newMaze.startPos[0], newMaze.startPos[1]]);
    setScore(0);
    setCoinsCollected(0);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setTimeSpent(0);
    setActiveGate(null);
    setActiveQuestion(null);
    setStats(null);

    // Initialize question deck for this level
    const questions = getQuestionsForLevel(chosenLevel);
    questionPoolRef.current = shuffleArray(questions);
    questionIndexRef.current = 0;

    setBannerMessage(
      `Selamat berpetualang ${name}! Cari pintu keluar FINISH dan buka gerbangnya!`
    );
    setScreen('playing');

    speechManager.speakGameStart(name);
  };

  // Next Question Helper
  const getNextQuestion = (): Question => {
    if (
      questionPoolRef.current.length === 0 ||
      questionIndexRef.current >= questionPoolRef.current.length
    ) {
      questionPoolRef.current = getQuestionsForLevel(level);
      questionIndexRef.current = 0;
    }
    const q = questionPoolRef.current[questionIndexRef.current];
    questionIndexRef.current += 1;
    return q;
  };

  // Movement Logic
  const handleMove = useCallback(
    (direction: 'up' | 'down' | 'left' | 'right') => {
      if (screen !== 'playing' || activeGate !== null) return;

      const [curR, curC] = playerPos;
      let targetR = curR;
      let targetC = curC;

      switch (direction) {
        case 'up':
          targetR -= 1;
          break;
        case 'down':
          targetR += 1;
          break;
        case 'left':
          targetC -= 1;
          break;
        case 'right':
          targetC += 1;
          break;
      }

      // Check bounds
      if (
        targetR < 0 ||
        targetR >= maze.rows ||
        targetC < 0 ||
        targetC >= maze.cols
      ) {
        return;
      }

      // Check Wall
      if (maze.grid[targetR][targetC] === 1) {
        return; // Blocked by wall
      }

      // Check Gate
      const gate = maze.gates.find((g) => g.row === targetR && g.col === targetC);
      if (gate && !gate.isOpen) {
        // Locked Gate!
        soundManager.playGateEncounter();
        setActiveGate(gate);
        setActiveQuestion(getNextQuestion());
        setBannerMessage(`🔒 Gerbang #${gate.id} terkunci! Selesaikan soal perkalian!`);
        speechManager.speakGateEncounter(gate.id);
        return;
      }

      // Valid step -> move player!
      setPlayerPos([targetR, targetC]);
      soundManager.playStep();

      // Check Coin collection
      const coin = maze.coins.find(
        (cn) => cn.row === targetR && cn.col === targetC && !cn.collected
      );
      if (coin) {
        soundManager.playCoin();
        setCoinsCollected((prev) => prev + 1);
        setScore((prev) => prev + 5);
        setBannerMessage(`🪙 Koin Emas didapatkan! (+5 Poin)`);
        setMaze((prev) => ({
          ...prev,
          coins: prev.coins.map((c) =>
            c.id === coin.id ? { ...c, collected: true } : c
          ),
        }));
      }

      // Check Monster collision
      const monster = maze.monsters.find(
        (m) => m.row === targetR && m.col === targetC
      );
      if (monster) {
        soundManager.playMonsterBump();
        speechManager.speakMonsterBump();
        setBannerMessage(`👾 Awas! Kamu bertabrakan dengan monster ${monster.name}!`);
        // Push back
        setPlayerPos([curR, curC]);
        return;
      }

      // Check Finish Portal / Treasure Chest
      if (
        targetR === maze.finishPos[0] &&
        targetC === maze.finishPos[1]
      ) {
        handleVictory();
      }
    },
    [activeGate, maze, playerPos, screen]
  );

  // Question Answer Complete Handler
  const handleAnswerSubmit = (isCorrect: boolean, attemptsRemaining: number) => {
    if (!activeGate) return;

    if (isCorrect) {
      setCorrectAnswers((prev) => prev + 1);
      setScore((prev) => prev + 10);
      setBannerMessage(`🎉 Hebat! Gerbang #${activeGate.id} terbuka! (+10 Poin)`);

      // Open gate in maze
      setMaze((prev) => ({
        ...prev,
        gates: prev.gates.map((g) =>
          g.id === activeGate.id ? { ...g, isOpen: true } : g
        ),
      }));

      // Auto-step through the gate!
      setPlayerPos([activeGate.row, activeGate.col]);
    } else {
      setWrongAnswers((prev) => prev + 1);

      if (attemptsRemaining === 0) {
        // Unlocked as fallback with 0 points so student is not permanently trapped
        setBannerMessage(`Gerbang #${activeGate.id} terbuka setelah membaca pembahasan.`);
        setMaze((prev) => ({
          ...prev,
          gates: prev.gates.map((g) =>
            g.id === activeGate.id ? { ...g, isOpen: true } : g
          ),
        }));
        setPlayerPos([activeGate.row, activeGate.col]);
      } else {
        // Still has chances
        setMaze((prev) => ({
          ...prev,
          gates: prev.gates.map((g) =>
            g.id === activeGate.id ? { ...g, attemptsLeft: attemptsRemaining } : g
          ),
        }));
      }
    }

    setActiveGate(null);
    setActiveQuestion(null);
  };

  // Victory Trigger
  const handleVictory = () => {
    const totalQ = correctAnswers + wrongAnswers || 1;
    const accuracy = Math.round((correctAnswers / totalQ) * 100);

    let predicate = 'Petualang Master 🏆';
    if (accuracy >= 90) {
      predicate = 'Petualang Master 🏆';
    } else if (accuracy >= 80) {
      predicate = 'Petualang Hebat 🌟';
    } else if (accuracy >= 70) {
      predicate = 'Petualang Cerdas 🧠';
    } else {
      predicate = 'Ayo Berlatih Lagi 📚';
    }

    // Bonus 50 points for completing the maze
    const finalScore = score + 50;

    const gameStats: GameStats = {
      playerName,
      character: character.id,
      level,
      totalQuestions: totalQ,
      correctAnswers,
      wrongAnswers,
      score: finalScore,
      coinsCollected,
      totalCoins: maze.coins.length,
      timeSpentSeconds: timeSpent,
      predicate,
    };

    setStats(gameStats);
    setBannerMessage(`🏆 LUAR BIASA! Kamu berhasil keluar dari labirin!`);
    setScreen('victory');
  };

  // Next level handler
  const handleNextLevel = () => {
    if (level < 3) {
      const nextLvl = (level + 1) as 1 | 2 | 3;
      handleStartGame(character, playerName, nextLvl);
    }
  };

  // Format seconds mm:ss
  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen bg-radial-[at_50%_0%] from-emerald-900 via-green-950 to-slate-950 text-white flex flex-col font-['Quicksand',sans-serif]">
      {/* Top Navbar */}
      <Navbar
        onOpenHelp={() => setIsHelpOpen(true)}
        onGoHome={() => {
          speechManager.stop();
          setScreen('home');
        }}
        currentScreen={screen}
      />

      {/* Main Screen Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-2 sm:p-4 md:p-6 w-full max-w-7xl mx-auto">
        {screen === 'home' && (
          <HomeScreen
            onStartAdventure={() => setScreen('character_select')}
            onReadMaterial={() => setScreen('material')}
            onOpenHelp={() => setIsHelpOpen(true)}
          />
        )}

        {screen === 'material' && (
          <MaterialReader
            onStartGame={() => setScreen('character_select')}
            onBackToMenu={() => setScreen('home')}
          />
        )}

        {screen === 'character_select' && (
          <LevelSetup
            onStartGame={handleStartGame}
            onBack={() => setScreen('home')}
            initialLevel={level}
          />
        )}

        {screen === 'playing' && (
          <div className="w-full flex flex-col items-center space-y-3">
            {/* Live Status Bar */}
            <div className="w-full max-w-xl bg-emerald-950/90 border-2 border-amber-400/60 rounded-2xl px-3 py-2 flex items-center justify-between shadow-lg text-xs sm:text-sm">
              <div className="flex items-center space-x-2 min-w-0">
                <span className="text-xl shrink-0">
                  {character.avatar}
                </span>
                <div className="min-w-0">
                  <span className="font-heading font-extrabold text-amber-300 block truncate">
                    {playerName} (Level {level})
                  </span>
                  <span className="text-[10px] text-emerald-300 block truncate">
                    {bannerMessage}
                  </span>
                </div>
              </div>

              {/* Stats Counters */}
              <div className="flex items-center space-x-2 shrink-0">
                <div className="bg-emerald-900/80 px-2 py-0.5 rounded-lg border border-emerald-600/50 flex items-center space-x-1">
                  <span>🪙</span>
                  <span className="font-mono font-black text-amber-300">
                    {coinsCollected}
                  </span>
                </div>

                <div className="bg-emerald-900/80 px-2 py-0.5 rounded-lg border border-emerald-600/50 flex items-center space-x-1">
                  <span>⭐</span>
                  <span className="font-mono font-black text-yellow-300">
                    {score}
                  </span>
                </div>

                <div className="bg-emerald-900/80 px-2 py-0.5 rounded-lg border border-emerald-600/50 text-[11px] font-mono text-emerald-200">
                  ⏱️ {formatTimer(timeSpent)}
                </div>
              </div>
            </div>

            {/* Maze Board and Touch Controls */}
            <MazeBoard
              maze={maze}
              playerPos={playerPos}
              character={character}
              onMove={handleMove}
              isGateLocked={activeGate !== null}
            />
          </div>
        )}

        {screen === 'victory' && stats && (
          <VictoryModal
            stats={stats}
            onPlayAgain={() => handleStartGame(character, playerName, level)}
            onNextLevel={level < 3 ? handleNextLevel : undefined}
            onBackToMenu={() => {
              speechManager.stop();
              setScreen('home');
            }}
          />
        )}
      </main>

      {/* Gate Question Modal */}
      {activeGate && activeQuestion && (
        <GateQuestionModal
          gateId={activeGate.id}
          question={activeQuestion}
          attemptsLeft={activeGate.attemptsLeft}
          onAnswerSubmit={handleAnswerSubmit}
        />
      )}

      {/* Rules / Help Modal */}
      <InstructionModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Footer */}
      <footer className="w-full text-center py-2.5 text-[11px] text-emerald-300/70 border-t border-emerald-800/40 bg-emerald-950/70">
        <p>
          Misi Menaklukkan Labirin Perkalian • Media Pembelajaran Matematika Kelas 5 SD Kurikulum Merdeka
        </p>
      </footer>
    </div>
  );
}
