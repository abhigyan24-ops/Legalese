/**
 * Senior Story: Right to Education (Ages 12–16)
 * Topic: Article 21-A & Section 13 RTE Act 2009 (Illegal Fees & Board Exam Rights)
 */

export default {
  id: 'right-to-education',
  track: 'senior',
  ageTier: '12-16',
  title: {
    en: "Aarav's Board Exam & The Capitation Fee",
    hi: 'आरव की बोर्ड परीक्षा और अनधिकृत शुल्क',
    kn: 'ಆರವ್‌ನ ಬೋರ್ಡ್ ಪರೀಕ್ಷೆ ಮತ್ತು ಕಾನೂನುಬಾಹಿರ ಶುಲ್ಕ',
  },
  subtitle: {
    en: 'Article 21-A & Section 13 of the Right to Education Act 2009',
    hi: 'अनुच्छेद 21-ए और शिक्षा का अधिकार अधिनियम 2009 की धारा 13',
    kn: 'ವಿಧಿ 21-ಎ ಮತ್ತು ಶಿಕ್ಷಣ ಹಕ್ಕು ಕಾಯ್ದೆ 2009 ರ ಕಲಂ 13',
  },
  actTag: 'Article 21-A',
  icon: '🎒',
  startNode: 'gate_confrontation',
  badge: {
    id: 'badge-senior-rte',
    name: 'Statutory Education Defender',
    icon: '🎓',
    article: 'Article 21-A & Sec. 13 RTE',
  },
  quiz: [
    {
      question: {
        en: 'Can a school withhold a student’s board exam hall ticket for unpaid "special development fees"?',
        hi: 'क्या कोई स्कूल बकाया "विशेष विकास शुल्क" के लिए छात्र का बोर्ड परीक्षा प्रवेश पत्र रोक सकता है?',
        kn: 'ಬಾಕಿ ಇರುವ "ವಿಶೇಷ ಶುಲ್ಕ"ಕ್ಕಾಗಿ ಶಾಲೆಯು ವಿದ್ಯಾರ್ಥಿಯ ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪ್ರವೇಶ ಪತ್ರವನ್ನು ತಡೆಹಿಡಿಯಬಹುದೇ?',
      },
      options: [
        { en: 'Yes, if fees are pending over 3 months', hi: 'हाँ, यदि 3 महीने से अधिक समय से शुल्क बकाया है', kn: 'ಹೌದು, 3 ತಿಂಗಳು ಬಾಕಿ ಇದ್ದರೆ' },
        { en: 'No, withholding hall tickets or charging unauthorized capitation fees violates RTE Act', hi: 'नहीं, हॉल टिकट रोकना या अनधिकृत शुल्क मांगना आरटीई अधिनियम का उल्लंघन है', kn: 'ಇಲ್ಲ, ಹಾಲ್ ಟಿಕೆಟ್ ತಡೆಹಿಡಿಯುವುದು ಅಥವಾ ಅಕ್ರಮ ಶುಲ್ಕ ವಸೂಲಿ ಮಾಡುವುದು ಶಿಕ್ಷಣ ಹಕ್ಕಿನ ಉಲ್ಲಂಘನೆ' },
        { en: 'Only if the school is completely private', hi: 'केवल तभी जब स्कूल पूरी तरह से निजी हो', kn: 'ಕೇವಲ ಖಾಸಗಿ ಶಾಲೆಗಳಿಗೆ ಮಾತ್ರ ಸಾಧ್ಯ' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'Under Section 13 of the RTE Act and High Court directives, no institution can deny hall tickets or demand capitation fees.',
        hi: 'आरटीई अधिनियम की धारा 13 और उच्च न्यायालय के निर्देशों के अनुसार, कोई भी संस्थान हॉल टिकट से वंचित नहीं कर सकता।',
        kn: 'ಶಿಕ್ಷಣ ಹಕ್ಕು ಕಾಯ್ದೆಯ ಕಲಂ 13 ರ ಅಡಿಯಲ್ಲಿ ಯಾವುದೇ ಸಂಸ್ಥೆಯು ಹಾಲ್ ಟಿಕೆಟ್ ತಡೆಯುವಂತಿಲ್ಲ.',
      },
    },
    {
      question: {
        en: 'Who is the official statutory authority for filing school fee harassment grievances?',
        hi: 'स्कूल शुल्क उत्पीड़न की शिकायतों को दर्ज करने के लिए आधिकारिक वैधानिक प्राधिकरण कौन सा है?',
        kn: 'ಶಾಲಾ ಶುಲ್ಕ ಕಿರುಕುಳದ ದೂರು ದಾಖಲಿಸಲು ಅಧಿಕೃತ ಶಾಸನಬದ್ಧ ಪ್ರಾಧಿಕಾರ ಯಾರು?',
      },
      options: [
        { en: 'District Education Officer (DEO) & School Management Committee (SMC)', hi: 'जिला शिक्षा अधिकारी (DEO) और स्कूल प्रबंधन समिति (SMC)', kn: 'ಜಿಲ್ಲಾ ಶಿಕ್ಷಣಾಧಿಕಾರಿ (DEO) ಮತ್ತು ಶಾಲಾ ನಿರ್ವಹಣಾ ಸಮಿತಿ (SMC)' },
        { en: 'Local Police Station directly', hi: 'सीधे स्थानीय पुलिस स्टेशन', kn: 'ನೇರವಾಗಿ ಸ್ಥಳೀಯ ಪೊಲೀಸ್ ಠಾಣೆ' },
        { en: 'Private coaching centres', hi: 'निजी कोचिंग संस्थान', kn: 'ಖಾಸಗಿ ಕೋಚಿಂಗ್ ಕೇಂದ್ರಗಳು' },
      ],
      correctIndex: 0,
      explanation: {
        en: 'The District Education Officer (DEO) and SMC are mandated to investigate and penalize unlawful fee coercion.',
        hi: 'जिला शिक्षा अधिकारी (DEO) और SMC को गैरकानूनी शुल्क वसूली की जांच और दंडित करने का अधिकार है।',
        kn: 'ಜಿಲ್ಲಾ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳು ಮತ್ತು SMC ಈ ಬಗ್ಗೆ ತನಿಖೆ ನಡೆಸಿ ಕ್ರಮ ಕೈಗೊಳ್ಳಲು ಅಧಿಕಾರ ಹೊಂದಿದ್ದಾರೆ.',
      },
    },
    {
      question: {
        en: 'What is the maximum penalty under the RTE Act for charging prohibited capitation fees?',
        hi: 'प्रतिबंधित कैपिटेशन शुल्क लेने पर आरटीई अधिनियम के तहत अधिकतम जुर्माना क्या है?',
        kn: 'ಕಾನೂನುಬಾಹಿರ ಶುಲ್ಕ ಪಡೆದರೆ ಶಿಕ್ಷಣ ಹಕ್ಕು ಕಾಯ್ದೆಯಡಿ ಗರಿಷ್ಠ ದಂಡ ಎಷ್ಟು?',
      },
      options: [
        { en: 'Up to 10 times the capitation fee charged', hi: 'वसूले गए कैपिटेशन शुल्क का 10 गुना तक', kn: 'ವಸೂಲಿ ಮಾಡಿದ ಶುಲ್ಕದ 10 ಪಟ್ಟು ವರೆಗೆ ದಂಡ' },
        { en: 'Only a verbal warning', hi: 'केवल एक मौखिक चेतावनी', kn: 'ಕೇವಲ ಮೌಖಿಕ ಎಚ್ಚರಿಕೆ' },
        { en: 'A flat ₹500 fine', hi: '₹500 का सामान्य जुर्माना', kn: 'ಕೇವಲ ₹500 ದಂಡ' },
      ],
      correctIndex: 0,
      explanation: {
        en: 'Section 13(2)(a) mandates a penalty extending up to 10 times the capitation fee charged from students.',
        hi: 'धारा 13(2)(a) के तहत छात्रों से वसूले गए कैपिटेशन शुल्क का 10 गुना तक जुर्माना लगाने का प्रावधान है।',
        kn: 'ಕಲಂ 13(2)(ಎ) ಅಡಿಯಲ್ಲಿ ವಸೂಲಿ ಮಾಡಿದ ಶುಲ್ಕದ 10 ಪಟ್ಟು ವರೆಗೆ ಕಠಿಣ ದಂಡ ವಿಧಿಸಲಾಗುತ್ತದೆ.',
      },
    },
  ],
  nodes: {
    gate_confrontation: {
      id: 'gate_confrontation',
      characterPose: 'concerned',
      location: 'school_gate',
      mood: 'tense',
      timeOfDay: 'morning',
      text: {
        en: "It is two weeks before the Class 10 Board Examinations. The school administrator stops 15-year-old Aarav at the gate, stating his hall ticket is withheld due to an unpaid 'Special Infrastructure Fee' of ₹3,500.",
        hi: "10वीं की बोर्ड परीक्षा में दो हफ्ते बचे हैं। स्कूल प्रशासक 15 वर्षीय आरव को गेट पर रोकते हैं और कहते हैं कि ₹3,500 के 'विशेष अवसंरचना शुल्क' के कारण उसका हॉल टिकट रोका गया है।",
        kn: "10ನೇ ತರಗತಿ ಬೋರ್ಡ್ ಪರೀಕ್ಷೆಗೆ 2 ವಾರಗಳಿವೆ. ₹3,500 'ವಿಶೇಷ ಮೂಲಸೌಕರ್ಯ ಶುಲ್ಕ' ಬಾಕಿ ಇರುವುದರಿಂದ ಹಾಲ್ ಟಿಕೆಟ್ ನೀಡಲಾಗುವುದಿಲ್ಲ ಎಂದು ಶಾಲಾ ಆಡಳಿತವು 15 ವರ್ಷದ ಆರವ್‌ನನ್ನು ಗೇಟ್‌ನಲ್ಲಿ ತಡೆಯುತ್ತದೆ.",
      },
      didYouKnow: {
        en: 'Section 13 of the RTE Act 2009 strictly prohibits schools from demanding capitation fees or blocking examination access.',
        hi: 'आरटीई अधिनियम 2009 की धारा 13 स्कूलों को कैपिटेशन शुल्क मांगने या परीक्षा रोकने से सख्त मना करती है।',
        kn: 'ಶಿಕ್ಷಣ ಹಕ್ಕು ಕಾಯ್ದೆಯ ಕಲಂ 13 ರ ಪ್ರಕಾರ ಯಾವುದೇ ಶಾಲೆಯು ಹೆಚ್ಚುವರಿ ಅಕ್ರಮ ಶುಲ್ಕ ಕೇಳುವಂತಿಲ್ಲ ಅಥವಾ ಪರೀಕ್ಷೆ ತಡೆಯುವಂತಿಲ್ಲ.',
      },
      choices: [
        {
          label: {
            en: 'Demand a written statutory notice and invoke Section 13 of the RTE Act',
            hi: 'लिखित सूचना की मांग करें और आरटीई अधिनियम की धारा 13 का हवाला दें',
            kn: 'ಲಿಖಿತ ನೋಟಿಸ್ ಕೇಳಿ ಮತ್ತು ಶಿಕ್ಷಣ ಹಕ್ಕು ಕಾಯ್ದೆಯ ಕಲಂ 13 ಅನ್ನು ಉಲ್ಲೇಖಿಸಿ',
          },
          target: 'statutory_demand',
          xp: 15,
          type: 'strong',
        },
        {
          label: {
            en: 'Ask classmates if they are facing the same illegal fee demand',
            hi: 'सहपाठियों से पूछें कि क्या वे भी इसी अवैध शुल्क की मांग का सामना कर रहे हैं',
            kn: 'ಇತರ ಸಹಪಾಠಿಗಳಿಗೂ ಇದೇ ರೀತಿಯ ಅಕ್ರಮ ಶುಲ್ಕ ಕೇಳಲಾಗಿದೆಯೇ ಎಂದು ವಿಚಾರಿಸಿ',
          },
          target: 'collective_inquiry',
          xp: 12,
          type: 'strong',
        },
        {
          label: {
            en: 'Hesitate and consider borrowing money under high interest',
            hi: 'हिचकिचाएं और भारी ब्याज पर कर्ज लेने पर विचार करें',
            kn: 'ಹಿಂಜರಿದು ಹೆಚ್ಚಿನ ಬಡ್ಡಿಗೆ ಸಾಲ ಪಡೆಯಲು ಯೋಚಿಸಿ',
          },
          target: 'hesitant_reflection',
          xp: 5,
          risky: true,
          type: 'risky',
        },
      ],
    },

    hesitant_reflection: {
      id: 'hesitant_reflection',
      characterPose: 'thoughtful',
      location: 'corridor',
      mood: 'concerned',
      timeOfDay: 'day',
      text: {
        en: "Aarav feels immense stress about his parents borrowing money. His senior friend Priya stops him: 'Aarav, wait! The High Court ruled that education is a fundamental right under Article 21-A. Withholding hall tickets is illegal.'",
        hi: "आरव अपने माता-पिता के कर्ज लेने को लेकर भारी तनाव महसूस करता है। उसकी सीनियर दोस्त प्रिया उसे रोकती है: 'आरव, रुको! हाई कोर्ट ने साफ कहा है कि अनुच्छेद 21-ए के तहत शिक्षा मौलिक अधिकार है। हॉल टिकट रोकना गैरकानूनी है।'",
        kn: "ಪೋಷಕರು ಸಾಲ ಮಾಡಬೇಕಾಗಬಹುದೆಂದು ಆರವ್ ಆತಂಕಪಡುತ್ತಾನೆ. ಹಿರಿಯ ಸ್ನೇಹಿತೆ ಪ್ರಿಯಾ ಅವನನ್ನು ತಡೆದು: 'ಆರವ್, ನಿಲ್ಲು! ವಿಧಿ 21-ಎ ಅಡಿಯಲ್ಲಿ ಶಿಕ್ಷಣ ಮೂಲಭೂತ ಹಕ್ಕು. ಹಾಲ್ ಟಿಕೆಟ್ ತಡೆಯುವುದು ಕಾನೂನುಬಾಹಿರ.'",
      },
      choices: [
        {
          label: {
            en: 'Thank Priya and approach the School Management Committee (SMC) together',
            hi: 'प्रिया को धन्यवाद दें और साथ में स्कूल प्रबंधन समिति (SMC) के पास जाएं',
            kn: 'ಪ್ರಿಯಾಗೆ ಧನ್ಯವಾದ ತಿಳಿಸಿ ಒಟ್ಟಿಗೆ ಶಾಲಾ ನಿರ್ವಹಣಾ ಸಮಿತಿಯನ್ನು (SMC) ಸಂಪರ್ಕಿಸಿ',
          },
          target: 'smc_intervention',
          xp: 10,
          type: 'strong',
        },
        {
          label: {
            en: 'Submit a formal grievance to the District Education Officer (DEO)',
            hi: 'जिला शिक्षा अधिकारी (DEO) को एक औपचारिक शिकायत दर्ज करें',
            kn: 'ಜಿಲ್ಲಾ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳಿಗೆ (DEO) ಅಧಿಕೃತ ದೂರು ಸಲ್ಲಿಸಿ',
          },
          target: 'deo_escalation',
          xp: 15,
          type: 'strong',
        },
      ],
    },

    statutory_demand: {
      id: 'statutory_demand',
      characterPose: 'confident',
      location: 'principal_office',
      mood: 'serious',
      timeOfDay: 'day',
      text: {
        en: "Aarav respectfully presents the RTE legal provisions to the Vice Principal: 'Sir, Section 13 prohibits unapproved capitation levies. I am entitled to my board hall ticket without financial preconditions.'",
        hi: "आरव सम्मानपूर्वक उप-प्रधानाचार्य को आरटीई के कानूनी प्रावधान दिखाता है: 'सर, धारा 13 गैर-अनुमोदित लेवी को रोकती है। मुझे बिना किसी वित्तीय शर्त के मेरा बोर्ड हॉल टिकट मिलना चाहिए।'",
        kn: "ಆರವ್ ಉಪ-ಪ್ರಾಂಶುಪಾಲರಿಗೆ ಶಿಕ್ಷಣ ಹಕ್ಕು ಕಾಯ್ದೆಯ ನಿಯಮಗಳನ್ನು ಗೌರವಯುತವಾಗಿ ತಿಳಿಸುತ್ತಾನೆ: 'ಸರ್, ಕಲಂ 13 ರ ಪ್ರಕಾರ ಹೆಚ್ಚುವರಿ ಶುಲ್ಕ ಕೇಳುವಂತಿಲ್ಲ. ನನಗೆ ಪರೀಕ್ಷಾ ಪ್ರವೇಶ ಪತ್ರ ನೀಡಲೇಬೇಕು.'",
      },
      choices: [
        {
          label: {
            en: 'Request the Parent-Teacher SMC representative to join the meeting',
            hi: 'अभिभावक-शिक्षक SMC प्रतिनिधि को बैठक में शामिल होने का अनुरोध करें',
            kn: 'ಪೋಷಕ-ಶಿಕ್ಷಕ SMC ಪ್ರತಿನಿಧಿಯನ್ನು ಸಭೆಗೆ ಆಹ್ವಾನಿಸಿ',
          },
          target: 'smc_intervention',
          xp: 15,
          type: 'strong',
        },
        {
          label: {
            en: 'File a fast-track petition with the State Commission for Protection of Child Rights (SCPCR)',
            hi: 'राज्य बाल अधिकार संरक्षण आयोग (SCPCR) में त्वरित याचिका दायर करें',
            kn: 'ರಾಜ್ಯ ಮಕ್ಕಳ ಹಕ್ಕುಗಳ ರಕ್ಷಣಾ ಆಯೋಗಕ್ಕೆ (SCPCR) ತ್ವರಿತ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
          },
          target: 'deo_escalation',
          xp: 15,
          type: 'strong',
        },
      ],
    },

    collective_inquiry: {
      id: 'collective_inquiry',
      characterPose: 'standing',
      location: 'library',
      mood: 'neutral',
      timeOfDay: 'day',
      text: {
        en: "In the library, Aarav discovers that 8 other students from economically modest families received the same ultimatum. They unite to draft a joint representation citing Article 21-A.",
        hi: "पुस्तकालय में, आरव को पता चलता है कि आर्थिक रूप से कमजोर 8 अन्य छात्रों को भी यही चेतावनी मिली है। वे अनुच्छेद 21-ए का हवाला देते हुए एक संयुक्त ज्ञापन तैयार करते हैं।",
        kn: "ಗ್ರಂಥಾಲಯದಲ್ಲಿ ಇತರ 8 ವಿದ್ಯಾರ್ಥಿಗಳಿಗೂ ಇದೇ ರೀತಿಯ ನೋಟಿಸ್ ಬಂದಿರುವುದು ತಿಳಿಯುತ್ತದೆ. ಅವರೆಲ್ಲರೂ ಒಗ್ಗೂಡಿ ವಿಧಿ 21-ಎ ಅಡಿಯಲ್ಲಿ ಜಂಟಿ ಮನವಿ ಸಿದ್ಧಪಡಿಸುತ್ತಾರೆ.",
      },
      choices: [
        {
          label: {
            en: 'Present the joint representation to the School Management Committee',
            hi: 'स्कूल प्रबंधन समिति के समक्ष संयुक्त ज्ञापन प्रस्तुत करें',
            kn: 'ಶಾಲಾ ನಿರ್ವಹಣಾ ಸಮಿತಿಗೆ ಜಂಟಿ ಮನವಿಯನ್ನು ಸಲ್ಲಿಸಿ',
          },
          target: 'smc_intervention',
          xp: 15,
          type: 'strong',
        },
        {
          label: {
            en: 'Escalate the matter to the District Education Officer with student signatures',
            hi: 'छात्रों के हस्ताक्षरों के साथ जिला शिक्षा अधिकारी को मामला अग्रेषित करें',
            kn: 'ವಿದ್ಯಾರ್ಥಿಗಳ ಸಹಿಯೊಂದಿಗೆ ಜಿಲ್ಲಾ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳಿಗೆ ದೂರನ್ನು ಸಲ್ಲಿಸಿ',
          },
          target: 'deo_escalation',
          xp: 15,
          type: 'strong',
        },
      ],
    },

    smc_intervention: {
      id: 'smc_intervention',
      characterPose: 'happy',
      location: 'meeting_hall',
      mood: 'positive',
      timeOfDay: 'afternoon',
      text: {
        en: "The School Management Committee convenes an emergency meeting. The parent representatives and civil society members cite Section 13 and order the immediate unconditional release of all board hall tickets.",
        hi: "स्कूल प्रबंधन समिति एक आपातकालीन बैठक बुलाती है। अभिभावक प्रतिनिधि और नागरिक समाज के सदस्य धारा 13 का हवाला देते हैं और सभी हॉल टिकटों को तुरंत जारी करने का आदेश देते हैं।",
        kn: "ಶಾಲಾ ನಿರ್ವಹಣಾ ಸಮಿತಿಯು ತುರ್ತು ಸಭೆ ನಡೆಸಿ ಕಲಂ 13 ರ ಅಡಿಯಲ್ಲಿ ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲದೆ ಎಲ್ಲ ವಿದ್ಯಾರ್ಥಿಗಳ ಹಾಲ್ ಟಿಕೆಟ್‌ಗಳನ್ನು ತಕ್ಷಣ ಬಿಡುಗಡೆ ಮಾಡಲು ಆದೇಶಿಸುತ್ತದೆ.",
      },
      choices: [
        {
          label: {
            en: 'Receive board examination hall ticket and ensure institutional fee transparency',
            hi: 'बोर्ड परीक्षा हॉल टिकट प्राप्त करें और संस्थान में शुल्क पारदर्शिता सुनिश्चित करें',
            kn: 'ಬೋರ್ಡ್ ಪರೀಕ್ಷಾ ಪ್ರವೇಶ ಪತ್ರವನ್ನು ಪಡೆದು ಶಾಲೆಯಲ್ಲಿ ಶುಲ್ಕ ಪಾರದರ್ಶಕತೆಯನ್ನು ಖಚಿತಪಡಿಸಿ',
          },
          target: 'victory_ending',
          xp: 25,
          type: 'strong',
        },
      ],
    },

    deo_escalation: {
      id: 'deo_escalation',
      characterPose: 'happy',
      location: 'district_office',
      mood: 'positive',
      timeOfDay: 'afternoon',
      text: {
        en: "The District Education Officer issues an official show-cause notice to the school management within 24 hours, mandating the unconditional issuance of hall tickets under penalty of RTE deregistration.",
        hi: "जिला शिक्षा अधिकारी 24 घंटे के भीतर स्कूल प्रबंधन को आधिकारिक कारण बताओ नोटिस जारी करते हैं, जिसमें हॉल टिकट तुरंत जारी करने का सख्त आदेश दिया जाता है।",
        kn: "ಜಿಲ್ಲಾ ಶಿಕ್ಷಣಾಧಿಕಾರಿಗಳು 24 ಗಂಟೆಗಳಲ್ಲಿ ಶಾಲೆಗೆ ಶೋಕಾಸ್ ನೋಟಿಸ್ ಜಾರಿ ಮಾಡಿ, ತಕ್ಷಣವೇ ಪ್ರವೇಶ ಪತ್ರಗಳನ್ನು ನೀಡುವಂತೆ ಕಟ್ಟುನಿಟ್ಟಿನ ಆದೇಶ ಹೊರಡಿಸುತ್ತಾರೆ.",
      },
      choices: [
        {
          label: {
            en: 'Claim victory for all students and prepare confidently for the board exams',
            hi: 'सभी छात्रों के लिए जीत हासिल करें और आत्मविश्वास से बोर्ड परीक्षा की तैयारी करें',
            kn: 'ಎಲ್ಲ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ನ್ಯಾಯ ದೊರಕಿಸಿಕೊಟ್ಟು ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಪರೀಕ್ಷೆಗೆ ಸಿದ್ಧರಾಗಿ',
          },
          target: 'victory_ending',
          xp: 25,
          type: 'strong',
        },
      ],
    },

    victory_ending: {
      id: 'victory_ending',
      isEnding: true,
      characterPose: 'cheering',
      location: 'classroom',
      mood: 'celebration',
      timeOfDay: 'day',
      text: {
        en: "Aarav and his classmates receive their board exam hall tickets with full institutional respect. Through constitutional awareness of Article 21-A, they protected their future and set a precedent for junior students.",
        hi: "आरव और उसके सहपाठियों को पूरे सम्मान के साथ उनके बोर्ड परीक्षा हॉल टिकट मिलते हैं। अनुच्छेद 21-ए की संवैधानिक समझ के माध्यम से, उन्होंने अपने भविष्य की रक्षा की और एक मिसाल कायम की।",
        kn: "ಆರವ್ ಮತ್ತು ಅವನ ಸಹಪಾಠಿಗಳು ಗೌರವದಿಂದ ಪರೀಕ್ಷಾ ಪ್ರವೇಶ ಪತ್ರಗಳನ್ನು ಪಡೆಯುತ್ತಾರೆ. ವಿಧಿ 21-ಎ ರ ಸಾಂವಿಧಾನಿಕ ಅರಿವಿನಿಂದ ಅವರು ತಮ್ಮ ಹಕ್ಕನ್ನು ರಕ್ಷಿಸಿಕೊಂಡು ಇತರರಿಗೂ ದಾರಿದೀಪವಾದರು.",
      },
      didYouKnow: {
        en: 'Under Article 21-A of the Constitution of India, quality and equitable secondary education is a recognized statutory entitlement.',
        hi: 'भारत के संविधान के अनुच्छेद 21-ए के तहत, गुणवत्तापूर्ण और न्यायसंगत माध्यमिक शिक्षा एक मान्यता प्राप्त वैधानिक अधिकार है।',
        kn: 'ಭಾರತೀಯ ಸಂವಿಧಾನದ ವಿಧಿ 21-ಎ ಅಡಿಯಲ್ಲಿ ಗುಣಮಟ್ಟದ ಶಿಕ್ಷಣ ಪಡೆಯುವುದು ಪ್ರತಿಯೊಬ್ಬ ವಿದ್ಯಾರ್ಥಿಯ ಮೂಲಭೂತ ಹಕ್ಕಾಗಿದೆ.',
      },
      endingBadge: {
        name: 'Article 21-A Champion',
        icon: '🎓',
        xpBonus: 50,
      },
    },
  },
};
