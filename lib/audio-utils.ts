// D minor scale frequencies (for a darker, more mysterious progression)
const FREQUENCIES = [
    293.66, // D
    311.13, // E♭
    349.23, // F
    392.00, // G
    440.00, // A
    466.16, // B♭
    523.25, // C
    587.33  // D (higher octave)
];

const SEQUENCE = [
    // Intro pattern
    { freq: FREQUENCIES[0], duration: 0.12, volume: 0.3 },  // D
    { freq: FREQUENCIES[5], duration: 0.1, volume: 0.25 },  // B♭
    { freq: FREQUENCIES[6], duration: 0.15, volume: 0.3 },  // C
    { freq: FREQUENCIES[7], duration: 0.1, volume: 0.2 },   // D

    // Rising melody
    { freq: FREQUENCIES[1], duration: 0.15, volume: 0.35 }, // E♭
    { freq: FREQUENCIES[2], duration: 0.12, volume: 0.3 },  // F
    { freq: FREQUENCIES[3], duration: 0.15, volume: 0.35 }, // G
    { freq: FREQUENCIES[4], duration: 0.1, volume: 0.25 },  // A

    // Descending pattern
    { freq: FREQUENCIES[3], duration: 0.12, volume: 0.3 },  // G
    { freq: FREQUENCIES[2], duration: 0.15, volume: 0.35 }, // F
    { freq: FREQUENCIES[1], duration: 0.1, volume: 0.25 },  // E♭
    { freq: FREQUENCIES[0], duration: 0.12, volume: 0.3 },  // D

    // Bridge section
    { freq: FREQUENCIES[6], duration: 0.15, volume: 0.35 }, // C
    { freq: FREQUENCIES[5], duration: 0.12, volume: 0.3 },  // B♭
    { freq: FREQUENCIES[4], duration: 0.15, volume: 0.35 }, // A
    { freq: FREQUENCIES[5], duration: 0.1, volume: 0.25 },  // B♭

    // Final flourish
    { freq: FREQUENCIES[0], duration: 0.12, volume: 0.3 },  // D
    { freq: FREQUENCIES[1], duration: 0.15, volume: 0.35 }, // E♭
    { freq: FREQUENCIES[2], duration: 0.12, volume: 0.3 },  // F
    { freq: FREQUENCIES[4], duration: 0.15, volume: 0.35 }  // A
];

let audioContext: AudioContext | null = null;
let currentNoteIndex = 0;

// Helper function to ensure audioContext is initialized
const getAudioContext = () => {
    if (!audioContext) {
        audioContext = new AudioContext();
    }
    return audioContext;
};

export function playRandomNote() {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // Get random frequency from our scale
    const frequency = FREQUENCIES[Math.floor(Math.random() * FREQUENCIES.length)];

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

    // Softer attack and quick release for a crisp sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.3);
}

export function playMelodicNote() {
    const ctx = getAudioContext();
    const note = SEQUENCE[currentNoteIndex];

    // Move to next note, loop back to start if we reach the end
    currentNoteIndex = (currentNoteIndex + 1) % SEQUENCE.length;

    // Skip if it's a rest
    if (!note.freq) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(note.freq, ctx.currentTime);

    // Softer attack and longer release for a more pleasant sound
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + note.duration);

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();
    oscillator.stop(ctx.currentTime + note.duration);
} 