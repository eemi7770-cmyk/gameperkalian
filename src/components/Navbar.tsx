/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { soundManager, speechManager } from '../utils/sound';

interface NavbarProps {
  onOpenHelp: () => void;
  onGoHome: () => void;
  currentScreen: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenHelp,
  onGoHome,
  currentScreen,
}) => {
  const [soundOn, setSoundOn] = useState<boolean>(soundManager.soundEnabled);
  const [ttsOn, setTtsOn] = useState<boolean>(soundManager.ttsEnabled);
  const [bgmOn, setBgmOn] = useState<boolean>(soundManager.isBgmActive());

  const handleToggleSound = () => {
    soundManager.soundEnabled = !soundOn;
    setSoundOn(!soundOn);
  };

  const handleToggleTts = () => {
    soundManager.ttsEnabled = !ttsOn;
    setTtsOn(!ttsOn);
    if (ttsOn) {
      speechManager.stop();
    }
  };

  const handleToggleBgm = () => {
    const nextState = soundManager.toggleBgm();
    setBgmOn(nextState);
  };

  return (
    <header className="w-full bg-emerald-950/85 backdrop-blur-md border-b border-emerald-700/50 px-3 sm:px-6 py-2.5 sticky top-0 z-40 select-none shadow-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
        {/* Game Logo & Title */}
        <div
          onClick={onGoHome}
          className="flex items-center space-x-2 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-xl shadow-md border border-amber-300">
            🌲
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-heading font-extrabold text-xs sm:text-sm text-amber-300 tracking-wide uppercase">
                Labirin Perkalian
              </span>
              <span className="hidden sm:inline-block bg-emerald-800 text-emerald-200 text-[10px] font-bold px-2 py-0.2 rounded-full border border-emerald-600/50">
                Matematika Kelas 5 SD
              </span>
            </div>
            <p className="text-[10px] text-emerald-300/80 hidden md:block">
              Misi Menaklukkan Labirin Hutan Ajaib
            </p>
          </div>
        </div>

        {/* Audio & Quick Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          {/* BGM Toggle */}
          <button
            onClick={handleToggleBgm}
            title={bgmOn ? 'Matikan Musik Latar' : 'Putar Musik Petualangan'}
            className={`p-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1 cursor-pointer ${
              bgmOn
                ? 'bg-amber-400 text-amber-950 border-amber-300 shadow-sm animate-pulse-gentle'
                : 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-300 border-emerald-700/60'
            }`}
          >
            <span>{bgmOn ? '🎵' : '🔇'}</span>
            <span className="hidden md:inline">{bgmOn ? 'Musik ON' : 'Musik OFF'}</span>
          </button>

          {/* TTS Voice Toggle */}
          <button
            onClick={handleToggleTts}
            title={ttsOn ? 'Matikan Suara Narator' : 'Aktifkan Suara Narator'}
            className={`p-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1 cursor-pointer ${
              ttsOn
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm'
                : 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-400 border-emerald-700/60'
            }`}
          >
            <span>{ttsOn ? '🗣️' : '🤫'}</span>
            <span className="hidden md:inline">{ttsOn ? 'Suara Guru' : 'Mute Guru'}</span>
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            title={soundOn ? 'Matikan Efek Suara' : 'Aktifkan Efek Suara'}
            className={`p-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
              soundOn
                ? 'bg-emerald-800 text-emerald-200 border-emerald-600'
                : 'bg-emerald-950 text-slate-400 border-emerald-800'
            }`}
          >
            {soundOn ? '🔊' : '🔈'}
          </button>

          {/* Petunjuk / Help */}
          <button
            onClick={onOpenHelp}
            title="Petunjuk Permainan"
            className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 text-xs font-black shadow-sm flex items-center space-x-1 transition-all cursor-pointer"
          >
            <span>❓</span>
            <span className="hidden sm:inline">Petunjuk</span>
          </button>

          {/* Return to Menu Button if playing or reading */}
          {currentScreen !== 'home' && (
            <button
              onClick={onGoHome}
              title="Kembali ke Menu Utama"
              className="p-2 rounded-xl bg-emerald-900/80 hover:bg-rose-900/80 text-emerald-200 hover:text-rose-200 border border-emerald-700 transition-all text-xs font-bold cursor-pointer"
            >
              🏠 <span className="hidden lg:inline">Menu</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
