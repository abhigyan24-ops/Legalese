/**
 * RightsMap.jsx — Interactive Rights Trail Map & Adaptive Learning Navigator
 * 
 * Features:
 * - Lenis Smooth Momentum Scrolling
 * - Framer Motion spring waypoints with celebratory unlock animations
 * - Playful lock micro-interactions on hover
 * - Adaptive learning recommendation nudges
 * - Top header with XP badge, Certificate link, Leaderboard & Helplines
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import CharacterAvatar from '../story-engine/CharacterAvatar';
import AchievementsModal from '../achievements/AchievementsModal';
import GoogleSignIn from '../auth/GoogleSignIn';
import { signOutUser } from '../../firebase/firebase';
import { getActiveEvent } from '../../lib/seasonalEvents';
import { getDifficultyLabel, getPerformanceSummary } from '../../lib/adaptiveDifficulty';
import sound from '../../lib/sound';
import SmoothScroll from '../ui/SmoothScroll';
import ParticleBackground from '../ui/ParticleBackground';
import AnimatedButton from '../ui/AnimatedButton';

const JUNIOR_STORIES = [
  {
    id: 'right-to-education',
    icon: '🎒',
    actTag: 'Article 21-A',
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-400',
    title: {
      en: "Meena's Right to Education",
      hi: 'मीना की शिक्षा का अधिकार',
      kn: 'ಮೀನಾಳ ಶಿಕ್ಷಣದ ಹಕ್ಕು',
    },
    desc: {
      en: 'Help Meena return to school when financial hardship threatens her future.',
      hi: 'मीना को स्कूल लौटने में मदद करें जब आर्थिक तंगी उसके भविष्य को खतरे में डालती है।',
      kn: 'ಮೀನಾಳ ಭವಿಷ್ಯಕ್ಕೆ ಆರ್ಥಿಕ ಸಂಕಷ್ಟ ಎದುರಾದಾಗ ಅವಳು ಶಾಲೆಗೆ ಮರಳಲು ಸಹಾಯ ಮಾಡಿ.',
    },
    length: '26 Nodes • 7 Endings',
  },
  {
    id: 'protection-from-child-marriage',
    icon: '📜',
    actTag: 'PCMA 2006',
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-400',
    title: {
      en: 'Protection from Early Marriage',
      hi: 'बाल विवाह से सुरक्षा',
      kn: 'ಬಾಲ್ಯ ವಿವಾಹದಿಂದ ರಕ್ಷಣೆ',
    },
    desc: {
      en: 'Stand up for education, career dreams, and the freedom to grow up first.',
      hi: 'शिक्षा, सपनों और पहले बड़े होने की आज़ादी के लिए आवाज़ उठाएं।',
      kn: 'ಶಿಕ್ಷಣ, ಕನಸುಗಳು ಮತ್ತು ಮುಕ್ತ ಭವಿಷ್ಯಕ್ಕಾಗಿ ಧ್ವನಿ ಎತ್ತಿ.',
    },
    length: '20 Nodes • 5 Endings',
  },
  {
    id: 'protection-from-child-labour',
    icon: '🏭',
    actTag: 'Child Labour Act',
    color: 'from-orange-500 to-red-600',
    borderColor: 'border-orange-400',
    title: {
      en: 'Protection from Child Labour',
      hi: 'बाल श्रम से सुरक्षा',
      kn: 'ಬಾಲ ಕಾರ್ಮಿಕ ಪದ್ಧತಿಯಿಂದ ರಕ್ಷಣೆ',
    },
    desc: {
      en: 'Investigate unfair workshop work and protect children’s right to play and learn.',
      hi: 'कारखाने के काम की जांच करें और बच्चों के खेलने और सीखने के अधिकार की रक्षा करें।',
      kn: 'ಅಕ್ರಮ ಕಾರ್ಖಾನೆ ಕೆಲಸವನ್ನು ತಡೆದು ಮಕ್ಕಳ ಕಲಿಕೆ ಮತ್ತು ಆಟದ ಹಕ್ಕನ್ನು ರಕ್ಷಿಸಿ.',
    },
    length: '22 Nodes • 5 Endings',
  },
  {
    id: 'protection-from-abuse',
    icon: '🛡️',
    actTag: 'POCSO Act 2012',
    color: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-400',
    title: {
      en: 'Protection from Abuse & Safety Boundaries',
      hi: 'शोषण से सुरक्षा और सुरक्षित सीमाएं',
      kn: 'ದೌರ್ಜನ್ಯದಿಂದ ರಕ್ಷಣೆ ಮತ್ತು ಸುರಕ್ಷಿತ ಗಡಿಗಳು',
    },
    desc: {
      en: 'Learn safe boundaries, trusted allies, and the 24/7 Childline 1098 lifeline.',
      hi: 'सुरक्षित सीमाएं, भरोसेमंद मददगार और 24/7 चाइल्डलाइन 1098 लाइफलाइन के बारे में जानें।',
      kn: 'ಸುರಕ್ಷಿತ ಗಡಿಗಳು, ವಿಶ್ವಾಸಾರ್ಹ ವ್ಯಕ್ತಿಗಳು ಮತ್ತು 1098 ಸಹಾಯವಾಣಿಯನ್ನು ತಿಳಿಯಿರಿ.',
    },
    length: '20 Nodes • 5 Endings',
  },
  {
    id: 'right-to-healthcare',
    icon: '🏥',
    actTag: 'Right to Health',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-400',
    title: {
      en: 'Right to Healthcare & Nutrition',
      hi: 'स्वास्थ्य और पोषण का अधिकार',
      kn: 'ಆರೋಗ್ಯ ಮತ್ತು ಪೌಷ್ಟಿಕಾಂಶದ ಹಕ್ಕು',
    },
    desc: {
      en: 'Discover medical aid rights, mid-day meals, and immunization safeguards.',
      hi: 'हर बच्चे के लिए चिकित्सा सहायता, मिड-डे मील और टीकाकरण सुरक्षा के अधिकारों को जानें।',
      kn: 'ಪ್ರತಿಯೊಂದು ಮಗುವಿಗೂ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ, ಮಧ್ಯಾಹ್ನದ ಊಟ ಮತ್ತು ಲಸಿಕೆ ಹಕ್ಕುಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
    },
    length: '22 Nodes • 5 Endings',
  },
  {
    id: 'right-to-equality',
    icon: '⚖️',
    actTag: 'Articles 14, 15 & 17',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-400',
    title: {
      en: 'Right to Equality & Fair Play',
      hi: 'समानता और निष्पक्षता का अधिकार',
      kn: 'ಸಮಾನತೆ ಮತ್ತು ನ್ಯಾಯಯುತ ಆಟದ ಹಕ್ಕು',
    },
    desc: {
      en: 'Overcome unfair discrimination and assert equal dignity for every child.',
      hi: 'अनुचित भेदभाव को समाप्त करें और हर बच्चे के लिए समान सम्मान सुनिश्चित करें।',
      kn: 'ಅನ್ಯಾಯದ ತಾರತಮ್ಯವನ್ನು ತೊಡೆದುಹಾಕಿ ಪ್ರತಿಯೊಂದು ಮಗುವಿಗೂ ಸಮಾನ ಘನತೆಯನ್ನು ಎತ್ತಿಹಿಡಿಯಿರಿ.',
    },
    length: '20 Nodes • 5 Endings',
  },
];

const SENIOR_STORIES = [
  {
    id: 'right-to-education',
    icon: '🎒',
    actTag: 'Article 21-A & Sec. 13',
    color: 'from-amber-500 to-yellow-600',
    borderColor: 'border-amber-400',
    title: {
      en: "Aarav's Board Exam & Illegal Fees",
      hi: 'आरव की बोर्ड परीक्षा और अनधिकृत शुल्क',
      kn: 'ಆರವ್‌ನ ಬೋರ್ಡ್ ಪರೀಕ್ಷೆ ಮತ್ತು ಅಕ್ರಮ ಶುಲ್ಕ',
    },
    desc: {
      en: 'Invoke Section 13 of the RTE Act to stop unauthorized fees and protect board exam hall tickets.',
      hi: 'अनधिकृत शुल्कों को रोकने और बोर्ड परीक्षा हॉल टिकटों की रक्षा के लिए आरटीई की धारा 13 का उपयोग करें।',
      kn: 'ಅಕ್ರಮ ಶುಲ್ಕ ತಡೆಯಲು ಮತ್ತು ಪರೀಕ್ಷಾ ಪ್ರವೇಶ ಪತ್ರ ರಕ್ಷಿಸಲು ಶಿಕ್ಷಣ ಹಕ್ಕಿನ ಕಲಂ 13 ರ ಬಳಕೆ.',
    },
    length: '18 Nodes • 5 Endings',
  },
  {
    id: 'protection-from-child-marriage',
    icon: '📜',
    actTag: 'PCMA Sec. 13 (Stay Orders)',
    color: 'from-purple-500 to-indigo-600',
    borderColor: 'border-purple-400',
    title: {
      en: "Ananya's College Dream & Injunctions",
      hi: 'अनन्या के कॉलेज का सपना और स्थगनादेश',
      kn: 'ಅನನ್ಯಾಳ ಕಾಲೇಜು ಕನಸು ಮತ್ತು ತಡೆಯಾಜ್ಞೆ',
    },
    desc: {
      en: 'Obtain a Section 13 Judicial Magistrate injunction to protect higher education dreams.',
      hi: 'उच्च शिक्षा के सपनों की रक्षा के लिए धारा 13 के तहत न्यायिक मजिस्ट्रेट का स्थगनादेश प्राप्त करें।',
      kn: 'ಉನ್ನತ ಶಿಕ್ಷಣದ ಕನಸು ರಕ್ಷಿಸಲು ಕಲಂ 13 ರ ನ್ಯಾಯಾಲಯದ ತಡೆಯಾಜ್ಞೆ ಪಡೆಯಿರಿ.',
    },
    length: '18 Nodes • 5 Endings',
  },
  {
    id: 'protection-from-child-labour',
    icon: '🏭',
    actTag: 'CLPRA Sec. 3A (Hazardous Bans)',
    color: 'from-orange-500 to-red-600',
    borderColor: 'border-orange-400',
    title: {
      en: 'Hazardous Labour & Adolescent Rights',
      hi: 'खतरनाक श्रम और किशोर अधिकार',
      kn: 'ಅಪಾಯಕಾರಿ ಕೆಲಸ ಮತ್ತು ಹದಿಹರೆಯದವರ ಹಕ್ಕುಗಳು',
    },
    desc: {
      en: 'Rescue adolescent peers from toxic chemical workshops using Section 3A of CLPRA.',
      hi: 'धारा 3A का उपयोग करके जहरीले रासायनिक कारखानों से किशोर साथियों को बचाएं।',
      kn: 'ಕಲಂ 3ಎ ಅಡಿಯಲ್ಲಿ ವಿಷಕಾರಿ ಕಾರ್ಖಾನೆಗಳಿಂದ ಹದಿಹರೆಯದವರನ್ನು ರಕ್ಷಿಸಿ.',
    },
    length: '18 Nodes • 5 Endings',
  },
  {
    id: 'protection-from-abuse',
    icon: '🛡️',
    actTag: 'POCSO Act & DPDP Act 2023',
    color: 'from-rose-500 to-pink-600',
    borderColor: 'border-rose-400',
    title: {
      en: 'Cyber Safety & The POCSO Shield',
      hi: 'साइबर सुरक्षा और पॉक्सो सुरक्षा कवच',
      kn: 'ಸೈಬರ್ ಸುರಕ್ಷತೆ ಮತ್ತು ಪೋಕ್ಸೋ ರಕ್ಷಾ ಕವಚ',
    },
    desc: {
      en: 'Combat online harassment with strict Section 23 victim confidentiality and cyber reporting.',
      hi: 'पॉक्सो की धारा 23 की पूर्ण गोपनीयता और साइबर रिपोर्टिंग के साथ ऑनलाइन उत्पीड़न से लड़ें।',
      kn: 'ಪೋಕ್ಸೋ ಕಲಂ 23 ರ ಗೌಪ್ಯತೆಯೊಂದಿಗೆ ಆನ್‌ಲೈನ್ ಕಿರುಕುಳದ ವಿರುದ್ಧ ಹೋರಾಡಿ.',
    },
    length: '18 Nodes • 5 Endings',
  },
  {
    id: 'right-to-healthcare',
    icon: '🏥',
    actTag: 'Article 21 (Emergency Aid)',
    color: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-400',
    title: {
      en: 'Emergency Medical Treatment Rights',
      hi: 'आपातकालीन चिकित्सा उपचार अधिकार',
      kn: 'ತುರ್ತು ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆಯ ಹಕ್ಕುಗಳು',
    },
    desc: {
      en: 'Enforce Article 21 and the Supreme Court mandate for unconditional trauma care.',
      hi: 'बिना शर्त आपातकालीन ट्रॉमा देखभाल के लिए अनुच्छेद 21 और सुप्रीम कोर्ट के आदेश को लागू करें।',
      kn: 'ತುರ್ತು ಚಿಕಿತ್ಸೆಗಾಗಿ ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ಆದೇಶ ಮತ್ತು ವಿಧಿ 21 ರ ಸಾಂವಿಧಾನಿಕ ಹಕ್ಕು.',
    },
    length: '18 Nodes • 5 Endings',
  },
  {
    id: 'right-to-equality',
    icon: '⚖️',
    actTag: 'Articles 14 & 15(2)',
    color: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-400',
    title: {
      en: 'The Merit Trial: Article 14 Challenge',
      hi: 'योग्यता की कसौटी: अनुच्छेद 14 की चुनौती',
      kn: 'ನ್ಯಾಯಯುತ ಪೈಪೋಟಿ: ವಿಧಿ 14 ರ ಸವಾಲು',
    },
    desc: {
      en: 'Strike down arbitrary discrimination in district olympiads using Articles 14 & 15.',
      hi: 'अनुच्छेद 14 और 15 का उपयोग करके जिला ओलंपियाड में मनमाने भेदभाव को समाप्त करें।',
      kn: 'ವಿಧಿ 14 ಮತ್ತು 15 ರ ಅಡಿಯಲ್ಲಿ ಜಿಲ್ಲಾ ಮಟ್ಟದ ಪಂದ್ಯಾವಳಿಗಳಲ್ಲಿ ತಾರತಮ್ಯವನ್ನು ತೊಡೆದುಹಾಕಿ.',
    },
    length: '18 Nodes • 5 Endings',
  },
];

export default function RightsMap() {
  const navigate = useNavigate();
  const { state, dispatch, isStoryUnlocked } = useApp();
  const lang = state.language || 'en';
  const completed = new Set(state.completedStories || []);
  const ageTier = state.currentUser?.ageTier || '8-11';
  const STORIES = (ageTier === '12-16') ? SENIOR_STORIES : JUNIOR_STORIES;

  const [showAchievements, setShowAchievements] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const activeEvent = getActiveEvent();
  const diffInfo = getDifficultyLabel(state);
  const perf = getPerformanceSummary(state);
  const unlockedAchievementsCount = (state.achievements || []).length;

  const calculateLearningNudge = () => {
    if (completed.size === 0) {
      return {
        storyId: 'right-to-education',
        headline: '🌟 Start Your Journey with Meena',
        message: 'Master Article 21-A and help Meena secure her fundamental right to go to school.',
        icon: '🎒',
        type: 'intro',
      };
    }

    if (completed.size >= STORIES.length) {
      return {
        headline: '👑 Master Constitutional Defender!',
        message: `You have conquered all ${STORIES.length} Rights Quests! Claim your official Rights Defender Keepsake Certificate.`,
        icon: '🎓',
        type: 'champion',
      };
    }

    const nextUnplayed = STORIES.find((s) => !completed.has(s.id));
    if (nextUnplayed) {
      return {
        storyId: nextUnplayed.id,
        headline: `🎯 Next Suggested Quest: ${nextUnplayed.title[lang] || nextUnplayed.title.en}`,
        message: 'Expand your constitutional knowledge and unlock your next official Defender Badge.',
        icon: nextUnplayed.icon,
        type: 'next_level',
      };
    }
    return null;
  };

  const nudge = calculateLearningNudge();

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-[#161226] text-[#FFF8F0] font-body relative overflow-hidden select-none py-6 px-4 sm:px-8">
        <ParticleBackground count={20} />

        {/* ── ACHIEVEMENTS MODAL ── */}
        <AchievementsModal
          isOpen={showAchievements}
          onClose={() => setShowAchievements(false)}
        />

        {/* ── GOOGLE SYNC MODAL ── */}
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#161226] border-2 border-[#FFB84D]/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <h3 className="font-display font-extrabold text-lg text-white">
                  ☁️ Cloud Sync Account
                </h3>
                <button
                  onClick={() => setShowGoogleModal(false)}
                  className="text-white/60 hover:text-white text-sm"
                >
                  ✕
                </button>
              </div>
              <GoogleSignIn onSuccess={() => setShowGoogleModal(false)} />
            </div>
          </div>
        )}

        {/* ── LOGOUT CONFIRM MODAL ── */}
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
            <div className="bg-[#161226] border-2 border-rose-500/40 rounded-3xl p-6 max-w-sm w-full shadow-2xl flex flex-col gap-4 text-center">
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-2xl flex items-center justify-center mx-auto">
                🚪
              </div>
              <div>
                <h3 className="font-display font-extrabold text-lg text-white">
                  Log out of this device?
                </h3>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Your unique session and XP remain safely preserved in the database. You can log back in anytime using your synced account!
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/10 text-white/70 text-xs font-bold hover:bg-white/20 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    sound.click();
                    await signOutUser();
                    dispatch({ type: 'LOGOUT' });
                    navigate('/landing', { replace: true });
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-extrabold shadow-lg transition-all"
                >
                  Yes, Log Out
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
          {/* ── HEADER ── */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#312756]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#231C3D] border-2 border-[#FFB84D]/60 flex items-center justify-center shadow-inner overflow-hidden flex-shrink-0">
                <CharacterAvatar
                  avatarId={state.currentUser?.avatar || 'boy-short-blue-medium'}
                  pose="standing"
                  mood="happy"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-extrabold text-base sm:text-lg text-white">
                    {state.currentUser?.nickname || 'Hero Explorer'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#231C3D] text-[11px] font-extrabold text-[#FFB84D] border border-[#FFB84D]/40">
                    {state.currentUser?.ageTier || '8-11'} Yrs
                  </span>
                </div>
                <div className="text-xs text-[#B8B0D6]">
                  Completed: <strong className="text-white">{completed.size}/{STORIES.length}</strong> Quests
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Trophies & Achievements Button */}
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setShowAchievements(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-[#F5B942]/40 text-xs font-bold text-[#FFE7A8] transition-all shadow"
              >
                <span>🏅</span>
                <span>Trophies ({unlockedAchievementsCount}/25)</span>
              </button>

              <Link
                to="/certificate"
                onClick={() => sound.click()}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all shadow ${
                  completed.size >= STORIES.length
                    ? 'bg-gradient-to-r from-amber-500/30 to-purple-500/30 border-[#F5B942] text-[#FFE7A8] animate-pulse'
                    : 'bg-white/10 hover:bg-white/20 border-white/15 text-white/80'
                }`}
              >
                <span>🎓</span>
                <span>{completed.size >= STORIES.length ? 'Certificate ✓' : `Certificate (${completed.size}/${STORIES.length})`}</span>
              </Link>

              <Link
                to="/leaderboard"
                onClick={() => sound.click()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold transition-all shadow"
              >
                <span>🏆</span>
                <span>Leaderboard</span>
              </Link>

              {/* Cloud Sync Button */}
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setShowGoogleModal(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
                title="Link Google account for cross-device sync"
              >
                <span>{state.currentUser?.googleLinked ? '☁️ Synced' : '🔗 Sync'}</span>
              </button>

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => {
                  sound.click();
                  setShowLogoutConfirm(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/35 border border-rose-400/40 text-xs font-extrabold text-rose-200 transition-all shadow"
                title="Log out of session"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>

              {/* Language Switcher */}
              <div className="flex items-center bg-[#231C3D] border border-[#FFB84D]/40 rounded-xl p-0.5">
                {[
                  { id: 'en', label: 'EN' },
                  { id: 'hi', label: 'हि' },
                  { id: 'kn', label: 'ಕ' },
                ].map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    onClick={() => {
                      sound.click();
                      dispatch({ type: 'UPDATE_LANGUAGE', payload: l.id });
                    }}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      lang === l.id
                        ? 'bg-[#FFB84D] text-black font-extrabold shadow-sm'
                        : 'text-[#B8B0D6] hover:text-white'
                    }`}
                  >
                    {l.label}
                  </button>
                ))}
              </div>

              {/* XP Badge */}
              <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#FFB84D] to-[#FFE5B4] text-black font-extrabold text-xs shadow-lg">
                <span>⚡</span>
                <span>{state.xp || 0} XP</span>
              </div>
            </div>
          </header>

          {/* ── SEASONAL EVENT BANNER ── */}
          {activeEvent ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`p-4 rounded-3xl bg-gradient-to-r ${activeEvent.bannerGradient} border-2 border-white/20 text-center font-extrabold text-sm flex items-center justify-between gap-3 shadow-xl ${activeEvent.textColor}`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">{activeEvent.emoji}</span>
                <div className="text-left">
                  <div className="text-xs uppercase tracking-wider font-extrabold opacity-80">
                    Active National Event • {activeEvent.xpMultiplier}x XP Multiplier
                  </div>
                  <div className="text-base font-display font-black">{activeEvent.name}</div>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-bold uppercase tracking-wider">
                Active Now
              </span>
            </motion.div>
          ) : (
            <div className="p-3.5 rounded-2xl bg-[#231C3D] border border-[#312756] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-lg">🗓️</span>
                <span className="text-white/70">Next National Quest:</span>
                <span className="text-[#FFB84D] font-bold">Children's Day (Nov 14) &amp; Constitution Day (Nov 26) • Bonus XP</span>
              </div>
              <span className="self-start sm:self-auto px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#FFB84D]">
                Seasonal Mode Ready
              </span>
            </div>
          )}

          {/* ── ADAPTIVE DIFFICULTY & LEARNING METRICS ── */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-[#1D1733] border border-[#312756] text-xs">
            <div className="flex items-center gap-2">
              <span className="text-base">{diffInfo.icon}</span>
              <span className="text-white/60">Adaptive Learning Level:</span>
              <span className={`font-extrabold font-mono px-2 py-0.5 rounded bg-white/5 ${diffInfo.color}`}>
                {diffInfo.label}
              </span>
            </div>
            <div className="flex items-center gap-3 text-white/50">
              <span>Quiz Accuracy: <strong className="text-white">{perf.quizAccuracy}%</strong></span>
              <span>•</span>
              <span>Stories: <strong className="text-[#FFB84D]">{perf.storiesCompleted}</strong></span>
              <span>•</span>
              <span>Avg Hearts Kept: <strong className="text-emerald-400">{perf.avgHeartsKept}{perf.storiesCompleted > 0 ? '/3' : ''}</strong></span>
            </div>
          </div>


          {/* ── 6-STORY COMPLETION BANNER ── */}
          {completed.size >= STORIES.length && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-5 rounded-3xl bg-gradient-to-r from-[#1D3C2C] via-[#25493A] to-[#1D3C2C] border-2 border-[#F5B942] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl"
            >
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-[#F5B942] flex items-center justify-center text-3xl shadow-inner flex-shrink-0">
                  🎓
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display font-extrabold text-[#FFE7A8]">
                    All {STORIES.length} Constitutional Rights Mastered!
                  </h3>
                  <p className="text-xs text-[#FBF3E3]/80 mt-0.5">
                    You have completed the entire Living Constitutional Trail. Claim and download your official
                    Rights Defender Keepsake Certificate!
                  </p>
                </div>
              </div>
              <Link to="/certificate">
                <AnimatedButton variant="primary" size="md" icon="🎓">
                  Claim Certificate →
                </AnimatedButton>
              </Link>
            </motion.div>
          )}

          {/* ── ADAPTIVE NUDGE BANNER ── */}
          {nudge && (
            <div
              className={`p-4 sm:p-5 rounded-3xl border-2 transition-all flex items-start justify-between gap-4 shadow-xl backdrop-blur-md ${
                nudge.type === 'champion'
                  ? 'bg-purple-950/30 border-purple-400/50'
                  : 'bg-[#1D3C2C] border-[#F5B942]/60'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <span className="text-2xl sm:text-3xl mt-0.5">{nudge.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-extrabold text-sm sm:text-base text-white">
                      {nudge.headline}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[#F5B942] uppercase font-bold">
                      Learning Guide
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/80 mt-1 max-w-xl leading-relaxed">
                    {nudge.message}
                  </p>
                </div>
              </div>

              {nudge.storyId && (
                <AnimatedButton
                  variant="gold"
                  size="sm"
                  onClick={() => navigate(`/story/${nudge.storyId}`)}
                  className="self-center flex-shrink-0"
                >
                  Go →
                </AnimatedButton>
              )}
            </div>
          )}

          {/* ── TRAIL BANNER ── */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/20 via-[#25493A]/50 to-purple-900/30 border border-white/15 p-6 sm:p-8 backdrop-blur-md shadow-2xl">
            <div className="relative z-10 max-w-xl">
              <span className="px-3 py-1 rounded-full bg-[#F5B942]/20 border border-[#F5B942]/40 text-[#F5B942] text-xs font-extrabold uppercase tracking-wider">
                Interactive Story Quests
              </span>
              <h1 className="text-2xl sm:text-4xl font-extrabold font-display text-white mt-3 leading-tight">
                The Rights Trail
              </h1>
              <p className="text-xs sm:text-sm text-white/75 mt-2 leading-relaxed font-normal">
                Travel across {STORIES.length} illustrated interactive stories. Make courageous choices, invoke constitutional
                articles, and defend children’s legal rights.
              </p>
            </div>
          </div>

          {/* ── STORY QUESTS LIST ── */}
          <div className="space-y-4 relative" role="list" aria-label="Constitutional Rights Story Trail">
            {STORIES.map((quest, idx) => {
              const isUnlocked = isStoryUnlocked(idx);
              const isCompleted = completed.has(quest.id);
              const isRecommended = nudge?.storyId === quest.id;
              const title = quest.title[lang] || quest.title.en;
              const desc = quest.desc[lang] || quest.desc.en;

              return (
                <motion.div
                  key={quest.id}
                  role="listitem"
                  whileHover={isUnlocked ? { y: -2 } : {}}
                  className={`relative flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-3xl border transition-all duration-300 ${
                    isRecommended
                      ? 'bg-amber-500/15 border-2 border-[#FFB84D] shadow-2xl'
                      : isCompleted
                      ? 'bg-emerald-950/30 border-emerald-500/40 hover:border-emerald-400 shadow-md'
                      : isUnlocked
                      ? 'bg-[#231C3D] hover:bg-[#2F264F] border-[#312756] hover:border-[#FFB84D]/50 shadow-lg'
                      : 'bg-white/[0.03] border-white/10 opacity-65 group hover:animate-shakeSoft'
                  }`}
                >
                  {/* Left Info */}
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner transition-transform ${
                        isCompleted
                          ? 'bg-emerald-500 text-black font-extrabold'
                          : isUnlocked
                          ? `bg-gradient-to-br ${quest.color} text-white shadow-lg`
                          : 'bg-white/10 text-white/40'
                      }`}
                    >
                      {isCompleted ? '✓' : isUnlocked ? quest.icon : '🔒'}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white/10 text-[#F5B942]">
                          {quest.actTag}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            COMPLETED
                          </span>
                        )}
                        {isRecommended && (
                          <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-500 text-black animate-pulse">
                            RECOMMENDED NEXT
                          </span>
                        )}
                        <span className="text-xs text-white/40">{quest.length}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
                        {title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/70 mt-1 max-w-lg leading-relaxed">
                        {desc}
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="self-end sm:self-center flex-shrink-0 flex items-center gap-2">
                    <Link
                      to={`/community/${quest.id}`}
                      onClick={() => sound.click()}
                      title="View Community Reflections & Q&A"
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-bold text-white transition-all"
                    >
                      💬 Q&amp;A
                    </Link>

                    {isUnlocked ? (
                      <AnimatedButton
                        variant={isCompleted ? 'secondary' : 'primary'}
                        size="sm"
                        onClick={() => navigate(`/story/${quest.id}`)}
                      >
                        {isCompleted ? '🔄 Replay' : '▶ Start Story'}
                      </AnimatedButton>
                    ) : (
                      <div className="text-xs font-semibold text-white/40 px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-1.5 select-none">
                        <span>🔒</span>
                        <span>Complete 2 stories</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </SmoothScroll>
  );
}
