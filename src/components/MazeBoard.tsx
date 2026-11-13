/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useCallback } from 'react';
import { Character, MazeData } from '../types';

interface MazeBoardProps {
  maze: MazeData;
  playerPos: [number, number]; // [row, col]
  character: Character;
  onMove: (direction: 'up' | 'down' | 'left' | 'right') => void;
  isGateLocked: boolean;
}

export const MazeBoard: React.FC<MazeBoardProps> = ({
  maze,
  playerPos,
  character,
  onMove,
  isGateLocked,
}) => {
  const [pRow, pCol] = playerPos;

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isGateLocked) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          onMove('up');
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          onMove('down');
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          onMove('left');
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          onMove('right');
          break;
      }
    },
    [isGateLocked, onMove]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Wall tile decorative variety generator
  const getWallDecoration = (r: number, c: number) => {
    const hash = (r * 7 + c * 13) % 4;
    switch (hash) {
      case 0:
        return '🌲';
      case 1:
        return '🌳';
      case 2:
        return '🪨';
      case 3:
      default:
        return '🍄';
    }
  };

  return (
    <div className="flex flex-col items-center select-none w-full max-w-xl mx-auto">
      {/* Maze Grid Container */}
      <div className="relative p-2.5 sm:p-4 rounded-3xl bg-gradient-to-b from-emerald-900 via-green-950 to-slate-950 border-4 border-amber-400 shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-full overflow-hidden">
        
        {/* Ambient forest header */}
        <div className="flex items-center justify-between text-xs font-bold text-emerald-200 px-2 py-1 mb-2 bg-emerald-950/80 rounded-xl border border-emerald-600/40">
          <div className="flex items-center space-x-1.5">
            <span>🌲 Labirin Hutan Ajaib</span>
          </div>
          <div className="flex items-center space-x-2 text-[11px] text-amber-300">
            <span>Gunakan Keyboard ⬆️⬇️⬅️➡️ atau Tombol HP</span>
          </div>
        </div>

        {/* Dynamic Aspect Ratio Grid */}
        <div
          className="grid gap-0.5 sm:gap-1 bg-emerald-950/90 p-1.5 rounded-2xl border-2 border-emerald-700/60 shadow-inner"
          style={{
            gridTemplateColumns: `repeat(${maze.cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${maze.rows}, minmax(0, 1fr))`,
          }}
        >
          {maze.grid.map((rowArr, r) =>
            rowArr.map((cellVal, c) => {
              const isPlayerHere = pRow === r && pCol === c;
              const isStart = maze.startPos[0] === r && maze.startPos[1] === c;
              const isFinish = maze.finishPos[0] === r && maze.finishPos[1] === c;

              // Check if there is a gate on this cell
              const gate = maze.gates.find((g) => g.row === r && g.col === c);

              // Check if there is a coin on this cell
              const coin = maze.coins.find((cn) => cn.row === r && cn.col === c && !cn.collected);

              // Check if there is a monster on this cell
              const monster = maze.monsters.find((m) => m.row === r && m.col === c);

              const isWall = cellVal === 1;

              return (
                <div
                  key={`${r}-${c}`}
                  className={`relative aspect-square flex items-center justify-center rounded-lg transition-all duration-150 text-center ${
                    isWall
                      ? 'bg-gradient-to-br from-emerald-800 via-green-900 to-emerald-950 shadow-inner text-emerald-300'
                      : isFinish
                      ? 'bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-500 ring-2 ring-yellow-200 animate-pulse-gentle'
                      : isStart
                      ? 'bg-gradient-to-br from-teal-700 to-emerald-800 text-teal-100'
                      : 'bg-amber-100/10 hover:bg-amber-100/20'
                  }`}
                >
                  {/* Wall Item */}
                  {isWall && (
                    <span className="text-[10px] sm:text-xs md:text-sm opacity-80 pointer-events-none">
                      {getWallDecoration(r, c)}
                    </span>
                  )}

                  {/* Start Point */}
                  {!isWall && isStart && (
                    <span className="text-xs sm:text-sm filter drop-shadow" title="Kemah Awal">
                      ⛺
                    </span>
                  )}

                  {/* Finish Portal / Treasure Chest */}
                  {!isWall && isFinish && (
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-sm sm:text-base animate-bounce" title="Pintu FINISH">
                        🎁
                      </span>
                    </div>
                  )}

                  {/* Gate Display */}
                  {!isWall && gate && (
                    <div
                      className={`absolute inset-0 flex items-center justify-center rounded-lg border-2 transition-all ${
                        gate.isOpen
                          ? 'bg-emerald-500/30 border-emerald-400'
                          : 'bg-rose-950/80 border-rose-400 animate-pulse-gentle shadow-md'
                      }`}
                      title={gate.isOpen ? 'Gerbang Terbuka' : `Gerbang ${gate.id} Terkunci`}
                    >
                      <div className="flex flex-col items-center leading-none">
                        <span className="text-xs sm:text-sm">
                          {gate.isOpen ? '⛩️' : '🔒'}
                        </span>
                        {!gate.isOpen && (
                          <span className="text-[7px] font-black bg-rose-500 text-white px-0.5 rounded mt-0.5">
                            G{gate.id}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Coin Display */}
                  {!isWall && coin && !gate && (
                    <span
                      className="text-xs sm:text-sm animate-bounce text-yellow-300 filter drop-shadow"
                      title="Koin Emas"
                    >
                      🪙
                    </span>
                  )}

                  {/* Monster Display */}
                  {!isWall && monster && !isPlayerHere && (
                    <div
                      className="text-xs sm:text-sm animate-float filter drop-shadow"
                      title={`Monster ${monster.name}`}
                    >
                      {monster.emoji}
                    </div>
                  )}

                  {/* Player Character */}
                  {isPlayerHere && (
                    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                      <div className="relative flex items-center justify-center">
                        <span className="absolute -inset-1 rounded-full bg-amber-400/80 animate-ping"></span>
                        <div
                          className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs sm:text-base shadow-lg border-2 border-white bg-gradient-to-br ${character.color} animate-bounce`}
                        >
                          {character.avatar}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Virtual D-Pad for Mobile & Touch Screen Devices */}
      <div className="mt-4 flex flex-col items-center w-full max-w-xs">
        <div className="text-[11px] font-extrabold text-amber-300 uppercase tracking-wider mb-2 flex items-center space-x-1">
          <span>🎮</span>
          <span>Tombol Navigasi HP / Tablet</span>
        </div>

        {/* Up Button */}
        <button
          onClick={() => onMove('up')}
          disabled={isGateLocked}
          className="w-14 h-12 rounded-2xl bg-gradient-to-b from-amber-400 to-yellow-500 text-amber-950 font-black text-xl shadow-[0_4px_0_#b45309] active:translate-y-1 active:shadow-none hover:brightness-105 flex items-center justify-center disabled:opacity-50 cursor-pointer transition-all"
          title="Maju ke Atas"
        >
          ▲
        </button>

        {/* Left, Down, Right Buttons */}
        <div className="flex items-center gap-3 mt-1.5">
          <button
            onClick={() => onMove('left')}
            disabled={isGateLocked}
            className="w-14 h-12 rounded-2xl bg-gradient-to-b from-amber-400 to-yellow-500 text-amber-950 font-black text-xl shadow-[0_4px_0_#b45309] active:translate-y-1 active:shadow-none hover:brightness-105 flex items-center justify-center disabled:opacity-50 cursor-pointer transition-all"
            title="Belok ke Kiri"
          >
            ◀
          </button>

          <button
            onClick={() => onMove('down')}
            disabled={isGateLocked}
            className="w-14 h-12 rounded-2xl bg-gradient-to-b from-amber-400 to-yellow-500 text-amber-950 font-black text-xl shadow-[0_4px_0_#b45309] active:translate-y-1 active:shadow-none hover:brightness-105 flex items-center justify-center disabled:opacity-50 cursor-pointer transition-all"
            title="Maju ke Bawah"
          >
            ▼
          </button>

          <button
            onClick={() => onMove('right')}
            disabled={isGateLocked}
            className="w-14 h-12 rounded-2xl bg-gradient-to-b from-amber-400 to-yellow-500 text-amber-950 font-black text-xl shadow-[0_4px_0_#b45309] active:translate-y-1 active:shadow-none hover:brightness-105 flex items-center justify-center disabled:opacity-50 cursor-pointer transition-all"
            title="Belok ke Kanan"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};
