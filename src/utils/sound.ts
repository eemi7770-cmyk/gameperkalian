/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Web Audio API Synthesizer and Web Speech API Narrator (Self-contained, zero-asset-dependency)

class SoundSystem {
  private audioCtx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private bgmInterval: number | null = null;
  private isBgmPlaying = false;
  public soundEnabled = true;
  public ttsEnabled = true;

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  // Step movement sound (gentle grassy footstep)
  playStep(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.06);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.07);
  }

  // Coin collected chime (sparkling high ting)
  playCoin(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [987.77, 1318.51]; // B5, E6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.06);
      osc.stop(ctx.currentTime + idx * 0.06 + 0.25);
    });
  }

  // Gate encounter sound
  playGateEncounter(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [440, 554.37, 659.25]; // A4, C#5, E5
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.15, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
    });
  }

  // Gate unlocked (correct answer)
  playCorrect(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

      gain.gain.setValueAtTime(0.2, ctx.currentTime + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.07 + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.07);
      osc.stop(ctx.currentTime + idx * 0.07 + 0.38);
    });
  }

  // Wrong answer buzzer
  playWrong(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(240, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.26);

    gain.gain.setValueAtTime(0.18, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  }

  // Monster bounce (spring boing)
  playMonsterBump(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, ctx.currentTime + 0.12);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.25);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.26);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.28);
  }

  // Finish / Victory fanfare
  playVictory(): void {
    if (!this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const melody = [
      { f: 523.25, d: 0.14 }, // C5
      { f: 523.25, d: 0.14 }, // C5
      { f: 523.25, d: 0.14 }, // C5
      { f: 659.25, d: 0.38 }, // E5
      { f: 587.33, d: 0.18 }, // D5
      { f: 659.25, d: 0.18 }, // E5
      { f: 783.99, d: 0.5 },  // G5
      { f: 1046.5, d: 0.8 },  // C6
    ];

    let t = ctx.currentTime;
    melody.forEach((note) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + note.d);

      t += note.d + 0.04;
    });
  }

  // Cheerful background music generator (Whimsical Forest Adventure loop)
  startBgm(): void {
    if (this.isBgmPlaying || !this.soundEnabled) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    this.isBgmPlaying = true;
    this.bgmGain = ctx.createGain();
    this.bgmGain.gain.setValueAtTime(0.045, ctx.currentTime);
    this.bgmGain.connect(ctx.destination);

    // Forest melody sequence (C major pentatonic / Lydian bright theme)
    const melody = [
      523.25, 587.33, 659.25, 783.99, 880.0, 783.99, 659.25, 523.25,
      440.0, 523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25,
    ];
    let noteIdx = 0;

    const playNextNote = () => {
      if (!this.isBgmPlaying || !this.soundEnabled) return;
      const nowCtx = this.getAudioContext();
      if (!nowCtx || !this.bgmGain) return;

      const osc = nowCtx.createOscillator();
      const noteGain = nowCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(melody[noteIdx % melody.length], nowCtx.currentTime);

      noteGain.gain.setValueAtTime(0.03, nowCtx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, nowCtx.currentTime + 0.32);

      osc.connect(noteGain);
      noteGain.connect(this.bgmGain);

      osc.start();
      osc.stop(nowCtx.currentTime + 0.35);

      noteIdx++;
    };

    this.bgmInterval = window.setInterval(playNextNote, 220);
  }

  stopBgm(): void {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  isBgmActive(): boolean {
    return this.isBgmPlaying;
  }
}

export const soundManager = new SoundSystem();

// Web Speech API (Indonesian Female Teacher Narrator)
class SpeechSystem {
  private lastSpokenText = '';
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.loadVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        this.loadVoices();
      };
    }
  }

  private loadVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();

    const idVoices = voices.filter(
      (v) => v.lang === 'id-ID' || v.lang === 'id_ID' || v.lang.startsWith('id')
    );

    const femaleIdVoice = idVoices.find(
      (v) =>
        v.name.toLowerCase().includes('female') ||
        v.name.toLowerCase().includes('wanita') ||
        v.name.toLowerCase().includes('perempuan') ||
        v.name.toLowerCase().includes('gadis') ||
        v.name.toLowerCase().includes('damayanti') ||
        v.name.toLowerCase().includes('indonesia')
    );

    this.selectedVoice = femaleIdVoice || idVoices[0] || null;
  }

  speak(text: string, onEnd?: () => void): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }
    if (!soundManager.ttsEnabled) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();
    this.lastSpokenText = text;

    const cleanedText = text
      .replace(/[\*\#\_]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanedText) {
      if (onEnd) onEnd();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = 'id-ID';

    if (!this.selectedVoice) {
      this.loadVoices();
    }
    if (this.selectedVoice) {
      utterance.voice = this.selectedVoice;
    }

    // Friendly, enthusiastic Indonesian elementary teacher voice settings
    utterance.pitch = 1.15;
    utterance.rate = 0.95;
    utterance.volume = 1.0;

    utterance.onend = () => {
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn('SpeechSynthesis error:', e);
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
  }

  repeatLast(onEnd?: () => void): void {
    if (this.lastSpokenText) {
      this.speak(this.lastSpokenText, onEnd);
    }
  }

  stop(): void {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      this.currentUtterance = null;
    }
  }

  // Predefined event narrations as requested in prompt
  speakGameStart(characterName: string, onEnd?: () => void): void {
    this.speak(
      `Selamat datang, petualang cilik ${characterName}! Ayo taklukkan labirin dengan kemampuan perkalianmu!`,
      onEnd
    );
  }

  speakGateEncounter(gateNum: number, onEnd?: () => void): void {
    this.speak(
      `Kamu menemukan gerbang nomor ${gateNum}! Jawab soal perkalian ini dengan benar untuk membuka gerbang!`,
      onEnd
    );
  }

  speakCorrect(onEnd?: () => void): void {
    this.speak('Hebat sekali! Jawaban kamu benar. Gerbang terbuka!', onEnd);
  }

  speakWrong(attemptsLeft: number, onEnd?: () => void): void {
    if (attemptsLeft > 0) {
      this.speak(
        `Ups, jawaban belum tepat. Kamu masih punya ${attemptsLeft} kesempatan. Ayo coba hitung kembali!`,
        onEnd
      );
    } else {
      this.speak('Kesempatan pada gerbang ini habis. Pelajari pembahasannya ya!', onEnd);
    }
  }

  speakVictory(playerName: string, onEnd?: () => void): void {
    this.speak(
      `LUAR BIASA! Selamat ${playerName}, kamu berhasil menaklukkan labirin perkalian!`,
      onEnd
    );
  }

  speakMonsterBump(onEnd?: () => void): void {
    this.speak('Awas! Kamu terdorong oleh monster penjaga labirin!', onEnd);
  }
}

export const speechManager = new SpeechSystem();
