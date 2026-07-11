import { useAudioStore } from '@/store/useAudioStore'

class SoundService {
  private bgm: HTMLAudioElement | null = null;
  private sfxCache: Record<string, HTMLAudioElement> = {};
  private hasInteracted = false;
  private interactionHandler: (() => void) | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.bgm = new Audio('/audio/bgm.mp3');
      this.bgm.loop = true;
      
      this.interactionHandler = () => {
        if (!this.hasInteracted) {
          this.hasInteracted = true;
          this.updateBgmState();
        }
        window.removeEventListener('click', this.interactionHandler!);
        window.removeEventListener('keydown', this.interactionHandler!);
      };
      
      window.addEventListener('click', this.interactionHandler);
      window.addEventListener('keydown', this.interactionHandler);

      useAudioStore.subscribe((state) => {
        this.updateBgmState();
        if (this.bgm) {
          this.bgm.volume = state.volume;
        }
      });
    }
  }

  private updateBgmState() {
    if (!this.bgm || !this.hasInteracted) return;
    const { musicOn, volume } = useAudioStore.getState();
    this.bgm.volume = volume;
    if (musicOn) {
      this.bgm.play().catch(e => console.warn('BGM play failed:', e));
    } else {
      this.bgm.pause();
    }
  }

  private playSfx(name: 'click' | 'correct' | 'wrong' | 'coin' | 'achievement' | 'level-up') {
    const { sfxOn, volume } = useAudioStore.getState();
    if (!sfxOn) return;

    let audio = this.sfxCache[name];
    if (!audio) {
      audio = new Audio(`/audio/${name}.mp3`);
      this.sfxCache[name] = audio;
    }
    
    const clone = audio.cloneNode() as HTMLAudioElement;
    clone.volume = volume;
    clone.play().catch(e => console.warn('SFX play failed:', e));
  }

  playCorrect() { this.playSfx('correct'); }
  playWrong() { this.playSfx('wrong'); }
  playCoin() { this.playSfx('coin'); }
  playLevelUp() { this.playSfx('level-up'); }
  playAchievement() { this.playSfx('achievement'); }
  playClick() { this.playSfx('click'); }
}

export const soundService = new SoundService();
