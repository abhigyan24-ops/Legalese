/**
 * ResourceDirectory.jsx
 * 
 * Dynamic & Curated Resource Directory:
 * - Reads from Firestore `resource_directory` collection in real time with static fallback
 * - Supports topic-based deep linking (e.g., /resources?topic=abuse)
 * - Category filter pills for Education, Healthcare, Child Labour, Abuse/POCSO, Child Marriage
 * - Childline 1098 emergency hotline highlighted at the top
 */

import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

const CURATED_RESOURCES = [
  {
    id: 'res-1098',
    name: 'Childline India',
    phone: '1098',
    website: 'childlineindia.org',
    desc: 'Toll-free 24×7 emergency helpline for children in danger, distress, or need of care and protection. Completely free from any phone.',
    emergency: true,
    category: 'emergency',
    icon: '🚨',
    acts: ['All Child Rights', 'Emergency Rescue'],
  },
  {
    id: 'res-police',
    name: 'Police Emergency / Special Juvenile Police Unit (SJPU)',
    phone: '100',
    desc: 'National emergency assistance. Connect with child-friendly police officers in plain clothes for immediate protection.',
    emergency: true,
    category: 'emergency',
    icon: '🚔',
    acts: ['Immediate Safety', 'POCSO Act'],
  },
  {
    id: 'res-ncpcr',
    name: 'National Commission for Protection of Child Rights (NCPCR)',
    phone: '1800-121-2830',
    website: 'ncpcr.gov.in',
    desc: 'Statutory child rights body. File formal complaints regarding education denial, child labour, POCSO violations, and illegal child marriage.',
    emergency: false,
    category: 'education',
    icon: '⚖️',
    acts: ['RTE Act 2009', 'POCSO Act 2012', 'Child Labour Act'],
  },
  {
    id: 'res-nhm-104',
    name: 'National Health Helpline (104) & RBSK Paediatric Support',
    phone: '104',
    desc: 'Free 24/7 medical advice, emergency ambulance coordination (108), and Rashtriya Bal Swasthya Karyakram child clinic referrals.',
    emergency: false,
    category: 'healthcare',
    icon: '🩺',
    acts: ['Article 21 Right to Health', 'Free Primary Care'],
  },
  {
    id: 'res-icall',
    name: 'iCall Psychosocial Helpline (TISS)',
    phone: '9152987821',
    website: 'icallhelpline.org',
    desc: 'Free, confidential psychological and emotional counselling for children, adolescents, and caregivers navigating trauma or stress.',
    emergency: false,
    category: 'abuse',
    icon: '🧠',
    acts: ['Mental Wellness', 'Trauma Support'],
  },
  {
    id: 'res-kscf',
    name: 'Kailash Satyarthi Children\'s Foundation (KSCF)',
    phone: null,
    website: 'kscf.in',
    desc: 'Pioneering child rights organisation dedicated to ending child labour, trafficking, and child marriage through rescue and bridge schooling.',
    emergency: false,
    category: 'labour',
    icon: '🌍',
    acts: ['Child Labour Free India', 'Rehabilitation'],
  },
  {
    id: 'res-bba',
    name: 'Bachpan Bachao Andolan (BBA)',
    phone: '1800-102-7222',
    website: 'bba.org.in',
    desc: 'Grassroots anti-trafficking and child labour liberation movement. Direct rescue and legal aid support across all Indian states.',
    emergency: false,
    category: 'labour',
    icon: '🛡️',
    acts: ['Rescue Operations', 'Legal Enforcement'],
  },
  {
    id: 'res-pcma-cwc',
    name: 'District Child Welfare Committee (CWC) & CMPO',
    phone: null,
    desc: 'Statutory district authorities empowered under PCMA 2006 and Juvenile Justice Act to issue stay injunctions stopping child marriage.',
    emergency: false,
    category: 'child_marriage',
    icon: '📜',
    acts: ['PCMA 2006', 'Stay Injunctions'],
  },
  {
    id: 'res-savechildren',
    name: 'Save the Children India (Bal Raksha Bharat)',
    phone: null,
    website: 'savethechildren.in',
    desc: 'Inclusive education, nutrition, and child protection programs supporting underprivileged children across rural and urban India.',
    emergency: false,
    category: 'education',
    icon: '🤝',
    acts: ['Inclusive Education', 'Child Nutrition'],
  },
];

const CATEGORY_TABS = [
  { key: 'all', label: '🌟 All Resources' },
  { key: 'education', label: '🎒 Education' },
  { key: 'healthcare', label: '🩺 Healthcare' },
  { key: 'labour', label: '🏭 Child Labour' },
  { key: 'abuse', label: '🛡️ Abuse / POCSO' },
  { key: 'child_marriage', label: '📜 Child Marriage' },
];

