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
 * AI Storyline Companion / Legal Mentor (Nyay 🤖)
 * Provides a dynamic, child-safe legal mentor hint at story decision nodes
 */
export async function getStorylineMentorHintAI({ storyTitle, nodeText, protagonistName, lang = 'en' }) {
  if (!GROQ_API_KEY) {
    return 'Remember your constitutional rights! Choose the path that stands up for fairness, safety, and learning.';
  }

  const MENTOR_PROMPT = `You are "Nyay 🤖", a warm, wise AI legal mentor guiding a child through an interactive story about constitutional rights in India.
Give a short 2-sentence encouraging hint explaining which legal right or constitutional value protects the hero in this situation without giving away the exact button choice.
Keep it under 40 words, friendly, and inspiring.`;

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
          { role: 'system', content: MENTOR_PROMPT },
          {
            role: 'user',
            content: `Story: ${storyTitle}\nHero Name: ${protagonistName || 'Explorer'}\nCurrent Situation: "${nodeText}"\nLanguage: ${lang}`,
          },
        ],
        max_tokens: 90,
        temperature: 0.5,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() || null;
  } catch (err) {
    console.warn('Story mentor AI failed:', err?.message);
    return null;
  }
}

