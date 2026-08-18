/**
 * Senior Story: Right to Healthcare & Emergency Aid (Ages 12–16)
 * Topic: Article 21 (Right to Health), Parmanand Katara Precedent & Adolescent Mental Health
 */

export default {
  id: 'right-to-healthcare',
  track: 'senior',
  ageTier: '12-16',
  title: {
    en: 'Emergency Medical Aid & Adolescent Health',
    hi: 'आपातकालीन चिकित्सा सहायता और किशोर स्वास्थ्य',
    kn: 'ತುರ್ತು ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಹದಿಹರೆಯದವರ ಆರೋಗ್ಯ',
  },
  subtitle: {
    en: 'Article 21 & Supreme Court Mandate on Unconditional Emergency Treatment',
    hi: 'अनुच्छेद 21 और आपातकालीन उपचार पर सर्वोच्च न्यायालय का अनिवार्य आदेश',
    kn: 'ವಿಧಿ 21 ಮತ್ತು ಉಚಿತ ತುರ್ತು ಚಿಕಿತ್ಸೆಯ ಸಾಂವಿಧಾನಿಕ ಹಕ್ಕು',
  },
  actTag: 'Right to Health',
  icon: '🏥',
  startNode: 'accident_scene',
  badge: {
    id: 'badge-senior-health',
    name: 'Emergency Health Guardian',
    icon: '🏥',
    article: 'Article 21 (Right to Life)',
  },
  quiz: [
    {
      question: {
        en: 'Can any hospital (public or private) refuse emergency medical treatment to an injured person pending police clearance or upfront payment?',
        hi: 'क्या कोई भी अस्पताल पुलिस क्लीयरेंस या अग्रिम भुगतान के बिना घायल व्यक्ति का आपातकालीन इलाज करने से इनकार कर सकता है?',
        kn: 'ಯಾವುದೇ ಆಸ್ಪತ್ರೆಯು ಪೊಲೀಸ್ ದೂರು ಅಥವಾ ಮುಂಗಡ ಹಣದ ನೆಪವೊಡ್ಡಿ ಗಾಯಾಳುಗಳಿಗೆ ತುರ್ತು ಚಿಕಿತ್ಸೆ ನಿರಾಕರಿಸಬಹುದೇ?',
      },
      options: [
        { en: 'Yes, private hospitals have the right to demand money first', hi: 'हाँ, निजी अस्पतालों को पहले पैसे मांगने का अधिकार है', kn: 'ಹೌದು, ಖಾಸಗಿ ಆಸ್ಪತ್ರೆಗಳು ಹಣ ಕೇಳಬಹುದು' },
        { en: 'Strictly prohibited under Article 21 (Parmanand Katara judgment) — saving human life comes before all procedural formalities', hi: 'अनुच्छेद 21 के तहत सख्त मना है — जीवन बचाना सभी औपचारिकताओं से पहले आता है', kn: 'ವಿಧಿ 21 ರ ಅಡಿಯಲ್ಲಿ ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ — ಜೀವ ಉಳಿಸುವುದು ಎಲ್ಲಕ್ಕಿಂತ ಮೊದಲ ಆದ್ಯತೆ' },
        { en: 'Only if the patient is over 18 years old', hi: 'केवल तभी जब मरीज 18 वर्ष से अधिक का हो', kn: 'ಕೇವಲ 18 ವರ್ಷ ಮೇಲ್ಪಟ್ಟವರಿಗೆ ಮಾತ್ರ' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'The Supreme Court in Parmanand Katara vs Union of India ruled that every doctor and hospital is constitutionally bound to provide immediate emergency aid without waiting for police formalities or payments.',
        hi: 'सुप्रीम कोर्ट ने परमानंद कटारा मामले में फैसला दिया कि हर डॉक्टर और अस्पताल को तुरंत इलाज करना अनिवार्य है।',
        kn: 'ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ಆದೇಶದಂತೆ ಪ್ರತಿಯೊಂದು ಆಸ್ಪತ್ರೆಯೂ ಯಾವುದೇ ಶುಲ್ಕ ಅಥವಾ ಪೊಲೀಸ್ ಪ್ರಕ್ರಿಯೆಗಾಗಿ ಕಾಯದೆ ತಕ್ಷಣ ಜೀವ ಉಳಿಸುವ ಚಿಕಿತ್ಸೆ ನೀಡಬೇಕು.',
      },
    },
  ],
  nodes: {
    accident_scene: {
      id: 'accident_scene',
      characterPose: 'concerned',
      location: 'highway',
      mood: 'tense',
      timeOfDay: 'evening',
      text: {
        en: "15-year-old Rohan witnesses a road accident where a fellow high-school student on a bicycle is injured. A nearby private multi-speciality hospital desk refuses to admit the bleeding student without an upfront cash deposit of ₹15,000.",
        hi: "15 वर्षीय रोहन एक सड़क दुर्घटना देखता है जहां साइकिल सवार छात्र घायल हो गया है। पास का निजी अस्पताल ₹15,000 के अग्रिम नकद भुगतान के बिना घायल छात्र को भर्ती करने से इनकार करता है।",
        kn: "15 ವರ್ಷದ ರೋಹನ್ ಅಪಘಾತದಲ್ಲಿ ಗಾಯಗೊಂಡ ಶಾಲಾ ವಿದ್ಯಾರ್ಥಿಯನ್ನು ನೋಡುತ್ತಾನೆ. ಹತ್ತಿರದ ಖಾಸಗಿ ಆಸ್ಪತ್ರೆಯು ₹15,000 ಮುಂಗಡ ಹಣವಿಲ್ಲದೆ ತುರ್ತು ಚಿಕಿತ್ಸೆ ನೀಡಲು ನಿರಾಕರಿಸುತ್ತದೆ.",
      },
      didYouKnow: {
        en: 'Under Article 21 and the Supreme Court’s landmark Parmanand Katara judgment, denying emergency medical care is a direct violation of the Fundamental Right to Life.',
        hi: 'अनुच्छेद 21 और परमानंद कटारा फैसले के तहत आपातकालीन चिकित्सा से इनकार करना जीवन के मौलिक अधिकार का उल्लंघन है।',
        kn: 'ವಿಧಿ 21 ರ ಅಡಿಯಲ್ಲಿ ತುರ್ತು ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆ ನಿರಾಕರಿಸುವುದು ಜೀವಿಸುವ ಮೂಲಭೂತ ಹಕ್ಕಿನ ನೇರ ಉಲ್ಲಂಘನೆಯಾಗಿದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Invoke the Supreme Court Parmanand Katara mandate and demand immediate emergency stabilization',
            hi: 'सुप्रीम कोर्ट के परमानंद कटारा फैसले का हवाला दें और तत्काल आपातकालीन उपचार की मांग करें',
            kn: 'ಸುಪ್ರೀಂ ಕೋರ್ಟ್ ತೀರ್ಪನ್ನು ಉಲ್ಲೇಖಿಸಿ ತಕ್ಷಣ ತುರ್ತು ಚಿಕಿತ್ಸೆ ಆರಂಭಿಸುವಂತೆ ಒತ್ತಾಯಿಸಿ',
          },
          next: 'emergency_stabilization',
          xp: 15,
          type: 'strong',
        },
        {
          label: {
            en: 'Call the 108 Emergency Ambulance Lifeline and alert the Chief Medical Officer',
            hi: '108 आपातकालीन एम्बुलेंस को कॉल करें और मुख्य चिकित्सा अधिकारी को सतर्क करें',
            kn: '108 ತುರ್ತು ಆಂಬ್ಯುಲೆನ್ಸ್‌ಗೆ ಕರೆ ಮಾಡಿ ಜಿಲ್ಲಾ ವೈದ್ಯಾಧಿಕಾರಿಗಳಿಗೆ ಮಾಹಿತಿ ನೀಡಿ',
          },
          next: 'ambulance_triage',
          xp: 12,
          type: 'strong',
        },
        {
          label: {
            en: 'Hesitate wondering if private hospitals can make their own admission rules',
            hi: 'यह सोचकर हिचकिचाएं कि क्या निजी अस्पताल अपने नियम खुद बना सकते हैं',
            kn: 'ಖಾಸಗಿ ಆಸ್ಪತ್ರೆಗಳ ನಿಯಮಗಳನ್ನು ಪ್ರಶ್ನಿಸಲಾಗದು ಎಂದುಕೊಂಡು ಹಿಂಜರಿಯಿರಿ',
          },
          next: 'legal_awareness_clarity',
          xp: 5,
          risky: true,
          type: 'risky',
        },
      ],
    },

    legal_awareness_clarity: {
      id: 'legal_awareness_clarity',
      characterPose: 'thoughtful',
      location: 'hospital_lobby',
      mood: 'serious',
      timeOfDay: 'night',
      text: {
        en: "A visiting resident doctor Dr. Meera overhears: 'Young man, you are right! Under the Clinical Establishments Act and Article 21, no hospital can turn away an emergency trauma case. Let’s wheel the patient into the ICU immediately.'",
        hi: "एक वरिष्ठ डॉक्टर डॉ. मीरा सुनती हैं: 'युवा साथी, आप सही कह रहे हैं! क्लिनिकल एस्टेब्लिशमेंट एक्ट और अनुच्छेद 21 के तहत कोई भी अस्पताल आपातकालीन मरीज को लौटा नहीं सकता। तुरंत आईसीयू में ले चलिए।' ",
        kn: "ಹಿರಿಯ ವೈದ್ಯೆ ಡಾ. ಮೀರಾ: 'ಯುವಕನೇ, ನಿನ್ನ ಮಾತು ಸರಿ! ಕ್ಲಿನಿಕಲ್ ಎಸ್ಟಾಬ್ಲಿಷ್‌ಮೆಂಟ್ ಕಾಯ್ದೆ ಮತ್ತು ವಿಧಿ 21 ರ ಅಡಿಯಲ್ಲಿ ಯಾವುದೇ ಆಸ್ಪತ್ರೆ ತುರ್ತು ಚಿಕಿತ್ಸೆ ನಿರಾಕರಿಸುವಂತಿಲ್ಲ.'",
      },
      choices: [
        {
          label: {
            en: 'Assist in getting the student stabilized and ensure government Ayushman / state trauma coverage is applied',
            hi: 'छात्र को स्थिर कराने में मदद करें और सरकारी आयुष्मान/ट्रॉमा कवर लागू कराएं',
            kn: 'ವಿದ್ಯಾರ್ಥಿಗೆ ತಕ್ಷಣ ಚಿಕಿತ್ಸೆ ಕೊಡಿಸಿ ಸರ್ಕಾರದ ಉಚಿತ ಅಪಘಾತ ಚಿಕಿತ್ಸಾ ಯೋಜನೆಯಡಿ ದಾಖಲಿಸಿ',
          },
          next: 'emergency_stabilization',
          xp: 15,
          type: 'strong',
        },
      ],
    },

    emergency_stabilization: {
      id: 'emergency_stabilization',
      characterPose: 'confident',
      location: 'icu_ward',
      mood: 'positive',
      timeOfDay: 'night',
      text: {
        en: "The emergency medical team stabilizes the student’s vital signs and performs life-saving surgery without any upfront fee. The hospital administration officially registers the case under the state cashless trauma care policy.",
        hi: "आपातकालीन टीम छात्र की स्थिति को स्थिर करती है और बिना किसी अग्रिम शुल्क के जीवन रक्षक सर्जरी करती है। अस्पताल कैशलेस ट्रॉमा केयर पॉलिसी के तहत इलाज दर्ज करता है।",
        kn: "ವೈದ್ಯಕೀಯ ತಂಡವು ಯಾವುದೇ ಹಣವಿಲ್ಲದೆ ತಕ್ಷಣ ತುರ್ತು ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ ನಡೆಸಿ ವಿದ್ಯಾರ್ಥಿಯ ಜೀವ ಉಳಿಸುತ್ತದೆ ಮತ್ತು ಉಚಿತ ಅಪಘಾತ ಪರಿಹಾರ ಯೋಜನೆಯಡಿ ದಾಖಲಿಸುತ್ತದೆ.",
      },
      choices: [
        {
          label: {
            en: 'Ensure adolescent health and mental wellbeing checkups through the RKSK government clinic',
            hi: 'आरकेएसके सरकारी क्लिनिक के माध्यम से किशोर स्वास्थ्य और मानसिक कल्याण जांच सुनिश्चित करें',
            kn: 'ಆರ್‌ಕೆಎಸ್‌ಕೆ ಕ್ಲಿನಿಕ್ ಮೂಲಕ ಹದಿಹರೆಯದವರ ಸಂಪೂರ್ಣ ಆರೋಗ್ಯ ಮತ್ತು ಕೌನ್ಸಿಲಿಂಗ್ ಖಚಿತಪಡಿಸಿ',
          },
          next: 'health_victory',
          xp: 25,
          type: 'strong',
        },
      ],
    },

    ambulance_triage: {
      id: 'ambulance_triage',
      characterPose: 'standing',
      location: 'emergency_room',
      mood: 'positive',
      timeOfDay: 'night',
      text: {
        en: "The 108 paramedic team arrives with advanced life support and coordinates with the District Government Trauma Center. Rohan’s timely constitutional intervention saved a young citizen’s life.",
        hi: "108 पैरामेडिक टीम उन्नत जीवन रक्षक उपकरणों के साथ पहुंचती है और जिला ट्रॉमा सेंटर के साथ समन्वय करती है। रोहन के समय पर कानूनी हस्तक्षेप ने एक जीवन बचा लिया।",
        kn: "108 ತುರ್ತು ತಂಡವು ತಕ್ಷಣ ಬಂದು ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆಗೆ ಕೊಂಡೊಯ್ಯುತ್ತದೆ. ರೋಹನ್‌ನ ಸಮಯಪ್ರಜ್ಞೆ ಮತ್ತು ಸಾಂವಿಧಾನಿಕ ಹಕ್ಕಿನ ಅರಿವು ಒಬ್ಬ ವಿದ್ಯಾರ್ಥಿಯ ಅಮೂಲ್ಯ ಜೀವವನ್ನು ಉಳಿಸಿತು.",
      },
      choices: [
        {
          label: {
            en: 'Celebrate constitutional healthcare awareness across high schools',
            hi: 'हाई स्कूलों में संवैधानिक स्वास्थ्य जागरूकता का प्रसार करें',
            kn: 'ಪ್ರೌಢಶಾಲೆಗಳಾದ್ಯಂತ ತುರ್ತು ವೈದ್ಯಕೀಯ ಹಕ್ಕುಗಳ ಜಾಗೃತಿಯನ್ನು ಸಂಭ್ರಮಿಸಿ',
          },
          next: 'health_victory',
          xp: 25,
          type: 'strong',
        },
      ],
    },

    health_victory: {
      id: 'health_victory',
      end: true, isEnding: true,
      characterPose: 'cheering',
      location: 'hospital_garden',
      mood: 'celebration',
      timeOfDay: 'day',
      text: {
        en: "The student fully recovers and returns to school. Rohan proved that under Article 21, the Right to Life and Emergency Health is non-negotiable for every child and youth in India.",
        hi: "छात्र पूरी तरह ठीक होकर स्कूल लौटता है। रोहन ने साबित किया कि अनुच्छेद 21 के तहत जीवन और स्वास्थ्य का अधिकार भारत के हर बच्चे का अडिग अधिकार है।",
        kn: "ವಿದ್ಯಾರ್ಥಿ ಸಂಪೂರ್ಣ ಗುಣಮುಖನಾಗಿ ಶಾಲೆಗೆ ಮರಳುತ್ತಾನೆ. ಭಾರತದ ಪ್ರತಿಯೊಬ್ಬ ನಾಗರಿಕನಿಗೂ ವಿಧಿ 21 ರ ಅಡಿಯಲ್ಲಿ ಜೀವ ರಕ್ಷಣೆ ಪಡೆಯುವುದು ಮೂಲಭೂತ ಹಕ್ಕು ಎಂಬುದನ್ನು ರೋಹನ್ ಸಾಬೀತುಪಡಿಸಿದನು.",
      },
      didYouKnow: {
        en: 'Emergency medical helpline 108 and ambulance services are free for all residents across India 24 hours a day.',
        hi: 'आपातकालीन चिकित्सा हेल्पलाइन 108 और एम्बुलेंस सेवाएं पूरे भारत में 24 घंटे पूरी तरह निःशुल्क हैं।',
        kn: 'ರಾಷ್ಟ್ರೀಯ ತುರ್ತು ಸಹಾಯವಾಣಿ 108 ಮತ್ತು ಆಂಬ್ಯುಲೆನ್ಸ್ ಸೇವೆಗಳು ದೇಶಾದ್ಯಂತ 24 ಗಂಟೆಯೂ ಉಚಿತವಾಗಿ ಲಭ್ಯವಿವೆ.',
      },
      endingBadge: {
        name: 'Right to Health Defender',
        icon: '🏥',
        xpBonus: 50,
      },
    },
  },
};
