/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Question } from '../types';
import { soundManager, speechManager } from '../utils/sound';
import confetti from 'canvas-confetti';

interface GateQuestionModalProps {
  gateId: number;
  question: Question;
  attemptsLeft: number;
  onAnswerSubmit: (isCorrect: boolean, attemptsRemaining: number) => void;
}

export const GateQuestionModal: React.FC<GateQuestionModalProps> = ({
  gateId,
  question,
  attemptsLeft,
  onAnswerSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [currentAttempts, setCurrentAttempts] = useState<number>(attemptsLeft);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);
  const [scratchpadNote, setScratchpadNote] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  // Read question and options in Indonesian
  const readQuestion = useCallback(() => {
    setIsSpeaking(true);
    const prefixes = ['A', 'B', 'C', 'D'];
    const optionsText = question.options
      .map((opt, i) => `Pilihan ${prefixes[i]}: ${opt}.`)
      .join(' ');

    const fullText = `Gerbang nomor ${gateId}. Pertanyaan: ${question.question} ... ${optionsText}`;
    speechManager.speak(fullText, () => {
      setIsSpeaking(false);
    });
  }, [gateId, question]);

  useEffect(() => {
    readQuestion();
    return () => {
      speechManager.stop();
    };
  }, [readQuestion]);

  const handleSelectOption = (idx: number) => {
    if (hasSubmitted && isCorrect) return;

    speechManager.stop();
    setSelectedOption(idx);
    setHasSubmitted(true);

    const correct = idx === question.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      soundManager.playCorrect();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#facc15', '#22c55e', '#38bdf8', '#fb7185'],
      });
      speechManager.speakCorrect();
    } else {
      soundManager.playWrong();
      const nextAttempts = currentAttempts - 1;
      setCurrentAttempts(nextAttempts);
      setShowHint(true);
      speechManager.speakWrong(nextAttempts);
    }
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setHasSubmitted(false);
    speechManager.speak('Ayo hitung kembali dengan teliti!');
  };

  const handleContinue = () => {
    onAnswerSubmit(isCorrect, currentAttempts);
  };

  const prefixes = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-emerald-900 via-green-950 to-slate-950 rounded-3xl p-5 sm:p-6 border-4 border-amber-400 shadow-[0_25px_50px_rgba(0,0,0,0.7)] text-white overflow-hidden my-auto">
        
        {/* Top Gold Bar */}
        <div className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500"></div>

        {/* Modal Header */}
        <div className="flex items-center justify-between mt-1 mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-amber-950 font-black text-xl flex items-center justify-center shadow-md border-2 border-yellow-200">
              🔒
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                Tantangan Gerbang #{gateId}
              </span>
              <h4 className="font-heading font-black text-sm sm:text-base text-white">
                Buka Kunci Labirin
              </h4>
            </div>
          </div>

          {/* Chances Badges (3 chances) */}
          <div className="flex items-center space-x-1 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-600/50">
            <span className="text-[10px] text-emerald-300 font-bold mr-1">Kesempatan:</span>
            {[1, 2, 3].map((num) => (
              <span
                key={num}
                className={`text-sm transition-all ${
                  num <= currentAttempts ? 'opacity-100 scale-110' : 'opacity-25 grayscale'
                }`}
                title={`Kesempatan ${num}`}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>

        {/* Question Box */}
        <div className="bg-emerald-950/95 rounded-2xl p-4 border border-emerald-500/40 shadow-inner mb-4">
          <div className="flex items-start justify-between gap-3">
            <p className="font-heading font-extrabold text-base sm:text-lg text-amber-100 leading-snug">
              {question.question}
            </p>
            {/* Audio Repeat Button */}
            <button
              onClick={readQuestion}
              title="Dengarkan Ulang Soal"
              className={`shrink-0 flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                isSpeaking
                  ? 'bg-amber-400 text-amber-950 animate-pulse'
                  : 'bg-emerald-800 hover:bg-emerald-700 text-amber-200 border border-emerald-500/40'
              }`}
            >
              <span>🔊</span>
              <span className="hidden sm:inline">Ulangi Suara</span>
            </button>
          </div>
        </div>

        {/* 4 Options Grid */}
        <div className="space-y-2.5 mb-4">
          {question.options.map((option, idx) => {
            const isChosen = selectedOption === idx;
            const isCorrectAnswer = idx === question.correctAnswer;

            let buttonStyle =
              'bg-white text-slate-800 hover:bg-amber-50 hover:border-amber-400 border-2 border-slate-200';

            if (hasSubmitted) {
              if (isCorrectAnswer) {
                buttonStyle =
                  'bg-emerald-500 text-white border-2 border-emerald-300 ring-2 ring-emerald-300 font-bold';
              } else if (isChosen && !isCorrectAnswer) {
                buttonStyle =
                  'bg-rose-500 text-white border-2 border-rose-300 ring-2 ring-rose-300 opacity-90';
              } else {
                buttonStyle = 'bg-slate-200 text-slate-600 border border-slate-300 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                disabled={hasSubmitted && isCorrect}
                onClick={() => handleSelectOption(idx)}
                className={`w-full text-left p-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center space-x-3 transition-all duration-200 shadow-md ${buttonStyle} ${
                  !hasSubmitted || !isCorrect ? 'cursor-pointer active:scale-[0.98]' : 'cursor-default'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-xl flex items-center justify-center font-heading font-black text-xs shrink-0 shadow-sm ${
                    hasSubmitted && isCorrectAnswer
                      ? 'bg-white text-emerald-800'
                      : hasSubmitted && isChosen && !isCorrectAnswer
                      ? 'bg-white text-rose-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {prefixes[idx]}
                </span>
                <span className="flex-1 font-bold">{option}</span>
                {hasSubmitted && isCorrectAnswer && <span className="text-xl">✅</span>}
                {hasSubmitted && isChosen && !isCorrectAnswer && <span className="text-xl">❌</span>}
              </button>
            );
          })}
        </div>

        {/* Scratchpad (Kertas Cakar Hitung di Layar) Toggle */}
        <div className="mb-3">
          <button
            onClick={() => setShowScratchpad(!showScratchpad)}
            className="text-xs font-bold text-amber-300 hover:text-amber-200 flex items-center space-x-1.5 cursor-pointer"
          >
            <span>📝</span>
            <span>{showScratchpad ? 'Tutup Kertas Cakar' : 'Buka Kertas Cakar Hitung'}</span>
          </button>
          {showScratchpad && (
            <div className="mt-2 p-2 bg-emerald-950 rounded-xl border border-emerald-600/50">
              <textarea
                value={scratchpadNote}
                onChange={(e) => setScratchpadNote(e.target.value)}
                placeholder="Tuliskan hitungan bersusunmu di sini... (contoh: 24 x 3 = 60 + 12 = 72)"
                rows={3}
                className="w-full bg-slate-900 text-amber-200 placeholder-slate-500 text-xs p-2 rounded-lg font-mono border border-emerald-700/50 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
              />
            </div>
          )}
        </div>

        {/* Feedback / Explanation Box */}
        {hasSubmitted && (
          <div
            className={`p-3.5 rounded-2xl mb-4 border-2 animate-fadeIn ${
              isCorrect
                ? 'bg-emerald-950/90 border-emerald-400 text-emerald-100'
                : 'bg-rose-950/90 border-rose-400 text-rose-100'
            }`}
          >
            <div className="flex items-center space-x-2 font-heading font-black text-sm mb-1">
              <span>{isCorrect ? '🎉' : '💡'}</span>
              <span>
                {isCorrect
                  ? 'Hebat Sekali! Gerbang Berhasil Terbuka (+10 Poin) ⛩️✨'
                  : currentAttempts > 0
                  ? `Jawaban Belum Tepat! Sisa Kesempatan: ${currentAttempts}`
                  : 'Kesempatan Habis! Pembahasan Soal:'}
              </span>
            </div>

            {/* Hint if still have attempts */}
            {!isCorrect && currentAttempts > 0 && showHint && (
              <p className="text-xs text-amber-200 mt-1 font-medium bg-black/30 p-2 rounded-lg border border-amber-400/30">
                🔎 <strong>Petunjuk Cepat:</strong> {question.hint}
              </p>
            )}

            {/* Explanation when correct or no attempts left */}
            {(isCorrect || currentAttempts === 0) && (
              <p className="text-xs text-slate-200 leading-relaxed mt-1">
                {question.explanation}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {hasSubmitted && !isCorrect && currentAttempts > 0 ? (
            <button
              onClick={handleTryAgain}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-heading font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_5px_0_#b45309] hover:brightness-105 active:translate-y-1 active:shadow-none cursor-pointer transition-all flex items-center justify-center space-x-2"
            >
              <span>🔄</span>
              <span>Coba Hitung Lagi</span>
            </button>
          ) : (hasSubmitted && isCorrect) || (hasSubmitted && currentAttempts === 0) ? (
            <button
              onClick={handleContinue}
              className="w-full py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-amber-950 font-heading font-black text-sm sm:text-base uppercase tracking-wider shadow-[0_5px_0_#b45309] hover:brightness-105 active:translate-y-1 active:shadow-none cursor-pointer transition-all flex items-center justify-center space-x-2"
            >
              <span>Lewati Gerbang & Lanjut Petualangan</span>
              <span>➔</span>
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
