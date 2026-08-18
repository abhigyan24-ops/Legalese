/**
 * Senior Story: Protection from Child Marriage (Ages 12–16)
 * Topic: Prohibition of Child Marriage Act 2006 (Section 13 Injunctions & CWC Safety)
 */

export default {
  id: 'protection-from-child-marriage',
  track: 'senior',
  ageTier: '12-16',
  title: {
    en: "Ananya's College Dream & The Legal Injunction",
    hi: 'अनन्या के कॉलेज का सपना और कानूनी रोक',
    kn: 'ಅನನ್ಯಾಳ ಕಾಲೇಜು ಕನಸು ಮತ್ತು ಕಾನೂನು ತಡೆಯಾಜ್ಞೆ',
  },
  subtitle: {
    en: 'Prohibition of Child Marriage Act 2006 & Section 13 Stay Orders',
    hi: 'बाल विवाह निषेध अधिनियम 2006 और धारा 13 का स्थगनादेश',
    kn: 'ಬಾಲ್ಯ ವಿವಾಹ ನಿಷೇಧ ಕಾಯ್ದೆ 2006 ಮತ್ತು ಕಲಂ 13 ರ ತಡೆಯಾಜ್ಞೆ',
  },
  actTag: 'PCMA 2006',
  icon: '📜',
  startNode: 'village_announcement',
  badge: {
    id: 'badge-senior-pcma',
    name: 'PCMA Injunction Guardian',
    icon: '📜',
    article: 'PCMA 2006 (Sec 13)',
  },
  quiz: [
    {
      question: {
        en: 'Can a court issue a legally binding injunction to immediately stop an impending child marriage under PCMA 2006?',
        hi: 'क्या अदालत बाल विवाह निषेध अधिनियम 2006 के तहत बाल विवाह को रोकने के लिए कानूनी आदेश जारी कर सकती है?',
        kn: 'ಬಾಲ್ಯ ವಿವಾಹ ನಿಷೇಧ ಕಾಯ್ದೆಯ ಕಲಂ 13 ರ ಅಡಿಯಲ್ಲಿ ನ್ಯಾಯಾಲಯವು ವಿವಾಹ ತಡೆಯಲು ತಡೆಯಾಜ್ಞೆ ನೀಡಬಹುದೇ?',
      },
      options: [
        { en: 'Yes, Section 13 empowers Judicial Magistrates to issue immediate non-bailable stay injunctions', hi: 'हाँ, धारा 13 न्यायिक मजिस्ट्रेट को तत्काल रोक आदेश जारी करने का अधिकार देती है', kn: 'ಹೌದು, ಕಲಂ 13 ರ ಅಡಿಯಲ್ಲಿ ನ್ಯಾಯಾಲಯವು ತಕ್ಷಣದ ತಡೆಯಾಜ್ಞೆ ನೀಡಲು ಅಧಿಕಾರ ಹೊಂದಿದೆ' },
        { en: 'No, only family elders can decide', hi: 'नहीं, केवल परिवार के बुजुर्ग ही फैसला कर सकते हैं', kn: 'ಇಲ್ಲ, ಕೇವಲ ಹಿರಿಯರು ಮಾತ್ರ ನಿರ್ಧರಿಸಬಹುದು' },
        { en: 'Only after the marriage ceremony has started', hi: 'केवल विवाह समारोह शुरू होने के बाद ही', kn: 'ಕೇವಲ ಮದುವೆ ಆರಂಭವಾದ ನಂತರ ಮಾತ್ರ' },
      ],
      correctIndex: 0,
      explanation: {
        en: 'Under Section 13 of PCMA 2006, any citizen, child, or Child Marriage Prohibition Officer (CMPO) can obtain an emergency court injunction against impending child marriages.',
        hi: 'पीसीएमए 2006 की धारा 13 के तहत कोई भी नागरिक या सीएमपीओ अदालत से बाल विवाह के खिलाफ तत्काल स्थगनादेश प्राप्त कर सकता है।',
        kn: 'ಕಲಂ 13 ರ ಅಡಿಯಲ್ಲಿ ಯಾರಾದರೂ ದೂರು ನೀಡಿ ಮದುವೆ ನಡೆಯದಂತೆ ನ್ಯಾಯಾಲಯದಿಂದ ತಡೆಯಾಜ್ಞೆ ಪಡೆಯಬಹುದು.',
      },
    },
  ],
  nodes: {
    village_announcement: {
      id: 'village_announcement',
      characterPose: 'concerned',
      location: 'village_home',
      mood: 'serious',
      timeOfDay: 'evening',
      text: {
        en: "16-year-old Ananya has achieved 92% in her Class 10 board exams and dreams of becoming a doctor. However, her relatives secretly arrange her marriage for next month, claiming 'it is family tradition'.",
        hi: "16 वर्षीय अनन्या ने 10वीं बोर्ड में 92% अंक प्राप्त किए हैं और डॉक्टर बनना चाहती है। लेकिन उसके रिश्तेदार 'पारिवारिक परंपरा' का हवाला देकर अगले महीने उसका विवाह तय कर देते हैं।",
        kn: "16 ವರ್ಷದ ಅನನ್ಯಾ 10ನೇ ತರಗತಿಯಲ್ಲಿ 92% ಅಂಕ ಗಳಿಸಿ ವೈದ್ಯೆಯಾಗುವ ಕನಸು ಹೊತ್ತಿದ್ದಾಳೆ. ಆದರೆ ಮನೆಯವರು ಸಂಪ್ರದಾಯದ ನೆಪವೊಡ್ಡಿ ಮುಂದಿನ ತಿಂಗಳು ಅವಳಿಗೆ ಮದುವೆ ಮಾಡಲು ನಿರ್ಧರಿಸುತ್ತಾರೆ.",
      },
      didYouKnow: {
        en: 'The legal age of marriage in India is strictly 18 for females and 21 for males. Any marriage below this age is voidable and punishable with rigorous imprisonment under PCMA 2006.',
        hi: 'भारत में विवाह की कानूनी आयु महिलाओं के लिए 18 और पुरुषों के लिए 21 वर्ष है। इससे कम उम्र में विवाह गैरकानूनी और दंडनीय है।',
        kn: 'ಭಾರತದಲ್ಲಿ ಹೆಣ್ಣುಮಕ್ಕಳಿಗೆ 18 ಮತ್ತು ಗಂಡುಮಕ್ಕಳಿಗೆ 21 ವರ್ಷ ಕಡ್ಡಾಯ ಕಾನೂನುಬದ್ಧ ವಯಸ್ಸು. ಇದಕ್ಕಿಂತ ಕಡಿಮೆ ವಯಸ್ಸಿನಲ್ಲಿ ಮದುವೆ ಮಾಡುವುದು ಕಠಿಣ ಶಿಕ್ಷಾರ್ಹ ಅಪರಾಧ.',
      },
      choices: [
        {
          label: {
            en: 'Contact the Child Marriage Prohibition Officer (CMPO) & Childline 1098 for a Section 13 court injunction',
            hi: 'धारा 13 के अदालती स्थगनादेश के लिए बाल विवाह निषेध अधिकारी (CMPO) और 1098 से संपर्क करें',
            kn: 'ಕಲಂ 13 ರ ನ್ಯಾಯಾಲಯದ ತಡೆಯಾಜ್ಞೆಗಾಗಿ ಬಾಲ್ಯ ವಿವಾಹ ನಿಷೇಧ ಅಧಿಕಾರಿ (CMPO) ಮತ್ತು 1098 ಸಂಪರ್ಕಿಸಿ',
          },
          target: 'cmpo_action',
          xp: 15,
          type: 'strong',
        },
        {
          label: {
            en: 'Confide in the high school headmaster and local Panchayat women’s federation leader',
            hi: 'हाई स्कूल के प्रधानाध्यापक और स्थानीय पंचायत महिला संघ की अध्यक्ष को विश्वास में लें',
            kn: 'ಶಾಲೆಯ ಮುಖ್ಯೋಪಾಧ್ಯಾಯರು ಮತ್ತು ಗ್ರಾಮ ಪಂಚಾಯತಿ ಮಹಿಳಾ ಒಕ್ಕೂಟದ ಅಧ್ಯಕ್ಷರಿಗೆ ಮಾಹಿತಿ ನೀಡಿ',
          },
          target: 'panchayat_dialogue',
          xp: 12,
          type: 'strong',
        },
        {
          label: {
            en: 'Hesitate assuming family decisions cannot be questioned legally',
            hi: 'यह सोचकर हिचकिचाएं कि पारिवारिक फैसलों पर कानूनी सवाल नहीं उठाया जा सकता',
            kn: 'ಕುಟುಂಬದ ನಿರ್ಧಾರವನ್ನು ವಿರೋಧಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ ಎಂದುಕೊಂಡು ಸುಮ್ಮನಿರಿ',
          },
          target: 'statutory_rights_clarity',
          xp: 5,
          risky: true,
          type: 'risky',
        },
      ],
    },

    statutory_rights_clarity: {
      id: 'statutory_rights_clarity',
      characterPose: 'thoughtful',
      location: 'courtyard',
      mood: 'serious',
      timeOfDay: 'night',
      text: {
        en: "Ananya's biology teacher Mrs. Sharma visits: 'Ananya, no custom or tradition supersedes the Constitution of India and PCMA 2006. The Child Marriage Prohibition Officer (CMPO) and Sub-Divisional Magistrate have the statutory power to protect you and guarantee your college education.'",
        hi: "अनन्या की जीवविज्ञान शिक्षिका श्रीमती शर्मा मिलने आती हैं: 'अनन्या, कोई भी परंपरा भारत के संविधान और पीसीएमए 2006 से ऊपर नहीं है। सीएमपीओ और एसडीएम के पास आपकी सुरक्षा और कॉलेज की पढ़ाई की गारंटी देने की कानूनी शक्ति है।'",
        kn: "ಶಿಕ್ಷಕಿ ಶರ್ಮಾ ಭೇಟಿಯಾಗಿ: 'ಅನನ್ಯಾ, ಯಾವುದೇ ಸಂಪ್ರದಾಯವೂ ಭಾರತದ ಸಂವಿಧಾನ ಮತ್ತು ಕಾನೂನಿಗಿಂತ ದೊಡ್ಡದಲ್ಲ. ನಿನ್ನ ಕಾಲೇಜು ಶಿಕ್ಷಣ ಮತ್ತು ರಕ್ಷಣೆಗೆ ಕಾನೂನಿನಲ್ಲಿ ಸಂಪೂರ್ಣ ಬೆಂಬಲವಿದೆ.'",
      },
      choices: [
        {
          label: {
            en: 'Authorize the CMPO and Childline 1098 to petition the Judicial Magistrate for an immediate injunction',
            hi: 'तत्काल स्थगनादेश के लिए न्यायिक मजिस्ट्रेट के समक्ष याचिका दायर करने हेतु CMPO को अधिकृत करें',
            kn: 'ನ್ಯಾಯಾಲಯದ ತುರ್ತು ತಡೆಯಾಜ್ಞೆ ಪಡೆಯಲು CMPO ಮತ್ತು 1098 ಸಹಾಯವಾಣಿಗೆ ಅಧಿಕಾರ ನೀಡಿ',
          },
          target: 'cmpo_action',
          xp: 15,
          type: 'strong',
        },
      ],
    },

    panchayat_dialogue: {
      id: 'panchayat_dialogue',
      characterPose: 'standing',
      location: 'panchayat_hall',
      mood: 'serious',
      timeOfDay: 'day',
      text: {
        en: "The Gram Panchayat Women's Committee convenes with Ananya's parents, warning them that promoting a child marriage attracts non-bailable arrest under Section 9, 10 & 11 of PCMA, while government scholarships fund 100% of Ananya’s pre-medical coaching.",
        hi: "ग्राम पंचायत महिला समिति अनन्या के माता-पिता के साथ बैठक करती है, और चेतावनी देती है कि बाल विवाह को बढ़ावा देने पर पीसीएमए की धारा 9, 10 और 11 के तहत गैर-जमानती गिरफ्तारी होगी, जबकि सरकारी छात्रवृत्ति से अनन्या की मेडिकल कोचिंग मुफ्त होगी।",
        kn: "ಗ್ರಾಮ ಪಂಚಾಯತಿ ಮಹಿಳಾ ಸಮಿತಿಯು ಪೋಷಕರಿಗೆ ತಿಳಿಹೇಳಿ, ಬಾಲ್ಯ ವಿವಾಹಕ್ಕೆ ನೆರವಾದರೆ ಜೈಲು ಶಿಕ್ಷೆ ಆಗುತ್ತದೆ ಮತ್ತು ಸರ್ಕಾರದಿಂದ ಅನನ್ಯಾಳಿಗೆ ಉಚಿತ ಮೆಡಿಕಲ್ ಕೋಚಿಂಗ್ ಸಿಗುತ್ತದೆ ಎಂದು ವಿವರಿಸುತ್ತದೆ.",
      },
      choices: [
        {
          label: {
            en: 'Secure the formal CMPO undertaking and enroll in Higher Secondary Pre-Med stream',
            hi: 'सीएमपीओ से औपचारिक सुरक्षा पत्र प्राप्त करें और उच्चतर माध्यमिक प्री-मेडिकल में दाखिला लें',
            kn: 'ಅಧಿಕೃತ ರಕ್ಷಣಾ ಪತ್ರ ಪಡೆದು ಕಾಲೇಜಿನ ಪ್ರಿ-ಮೆಡಿಕಲ್ ವಿಭಾಗಕ್ಕೆ ಪ್ರವೇಶ ಪಡೆಯಿರಿ',
          },
          target: 'college_victory',
          xp: 25,
          type: 'strong',
        },
      ],
    },

    cmpo_action: {
      id: 'cmpo_action',
      characterPose: 'confident',
      location: 'magistrate_court',
      mood: 'positive',
      timeOfDay: 'day',
      text: {
        en: "The Judicial Magistrate First Class issues an emergency ex-parte injunction order under Section 13 of PCMA. The local police execute the stay order, declaring that any attempt to proceed with the marriage will result in immediate non-bailable detention.",
        hi: "न्यायिक मजिस्ट्रेट प्रथम श्रेणी पीसीएमए की धारा 13 के तहत आपातकालीन रोक आदेश जारी करते हैं। स्थानीय पुलिस आदेश लागू करती है और शादी की किसी भी कोशिश पर सख्त कार्रवाई की घोषणा करती है।",
        kn: "ಪ್ರಥಮ ದರ್ಜೆ ಮ್ಯಾಜಿಸ್ಟ್ರೇಟ್ ನ್ಯಾಯಾಲಯವು ಕಲಂ 13 ರ ಅಡಿಯಲ್ಲಿ ತಕ್ಷಣದ ತಡೆಯಾಜ್ಞೆ ನೀಡುತ್ತದೆ ಮತ್ತು ಪೊಲೀಸರು ಆದೇಶವನ್ನು ಜಾರಿಗೊಳಿಸುತ್ತಾರೆ.",
      },
      choices: [
        {
          label: {
            en: 'Accept the state merit scholarship and step proudly into college to pursue Medicine',
            hi: 'राज्य मेरिट छात्रवृत्ति स्वीकार करें और डॉक्टर बनने के लिए गर्व से कॉलेज में कदम रखें',
            kn: 'ಸರ್ಕಾರಿ ಮೆರಿಟ್ ವಿದ್ಯಾರ್ಥಿವೇತನ ಪಡೆದು ವೈದ್ಯಕೀಯ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಹೆಮ್ಮೆಯಿಂದ ಕಾಲೇಜಿಗೆ ಹೆಜ್ಜೆ ಇಡಿ',
          },
          target: 'college_victory',
          xp: 25,
          type: 'strong',
        },
      ],
    },

    college_victory: {
      id: 'college_victory',
      isEnding: true,
      characterPose: 'cheering',
      location: 'college_campus',
      mood: 'celebration',
      timeOfDay: 'day',
      text: {
        en: "Ananya enters medical college with her parents cheering by her side, completely converted into champions of girls' higher education. Constitutional knowledge of PCMA 2006 protected a brilliant future.",
        hi: "अनन्या गर्व के साथ मेडिकल कॉलेज में प्रवेश करती है, और उसके माता-पिता भी बालिकाओं की उच्च शिक्षा के सबसे बड़े समर्थक बन जाते हैं। पीसीएमए 2006 के ज्ञान ने एक उज्ज्वल भविष्य की रक्षा की।",
        kn: "ಅನನ್ಯಾ ಹೆಮ್ಮೆಯಿಂದ ಮೆಡಿಕಲ್ ಕಾಲೇಜಿಗೆ ಪ್ರವೇಶಿಸುತ್ತಾಳೆ ಮತ್ತು ಅವಳ ಪೋಷಕರೂ ಹೆಣ್ಣುಮಕ್ಕಳ ಉನ್ನತ ಶಿಕ್ಷಣದ ಬೆಂಬಲಿಗರಾಗುತ್ತಾರೆ. ಕಾನೂನಿನ ಅರಿವು ಒಂದು ಮಹಾನ್ ಕನಸನ್ನು ನನಸು ಮಾಡಿತು.",
      },
      didYouKnow: {
        en: 'Under PCMA Section 13, any individual can obtain a court injunction against child marriage without having to pay court fees.',
        hi: 'पीसीएमए की धारा 13 के तहत, कोई भी व्यक्ति बिना किसी अदालती शुल्क के बाल विवाह के खिलाफ स्थगनादेश प्राप्त कर सकता है।',
        kn: 'ಕಲಂ 13 ರ ಅಡಿಯಲ್ಲಿ ಯಾವುದೇ ಕೋರ್ಟ್ ಶುಲ್ಕವಿಲ್ಲದೆ ಯಾರು ಬೇಕಾದರೂ ಬಾಲ್ಯ ವಿವಾಹದ ವಿರುದ್ಧ ತಡೆಯಾಜ್ಞೆ ಪಡೆಯಬಹುದು.',
      },
      endingBadge: {
        name: 'PCMA Rights Guardian',
        icon: '📜',
        xpBonus: 50,
      },
    },
  },
};
