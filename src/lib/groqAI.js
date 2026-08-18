/**
 * groqAI.js — Groq API Client for Rights Quest
 *
 * Powers:
 * 1. AI Legal Answer Bot — generates child-safe legal answers for Q&A
 * 2. AI Content Moderation — screens posts before publishing
 *
 * Model: llama-3.1-8b-instant (ultra-fast, free tier)
 * API: https://api.groq.com/openai/v1/chat/completions
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const LEGAL_SYSTEM_PROMPT = `You are "Nyay" (Justice), a child-friendly legal guide for Indian children aged 8–16.
Your role: Answer questions about Indian children's legal rights in simple, encouraging language.

STRICT RULES:
- Only answer about Indian laws and children's rights (RTE Act, POCSO, Child Labour Act, PCMA, Article 21, etc.)
- Use simple words a 10-year-old can understand
- Keep answers under 120 words
- Never share or ask for personal information
- Never provide contact details, phone numbers, or addresses
- If the question is not about children's legal rights, say: "I can only help with questions about children's rights in India."
- Always end with an encouraging line like "You have the right to be safe and educated!"
- Do not use markdown, bullet points, or special formatting — write in plain sentences`;

const MODERATION_SYSTEM_PROMPT = `You are a child-safety content moderator for an educational app used by Indian children aged 8–16.
Review the following message and respond with ONLY a JSON object: {"safe": true/false, "reason": "brief reason if unsafe"}

Mark as UNSAFE if the message contains:
- Personal contact information (phone numbers, addresses, emails, social media handles)
- Harassment, bullying, or threats
- Sexually explicit or inappropriate content
- Violent language
- Requests to meet in person
- Offensive or discriminatory language

Mark as SAFE if it's a genuine question about rights, a reflection about a story, or general encouragement.`;

/**
 * Generate a child-safe legal answer to a question
 * @param {string} question - The child's question
 * @param {string} storyContext - The story/topic context (e.g. "right-to-education")
 * @param {string} lang - Language code ('en', 'hi', 'kn', etc.)
 * @returns {Promise<string>} - AI-generated answer
 */
export async function generateLegalAnswer(question, storyContext = '', lang = 'en') {
  if (!GROQ_API_KEY) {
    return 'The AI Legal Guide is not configured. Please add your Groq API key.';
  }

  const langNote = lang !== 'en'
    ? `Please respond in ${lang === 'hi' ? 'simple Hindi' : lang === 'kn' ? 'simple Kannada' : lang === 'ta' ? 'simple Tamil' : 'English'}.`
    : '';

  const contextNote = storyContext
    ? `Context: This question is about the topic "${storyContext.replace(/-/g, ' ')}".`
    : '';

  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: LEGAL_SYSTEM_PROMPT },
          {
            role: 'user',
            content: `${contextNote} ${langNote}\n\nQuestion: ${question}`,
          },
        ],
        max_tokens: 200,
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.warn('Groq AI error:', err);
      return null;
    }

    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.warn('Groq AI request failed:', err.message);
    return null;
  }
}

/**
 * Screen a user post for safety before publishing
 * @param {string} text - The post text to moderate
 * @returns {Promise<{safe: boolean, reason: string}>}
 */
export async function moderateContent(text) {
  // Always safe if no API key — fallback to allow (basic BLOCKED_WORDS check in CommunityWall handles this)
  if (!GROQ_API_KEY) return { safe: true, reason: 'moderation-unavailable' };

  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: MODERATION_SYSTEM_PROMPT },
          { role: 'user', content: `Message to review: "${text}"` },
        ],
        max_tokens: 60,
        temperature: 0.1,
      }),
    });

    if (!res.ok) return { safe: true, reason: 'moderation-error' };

    const data = await res.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || '{"safe":true}';

    // Extract JSON from response
    const match = raw.match(/\{.*\}/s);
    if (match) {
      return JSON.parse(match[0]);
    }
    return { safe: true, reason: 'parse-error' };
  } catch (err) {
    console.warn('Content moderation failed:', err?.message);
    return { safe: true, reason: 'moderation-error' };
  }
}

/**
 * Generate a formal statutory draft for an Advocate reviewing a child's question
 * @param {string} question - The child's question
 * @param {string} storyTopic - Topic context
 * @returns {Promise<string>}
 */
