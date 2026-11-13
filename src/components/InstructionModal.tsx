/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstructionModal: React.FC<InstructionModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md animate-fadeIn overflow-y-auto select-none">
      <div className="relative w-full max-w-xl bg-gradient-to-b from-emerald-900 via-green-950 to-slate-950 rounded-3xl p-5 sm:p-7 border-4 border-amber-400 shadow-2xl text-white my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-emerald-700/60">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📜</span>
            <h3 className="font-heading font-extrabold text-lg sm:text-xl text-amber-300">
              Petunjuk Petualangan Labirin
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-950/80 hover:bg-rose-600 text-white flex items-center justify-center font-bold text-sm transition-all border border-emerald-500/40 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Steps List */}
        <div className="space-y-3 text-xs sm:text-sm text-slate-100 max-h-[60vh] overflow-y-auto pr-1">
          <div className="flex items-start space-x-3 bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/40">
            <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shrink-0">
              1
            </span>
            <div>
              <strong className="text-amber-300 block mb-0.5">Gerakkan Tokoh Petualang</strong>
              <p className="text-slate-200">
                Gunakan tombol panah ⬆️ ⬇️ ⬅️ ➡️ pada keyboard atau tombol navigasi D-pad di layar HP untuk menjelajahi lorong labirin.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/40">
            <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shrink-0">
              2
            </span>
            <div>
              <strong className="text-amber-300 block mb-0.5">Buka Gerbang Perkalian (🔒 ➔ ⛩️)</strong>
              <p className="text-slate-200">
                Sentuh gerbang terkunci untuk memunculkan soal perkalian. Jawab dengan benar agar gerbang terbuka dan kamu mendapat <strong>+10 Poin</strong>!
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/40">
            <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shrink-0">
              3
            </span>
            <div>
              <strong className="text-amber-300 block mb-0.5">3 Kesempatan Menjawab</strong>
              <p className="text-slate-200">
                Setiap gerbang memberikan 3 kesempatan mencoba (❤️ ❤️ ❤️). Jika belum tepat, kamu akan mendapatkan petunjuk cara menghitungnya!
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/40">
            <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shrink-0">
              4
            </span>
            <div>
              <strong className="text-amber-300 block mb-0.5">Kumpulkan Koin Emas (🪙)</strong>
              <p className="text-slate-200">
                Ambil koin emas berkilau di sepanjang jalan untuk menambah skor sebanyak <strong>+5 Poin</strong> setiap koin!
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/40">
            <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shrink-0">
              5
            </span>
            <div>
              <strong className="text-amber-300 block mb-0.5">Awas Monster Lucu! (👾 🦊)</strong>
              <p className="text-slate-200">
                Jangan menabrak monster penjaga labirin, atau kamu akan terdorong mundur 1 langkah.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3 bg-emerald-950/80 p-3 rounded-2xl border border-emerald-600/40">
            <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black flex items-center justify-center shrink-0">
              6
            </span>
            <div>
              <strong className="text-amber-300 block mb-0.5">Capai Pintu Keluar FINISH (🎁)</strong>
              <p className="text-slate-200">
                Temukan peti harta karun emas di ujung labirin untuk menyelesaikan misi dan meraih predikat <strong>Petualang Master</strong>!
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="mt-5 pt-3 border-t border-emerald-700/60 text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 text-amber-950 font-heading font-black text-sm uppercase tracking-wider shadow-md hover:brightness-105 active:scale-95 cursor-pointer transition-all"
          >
            Siap Berpetualang! 👍
          </button>
        </div>
      </div>
    </div>
  );
};
