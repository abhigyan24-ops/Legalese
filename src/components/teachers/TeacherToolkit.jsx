/**
 * TeacherToolkit.jsx — Facilitator & Educator Lesson Plans
 * 
 * Provides 5 printable classroom lesson plans tailored for Indian schools and NGOs:
 * - 2-sentence statutory right summary
 * - 3–4 post-game classroom discussion prompts
 * - Hands-on extension activity
 * - Direct mapping to National Curriculum Framework (NCF) & Social Studies standards
 */

import { useState } from 'react';
import { Link } from 'react-router-dom';
import sound from '../../lib/sound';

const LESSON_PLANS = [
  {
    id: 'right-to-education',
    title: 'Right to Education (Article 21-A & RTE Act 2009)',
    icon: '🎒',
    gradeLevel: 'Classes 4 to 8 (Ages 8–14)',
    duration: '40–45 minutes',
    lawCite: 'Constitution of India Art. 21-A; RTE Act 2009',
    summary:
      'Article 21-A guarantees free and compulsory elementary education to every child in India between 6 and 14 years. The RTE Act 2009 mandates that no school can deny admission or withhold documentation due to financial hardship or lack of birth certificates.',
    discussionQuestions: [
      'Why do you think Meena felt scared when she was told her fees were unpaid, and what did her friends learn about the RTE Act?',
      'What is the role of the School Management Committee (SMC) in protecting children who face financial difficulties?',
      'If a new student in your neighbourhood has no birth certificate, can a school refuse to admit them? Why or why not?',
      'How does having an education help a child stand up for their other rights later in life?',
    ],
    extensionActivity: {
      title: 'Classroom Rights Wall & SMC Roleplay',
      desc: 'Divide the class into 4 groups: Students, Teachers, Headmaster, and SMC Parents. Re-enact a friendly 5-minute meeting where the committee successfully invokes Section 3 of the RTE Act to ensure every child remains in school.',
    },
  },
  {
    id: 'right-to-healthcare',
    title: 'Right to Healthcare & Child Nutrition (Article 21)',
    icon: '🏥',
    gradeLevel: 'Classes 5 to 9 (Ages 9–15)',
    duration: '40–45 minutes',
    lawCite: 'Constitution of India Art. 21; National Health Mission (NHM)',
    summary:
      'The right to life under Article 21 includes the fundamental right to health and medical care. Government Primary Health Centres (PHCs) and programs like RBSK provide free paediatric diagnostics, emergency stabilization, medicines, and immunization to all children.',
    discussionQuestions: [
      'Why is it dangerous to rely on unverified advice or delay visiting a qualified doctor when a child falls severely ill?',
      'What healthcare services are provided free of cost to children at government Primary Health Centres (PHCs)?',
      'What is the difference between calling 104 (health advice) and 108 (emergency ambulance)?',
    ],
    extensionActivity: {
      title: 'Community Health Map & Emergency Guide',
      desc: 'Have students design a one-page "Village / Neighbourhood Health Map" listing their nearest PHC, government hospital, emergency helpline numbers (104, 108, 1098), and essential hygiene tips.',
    },
  },
  {
    id: 'protection-from-child-labour',
    title: 'Protection from Child Labour (CLPRA 1986 / 2016)',
    icon: '🏭',
    gradeLevel: 'Classes 5 to 10 (Ages 10–16)',
    duration: '45 minutes',
    lawCite: 'Child Labour (Prohibition & Regulation) Amendment Act 2016',
    summary:
      'The law strictly prohibits any child below 14 from working in any commercial establishment or workshop, and bans adolescents (14–18) from hazardous work. Every child has an absolute constitutional priority to be in school rather than at a workplace.',
    discussionQuestions: [
      'What did Raju trade away when he had to work in the factory instead of attending school?',
      'How does the 2016 Amendment hold employers and contractors accountable for hiring children?',
      'Why is calling Childline 1098 safer than trying to confront an illegal employer alone?',
    ],
    extensionActivity: {
      title: 'Child Labour Free Community Pledge',
      desc: 'Students create posters titled "Books in Hands, Futures in Flight" and present them during the school morning assembly to raise awareness on reporting child labour in local tea stalls and shops.',
    },
  },
  {
    id: 'protection-from-abuse',
    title: 'Protection from Abuse & Personal Safety (POCSO Act 2012)',
    icon: '🛡️',
    gradeLevel: 'Classes 4 to 10 (Ages 8–16)',
    duration: '40 minutes',
    lawCite: 'POCSO Act 2012; Juvenile Justice (Care & Protection) Act',
    summary:
      'The POCSO Act 2012 guarantees absolute legal protection to children below 18 against harassment and abuse. The law mandates complete identity confidentiality, child-friendly legal procedures, and establishes that a child is NEVER at fault.',
    discussionQuestions: [
      'What are "Safe Boundaries", and what should you do if someone makes you feel uncomfortable or scared?',
      'Why is a child NEVER to blame when someone violates their safety?',
      'How does Childline 1098 protect a caller’s identity when reporting a concern?',
    ],
    extensionActivity: {
      title: 'My Trusted Circle of 5',
      desc: 'Students draw an outline of their hand and write down 5 trusted adults (e.g. parent, favourite teacher, school counsellor, doctor, elder sibling) they can talk to anytime without fear.',
    },
  },
  {
    id: 'protection-from-child-marriage',
    title: 'Protection from Child Marriage (PCMA 2006)',
    icon: '📜',
    gradeLevel: 'Classes 6 to 10 (Ages 11–16)',
    duration: '45 minutes',
    lawCite: 'Prohibition of Child Marriage Act 2006 (PCMA)',
    summary:
      'In India, marriage before 18 for females and 21 for males is strictly illegal. The law empowers magistrates, Child Marriage Prohibition Officers (CMPOs), and Childline 1098 to immediately issue injunctions and protect young girls’ educational futures.',
    discussionQuestions: [
      'Why is early marriage harmful to a young person’s education, health, and independence?',
      'What legal powers do Child Marriage Prohibition Officers and Magistrates have to stop an illegal marriage?',
      'How did Pooja’s friends and teacher work together to help her continue her higher education?',
    ],
    extensionActivity: {
      title: 'Letter to My Future Self',
      desc: 'Students write a short letter describing their career and educational aspirations for age 22, discussing why completing school and college is essential to achieving their goals.',
    },
  },
];