export async function draftAdvocateAnswerAI(question, storyTopic = '') {
  if (!GROQ_API_KEY) {
    return 'Under Indian law and constitutional provisions, children are granted fundamental statutory protections including free education under Article 21-A and safety safeguards. For emergency support, Childline 1098 is available 24/7.';
  }

  const ADVOCATE_PROMPT = `You are a Senior Child Rights Legal Advocate in India drafting a verified, authoritative, yet compassionate statutory legal answer for a public Q&A feed read by school children (aged 8-16) and parents.

Guidelines:
- Cite the exact Indian statutes where applicable (e.g. Constitution of India Article 21-A, Right to Education Act 2009, POCSO Act 2012, Child and Adolescent Labour Prohibition Act 1986, Prohibition of Child Marriage Act 2006, Juvenile Justice Act 2015).
- Clearly explain the legal remedy (e.g. filing a complaint, approaching Child Welfare Committee (CWC), calling Childline 1098, Free Legal Aid under NALSA/SLSA).
- Write clearly in 2-4 authoritative, clear sentences (under 130 words).
- Zero jargon, but legally accurate and reassuring.
- Do not use markdown headers or lists; return plain paragraphs.`;

  try {
    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: ADVOCATE_PROMPT },
          {
            role: 'user',
            content: `Topic Area: ${storyTopic || 'Child Rights in India'}\nStudent Question: "${question}"\n\nDraft a concise, accurate legal answer:`,
          },
        ],
        max_tokens: 220,
        temperature: 0.3,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.warn('Advocate draft AI failed:', err?.message);
    return null;
  }
}

/**
 * Fallback contextual hints for offline / unconfigured AI state
 */
const TOPIC_HINTS = {
  'education': {
    en: 'Remember Article 21-A and Section 3 of the RTE Act: Every child has a fundamental right to free education. Look for the choice that enforces school access or transparency!',
    hi: 'अनुच्छेद 21-ए और आरटीई अधिनियम की धारा 3 याद रखें: हर बच्चे को मुफ्त शिक्षा का मौलिक अधिकार है। उस विकल्प को चुनें जो स्कूल में प्रवेश या पारदर्शिता का समर्थन करता है!',
    kn: 'ವಿಧಿ 21-ಎ ಮತ್ತು ಶಿಕ್ಷಣ ಹಕ್ಕು ಕಾಯ್ದೆಯನ್ನು ನೆನಪಿಡಿ: ಪ್ರತಿಯೊಂದು ಮಗುವಿಗೂ ಉಚಿತ ಶಿಕ್ಷಣ ಪಡೆಯುವ ಮೂಲಭೂತ ಹಕ್ಕಿದೆ. ಶಾಲಾ ಪ್ರವೇಶವನ್ನು ಖಚಿತಪಡಿಸುವ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ!',
  },
  'healthcare': {
    en: 'Under Article 21 and the Supreme Court mandate, emergency medical treatment cannot be denied by any hospital. Choose the option that prioritizes saving life and seeking official care!',
    hi: 'अनुच्छेद 21 और सुप्रीम कोर्ट के आदेश के तहत, कोई भी अस्पताल आपातकालीन इलाज से मना नहीं कर सकता। जीवन बचाने और आधिकारिक सहायता लेने वाले विकल्प को चुनें!',
    kn: 'ವಿಧಿ 21 ರ ಅಡಿಯಲ್ಲಿ ಯಾವುದೇ ಆಸ್ಪತ್ರೆ ತುರ್ತು ಚಿಕಿತ್ಸೆಯನ್ನು ನಿರಾಕರಿಸುವಂತಿಲ್ಲ. ಜೀವ ಉಳಿಸಲು ಮೊದಲ ಆದ್ಯತೆ ನೀಡುವ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ!',
  },
  'labour': {
    en: 'The Child and Adolescent Labour Prohibition Act bans children under 14 from working and protects adolescents from hazardous conditions. Look for the option that reports abuse or seeks rehabilitation!',
    hi: 'बाल एवं किशोर श्रम निषेध कानून 14 वर्ष से कम उम्र के बच्चों के काम करने पर रोक लगाता है। उस विकल्प को चुनें जो खतरे की रिपोर्ट करता है या पुनर्वास की मांग करता है!',
    kn: 'ಬಾಲಕಾರ್ಮಿಕ ನಿಷೇಧ ಕಾಯ್ದೆಯು ಮಕ್ಕಳನ್ನು ಅಪಾಯಕಾರಿ ಕೆಲಸಗಳಿಂದ ರಕ್ಷಿಸುತ್ತದೆ. ರಕ್ಷಣೆ ಮತ್ತು ಪುನರ್ವಸತಿಯನ್ನು ಬೆಂಬಲಿಸುವ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ!',
  },
  'abuse': {
    en: 'Under the POCSO Act and DPDP Act 2023, children have strict confidentiality and safety protections. Never stay silent — reach out to trusted adults, cyber portals, or 1098!',
    hi: 'पॉक्सो और डीपीडीपी कानून के तहत बच्चों की पहचान पूरी तरह गोपनीय रहती है। कभी डरें नहीं — 1098 या भरोसेमंद बड़ों की मदद लें!',
    kn: 'ಪೋಕ್ಸೋ ಕಾಯ್ದೆಯಡಿ ಸಂತ್ರಸ್ತರ ಗುರುತು ಸಂಪೂರ್ಣ ರಹಸ್ಯವಾಗಿರುತ್ತದೆ. ಭಯಪಡದೆ 1098 ಸಹಾಯವಾಣಿ ಅಥವಾ ಹಿರಿಯರ ಸಹಾಯ ಪಡೆಯಿರಿ!',
  },
  'marriage': {
    en: 'The Prohibition of Child Marriage Act (PCMA) allows anyone to get a court injunction (stay order) through the CMPO or Magistrate. Choose the option that stands up for education and legal stay orders!',
    hi: 'बाल विवाह निषेध कानून (PCMA) सीएमपीओ या मजिस्ट्रेट के माध्यम से अदालती रोक (stay order) लेने का अधिकार देता है। शिक्षा और कानूनी सुरक्षा का विकल्प चुनें!',
    kn: 'ಬಾಲ್ಯ ವಿವಾಹ ನಿಷೇಧ ಕಾಯ್ದೆಯ ಕಲಂ 13 ರ ಅಡಿಯಲ್ಲಿ ನ್ಯಾಯಾಲಯದ ತಡೆಯಾಜ್ಞೆ ಪಡೆಯಬಹುದು. ಶಿಕ್ಷಣ ಮತ್ತು ಕಾನೂನು ರಕ್ಷಣೆಯ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ!',
  },
};

