/**
 * sound.js — Web Audio API procedural sound synthesizer.
 * Zero external audio file dependencies. Works in all modern browsers.
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTone(freq, dur = 0.15, type = 'sine', vol = 0.12) {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, this.ctx.currentTime);
      g.gain.setValueAtTime(vol, this.ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + dur);
      o.connect(g);
      g.connect(this.ctx.destination);
      o.start();
      o.stop(this.ctx.currentTime + dur);
    } catch {
      // Audio playback fails gracefully if browser blocks before user gesture
    }
  }

  click() {
    this.playTone(850, 0.06, 'sine', 0.08);
  }

  advance() {
    this.playTone(523.25, 0.1, 'sine', 0.1);
    setTimeout(() => this.playTone(659.25, 0.1, 'sine', 0.1), 70);
    setTimeout(() => this.playTone(783.99, 0.14, 'sine', 0.12), 140);
  }

  risky() {
    this.playTone(320, 0.18, 'sawtooth', 0.09);
    setTimeout(() => this.playTone(220, 0.25, 'sawtooth', 0.07), 120);
  }

  win() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => this.playTone(freq, 0.22, 'triangle', 0.14), idx * 110);
    });
  }

  sad() {
    this.playTone(392.00, 0.25, 'sine', 0.08);
    setTimeout(() => this.playTone(349.23, 0.35, 'sine', 0.06), 180);
  }
}

export const sound = new SoundEngine();
export default sound;
