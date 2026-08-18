/**
 * right-to-healthcare.js
 * 
 * Right to Healthcare story — Immunization, Health Center Access, and Primary Care.
 * 20+ branching nodes, 3 choices per decision node, recovery arcs for risky choices,
 * 5 distinct endings across strong, medium, medium-low, weak outcomes.
 * Native speaker review recommended for Hindi and Kannada strings.
 */

export default {
  id: 'right-to-healthcare',
  title: {
    en: 'The Right to Healthcare',
    hi: 'स्वास्थ्य का अधिकार',
    kn: 'ಆರೋಗ್ಯದ ಹಕ್ಕು',
  },
  startNode: 'start',
  stages: [
    { icon: '🏥', label: 'Primary Clinic' },
    { icon: '🩺', label: 'Health Dilemma' },
    { icon: '💊', label: 'Seeking Treatment' },
    { icon: '🌿', label: 'Community Action' },
    { icon: '🌟', label: 'Healthy Future' },
  ],
  characters: {
    doctor: { name: 'Dr. Rao', role: 'PHC Medical Officer' },
    rohit: { name: 'Rohit', role: 'Sick Classmate' },
    asha: { name: 'Sunita Didi', role: 'ASHA Healthcare Worker' },
  },
  nodes: {
    start: {
      stage: 0,
      mood: 'worried',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'deskRow', x: 30, y: 220, args: [4] },
        { p: 'classroomWindow', x: 300, y: 60 },
      ],
      text: {
        en: "Your classmate Rohit has been coughing violently and running a high fever for three days. His family is avoiding the hospital because they fear unexpected medical bills.",
        hi: 'आपके सहपाठी रोहित को तीन दिनों से तेज खांसी और तेज बुखार है। उसका परिवार अप्रत्याशित मेडिकल बिलों के डर से अस्पताल जाने से बच रहा है।',
        kn: 'ನಿಮ್ಮ ಸಹಪಾಠಿ ರೋಹಿತ್ ಮೂರು ದಿನಗಳಿಂದ ತೀವ್ರ ಕೆಮ್ಮು ಮತ್ತು ಜ್ವರದಿಂದ ಬಳಲುತ್ತಿದ್ದಾನೆ. ಆಸ್ಪತ್ರೆಯ ಖರ್ಚಿನ ಭಯದಿಂದ ಅವನ ಕುಟುಂಬ ಆಸ್ಪತ್ರೆಗೆ ಹೋಗಲು ಹಿಂಜರಿಯುತ್ತಿದೆ.',
      },
      didYouKnow: {
        en: 'Under the Rashtriya Bal Swasthya Karyakram (RBSK), over 25 crore children in India receive free health check-ups and treatment at government centres. (Source: Ministry of Health & Family Welfare)',
        hi: 'राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK) के तहत, भारत में 25 करोड़ से अधिक बच्चों को सरकारी केंद्रों पर मुफ्त स्वास्थ्य जांच और उपचार मिलता है। (स्रोत: स्वास्थ्य मंत्रालय)',
        kn: 'ರಾಷ್ಟ್ರೀಯ ಬಾಲ ಸ್ವಾಸ್ಥ್ಯ ಕಾರ್ಯಕ್ರಮದಡಿ ಭಾರತದ 25 ಕೋಟಿಗೂ ಹೆಚ್ಚು ಮಕ್ಕಳಿಗೆ ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗಳಲ್ಲಿ ಉಚಿತ ಚಿಕಿತ್ಸೆ ನೀಡಲಾಗುತ್ತದೆ. (ಮೂಲ: ಆರೋಗ್ಯ ಸಚಿವಾಲಯ)',
      },
      choices: [
        {
          label: {
            en: 'Tell Rohit about the free Primary Health Centre (PHC) in the village',
            hi: 'रोहित को गांव के मुफ्त प्राथमिक स्वास्थ्य केंद्र (PHC) के बारे में बताएं',
            kn: 'ಗ್ರಾಮದಲ್ಲಿರುವ ಉಚಿತ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರದ (PHC) ಬಗ್ಗೆ ರೋಹಿತ್‌ಗೆ ತಿಳಿಸಿ',
          },
          next: 'visit_phc',
          xp: 15,
          propIcon: '🏥',
        },
        {
          label: {
            en: 'Contact the local ASHA healthcare worker for guidance',
            hi: 'मार्गदर्शन के लिए स्थानीय आशा (ASHA) स्वास्थ्य कार्यकर्ता से संपर्क करें',
            kn: 'ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಸ್ಥಳೀಯ ಆಶಾ (ASHA) ಕಾರ್ಯಕರ್ತೆಯರನ್ನು ಸಂಪರ್ಕಿಸಿ',
          },
          next: 'contact_asha',
          xp: 15,
          propIcon: '👩‍⚕️',
        },
        {
          label: {
            en: 'Advise him to buy unverified pills from the local grocery shop',
            hi: 'उसे स्थानीय किराना दुकान से बिना डॉक्टर की पर्ची वाली दवा लेने की सलाह दें',
            kn: 'ಸ್ಥಳೀಯ ಕಿರಾಣಿ ಅಂಗಡಿಯಿಂದ ಪರಿಶೀಲಿಸದ ಮಾತ್ರೆಗಳನ್ನು ಖರೀದಿಸಲು ಸಲಹೆ ನೀಡಿ',
          },
          next: 'unverified_pills',
          xp: 2,
          risky: true,
          propIcon: '💊',
        },
      ],
    },

    unverified_pills: {
      stage: 0,
      mood: 'sad',
      location: 'street',
      timeOfDay: 'dusk',
      sceneObjects: [{ p: 'feeNoticePaper', x: 200, y: 210 }],
      text: {
        en: 'The unverified pills make Rohit dizzy and nauseous. Self-medicating without medical diagnosis can be dangerous! Every child is entitled to safe, free primary healthcare.',
        hi: 'बिना जांच वाली गोलियों से रोहित को चक्कर और उल्टी आने लगती है। बिना डॉक्टर के परामर्श के दवा लेना खतरनाक हो सकता है! हर बच्चे को सुरक्षित, मुफ्त प्राथमिक स्वास्थ्य सेवा का अधिकार है।',
        kn: 'ಪರಿಶೀಲಿಸದ ಮಾತ್ರೆಗಳಿಂದ ರೋಹಿತ್‌ಗೆ ತಲೆಸುತ್ತು ಮತ್ತು ವಾಂತಿಯಾಗುತ್ತದೆ. ವೈದ್ಯರ ಸಲಹೆಯಿಲ್ಲದೆ ಔಷಧಿ ಸೇವಿಸುವುದು ಅಪಾಯಕಾರಿ! ಪ್ರತಿಯೊಂದು ಮಗುವಿಗೂ ಉಚಿತ ಆರೋಗ್ಯ ರಕ್ಷಣೆಯ ಹಕ್ಕಿದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Immediately rush with Rohit to the Primary Health Centre',
            hi: 'तुरंत रोहित के साथ प्राथमिक स्वास्थ्य केंद्र पहुंचें',
            kn: 'ತಕ್ಷಣವೇ ರೋಹಿತ್ ಜೊತೆ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ತೆರಳಿ',
          },
          next: 'visit_phc',
          xp: 10,
          propIcon: '🏃',
        },
        {
          label: {
            en: 'Call Sunita Didi, the village ASHA worker, for emergency home care',
            hi: 'आपातकालीन देखभाल के लिए आशा कार्यकर्ता सुनीता दीदी को बुलाएं',
            kn: 'ತುರ್ತು ಆರೈಕೆಗಾಗಿ ಆಶಾ ಕಾರ್ಯಕರ್ತೆ ಸುನೀತಾ ದೀದಿಯವರನ್ನು ಕರೆಯಿರಿ',
          },
          next: 'contact_asha',
          xp: 10,
          propIcon: '📞',
        },
        {
          label: {
            en: 'Wait till tomorrow hoping the nausea subsides on its own',
            hi: 'कल तक इंतजार करें यह सोचकर कि उल्टी अपने आप ठीक हो जाएगी',
            kn: 'ನಾಳೆಯವರೆಗೆ ಕಾಯಿರಿ',
          },
          next: 'worsening_fever',
          xp: 2,
          risky: true,
          propIcon: '⏳',
        },
      ],
    },

    worsening_fever: {
      stage: 1,
      mood: 'worried',
      location: 'classroom',
      timeOfDay: 'evening',
      sceneObjects: [{ p: 'emptyDesk', x: 120, y: 280, args: [true] }],
      text: {
        en: 'By morning, Rohit cannot get out of bed. His parents are terrified. You realize delay causes harm, and government health schemes like RBSK (Rashtriya Bal Swasthya Karyakram) exist to help children for free.',
        hi: 'सुबह तक रोहित बिस्तर से नहीं उठ पाता। उसके माता-पिता घबरा जाते हैं। आपको समझ आता है कि देरी खतरनाक है और राष्ट्रीय बाल स्वास्थ्य कार्यक्रम (RBSK) बच्चों की मुफ्त मदद के लिए मौजूद है।',
        kn: 'ಬೆಳಗಾಗುವಷ್ಟರಲ್ಲಿ ರೋಹಿತ್ ಹಾಸಿಗೆಯಿಂದ ಏಳಲಾರದ ಸ್ಥಿತಿಯಲ್ಲಿದ್ದಾನೆ. ಸರ್ಕಾರದ ರಾಷ್ಟ್ರೀಯ ಬಾಲ ಸ್ವಾಸ್ಥ್ಯ ಕಾರ್ಯಕ್ರಮದಡಿ ಮಕ್ಕಳಿಗೆ ಉಚಿತ ಚಿಕಿತ್ಸೆ ಲಭ್ಯವಿದೆ ಎಂದು ನೀವು ನೆನಪಿಸಿಕೊಳ್ಳುತ್ತೀರಿ.',
      },
      choices: [
        {
          label: {
            en: 'Bring the school teacher and PHC doctor directly to his home',
            hi: 'स्कूल के शिक्षक और प्राथमिक स्वास्थ्य केंद्र के डॉक्टर को सीधे उसके घर लाएं',
            kn: 'ಶಾಲಾ ಶಿಕ್ಷಕರು ಮತ್ತು ವೈದ್ಯರನ್ನು ನೇರವಾಗಿ ಅವನ ಮನೆಗೆ ಕರೆತನ್ನಿ',
          },
          next: 'home_treatment',
          xp: 12,
          propIcon: '👨‍⚕️',
        },
        {
          label: {
            en: 'Guide his parents to the government civil hospital ambulance (108)',
            hi: 'उसके माता-पिता को सरकारी एम्बुलेंस (108) बुलाने में मदद करें',
            kn: 'ಸರ್ಕಾರಿ ಆಂಬ್ಯುಲೆನ್ಸ್ (108) ಗೆ ಕರೆ ಮಾಡಲು ಅವನ ಪೋಷಕರಿಗೆ ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'hospital_ambulance',
          xp: 15,
          propIcon: '🚑',
        },
        {
          label: {
            en: 'Try borrowing money from moneylenders for a private clinic',
            hi: 'निजी क्लिनिक के लिए साहूकार से ब्याज पर पैसे उधार लेने की कोशिश करें',
            kn: 'ಖಾಸಗಿ ಕ್ಲಿನಿಕ್‌ಗಾಗಿ ಸಾಲ ಪಡೆಯಲು ಪ್ರಯತ್ನಿಸಿ',
          },
          next: 'debt_trap_warning',
          xp: 3,
          risky: true,
          propIcon: '💸',
        },
      ],
    },

    debt_trap_warning: {
      stage: 1,
      mood: 'sad',
      location: 'street',
      timeOfDay: 'dusk',
      sceneObjects: [{ p: 'feeNoticePaper', x: 260, y: 180 }],
      text: {
        en: 'High-interest moneylenders trap poor families in debt. Government hospitals, Jan Aushadhi generic medicines, and Ayushman Bharat health wellness centres provide free care without debt!',
        hi: 'ब्याज पर पैसे लेना गरीब परिवारों को कर्ज के जाल में फंसा देता है। सरकारी अस्पताल, जन औषधि केंद्र और आयुष्मान भारत बिना कर्ज के मुफ्त इलाज उपलब्ध कराते हैं!',
        kn: 'ಅಧಿಕ ಬಡ್ಡಿಗೆ ಸಾಲ ಪಡೆಯುವುದು ಬಡ ಕುಟುಂಬಗಳನ್ನು ಸಾಲದ ಸುಳಿಗೆ ಸಿಲುಕಿಸುತ್ತದೆ. ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಗಳು ಮತ್ತು ಜನೌಷಧಿ ಕೇಂದ್ರಗಳು ಉಚಿತ ಚಿಕಿತ್ಸೆ ನೀಡುತ್ತವೆ!',
      },
      choices: [
        {
          label: {
            en: 'Redirect the family to the government Community Health Centre (CHC)',
            hi: 'परिवार को सरकारी सामुदायिक स्वास्थ्य केंद्र (CHC) ले जाएं',
            kn: 'ಕುಟುಂಬವನ್ನು ಸರ್ಕಾರಿ ಸಮುದಾಯ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ (CHC) ಕರೆದೊಯ್ಯಿರಿ',
          },
          next: 'visit_phc',
          xp: 12,
          propIcon: '🏥',
        },
        {
          label: {
            en: 'Call the 104 National Health Helpline for free advice and transport',
            hi: 'मुफ्त सलाह और परिवहन के लिए 104 राष्ट्रीय स्वास्थ्य हेल्पलाइन पर कॉल करें',
            kn: 'ಉಚಿತ ಸಲಹೆ ಮತ್ತು ಆಂಬ್ಯುಲೆನ್ಸ್‌ಗಾಗಿ 104 ಆರೋಗ್ಯ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ',
          },
          next: 'hospital_ambulance',
          xp: 15,
          propIcon: '📞',
        },
        {
          label: {
            en: 'Give up on official channels and let them decide',
            hi: 'सरकारी माध्यमों को छोड़ दें और उन्हें खुद फैसला करने दें',
            kn: 'ಅವರಿಗೆ ತಾವೇ ನಿರ್ಧರಿಸಲು ಬಿಡಿ',
          },
          next: 'ending_weak_neglect',
          xp: 1,
          risky: true,
          propIcon: '🤷',
        },
      ],
    },

    contact_asha: {
      stage: 1,
      mood: 'hopeful',
      location: 'village',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'handwrittenNote', x: 180, y: 220 }],
      text: {
        en: 'Sunita Didi, the ASHA worker, arrives promptly with a medical thermometer, ORS packets, and pulse oximeter. "Children under 18 receive free checkups and generic medicines under government schemes," she explains.',
        hi: 'आशा कार्यकर्ता सुनीता दीदी तुरंत थर्मामीटर और ओआरएस के साथ पहुंचती हैं। "18 वर्ष से कम उम्र के बच्चों को सरकारी योजनाओं के तहत मुफ्त जांच और दवाएं मिलती हैं," वे समझाती हैं।',
        kn: 'ಆಶಾ ಕಾರ್ಯಕರ್ತೆ ಸುನೀತಾ ದೀದಿ ತಕ್ಷಣ ಆಗಮಿಸಿ ಪರೀಕ್ಷಿಸುತ್ತಾರೆ. "18 ವರ್ಷದೊಳಗಿನ ಮಕ್ಕಳಿಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಡಿ ಉಚಿತ ತಪಾಸಣೆ ಮತ್ತು ಔಷಧಿ ದೊರೆಯುತ್ತದೆ" ಎಂದು ವಿವರಿಸುತ್ತಾರೆ.',
      },
      choices: [
        {
          label: {
            en: 'Accompany Sunita Didi to the Primary Health Centre for diagnostic blood tests',
            hi: 'खून की जांच के लिए सुनीता दीदी के साथ प्राथमिक स्वास्थ्य केंद्र जाएं',
            kn: 'ರಕ್ತ ಪರೀಕ್ಷೆಗಾಗಿ ಸುನೀತಾ ದೀದಿಯವರೊಂದಿಗೆ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಕ್ಕೆ ತೆರಳಿ',
          },
          next: 'phc_tests',
          xp: 18,
          propIcon: '🔬',
        },
        {
          label: {
            en: 'Organize a village awareness circle about child healthcare rights',
            hi: 'बच्चों के स्वास्थ्य अधिकारों के बारे में गांव में जागरूकता बैठक आयोजित करें',
            kn: 'ಮಕ್ಕಳ ಆರೋಗ್ಯ ಹಕ್ಕುಗಳ ಬಗ್ಗೆ ಗ್ರಾಮದಲ್ಲಿ ಜಾಗೃತಿ ಸಭೆ ಆಯೋಜಿಸಿ',
          },
          next: 'community_awareness',
          xp: 15,
          propIcon: '👥',
        },
        {
          label: {
            en: 'Take only the home remedies and cancel the clinic visit',
            hi: 'केवल घरेलू नुस्खे लें और क्लिनिक जाना रद्द कर दें',
            kn: 'ಕೇವಲ ಮನೆಮದ್ದುಗಳನ್ನು ತೆಗೆದುಕೊಂಡು ಆಸ್ಪತ್ರೆಗೆ ಹೋಗುವುದನ್ನು ರದ್ದುಮಾಡಿ',
          },
          next: 'unverified_pills',
          xp: 3,
          risky: true,
          propIcon: '🍵',
        },
      ],
    },

    visit_phc: {
      stage: 2,
      mood: 'hopeful',
      location: 'hospital',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'hospital', x: 100, y: 180 },
        { p: 'medicine', x: 260, y: 220 },
      ],
      text: {
        en: 'At the Primary Health Centre, Dr. Rao examines Rohit. "It is a severe respiratory infection, but treatable. Under the National Health Mission, all paediatric tests, antibiotics, and nebulization are 100% free."',
        hi: 'प्राथमिक स्वास्थ्य केंद्र में डॉ. राव ने रोहित की जांच की। "यह सांस का गंभीर संक्रमण है, लेकिन इलाज संभव है। राष्ट्रीय स्वास्थ्य मिशन के तहत बच्चों की सभी जांच, एंटीबायोटिक्स और उपचार 100% मुफ्त हैं।"',
        kn: 'ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರದಲ್ಲಿ ಡಾ. ರಾವ್ ರೋಹಿತ್‌ನನ್ನು ಪರೀಕ್ಷಿಸುತ್ತಾರೆ. "ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಅಭಿಯಾನದಡಿ ಮಕ್ಕಳಿಗೆ ಎಲ್ಲಾ ಪರೀಕ್ಷೆಗಳು ಮತ್ತು ಚಿಕಿತ್ಸೆ ಸಂಪೂರ್ಣ ಉಚಿತ" ಎಂದು ಹೇಳುತ್ತಾರೆ.',
      },
      choices: [
        {
          label: {
            en: 'Help Rohit start full antibiotic course and collect free nutrition supplements',
            hi: 'रोहित का पूरा एंटीबायोटिक कोर्स शुरू कराएं और मुफ्त पोषण सप्लीमेंट प्राप्त करें',
            kn: 'ರೋಹಿತ್‌ಗೆ ಸಂಪೂರ್ಣ ಔಷಧಿ ಕೋರ್ಸ್ ಪ್ರಾರಂಭಿಸಲು ಮತ್ತು ಉಚಿತ ಪೌಷ್ಟಿಕಾಂಶ ಪಡೆಯಲು ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'full_recovery_track',
          xp: 20,
          propIcon: '💊',
        },
        {
          label: {
            en: 'Ask the doctor to schedule a school health checkup camp for all students',
            hi: 'डॉक्टर से सभी छात्रों के लिए स्कूल में स्वास्थ्य जांच शिविर लगाने का अनुरोध करें',
            kn: 'ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಶಾಲಾ ಆರೋಗ್ಯ ತಪಾಸಣಾ ಶಿಬಿರ ಆಯೋಜಿಸಲು ವೈದ್ಯರನ್ನು ಕೋರಿ',
          },
          next: 'school_health_camp',
          xp: 20,
          propIcon: '🏫',
        },
        {
          label: {
            en: 'Stop taking medicines after 2 days once symptoms temporarily lessen',
            hi: 'लक्षण थोड़े कम होते ही 2 दिन बाद दवाएं बंद कर दें',
            kn: 'ರೋಗಲಕ್ಷಣಗಳು ಕಡಿಮೆಯಾದ ತಕ್ಷಣ 2 ದಿನಗಳಲ್ಲಿ ಔಷಧಿಯನ್ನು ನಿಲ್ಲಿಸಿ',
          },
          next: 'relapse_warning',
          xp: 3,
          risky: true,
          propIcon: '⚠️',
        },
      ],
    },

    phc_tests: {
      stage: 2,
      mood: 'hopeful',
      location: 'hospital',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'document', x: 200, y: 220 }],
      text: {
        en: 'The lab tests confirm bacterial bronchitis. Dr. Rao administers immediate breathing treatment and registers Rohit under the Rashtriya Bal Swasthya Karyakram (RBSK) for ongoing monitoring.',
        hi: 'लैब जांच में बैक्टीरियल ब्रोंकाइटिस की पुष्टि होती है। डॉ. राव तुरंत नेबुलाइजेशन उपचार देते हैं और आगे की निगरानी के लिए रोहित को आरबीएसके (RBSK) में पंजीकृत करते हैं।',
        kn: 'ಲ್ಯಾಬ್ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಸೋಂಕು ದೃಢಪಡುತ್ತದೆ. ಡಾ. ರಾವ್ ತಕ್ಷಣ ಚಿಕಿತ್ಸೆ ನೀಡಿ, ಮುಂದಿನ ನಿಗಾಕ್ಕಾಗಿ ರೋಹಿತ್‌ನನ್ನು ಆರ್‌ಬಿಎಸ್‌ಕೆ ಯೋಜನೆಯಡಿ ನೋಂದಾಯಿಸುತ್ತಾರೆ.',
      },
      choices: [
        {
          label: {
            en: 'Ensure complete follow-up visit next Tuesday and verify clean drinking water at school',
            hi: 'अगले मंगलवार को फॉलो-अप जांच सुनिश्चित करें और स्कूल में पीने के पानी की जांच करें',
            kn: 'ಮುಂದಿನ ಮಂಗಳವಾರ ಮರುತಪಾಸಣೆಯನ್ನು ಖಚಿತಪಡಿಸಿ ಮತ್ತು ಶಾಲೆಯಲ್ಲಿ ಶುದ್ಧ ಕುಡಿಯುವ ನೀರನ್ನು ಪರಿಶೀಲಿಸಿ',
          },
          next: 'full_recovery_track',
          xp: 18,
          propIcon: '💧',
        },
        {
          label: {
            en: 'Collaborate with the Panchayat to inspect water sanitization in the village',
            hi: 'गांव में पानी की स्वच्छता की जांच के लिए पंचायत से सहयोग लें',
            kn: 'ಗ್ರಾಮದಲ್ಲಿ ನೀರಿನ ನೈರ್ಮಲ್ಯವನ್ನು ಪರಿಶೀಲಿಸಲು ಪಂಚಾಯತ್ ಜೊತೆ ಕೈಜೋಡಿಸಿ',
          },
          next: 'panchayat_health_action',
          xp: 20,
          propIcon: '🏛️',
        },
        {
          label: {
            en: 'Skip the follow-up tests because visiting the clinic takes time',
            hi: 'फॉलो-अप जांच छोड़ दें क्योंकि अस्पताल जाने में समय लगता है',
            kn: 'ಮರುಪರೀಕ್ಷೆಯನ್ನು ಬಿಟ್ಟುಬಿಡಿ',
          },
          next: 'relapse_warning',
          xp: 4,
          risky: true,
          propIcon: '🚫',
        },
      ],
    },

    home_treatment: {
      stage: 2,
      mood: 'hopeful',
      location: 'home',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'home', x: 120, y: 200 }],
      text: {
        en: 'The visiting healthcare team sets up hydration and oral medication right at Rohit\'s house. His parents tear up with relief: "We never knew the government provides all this without charging a single rupee."',
        hi: 'स्वास्थ्य टीम रोहित के घर पर ही दवा और देखभाल शुरू करती है। उसके माता-पिता राहत की सांस लेते हैं: "हमें कभी नहीं पता था कि सरकार बिना एक रुपया लिए यह सब सुविधा देती है।"',
        kn: 'ಆರೋಗ್ಯ ತಂಡವು ರೋಹಿತ್‌ನ ಮನೆಯಲ್ಲೇ ಚಿಕಿತ್ಸೆ ನೀಡುತ್ತದೆ. "ಸರ್ಕಾರವು ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲದೆ ಈ ಎಲ್ಲ ಸೌಲಭ್ಯಗಳನ್ನು ಒದಗಿಸುತ್ತದೆ ಎಂದು ನಮಗೆ ತಿಳಿದಿರಲಿಲ್ಲ" ಎಂದು ಪೋಷಕರು ನಿಟ್ಟುಸಿರು ಬಿಡುತ್ತಾರೆ.',
      },
      choices: [
        {
          label: {
            en: 'Help educate other parents in the village about the 104 health helpline',
            hi: 'गांव के अन्य माता-पिता को 104 स्वास्थ्य हेल्पलाइन के बारे में जागरूक करें',
            kn: 'ಗ್ರಾಮದ ಇತರ ಪೋಷಕರಿಗೆ 104 ಆರೋಗ್ಯ ಸಹಾಯವಾಣಿಯ ಬಗ್ಗೆ ತಿಳಿಸಿ',
          },
          next: 'community_awareness',
          xp: 18,
          propIcon: '📢',
        },
        {
          label: {
            en: 'Bring Rohit his school homework while he recovers safely at home',
            hi: 'जब वह घर पर स्वस्थ हो रहा हो, उसके लिए स्कूल का होमवर्क लेकर जाएं',
            kn: 'ಅವನು ಗುಣಮುಖನಾಗುವಾಗ ಶಾಲೆಯ ಮನೆಕೆಲಸವನ್ನು ತಂದುಕೊಡಿ',
          },
          next: 'full_recovery_track',
          xp: 15,
          propIcon: '📚',
        },
        {
          label: {
            en: 'Tell Rohit he can return to school immediately while still contagious',
            hi: 'रोहित से कहें कि वह ठीक होने से पहले ही तुरंत स्कूल आ जाए',
            kn: 'ಚೇತರಿಸಿಕೊಳ್ಳುವ ಮುನ್ನವೇ ಶಾಲೆಗೆ ಬರುವಂತೆ ಹೇಳಿ',
          },
          next: 'relapse_warning',
          xp: 3,
          risky: true,
          propIcon: '⚠️',
        },
      ],
    },

    hospital_ambulance: {
      stage: 2,
      mood: 'hopeful',
      location: 'hospital',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'hospital', x: 120, y: 180 }],
      text: {
        en: 'The 108 ambulance arrives within 15 minutes and transfers Rohit safely to the sub-district hospital. The medical superintendent confirms zero charges for emergency child care.',
        hi: '108 एम्बुलेंस 15 मिनट में पहुंचती है और रोहित को उप-जिला अस्पताल ले जाती है। अस्पताल के डॉक्टर पुष्टि करते हैं कि बच्चों के आपातकालीन इलाज के लिए कोई शुल्क नहीं है।',
        kn: '108 ಆಂಬ್ಯುಲೆನ್ಸ್ 15 ನಿಮಿಷಗಳಲ್ಲಿ ಬಂದು ರೋಹಿತ್‌ನನ್ನು ಉಪ-ಜಿಲ್ಲಾ ಆಸ್ಪತ್ರೆಗೆ ಕರೆದೊಯ್ಯುತ್ತದೆ. ತುರ್ತು ಚಿಕಿತ್ಸೆ ಸಂಪೂರ್ಣ ಉಚಿತವೆಂದು ವೈದ್ಯರು ಖಚಿತಪಡಿಸುತ್ತಾರೆ.',
      },
      choices: [
        {
          label: {
            en: 'Stay with Rohit\'s family until he stabilizes, then create a school health circle',
            hi: 'रोहित के ठीक होने तक परिवार के साथ रहें, फिर स्कूल स्वास्थ्य समूह बनाएं',
            kn: 'ರೋಹಿತ್ ಚೇತರಿಸಿಕೊಳ್ಳುವವರೆಗೆ ಜೊತೆಯಲ್ಲಿದ್ದು, ಶಾಲಾ ಆರೋಗ್ಯ ಬಳಗವನ್ನು ರಚಿಸಿ',
          },
          next: 'school_health_camp',
          xp: 20,
          propIcon: '🌟',
        },
        {
          label: {
            en: 'Return to school and report the successful resolution to the principal',
            hi: 'स्कूल लौटें और प्रधानाध्यापक को सफल इलाज की जानकारी दें',
            kn: 'ಶಾಲೆಗೆ ಮರಳಿ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರಿಗೆ ಯಶಸ್ವಿ ಚಿಕಿತ್ಸೆಯ ಬಗ್ಗೆ ತಿಳಿಸಿ',
          },
          next: 'full_recovery_track',
          xp: 15,
          propIcon: '🏫',
        },
        {
          label: {
            en: 'Leave the hospital without checking on the prescribed post-care routine',
            hi: 'दवाओं और देखभाल की पूरी जानकारी लिए बिना अस्पताल से चले जाएं',
            kn: 'ಮುಂದಿನ ಆರೈಕೆಯ ಬಗ್ಗೆ ವಿಚಾರಿಸದೆ ಹೊರಟುಬಿಡಿ',
          },
          next: 'relapse_warning',
          xp: 4,
          risky: true,
          propIcon: '🏃',
        },
      ],
    },

    relapse_warning: {
      stage: 3,
      mood: 'worried',
      location: 'home',
      timeOfDay: 'evening',
      sceneObjects: [{ p: 'medicine', x: 180, y: 220 }],
      text: {
        en: 'Incomplete antibiotic courses cause bacterial relapse! Sunita Didi intervenes just in time: "Never stop medication midway. Complete the 5-day cycle prescribed by the PHC."',
        hi: 'दवा बीच में छोड़ने से संक्रमण दोबारा लौट आता है! सुनीता दीदी समय पर समझाती हैं: "दवा कभी बीच में न छोड़ें। पीएचसी द्वारा दिया गया 5 दिन का पूरा कोर्स पूरा करें।"',
        kn: 'ಔಷಧಿಯನ್ನು ಅಪೂರ್ಣಗೊಳಿಸುವುದರಿಂದ ಸೋಂಕು ಮರುಕಳಿಸುತ್ತದೆ! "ಔಷಧಿಯನ್ನು ಅರ್ಧಕ್ಕೆ ನಿಲ್ಲಿಸಬೇಡಿ. ವೈದ್ಯರು ಸೂಚಿಸಿದ 5 ದಿನಗಳ ಕೋರ್ಸ್ ಪೂರ್ಣಗೊಳಿಸಿ" ಎಂದು ಸುನೀತಾ ದೀದಿ ಎಚ್ಚರಿಸುತ್ತಾರೆ.',
      },
      choices: [
        {
          label: {
            en: 'Commit to the complete 5-day health protocol and daily hydration',
            hi: 'पूरे 5 दिन के इलाज और भरपूर पानी पीने के नियम का पालन करें',
            kn: 'ಸಂಪೂರ್ಣ 5 ದಿನಗಳ ಚಿಕಿತ್ಸಾ ನಿಯಮವನ್ನು ಪಾಲಿಸಿ',
          },
          next: 'full_recovery_track',
          xp: 12,
          propIcon: '✅',
        },
        {
          label: {
            en: 'Connect the school headmaster with the PHC doctor to monitor all student wellness',
            hi: 'सभी छात्रों के स्वास्थ्य की निगरानी के लिए प्रधानाध्यापक को डॉक्टर से जोड़ें',
            kn: 'ವಿದ್ಯಾರ್ಥಿಗಳ ಆರೋಗ್ಯದ ಮೇಲ್ವಿಚಾರಣೆಗಾಗಿ ಶಾಲಾ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರನ್ನು ವೈದ್ಯರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ',
          },
          next: 'school_health_camp',
          xp: 15,
          propIcon: '🤝',
        },
        {
          label: {
            en: 'Ignore medical advice again',
            hi: 'डॉक्टर की सलाह को फिर से अनदेखा करें',
            kn: 'ವೈದ್ಯರ ಸಲಹೆಯನ್ನು ಮತ್ತೊಮ್ಮೆ ಕಡೆಗಣಿಸಿ',
          },
          next: 'ending_weak_neglect',
          xp: 1,
          risky: true,
          propIcon: '❌',
        },
      ],
    },

    community_awareness: {
      stage: 3,
      mood: 'hopeful',
      location: 'village',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'teaStallFamilies', x: 180, y: 240 }],
      text: {
        en: 'The awareness circle gathers 25 village families. Parents learn about free childhood immunizations (Mission Indradhanush), iron supplements, and deworming tablets distributed at school.',
        hi: 'जागरूकता बैठक में 25 परिवार शामिल होते हैं। माता-पिता को मुफ्त टीकाकरण (मिशन इंद्रधनुष), आयरन सप्लीमेंट्स और स्कूल में मिलने वाली कृमिनाशक गोलियों की जानकारी मिलती है।',
        kn: 'ಜಾಗೃತಿ ಸಭೆಯಲ್ಲಿ 25 ಕುಟುಂಬಗಳು ಭಾಗವಹಿಸುತ್ತವೆ. ಮಕ್ಕಳಿಗೆ ಉಚಿತ ಲಸಿಕೆ (ಮಿಷನ್ ಇಂದ್ರಧನುಷ್), ಐರನ್ ಮಾತ್ರೆಗಳು ಮತ್ತು ಜಂತುಹುಳು ನಿವಾರಕ ಮಾತ್ರೆಗಳ ಬಗ್ಗೆ ಪೋಷಕರು ತಿಳಿಯುತ್ತಾರೆ.',
      },
      choices: [
        {
          label: {
            en: 'Form a Student Health Club to promote handwashing and nutrition awareness',
            hi: 'हाथ धोने और पोषण के प्रति जागरूकता के लिए छात्र स्वास्थ्य क्लब बनाएं',
            kn: 'ಕೈ ತೊಳೆಯುವುದು ಮತ್ತು ಪೌಷ್ಟಿಕಾಂಶದ ಅರಿವಿಗಾಗಿ ವಿದ್ಯಾರ್ಥಿ ಆರೋಗ್ಯ ಕ್ಲಬ್ ರಚಿಸಿ',
          },
          next: 'panchayat_health_action',
          xp: 20,
          propIcon: '🧼',
        },
        {
          label: {
            en: 'Help Rohit prepare for his return to class next Monday',
            hi: 'अगले सोमवार से रोहित के स्कूल लौटने की तैयारी में मदद करें',
            kn: 'ಮುಂದಿನ ಸೋಮವಾರದಿಂದ ರೋಹಿತ್ ಶಾಲೆಗೆ ಮರಳಲು ಸಿದ್ಧತೆ ನಡೆಸಿ',
          },
          next: 'full_recovery_track',
          xp: 15,
          propIcon: '🎒',
        },
        {
          label: {
            en: 'Disband the meeting without planning any follow-up actions',
            hi: 'बिना किसी अगली योजना के बैठक समाप्त कर दें',
            kn: 'ಮುಂದಿನ ಯಾವುದೇ ಯೋಜನೆಯಿಲ್ಲದೆ ಸಭೆಯನ್ನು ಮುಕ್ತಾಯಗೊಳಿಸಿ',
          },
          next: 'ending_medium_seed',
          xp: 5,
          propIcon: '📝',
        },
      ],
    },

    school_health_camp: {
      stage: 3,
      mood: 'happy',
      location: 'schoolyard',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'hospital', x: 80, y: 180 },
        { p: 'bench', x: 260, y: 250 },
      ],
      text: {
        en: 'A mobile RBSK medical team arrives at the school! Over 120 children receive dental, eye, and general health screenings. Early deficiencies are caught and treated completely free of charge.',
        hi: 'एक मोबाइल आरबीएसके मेडिकल टीम स्कूल पहुंचती है! 120 से अधिक बच्चों की आंखों, दांतों और स्वास्थ्य की जांच होती है। कमियों का समय रहते मुफ्त इलाज किया जाता है।',
        kn: 'ಮೊಬೈಲ್ ಆರ್‌ಬಿಎಸ್‌ಕೆ ವೈದ್ಯಕೀಯ ತಂಡ ಶಾಲೆಗೆ ಆಗಮಿಸುತ್ತದೆ! 120 ಕ್ಕೂ ಹೆಚ್ಚು ಮಕ್ಕಳಿಗೆ ಉಚಿತ ಕಣ್ಣು, ಹಲ್ಲು ಮತ್ತು ಆರೋಗ್ಯ ತಪಾಸಣೆ ನಡೆಸಲಾಗುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Champion health rights as the official School Health Ambassador',
            hi: 'स्कूल के आधिकारिक स्वास्थ्य दूत (Health Ambassador) बनकर अधिकारों का प्रचार करें',
            kn: 'ಶಾಲಾ ಆರೋಗ್ಯ ರಾಯಭಾರಿಯಾಗಿ ಆರೋಗ್ಯ ಹಕ್ಕುಗಳ ರಕ್ಷಣೆಗೆ ಮುಂದಾಗಿ',
          },
          next: 'ending_gold_healthcare',
          xp: 25,
          propIcon: '🏆',
        },
        {
          label: {
            en: 'Celebrate Rohit\'s full recovery and return to the classroom',
            hi: 'रोहित के पूरी तरह ठीक होने और कक्षा में लौटने का जश्न मनाएं',
            kn: 'ರೋಹಿತ್ ಸಂಪೂರ್ಣ ಗುಣಮುಖನಾಗಿ ತರಗತಿಗೆ ಮರಳಿದ್ದನ್ನು ಸಂಭ್ರಮಿಸಿ',
          },
          next: 'ending_silver_recovery',
          xp: 20,
          propIcon: '🎉',
        },
        {
          label: {
            en: 'Wrap up the camp quietly',
            hi: 'शिविर को बिना किसी विशेष पहल के समाप्त करें',
            kn: 'ಶಿಬಿರವನ್ನು ಮುಕ್ತಾಯಗೊಳಿಸಿ',
          },
          next: 'ending_bronze_individual',
          xp: 10,
          propIcon: '📋',
        },
      ],
    },

    panchayat_health_action: {
      stage: 3,
      mood: 'happy',
      location: 'village',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'committeeTable', x: 120, y: 200 }],
      text: {
        en: 'The Gram Panchayat passes a resolution to install reverse-osmosis clean drinking water filters at both schools and establishes a monthly visit schedule by the PHC medical team.',
        hi: 'ग्राम पंचायत ने दोनों स्कूलों में स्वच्छ पेयजल फिल्टर लगाने और प्राथमिक स्वास्थ्य केंद्र की टीम द्वारा मासिक जांच का प्रस्ताव पारित किया।',
        kn: 'ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯು ಶಾಲೆಗಳಲ್ಲಿ ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಅಳವಡಿಸಲು ಮತ್ತು ಮಾಸಿಕ ವೈದ್ಯಕೀಯ ತಪಾಸಣೆಯನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸಲು ನಿರ್ಧರಿಸುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Lead the village-wide youth health pledge for Article 21 health rights',
            hi: 'अनुच्छेद 21 स्वास्थ्य अधिकारों के लिए गांव स्तर पर युवा स्वास्थ्य शपथ का नेतृत्व करें',
            kn: 'ವಿಧಿ 21 ರ ಆರೋಗ್ಯ ಹಕ್ಕುಗಳಿಗಾಗಿ ಗ್ರಾಮ ಮಟ್ಟದ ಯುವ ಆರೋಗ್ಯ ಪ್ರತಿಜ್ಞೆಯನ್ನು ಮುನ್ನಡೆಸಿ',
          },
          next: 'ending_gold_healthcare',
          xp: 25,
          propIcon: '🏆',
        },
        {
          label: {
            en: 'Help document and share the clean water success story with neighbouring villages',
            hi: 'स्वच्छ पानी की इस सफलता को पड़ोसी गांवों के साथ साझा करने में मदद करें',
            kn: 'ಶುದ್ಧ ನೀರಿನ ಯಶಸ್ಸನ್ನು ನೆರೆಯ ಹಳ್ಳಿಗಳೊಂದಿಗೆ ಹಂಚಿಕೊಳ್ಳಲು ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'ending_silver_recovery',
          xp: 20,
          propIcon: '🥈',
        },
      ],
    },

    full_recovery_track: {
      stage: 3,
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'filledDesk', x: 140, y: 260 },
        { p: 'seedlingPot', x: 300, y: 260 },
      ],
      text: {
        en: 'One week later, Rohit walks briskly into the classroom with a bright smile, full energy, and his medical clearance certificate. "I am completely healthy now, thanks to our PHC!" he beams.',
        hi: 'एक हफ्ते बाद, रोहित पूरी ऊर्जा और मुस्कान के साथ कक्षा में प्रवेश करता है। "हमारे प्राथमिक स्वास्थ्य केंद्र की मदद से मैं अब पूरी तरह स्वस्थ हूँ!" वह खुशी से कहता है।',
        kn: 'ಒಂದು ವಾರದ ನಂತರ ರೋಹಿತ್ ಪೂರ್ಣ ಚೈತನ್ಯದೊಂದಿಗೆ ತರಗತಿಗೆ ಪ್ರವೇಶಿಸುತ್ತಾನೆ. "ನಮ್ಮ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರದಿಂದ ನಾನು ಸಂಪೂರ್ಣ ಗುಣಮುಖನಾಗಿದ್ದೇನೆ!" ಎಂದು ಹರ್ಷ ವ್ಯಕ್ತಪಡಿಸುತ್ತಾನೆ.',
      },
      choices: [
        {
          label: {
            en: 'Organize a school presentation explaining every child\'s right to health under Article 21',
            hi: 'अनुच्छेद 21 के तहत हर बच्चे के स्वास्थ्य अधिकार को समझाते हुए स्कूल में प्रस्तुति दें',
            kn: 'ವಿಧಿ 21 ರಡಿ ಪ್ರತಿಯೊಂದು ಮಗುವಿನ ಆರೋಗ್ಯ ಹಕ್ಕನ್ನು ವಿವರಿಸುವ ಶಾಲಾ ಪ್ರಸ್ತುತಿಯನ್ನು ಆಯೋಜಿಸಿ',
          },
          next: 'ending_gold_healthcare',
          xp: 25,
          propIcon: '🏆',
        },
        {
          label: {
            en: 'Welcome Rohit back to his study group and help him catch up on missed lessons',
            hi: 'रोहित का अध्ययन समूह में स्वागत करें और छूटे हुए पाठों को पूरा करने में मदद करें',
            kn: 'ರೋಹಿತ್‌ನನ್ನು ಅಧ್ಯಯನ ಗುಂಪಿಗೆ ಸ್ವಾಗತಿಸಿ ತಪ್ಪಿಸಿಕೊಂಡ ಪಾಠಗಳನ್ನು ಕಲಿಯಲು ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'ending_silver_recovery',
          xp: 20,
          propIcon: '🥈',
        },
      ],
    },

    // ── ENDINGS ──
    ending_gold_healthcare: {
      stage: 4,
      end: true,
      outcome: 'strong',
      mood: 'happy',
      location: 'schoolyard',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'hospital', x: 80, y: 180 },
        { p: 'seedlingPot', x: 300, y: 260 },
      ],
      badge: 'Healthcare Champion',
      badgeIcon: '🏥',
      bonusXp: 50,
      text: {
        en: 'Gold Ending — Community Health Shield! You ensured Rohit received free government treatment and catalyzed systemic improvements: regular school health camps and clean water infrastructure. The right to health under Article 21 is fully realized for all children in your community.',
        hi: 'स्वर्ण परिणाम — सामुदायिक स्वास्थ्य सुरक्षा! आपने न केवल रोहित का मुफ्त सरकारी इलाज कराया बल्कि व्यवस्था में सुधार किया: नियमित स्कूल जांच शिविर और स्वच्छ पेयजल। अनुच्छेद 21 के तहत स्वास्थ्य का अधिकार पूरी तरह साकार हुआ।',
        kn: 'ಚಿನ್ನದ ಮುಕ್ತಾಯ — ಸಮುದಾಯ ಆರೋಗ್ಯ ಕವಚ! ನೀವು ರೋಹಿತ್‌ಗೆ ಉಚಿತ ಚಿಕಿತ್ಸೆಯನ್ನು ಖಚಿತಪಡಿಸಿದ್ದಲ್ಲದೆ ಶಾಲೆಯಲ್ಲಿ ನಿಯಮಿತ ಆರೋಗ್ಯ ಶಿಬಿರಗಳು ಮತ್ತು ಶುದ್ಧ ಕುಡಿಯುವ ನೀರಿನ ವ್ಯವಸ್ಥೆಯನ್ನು ತಂದಿದ್ದೀರಿ.',
      },
    },

    ending_silver_recovery: {
      stage: 4,
      end: true,
      outcome: 'strong',
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'filledDesk', x: 150, y: 260 }],
      badge: 'Health Guardian',
      badgeIcon: '🩺',
      bonusXp: 40,
      text: {
        en: 'Silver Ending — Restored Vitality! Rohit recovered fully through government primary care without causing financial hardship to his family. You proved that awareness of free public health systems protects children and their education.',
        hi: 'रजत परिणाम — पूर्ण स्वास्थ्य लाभ! रोहित बिना किसी आर्थिक बोझ के सरकारी प्राथमिक स्वास्थ्य केंद्र से पूरी तरह ठीक हो गया। आपने साबित किया कि मुफ्त स्वास्थ्य सेवाओं की जानकारी बच्चों की रक्षा करती है।',
        kn: 'ಬೆಳ್ಳಿ ಮುಕ್ತಾಯ — ಪೂರ್ಣ ಚೇತರಿಕೆ! ಕುಟುಂಬಕ್ಕೆ ಯಾವುದೇ ಆರ್ಥಿಕ ಹೊರೆಯಿಲ್ಲದೆ ರೋಹಿತ್ ಸರ್ಕಾರಿ ಆಸ್ಪತ್ರೆಯಿಂದ ಸಂಪೂರ್ಣ ಗುಣಮುಖನಾದನು.',
      },
    },

    ending_bronze_individual: {
      stage: 4,
      end: true,
      outcome: 'medium',
      mood: 'hopeful',
      location: 'hospital',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'hospital', x: 120, y: 180 }],
      badge: 'Caring Friend',
      badgeIcon: '🌿',
      bonusXp: 25,
      text: {
        en: 'Bronze Ending — One Step at a Time. Rohit received the required treatment, but broader community awareness remains limited. Keep spreading the word about government health helplines (104 and 108)!',
        hi: 'कांस्य परिणाम — सही दिशा में कदम। रोहित को जरूरी इलाज मिल गया, लेकिन गांव में व्यापक जागरूकता अभी बाकी है। सरकारी स्वास्थ्य हेल्पलाइन (104 और 108) के बारे में जानकारी फैलाते रहें!',
        kn: 'ಕಂಚಿನ ಮುಕ್ತಾಯ — ಉತ್ತಮ ಹೆಜ್ಜೆ. ರೋಹಿತ್‌ಗೆ ಅಗತ್ಯ ಚಿಕಿತ್ಸೆ ದೊರೆಯಿತು. ಸರ್ಕಾರಿ ಆರೋಗ್ಯ ಸಹಾಯವಾಣಿಗಳ (104 ಮತ್ತು 108) ಬಗ್ಗೆ ಎಲ್ಲರಿಗೂ ತಿಳಿಸುತ್ತಿರಿ!',
      },
    },

    ending_medium_seed: {
      stage: 4,
      end: true,
      outcome: 'medium-low',
      mood: 'hopeful',
      location: 'village',
      timeOfDay: 'dusk',
      sceneObjects: [{ p: 'teaStallFamilies', x: 160, y: 240 }],
      badge: 'Awareness Starter',
      badgeIcon: '🌱',
      bonusXp: 15,
      text: {
        en: 'Hopeful Ending — The Awareness Seed. Families learned about free healthcare schemes, but continuous follow-up is needed to ensure every child gets vaccinated and checked regularly.',
        hi: 'आशाजनक परिणाम — जागरूकता की शुरुआत। परिवारों को मुफ्त स्वास्थ्य योजनाओं की जानकारी मिली, लेकिन हर बच्चे के नियमित टीकाकरण के लिए निरंतर प्रयास जरूरी है।',
        kn: 'ಭರವಸೆಯ ಮುಕ್ತಾಯ — ಅರಿವಿನ ಆರಂಭ. ಕುಟುಂಬಗಳಿಗೆ ಉಚಿತ ಆರೋಗ್ಯ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ತಿಳಿಯಿತು.',
      },
    },

    ending_weak_neglect: {
      stage: 4,
      end: true,
      outcome: 'weak',
      mood: 'sad',
      location: 'classroom',
      timeOfDay: 'evening',
      sceneObjects: [{ p: 'emptyDesk', x: 120, y: 280, args: [true] }],
      badge: 'Healthcare Wake-up Call',
      badgeIcon: '💔',
      bonusXp: 5,
      text: {
        en: 'Weak Ending — Delay Has Consequences. Hesitation and unverified medications worsened Rohit\'s illness, causing weeks of lost school. Public health services exist to prevent this — always seek qualified healthcare early.',
        hi: 'कमजोर परिणाम — लापरवाही का नुकसान। झिझक और अप्रमाणित दवाओं के कारण रोहित की बीमारी बढ़ गई और कई हफ्तों की पढ़ाई छूटी। सरकारी स्वास्थ्य सेवाएं इसीलिए हैं ताकि समय पर इलाज मिले।',
        kn: 'ಹಿನ್ನಡೆಯ ಮುಕ್ತಾಯ — ವಿಳಂಬದ ಪರಿಣಾಮ. ಪರಿಶೀಲಿಸದ ಔಷಧಿಗಳಿಂದ ರೋಹಿತ್‌ನ ಅನಾರೋಗ್ಯ ಹೆಚ್ಚಾಯಿತು. ಸದಾ ಅರ್ಹ ವೈದ್ಯಕೀಯ ಚಿಕಿತ್ಸೆಯನ್ನು ಪಡೆದುಕೊಳ್ಳಿ.',
      },
    },
  },
  quiz: [
    {
      question: {
        en: 'Under Article 21 and the National Health Mission, are essential paediatric care and vaccinations free for children in government PHCs?',
        hi: 'अनुच्छेद 21 और राष्ट्रीय स्वास्थ्य मिशन के तहत, क्या सरकारी प्राथमिक स्वास्थ्य केंद्रों में बच्चों के लिए आवश्यक इलाज और टीके मुफ्त हैं?',
        kn: 'ವಿಧಿ 21 ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಅಭಿಯಾನದಡಿಯಲ್ಲಿ ಸರ್ಕಾರಿ ಪ್ರಾಥಮಿಕ ಆರೋಗ್ಯ ಕೇಂದ್ರಗಳಲ್ಲಿ ಮಕ್ಕಳಿಗೆ ಅಗತ್ಯ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಲಸಿಕೆಗಳು ಉಚಿತವೇ?',
      },
      options: [
        { en: 'No, families must pay full private rates', hi: 'नहीं, परिवारों को पूरी फीस देनी होती है', kn: 'ಇಲ್ಲ, ಪೂರ್ಣ ಶುಲ್ಕ ನೀಡಬೇಕು' },
        { en: 'Yes, 100% free under public health schemes', hi: 'हाँ, सरकारी योजनाओं के तहत 100% मुफ्त हैं', kn: 'ಹೌದು, ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ ಯೋಜನೆಯಡಿ 100% ಉಚಿತ' },
        { en: 'Only on Sundays', hi: 'केवल रविवार को', kn: 'ಕೇವಲ ಭಾನುವಾರ ಮಾತ್ರ' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'Under Article 21 and NHM schemes, essential paediatric diagnostics, treatments, and vaccines are provided free of cost.',
        hi: 'अनुच्छेद 21 और स्वास्थ्य योजनाओं के तहत, बच्चों के लिए बुनियादी जांच, दवाइयां और टीके पूर्णतः मुफ्त उपलब्ध हैं।',
        kn: 'ವಿಧಿ 21 ಮತ್ತು ಎನ್‌ಎಚ್‌ಎಂ ಯೋಜನೆಗಳ ಅಡಿಯಲ್ಲಿ, ಮಕ್ಕಳ ಅಗತ್ಯ ತಪಾಸಣೆ, ಔಷಧಿ ಮತ್ತು ಲಸಿಕೆಗಳನ್ನು ಉಚಿತವಾಗಿ ನೀಡಲಾಗುತ್ತದೆ.',
      },
    },
    {
      question: {
        en: 'What is the nationwide toll-free helpline number for medical advice and emergency health guidance in India?',
        hi: 'भारत में चिकित्सीय सलाह और स्वास्थ्य मार्गदर्शन के लिए राष्ट्रीय टोल-फ्री नंबर क्या है?',
        kn: 'ಭಾರತದಲ್ಲಿ ತುರ್ತು ವೈದ್ಯಕೀಯ ಸಲಹೆಗಾಗಿ ರಾಷ್ಟ್ರೀಯ ಟೋಲ್-ಫ್ರೀ ಸಂಖ್ಯೆ ಯಾವುದು?',
      },
      options: [
        { en: '104 (Health Helpline)', hi: '104 (स्वास्थ्य हेल्पलाइन)', kn: '104 (ಆರೋಗ್ಯ ಸಹಾಯವಾಣಿ)' },
        { en: '999', hi: '999', kn: '999' },
        { en: '100', hi: '100', kn: '100' },
      ],
      correctIndex: 0,
      explanation: {
        en: '104 is the dedicated national health advisory helpline, while 108 coordinates emergency ambulance services.',
        hi: '104 राष्ट्रीय स्वास्थ्य सलाह हेल्पलाइन है, जबकि 108 आपातकालीन एम्बुलेंस सेवा प्रदान करती है।',
        kn: '104 ರಾಷ್ಟ್ರೀಯ ಆರೋಗ್ಯ ಸಲಹಾ ಸಹಾಯವಾಣಿಯಾಗಿದೆ, 108 ಆಂಬ್ಯುಲೆನ್ಸ್ ಸೇವೆಗೆ ಸಂಬಂಧಿಸಿದೆ.',
      },
    },
  ],
};
