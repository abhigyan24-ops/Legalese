/**
 * protection-from-child-marriage.js
 * 
 * Protection from Child Marriage (PCMA 2006) — Right to Childhood & Legal Age of Marriage.
 * Age-appropriate, constructive legal empowerment story.
 * All endings include non-dismissible resourceLink pointing to /resources.
 */

export default {
  id: 'protection-from-child-marriage',
  title: {
    en: 'Protection from Child Marriage',
    hi: 'बाल विवाह से सुरक्षा',
    kn: 'ಬಾಲ್ಯ ವಿವಾಹದಿಂದ ರಕ್ಷಣೆ',
  },
  startNode: 'start',
  stages: [
    { icon: '🏠', label: 'The Discussion' },
    { icon: '📜', label: 'Knowing the Law' },
    { icon: '👥', label: 'Community Unity' },
    { icon: '🏛️', label: 'Legal Safeguards' },
    { icon: '🎓', label: 'Dreams Ahead' },
  ],
  characters: {
    pooja: { name: 'Pooja', role: '13-year-old Aspiring Scientist' },
    teacher: { name: 'Mrs. Anjali', role: 'School Principal' },
    officer: { name: 'Officer Joshi', role: 'Child Marriage Prohibition Officer (CMPO)' },
  },
  nodes: {
    start: {
      stage: 0,
      mood: 'worried',
      location: 'village',
      timeOfDay: 'dusk',
      sceneObjects: [
        { p: 'village', x: 80, y: 180 },
        { p: 'home', x: 280, y: 200 },
      ],
      text: {
        en: 'Your 13-year-old brilliant classmate Pooja, who dreams of becoming a doctor, confides in tears that her extended relatives are pressuring her parents to arrange her marriage next month during the village festival.',
        hi: 'आपकी 13 वर्षीय होनहार सहपाठी पूजा, जो डॉक्टर बनना चाहती है, रोते हुए बताती है कि रिश्तेदार उसके माता-पिता पर अगले महीने गांव के मेले में उसका विवाह कराने का दबाव बना रहे हैं।',
        kn: 'ವೈದ್ಯೆಯಾಗುವ ಕನಸು ಹೊತ್ತಿರುವ ನಿಮ್ಮ 13 ವರ್ಷದ ಪ್ರತಿಭಾವಂತ ಸಹಪಾಠಿ ಪೂಜಾ, ಮುಂದಿನ ತಿಂಗಳು ತನ್ನ ಮದುವೆ ಮಾಡಲು ಸಂಬಂಧಿಕರು ಪೋಷಕರ ಮೇಲೆ ಒತ್ತಡ ಹೇರುತ್ತಿದ್ದಾರೆ ಎಂದು ಅಳುತ್ತಾ ಹೇಳುತ್ತಾಳೆ.',
      },
      didYouKnow: {
        en: 'According to NFHS-5 (2019–21), underage marriage in India dropped to 23.3%, down from 47.4% in 2005, through strict enforcement of the PCMA Act and female education incentives. (Source: NFHS-5 / IIPS)',
        hi: 'एनएफएचएस-5 के अनुसार, भारत में बाल विवाह की दर 2005 के 47.4% से घटकर 23.3% हो गई है। (स्रोत: राष्ट्रीय परिवार स्वास्थ्य सर्वेक्षण-5)',
        kn: 'ಎನ್‌ಎಫ್‌ಎಚ್‌ಎಸ್-5 ಸಮೀಕ್ಷೆಯ ಪ್ರಕಾರ, ಕಾನೂನಿನ ಕಟ್ಟುನಿಟ್ಟಾದ ಜಾರಿಯಿಂದ ಭಾರತದಲ್ಲಿ ಬಾಲ್ಯ ವಿವಾಹದ ಪ್ರಮಾಣ ಗಣನೀಯವಾಗಿ ಕಡಿಮೆಯಾಗಿದೆ. (ಮೂಲ: ಎನ್‌ಎಫ್‌ಎಚ್‌ಎಸ್-5)',
      },
      choices: [
        {
          label: {
            en: 'Explain that the Prohibition of Child Marriage Act (PCMA 2006) strictly bans marriage below age 18',
            hi: 'समझाएं कि बाल विवाह निषेध अधिनियम (PCMA 2006) 18 वर्ष से कम उम्र में विवाह को गैरकानूनी घोषित करता है',
            kn: 'ಬಾಲ್ಯ ವಿವಾಹ ನಿಷೇಧ ಕಾಯ್ದೆಯಡಿ 18 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನಲ್ಲಿ ಮದುವೆ ಮಾಡುವುದು ಕಾನೂನುಬಾಹಿರ ಎಂದು ವಿವರಿಸಿ',
          },
          next: 'explain_law_to_pooja',
          xp: 15,
          propIcon: '📜',
        },
        {
          label: {
            en: 'Immediately inform your School Principal and local Child Marriage Prohibition Officer (CMPO)',
            hi: 'तुरंत स्कूल की प्रधानाध्यापिका और बाल विवाह निषेध अधिकारी (CMPO) को सूचित करें',
            kn: 'ತಕ್ಷಣವೇ ಶಾಲಾ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು ಮತ್ತು ಬಾಲ್ಯ ವಿವಾಹ ನಿಷೇಧ ಅಧಿಕಾರಿಗೆ (CMPO) ತಿಳಿಸಿ',
          },
          next: 'inform_school_cmpo',
          xp: 15,
          propIcon: '🏫',
        },
        {
          label: {
            en: 'Tell Pooja that village traditions cannot be challenged and she must accept her fate',
            hi: 'पूजा से कहें कि परंपराओं को चुनौती नहीं दी जा सकती और उसे इसे स्वीकार कर लेना चाहिए',
            kn: 'ಸಂಪ್ರದಾಯಗಳನ್ನು ಪ್ರಶ್ನಿಸಲಾಗುವುದಿಲ್ಲ, ಇದನ್ನು ಒಪ್ಪಿಕೊಳ್ಳಬೇಕೆಂದು ಪೂಜಾಗೆ ಹೇಳಿ',
          },
          next: 'fatalism_risk_arc',
          xp: 2,
          risky: true,
          propIcon: '😞',
        },
      ],
    },

    fatalism_risk_arc: {
      stage: 0,
      mood: 'sad',
      location: 'street',
      timeOfDay: 'evening',
      sceneObjects: [{ p: 'schoolGateClosed', x: 120, y: 80 }],
      text: {
        en: 'Tradition can never override fundamental human rights and constitutional law. Under Section 9 and 10 of PCMA, arranging child marriage carries up to 2 years rigorous imprisonment and ₹1 Lakh fine. Speaking up protects lives!',
        hi: 'परंपरा कभी भी मौलिक अधिकारों और संविधान से ऊपर नहीं हो सकती। बाल विवाह अधिनियम के तहत बाल विवाह कराने पर 2 साल की कठोर जेल और ₹1 लाख तक का जुर्माना है। आवाज उठाना जरूरी है!',
        kn: 'ಯಾವುದೇ ಸಂಪ್ರದಾಯವು ಮೂಲಭೂತ ಹಕ್ಕುಗಳಿಗಿಂತ ದೊಡ್ಡದಲ್ಲ. ಬಾಲ್ಯ ವಿವಾಹ ಮಾಡಿಸುವುದು 2 ವರ್ಷಗಳ ಕಠಿಣ ಜೈಲು ಶಿಕ್ಷೆ ಮತ್ತು ₹1 ಲಕ್ಷ ದಂಡ ವಿಧಿಸಬಹುದಾದ ಅಪರಾಧ.',
      },
      choices: [
        {
          label: {
            en: 'Stand up courageously and report the situation to the School Principal',
            hi: 'साहस के साथ खड़े हों और प्रधानाध्यापिका को पूरी स्थिति बताएं',
            kn: 'ಧೈರ್ಯವಾಗಿ ನಿಂತು ಮುಖ್ಯೋಪಾಧ್ಯಾಯರಿಗೆ ಸಂಪೂರ್ಣ ಪರಿಸ್ಥಿತಿಯನ್ನು ತಿಳಿಸಿ',
          },
          next: 'inform_school_cmpo',
          xp: 12,
          propIcon: '🏃',
        },
        {
          label: {
            en: 'Dial Childline 1098 together with Pooja from the village public booth',
            hi: 'पूजा के साथ मिलकर सार्वजनिक बूथ से चाइल्डलाइन 1098 पर कॉल करें',
            kn: 'ಪೂಜಾಳೊಂದಿಗೆ ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಗೆ ಕರೆ ಮಾಡಿ',
          },
          next: 'call_childline_cmpo',
          xp: 12,
          propIcon: '📞',
        },
        {
          label: {
            en: 'Give up hope and walk away',
            hi: 'उम्मीद छोड़ दें और चले जाएं',
            kn: 'ಭರವಸೆ ಕಳೆದುಕೊಂಡು ಹೊರಟುಬಿಡಿ',
          },
          next: 'ending_weak_marriage',
          xp: 1,
          risky: true,
          propIcon: '❌',
        },
      ],
    },

    explain_law_to_pooja: {
      stage: 1,
      mood: 'hopeful',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'blackboard', x: 80, y: 60 },
        { p: 'rtePamphlet', x: 240, y: 220 },
      ],
      text: {
        en: 'You show Pooja the legal guidebook: "Under the law, any marriage of a girl under 18 or boy under 21 is voidable and illegal. The government provides scholarships (KGBV and Beti Bachao Beti Padhao) to support girls\' education!"',
        hi: 'आप पूजा को कानूनी पुस्तिका दिखाते हैं: "कानून के अनुसार 18 वर्ष से कम उम्र की लड़की का विवाह अवैध है। सरकार लड़कियों की उच्च शिक्षा के लिए कस्तूरबा गांधी बालिका विद्यालय और छात्रवृत्तियां देती है!"',
        kn: 'ನೀವು ಪೂಜಾಗೆ ಕಾನೂನನ್ನು ವಿವರಿಸುತ್ತೀರಿ: "18 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನ ಹೆಣ್ಣುಮಕ್ಕಳ ವಿವಾಹ ಸಂಪೂರ್ಣ ಕಾನೂನುಬಾಹಿರ. ಹೆಣ್ಣುಮಕ್ಕಳ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಸರ್ಕಾರದ ಯೋಜನೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳಿವೆ!"',
      },
      choices: [
        {
          label: {
            en: 'Accompany Pooja to discuss her scientific dreams with her parents and the school principal',
            hi: 'पूजा के साथ उसके माता-पिता और प्रधानाध्यापिका से मिलने जाएं',
            kn: 'ಪೂಜಾಳ ಪೋಷಕರು ಮತ್ತು ಮುಖ್ಯೋಪಾಧ್ಯಾಯರೊಂದಿಗೆ ಮಾತನಾಡಲು ಜೊತೆಗೆ ತೆರಳಿ',
          },
          next: 'parents_counseling_session',
          xp: 18,
          propIcon: '🤝',
        },
        {
          label: {
            en: 'Mobilize the village Women\'s Self-Help Group (SHG) to support Pooja\'s family',
            hi: 'पूजा के परिवार का समर्थन करने के लिए महिला स्वयं सहायता समूह (SHG) को संगठित करें',
            kn: 'ಪೂಜಾಳ ಕುಟುಂಬಕ್ಕೆ ಬೆಂಬಲ ನೀಡಲು ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘವನ್ನು ಒಗ್ಗೂಡಿಸಿ',
          },
          next: 'community_solidarity',
          xp: 18,
          propIcon: '👥',
        },
        {
          label: {
            en: 'Try arguing angrily with her traditional relatives without adult backing',
            hi: 'बिना किसी बड़े के सहयोग के पारंपरिक रिश्तेदारों से गुस्से में बहस करें',
            kn: 'ಹಿರಿಯರ ಬೆಂಬಲವಿಲ್ಲದೆ ಸಂಬಂಧಿಕರೊಂದಿಗೆ ಕೋಪದಿಂದ ಜಗಳವಾಡಿ',
          },
          next: 'fatalism_risk_arc',
          xp: 3,
          risky: true,
          propIcon: '⚠️',
        },
      ],
    },

    inform_school_cmpo: {
      stage: 1,
      mood: 'hopeful',
      location: 'office',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'teacherDesk', x: 100, y: 220 },
        { p: 'document', x: 260, y: 220 },
      ],
      text: {
        en: 'Principal Mrs. Anjali immediately alerts the Child Marriage Prohibition Officer (CMPO) and the Gram Panchayat. "Pooja is the top science student in the district. We will protect her future by every legal means," she vows.',
        hi: 'प्रधानाध्यापिका श्रीमती अंजलि ने तुरंत बाल विवाह निषेध अधिकारी और ग्राम पंचायत को सूचित किया। "पूजा जिले की शीर्ष विज्ञान छात्रा है। हम उसके भविष्य की हर कानूनी तरीके से रक्षा करेंगे।"',
        kn: 'ಮುಖ್ಯೋಪಾಧ್ಯಾಯಿನಿ ಅಂಜಲಿಯವರು ಬಾಲ್ಯ ವಿವಾಹ ನಿಷೇಧ ಅಧಿಕಾರಿಯನ್ನು ಸಂಪರ್ಕಿಸುತ್ತಾರೆ. "ಪೂಜಾ ಜಿಲ್ಲೆಯ ಪ್ರತಿಭಾವಂತ ವಿದ್ಯಾರ್ಥಿನಿ. ಅವಳ ಭವಿಷ್ಯವನ್ನು ರಕ್ಷಿಸಲು ನಾವು ಬದ್ಧರಾಗಿದ್ದೇವೆ" ಎಂದು ಹೇಳುತ್ತಾರೆ.',
      },
      choices: [
        {
          label: {
            en: 'Issue an official Injunction Order under Section 13 of PCMA to halt the marriage',
            hi: 'विवाह को रोकने के लिए धारा 13 के तहत आधिकारिक निषेधाज्ञा (Injunction Order) जारी कराएं',
            kn: 'ವಿವಾಹವನ್ನು ತಡೆಯಲು ಸೆಕ್ಷನ್ 13 ರ ಅಡಿಯಲ್ಲಿ ನ್ಯಾಯಾಲಯದ ತಡೆಯಾಜ್ಞೆ ಪಡೆಯಿರಿ',
          },
          next: 'official_injunction_order',
          xp: 20,
          propIcon: '📜',
        },
        {
          label: {
            en: 'Organize a Gram Sabha meeting to counsel parents and offer government welfare schemes',
            hi: 'माता-पिता की काउंसलिंग और सरकारी योजनाओं की जानकारी के लिए ग्राम सभा बुलाएं',
            kn: 'ಪೋಷಕರಿಗೆ ಮಾರ್ಗದರ್ಶನ ಮತ್ತು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಮಾಹಿತಿ ನೀಡಲು ಗ್ರಾಮ ಸಭೆಯನ್ನು ಆಯೋಜಿಸಿ',
          },
          next: 'parents_counseling_session',
          xp: 18,
          propIcon: '🏛️',
        },
        {
          label: {
            en: 'Postpone action until the day of the ceremony',
            hi: 'समारोह के दिन तक कार्रवाई टालें',
            kn: 'ಮದುವೆಯ ದಿನದವರೆಗೆ ಕಾಯಿರಿ',
          },
          next: 'fatalism_risk_arc',
          xp: 3,
          risky: true,
          propIcon: '⏳',
        },
      ],
    },

    call_childline_cmpo: {
      stage: 2,
      mood: 'hopeful',
      location: 'office',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'document', x: 180, y: 220 }],
      text: {
        en: 'Childline 1098 coordinates with the Sub-Divisional Magistrate (SDM) and local police. A protective counseling team visits Pooja\'s home, ensuring a safe, supportive dialogue with the parents.',
        hi: 'चाइल्डलाइन 1098 ने उप-विभागीय मजिस्ट्रेट (SDM) और पुलिस से समन्वय किया। एक सुरक्षा टीम ने पूजा के घर जाकर माता-पिता से सकारात्मक और कानूनी संवाद किया।',
        kn: 'ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ಮತ್ತು ಪೊಲೀಸರೊಂದಿಗೆ ಸಮನ್ವಯ ಸಾಧಿಸಿ ಪೂಜಾಳ ಮನೆಗೆ ತೆರಳಿ ಪೋಷಕರಿಗೆ ಕಾನೂನಿನ ಬಗ್ಗೆ ತಿಳಿಹೇಳುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Ensure a signed formal undertaking under PCMA confirming education until age 18',
            hi: '18 वर्ष की आयु तक शिक्षा जारी रखने के लिए कानूनन शपथ पत्र पर हस्ताक्षर कराएं',
            kn: '18 ವರ್ಷದವರೆಗೆ ಶಿಕ್ಷಣ ಮುಂದುವರಿಸಲು ಲಿಖಿತ ಒಪ್ಪಂದಕ್ಕೆ ಸಹಿ ಮಾಡಿಸಿ',
          },
          next: 'official_injunction_order',
          xp: 20,
          propIcon: '✍️',
        },
        {
          label: {
            en: 'Enroll Pooja in the National Science Olympiad and secure her scholarship funding',
            hi: 'पूजा को राष्ट्रीय विज्ञान ओलंपियाड में पंजीकृत कराएं और छात्रवृत्ति सुनिश्चित करें',
            kn: 'ರಾಷ್ಟ್ರೀಯ ವಿಜ್ಞಾನ ಒಲಿಂಪಿಯಾಡ್‌ನಲ್ಲಿ ಪೂಜಾಳನ್ನು ನೋಂದಾಯಿಸಿ ವಿದ್ಯಾರ್ಥಿವೇತನವನ್ನು ಖಚಿತಪಡಿಸಿ',
          },
          next: 'scholarship_and_dreams',
          xp: 20,
          propIcon: '🔬',
        },
      ],
    },

    official_injunction_order: {
      stage: 2,
      mood: 'hopeful',
      location: 'village',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'committeeTable', x: 120, y: 200 }],
      text: {
        en: 'The Judicial Magistrate issues a formal Stay Injunction against the marriage. The Gram Panchayat and police are legally bound to enforce Pooja\'s right to education and personal development.',
        hi: 'न्यायिक मजिस्ट्रेट ने बाल विवाह पर रोक लगाने का औपचारिक आदेश जारी किया। ग्राम पंचायत और प्रशासन पूजा की शिक्षा और सुरक्षा सुनिश्चित करने के लिए कानूनी रूप से बाध्य हैं।',
        kn: 'ನ್ಯಾಯಾಲಯವು ವಿವಾಹಕ್ಕೆ ತಡೆಯಾಜ್ಞೆ ನೀಡುತ್ತದೆ. ಪೂಜಾಳ ಶಿಕ್ಷಣ ಮತ್ತು ರಕ್ಷಣೆಯನ್ನು ಖಚಿತಪಡಿಸಲು ಪಂಚಾಯತ್ ಬದ್ಧವಾಗಿದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Support Pooja\'s family with government self-employment and educational grants',
            hi: 'पूजा के परिवार को सरकारी स्वरोजगार और शैक्षिक अनुदान प्राप्त करने में मदद करें',
            kn: 'ಪೂಜಾಳ ಕುಟುಂಬಕ್ಕೆ ಸರ್ಕಾರದ ಸ್ವಯಂ ಉದ್ಯೋಗ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಅನುದಾನ ದೊರೆಯಲು ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'scholarship_and_dreams',
          xp: 20,
          propIcon: '💰',
        },
        {
          label: {
            en: 'Form a "Girls for Rights" peer leadership group across the school',
            hi: 'स्कूल में "अधिकारों के लिए बेटियां" छात्र नेतृत्व समूह की स्थापना करें',
            kn: 'ಶಾಲೆಯಲ್ಲಿ "ಹಕ್ಕುಗಳಿಗಾಗಿ ಹೆಣ್ಣುಮಕ್ಕಳು" ವಿದ್ಯಾರ್ಥಿ ನಾಯಕತ್ವ ತಂಡವನ್ನು ರಚಿಸಿ',
          },
          next: 'community_solidarity',
          xp: 20,
          propIcon: '🌟',
        },
      ],
    },

    parents_counseling_session: {
      stage: 2,
      mood: 'hopeful',
      location: 'home',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'home', x: 140, y: 200 }],
      text: {
        en: 'During the counseling session, Pooja demonstrates her chemistry experiment project. Her parents realize with immense pride: "Our daughter is destined to heal people as a doctor, not be confined to an early marriage!"',
        hi: 'काउंसलिंग के दौरान पूजा ने अपना विज्ञान प्रोजेक्ट दिखाया। माता-पिता को गर्व हुआ: "हमारी बेटी डॉक्टर बनकर लोगों की सेवा करेगी, उसका भविष्य शादी में नहीं, पढ़ाई में है!"',
        kn: 'ಕೌನ್ಸಿಲಿಂಗ್ ವೇಳೆ ಪೂಜಾ ತನ್ನ ವಿಜ್ಞಾನ ಪ್ರಾಜೆಕ್ಟ್ ಪ್ರದರ್ಶಿಸುತ್ತಾಳೆ. ಪೋಷಕರು ಹೆಮ್ಮೆಯಿಂದ ಅವಳ ಶಿಕ್ಷಣಕ್ಕೆ ಸಂಪೂರ್ಣ ಬೆಂಬಲ ನೀಡಲು ನಿರ್ಧರಿಸುತ್ತಾರೆ.',
      },
      choices: [
        {
          label: {
            en: 'Assist Pooja in applying for the STEM Girl Child Higher Secondary Fellowship',
            hi: 'पूजा को उच्चतर माध्यमिक विज्ञान छात्रवृत्ति (STEM Fellowship) के लिए आवेदन करने में मदद करें',
            kn: 'ವಿಜ್ಞಾನ ವಿಭಾಗದ ಉನ್ನತ ಶಿಕ್ಷಣ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಪೂಜಾಗೆ ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'scholarship_and_dreams',
          xp: 20,
          propIcon: '🔬',
        },
        {
          label: {
            en: 'Celebrate with the entire class as Pooja receives the Best Young Innovator trophy',
            hi: 'पूजा को सर्वश्रेष्ठ युवा वैज्ञानिक ट्रॉफी मिलने पर पूरी कक्षा के साथ जश्न मनाएं',
            kn: 'ಪೂಜಾಗೆ ಅತ್ಯುತ್ತಮ ಯುವ ಸಂಶೋಧಕಿ ಪ್ರಶಸ್ತಿ ದೊರೆತಿದ್ದನ್ನು ಇಡೀ ತರಗತಿಯೊಂದಿಗೆ ಸಂಭ್ರಮಿಸಿ',
          },
          next: 'future_doctor_champions',
          xp: 20,
          propIcon: '🏆',
        },
      ],
    },

    community_solidarity: {
      stage: 3,
      mood: 'happy',
      location: 'village',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'teaStallFamilies', x: 160, y: 240 }],
      text: {
        en: 'The village Panchayat unanimously passes a zero-child-marriage mandate: all weddings require age-verification certificates. Pooja is awarded the Village Youth Icon award!',
        hi: 'ग्राम पंचायत ने सर्वसम्मति से बाल विवाह मुक्त गांव का प्रस्ताव पारित किया: सभी शादियों में आयु प्रमाण पत्र अनिवार्य किया गया। पूजा को "युवा प्रेरणा पुरस्कार" मिला!',
        kn: 'ಗ್ರಾಮ ಪಂಚಾಯಿತಿಯು ಬಾಲ್ಯ ವಿವಾಹ ಮುಕ್ತ ನಿರ್ಣಯವನ್ನು ಅಂಗೀಕರಿಸುತ್ತದೆ. ಪೂಜಾಗೆ "ಗ್ರಾಮ ಯುವ ಪ್ರೇರಣೆ ಪ್ರಶಸ್ತಿ" ನೀಡಿ ಗೌರವಿಸಲಾಗುತ್ತದೆ!',
      },
      choices: [
        {
          label: {
            en: 'Deliver the keynote address at the State Child Rights Summit on Ending Child Marriage',
            hi: 'राज्य बाल अधिकार सम्मेलन में बाल विवाह उन्मूलन पर मुख्य भाषण दें',
            kn: 'ರಾಜ್ಯ ಮಕ್ಕಳ ಹಕ್ಕುಗಳ ಸಮ್ಮೇಳನದಲ್ಲಿ ಬಾಲ್ಯ ವಿವಾಹ ತಡೆಗಟ್ಟುವ ಕುರಿತು ಭಾಷಣ ಮಾಡಿ',
          },
          next: 'ending_gold_pcma',
          xp: 25,
          propIcon: '🏆',
        },
        {
          label: {
            en: 'Help Pooja set up her home biology laboratory with scholarship funds',
            hi: 'छात्रवृत्ति की राशि से पूजा की होम बायोलॉजी लैब स्थापित करने में मदद करें',
            kn: 'ವಿದ್ಯಾರ್ಥಿವೇತನದ ಹಣದಿಂದ ಪೂಜಾಗೆ ಬಯಾಲಜಿ ಲ್ಯಾಬ್ ಸಿದ್ಧಪಡಿಸಲು ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'future_doctor_champions',
          xp: 20,
          propIcon: '🔬',
        },
      ],
    },

    scholarship_and_dreams: {
      stage: 3,
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'filledDesk', x: 120, y: 260 },
        { p: 'seedlingPot', x: 300, y: 260 },
      ],
      text: {
        en: 'Pooja secures a 100% full government scholarship covering her education, textbooks, and hostel fees through medical college. She holds up her acceptance letter with tears of pure joy!',
        hi: 'पूजा को मेडिकल कॉलेज तक की पूरी पढ़ाई, किताबों और हॉस्टल के लिए 100% सरकारी छात्रवृत्ति मिली। वह खुशी के आंसुओं के साथ स्वीकृति पत्र दिखाती है!',
        kn: 'ಪೂಜಾಳಿಗೆ ವೈದ್ಯಕೀಯ ಶಿಕ್ಷಣದವರೆಗೆ ಸಂಪೂರ್ಣ ಉಚಿತ ವಿದ್ಯಾರ್ಥಿವೇತನ ದೊರೆಯುತ್ತದೆ. ಅವಳು ಸಂತಸದ ಕಣ್ಣೀರಿನಿಂದ ಪತ್ರವನ್ನು ಹಿಡಿಯುತ್ತಾಳೆ!',
      },
      choices: [
        {
          label: {
            en: 'Inspire all rural schools in the district to adopt legal awareness curriculums',
            hi: 'जिले के सभी ग्रामीण स्कूलों में कानूनी जागरूकता पाठ्यक्रम शुरू कराने के लिए प्रेरित करें',
            kn: 'ಜಿಲ್ಲೆಯ ಎಲ್ಲಾ ಶಾಲೆಗಳಲ್ಲಿ ಕಾನೂನು ಅರಿವು ಕಾರ್ಯಕ್ರಮಗಳನ್ನು ಆರಂಭಿಸಲು ಪ್ರೇರೇಪಿಸಿ',
          },
          next: 'ending_gold_pcma',
          xp: 25,
          propIcon: '🏆',
        },
        {
          label: {
            en: 'Cheer proudly as Pooja tops the state pre-medical entrance rankings',
            hi: 'राज्य स्तरीय प्री-मेडिकल परीक्षा में पूजा के टॉप करने पर गर्व से तालियां बजाएं',
            kn: 'ಪೂಜಾ ರಾಜ್ಯ ಮಟ್ಟದ ಪರೀಕ್ಷೆಯಲ್ಲಿ ಪ್ರಥಮ ಸ್ಥಾನ ಪಡೆದಾಗ ಹೆಮ್ಮೆಯಿಂದ ಸಂಭ್ರಮಿಸಿ',
          },
          next: 'future_doctor_champions',
          xp: 20,
          propIcon: '🥇',
        },
      ],
    },

    future_doctor_champions: {
      stage: 3,
      mood: 'happy',
      location: 'schoolyard',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'schoolGate', x: 120, y: 80 },
        { p: 'bench', x: 300, y: 250 },
      ],
      text: {
        en: 'Years of hard work culminate as Pooja wears her white stethoscope with pride: "When you protect a girl\'s right to childhood, you empower an entire generation!"',
        hi: 'वर्षों की मेहनत रंग लाई जब पूजा ने गर्व से सफेद कोट और स्टेथोस्कोप पहना: "जब आप एक बेटी के बचपन की रक्षा करते हैं, तो आप पूरी पीढ़ी को सशक्त बनाते हैं!"',
        kn: 'ಪೂಜಾ ಹೆಮ್ಮೆಯಿಂದ ವೈದ್ಯಕೀಯ ಕೋಟ್ ಧರಿಸುತ್ತಾಳೆ: "ಒಬ್ಬ ಹೆಣ್ಣುಮಗಳ ಬಾಲ್ಯವನ್ನು ರಕ್ಷಿಸಿದಾಗ ನೀವು ಇಡೀ ಪೀಳಿಗೆಯನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುತ್ತೀರಿ!"',
      },
      choices: [
        {
          label: {
            en: 'Celebrate the triumph of constitutional child rights across India',
            hi: 'भारत भर में संवैधानिक बाल अधिकारों की ऐतिहासिक जीत का उत्सव मनाएं',
            kn: 'ಭಾರತದಾದ್ಯಂತ ಸಾಂವಿಧಾನಿಕ ಮಕ್ಕಳ ಹಕ್ಕುಗಳ ಜಯವನ್ನು ಸಂಭ್ರಮಿಸಿ',
          },
          next: 'ending_gold_pcma',
          xp: 25,
          propIcon: '🏆',
        },
        {
          label: {
            en: 'Honor the ongoing community vigilance guarding every young girl\'s aspirations',
            hi: 'हर बेटी की आकांक्षाओं की रक्षा करने वाली सामुदायिक निगरानी का सम्मान करें',
            kn: 'ಪ್ರತಿಯೊಬ್ಬ ಹೆಣ್ಣುಮಗಳ ಕನಸುಗಳನ್ನು ಕಾಯುವ ಸಮುದಾಯದ ಜಾಗೃತಿಯನ್ನು ಗೌರವಿಸಿ',
          },
          next: 'ending_silver_pcma',
          xp: 20,
          propIcon: '🥈',
        },
      ],
    },

    // ── ENDINGS (Non-dismissible Childline 1098 link) ──
    ending_gold_pcma: {
      stage: 4,
      end: true,
      outcome: 'strong',
      mood: 'happy',
      location: 'schoolyard',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'schoolGate', x: 120, y: 80 },
        { p: 'seedlingPot', x: 320, y: 260 },
      ],
      badge: 'Childhood Protector',
      badgeIcon: '🎓',
      bonusXp: 50,
      resourceLink: '/resources?topic=child_marriage',
      text: {
        en: 'Gold Ending — Boundless Horizon! By leveraging the Prohibition of Child Marriage Act and Childline 1098, you stopped an illegal child marriage and empowered Pooja to achieve her dream of becoming a medical doctor. If you ever learn of a child marriage risk, immediately call Childline 1098.',
        hi: 'स्वर्ण परिणाम — असीम क्षितिज! बाल विवाह कानून और 1098 की मदद से आपने बाल विवाह रुकवाया और पूजा के डॉक्टर बनने के सपने को साकार किया। बाल विवाह की किसी भी सूचना पर तुरंत 1098 पर कॉल करें।',
        kn: 'ಚಿನ್ನದ ಮುಕ್ತಾಯ — ಅಡೆತಡೆಗಳಿಲ್ಲದ ಭವಿಷ್ಯ! ಬಾಲ್ಯ ವಿವಾಹ ನಿಷೇಧ ಕಾಯ್ದೆ ಮತ್ತು 1098 ರ ನೆರವಿನಿಂದ ನೀವು ಬಾಲ್ಯ ವಿವಾಹವನ್ನು ತಡೆದು ಪೂಜಾಳ ಕನಸನ್ನು ನನಸಾಗಿಸಿದ್ದೀರಿ. ಸಹಾಯಕ್ಕಾಗಿ ಸದಾ 1098 ಗೆ ಕರೆ ಮಾಡಿ.',
      },
    },

    ending_silver_pcma: {
      stage: 4,
      end: true,
      outcome: 'strong',
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'filledDesk', x: 150, y: 260 }],
      badge: 'Dreams Defender',
      badgeIcon: '📜',
      bonusXp: 40,
      resourceLink: '/resources',
      text: {
        en: 'Silver Ending — Education Triumphs! Pooja is in school, safe from forced early marriage, and supported by government schemes. Remember: Childline 1098 is available 24/7.',
        hi: 'रजत परिणाम — शिक्षा की जीत! पूजा स्कूल में सुरक्षित है और उच्च शिक्षा प्राप्त कर रही है। याद रखें: चाइल्डलाइन 1098 हमेशा उपलब्ध है।',
        kn: 'ಬೆಳ್ಳಿ ಮುಕ್ತಾಯ — ಶಿಕ್ಷಣದ ಜಯ! ಪೂಜಾ ಸುರಕ್ಷಿತವಾಗಿ ಶಿಕ್ಷಣ ಪಡೆಯುತ್ತಿದ್ದಾಳೆ. ನೆನಪಿರಲಿ: ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಸದಾ ಲಭ್ಯ.',
      },
    },

    ending_weak_marriage: {
      stage: 4,
      end: true,
      outcome: 'weak',
      mood: 'sad',
      location: 'village',
      timeOfDay: 'evening',
      sceneObjects: [{ p: 'schoolGateClosed', x: 120, y: 80 }],
      badge: 'Silence Costs Dreams Alert',
      badgeIcon: '💔',
      bonusXp: 5,
      resourceLink: '/resources',
      text: {
        en: 'Weak Ending — A Dream Interrupted. Inaction allows illegal child marriages to steal young futures. The law gives every child the right to say NO and grow up safely. Always call Childline 1098 to prevent child marriage.',
        hi: 'कमजोर परिणाम — टूटा हुआ सपना। निष्क्रियता से बच्चों का भविष्य छिन जाता है। कानून हर बच्चे को सुरक्षित जीने का अधिकार देता है। बाल विवाह रोकने के लिए हमेशा 1098 पर कॉल करें।',
        kn: 'ಹಿನ್ನಡೆಯ ಮುಕ್ತಾಯ — ಕಮರಿದ ಕನಸು. ಬಾಲ್ಯ ವಿವಾಹವನ್ನು ತಡೆಯಲು ಸದಾ ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಗೆ ಕರೆ ಮಾಡಿ.',
      },
    },
  },
  quiz: [
    {
      question: {
        en: 'Under the Prohibition of Child Marriage Act (PCMA 2006), what is the legal minimum age of marriage in India?',
        hi: 'बाल विवाह निषेध अधिनियम (PCMA 2006) के तहत, भारत में विवाह की कानूनी न्यूनतम आयु क्या है?',
        kn: 'ಬಾಲ್ಯ ವಿವಾಹ ನಿಷೇಧ ಕಾಯ್ದೆ (ಪಿಸಿಎಂಎ 2006) ಪ್ರಕಾರ ಭಾರತದಲ್ಲಿ ಮದುವೆಗೆ ಕಾನೂನುಬದ್ಧ ಕನಿಷ್ಠ ವಯಸ್ಸು ಎಷ್ಟು?',
      },
      options: [
        { en: '15 years for girls, 18 for boys', hi: 'लड़कियों के लिए 15, लड़कों के लिए 18', kn: 'ಹೆಣ್ಣುಮಕ್ಕಳಿಗೆ 15, ಗಂಡುಮಕ್ಕಳಿಗೆ 18' },
        { en: '18 years for girls, 21 years for boys', hi: 'लड़कियों के लिए 18 वर्ष, लड़कों के लिए 21 वर्ष', kn: 'ಹೆಣ್ಣುಮಕ್ಕಳಿಗೆ 18 ವರ್ಷ, ಗಂಡುಮಕ್ಕಳಿಗೆ 21 ವರ್ಷ' },
        { en: 'Any age with parent permission', hi: 'माता-पिता की सहमति से कोई भी उम्र', kn: 'ಪೋಷಕರ ಒಪ್ಪಿಗೆಯೊಂದಿಗೆ ಯಾವುದೇ ವಯಸ್ಸು' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'Under the PCMA, marriage of a female below 18 or male below 21 is strictly illegal and punishable by law.',
        hi: 'कानून के अनुसार, 18 वर्ष से कम उम्र की लड़की या 21 वर्ष से कम उम्र के लड़के का विवाह पूर्णतः अवैध और दंडनीय है।',
        kn: '18 ವರ್ಷದೊಳಗಿನ ಹೆಣ್ಣು ಅಥವಾ 21 ವರ್ಷದೊಳಗಿನ ಗಂಡಿನ ವಿವಾಹವು ಕಾನೂನುಬಾಹಿರ ಮತ್ತು ಶಿಕ್ಷಾರ್ಹವಾಗಿದೆ.',
      },
    },
    {
      question: {
        en: 'Can a child or their friends legally request an injunction from a magistrate to stop an impending child marriage?',
        hi: 'क्या कोई बच्चा या उसके दोस्त बाल विवाह को रोकने के लिए मजिस्ट्रेट से कानूनी रोक (इंजंक्शन) की मांग कर सकते हैं?',
        kn: 'ಬಾಲ್ಯ ವಿವಾಹವನ್ನು ತಡೆಯಲು ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್‌ರಿಂದ ಕಾನೂನು ತಡೆಯಾಜ್ಞೆ ಪಡೆಯಬಹುದೇ?',
      },
      options: [
        { en: 'Yes, Child Marriage Prohibition Officers & Courts can stop it immediately', hi: 'हाँ, बाल विवाह निषेध अधिकारी और अदालतें तुरंत रोक लगा सकती हैं', kn: 'ಹೌದು, ಬಾಲ್ಯ ವಿವಾಹ ನಿಷೇಧ ಅಧಿಕಾರಿಗಳು ತಕ್ಷಣ ತಡೆಯಬಹುದು' },
        { en: 'No, village customs override the law', hi: 'नहीं, रीति-रिवाज कानून से ऊपर हैं', kn: 'ಇಲ್ಲ, ಸಂಪ್ರದಾಯವೇ ಮುಖ್ಯ' },
        { en: 'Only after the wedding happens', hi: 'केवल शादी होने के बाद', kn: 'ಕೇವಲ ಮದುವೆಯಾದ ನಂತರ' },
      ],
      correctIndex: 0,
      explanation: {
        en: 'Under Section 13 of the PCMA, magistrates have power to issue injunction orders preventing child marriages before they happen.',
        hi: 'धारा 13 के तहत, मजिस्ट्रेट को बाल विवाह होने से पहले ही उस पर रोक लगाने का अधिकार प्राप्त है।',
        kn: 'ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 13 ರ ಅಡಿಯಲ್ಲಿ, ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್‌ಗೆ ಬಾಲ್ಯ ವಿವಾಹ ನಡೆಯುವ ಮುನ್ನವೇ ತಡೆಯಾಜ್ಞೆ ನೀಡುವ ಅಧಿಕಾರವಿದೆ.',
      },
    },
  ],
};
