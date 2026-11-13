/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CharacterGender = 'boy' | 'girl';

export interface Character {
  id: CharacterGender;
  name: string;
  title: string;
  avatar: string;
  color: string;
  accent: string;
  description: string;
}

export type CellType =
  | 'wall'
  | 'path'
  | 'start'
  | 'finish'
  | 'gate'
  | 'coin'
  | 'monster';

export interface MazeGate {
  id: number;
  row: number;
  col: number;
  isOpen: boolean;
  attemptsLeft: number; // Max 3 chances
  questionId?: number;
}

export interface MazeMonster {
  id: number;
  row: number;
  col: number;
  name: string;
  emoji: string;
  direction: 'up' | 'down' | 'left' | 'right';
}

export interface MazeCoin {
  id: number;
  row: number;
  col: number;
  collected: boolean;
}

export interface MazeData {
  rows: number;
  cols: number;
  grid: number[][]; // 0 = path, 1 = wall
  startPos: [number, number]; // [row, col]
  finishPos: [number, number]; // [row, col]
  gates: MazeGate[];
  monsters: MazeMonster[];
  coins: MazeCoin[];
}

export interface Question {
  id: number;
  level: 1 | 2 | 3;
  type: 'single_by_double' | 'double_by_double' | 'three_by_one' | 'word_problem';
  question: string;
  options: string[];
  correctAnswer: number; // 0, 1, 2, 3
  explanation: string;
  hint: string;
}

export interface LearningTopic {
  id: number;
  title: string;
  badge: string;
  subtitle: string;
  content: string[];
  examples: { problem: string; solution: string; step: string }[];
  tips: string;
}

export type GameScreen =
  | 'home'
  | 'material'
  | 'help'
  | 'character_select'
  | 'level_select'
  | 'playing'
  | 'victory';

export interface GameStats {
  playerName: string;
  character: CharacterGender;
  level: 1 | 2 | 3;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  score: number;
  coinsCollected: number;
  totalCoins: number;
  timeSpentSeconds: number;
  predicate: string;
}
