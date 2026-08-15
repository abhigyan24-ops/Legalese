/**
 * protection-from-child-labour.js
 * 
 * Protection from Child Labour — Child Labour (Prohibition and Regulation) Act.
 * 20+ branching nodes, exactly 3 choices per decision node, recovery arcs,
 * 5 distinct endings across strong, medium, medium-low, weak outcomes.
 */

export default {
  id: 'protection-from-child-labour',
  title: {
    en: 'Protection from Child Labour',
    hi: 'बाल श्रम से सुरक्षा',
    kn: 'ಬಾಲ ಕಾರ್ಮಿಕತೆಯಿಂದ ರಕ್ಷಣೆ',
  },
  startNode: 'start',
  stages: [
    { icon: '🏭', label: 'The Workshop' },
    { icon: '⚖️', label: 'Knowing the Law' },
    { icon: '🤝', label: 'Seeking Help' },
    { icon: '🎒', label: 'Back to School' },
    { icon: '🌈', label: 'Bright Horizon' },
  ],
  characters: {
    raju: { name: 'Raju', role: '11-year-old Friend working in Workshop' },
    labourOfficer: { name: 'Officer Verma', role: 'Labour Enforcement Officer' },
    teacher: { name: 'Mrs. Sharma', role: 'School Teacher' },
  },
  nodes: {
    start: {
      stage: 0,
      mood: 'worried',
      location: 'street',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'factory', x: 80, y: 180 },
        { p: 'tools', x: 260, y: 220 },
      ],
      text: {
        en: 'You pass a local embroidery workshop and spot your 11-year-old classmate Raju carrying heavy cloth bundles in dim lighting. He has not attended school in two weeks.',
        hi: 'आप एक स्थानीय कढ़ाई कारखाने से गुजरते हैं और अपने 11 वर्षीय सहपाठी राजू को कम रोशनी में कपड़े के भारी बंडल उठाते हुए देखते हैं। वह दो हफ़्तों से स्कूल नहीं आया है।',
        kn: 'ನೀವು ಸ್ಥಳೀಯ ಕಸೂತಿ ಕಾರ್ಖಾನೆಯ ಬಳಿ ಹಾದುಹೋಗುವಾಗ ನಿಮ್ಮ 11 ವರ್ಷದ ಸಹಪಾಠಿ ರಾಜು ಭಾರವಾದ ಬಟ್ಟೆಯ ಮೂಟೆಗಳನ್ನು ಹೊರುತ್ತಿರುವುದನ್ನು ಕಾಣುತ್ತೀರಿ. ಅವನು ಎರಡು ವಾರಗಳಿಂದ ಶಾಲೆಗೆ ಬಂದಿಲ್ಲ.',
      },
      didYouKnow: {
        en: 'The Child Labour Amendment Act 2016 completely bans employment of children under 14 in all commercial occupations, raising penalties to up to 2 years imprisonment. (Source: Ministry of Labour & Employment)',
        hi: 'बाल श्रम संशोधन अधिनियम 2016 के तहत 14 वर्ष से कम उम्र के बच्चों के व्यावसायिक काम करने पर पूर्ण प्रतिबंध है, जिसमें 2 साल तक की जेल हो सकती है। (स्रोत: श्रम मंत्रालय)',
        kn: 'ಬಾಲ ಕಾರ್ಮಿಕ ತಿದ್ದುಪಡಿ ಕಾಯ್ದೆ 2016 ರ ಪ್ರಕಾರ 14 ವರ್ಷದೊಳಗಿನ ಮಕ್ಕಳನ್ನು ಯಾವುದೇ ಕೆಲಸಕ್ಕೆ ನೇಮಿಸುವುದು ಕಡ್ಡಾಯ ಅಪರಾಧವಾಗಿದೆ. (ಮೂಲ: ಕಾರ್ಮಿಕ ಸಚಿವಾಲಯ)',
      },
      choices: [
        {
          label: {
            en: 'Talk to Raju during his lunch break to understand his situation',
            hi: 'राजू की स्थिति समझने के लिए उसके लंच ब्रेक में उससे बात करें',
            kn: 'ರಾಜುವಿನ ಪರಿಸ್ಥಿತಿಯನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಊಟದ ವಿರಾಮದಲ್ಲಿ ಅವನೊಂದಿಗೆ ಮಾತನಾಡಿ',
          },
          next: 'talk_to_raju',
          xp: 15,
          propIcon: '💬',
        },
        {
          label: {
            en: 'Report the hazardous child labour immediately to your school headmistress',
            hi: 'स्कूल की प्रधानाध्यापिका को तुरंत बाल श्रम की जानकारी दें',
            kn: 'ಅಪಾಯಕಾರಿ ಬಾಲ ಕಾರ್ಮಿಕ ಪದ್ಧತಿಯ ಬಗ್ಗೆ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರಿಗೆ ತಕ್ಷಣ ತಿಳಿಸಿ',
          },
          next: 'inform_headmistress',
          xp: 15,
          propIcon: '🏫',
        },
        {
          label: {
            en: 'Confront the aggressive workshop supervisor alone inside the factory',
            hi: 'कारखाने के अंदर अकेले जाकर गुस्सैल सुपरवाइजर से बहस करें',
            kn: 'ಕಾರ್ಖಾನೆಯೊಳಗೆ ಒಬ್ಬರೇ ಹೋಗಿ ಮೇಲ್ವಿಚಾರಕರೊಂದಿಗೆ ಜಗಳವಾಡಿ',
          },
          next: 'dangerous_confrontation',
          xp: 2,
          risky: true,
          propIcon: '⚠️',
        },
      ],
    },

    dangerous_confrontation: {
      stage: 0,
      mood: 'sad',
      location: 'factory',
      timeOfDay: 'dusk',
      sceneObjects: [{ p: 'tools', x: 180, y: 220 }],
      text: {
        en: 'The supervisor shouts aggressively and locks the factory gate. Children must never confront dangerous employers alone — legal protection requires adult authorities and official child protection officers!',
        hi: 'सुपरवाइजर गुस्से में चिल्लाता है और कारखाना बंद करने की धमकी देता है। बच्चों को अकेले नियोक्ताओं से नहीं भिड़ना चाहिए — इसके लिए कानूनी और प्रशासनिक सहायता जरूरी है!',
        kn: 'ಮೇಲ್ವಿಚಾರಕನು ಕೋಪದಿಂದ ಗದರಿಸುತ್ತಾನೆ. ಮಕ್ಕಳು ಅಪಾಯಕಾರಿ ಮಾಲೀಕರನ್ನು ಒಬ್ಬರೇ ಎದುರಿಸಬಾರದು — ಇದಕ್ಕೆ ಕಾನೂನು ಮತ್ತು ಅಧಿಕಾರಿಗಳ ನೆರವು ಅಗತ್ಯ!',
      },
      choices: [
        {
          label: {
            en: 'Quickly retreat to safety and contact your trusted teacher',
            hi: 'तुरंत सुरक्षित स्थान पर लौटें और अपने शिक्षक से संपर्क करें',
            kn: 'ತಕ್ಷಣ ಸುರಕ್ಷಿತ ಸ್ಥಳಕ್ಕೆ ಮರಳಿ ನಿಮ್ಮ ನೆಚ್ಚಿನ ಶಿಕ್ಷಕರನ್ನು ಸಂಪರ್ಕಿಸಿ',
          },
          next: 'inform_headmistress',
          xp: 10,
          propIcon: '🏃',
        },
        {
          label: {
            en: 'Call the National Childline 1098 helpline for child labour rescue',
            hi: 'बाल श्रम से बचाव के लिए राष्ट्रीय चाइल्डलाइन 1098 पर कॉल करें',
            kn: 'ಬಾಲ ಕಾರ್ಮಿಕರ ರಕ್ಷಣೆಗಾಗಿ ರಾಷ್ಟ್ರೀಯ ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಗೆ ಕರೆ ಮಾಡಿ',
          },
          next: 'call_childline_rescue',
          xp: 15,
          propIcon: '📞',
        },
        {
          label: {
            en: 'Try sneaking Raju out during shift change without a plan',
            hi: 'बिना किसी योजना के शिफ्ट बदलने के समय राजू को चुपके से भगाने की कोशिश करें',
            kn: 'ಯಾವುದೇ ಯೋಜನೆಯಿಲ್ಲದೆ ರಾಜುವನ್ನು ಕರೆದೊಯ್ಯಲು ಪ್ರಯತ್ನಿಸಿ',
          },
          next: 'intercepted_escape',
          xp: 2,
          risky: true,
          propIcon: '🚫',
        },
      ],
    },

    intercepted_escape: {
      stage: 1,
      mood: 'worried',
      location: 'street',
      timeOfDay: 'evening',
      sceneObjects: [{ p: 'factory', x: 100, y: 180 }],
      text: {
        en: 'Raju is terrified of losing what little income his family depends on. "My parents were given an advance loan by the contractor," he cries. Bonded and child labour under age 14 is illegal under the Child Labour Act (1986 & 2016 Amendment).',
        hi: 'राजू डरा हुआ है। "ठेकेदार ने मेरे माता-पिता को अग्रिम कर्ज दिया था," वह रोता है। बाल श्रम अधिनियम के तहत 14 वर्ष से कम उम्र के बच्चों से मजदूरी कराना पूरी तरह गैरकानूनी है।',
        kn: '"ಗುತ್ತಿಗೆದಾರ ನನ್ನ ಪೋಷಕರಿಗೆ ಮುಂಗಡ ಸಾಲ ನೀಡಿದ್ದಾನೆ" ಎಂದು ರಾಜು ಅಳುತ್ತಾನೆ. ಬಾಲ ಕಾರ್ಮಿಕ ಕಾಯ್ದೆಯಡಿ 14 ವರ್ಷದೊಳಗಿನ ಮಕ್ಕಳಿಂದ ಕೆಲಸ ಮಾಡಿಸುವುದು ಕಾನೂನುಬಾಹಿರ.',
      },
      choices: [
        {
          label: {
            en: 'Bring Raju\'s case before the District Child Protection Unit (DCPU)',
            hi: 'राजू के मामले को जिला बाल संरक्षण इकाई (DCPU) के समक्ष ले जाएं',
            kn: 'ರಾಜುವಿನ ಪ್ರಕರಣವನ್ನು ಜಿಲ್ಲಾ ಮಕ್ಕಳ ರಕ್ಷಣಾ ಘಟಕದ (DCPU) ಮುಂದಿಡಿ',
          },
          next: 'official_inspection',
          xp: 15,
          propIcon: '🏛️',
        },
        {
          label: {
            en: 'Collaborate with the School Management Committee to visit Raju\'s parents',
            hi: 'राजू के माता-पिता से मिलने के लिए स्कूल प्रबंधन समिति के साथ जाएं',
            kn: 'ರಾಜುವಿನ ಪೋಷಕರನ್ನು ಭೇಟಿ ಮಾಡಲು ಶಾಲಾ ನಿರ್ವಹಣಾ ಸಮಿತಿಯೊಂದಿಗೆ ತೆರಳಿ',
          },
          next: 'parents_rehabilitation',
          xp: 15,
          propIcon: '🤝',
        },
        {
          label: {
            en: 'Accept his situation and let him work full-time',
            hi: 'उसकी स्थिति को स्वीकार कर लें और उसे पूरे समय काम करने दें',
            kn: 'ಅವನು ಕೆಲಸದಲ್ಲೇ ಮುಂದುವರಿಯಲು ಬಿಡಿ',
          },
          next: 'ending_weak_labour',
          xp: 1,
          risky: true,
          propIcon: '💔',
        },
      ],
    },

    talk_to_raju: {
      stage: 1,
      mood: 'hopeful',
      location: 'street',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'bench', x: 120, y: 220 }],
      text: {
        en: 'Raju explains: "The contractor promised ₹2,000 a month to help my father pay debts. But I want to study and become an engineer." You know the Constitution bans all hazardous child labour.',
        hi: 'राजू बताता है: "ठेकेदार ने ₹2,000 महीने का वादा किया था। लेकिन मैं पढ़ाई करके इंजीनियर बनना चाहता हूँ।" संविधान किसी भी बच्चे से बाल श्रम कराने पर रोक लगाता है।',
        kn: 'ರಾಜು ಹೇಳುತ್ತಾನೆ: "ತಿಂಗಳಿಗೆ ₹2,000 ಕೊಡುವುದಾಗಿ ಹೇಳಿದ್ದಾರೆ. ಆದರೆ ನಾನು ಓದಿ ಇಂಜಿನಿಯರ್ ಆಗಲು ಬಯಸುತ್ತೇನೆ." ಸಂವಿಧಾನವು ಬಾಲ ಕಾರ್ಮಿಕ ಪದ್ಧತಿಯನ್ನು ನಿಷೇಧಿಸಿದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Encourage Raju to come with you to meet the School Teacher and Labour Inspector',
            hi: 'राजू को अपने साथ शिक्षक और श्रम निरीक्षक से मिलने चलने के लिए प्रेरित करें',
            kn: 'ಶಿಕ್ಷಕರು ಮತ್ತು ಕಾರ್ಮಿಕ ನಿರೀಕ್ಷಕರನ್ನು ಭೇಟಿ ಮಾಡಲು ರಾಜುವನ್ನು ಜೊತೆಯಲ್ಲಿ ಕರೆದೊಯ್ಯಿರಿ',
          },
          next: 'official_inspection',
          xp: 18,
          propIcon: '📜',
        },
        {
          label: {
            en: 'Advise Raju\'s father about government livelihood schemes (MGNREGA & PMMY)',
            hi: 'राजू के पिता को सरकारी आजीविका योजनाओं (मनरेगा व मुद्रा) के बारे में बताएं',
            kn: 'ರಾಜುವಿನ ತಂದೆಗೆ ಸರ್ಕಾರದ ಉದ್ಯೋಗ ಯೋಜನೆಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ',
          },
          next: 'parents_rehabilitation',
          xp: 15,
          propIcon: '🌾',
        },
        {
          label: {
            en: 'Lend Raju your pocket money and hope it solves his family debts',
            hi: 'राजू को अपनी पॉकेट मनी दें और उम्मीद करें कि इससे कर्ज चुकता हो जाएगा',
            kn: 'ನಿಮ್ಮ ಪಾಕೆಟ್ ಹಣವನ್ನು ನೀಡಿ ಸಾಲ ತೀರುತ್ತದೆ ಎಂದು ಆಶಿಸಿ',
          },
          next: 'intercepted_escape',
          xp: 3,
          risky: true,
          propIcon: '🪙',
        },
      ],
    },

    inform_headmistress: {
      stage: 1,
      mood: 'hopeful',
      location: 'office',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'teacherDesk', x: 100, y: 220 },
        { p: 'rtePamphlet', x: 240, y: 230 },
      ],
      text: {
        en: 'The headmistress takes immediate action! "Under Section 3 of the Child Labour Act, employing children below 14 in commercial establishments is a cognizable criminal offence. We will file an official report."',
        hi: 'प्रधानाध्यापिका ने तुरंत संज्ञान लिया! "बाल श्रम अधिनियम की धारा 3 के तहत 14 वर्ष से कम उम्र के बच्चों से काम कराना एक गैर-जमानती अपराध है। हम तत्काल रिपोर्ट दर्ज कराएंगे।"',
        kn: 'ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು ತಕ್ಷಣ ಕ್ರಮ ಕೈಗೊಳ್ಳುತ್ತಾರೆ! "14 ವರ್ಷದೊಳಗಿನ ಮಕ್ಕಳನ್ನು ಕೆಲಸಕ್ಕೆ ನೇಮಿಸಿಕೊಳ್ಳುವುದು ಕಾನೂನಿನ ಪ್ರಕಾರ ಗಂಭೀರ ಅಪರಾಧ. ನಾವು ತಕ್ಷಣ ವರದಿ ನೀಡುತ್ತೇವೆ."',
      },
      choices: [
        {
          label: {
            en: 'Coordinate with the District Child Welfare Committee (CWC)',
            hi: 'जिला बाल कल्याण समिति (CWC) के साथ समन्वय करें',
            kn: 'ಜಿಲ್ಲಾ ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಸಮಿತಿಯೊಂದಿಗೆ (CWC) ಸಮನ್ವಯ ಸಾಧಿಸಿ',
          },
          next: 'official_inspection',
          xp: 18,
          propIcon: '🏛️',
        },
        {
          label: {
            en: 'Accompany the teacher on a home visit to support Raju\'s family with dry rations',
            hi: 'राजू के परिवार को राशन और सहायता देने के लिए शिक्षक के साथ घर जाएं',
            kn: 'ರಾಜುವಿನ ಕುಟುಂಬಕ್ಕೆ ಪಡಿತರ ಮತ್ತು ನೆರವು ನೀಡಲು ಶಿಕ್ಷಕರೊಂದಿಗೆ ಮನೆಗೆ ತೆರಳಿ',
          },
          next: 'parents_rehabilitation',
          xp: 15,
          propIcon: '🌾',
        },
        {
          label: {
            en: 'Wait passively for weeks hoping the bureaucracy acts on its own',
            hi: 'हफ्तों तक चुपचाप इंतजार करें यह सोचकर कि सब अपने आप ठीक हो जाएगा',
            kn: 'ವಾರಗಟ್ಟಲೆ ಸುಮ್ಮನೆ ಕಾಯಿರಿ',
          },
          next: 'intercepted_escape',
          xp: 4,
          risky: true,
          propIcon: '⏳',
        },
      ],
    },

    call_childline_rescue: {
      stage: 2,
      mood: 'hopeful',
      location: 'office',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'document', x: 180, y: 220 }],
      text: {
        en: 'Childline 1098 dispatches an emergency rescue officer. Within 2 hours, the team audits the premises, secures Raju\'s safety, and initiates rehabilitation protocols under the National Child Labour Project (NCLP).',
        hi: 'चाइल्डलाइन 1098 ने आपातकालीन बचाव अधिकारी भेजा। 2 घंटे के भीतर टीम ने कारखाने की जांच की, राजू को सुरक्षित किया और राष्ट्रीय बाल श्रम परियोजना के तहत पुनर्वास शुरू किया।',
        kn: 'ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ತುರ್ತು ರಕ್ಷಣಾ ಅಧಿಕಾರಿಯನ್ನು ಕಳುಹಿಸುತ್ತದೆ. 2 ಗಂಟೆಗಳಲ್ಲಿ ತಂಡವು ಸ್ಥಳ ಪರಿಶೀಲನೆ ನಡೆಸಿ ರಾಜುವನ್ನು ರಕ್ಷಿಸುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Assist the labour enforcement team with formal documentation and schooling enrollment',
            hi: 'दस्तावेजीकरण और स्कूल में दोबारा दाखिला कराने में श्रम विभाग की मदद करें',
            kn: 'ದಾಖಲೆಗಳನ್ನು ಸಿದ್ಧಪಡಿಸಲು ಮತ್ತು ಮರಳಿ ಶಾಲೆಗೆ ಸೇರಿಸಲು ಕಾರ್ಮಿಕ ಇಲಾಖೆಗೆ ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'rehabilitation_bridge_school',
          xp: 20,
          propIcon: '📝',
        },
        {
          label: {
            en: 'Organize peer study sessions to help Raju catch up on his missed syllabus',
            hi: 'राजू की छूटी हुई पढ़ाई को पूरा कराने के लिए सहपाठियों का स्टडी ग्रुप बनाएं',
            kn: 'ರಾಜುವಿನ ತಪ್ಪಿದ ಪಾಠಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಲು ಸ್ನೇಹಿತರ ಅಧ್ಯಯನ ಗುಂಪನ್ನು ರಚಿಸಿ',
          },
          next: 'classroom_welcome_back',
          xp: 18,
          propIcon: '📚',
        },
        {
          label: {
            en: 'Leave Raju to navigate the rehabilitation center on his own',
            hi: 'राजू को पुनर्वास केंद्र में अकेले सब संभालने के लिए छोड़ दें',
            kn: 'ರಾಜುವನ್ನು ಒಬ್ಬನೇ ನಿಭಾಯಿಸಲು ಬಿಟ್ಟುಬಿಡಿ',
          },
          next: 'rehabilitation_bridge_school',
          xp: 8,
          propIcon: '🏃',
        },
      ],
    },

    official_inspection: {
      stage: 2,
      mood: 'hopeful',
      location: 'factory',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'factory', x: 100, y: 180 },
        { p: 'document', x: 260, y: 220 },
      ],
      text: {
        en: 'Labour Enforcement Officer Verma conducts a formal inspection. The employer is penalized under Section 14 (fines up to ₹50,000 and imprisonment up to 2 years). Raju is freed and enrolled in special bridge schooling.',
        hi: 'श्रम प्रवर्तन अधिकारी वर्मा ने औपचारिक निरीक्षण किया। नियोक्ता पर धारा 14 के तहत जुर्माना और कानूनी कार्रवाई की गई। राजू को मुक्त कराकर विशेष ब्रिज स्कूल में दाखिल कराया गया।',
        kn: 'ಕಾರ್ಮಿಕ ಅಧಿಕಾರಿ ವರ್ಮಾ ತಪಾಸಣೆ ನಡೆಸುತ್ತಾರೆ. ಮಾಲೀಕನ ಮೇಲೆ ದಂಡ ಮತ್ತು ಕಾನೂನು ಕ್ರಮ ಜರುಗಿಸಲಾಗುತ್ತದೆ. ರಾಜುವನ್ನು ಮುಕ್ತಗೊಳಿಸಿ ವಿಶೇಷ ಶಾಲೆಗೆ ಸೇರಿಸಲಾಗುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Ensure Raju receives the statutory Child Labour Rehabilitation Fund compensation (₹20,000)',
            hi: 'राजू को बाल श्रम पुनर्वास कोष से ₹20,000 की वैधानिक सहायता दिलाना सुनिश्चित करें',
            kn: 'ರಾಜುವಿಗೆ ₹20,000 ಪುನರ್ವಸತಿ ಪರಿಹಾರ ದೊರೆಯುವುದನ್ನು ಖಚಿತಪಡಿಸಿ',
          },
          next: 'rehabilitation_bridge_school',
          xp: 20,
          propIcon: '💰',
        },
        {
          label: {
            en: 'Prepare the school classroom to welcome Raju back with new books and pencils',
            hi: 'नई किताबों और पेंसिलों के साथ राजू का स्कूल में स्वागत करने की तैयारी करें',
            kn: 'ಹೊಸ ಪುಸ್ತಕಗಳೊಂದಿಗೆ ರಾಜುವನ್ನು ಶಾಲೆಗೆ ಸ್ವಾಗತಿಸಲು ಸಿದ್ಧತೆ ನಡೆಸಿ',
          },
          next: 'classroom_welcome_back',
          xp: 18,
          propIcon: '🎒',
        },
        {
          label: {
            en: 'Disregard the court follow-ups',
            hi: 'न्यायालय और कागजी कार्यवाही को अनदेखा करें',
            kn: 'ಕಾನೂನು ಪ್ರಕ್ರಿಯೆಯನ್ನು ಕಡೆಗಣಿಸಿ',
          },
          next: 'classroom_welcome_back',
          xp: 5,
          propIcon: '📋',
        },
      ],
    },

    parents_rehabilitation: {
      stage: 2,
      mood: 'hopeful',
      location: 'village',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'home', x: 140, y: 200 }],
      text: {
        en: 'The community elders and teacher meet Raju\'s parents. His father is connected to the government skill development scheme, and his mother receives self-help group loan support, eliminating the economic need for child labour.',
        hi: 'समुदाय के बुजुर्गों और शिक्षक ने राजू के माता-पिता से मुलाकात की। पिता को कौशल विकास योजना से जोड़ा गया और माँ को स्वयं सहायता समूह से ऋण सहायता मिली।',
        kn: 'ಶಿಕ್ಷಕರು ರಾಜುವಿನ ಪೋಷಕರನ್ನು ಭೇಟಿಯಾಗುತ್ತಾರೆ. ತಂದೆಗೆ ಕೌಶಲ್ಯ ತರಬೇತಿ ಮತ್ತು ತಾಯಿಗೆ ಸ್ವಸಹಾಯ ಸಂಘದ ನೆರವು ದೊರೆತು, ಬಾಲ ಕಾರ್ಮಿಕತೆಯ ಆರ್ಥಿಕ ಅಗತ್ಯ ನಿವಾರಣೆಯಾಗುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Support Raju\'s transition back to full-time mainstream school',
            hi: 'राजू के नियमित स्कूल में लौटने में पूरा सहयोग करें',
            kn: 'ರಾಜು ಶಾಲೆಗೆ ಮರಳಲು ಸಂಪೂರ್ಣ ಬೆಂಬಲ ನೀಡಿ',
          },
          next: 'classroom_welcome_back',
          xp: 20,
          propIcon: '🎒',
        },
        {
          label: {
            en: 'Set up an Anti-Child Labour youth vigilance group in your neighbourhood',
            hi: 'अपने इलाके में बाल श्रम विरोधी युवा निगरानी समूह बनाएं',
            kn: 'ನಿಮ್ಮ ಬಡಾವಣೆಯಲ್ಲಿ ಬಾಲ ಕಾರ್ಮಿಕ ವಿರೋಧಿ ಯುವ ಜಾಗೃತಿ ತಂಡವನ್ನು ರಚಿಸಿ',
          },
          next: 'ending_gold_labour',
          xp: 25,
          propIcon: '🛡️',
        },
        {
          label: {
            en: 'Assume everything is fixed without monitoring Raju\'s attendance',
            hi: 'राजू की स्कूल उपस्थिति की निगरानी किए बिना मान लें कि सब ठीक है',
            kn: 'ರಾಜುವಿನ ಹಾಜರಾತಿಯನ್ನು ಗಮನಿಸದೆ ಸುಮ್ಮನಾಗಿ',
          },
          next: 'ending_bronze_individual_labour',
          xp: 8,
          propIcon: '🤷',
        },
      ],
    },

    rehabilitation_bridge_school: {
      stage: 3,
      mood: 'hopeful',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'blackboard', x: 80, y: 60 },
        { p: 'notebooksOut', x: 220, y: 240 },
      ],
      text: {
        en: 'At the bridge center, Raju receives accelerated tutoring, free hot mid-day meals, uniform, and school bags. In just 3 months, he masters mathematics and language fundamentals!',
        hi: 'ब्रिज सेंटर में राजू को विशेष कोचिंग, मुफ्त दोपहर का भोजन, यूनिफॉर्म और स्कूल बैग मिलते हैं। 3 महीनों में वह गणित और भाषा में पारंगत हो जाता है!',
        kn: 'ವಿಶೇಷ ಶಾಲೆಯಲ್ಲಿ ರಾಜುಗೆ ತರಬೇತಿ, ಉಚಿತ ಮಧ್ಯಾಹ್ನದ ಊಟ, ಸಮವಸ್ತ್ರ ಮತ್ತು ಪುಸ್ತಕಗಳು ದೊರೆಯುತ್ತವೆ. 3 ತಿಂಗಳಲ್ಲಿ ಅವನು ಪಠ್ಯಗಳಲ್ಲಿ ಪ್ರವೀಣನಾಗುತ್ತಾನೆ!',
      },
      choices: [
        {
          label: {
            en: 'Help him pass the mainstream class re-entry exam with top marks',
            hi: 'शीर्ष अंकों के साथ मुख्यधारा स्कूल की प्रवेश परीक्षा पास करने में उसकी मदद करें',
            kn: 'ಉತ್ತಮ ಅಂಕಗಳೊಂದಿಗೆ ಮುಖ್ಯವಾಹಿನಿಯ ಶಾಲೆಗೆ ಮರಳಲು ಅವನಿಗೆ ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'classroom_welcome_back',
          xp: 20,
          propIcon: '⭐',
        },
        {
          label: {
            en: 'Present his inspiring story at the district Children\'s Rights Assembly',
            hi: 'जिला बाल अधिकार सभा में उसकी प्रेरक कहानी प्रस्तुत करें',
            kn: 'ಜಿಲ್ಲಾ ಮಕ್ಕಳ ಹಕ್ಕುಗಳ ಸಭೆಯಲ್ಲಿ ಅವನ ಸ್ಪೂರ್ತಿದಾಯಕ ಕಥೆಯನ್ನು ಪ್ರಸ್ತುತಪಡಿಸಿ',
          },
          next: 'ending_gold_labour',
          xp: 25,
          propIcon: '🏆',
        },
      ],
    },

    classroom_welcome_back: {
      stage: 3,
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'filledDesk', x: 140, y: 260 },
        { p: 'seedlingPot', x: 300, y: 260 },
      ],
      text: {
        en: 'Raju walks through the classroom doors in a neat blue uniform, holding new notebooks. His eyes shine with ambition: "I will never touch a factory spindle again. My hands are made for pens and books!"',
        hi: 'राजू नीली यूनिफॉर्म और नई कॉपियों के साथ कक्षा में प्रवेश करता है। उसकी आँखों में आत्मविश्वास चमकता है: "अब मैं कभी कारखाने में काम नहीं करूंगा। मेरे हाथ कलम और किताबों के लिए हैं!"',
        kn: 'ರಾಜು ನೀಲಿ ಸಮವಸ್ತ್ರ ಧರಿಸಿ ಹೆಮ್ಮೆಯಿಂದ ತರಗತಿಗೆ ಪ್ರವೇಶಿಸುತ್ತಾನೆ: "ನನ್ನ ಕೈಗಳು ಇರುವುದು ಲೇಖನಿ ಮತ್ತು ಪುಸ್ತಕಗಳಿಗಾಗಿ!" ಎಂದು ಹೇಳುತ್ತಾನೆ.',
      },
      choices: [
        {
          label: {
            en: 'Advocate for a child-labour-free village declaration across all local shops and farms',
            hi: 'सभी दुकानों और खेतों में बाल श्रम मुक्त गांव की घोषणा के लिए अभियान चलाएं',
            kn: 'ಎಲ್ಲಾ ಅಂಗಡಿ ಮತ್ತು ಹೊಲಗಳಲ್ಲಿ ಬಾಲ ಕಾರ್ಮಿಕ ಮುಕ್ತ ಗ್ರಾಮ ಘೋಷಣೆಗೆ ಅಭಿಯಾನ ನಡೆಸಿ',
          },
          next: 'ending_gold_labour',
          xp: 25,
          propIcon: '🏆',
        },
        {
          label: {
            en: 'Celebrate Raju\'s triumph and study together for the upcoming science exhibition',
            hi: 'राजू की वापसी का जश्न मनाएं और विज्ञान प्रदर्शनी के लिए साथ मिलकर प्रोजेक्ट बनाएं',
            kn: 'ರಾಜುವಿನ ಯಶಸ್ಸನ್ನು ಸಂಭ್ರಮಿಸಿ ವಿಜ್ಞಾನ ಪ್ರದರ್ಶನಕ್ಕಾಗಿ ಒಟ್ಟಿಗೆ ಓದಿ',
          },
          next: 'ending_silver_labour',
          xp: 20,
          propIcon: '🥈',
        },
      ],
    },

    // ── ENDINGS ──
    ending_gold_labour: {
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
      badgeIcon: '🛡️',
      bonusXp: 50,
      text: {
        en: 'Gold Ending — Freedom to Learn! You rescued Raju from hazardous child labour, held illegal employers accountable, and created a systemic monitoring system. Your village is declared an official "Child Labour Free Zone" where every child is in school.',
        hi: 'स्वर्ण परिणाम — सीखने की स्वतंत्रता! आपने न केवल राजू को बाल श्रम से बचाया, बल्कि दोषी नियोक्ताओं पर कार्रवाई कराई। आपका गांव आधिकारिक रूप से "बाल श्रम मुक्त क्षेत्र" घोषित हुआ।',
        kn: 'ಚಿನ್ನದ ಮುಕ್ತಾಯ — ಕಲಿಯುವ ಸ್ವಾತಂತ್ರ್ಯ! ನೀವು ರಾಜುವನ್ನು ಬಾಲ ಕಾರ್ಮಿಕತೆಯಿಂದ ರಕ್ಷಿಸಿ, ನಿಮ್ಮ ಗ್ರಾಮವನ್ನು ಅಧಿಕೃತ "ಬಾಲ ಕಾರ್ಮಿಕ ಮುಕ್ತ ವಲಯ" ವನ್ನಾಗಿ ಮಾಡಿದ್ದೀರಿ.',
      },
    },

    ending_silver_labour: {
      stage: 4,
      end: true,
      outcome: 'strong',
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'filledDesk', x: 150, y: 260 }],
      badge: 'Labour Rights Defender',
      badgeIcon: '🎒',
      bonusXp: 40,
      text: {
        en: 'Silver Ending — Reclaimed Childhood! Raju is back in school, thriving in mathematics, and his family is supported through legitimate government livelihood programs.',
        hi: 'रजत परिणाम — बचपन की वापसी! राजू स्कूल वापस आ गया है और उसका परिवार सरकारी आजीविका योजनाओं से सुरक्षित है।',
        kn: 'ಬೆಳ್ಳಿ ಮುಕ್ತಾಯ — ಬಾಲ್ಯದ ಮರಳುವಿಕೆ! ರಾಜು ಶಾಲೆಗೆ ಮರಳಿ ಗಣಿತದಲ್ಲಿ ಮುಂಚೂಣಿಯಲ್ಲಿದ್ದಾನೆ.',
      },
    },

    ending_bronze_individual_labour: {
      stage: 4,
      end: true,
      outcome: 'medium',
      mood: 'hopeful',
      location: 'village',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'home', x: 120, y: 200 }],
      badge: 'Vigilant Friend',
      badgeIcon: '🌿',
      bonusXp: 25,
      text: {
        en: 'Bronze Ending — Safe but Fragile. Raju was rescued, but periodic monitoring is necessary to ensure other children in nearby brick kilns and workshops are also identified and freed.',
        hi: 'कांस्य परिणाम — आंशिक सुरक्षा। राजू को तो बचा लिया गया, लेकिन पास के ईंट-भट्ठों में काम करने वाले अन्य बच्चों की सुरक्षा के लिए निरंतर निगरानी आवश्यक है।',
        kn: 'ಕಂಚಿನ ಮುಕ್ತಾಯ — ಭಾಗಶಃ ರಕ್ಷಣೆ. ರಾಜು ರಕ್ಷಿಸಲ್ಪಟ್ಟಿದ್ದಾನೆ, ಆದರೆ ಇತರೆ ಮಕ್ಕಳ ರಕ್ಷಣೆಗಾಗಿ ನಿರಂತರ ನಿಗಾ ಅಗತ್ಯ.',
      },
    },

    ending_weak_labour: {
      stage: 4,
      end: true,
      outcome: 'weak',
      mood: 'sad',
      location: 'factory',
      timeOfDay: 'evening',
      sceneObjects: [{ p: 'factory', x: 120, y: 180 }],
      badge: 'Lost Ambition Warning',
      badgeIcon: '💔',
      bonusXp: 5,
      text: {
        en: 'Weak Ending — Childhood Stolen. Silence and inaction allowed exploitation to continue. Remember: Childline 1098 and the Child Labour Act exist so no child is forced to trade their childhood for survival.',
        hi: 'कमजोर परिणाम — छीना हुआ बचपन। चुप्पी और निष्क्रियता के कारण शोषण जारी रहा। याद रखें: चाइल्डलाइन 1098 इसीलिए है ताकि किसी बच्चे का बचपन न छीना जाए।',
        kn: 'ಹಿನ್ನಡೆಯ ಮುಕ್ತಾಯ — ಕಳೆದುಹೋದ ಬಾಲ್ಯ. ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಗೆ ಕರೆ ಮಾಡಿ ಪ್ರತಿಯೊಂದು ಮಗುವನ್ನು ರಕ್ಷಿಸುವುದು ನಮ್ಮ ಕರ್ತವ್ಯ.',
      },
    },
  },
  quiz: [
    {
      question: {
        en: 'Under the Child Labour (Prohibition and Regulation) Amendment Act 2016, employment of children below what age is completely prohibited in all occupations?',
        hi: 'बाल श्रम संशोधन अधिनियम 2016 के तहत, किस आयु से कम उम्र के बच्चों का किसी भी व्यवसाय में काम करना पूरी तरह प्रतिबंधित है?',
        kn: 'ಬಾಲ ಕಾರ್ಮಿಕ ನಿಷೇಧ ಕಾಯ್ದೆ 2016 ರ ಪ್ರಕಾರ ಯಾವ ವಯಸ್ಸಿಗಿಂತ ಕೆಳಗಿನ ಮಕ್ಕಳು ಯಾವುದೇ ಉದ್ಯೋಗದಲ್ಲಿ ಕೆಲಸ ಮಾಡುವುದು ಸಂಪೂರ್ಣ ನಿಷಿದ್ಧ?',
      },
      options: [
        { en: 'Below 14 years', hi: '14 वर्ष से कम', kn: '14 ವರ್ಷಕ್ಕಿಂತ ಕಡಿಮೆ' },
        { en: 'Below 18 years in non-hazardous work', hi: 'गैर-खतरनाक काम में 18 से कम', kn: 'ಅಪಾಯಕಾರಿಯಲ್ಲದ ಕೆಲಸದಲ್ಲಿ 18 ಕ್ಕಿಂತ ಕಡಿಮೆ' },
        { en: 'Only during holidays', hi: 'केवल छुट्टियों में', kn: 'ಕೇವಲ ರಜಾದಿನಗಳಲ್ಲಿ' },
      ],
      correctIndex: 0,
      explanation: {
        en: 'The 2016 Act completely bans the employment of children below 14 years in all commercial establishments.',
        hi: '2016 का कानून 14 वर्ष से कम आयु के बच्चों के किसी भी व्यावसायिक प्रतिष्ठान में काम करने पर पूर्ण प्रतिबंध लगाता है।',
        kn: '2016 ರ ಕಾಯ್ದೆಯು 14 ವರ್ಷದೊಳಗಿನ ಮಕ್ಕಳನ್ನು ಯಾವುದೇ ವಾಣಿಜ್ಯ ಸಂಸ್ಥೆಗಳಲ್ಲಿ ಕೆಲಸಕ್ಕೆ ನೇಮಿಸುವುದನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಿಷೇಧಿಸುತ್ತದೆ.',
      },
    },
    {
      question: {
        en: 'If a child is found working in a hazardous factory or shop, who should be contacted immediately for free rescue and protection?',
        hi: 'यदि कोई बच्चा किसी खतरनाक कारखाने या दुकान में काम करता पाया जाए, तो मुफ्त बचाव और सुरक्षा के लिए तुरंत किससे संपर्क करना चाहिए?',
        kn: 'ಯಾವುದಾದರೂ ಮಗು ಅಪಾಯಕಾರಿ ಕಾರ್ಖಾನೆಯಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತಿದ್ದರೆ ತಕ್ಷಣ ಯಾರನ್ನು ಸಂಪರ್ಕಿಸಬೇಕು?',
      },
      options: [
        { en: 'The factory owner', hi: 'कारखाने के मालिक से', kn: 'ಕಾರ್ಖಾನೆಯ ಮಾಲೀಕರನ್ನು' },
        { en: 'Childline 1098 & District Child Welfare Committee (CWC)', hi: 'चाइल्डलाइन 1098 और बाल कल्याण समिति (CWC)', kn: 'ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಮತ್ತು ಬಾಲ ಕಲ್ಯಾಣ ಸಮಿತಿ (ಸಿಡಬ್ಲ್ಯೂಸಿ)' },
        { en: 'Wait until next year', hi: 'अगले साल तक प्रतीक्षा करें', kn: 'ಮುಂದಿನ ವರ್ಷದವರೆಗೆ ಕಾಯಿರಿ' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'Childline 1098 and the Child Welfare Committee (CWC) are legally mandated authorities to rescue and rehabilitate children.',
        hi: 'चाइल्डलाइन 1098 और बाल कल्याण समिति बच्चों के बचाव और पुनर्वास के लिए कानूनी रूप से अधिकृत संस्थाएं हैं।',
        kn: 'ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಸಮಿತಿಯು ಮಕ್ಕಳ ರಕ್ಷಣೆ ಮತ್ತು ಪುನರ್ವಸತಿಗೆ ಕಾನೂನುಬದ್ಧ ಸಂಸ್ಥೆಗಳಾಗಿವೆ.',
      },
    },
  ],
};
