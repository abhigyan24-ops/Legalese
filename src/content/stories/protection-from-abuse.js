/**
 * protection-from-abuse.js
 * 
 * Protection from Abuse (POCSO Act 2012) — Safe Boundaries, Trusted Adults & Childline 1098.
 * Age-appropriate, constructive, non-graphic child safety education.
 * All endings include non-dismissible resourceLink pointing to /resources.
 */

export default {
  id: 'protection-from-abuse',
  title: {
    en: 'Protection from Abuse (POCSO Act)',
    hi: 'दुर्व्यवहार से सुरक्षा (पॉक्सो कानून)',
    kn: 'ದೌರ್ಜನ್ಯದಿಂದ ರಕ್ಷಣೆ (ಪೋಕ್ಸೊ ಕಾಯ್ದೆ)',
  },
  startNode: 'start',
  stages: [
    { icon: '🛡️', label: 'Safe Boundaries' },
    { icon: '🗣️', label: 'Speaking Up' },
    { icon: '🤝', label: 'Trusted Adults' },
    { icon: '📞', label: 'Childline 1098' },
    { icon: '🕊️', label: 'Safe & Protected' },
  ],
  characters: {
    counselor: { name: 'Sister Rita', role: 'Child Protection Counselor' },
    tanya: { name: 'Tanya', role: 'Distressed Classmate' },
    teacher: { name: 'Mr. David', role: 'School Teacher' },
  },
  nodes: {
    start: {
      stage: 0,
      mood: 'worried',
      location: 'corridor',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'corridorPillars', x: 40, y: 100, args: [3] },
        { p: 'bench', x: 260, y: 240 },
      ],
      text: {
        en: 'During the school recess, you notice your 10-year-old friend Tanya crying quietly in the stairwell. She confides that an adult neighbor has been making uncomfortable requests and threatening her to keep it a secret.',
        hi: 'आधी छुट्टी के दौरान, आप अपनी 10 वर्षीय सहेली तान्या को सीढ़ियों पर रोते हुए देखते हैं। वह बताती है कि एक पड़ोसी अनुचित व्यवहार कर रहा है और किसी को न बताने की धमकी दे रहा है।',
        kn: 'ಶಾಲಾ ವಿರಾಮದ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ 10 ವರ್ಷದ ಗೆಳತಿ ತಾನ್ಯಾ ಮೆಟ್ಟಿಲುಗಳ ಬಳಿ ಅಳುತ್ತಿರುವುದನ್ನು ಕಾಣುತ್ತೀರಿ. ನೆರೆಹೊರೆಯ ವ್ಯಕ್ತಿಯೊಬ್ಬರು ಅನುಚಿತವಾಗಿ ವರ್ತಿಸಿ ರಹಸ್ಯವಾಗಿಡುವಂತೆ ಬೆದರಿಸುತ್ತಿದ್ದಾರೆ ಎಂದು ಅವಳು ಹೇಳುತ್ತಾಳೆ.',
      },
      didYouKnow: {
        en: 'Under the POCSO Act 2012, disclosing a victimized child’s name, school, or identity in any media is strictly illegal with mandatory jail terms. (Source: Ministry of Women & Child Development)',
        hi: 'पोक्सो अधिनियम 2012 के तहत, पीड़ित बच्चे का नाम, स्कूल या पहचान उजागर करना पूरी तरह अवैध है और इसमें जेल की सजा का प्रावधान है। (स्रोत: महिला एवं बाल विकास मंत्रालय)',
        kn: 'ಪೋಕ್ಸೋ ಕಾಯ್ದೆ 2012 ರ ಪ್ರಕಾರ ಸಂತ್ರಸ್ತ ಮಗುವಿನ ಹೆಸರು ಅಥವಾ ಶಾಲೆಯ ಗುರುತನ್ನು ಬಹಿರಂಗಪಡಿಸುವುದು ಕಠಿಣ ಶಿಕ್ಷಾರ್ಹ ಅಪರಾಧವಾಗಿದೆ. (ಮೂಲ: ಮಹಿಳಾ ಮತ್ತು ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಸಚಿವಾಲಯ)',
      },
      choices: [
        {
          label: {
            en: 'Reassure Tanya that it is NOT her fault and encourage telling the school counselor',
            hi: 'तान्या को भरोसा दिलाएं कि यह उसकी गलती नहीं है और स्कूल काउंसलर को बताने के लिए कहें',
            kn: 'ಇದು ಅವಳ ತಪ್ಪಲ್ಲ ಎಂದು ಧೈರ್ಯ ತುಂಬಿ ಶಾಲಾ ಕೌನ್ಸಿಲರ್‌ಗೆ ತಿಳಿಸಲು ಪ್ರೇರೇಪಿಸಿ',
          },
          next: 'support_tanya_counselor',
          xp: 15,
          propIcon: '🤝',
        },
        {
          label: {
            en: 'Immediately dial Childline 1098 — India\'s free 24x7 emergency helpline for children',
            hi: 'तुरंत चाइल्डलाइन 1098 पर कॉल करें — बच्चों के लिए मुफ्त 24x7 हेल्पलाइन',
            kn: 'ತಕ್ಷಣವೇ ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಗೆ ಕರೆ ಮಾಡಿ — ಮಕ್ಕಳಿಗಾಗಿ ಉಚಿತ 24x7 ಸಹಾಯವಾಣಿ',
          },
          next: 'dial_childline_emergency',
          xp: 15,
          propIcon: '📞',
        },
        {
          label: {
            en: 'Tell Tanya to keep quiet and try to avoid the neighbour by taking long routes',
            hi: 'तान्या से कहें कि वह चुप रहे और लंबा रास्ता अपनाकर पड़ोसी से बचे',
            kn: 'ತಾನ್ಯಾಗೆ ಸುಮ್ಮನಿರಲು ಹೇಳಿ ದೂರದ ದಾರಿಯಲ್ಲಿ ಹೋಗಲು ಸಲಹೆ ನೀಡಿ',
          },
          next: 'silence_isolation_risk',
          xp: 2,
          risky: true,
          propIcon: '🤫',
        },
      ],
    },

    silence_isolation_risk: {
      stage: 0,
      mood: 'sad',
      location: 'street',
      timeOfDay: 'dusk',
      sceneObjects: [{ p: 'schoolGateClosed', x: 120, y: 80 }],
      text: {
        en: 'Silence never protects a child — it only empowers offenders. POCSO (Protection of Children from Sexual Offences Act 2012) mandates strict confidentiality and zero tolerance for threats. Telling a trusted adult is always the right step!',
        hi: 'चुप रहना कभी बच्चे की रक्षा नहीं करता। पॉक्सो कानून (POCSO Act 2012) गोपनीयता और सुरक्षा की पूरी गारंटी देता है। किसी भरोसेमंद बड़े को बताना हमेशा सही कदम है!',
        kn: 'ಮೌನ ಎಂದಿಗೂ ಮಗುವನ್ನು ರಕ್ಷಿಸುವುದಿಲ್ಲ. ಪೋಕ್ಸೊ ಕಾಯ್ದೆಯು ಮಗುವಿನ ರಕ್ಷಣೆಗೆ ಸಂಪೂರ್ಣ ಭರವಸೆ ನೀಡುತ್ತದೆ. ವಿಶ್ವಾಸಾರ್ಹ ವ್ಯಕ್ತಿಗೆ ತಿಳಿಸುವುದೇ ಸರಿಯಾದ ಮಾರ್ಗ!',
      },
      choices: [
        {
          label: {
            en: 'Correct your mistake immediately and walk with Tanya to the school counselor',
            hi: 'तुरंत अपनी भूल सुधारें और तान्या के साथ स्कूल काउंसलर के पास जाएं',
            kn: 'ತಕ್ಷಣ ತಪ್ಪನ್ನು ಸರಿಪಡಿಸಿ ತಾನ್ಯಾಳ ಜೊತೆ ಕೌನ್ಸಿಲರ್ ಬಳಿಗೆ ತೆರಳಿ',
          },
          next: 'support_tanya_counselor',
          xp: 12,
          propIcon: '🏃',
        },
        {
          label: {
            en: 'Call Childline 1098 alongside a trusted teacher',
            hi: 'एक भरोसेमंद शिक्षक के साथ मिलकर चाइल्डलाइन 1098 पर कॉल करें',
            kn: 'ವಿಶ್ವಾಸಾರ್ಹ ಶಿಕ್ಷಕರೊಂದಿಗೆ ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಗೆ ಕರೆ ಮಾಡಿ',
          },
          next: 'dial_childline_emergency',
          xp: 12,
          propIcon: '📞',
        },
        {
          label: {
            en: 'Remain fearful and do nothing',
            hi: 'डर कर कुछ न करें',
            kn: 'ಹೆದರಿ ಸುಮ್ಮನಾಗಿ',
          },
          next: 'ending_weak_abuse',
          xp: 1,
          risky: true,
          propIcon: '❌',
        },
      ],
    },

    support_tanya_counselor: {
      stage: 1,
      mood: 'hopeful',
      location: 'office',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'teacherDesk', x: 100, y: 220 },
        { p: 'rtePamphlet', x: 260, y: 240 },
      ],
      text: {
        en: 'Sister Rita listens with utmost compassion in a private counseling room. "You are completely safe here, Tanya. Under POCSO, child statements are recorded confidentially in child-friendly environments, without police uniforms."',
        hi: 'सिस्टर रीटा ने निजी कमरे में बहुत संवेदनशीलता से बात सुनी। "तान्या, तुम यहाँ पूरी तरह सुरक्षित हो। पॉक्सो के तहत बच्चों के बयान बिना पुलिस वर्दी के, बाल-मित्र वातावरण में गोपनीय रूप से दर्ज होते हैं।"',
        kn: 'ಸಿಸ್ಟರ್ ರೀಟಾ ಕೌನ್ಸಿಲಿಂಗ್ ಕೋಣೆಯಲ್ಲಿ ಸಾಂತ್ವನ ನೀಡುತ್ತಾರೆ. "ತಾನ್ಯಾ, ನೀನು ಸಂಪೂರ್ಣ ಸುರಕ್ಷಿತವಾಗಿದ್ದೀಯ. ಪೋಕ್ಸೊ ಕಾಯ್ದೆಯಡಿ ಮಕ್ಕಳ ಹೇಳಿಕೆಗಳನ್ನು ಗೌಪ್ಯವಾಗಿ ದಾಖಲಿಸಲಾಗುತ್ತದೆ."',
      },
      choices: [
        {
          label: {
            en: 'Assist the counselor in notifying the District Child Welfare Committee (CWC)',
            hi: 'जिला बाल कल्याण समिति (CWC) को सूचित करने में काउंसलर की मदद करें',
            kn: 'ಜಿಲ್ಲಾ ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಸಮಿತಿಗೆ (CWC) ಮಾಹಿತಿ ನೀಡಲು ಕೌನ್ಸಿಲರ್‌ಗೆ ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'cwc_protection_order',
          xp: 18,
          propIcon: '🏛️',
        },
        {
          label: {
            en: 'Help Tanya\'s parents understand that believing and supporting their child is paramount',
            hi: 'तान्या के माता-पिता को समझाएं कि अपने बच्चे पर विश्वास करना सबसे महत्वपूर्ण है',
            kn: 'ಮಗುವನ್ನು ನಂಬಿ ಬೆಂಬಲಿಸುವುದು ಅತ್ಯಂತ ಮುಖ್ಯ ಎಂದು ತಾನ್ಯಾಳ ಪೋಷಕರಿಗೆ ತಿಳಿಸಿ',
          },
          next: 'parents_empowerment',
          xp: 18,
          propIcon: '👨‍👩‍👧',
        },
        {
          label: {
            en: 'Share the incident with other students as classroom gossip',
            hi: 'इस घटना को अन्य छात्रों के साथ गपशप की तरह साझा करें',
            kn: 'ಈ ಘಟನೆಯನ್ನು ಇತರ ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ಹರಟೆಯಾಗಿ ಹಂಚಿಕೊಳ್ಳಿ',
          },
          next: 'breach_of_privacy_warning',
          xp: 2,
          risky: true,
          propIcon: '⚠️',
        },
      ],
    },

    breach_of_privacy_warning: {
      stage: 1,
      mood: 'worried',
      location: 'classroom',
      timeOfDay: 'dusk',
      sceneObjects: [{ p: 'document', x: 200, y: 220 }],
      text: {
        en: 'Section 23 of the POCSO Act strictly forbids disclosing a child\'s identity or details in public or media. Privacy and dignity are fundamental rights of every survivor.',
        hi: 'पॉक्सो कानून की धारा 23 किसी भी बच्चे की पहचान या विवरण को सार्वजनिक करने पर सख्त रोक लगाती है। गोपनीयता और गरिमा हर बच्चे का मौलिक अधिकार है।',
        kn: 'ಪೋಕ್ಸೊ ಕಾಯ್ದೆಯ ಸೆಕ್ಷನ್ 23 ರ ಪ್ರಕಾರ ಮಗುವಿನ ಗುರುತನ್ನು ಬಹಿರಂಗಪಡಿಸುವುದು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ. ಗೌಪ್ಯತೆ ಪ್ರತಿಯೊಂದು ಮಗುವಿನ ಹಕ್ಕು.',
      },
      choices: [
        {
          label: {
            en: 'Stop all discussions, uphold strict confidentiality, and focus on supporting Tanya',
            hi: 'सभी चर्चाएं बंद करें, पूर्ण गोपनीयता बनाए रखें और तान्या का समर्थन करें',
            kn: 'ಎಲ್ಲಾ ಚರ್ಚೆಗಳನ್ನು ನಿಲ್ಲಿಸಿ ಸಂಪೂರ್ಣ ಗೌಪ್ಯತೆಯನ್ನು ಕಾಪಾಡಿ',
          },
          next: 'cwc_protection_order',
          xp: 12,
          propIcon: '🛡️',
        },
        {
          label: {
            en: 'Join the school\'s "Komal" safe touch and personal boundary workshop',
            hi: 'स्कूल की "कोमल" सुरक्षित स्पर्श (Safe Touch) कार्यशाला में भाग लें',
            kn: 'ಶಾಲೆಯ ಸುರಕ್ಷಿತ ಸ್ಪರ್ಶ ಮತ್ತು ಗಡಿಗಳ ಕಾರ್ಯಾಗಾರದಲ್ಲಿ ಭಾಗವಹಿಸಿ',
          },
          next: 'safe_boundaries_education',
          xp: 15,
          propIcon: '📚',
        },
      ],
    },

    dial_childline_emergency: {
      stage: 2,
      mood: 'hopeful',
      location: 'office',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'document', x: 180, y: 220 }],
      text: {
        en: 'Childline 1098 coordinator answers instantly. Within minutes, a Special Juvenile Police Unit (SJPU) female officer in plain clothes is coordinated to ensure immediate security and emotional support.',
        hi: 'चाइल्डलाइन 1098 समन्वयक ने तुरंत जवाब दिया। कुछ ही मिनटों में सादे कपड़ों में एक महिला बाल पुलिस अधिकारी सुरक्षा और सहायता के लिए पहुंची।',
        kn: 'ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಸಂಯೋಜಕರು ತಕ್ಷಣ ಸ್ಪಂದಿಸುತ್ತಾರೆ. ಮಹಿಳಾ ಪೊಲೀಸ್ ಅಧಿಕಾರಿ ಸಾದಾ ಉಡುಪಿನಲ್ಲಿ ಬಂದು ತಾನ್ಯಾಳಿಗೆ ರಕ್ಷಣೆ ನೀಡುತ್ತಾರೆ.',
      },
      choices: [
        {
          label: {
            en: 'Facilitate safe counseling and legal protection with the Child Welfare Committee',
            hi: 'बाल कल्याण समिति के साथ सुरक्षित परामर्श और कानूनी सुरक्षा की व्यवस्था कराएं',
            kn: 'ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಸಮಿತಿಯೊಂದಿಗೆ ಸುರಕ್ಷಿತ ಸಮಾಲೋಚನೆ ಮತ್ತು ರಕ್ಷಣೆಯನ್ನು ಒದಗಿಸಿ',
          },
          next: 'cwc_protection_order',
          xp: 20,
          propIcon: '🏛️',
        },
        {
          label: {
            en: 'Lead a student campaign on "Safe Touch, Safe Spaces" across the school',
            hi: 'पूरे स्कूल में "सुरक्षित स्पर्श, सुरक्षित स्थान" पर छात्र अभियान का नेतृत्व करें',
            kn: 'ಶಾಲೆಯಾದ್ಯಂತ "ಸುರಕ್ಷಿತ ಸ್ಪರ್ಶ, ಸುರಕ್ಷಿತ ಸ್ಥಳ" ವಿದ್ಯಾರ್ಥಿ ಅಭಿಯಾನವನ್ನು ಮುನ್ನಡೆಸಿ',
          },
          next: 'safe_boundaries_education',
          xp: 20,
          propIcon: '🌟',
        },
      ],
    },

    cwc_protection_order: {
      stage: 2,
      mood: 'hopeful',
      location: 'office',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'committeeTable', x: 100, y: 200 },
        { p: 'document', x: 260, y: 220 },
      ],
      text: {
        en: 'The Child Welfare Committee (CWC) issues an emergency protection order and connects Tanya\'s family to free legal aid through the District Legal Services Authority (DLSA). The offender is detained under non-bailable POCSO sections.',
        hi: 'बाल कल्याण समिति (CWC) ने आपातकालीन सुरक्षा आदेश जारी किया और कानूनी सेवा प्राधिकरण (DLSA) के माध्यम से मुफ्त वकील उपलब्ध कराया। दोषी को गैर-जमानती धाराओं में हिरासत में लिया गया।',
        kn: 'ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಸಮಿತಿಯು (CWC) ತುರ್ತು ರಕ್ಷಣಾ ಆದೇಶವನ್ನು ಹೊರಡಿಸಿ, ಉಚಿತ ಕಾನೂನು ನೆರವು ನೀಡುತ್ತದೆ. ಆರೋಪಿಯನ್ನು ವಶಕ್ಕೆ ಪಡೆಯಲಾಗುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Support Tanya\'s psychological healing through regular art therapy and companionship',
            hi: 'आर्ट थेरेपी और सच्ची मित्रता के माध्यम से तान्या के मानसिक संबल में मदद करें',
            kn: 'ಕಲಾ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಸ್ನೇಹದ ಮೂಲಕ ತಾನ್ಯಾಳ ಮನೋಸ್ಥೈರ್ಯವನ್ನು ಹೆಚ್ಚಿಸಿ',
          },
          next: 'reclaimed_confidence',
          xp: 20,
          propIcon: '🎨',
        },
        {
          label: {
            en: 'Establish a permanent Complaint Box and Student Safety Committee in the school',
            hi: 'स्कूल में स्थायी शिकायत पेटी (Complaint Box) और छात्र सुरक्षा समिति स्थापित कराएं',
            kn: 'ಶಾಲೆಯಲ್ಲಿ ದೂರು ಪೆಟ್ಟಿಗೆ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ಸುರಕ್ಷತಾ ಸಮಿತಿಯನ್ನು ಸ್ಥಾಪಿಸಿ',
          },
          next: 'safe_boundaries_education',
          xp: 20,
          propIcon: '📮',
        },
      ],
    },

    parents_empowerment: {
      stage: 2,
      mood: 'hopeful',
      location: 'home',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'home', x: 120, y: 200 }],
      text: {
        en: 'Tanya\'s parents embrace her with unconditional love: "Thank you for speaking up. We will always stand by you." When families listen and believe their children, fear dissolves.',
        hi: 'तान्या के माता-पिता ने उसे गले लगाया: "अपनी बात बताने के लिए धन्यवाद। हम हमेशा तुम्हारे साथ हैं।" जब परिवार बच्चों की सुनते हैं, तो डर खत्म हो जाता है।',
        kn: 'ತಾನ್ಯಾಳ ಪೋಷಕರು ಪ್ರೀತಿಯಿಂದ ಅಪ್ಪಿಕೊಳ್ಳುತ್ತಾರೆ: "ಧೈರ್ಯವಾಗಿ ತಿಳಿಸಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು. ನಾವು ಸದಾ ನಿನ್ನ ಜೊತೆಗಿರುತ್ತೇವೆ." ಕುಟುಂಬಗಳು ಮಕ್ಕಳನ್ನು ನಂಬಿದಾಗ ಭಯ ಮಾಯವಾಗುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Celebrate Tanya\'s courageous recovery and creative talents in class',
            hi: 'तान्या की बहादुरी और रचनात्मक प्रतिभा का कक्षा में उत्साहवर्धन करें',
            kn: 'ತಾನ್ಯಾಳ ಧೈರ್ಯ ಮತ್ತು ಪ್ರತಿಭೆಯನ್ನು ತರಗತಿಯಲ್ಲಿ ಪ್ರೋತ್ಸಾಹಿಸಿ',
          },
          next: 'reclaimed_confidence',
          xp: 20,
          propIcon: '🌟',
        },
        {
          label: {
            en: 'Partner with the Panchayat to install CCTV and bright street lighting near school paths',
            hi: 'स्कूल के रास्तों पर सीसीटीवी और रोशनी लगवाने के लिए पंचायत से सहयोग लें',
            kn: 'ಶಾಲಾ ರಸ್ತೆಗಳಲ್ಲಿ ಸಿಸಿಟಿವಿ ಮತ್ತು ದೀಪಗಳನ್ನು ಅಳವಡಿಸಲು ಪಂಚಾಯತ್ ಜೊತೆ ಕೈಜೋಡಿಸಿ',
          },
          next: 'safe_boundaries_education',
          xp: 20,
          propIcon: '💡',
        },
      ],
    },

    safe_boundaries_education: {
      stage: 3,
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'blackboard', x: 80, y: 60 },
        { p: 'notebooksOut', x: 220, y: 240 },
      ],
      text: {
        en: 'The school holds an interactive safety session: students learn the "NO-GO-TELL" rule (Say NO, GO away immediately, and TELL a trusted adult). Every child receives the 1098 emergency card.',
        hi: 'स्कूल में सुरक्षा सत्र आयोजित हुआ: छात्रों ने "ना कहो - दूर जाओ - बताओ" (NO-GO-TELL) का नियम सीखा। हर बच्चे को 1098 आपातकालीन कार्ड दिया गया।',
        kn: 'ಶಾಲೆಯಲ್ಲಿ ಸುರಕ್ಷತಾ ತರಬೇತಿ ನಡೆಯುತ್ತದೆ: ವಿದ್ಯಾರ್ಥಿಗಳು "ಹೇಳಿ-ತೆರಳಿ-ತಿಳಿಸಿ" (NO-GO-TELL) ನಿಯಮವನ್ನು ಕಲಿಯುತ್ತಾರೆ. ಪ್ರತಿಯೊಬ್ಬರಿಗೂ 1098 ಸಹಾಯವಾಣಿ ಕಾರ್ಡ್ ನೀಡಲಾಗುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Deliver the closing speech on Child Dignity and Bodily Autonomy under POCSO',
            hi: 'पॉक्सो कानून के तहत बाल गरिमा और शारीरिक स्वायत्तता पर समापन भाषण दें',
            kn: 'ಪೋಕ್ಸೊ ಕಾಯ್ದೆಯಡಿ ಮಕ್ಕಳ ಘನತೆ ಮತ್ತು ಸುರಕ್ಷತೆಯ ಬಗ್ಗೆ ಸಮಾರೋಪ ಭಾಷಣ ಮಾಡಿ',
          },
          next: 'ending_gold_pocso',
          xp: 25,
          propIcon: '🏆',
        },
        {
          label: {
            en: 'Congratulate Tanya as she presents her prize-winning painting at the art fair',
            hi: 'तान्या को कला मेले में उसकी प्रथम पुरस्कार विजेता पेंटिंग के लिए बधाई दें',
            kn: 'ಕಲಾ ಮೇಳದಲ್ಲಿ ಪ್ರಥಮ ಬಹುಮಾನ ಪಡೆದ ತಾನ್ಯಾಳನ್ನು ಅಭಿನಂದಿಸಿ',
          },
          next: 'reclaimed_confidence',
          xp: 20,
          propIcon: '🎨',
        },
      ],
    },

    reclaimed_confidence: {
      stage: 3,
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'filledDesk', x: 140, y: 260 },
        { p: 'seedlingPot', x: 300, y: 260 },
      ],
      text: {
        en: 'Tanya smiles freely, her confidence fully restored. She leads the morning school assembly: "No child should ever feel afraid to speak up. Our bodies and our rights belong to us!"',
        hi: 'तान्या खुलकर मुस्कुराती है, उसका आत्मविश्वास पूरी तरह लौट आया है। वह प्रार्थना सभा में कहती है: "किसी भी बच्चे को अपनी बात कहने से डरना नहीं चाहिए। हमारे अधिकार हमारे हैं!"',
        kn: 'ತಾನ್ಯಾಳ ಮುಖದಲ್ಲಿ ನಗು ಮತ್ತು ಆತ್ಮವಿಶ್ವಾಸ ಮರಳಿದೆ. "ಯಾವುದೇ ಮಗು ಧ್ವನಿ ಎತ್ತಲು ಹೆದರಬಾರದು. ನಮ್ಮ ದೇಹ ಮತ್ತು ಹಕ್ಕುಗಳು ನಮ್ಮವು!" ಎಂದು ಅವಳು ಶಾಲಾ ಸಭೆಯಲ್ಲಿ ಹೇಳುತ್ತಾಳೆ.',
      },
      choices: [
        {
          label: {
            en: 'Establish the school as an accredited Child-Safe Zone',
            hi: 'स्कूल को एक प्रमाणित बाल-सुरक्षित क्षेत्र (Child-Safe Zone) बनाएं',
            kn: 'ಶಾಲೆಯನ್ನು ಅಧಿಕೃತ ಮಕ್ಕಳ-ಸುರಕ್ಷಿತ ವಲಯವನ್ನಾಗಿ ರೂಪಿಸಿ',
          },
          next: 'ending_gold_pocso',
          xp: 25,
          propIcon: '🏆',
        },
        {
          label: {
            en: 'Share the Childline 1098 number with all junior classes',
            hi: 'सभी छोटी कक्षाओं के साथ चाइल्डलाइन 1098 नंबर साझा करें',
            kn: 'ಕಿರಿಯ ತರಗತಿಗಳ ಎಲ್ಲ ಮಕ್ಕಳೊಂದಿಗೆ ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಸಂಖ್ಯೆಯನ್ನು ಹಂಚಿಕೊಳ್ಳಿ',
          },
          next: 'ending_silver_pocso',
          xp: 20,
          propIcon: '🥈',
        },
      ],
    },

    // ── ENDINGS (Non-dismissible Childline 1098 link) ──
    ending_gold_pocso: {
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
      badge: 'Safety Champion',
      badgeIcon: '🛡️',
      bonusXp: 50,
      resourceLink: '/resources?topic=abuse',
      text: {
        en: 'Gold Ending — Shield of Courage! By speaking up, utilizing Childline 1098, and invoking the POCSO Act, you protected Tanya and transformed your school into a beacon of child safety. Remember: If you or anyone you know ever needs help, call Childline 1098 anytime.',
        hi: 'स्वर्ण परिणाम — साहस की ढाल! चाइल्डलाइन 1098 और पॉक्सो कानून की मदद से आपने तान्या की रक्षा की और अपने स्कूल को सुरक्षित बनाया। याद रखें: किसी भी सहायता के लिए कभी भी 1098 पर कॉल करें।',
        kn: 'ಚಿನ್ನದ ಮುಕ್ತಾಯ — ಧೈರ್ಯದ ಕವಚ! ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಮತ್ತು ಪೋಕ್ಸೊ ಕಾಯ್ದೆಯ ನೆರವಿನಿಂದ ನೀವು ತಾನ್ಯಾಳನ್ನು ರಕ್ಷಿಸಿ ಶಾಲೆಯನ್ನು ಸುರಕ್ಷಿತ ತಾಣವಾಗಿಸಿದ್ದೀರಿ. ಸಹಾಯಕ್ಕಾಗಿ ಸದಾ 1098 ಗೆ ಕರೆ ಮಾಡಿ.',
      },
    },

    ending_silver_pocso: {
      stage: 4,
      end: true,
      outcome: 'strong',
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'filledDesk', x: 150, y: 260 }],
      badge: 'Trusted Guardian',
      badgeIcon: '🤝',
      bonusXp: 40,
      resourceLink: '/resources?topic=abuse',
      text: {
        en: 'Silver Ending — Voice Restored! Tanya is safe and supported by loving adults. Never hesitate to report concerns to Childline 1098.',
        hi: 'रजत परिणाम — आवाज की जीत! तान्या सुरक्षित है। किसी भी चिंता के लिए चाइल्डलाइन 1098 पर संपर्क करने में कभी न हिचकिचाएं।',
        kn: 'ಬೆಳ್ಳಿ ಮುಕ್ತಾಯ — ಸುರಕ್ಷತೆಯ ಜಯ! ತಾನ್ಯಾ ಸುರಕ್ಷಿತವಾಗಿದ್ದಾಳೆ. ಯಾವುದೇ ಆತಂಕವಿದ್ದಲ್ಲಿ ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಗೆ ಕರೆ ಮಾಡಿ.',
      },
    },

    ending_weak_abuse: {
      stage: 4,
      end: true,
      outcome: 'weak',
      mood: 'sad',
      location: 'corridor',
      timeOfDay: 'evening',
      sceneObjects: [{ p: 'emptyDesk', x: 120, y: 280, args: [true] }],
      badge: 'Break the Silence Alert',
      badgeIcon: '💔',
      bonusXp: 5,
      resourceLink: '/resources?topic=abuse',
      text: {
        en: 'Weak Ending — Silence Causes Harm. Child protection laws only work when we break the silence. If you or a friend ever face discomfort or abuse, immediately talk to a trusted adult or call Childline 1098 (toll-free 24/7).',
        hi: 'कमजोर परिणाम — चुप्पी नुकसान पहुंचाती है। बाल संरक्षण कानून तभी काम करते हैं जब हम आवाज उठाते हैं। किसी भी परेशानी में तुरंत 1098 पर कॉल करें।',
        kn: 'ಹಿನ್ನಡೆಯ ಮುಕ್ತಾಯ — ಮೌನ ಹಾನಿಕಾರಕ. ಯಾವುದೇ ಸಂಕಷ್ಟದಲ್ಲೂ ತಕ್ಷಣ ಚೈಲ್ಡ್‌ಲೈನ್ 1098 ಗೆ ಕರೆ ಮಾಡಿ.',
      },
    },
  },
  quiz: [
    {
      question: {
        en: 'Under the POCSO Act 2012, if a child reports uncomfortable or inappropriate touch, is the child ever blamed or in trouble?',
        hi: 'पोक्सो अधिनियम 2012 के तहत, यदि कोई बच्चा असहज या अनुचित स्पर्श की सूचना देता है, तो क्या बच्चे को कभी दोषी ठहराया जा सकता है?',
        kn: 'ಪೋಕ್ಸೋ ಕಾಯ್ದೆ 2012 ರ ಅಡಿಯಲ್ಲಿ, ಮಗು ಅಸಹಜ ಸ್ಪರ್ಶದ ಬಗ್ಗೆ ದೂರು ನೀಡಿದರೆ ಮಗುವನ್ನು ದೂಷಿಸಬಹುದೇ?',
      },
      options: [
        { en: 'Yes, children must not speak up', hi: 'हाँ, बच्चों को चुप रहना चाहिए', kn: 'ಹೌದು, ಮಕ್ಕಳು ಮಾತನಾಡಬಾರದು' },
        { en: 'Never — the child is always protected with absolute confidentiality', hi: 'कभी नहीं — बच्चे को हमेशा पूर्ण गोपनीयता और सुरक्षा दी जाती है', kn: 'ಖಂಡಿತ ಇಲ್ಲ — ಮಗುವಿಗೆ ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ ಮತ್ತು ಗೌಪ್ಯತೆ ನೀಡಲಾಗುತ್ತದೆ' },
        { en: 'Only if there is written proof', hi: 'केवल अगर लिखित सबूत हो', kn: 'ಕೇವಲ ಲಿಖಿತ ಪುರಾವೆ ಇದ್ದರೆ ಮಾತ್ರ' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'The POCSO Act strictly protects the child, ensures identity confidentiality, and holds only perpetrators accountable.',
        hi: 'पोक्सो कानून पूरी तरह से बच्चे की रक्षा करता है, पहचान गोपनीय रखता है और केवल अपराधियों को जवाबदेह ठहराता है।',
        kn: 'ಪೋಕ್ಸೋ ಕಾಯ್ದೆಯು ಮಗುವಿನ ಗುರುತನ್ನು ಗೌಪ್ಯವಾಗಿಟ್ಟು ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ ಒದಗಿಸುತ್ತದೆ.',
      },
    },
    {
      question: {
        en: 'What is India’s free 24/7 emergency child emergency helpline number?',
        hi: 'भारत का 24/7 मुफ्त आपातकालीन बाल हेल्पलाइन नंबर क्या है?',
        kn: 'ಭಾರತದ 24/7 ಉಚಿತ ತುರ್ತು ಮಕ್ಕಳ ಸಹಾಯವಾಣಿ ಸಂಖ್ಯೆ ಯಾವುದು?',
      },
      options: [
        { en: '1098 (Childline)', hi: '1098 (चाइल्डलाइन)', kn: '1098 (ಚೈಲ್ಡ್‌ಲೈನ್)' },
        { en: '1000', hi: '1000', kn: '1000' },
        { en: '1234', hi: '1234', kn: '1234' },
      ],
      correctIndex: 0,
      explanation: {
        en: '1098 is India’s toll-free 24-hour emergency phone service for children in need of care and protection.',
        hi: '1098 देखभाल और सुरक्षा की आवश्यकता वाले बच्चों के लिए भारत की 24 घंटे की मुफ्त आपातकालीन सेवा है।',
        kn: '1098 ತುರ್ತು ರಕ್ಷಣೆ ಮತ್ತು ನೆರವು ಬಯಸುವ ಮಕ್ಕಳಿಗಾಗಿ ಭಾರತದ 24 ಗಂಟೆಗಳ ಉಚಿತ ಸಹಾಯವಾಣಿಯಾಗಿದೆ.',
      },
    },
  ],
};
