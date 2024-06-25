import Sound from 'react-native-sound';

class ConfirmSound {
  private static instance: ConfirmSound | null = null;
  private sound: Sound | null = null;

  private constructor() {
    Sound.setCategory('Playback');
  }

  public static getInstance(): ConfirmSound {
    if (!ConfirmSound.instance) {
      ConfirmSound.instance = new ConfirmSound();
    }
    return ConfirmSound.instance;
  }

  public playSound(): void {
    this.sound?.release()

    this.sound = new Sound('raw/beep.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.error("Failed to load sound", error );
        return;
      }else{
        this.sound?.play();
      }
    });
  }

}

export default ConfirmSound.getInstance();
