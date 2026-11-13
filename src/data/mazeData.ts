/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MazeData, MazeGate, MazeMonster, MazeCoin } from '../types';

/**
 * 0 = Walkable Path
 * 1 = Wall (Lush Magic Forest Trees / Stones / Mushrooms)
 */

// ==========================================
// LEVEL 1: LABIRIN PEMULA (11 x 11) - 5 Gerbang
// ==========================================
const LEVEL_1_GRID: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], // (1,1) START
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1], // (9,9) FINISH
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const LEVEL_1_GATES: MazeGate[] = [
  { id: 1, row: 1, col: 3, isOpen: false, attemptsLeft: 3 },
  { id: 2, row: 3, col: 5, isOpen: false, attemptsLeft: 3 },
  { id: 3, row: 5, col: 3, isOpen: false, attemptsLeft: 3 },
  { id: 4, row: 7, col: 5, isOpen: false, attemptsLeft: 3 },
  { id: 5, row: 9, col: 7, isOpen: false, attemptsLeft: 3 },
];

const LEVEL_1_MONSTERS: MazeMonster[] = [
  { id: 1, row: 5, col: 6, name: 'Grompy', emoji: '👾', direction: 'left' },
];

const LEVEL_1_COINS: MazeCoin[] = [
  { id: 1, row: 1, col: 2, collected: false },
  { id: 2, row: 1, col: 7, collected: false },
  { id: 3, row: 3, col: 1, collected: false },
  { id: 4, row: 3, col: 9, collected: false },
  { id: 5, row: 5, col: 4, collected: false },
  { id: 6, row: 7, col: 1, collected: false },
  { id: 7, row: 7, col: 8, collected: false },
  { id: 8, row: 9, col: 3, collected: false },
];

// ==========================================
// LEVEL 2: LABIRIN PETUALANG (13 x 13) - 7 Gerbang
// ==========================================
const LEVEL_2_GRID: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], // (1,1) START
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1], // (11,11) FINISH
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const LEVEL_2_GATES: MazeGate[] = [
  { id: 1, row: 1, col: 3, isOpen: false, attemptsLeft: 3 },
  { id: 2, row: 3, col: 4, isOpen: false, attemptsLeft: 3 },
  { id: 3, row: 5, col: 2, isOpen: false, attemptsLeft: 3 },
  { id: 4, row: 5, col: 7, isOpen: false, attemptsLeft: 3 },
  { id: 5, row: 7, col: 4, isOpen: false, attemptsLeft: 3 },
  { id: 6, row: 9, col: 8, isOpen: false, attemptsLeft: 3 },
  { id: 7, row: 11, col: 7, isOpen: false, attemptsLeft: 3 },
];

const LEVEL_2_MONSTERS: MazeMonster[] = [
  { id: 1, row: 5, col: 10, name: 'Blinky', emoji: '🦊', direction: 'up' },
  { id: 2, row: 9, col: 4, name: 'Puff', emoji: '🦔', direction: 'right' },
];

const LEVEL_2_COINS: MazeCoin[] = [
  { id: 1, row: 1, col: 2, collected: false },
  { id: 2, row: 1, col: 6, collected: false },
  { id: 3, row: 1, col: 11, collected: false },
  { id: 4, row: 3, col: 3, collected: false },
  { id: 5, row: 5, col: 5, collected: false },
  { id: 6, row: 7, col: 1, collected: false },
  { id: 7, row: 7, col: 11, collected: false },
  { id: 8, row: 9, col: 3, collected: false },
  { id: 9, row: 11, col: 2, collected: false },
  { id: 10, row: 11, col: 9, collected: false },
];

// ==========================================
// LEVEL 3: LABIRIN MASTER (15 x 15) - 10 Gerbang
// ==========================================
const LEVEL_3_GRID: number[][] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1], // (1,1) START
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], // (13,13) FINISH
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const LEVEL_3_GATES: MazeGate[] = [
  { id: 1, row: 1, col: 3, isOpen: false, attemptsLeft: 3 },
  { id: 2, row: 1, col: 8, isOpen: false, attemptsLeft: 3 },
  { id: 3, row: 3, col: 4, isOpen: false, attemptsLeft: 3 },
  { id: 4, row: 5, col: 3, isOpen: false, attemptsLeft: 3 },
  { id: 5, row: 5, col: 10, isOpen: false, attemptsLeft: 3 },
  { id: 6, row: 7, col: 6, isOpen: false, attemptsLeft: 3 },
  { id: 7, row: 9, col: 4, isOpen: false, attemptsLeft: 3 },
  { id: 8, row: 9, col: 12, isOpen: false, attemptsLeft: 3 },
  { id: 9, row: 11, col: 4, isOpen: false, attemptsLeft: 3 },
  { id: 10, row: 13, col: 8, isOpen: false, attemptsLeft: 3 },
];

const LEVEL_3_MONSTERS: MazeMonster[] = [
  { id: 1, row: 3, col: 9, name: 'Giggle', emoji: '🧌', direction: 'down' },
  { id: 2, row: 7, col: 2, name: 'Spooky', emoji: '🦉', direction: 'right' },
  { id: 3, row: 11, col: 10, name: 'Zippy', emoji: '🐲', direction: 'left' },
];

const LEVEL_3_COINS: MazeCoin[] = [
  { id: 1, row: 1, col: 2, collected: false },
  { id: 2, row: 1, col: 6, collected: false },
  { id: 3, row: 1, col: 12, collected: false },
  { id: 4, row: 3, col: 2, collected: false },
  { id: 5, row: 5, col: 7, collected: false },
  { id: 6, row: 7, col: 1, collected: false },
  { id: 7, row: 7, col: 10, collected: false },
  { id: 8, row: 9, col: 2, collected: false },
  { id: 9, row: 9, col: 8, collected: false },
  { id: 10, row: 11, col: 2, collected: false },
  { id: 11, row: 11, col: 8, collected: false },
  { id: 12, row: 13, col: 2, collected: false },
  { id: 13, row: 13, col: 10, collected: false },
];

export function getMazeForLevel(level: 1 | 2 | 3): MazeData {
  switch (level) {
    case 1:
      return {
        rows: 11,
        cols: 11,
        grid: LEVEL_1_GRID.map((r) => [...r]),
        startPos: [1, 1],
        finishPos: [9, 9],
        gates: LEVEL_1_GATES.map((g) => ({ ...g })),
        monsters: LEVEL_1_MONSTERS.map((m) => ({ ...m })),
        coins: LEVEL_1_COINS.map((c) => ({ ...c })),
      };
    case 2:
      return {
        rows: 13,
        cols: 13,
        grid: LEVEL_2_GRID.map((r) => [...r]),
        startPos: [1, 1],
        finishPos: [11, 11],
        gates: LEVEL_2_GATES.map((g) => ({ ...g })),
        monsters: LEVEL_2_MONSTERS.map((m) => ({ ...m })),
        coins: LEVEL_2_COINS.map((c) => ({ ...c })),
      };
    case 3:
    default:
      return {
        rows: 15,
        cols: 15,
        grid: LEVEL_3_GRID.map((r) => [...r]),
        startPos: [1, 1],
        finishPos: [13, 13],
        gates: LEVEL_3_GATES.map((g) => ({ ...g })),
        monsters: LEVEL_3_MONSTERS.map((m) => ({ ...m })),
        coins: LEVEL_3_COINS.map((c) => ({ ...c })),
      };
  }
}