export default function ResourceDirectory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTopic = searchParams.get('topic') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialTopic);
  const [resources, setResources] = useState(CURATED_RESOURCES);

  // Sync with searchParams if deep link is opened
  useEffect(() => {
    const topic = searchParams.get('topic');
    if (topic && topic !== activeCategory) {
      setActiveCategory(topic);
    }
  }, [searchParams]);

  // Firestore real-time listener on resource_directory collection
  useEffect(() => {
    if (!db) return;
    try {
      const unsub = onSnapshot(collection(db, 'resource_directory'), (snapshot) => {
        if (!snapshot.empty) {
          const remoteData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          // Merge remote with curated fallback
          setResources([...remoteData, ...CURATED_RESOURCES.filter(c => !remoteData.some(r => r.name === c.name))]);
        }
      });
      return () => unsub();
    } catch {
      // Offline fallback already active
    }
  }, []);

  const handleCategoryChange = (catKey) => {
    setActiveCategory(catKey);
    if (catKey === 'all') {
      searchParams.delete('topic');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ topic: catKey });
    }
  };

  const filteredResources = resources.filter((r) => {
    if (activeCategory === 'all') return true;
    if (r.emergency) return true; // Always highlight emergency on top
    return r.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c1e] via-[#161233] to-[#0a0a18] py-10 px-4 text-[#f0eef6] font-body select-none">
      <div className="max-w-3xl mx-auto">
        {/* Header Navigation */}
        <div className="flex items-center justify-between gap-3 mb-8">
          <Link
            to="/map"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
          >
            ← Back to Map
          </Link>
          <Link
            to="/leaderboard"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
          >
            🏆 Leaderboard
          </Link>
        </div>

        {/* Title Banner */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-400/40 shadow-xl mb-3">
            <span className="text-2xl">🛡️</span>
          </div>
          <h1 className="text-3xl font-extrabold font-display bg-gradient-to-r from-rose-400 via-amber-200 to-amber-300 bg-clip-text text-transparent">
            Verified Helplines &amp; Organizations
          </h1>
          <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-lg mx-auto leading-relaxed">
            Free, safe, and confidential resources. If you or a friend need support,
            talk to a trusted adult — or connect with verified organizations below.
          </p>
        </div>

        {/* 🚨 Emergency Banner (Childline 1098) */}
        <div className="w-full mb-6 p-5 rounded-3xl bg-rose-900/40 border-2 border-rose-500/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-500/30 border border-rose-400/40 flex items-center justify-center text-2xl font-extrabold text-rose-300 flex-shrink-0">
              1098
            </div>
            <div>
              <div className="font-display font-extrabold text-lg text-white">
                Childline India — Always Free &amp; Confidential
              </div>
              <div className="text-xs text-rose-200 mt-0.5">
                24 × 7 Emergency Lifeline · Toll-Free · For Any Child in Need
              </div>
            </div>
          </div>

          <a
            href="tel:1098"
            className="self-start sm:self-center px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-extrabold shadow-lg hover:scale-105 transition-all flex items-center gap-2"
          >
            <span>📞</span>
            <span>Call 1098 Now</span>
          </a>
        </div>

        {/* Topic Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => handleCategoryChange(tab.key)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === tab.key
                  ? 'bg-[#F5B942] text-black shadow-lg scale-105 font-extrabold'
                  : 'bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Resource Cards Feed */}
        <div className="space-y-3.5">
          {filteredResources.map((r) => (
            <div
              key={r.id || r.name}
              className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 shadow-lg ${
                r.emergency
                  ? 'bg-rose-950/25 border-rose-500/40'
                  : 'bg-[#121124]/80 border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start gap-4 flex-1">
                <span className="text-3xl mt-0.5 flex-shrink-0">{r.icon || '🏢'}</span>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-base text-white">{r.name}</span>
                    {r.emergency && (
                      <span className="px-2 py-0.5 rounded bg-rose-500/30 text-rose-300 font-mono text-[10px] font-extrabold">
                        EMERGENCY 24/7
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">{r.desc}</p>

                  {/* Acts Tag Pill */}
                  {r.acts && (
                    <div className="flex items-center gap-1.5 flex-wrap mt-2.5">
                      {r.acts.map((act, aIdx) => (
                        <span
                          key={aIdx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] text-[#F5B942] font-mono font-semibold"
                        >
                          {act}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Contact Buttons */}
              <div className="flex sm:flex-col items-center sm:items-end gap-2 flex-shrink-0 self-end sm:self-center">
                {r.phone && (
                  <a
                    href={`tel:${r.phone.replace(/[^0-9]/g, '')}`}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow ${
                      r.emergency
                        ? 'bg-rose-500 text-white hover:bg-rose-400'
                        : 'bg-white/10 hover:bg-white/20 border border-white/15 text-white'
                    }`}
                  >
                    <span>📞</span>
                    <span>{r.phone}</span>
                  </a>
                )}
                {r.website && (
                  <a
                    href={`https://${r.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-white/80 transition-all"
                  >
                    <span>🌐</span>
                    <span>Official Portal</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Safety & Compliance Guarantee */}
        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
          <p className="text-xs text-white/40 leading-relaxed max-w-lg mx-auto">
            Rights Quest does not track calls or collect contact details. Clicking phone numbers
            opens your device dialer directly. All helplines are verified national public services in India.
          </p>
        </div>
      </div>
    </div>
  );
}
