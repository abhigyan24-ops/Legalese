/**
 * Senior Story: Protection from Abuse & Cyber Harassment (Ages 12–16)
 * Topic: POCSO Act 2012 (Sections 11, 12, 19, 21) & DPDP Act 2023 (Digital Consent & Safe Reporting)
 */

export default {
  id: 'protection-from-abuse',
  track: 'senior',
  ageTier: '12-16',
  title: {
    en: 'Cyber Safety & The POCSO Shield',
    hi: 'साइबर सुरक्षा और पॉक्सो सुरक्षा कवच',
    kn: 'ಸೈಬರ್ ಸುರಕ್ಷತೆ ಮತ್ತು ಪೋಕ್ಸೋ ರಕ್ಷಾ ಕವಚ',
  },
  subtitle: {
    en: 'Protection from Online Harassment under POCSO Act 2012 & DPDP Act 2023',
    hi: 'पॉक्सो अधिनियम 2012 और डीपीडीपी अधिनियम 2023 के तहत ऑनलाइन उत्पीड़न से सुरक्षा',
    kn: 'ಪೋಕ್ಸೋ ಕಾಯ್ದೆ 2012 ಮತ್ತು ಡಿಜಿಟಲ್ ಡೇಟಾ ರಕ್ಷಣಾ ಕಾಯ್ದೆಯಡಿ ಸುರಕ್ಷತೆ',
  },
  actTag: 'POCSO Act 2012',
  icon: '🛡️',
  startNode: 'cyber_incident',
  badge: {
    id: 'badge-senior-pocso',
    name: 'Cyber Shield Guardian',
    icon: '🛡️',
    article: 'POCSO Act 2012 & DPDP Act',
  },
  quiz: [
    {
      question: {
        en: 'Does the POCSO Act cover digital harassment, online grooming, and non-consensual image sharing?',
        hi: 'क्या पॉक्सो अधिनियम डिजिटल उत्पीड़न, ऑनलाइन ग्रूमिंग और बिना सहमति के फोटो साझा करने पर लागू होता है?',
        kn: 'ಪೋಕ್ಸೋ ಕಾಯ್ದೆಯು ಡಿಜಿಟಲ್ ಕಿರುಕುಳ, ಆನ್‌ಲೈನ್ ಬೆದರಿಕೆ ಮತ್ತು ಫೋಟೋ ದುರುಪಯೋಗವನ್ನು ಒಳಗೊಂಡಿದೆಯೇ?',
      },
      options: [
        { en: 'No, it only covers physical contact offences', hi: 'नहीं, यह केवल शारीरिक अपराधों को कवर करता है', kn: 'ಇಲ್ಲ, ಇದು ಕೇವಲ ದೈಹಿಕ ಅಪರಾಧಗಳಿಗೆ ಮಾತ್ರ ಸೀಮಿತ' },
        { en: 'Yes, Section 11 & 12 penalize all forms of digital and electronic harassment of minors', hi: 'हाँ, धारा 11 और 12 नाबालिगों के सभी प्रकार के डिजिटल उत्पीड़न को दंडित करती है', kn: 'ಹೌದು, ಕಲಂ 11 ಮತ್ತು 12 ರ ಅಡಿಯಲ್ಲಿ ಅಪ್ರಾಪ್ತರ ಮೇಲಿನ ಎಲ್ಲ ಬಗೆಯ ಡಿಜಿಟಲ್ ಕಿರುಕುಳಕ್ಕೆ ಕಠಿಣ ಶಿಕ್ಷೆ ಇದೆ' },
        { en: 'Only if the perpetrator is an adult living in the same state', hi: 'केवल तभी जब अपराधी उसी राज्य का वयस्क हो', kn: 'ಕೇವಲ ಸ್ಥಳೀಯ ವ್ಯಕ್ತಿಗಳಿಗೆ ಮಾತ್ರ' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'Sections 11 and 12 of the POCSO Act 2012 explicitly classify digital stalking, sexually explicit messages, and cyber harassment of children as severe non-bailable offences.',
        hi: 'पॉक्सो अधिनियम 2012 की धारा 11 और 12 डिजिटल स्टॉकिंग और अश्लील संदेश भेजने को गैर-जमानती अपराध मानती है।',
        kn: 'ಪೋಕ್ಸೋ ಕಾಯ್ದೆಯ ಕಲಂ 11 ಮತ್ತು 12 ರ ಅಡಿಯಲ್ಲಿ ಆನ್‌ಲೈನ್ ಕಿರುಕುಳ ನೀಡುವುದು ಗಂಭೀರ ಜಾಮೀನುರಹಿತ ಅಪರಾಧವಾಗಿದೆ.',
      },
    },
    {
      question: {
        en: 'Is the identity of a minor reporting abuse legally protected under Indian law?',
        hi: 'क्या दुर्व्यवहार की रिपोर्ट करने वाले नाबालिग की पहचान भारतीय कानून के तहत सुरक्षित है?',
        kn: 'ದೂರು ನೀಡುವ ಅಪ್ರಾಪ್ತರ ಗುರುತನ್ನು ಭಾರತೀಯ ಕಾನೂನಿನಡಿ ರಹಸ್ಯವಾಗಿಡಲಾಗುತ್ತದೆಯೇ?',
      },
      options: [
        { en: 'Yes, Section 23 of POCSO strictly mandates complete confidentiality with severe penalties for media disclosure', hi: 'हाँ, धारा 23 पहचान उजागर करने पर सख्त प्रतिबंध और सजा का प्रावधान करती है', kn: 'ಹೌದು, ಕಲಂ 23 ರ ಪ್ರಕಾರ ಸಂತ್ರಸ್ತರ ಗುರುತನ್ನು ಬಹಿರಂಗಪಡಿಸುವುದು ಶಿಕ್ಷಾರ್ಹ ಅಪರಾಧ' },
        { en: 'No, public police records must display the names', hi: 'नहीं, सार्वजनिक रिकॉर्ड में नाम होना जरूरी है', kn: 'ಇಲ್ಲ, ಸಾರ್ವಜನಿಕ ದಾಖಲೆಗಳಲ್ಲಿ ಹೆಸರು ಪ್ರಕಟಿಸಲಾಗುತ್ತದೆ' },
        { en: 'Only if requested by a high-ranking official', hi: 'केवल तभी जब किसी उच्च अधिकारी द्वारा अनुरोध किया जाए', kn: 'ಕೇವಲ ವಿಶೇಷ ಆದೇಶವಿದ್ದಾಗ ಮಾತ್ರ' },
      ],
      correctIndex: 0,
      explanation: {
        en: 'Section 23 of POCSO Act strictly prohibits disclosing the child’s identity, school, or location anywhere in public or media.',
        hi: 'धारा 23 बच्चे की पहचान, स्कूल या पते को सार्वजनिक या मीडिया में उजागर करने पर पूर्ण प्रतिबंध लगाती है।',
        kn: 'ಕಲಂ 23 ರ ಅಡಿಯಲ್ಲಿ ಮಗುವಿನ ಗುರುತು, ಶಾಲೆ ಅಥವಾ ವಿಳಾಸವನ್ನು ಬಹಿರಂಗಪಡಿಸುವುದನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಿಷೇಧಿಸಲಾಗಿದೆ.',
      },
    },
  ],
  nodes: {
    cyber_incident: {
      id: 'cyber_incident',
      characterPose: 'concerned',
      location: 'bedroom',
      mood: 'tense',
      timeOfDay: 'evening',
      text: {
        en: "14-year-old Tanya discovers an anonymous account on a social messaging group has shared doctored, inappropriate photos of her school classmates, demanding digital payments to remove them.",
        hi: "14 वर्षीय तान्या को पता चलता है कि एक सोशल मैसेजिंग ग्रुप पर एक अज्ञात खाते ने उसके सहपाठियों की एडिट की गई तस्वीरें साझा की हैं और उन्हें हटाने के लिए पैसों की मांग कर रहा है।",
        kn: "14 ವರ್ಷದ ತಾನ್ಯಾಗೆ ಸೋಷಿಯಲ್ ಮೀಡಿಯಾ ಗ್ರೂಪ್ ಒಂದರಲ್ಲಿ ಸಹಪಾಠಿಗಳ ಫೋಟೋಗಳನ್ನು ದುರುಪಯೋಗಪಡಿಸಿಕೊಂಡು ಹಣಕ್ಕಾಗಿ ಬ್ಲ್ಯಾಕ್‌ಮೇಲ್ ಮಾಡುತ್ತಿರುವುದು ತಿಳಿಯುತ್ತದೆ.",
      },
      didYouKnow: {
        en: 'Under POCSO Section 11/12 and IT Act Section 67B, non-consensual sharing of child imagery carries stringent imprisonment up to 5 years.',
        hi: 'पॉक्सो की धारा 11/12 और आईटी अधिनियम की धारा 67B के तहत नाबालिगों की तस्वीरें दुरुपयोग करने पर 5 साल तक की कैद हो सकती है।',
        kn: 'ಪೋಕ್ಸೋ ಕಲಂ 11/12 ಮತ್ತು ಐಟಿ ಕಾಯ್ದೆಯಡಿ ಮಕ್ಕಳ ಫೋಟೋ ದುರುಪಯೋಗಕ್ಕೆ 5 ವರ್ಷಗಳವರೆಗೆ ಕಠಿಣ ಜೈಲು ಶಿಕ್ಷೆ ಇದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Preserve digital screenshots as evidence and report to cybercrime.gov.in and Childline 1098',
            hi: 'साक्ष्य के रूप में स्क्रीनशॉट सुरक्षित रखें और cybercrime.gov.in व चाइल्डलाइन 1098 पर रिपोर्ट करें',
            kn: 'ಸ್ಕ್ರೀನ್‌ಶಾಟ್‌ಗಳನ್ನು ಸಾಕ್ಷಿಯಾಗಿ ಸಂಗ್ರಹಿಸಿ cybercrime.gov.in ಮತ್ತು 1098 ಕ್ಕೆ ವರದಿ ಮಾಡಿ',
          },
          target: 'statutory_reporting',
          xp: 15,
          type: 'strong',
        },
        {
          label: {
            en: 'Confide in the school cyber safety counsellor and trusted teachers',
            hi: 'स्कूल के साइबर सुरक्षा काउंसलर और शिक्षकों को विश्वास में लें',
            kn: 'ಶಾಲೆಯ ಸೈಬರ್ ಸುರಕ್ಷತಾ ಕೌನ್ಸಿಲರ್ ಮತ್ತು ಶಿಕ್ಷಕರಿಗೆ ಮಾಹಿತಿ ನೀಡಿ',
          },
          target: 'school_counselling',
          xp: 12,
          type: 'strong',
        },
        {
          label: {
            en: 'Hesitate out of fear that the victim will be blamed or exposed',
            hi: 'इस डर से हिचकिचाएं कि पीड़ित पर ही दोष लगाया जाएगा',
            kn: 'ತಮ್ಮ ಮೇಲೆಯೇ ತಪ್ಪು ಹೊರಿಸಬಹುದೆಂದು ಭಯಪಟ್ಟು ಹಿಂಜರಿಯಿರಿ',
          },
          target: 'confidentiality_assurance',
          xp: 5,
          risky: true,
          type: 'risky',
        },
      ],
    },

    confidentiality_assurance: {
      id: 'confidentiality_assurance',
      characterPose: 'thoughtful',
      location: 'study_room',
      mood: 'serious',
      timeOfDay: 'night',
      text: {
        en: "Tanya's elder sister Anjali reassures her: 'Tanya, under Section 23 of POCSO and DPDP Act 2023, victims have 100% legal confidentiality and zero liability. The law protects children completely — never stay silent against cyber blackmail.'",
        hi: "तान्या की बड़ी बहन अंजलि उसे आश्वस्त करती है: 'तान्या, पॉक्सो की धारा 23 और डीपीडीपी एक्ट 2023 के तहत पीड़ितों की पहचान 100% गोपनीय रहती है। कानून बच्चों की पूरी रक्षा करता है।'",
        kn: "ತಾನ್ಯಾಳ ಅಕ್ಕ ಅಂಜಲಿ ಧೈರ್ಯ ತುಂಬುತ್ತಾಳೆ: 'ತಾನ್ಯಾ, ಪೋಕ್ಸೋ ಕಲಂ 23 ರ ಅಡಿಯಲ್ಲಿ ಸಂತ್ರಸ್ತರ ಗುರುತು ಸಂಪೂರ್ಣ ರಹಸ್ಯವಾಗಿರುತ್ತದೆ. ಕಾನೂನು ಮಕ್ಕಳಿಗೆ ಸಂಪೂರ್ಣ ರಕ್ಷಣೆ ನೀಡುತ್ತದೆ.'",
      },
      choices: [
        {
          label: {
            en: 'File a confidential report with the National Cyber Crime Reporting Portal & Childline 1098',
            hi: 'राष्ट्रीय साइबर अपराध रिपोर्टिंग पोर्टल और चाइल्डलाइन 1098 पर गोपनीय शिकायत दर्ज करें',
            kn: 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಅಪರಾಧ ಪೋರ್ಟಲ್ ಮತ್ತು 1098 ಸಹಾಯವಾಣಿಗೆ ಗೌಪ್ಯ ದೂರು ನೀಡಿ',
          },
          target: 'statutory_reporting',
          xp: 15,
          type: 'strong',
        },
      ],
    },

    statutory_reporting: {
      id: 'statutory_reporting',
      characterPose: 'confident',
      location: 'police_station',
      mood: 'serious',
      timeOfDay: 'day',
      text: {
        en: "The Special Juvenile Police Unit (SJPU) in plain clothes and Childline 1098 officers initiate an immediate cyber forensic trace. Under Section 19 of POCSO, the digital platform is legally ordered to take down the harmful images within 24 hours.",
        hi: "सादे कपड़ों में विशेष बाल पुलिस इकाई (SJPU) और चाइल्डलाइन 1098 अधिकारी तुरंत जांच शुरू करते हैं। पॉक्सो की धारा 19 के तहत, डिजिटल प्लेटफॉर्म को 24 घंटे के भीतर आपत्तिजनक सामग्री हटाने का आदेश दिया जाता है।",
        kn: "ವಿಶೇಷ ಮಕ್ಕಳ ಪೊಲೀಸ್ ಘಟಕ (SJPU) ಮತ್ತು 1098 ಅಧಿಕಾರಿಗಳು ತನಿಖೆ ಆರಂಭಿಸಿ, ಪೋಕ್ಸೋ ಕಲಂ 19 ರ ಅಡಿಯಲ್ಲಿ 24 ಗಂಟೆಗಳಲ್ಲಿ ಸೋಷಿಯಲ್ ಮೀಡಿಯಾದಿಂದ ಆಕ್ಷೇಪಾರ್ಹ ಫೋಟೋಗಳನ್ನು ಡಿಲೀಟ್ ಮಾಡಿಸುತ್ತಾರೆ.",
      },
      choices: [
        {
          label: {
            en: 'Ensure all affected students receive psychological and legal aid under CWC protection',
            hi: 'सुनिश्चित करें कि सभी प्रभावित छात्रों को बाल कल्याण समिति (CWC) के तहत कानूनी और परामर्श सहायता मिले',
            kn: 'ಎಲ್ಲ ಸಂತ್ರಸ್ತ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ CWC ಅಡಿಯಲ್ಲಿ ಕಾನೂನು ಮತ್ತು ಮಾನಸಿಕ ಧೈರ್ಯ ದೊರೆಯುವಂತೆ ಮಾಡಿ',
          },
          target: 'school_counselling',
          xp: 15,
          type: 'strong',
        },
        {
          label: {
            en: 'Organize a school-wide digital consent and cyber legal awareness session',
            hi: 'पूरे स्कूल में डिजिटल सहमति और साइबर कानूनी जागरूकता सत्र आयोजित करें',
            kn: 'ಶಾಲೆಯಾದ್ಯಂತ ಡಿಜಿಟಲ್ ಸುರಕ್ಷತೆ ಮತ್ತು ಸೈಬರ್ ಕಾನೂನು ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮ ಆಯೋಜಿಸಿ',
          },
          target: 'cyber_safety_victory',
          xp: 25,
          type: 'strong',
        },
      ],
    },

    school_counselling: {
      id: 'school_counselling',
      characterPose: 'standing',
      location: 'counselling_room',
      mood: 'positive',
      timeOfDay: 'afternoon',
      text: {
        en: "The Child Welfare Committee (CWC) provides verified adolescent counsellors to support the students. The school installs anonymous reporting dropboxes and sets up a statutory Cyber Safety Committee.",
        hi: "बाल कल्याण समिति (CWC) छात्रों की सहायता के लिए प्रमाणित काउंसलर उपलब्ध कराती है। स्कूल में गोपनीय शिकायत पेटियां और वैधानिक साइबर सुरक्षा समिति स्थापित की जाती है।",
        kn: "ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಸಮಿತಿಯು (CWC) ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಆಪ್ತಸಮಾಲೋಚನೆ ಒದಗಿಸುತ್ತದೆ ಮತ್ತು ಶಾಲೆಯಲ್ಲಿ ಅಧಿಕೃತ ಸೈಬರ್ ಸುರಕ್ಷತಾ ಸಮಿತಿ ರಚಿಸಲಾಗುತ್ತದೆ.",
      },
      choices: [
        {
          label: {
            en: 'Celebrate constitutional safety and digital empowerment with all classmates',
            hi: 'सभी सहपाठियों के साथ संवैधानिक सुरक्षा और डिजिटल सशक्तिकरण का जश्न मनाएं',
            kn: 'ಸಹಪಾಠಿಗಳೊಂದಿಗೆ ಸಾಂವಿಧಾನಿಕ ಹಕ್ಕುಗಳು ಮತ್ತು ಡಿಜಿಟಲ್ ಜಾಗೃತಿಯ ಯಶಸ್ಸನ್ನು ಸಂಭ್ರಮಿಸಿ',
          },
          target: 'cyber_safety_victory',
          xp: 25,
          type: 'strong',
        },
      ],
    },

    cyber_safety_victory: {
      id: 'cyber_safety_victory',
      isEnding: true,
      characterPose: 'cheering',
      location: 'auditorium',
      mood: 'celebration',
      timeOfDay: 'day',
      text: {
        en: "The cyber perpetrator is tracked down and penalized under POCSO Act 2012, while all students’ privacy remains strictly protected. Tanya demonstrated that adolescent constitutional literacy breaks the silence of online fear.",
        hi: "पॉक्सो अधिनियम 2012 के तहत अपराधी को पकड़ा गया और दंडित किया गया, जबकि छात्रों की गोपनीयता पूरी तरह सुरक्षित रही। तान्या ने साबित किया कि कानूनी साक्षरता ऑनलाइन डर को मात देती है।",
        kn: "ಪೋಕ್ಸೋ ಕಾಯ್ದೆಯಡಿ ಅಪರಾಧಿಗೆ ಶಿಕ್ಷೆಯಾಗುತ್ತದೆ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳ ಗೌಪ್ಯತೆ ಸಂಪೂರ್ಣ ರಕ್ಷಿಸಲ್ಪಡುತ್ತದೆ. ಕಾನೂನಿನ ಅರಿವೇ ಅತ್ಯಂತ ಶಕ್ತಿಶಾಲಿ ಕವಚ ಎಂಬುದನ್ನು ತಾನ್ಯಾ ಸಾಬೀತುಪಡಿಸಿದಳು.",
      },
      didYouKnow: {
        en: 'National Emergency Cyber Helpline 1930 and Childline 1098 operate 24/7 toll-free for all children across India.',
        hi: 'राष्ट्रीय आपातकालीन साइबर हेल्पलाइन 1930 और चाइल्डलाइन 1098 भारत भर के सभी बच्चों के लिए 24/7 निःशुल्क काम करती हैं।',
        kn: 'ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಸಹಾಯವಾಣಿ 1930 ಮತ್ತು ಮಕ್ಕಳ ಸಹಾಯವಾಣಿ 1098 ದೇಶಾದ್ಯಂತ 24 ಗಂಟೆಯೂ ಉಚಿತವಾಗಿ ಲಭ್ಯವಿದೆ.',
      },
      endingBadge: {
        name: 'POCSO Cyber Guardian',
        icon: '🛡️',
        xpBonus: 50,
      },
    },
  },
};
