/**
 * narration.js — Resilient Multilingual Web Speech API Engine
 * 
 * Guarantees crisp, natural voice narration in Chrome, Edge, Safari, and Firefox.
 * Specifically optimizes for Indian languages (English, Hindi, Kannada) with
 * voice pre-warming, robust locale matching, and automatic retry on missing OS packs.
 */

const LANG_LOCALES = {
  en: ['en-IN', 'en-GB', 'en-US', 'en'],
  hi: ['hi-IN', 'hi-Deva-IN', 'hi', 'mr-IN', 'en-IN'],
  kn: ['kn-IN', 'kn', 'ta-IN', 'te-IN', 'hi-IN', 'en-IN'],
};

// Global cache of voices
let cachedVoices = [];

export const isNarrationSupported = () => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
};

const refreshVoices = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    const list = window.speechSynthesis.getVoices();
    if (list && list.length > 0) {
      cachedVoices = list;
    }
  }
};

// Pre-warm voices immediately
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  refreshVoices();
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

export const getAvailableVoices = () => {
  refreshVoices();
  return cachedVoices.length > 0 ? cachedVoices : (typeof window !== 'undefined' && window.speechSynthesis ? window.speechSynthesis.getVoices() : []);
};

export const hasVoiceFor = (language = 'en') => {
  if (!isNarrationSupported()) return false;
  return true; // We provide automatic fallback to Indian regional voices
};

export const findBestVoice = (language = 'en', voices = null) => {
  const allVoices = (voices && voices.length > 0) ? voices : getAvailableVoices();
  if (!allVoices.length) return null;

  const targetLocales = LANG_LOCALES[language] || [language];

  // 1. Exact locale match (e.g. "kn-IN", "hi-IN", "en-IN")
  for (const locale of targetLocales) {
    const match = allVoices.find((v) => v.lang && v.lang.toLowerCase() === locale.toLowerCase());
    if (match) return match;
  }

  // 2. Language prefix match (e.g. "kn", "hi", "en")
  for (const locale of targetLocales) {
    const langPrefix = locale.split('-')[0].toLowerCase();
    const match = allVoices.find((v) => v.lang && v.lang.toLowerCase().startsWith(langPrefix));
    if (match) return match;
  }

  // 3. Name match for Indian or Kannada voices
  if (language === 'kn') {
    const kannadaNamed = allVoices.find((v) => {
      const n = v.name.toLowerCase();
      return n.includes('kannada') || n.includes('kann') || n.includes('india');
    });
    if (kannadaNamed) return kannadaNamed;
  } else if (language === 'hi') {
    const hindiNamed = allVoices.find((v) => {
      const n = v.name.toLowerCase();
      return n.includes('hindi') || n.includes('india');
    });
    if (hindiNamed) return hindiNamed;
  }

  // 4. Any Indian locale voice (Google / Microsoft Indian voices)
  const indianVoice = allVoices.find((v) => v.lang && (v.lang.includes('IN') || v.lang.includes('in')));
  if (indianVoice) return indianVoice;

  return allVoices[0] || null;
};

let currentUtterance = null;
let speakingListener = null;

export const setSpeakingStateCallback = (cb) => {
  speakingListener = cb;
};

export const stopSpeaking = () => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
    if (speakingListener) speakingListener(false);
  }
};

export const isSpeaking = () => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return false;
  return window.speechSynthesis.speaking;
};

export const speak = (text, language = 'en', options = {}) => {
  if (!text || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return false;
  }

  stopSpeaking();

  const doSpeak = (voices) => {
    const cleanText = text
      .replace(/<[^>]*>/g, '')
      .replace(/[\n\r]+/g, ' ')
      .trim();

    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const selectedVoice = findBestVoice(language, voices);

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      utterance.lang = selectedVoice.lang;
    } else {
      utterance.lang = language === 'kn' ? 'kn-IN' : language === 'hi' ? 'hi-IN' : 'en-IN';
    }

    // Engaging, natural pacing
    utterance.rate = options.rate || (language === 'en' ? 1.05 : 0.95);
    utterance.pitch = options.pitch || 1.05;
    utterance.volume = options.volume !== undefined ? options.volume : 1;

    utterance.onstart = () => {
      if (speakingListener) speakingListener(true);
    };

    utterance.onend = () => {
      currentUtterance = null;
      if (speakingListener) speakingListener(false);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis notice:', e.error);
      currentUtterance = null;
      if (speakingListener) speakingListener(false);

      // If Chrome on Windows failed to speak Kannada with specific voice, retry with default voice
      if (language === 'kn' && e.error !== 'canceled' && e.error !== 'interrupted') {
        try {
          const fallbackUtterance = new SpeechSynthesisUtterance(cleanText);
          fallbackUtterance.lang = 'hi-IN'; // Closest phonetic Indic engine in Chrome
          fallbackUtterance.rate = 0.92;
          fallbackUtterance.pitch = 1.05;
          fallbackUtterance.onstart = () => speakingListener && speakingListener(true);
          fallbackUtterance.onend = () => speakingListener && speakingListener(false);
          window.speechSynthesis.speak(fallbackUtterance);
        } catch (err) {
          console.warn('Fallback speech failed:', err);
        }
      }
    };

    currentUtterance = utterance;
    window.speechSynthesis.speak(utterance);
    return true;
  };

  const voices = getAvailableVoices();
  if (voices.length > 0) {
    return doSpeak(voices);
  }

  // Voices might load asynchronously in Chrome
  const onVoicesChanged = () => {
    const updatedVoices = getAvailableVoices();
    window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
    doSpeak(updatedVoices);
  };
  window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged, { once: true });

  setTimeout(() => {
    if (!currentUtterance) {
      doSpeak(getAvailableVoices());
    }
  }, 250);

  return true;
};

export default speak;