/**
 * AI Storyline Companion / Legal Mentor (Nyay 🤖)
 * Provides a dynamic, child-safe legal mentor hint at story decision nodes
 */
export async function getStorylineMentorHintAI({ storyTitle = '', nodeText = '', protagonistName = '', lang = 'en' }) {
  // Determine story topic for fallback
  const titleLower = (storyTitle || '').toLowerCase();
  let topicKey = 'education';
  if (titleLower.includes('health')) topicKey = 'healthcare';
  else if (titleLower.includes('labour') || titleLower.includes('labor')) topicKey = 'labour';
  else if (titleLower.includes('abuse') || titleLower.includes('pocso') || titleLower.includes('cyber')) topicKey = 'abuse';
  else if (titleLower.includes('marriage')) topicKey = 'marriage';

  const defaultHint = TOPIC_HINTS[topicKey]?.[lang] || TOPIC_HINTS[topicKey]?.en || TOPIC_HINTS.education.en;

  if (!GROQ_API_KEY) {
    return defaultHint;
  }

  const langInstruction = lang === 'hi'
    ? 'Respond strictly in simple Hindi (हिन्दी script).'
    : lang === 'kn'
    ? 'Respond strictly in simple Kannada (ಕನ್ನಡ script).'
    : 'Respond in clear, encouraging English.';

  const MENTOR_PROMPT = `You are "Nyay 🤖", a warm, wise AI legal mentor guiding an Indian student through an interactive constitutional rights adventure.
Give a short, friendly 1-2 sentence constitutional hint explaining the legal principle or value protecting the student in this situation.
Rules:
- ${langInstruction}
- Under 35 words.
- Do not mention specific option letters or reveal the entire ending.
- Reassuring, empowering tone.`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);

    const res = await fetch(GROQ_API_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          { role: 'system', content: MENTOR_PROMPT },
          {
            role: 'user',
            content: `Story: ${storyTitle}\nHero: ${protagonistName || 'Explorer'}\nScene Situation: "${nodeText}"`,
          },
        ],
        max_tokens: 80,
        temperature: 0.4,
      }),
    });

    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      const aiResponse = data.choices?.[0]?.message?.content?.trim();
      if (aiResponse && aiResponse.length > 5) {
        return aiResponse;
      }
    }
  } catch (err) {
    console.warn('Story mentor AI network notice:', err?.message);
  }

  return defaultHint;
}

