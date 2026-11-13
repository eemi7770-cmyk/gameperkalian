/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { soundManager } from '../utils/sound';

interface HomeScreenProps {
  onStartAdventure: () => void;
  onReadMaterial: () => void;
  onOpenHelp: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartAdventure,
  onReadMaterial,
  onOpenHelp,
}) => {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(soundManager.soundEnabled);

  const handleToggleSound = () => {
    soundManager.soundEnabled = !soundEnabled;
    soundManager.ttsEnabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      soundManager.playCoin();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center p-3 sm:p-6 select-none animate-fadeIn">
      {/* Grade 5 Badge */}
      <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-800 via-green-700 to-emerald-800 text-amber-300 px-4 py-1.5 rounded-full border border-emerald-400/50 shadow-md mb-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider">
        <span>⭐</span>
        <span>Matematika Kelas 5 SD • Perkalian Bilangan Cacah</span>
        <span>✨</span>
      </div>

      {/* Main Title */}
      <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase drop-shadow-[0_4px_8px_rgba(0,0,0,0.7)] mb-2">
        <span className="text-amber-300 block sm:inline">MISI MENAKLUKKAN</span>{' '}
        <span className="bg-gradient-to-r from-green-300 via-emerald-200 to-teal-300 bg-clip-text text-transparent">
          LABIRIN PERKALIAN!
        </span>
      </h1>

      <p className="text-sm sm:text-base text-emerald-100 max-w-2xl font-medium mb-6">
        Masuki hutan ajaib yang penuh misteri, pecahkan soal perkalian untuk membuka gerbang rahasia, kumpulkan koin emas, dan temukan peti harta karun legendaris!
      </p>

      {/* 3D-styled Cartoon Enchanted Forest Landscape Banner */}
      <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden bg-gradient-to-b from-sky-400 via-emerald-100 to-emerald-300 border-4 border-amber-400 shadow-[0_20px_50px_rgba(0,0,0,0.6)] p-4 sm:p-6 mb-8">
        
        {/* Sky Elements */}
        <div className="flex justify-between items-start mb-2 pointer-events-none">
          <div className="flex items-center space-x-2">
            <span className="text-4xl animate-bounce">☀️</span>
            <span className="text-2xl opacity-75">☁️</span>
          </div>
          <div className="text-right">
            <span className="text-3xl animate-float">🦉</span>
          </div>
        </div>

        {/* Scenic Enchanted Labyrinth Landscape */}
        <div className="relative py-4 flex flex-col items-center">
          <div className="flex items-end justify-center space-x-4 sm:space-x-8 mb-4">
            <div className="text-center">
              <span className="text-4xl sm:text-5xl">🌲</span>
              <p className="text-[10px] font-bold text-emerald-900">Pohon Rimbun</p>
            </div>
            <div className="text-center">
              <span className="text-4xl sm:text-5xl animate-bounce">🎁</span>
              <p className="text-[10px] font-bold text-amber-900">Peti Emas</p>
            </div>
            <div className="text-center">
              <span className="text-4xl sm:text-5xl">🍄</span>
              <p className="text-[10px] font-bold text-purple-900">Jamur Ajaib</p>
            </div>
            <div className="text-center">
              <span className="text-4xl sm:text-5xl animate-float">👾</span>
              <p className="text-[10px] font-bold text-indigo-900">Monster Lucu</p>
            </div>
          </div>

          {/* Adventurer Characters Cards */}
          <div className="w-full bg-white/95 backdrop-blur rounded-2xl p-3 sm:p-4 border-2 border-emerald-400 shadow-md flex items-center justify-around flex-wrap gap-3">
            {/* Bima */}
            <div className="flex items-center space-x-2 text-left">
              <span className="text-4xl">🤠</span>
              <div>
                <p className="text-xs font-black text-slate-800">Bima Petualang</p>
                <p className="text-[10px] text-blue-600 font-semibold">Kompas Ajaib & Topi Rimba</p>
              </div>
            </div>

            <div className="hidden sm:block h-8 w-px bg-slate-300"></div>

            {/* Sasa */}
            <div className="flex items-center space-x-2 text-left">
              <span className="text-4xl">👧</span>
              <div>
                <p className="text-xs font-black text-slate-800">Sasa Cerdik</p>
                <p className="text-[10px] text-rose-600 font-semibold">Kaca Pembesar & Peta Labirin</p>
              </div>
            </div>
          </div>

          {/* Gameplay elements preview */}
          <div className="mt-3 flex items-center justify-center space-x-3 text-xs font-bold text-emerald-950">
            <span className="bg-amber-300/90 px-3 py-1 rounded-full border border-amber-500 shadow-sm flex items-center space-x-1">
              <span>🪙</span>
              <span>Koin Emas (+5 Poin)</span>
            </span>
            <span className="bg-rose-200/90 px-3 py-1 rounded-full border border-rose-400 shadow-sm flex items-center space-x-1">
              <span>🔒 ➔ ⛩️</span>
              <span>Gerbang Soal (+10 Poin)</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Action Buttons */}
      <div className="w-full max-w-md flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-6">
        {/* MULAI PETUALANGAN */}
        <button
          onClick={() => {
            soundManager.playStep();
            onStartAdventure();
          }}
          className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-heading font-black text-base sm:text-lg uppercase tracking-wider shadow-[0_6px_0_#b45309] hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer transition-all flex items-center justify-center space-x-2 animate-pulse-gentle"
        >
          <span>🚀</span>
          <span>MULAI PETUALANGAN</span>
        </button>

        {/* MATERI PERKALIAN */}
        <button
          onClick={() => {
            soundManager.playStep();
            onReadMaterial();
          }}
          className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-heading font-black text-base sm:text-lg uppercase tracking-wider shadow-[0_6px_0_#15803d] hover:scale-105 active:translate-y-1 active:shadow-none cursor-pointer transition-all flex items-center justify-center space-x-2"
        >
          <span>📚</span>
          <span>MATERI PERKALIAN</span>
        </button>
      </div>

      {/* Secondary Controls (PETUNJUK BERMAIN & AKTIFKAN SUARA) */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <button
          onClick={onOpenHelp}
          className="px-5 py-2.5 rounded-2xl bg-emerald-900/90 hover:bg-emerald-800 text-amber-200 border-2 border-emerald-500/60 font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:scale-105 cursor-pointer transition-all flex items-center space-x-2"
        >
          <span>❓</span>
          <span>PETUNJUK BERMAIN</span>
        </button>

        <button
          onClick={handleToggleSound}
          className={`px-5 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:scale-105 cursor-pointer transition-all flex items-center space-x-2 border-2 ${
            soundEnabled
              ? 'bg-amber-400 text-amber-950 border-amber-300'
              : 'bg-emerald-950 text-slate-300 border-emerald-700'
          }`}
        >
          <span>{soundEnabled ? '🔊' : '🔇'}</span>
          <span>{soundEnabled ? 'SUARA AKTIF' : 'AKTIFKAN SUARA'}</span>
        </button>
      </div>

      {/* Features Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-3xl">
        <div className="bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/40 text-center">
          <span className="text-2xl mb-1 block">🌲</span>
          <h4 className="font-heading font-bold text-xs text-amber-300">3 Level Labirin</h4>
          <p className="text-[10px] text-emerald-200">Pemula, Petualang & Master</p>
        </div>

        <div className="bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/40 text-center">
          <span className="text-2xl mb-1 block">❓</span>
          <h4 className="font-heading font-bold text-xs text-amber-300">Bank 32 Soal</h4>
          <p className="text-[10px] text-emerald-200">Perkalian bersusun & soal cerita</p>
        </div>

        <div className="bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/40 text-center">
          <span className="text-2xl mb-1 block">🗣️</span>
          <h4 className="font-heading font-bold text-xs text-amber-300">Suara Ibu Guru</h4>
          <p className="text-[10px] text-emerald-200">Narator ramah Bahasa Indonesia</p>
        </div>

        <div className="bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/40 text-center">
          <span className="text-2xl mb-1 block">📱</span>
          <h4 className="font-heading font-bold text-xs text-amber-300">Tombol D-Pad HP</h4>
          <p className="text-[10px] text-emerald-200">Bisa dimainkan di HP & Laptop</p>
        </div>
      </div>
    </div>
  );
};
