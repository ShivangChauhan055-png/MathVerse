/**
 * services/SoundService.ts
 *
 * Reusable audio service using the Web Audio API to synthesize sounds.
 * No external assets required.
 */

class SoundService {
  private audioContext: AudioContext | null = null;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  private playTone(frequency: number, type: OscillatorType, duration: number, startTime: number = 0, volume: number = 0.1) {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ctx.currentTime + startTime);

    gainNode.gain.setValueAtTime(volume, ctx.currentTime + startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + startTime + duration);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(ctx.currentTime + startTime);
    osc.stop(ctx.currentTime + startTime + duration);
  }

  playCorrect() {
    this.playTone(440, 'sine', 0.1, 0, 0.1);
    this.playTone(554.37, 'sine', 0.15, 0.1, 0.1);
    this.playTone(659.25, 'sine', 0.2, 0.25, 0.1);
  }

  playWrong() {
    this.playTone(300, 'sawtooth', 0.15, 0, 0.05);
    this.playTone(250, 'sawtooth', 0.2, 0.15, 0.05);
  }

  playCoin() {
    this.playTone(987.77, 'sine', 0.05, 0, 0.05);
    this.playTone(1318.51, 'sine', 0.2, 0.05, 0.05);
  }

  playLevelUp() {
    [261.63, 329.63, 392.00, 523.25].forEach((freq, i) => {
      this.playTone(freq, 'square', 0.2, i * 0.1, 0.05);
    });
    this.playTone(659.25, 'sine', 0.6, 0.4, 0.1);
  }

  playAchievement() {
    [440, 440, 440].forEach((freq, i) => {
      this.playTone(freq, 'triangle', 0.1, i * 0.15, 0.1);
    });
    this.playTone(554.37, 'triangle', 0.4, 0.45, 0.1);
  }
}

export const soundService = new SoundService();
