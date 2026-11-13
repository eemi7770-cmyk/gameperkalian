/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { MULTIPLICATION_MATERIALS } from '../data/materials';
import { speechManager } from '../utils/sound';

interface MaterialReaderProps {
  onStartGame: () => void;
  onBackToMenu: () => void;
}

export const MaterialReader: React.FC<MaterialReaderProps> = ({
  onStartGame,
  onBackToMenu,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const topic = MULTIPLICATION_MATERIALS[currentIndex];

  const speakCurrentTopic = useCallback(() => {
    setIsSpeaking(true);
    const contentText = topic.content.join(' ');
    const examplesText = topic.examples
      .map((ex) => `Contoh: ${ex.problem} hasilnya ${ex.solution}. Langkahnya: ${ex.step}`)
      .join(' ');
    const fullText = `${topic.title}. ${topic.subtitle}. ${contentText} ${examplesText} Tips penting: ${topic.tips}`;

    speechManager.speak(fullText, () => {
      setIsSpeaking(false);
    });
  }, [topic]);

  useEffect(() => {
    speakCurrentTopic();
    return () => {
      speechManager.stop();
    };
  }, [currentIndex, speakCurrentTopic]);

  const handleNext = () => {
    speechManager.stop();
    if (currentIndex < MULTIPLICATION_MATERIALS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    speechManager.stop();
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleToggleVoice = () => {
    if (isSpeaking) {
      speechManager.stop();
      setIsSpeaking(false);
    } else {
      speakCurrentTopic();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 sm:p-6 bg-gradient-to-b from-emerald-900/95 via-green-950 to-slate-950 rounded-3xl border-4 border-amber-400 shadow-2xl text-white select-none">
      {/* Top Bar with back to menu and progress */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-700/60">
        <button
          onClick={() => {
            speechManager.stop();
            onBackToMenu();
          }}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-800 text-amber-200 border border-emerald-600/40 text-xs font-bold transition-all cursor-pointer"
        >
          <span>⬅️</span>
          <span>Menu Utama</span>
        </button>

        {/* Stepper buttons */}
        <div className="flex items-center space-x-1 sm:space-x-1.5">
          {MULTIPLICATION_MATERIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                speechManager.stop();
                setCurrentIndex(idx);
              }}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-heading font-extrabold text-xs flex items-center justify-center transition-all cursor-pointer ${
                idx === currentIndex
                  ? 'bg-amber-400 text-amber-950 ring-2 ring-white scale-110 shadow-md'
                  : idx < currentIndex
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-950 text-emerald-400 border border-emerald-700'
              }`}
              title={`Materi ${idx + 1}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        {/* Voice Controls */}
        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleToggleVoice}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center space-x-1 shadow-sm transition-all cursor-pointer ${
              isSpeaking
                ? 'bg-rose-500 hover:bg-rose-600 text-white animate-pulse'
                : 'bg-amber-400 hover:bg-amber-300 text-amber-950'
            }`}
          >
            <span>{isSpeaking ? '⏹️' : '🔊'}</span>
            <span className="hidden sm:inline">
              {isSpeaking ? 'Jeda Suara' : 'Dengarkan Materi'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Material Card */}
      <div className="bg-emerald-950/90 rounded-2xl p-4 sm:p-6 border border-emerald-500/40 shadow-inner">
        {/* Topic Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center space-x-3">
            <span className="text-3xl p-2 bg-emerald-800 rounded-2xl shadow-inner">
              📚
            </span>
            <div>
              <span className="inline-block bg-amber-400 text-amber-950 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-0.5">
                {topic.badge}
              </span>
              <h2 className="font-heading font-extrabold text-lg sm:text-2xl text-white">
                {topic.title}
              </h2>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-amber-200 italic font-medium mb-4">
          "{topic.subtitle}"
        </p>

        {/* Explanatory Paragraphs */}
        <div className="space-y-2.5 mb-5">
          {topic.content.map((p, pIdx) => (
            <p
              key={pIdx}
              className="text-xs sm:text-sm text-slate-100 leading-relaxed bg-emerald-900/40 p-3 rounded-xl border border-emerald-700/30 font-normal"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Examples Showcase Cards */}
        <div className="bg-emerald-900/70 rounded-2xl p-4 border border-emerald-500/40 mb-4">
          <h4 className="font-heading font-extrabold text-xs sm:text-sm text-amber-300 uppercase tracking-wider mb-3 flex items-center space-x-2">
            <span>✨</span>
            <span>Contoh Pengerjaan Kelas 5 SD:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {topic.examples.map((ex, eIdx) => (
              <div
                key={eIdx}
                className="bg-emerald-950/90 rounded-xl p-3 border border-emerald-600/50 shadow-sm"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono font-black text-sm text-amber-300">
                    {ex.problem}
                  </span>
                  <span className="font-mono font-black text-xs bg-emerald-700 text-white px-2 py-0.5 rounded-md">
                    = {ex.solution}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1 font-medium">
                  {ex.step}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Box */}
        <div className="bg-amber-500/20 rounded-2xl p-3 border-2 border-amber-400/50 flex items-center space-x-3 text-amber-100 text-xs sm:text-sm">
          <span className="text-2xl shrink-0">💡</span>
          <p className="font-medium">
            <strong>Tips Petualang:</strong> {topic.tips}
          </p>
        </div>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-3 border-t border-emerald-700/60">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`px-4 py-2.5 rounded-xl font-heading font-bold text-xs sm:text-sm uppercase tracking-wide flex items-center space-x-2 transition-all ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed bg-emerald-950 text-slate-500'
              : 'bg-emerald-800 hover:bg-emerald-700 text-white shadow-md cursor-pointer'
          }`}
        >
          <span>⬅️</span>
          <span>Sebelumnya</span>
        </button>

        <span className="text-xs font-bold text-amber-300">
          Materi {currentIndex + 1} dari {MULTIPLICATION_MATERIALS.length}
        </span>

        {currentIndex < MULTIPLICATION_MATERIALS.length - 1 ? (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wide bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 shadow-[0_4px_0_#b45309] active:translate-y-1 active:shadow-none flex items-center space-x-2 cursor-pointer transition-all"
          >
            <span>Selanjutnya</span>
            <span>➔</span>
          </button>
        ) : (
          <button
            onClick={() => {
              speechManager.stop();
              onStartGame();
            }}
            className="px-6 py-2.5 rounded-xl font-heading font-black text-xs sm:text-base uppercase tracking-wider bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-amber-950 shadow-[0_5px_0_#b45309] hover:scale-105 active:translate-y-1 active:shadow-none flex items-center space-x-2 cursor-pointer transition-all animate-pulse-gentle"
          >
            <span>🚀 MULAI PETUALANGAN!</span>
            <span>➔</span>
          </button>
        )}
      </div>
    </div>
  );
};