export default function TeacherToolkit() {
  const [selectedPlanId, setSelectedPlanId] = useState('right-to-education');
  const activePlan = LESSON_PLANS.find((p) => p.id === selectedPlanId) || LESSON_PLANS[0];

  const handlePrint = () => {
    sound.click();
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#132A20] text-[#FBF3E3] font-body select-none py-8 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        {/* Navigation Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A6650] print:hidden">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              onClick={() => sound.click()}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all shadow"
            >
              ← Back to Home
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">👩‍🏫</span>
                <h1 className="text-xl sm:text-2xl font-extrabold font-display text-[#F5B942]">
                  Educator &amp; Facilitator Toolkit
                </h1>
              </div>
              <p className="text-xs text-[#9FBBAB]">
                Ready-to-use 1-page classroom lesson plans &amp; discussion guides for Indian schools
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              to="/resources"
              onClick={() => sound.click()}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all"
            >
              📞 Helplines
            </Link>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#F5B942] to-[#FFE7A8] text-black font-extrabold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-1.5"
            >
              <span>🖨️</span>
              <span>Print Lesson Plan</span>
            </button>
          </div>
        </header>

        {/* Story Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none print:hidden">
          {LESSON_PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => {
                sound.click();
                setSelectedPlanId(plan.id);
              }}
              className={`px-4 py-2 rounded-2xl text-xs font-extrabold whitespace-nowrap transition-all flex items-center gap-2 border ${
                selectedPlanId === plan.id
                  ? 'bg-[#F5B942] text-black border-[#F5B942] shadow-lg'
                  : 'bg-[#1D3C2C] border-[#3A6650] text-white/70 hover:text-white'
              }`}
            >
              <span>{plan.icon}</span>
              <span>{plan.title.split('(')[0]}</span>
            </button>
          ))}
        </div>

        {/* ── PRINTABLE 1-PAGE LESSON PLAN CARD ── */}
        <div className="bg-[#1D3C2C] border-2 border-[#3A6650] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6 print:border-black print:bg-white print:text-black">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#3A6650] print:border-black">
            <div>
              <div className="flex items-center gap-2 text-[#F5B942] print:text-black text-xs font-mono font-bold uppercase tracking-wider">
                <span>{activePlan.icon}</span>
                <span>Classroom Lesson Plan • {activePlan.lawCite}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-display text-white print:text-black mt-1">
                {activePlan.title}
              </h2>
            </div>
            <div className="flex sm:flex-col items-end gap-1 text-xs text-[#9FBBAB] print:text-gray-700">
              <span><strong>Target:</strong> {activePlan.gradeLevel}</span>
              <span><strong>Duration:</strong> {activePlan.duration}</span>
            </div>
          </div>

          {/* Statutory Summary */}
          <div className="p-4 rounded-2xl bg-[#25493A] border border-[#3A6650] print:bg-gray-100 print:border-gray-300">
            <h3 className="text-xs uppercase font-mono font-bold text-[#F5B942] print:text-black mb-1">
              📜 Statutory Learning Objective
            </h3>
            <p className="text-xs sm:text-sm text-[#FBF3E3] print:text-black leading-relaxed">
              {activePlan.summary}
            </p>
          </div>

          {/* Post-Game Discussion Questions */}
          <div className="flex flex-col gap-3">
            <h3 className="text-xs uppercase font-mono font-bold text-[#FFE7A8] print:text-black flex items-center gap-1.5">
              <span>💬</span>
              <span>Post-Game Classroom Discussion Prompts (15–20 mins)</span>
            </h3>
            <div className="space-y-2.5">
              {activePlan.discussionQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-black/20 border border-white/10 print:border-gray-200 print:bg-white flex items-start gap-3"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-[#F5B942] print:text-black font-mono font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-white/90 print:text-black leading-relaxed">
                    {q}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Hands-on Extension Activity */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#25493A] to-[#1D3C2C] border-2 border-[#F5B942]/40 print:border-gray-400 print:bg-gray-50 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F5B942] print:text-black uppercase">
              <span>🎨</span>
              <span>Hands-on Extension Activity: {activePlan.extensionActivity.title}</span>
            </div>
            <p className="text-xs sm:text-sm text-[#FBF3E3] print:text-black leading-relaxed">
              {activePlan.extensionActivity.desc}
            </p>
          </div>

          {/* Footer Citation & Support */}
          <div className="pt-3 border-t border-[#3A6650] print:border-black flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#9FBBAB] print:text-gray-600 gap-2">
            <span>Rights Quest India • Free Open Educational Resource</span>
            <span>Emergency Child Assistance: Toll-free <strong>Childline 1098</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}
