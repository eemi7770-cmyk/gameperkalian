/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Character, CharacterGender } from '../types';

interface LevelSetupProps {
  onStartGame: (character: Character, playerName: string, level: 1 | 2 | 3) => void;
  onBack: () => void;
  initialLevel?: 1 | 2 | 3;
}

export const CHARACTERS: Record<CharacterGender, Character> = {
  boy: {
    id: 'boy',
    name: 'Bima',
    title: 'Petualang Rimba Tangguh',
    avatar: '🤠',
    color: 'from-blue-500 to-indigo-700',
    accent: 'border-blue-400 text-blue-300',
    description: 'Pemberani dengan kompas ajaib dan topi rimba.',
  },
  girl: {
    id: 'girl',
    name: 'Sasa',
    title: 'Peneliti Labirin Cerdik',
    avatar: '👧',
    color: 'from-rose-500 to-pink-700',
    accent: 'border-rose-400 text-rose-300',
    description: 'Pintar berhitung cepat dengan kaca pembesar kristal.',
  },
};

export const LevelSetup: React.FC<LevelSetupProps> = ({
  onStartGame,
  onBack,
  initialLevel = 1,
}) => {
  const [selectedGender, setSelectedGender] = useState<CharacterGender>('boy');
  const [playerName, setPlayerName] = useState<string>('Bima Petualang');
  const [selectedLevel, setSelectedLevel] = useState<1 | 2 | 3>(initialLevel);

  const handleGenderChange = (gender: CharacterGender) => {
    setSelectedGender(gender);
    setPlayerName(gender === 'boy' ? 'Bima Petualang' : 'Sasa Cerdik');
  };

  const handleStart = () => {
    const char = CHARACTERS[selectedGender];
    onStartGame(char, playerName.trim() || char.name, selectedLevel);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-5 sm:p-7 bg-gradient-to-b from-emerald-900/95 via-green-950 to-slate-950 rounded-3xl border-4 border-amber-400 shadow-2xl text-white select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-700/60">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-800 text-amber-200 border border-emerald-600/40 text-xs font-bold transition-all cursor-pointer"
        >
          <span>⬅️</span>
          <span>Kembali</span>
        </button>

        <h2 className="font-heading font-extrabold text-lg sm:text-2xl text-amber-300 text-center">
          Pilih Tokoh & Level Labirin
        </h2>

        <div className="w-16"></div>
      </div>

      {/* 1. Character Select */}
      <div className="mb-6">
        <label className="block font-heading font-extrabold text-xs sm:text-sm text-emerald-200 uppercase tracking-wider mb-2.5 text-center">
          Pilih Tokoh Petualangmu:
        </label>
        <div className="grid grid-cols-2 gap-3.5">
          {(['boy', 'girl'] as CharacterGender[]).map((gender) => {
            const char = CHARACTERS[gender];
            const isSelected = selectedGender === gender;
            return (
              <div
                key={gender}
                onClick={() => handleGenderChange(gender)}
                className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center text-center shadow-md ${
                  isSelected
                    ? 'bg-gradient-to-b from-emerald-800 to-green-900 border-amber-400 ring-4 ring-amber-400/40 scale-102'
                    : 'bg-emerald-950/70 border-emerald-700/50 hover:bg-emerald-900/50'
                }`}
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-lg border-2 border-white mb-2 bg-gradient-to-br ${char.color}`}
                >
                  {char.avatar}
                </div>
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-white">
                  {char.name}
                </h4>
                <p className="text-[10px] text-amber-300 font-semibold mb-1">
                  {char.title}
                </p>
                <p className="text-[10px] text-emerald-200 line-clamp-2">
                  {char.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Player Name Input */}
      <div className="mb-6">
        <label className="block font-heading font-bold text-xs uppercase text-amber-300 mb-1">
          Nama Petualang:
        </label>
        <input
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          maxLength={25}
          placeholder="Masukkan namamu..."
          className="w-full bg-emerald-950 text-white font-bold px-4 py-2.5 rounded-xl border-2 border-emerald-500/60 focus:outline-hidden focus:ring-2 focus:ring-amber-400 text-sm"
        />
      </div>

      {/* 3. Level Select (1, 2, 3) */}
      <div className="mb-6">
        <label className="block font-heading font-extrabold text-xs sm:text-sm text-emerald-200 uppercase tracking-wider mb-2.5 text-center">
          Pilih Tingkat Kesulitan Labirin:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Level 1 */}
          <div
            onClick={() => setSelectedLevel(1)}
            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-center ${
              selectedLevel === 1
                ? 'bg-amber-400 text-amber-950 border-white ring-4 ring-yellow-300/50 scale-102 font-bold'
                : 'bg-emerald-950/80 text-emerald-200 border-emerald-700 hover:bg-emerald-900/60'
            }`}
          >
            <span className="text-xl block mb-1">🌱</span>
            <h5 className="font-heading font-black text-xs uppercase tracking-wide">
              Level 1: Pemula
            </h5>
            <p className="text-[10px] mt-1 opacity-90">
              1 Angka × 2 Angka<br />
              <strong>5 Gerbang Soal</strong>
            </p>
          </div>

          {/* Level 2 */}
          <div
            onClick={() => setSelectedLevel(2)}
            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-center ${
              selectedLevel === 2
                ? 'bg-amber-400 text-amber-950 border-white ring-4 ring-yellow-300/50 scale-102 font-bold'
                : 'bg-emerald-950/80 text-emerald-200 border-emerald-700 hover:bg-emerald-900/60'
            }`}
          >
            <span className="text-xl block mb-1">⚔️</span>
            <h5 className="font-heading font-black text-xs uppercase tracking-wide">
              Level 2: Petualang
            </h5>
            <p className="text-[10px] mt-1 opacity-90">
              2 Angka × 2 Angka<br />
              <strong>7 Gerbang Soal</strong>
            </p>
          </div>

          {/* Level 3 */}
          <div
            onClick={() => setSelectedLevel(3)}
            className={`p-3 rounded-2xl border-2 transition-all cursor-pointer text-center ${
              selectedLevel === 3
                ? 'bg-amber-400 text-amber-950 border-white ring-4 ring-yellow-300/50 scale-102 font-bold'
                : 'bg-emerald-950/80 text-emerald-200 border-emerald-700 hover:bg-emerald-900/60'
            }`}
          >
            <span className="text-xl block mb-1">👑</span>
            <h5 className="font-heading font-black text-xs uppercase tracking-wide">
              Level 3: Master
            </h5>
            <p className="text-[10px] mt-1 opacity-90">
              3 Angka & Soal Cerita<br />
              <strong>10 Gerbang Soal</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Start Adventure Button */}
      <button
        onClick={handleStart}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-heading font-black text-base sm:text-lg uppercase tracking-wider shadow-[0_6px_0_#b45309] hover:scale-102 active:translate-y-1 active:shadow-none cursor-pointer transition-all flex items-center justify-center space-x-2 animate-pulse-gentle"
      >
        <span>🌲 MASUK KE DALAM LABIRIN!</span>
        <span>➔</span>
      </button>
    </div>
  );
};
