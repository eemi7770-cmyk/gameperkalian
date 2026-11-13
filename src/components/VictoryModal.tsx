/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { GameStats } from '../types';
import { soundManager, speechManager } from '../utils/sound';
import confetti from 'canvas-confetti';

interface VictoryModalProps {
  stats: GameStats;
  onPlayAgain: () => void;
  onNextLevel?: () => void;
  onBackToMenu: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  stats,
  onPlayAgain,
  onNextLevel,
  onBackToMenu,
}) => {
  useEffect(() => {
    soundManager.playVictory();
    speechManager.speakVictory(stats.playerName);

    // Continuous celebration confetti with gold stars
    const end = Date.now() + 3.5 * 1000;
    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#facc15', '#fbbf24', '#22c55e', '#38bdf8', '#c084fc'],
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#facc15', '#fbbf24', '#22c55e', '#38bdf8', '#c084fc'],
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    return () => {
      speechManager.stop();
    };
  }, [stats.playerName]);

  // Format seconds to mm:ss
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m} menit ${s < 10 ? '0' : ''}${s} detik`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto select-none">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-emerald-900 via-green-950 to-slate-950 rounded-3xl p-5 sm:p-7 border-4 border-amber-400 shadow-[0_25px_60px_rgba(0,0,0,0.8)] text-white text-center my-auto">
        
        {/* Animated Treasure Chest & Stars */}
        <div className="relative mx-auto w-24 h-24 mb-3 flex items-center justify-center">
          <div className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl animate-pulse"></div>
          <span className="text-6xl animate-bounce filter drop-shadow">🎁</span>
          <span className="absolute -top-3 text-3xl animate-float">✨</span>
          <span className="absolute -bottom-1 -right-2 text-2xl">🪙</span>
        </div>

        {/* Victory Title */}
        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-amber-300">
          Misi Selesai! Pintu Keluar Terbuka!
        </p>
        <h2 className="font-heading font-black text-2xl sm:text-3xl text-white mt-1 mb-1">
          SELAMAT, {stats.playerName.toUpperCase()}!
        </h2>
        <p className="text-xs sm:text-sm text-emerald-200 max-w-md mx-auto mb-5">
          Kamu telah berhasil menaklukkan Labirin Perkalian Level {stats.level} dan membuka seluruh peti rahasia hutan ajaib!
        </p>

        {/* Predicate Banner */}
        <div className="inline-block bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 px-5 py-2 rounded-2xl font-heading font-black text-sm sm:text-base uppercase tracking-wider shadow-lg mb-5 border-2 border-white animate-pulse-gentle">
          Predikat: {stats.predicate}
        </div>

        {/* Detailed Stats Grid */}
        <div className="bg-emerald-950/90 rounded-2xl p-4 border-2 border-amber-400/60 shadow-inner mb-6 text-left">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-600/40">
              <span className="text-[10px] text-emerald-300 font-bold block uppercase">
                Total Skor
              </span>
              <span className="text-xl font-heading font-black text-amber-400">
                {stats.score} Poin
              </span>
            </div>

            <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-600/40">
              <span className="text-[10px] text-emerald-300 font-bold block uppercase">
                Jawaban Benar
              </span>
              <span className="text-xl font-heading font-black text-green-400">
                {stats.correctAnswers} / {stats.totalQuestions}
              </span>
            </div>

            <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-600/40">
              <span className="text-[10px] text-emerald-300 font-bold block uppercase">
                Koin Emas
              </span>
              <span className="text-xl font-heading font-black text-yellow-300">
                🪙 {stats.coinsCollected} / {stats.totalCoins}
              </span>
            </div>

            <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-600/40">
              <span className="text-[10px] text-emerald-300 font-bold block uppercase">
                Jawaban Salah
              </span>
              <span className="text-xl font-heading font-black text-rose-400">
                {stats.wrongAnswers}
              </span>
            </div>

            <div className="bg-emerald-900/50 p-2.5 rounded-xl border border-emerald-600/40 sm:col-span-2">
              <span className="text-[10px] text-emerald-300 font-bold block uppercase">
                Waktu Penyelesaian
              </span>
              <span className="text-sm font-heading font-black text-sky-300">
                ⏱️ {formatTime(stats.timeSpentSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {stats.level < 3 && onNextLevel && (
            <button
              onClick={() => {
                speechManager.stop();
                onNextLevel();
              }}
              className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-heading font-black text-sm uppercase tracking-wider shadow-[0_5px_0_#b45309] hover:brightness-105 active:translate-y-1 active:shadow-none cursor-pointer transition-all flex items-center justify-center space-x-2 animate-pulse-gentle"
            >
              <span>⚔️</span>
              <span>LANJUT KE LEVEL {stats.level + 1}</span>
            </button>
          )}

          <button
            onClick={() => {
              speechManager.stop();
              onPlayAgain();
            }}
            className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-emerald-800 hover:bg-emerald-700 text-white font-heading font-extrabold text-sm uppercase tracking-wider border-2 border-emerald-500 shadow-md active:translate-y-1 cursor-pointer transition-all flex items-center justify-center space-x-2"
          >
            <span>🔄</span>
            <span>MAIN LAGI</span>
          </button>

          <button
            onClick={() => {
              speechManager.stop();
              onBackToMenu();
            }}
            className="w-full sm:w-auto flex-1 py-3 px-6 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-amber-200 font-heading font-bold text-sm uppercase tracking-wider border border-emerald-700 active:translate-y-1 cursor-pointer transition-all flex items-center justify-center space-x-2"
          >
            <span>🏠</span>
            <span>MENU UTAMA</span>
          </button>
        </div>
      </div>
    </div>
  );
};
