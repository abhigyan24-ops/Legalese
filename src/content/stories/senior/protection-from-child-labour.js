/**
 * Senior Story: Protection from Child & Adolescent Labour (Ages 12–16)
 * Topic: Child & Adolescent Labour (Prohibition and Regulation) Act 1986 (2016 Amendment)
 */

export default {
  id: 'protection-from-child-labour',
  track: 'senior',
  ageTier: '12-16',
  title: {
    en: 'Hazardous Labour & Adolescent Rights',
    hi: 'खतरनाक श्रम और किशोरों के अधिकार',
    kn: 'ಅಪಾಯಕಾರಿ ಕೆಲಸ ಮತ್ತು ಹದಿಹರೆಯದವರ ಹಕ್ಕುಗಳು',
  },
  subtitle: {
    en: 'Understanding Section 3A of the Child & Adolescent Labour Prohibition Act',
    hi: 'बाल एवं किशोर श्रम निषेध अधिनियम की धारा 3ए को समझें',
    kn: 'ಬಾಲ ಮತ್ತು ಹದಿಹರೆಯದ ಕಾರ್ಮಿಕ ನಿಷೇಧ ಕಾಯ್ದೆಯ ಕಲಂ 3ಎ ಅರಿವು',
  },
  actTag: 'CLPRA Act',
  icon: '🏭',
  startNode: 'workshop_discovery',
  badge: {
    id: 'badge-senior-clpra',
    name: 'Adolescent Labour Defender',
    icon: '🏭',
    article: 'CLPRA 1986 (Sec 3A)',
  },
  quiz: [
    {
      question: {
        en: 'Can adolescents aged 14–18 be employed in hazardous industries like chemical factories or mines?',
        hi: 'क्या 14-18 वर्ष के किशोरों को रासायनिक कारखानों या खदानों जैसे खतरनाक उद्योगों में लगाया जा सकता है?',
        kn: '14-18 ವರ್ಷದ ಹದಿಹರೆಯದವರನ್ನು ರಾಸಾಯನಿಕ ಅಥವಾ ಗಣಿಗಾರಿಕೆಯಂತಹ ಅಪಾಯಕಾರಿ ಉದ್ಯಮಗಳಲ್ಲಿ ಕೆಲಸಕ್ಕೆ ನೇಮಿಸಬಹುದೇ?',
      },
      options: [
        { en: 'Yes, if their parents give written consent', hi: 'हाँ, यदि माता-पिता लिखित सहमति देते हैं', kn: 'ಹೌದು, ಪೋಷಕರು ಒಪ್ಪಿಗೆ ನೀಡಿದರೆ' },
        { en: 'Strictly prohibited under Section 3A with 6 months to 2 years imprisonment for employers', hi: 'धारा 3ए के तहत सख्त मना है और नियोक्ताओं को 6 महीने से 2 साल तक की जेल हो सकती है', kn: 'ಕಲಂ 3ಎ ಅಡಿಯಲ್ಲಿ ಸಂಪೂರ್ಣ ನಿಷೇಧಿಸಲಾಗಿದೆ ಮತ್ತು ಮಾಲೀಕರಿಗೆ 2 ವರ್ಷಗಳವರೆಗೆ ಜೈಲು ಶಿಕ್ಷೆ ಇದೆ' },
        { en: 'Only during school holidays', hi: 'केवल स्कूल की छुट्टियों के दौरान', kn: 'ಕೇವಲ ರಜಾ ದಿನಗಳಲ್ಲಿ ಮಾತ್ರ' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'The 2016 Amendment completely bans the employment of adolescents (14-18 yrs) in any hazardous occupation or process.',
        hi: '2016 के संशोधन के तहत 14-18 वर्ष के किशोरों को किसी भी खतरनाक व्यवसाय में काम पर रखने पर पूर्ण प्रतिबंध है।',
        kn: '2016 ರ ತಿದ್ದುಪಡಿಯ ಪ್ರಕಾರ ಯಾವುದೇ ಅಪಾಯಕಾರಿ ಕೆಲಸಗಳಲ್ಲಿ ಹದಿಹರೆಯದವರನ್ನು ದುಡಿಸಿಕೊಳ್ಳುವುದು ಶಿಕ್ಷಾರ್ಹ ಅಪರಾಧ.',
      },
    },
  ],
  nodes: {
    workshop_discovery: {
      id: 'workshop_discovery',
      characterPose: 'concerned',
      location: 'factory_gate',
      mood: 'serious',
      timeOfDay: 'day',
      text: {
        en: "15-year-old Vikram notices his classmate Kabir has stopped attending 10th grade. Vikram finds Kabir working in a poorly ventilated battery-recycling chemical workshop handling toxic lead acid without safety gear.",
        hi: "15 वर्षीय विक्रम देखता है कि उसका सहपाठी कबीर 10वीं कक्षा में नहीं आ रहा है। विक्रम पाता है कि कबीर बिना सुरक्षा उपकरणों के बैटरी रीसाइक्लिंग कारखाने में जहरीले एसिड के बीच काम कर रहा है।",
        kn: "15 ವರ್ಷದ ವಿಕ್ರಮ್‌ಗೆ ಸಹಪಾಠಿ ಕಬೀರ್ ಶಾಲೆಗೆ ಬರುತ್ತಿಲ್ಲ ಎಂಬುದು ತಿಳಿಯುತ್ತದೆ. ಕಬೀರ್ ಯಾವುದೇ ಸುರಕ್ಷತಾ ಸಲಕರಣೆಗಳಿಲ್ಲದೆ ಅಪಾಯಕಾರಿ ಬ್ಯಾಟರಿ ಮರುಬಳಕೆ ಕಾರ್ಖಾನೆಯಲ್ಲಿ ಕೆಲಸ ಮಾಡುತ್ತಿರುವುದು ವಿಕ್ರಮ್ ಕಣ್ಣಿಗೆ ಬೀಳುತ್ತದೆ.",
      },
      didYouKnow: {
        en: 'Battery recycling and chemical solvent handling are categorized as prohibited Hazardous Occupations under the Schedule of CLPRA.',
        hi: 'बैटरी रीसाइक्लिंग और रासायनिक काम सीएलपीआरए की अनुसूची के तहत पूरी तरह से प्रतिबंधित खतरनाक व्यवसायों में आते हैं।',
        kn: 'ಬ್ಯಾಟರಿ ಮರುಬಳಕೆ ಮತ್ತು ರಾಸಾಯನಿಕ ಕೆಲಸಗಳನ್ನು ಬಾಲಕಾರ್ಮಿಕ ಕಾಯ್ದೆಯಡಿ ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಿಷೇಧಿತ ಅಪಾಯಕಾರಿ ಕೆಲಸಗಳ ಪಟ್ಟಿಯಲ್ಲಿ ಸೇರಿಸಲಾಗಿದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Report the hazardous child labour operation to the District Labour Commissioner & Childline 1098',
            hi: 'जिला श्रम आयुक्त और चाइल्डलाइन 1098 को इस खतरनाक बाल श्रम की सूचना दें',
            kn: 'ಜಿಲ್ಲಾ ಕಾರ್ಮಿಕ ಆಯುಕ್ತರು ಮತ್ತು 1098 ಸಹಾಯವಾಣಿಗೆ ತಕ್ಷಣ ದೂರು ನೀಡಿ',
          },
          next: 'labour_inspection',
          xp: 15,
          type: 'strong',
        },
        {
          label: {
            en: 'Speak with Kabir about government skill apprenticeships and continuing evening secondary education',
            hi: 'कबीर से सरकारी कौशल प्रशिक्षण और शाम के स्कूल में शिक्षा जारी रखने के बारे में बात करें',
            kn: 'ಕಬೀರ್‌ನೊಂದಿಗೆ ಮಾತನಾಡಿ ಸರ್ಕಾರಿ ಕೌಶಲ್ಯ ತರಬೇತಿ ಮತ್ತು ಸಂಜೆ ಶಾಲೆಯ ಬಗ್ಗೆ ತಿಳಿಸಿ',
          },
          next: 'peer_intervention',
          xp: 12,
          type: 'strong',
        },
        {
          label: {
            en: 'Hesitate assuming Kabir needs the daily wage for his family',
            hi: 'यह सोचकर हिचकिचाएं कि कबीर को अपने परिवार के लिए दैनिक मजदूरी की जरूरत है',
            kn: 'ಕಬೀರ್‌ಗೆ ಹಣದ ಅಗತ್ಯವಿರಬಹುದು ಎಂದು ಸುಮ್ಮನಿದ್ದು ಹಿಂಜರಿಯಿರಿ',
          },
          next: 'rehabilitation_awareness',
          xp: 5,
          risky: true,
          type: 'risky',
        },
      ],
    },

    rehabilitation_awareness: {
      id: 'rehabilitation_awareness',
      characterPose: 'thoughtful',
      location: 'street',
      mood: 'concerned',
      timeOfDay: 'afternoon',
      text: {
        en: "The vocational teacher reminds Vikram: 'Vikram, the law mandates a Child Labour Rehabilitation-cum-Welfare Fund where the rescued adolescent receives immediate financial rehabilitation and guaranteed free education. Staying silent risks lifelong organ damage from toxic lead.'",
        hi: "व्यावसायिक शिक्षक विक्रम को समझाते हैं: 'विक्रम, कानून बाल श्रम पुनर्वास कोष का प्रावधान करता है जिसके तहत बच्चे को तुरंत वित्तीय सहायता और मुफ्त शिक्षा मिलती है। चुप रहने से जहरीले लेड से गंभीर बीमारी हो सकती है।'",
        kn: "ಶಿಕ್ಷಕರು ವಿಕ್ರಮ್‌ಗೆ ತಿಳಿಹೇಳುತ್ತಾರೆ: 'ವಿಕ್ರಮ್, ಬಾಲಕಾರ್ಮಿಕ ಪುನರ್ವಸತಿ ನಿಧಿಯ ಅಡಿಯಲ್ಲಿ ರಕ್ಷಿಸಲ್ಪಟ್ಟ ಮಗುವಿಗೆ ಉಚಿತ ಶಿಕ್ಷಣ ಮತ್ತು ಆರ್ಥಿಕ ನೆರವು ಸಿಗುತ್ತದೆ. ಸುಮ್ಮನಿದ್ದರೆ ಅಪಾಯಕಾರಿ ಹೊಗೆಯಿಂದ ಶ್ವಾಸಕೋಶಕ್ಕೆ ಹಾನಿಯಾಗುತ್ತದೆ.'",
      },
      choices: [
        {
          label: {
            en: 'Notify the Task Force and District Labour Inspector for statutory rescue',
            hi: 'वैधानिक बचाव के लिए टास्क फोर्स और जिला श्रम निरीक्षक को सूचित करें',
            kn: 'ರಕ್ಷಣಾ ಕಾರ್ಯಪಡೆ ಮತ್ತು ಜಿಲ್ಲಾ ಕಾರ್ಮಿಕ ನಿರೀಕ್ಷಕರಿಗೆ ತಕ್ಷಣ ಮಾಹಿತಿ ನೀಡಿ',
          },
          next: 'labour_inspection',
          xp: 15,
          type: 'strong',
        },
      ],
    },

    peer_intervention: {
      id: 'peer_intervention',
      characterPose: 'standing',
      location: 'teashop',
      mood: 'neutral',
      timeOfDay: 'evening',
      text: {
        en: "Vikram meets Kabir at tea stall: 'Kabir, hazardous work under 18 is illegal under Section 3A. The National Child Labour Project (NCLP) provides free bridge education and monthly stipends while you finish 10th grade.' Kabir agrees to seek formal support.",
        hi: "विक्रम चाय की दुकान पर कबीर से मिलता है: 'कबीर, धारा 3A के तहत 18 वर्ष से कम आयु में खतरनाक काम अवैध है। एनसीएलपी मुफ्त शिक्षा और मासिक छात्रवृत्ति देता है।' कबीर औपचारिक मदद लेने के लिए सहमत होता है।",
        kn: "ವಿಕ್ರಮ್ ಕಬೀರ್‌ನನ್ನು ಭೇಟಿಯಾಗಿ: 'ಕಬೀರ್, ಕಲಂ 3A ಪ್ರಕಾರ ಅಪಾಯಕಾರಿ ಕೆಲಸ ಮಾಡುವುದು ಕಾನೂನುಬಾಹಿರ. ಎನ್‌ಸಿಎಲ್‌ಪಿ ಅಡಿಯಲ್ಲಿ ನಿನಗೆ ಉಚಿತ ಶಿಕ್ಷಣ ಮತ್ತು ಮಾಸಾಶನ ಸಿಗುತ್ತದೆ.' ಕಬೀರ್ ಕಾನೂನು ನೆರವು ಪಡೆಯಲು ಒಪ್ಪುತ್ತಾನೆ.",
      },
      choices: [
        {
          label: {
            en: 'Accompany Kabir to the Child Welfare Committee (CWC) and District Labour Task Force',
            hi: 'कबीर के साथ बाल कल्याण समिति (CWC) और जिला श्रम टास्क फोर्स के पास जाएं',
            kn: 'ಕಬೀರ್ ಜೊತೆ ಮಕ್ಕಳ ಕಲ್ಯಾಣ ಸಮಿತಿ (CWC) ಮತ್ತು ಕಾರ್ಮಿಕ ಇಲಾಖೆಗೆ ತೆರಳಿ',
          },
          next: 'labour_inspection',
          xp: 15,
          type: 'strong',
        },
      ],
    },

    labour_inspection: {
      id: 'labour_inspection',
      characterPose: 'confident',
      location: 'collectorate',
      mood: 'positive',
      timeOfDay: 'day',
      text: {
        en: "The District Task Force raids the hazardous unit. The factory owner is penalized ₹50,000 under Section 14, and Kabir is enrolled into the Child Labour Rehabilitation Fund with an accredited ITI vocational scholarship.",
        hi: "जिला टास्क फोर्स कारखाने पर छापा मारती है। धारा 14 के तहत मालिक पर ₹50,000 का जुर्माना लगाया जाता है, और कबीर को पुनर्वास कोष और आईटीआई छात्रवृत्ति में नामांकित किया जाता है।",
        kn: "ಜಿಲ್ಲಾ ಕಾರ್ಯಪಡೆ ದಾಳಿ ನಡೆಸಿ ಮಾಲೀಕನಿಗೆ ₹50,000 ದಂಡ ವಿಧಿಸುತ್ತದೆ ಮತ್ತು ಕಬೀರ್‌ನನ್ನು ಬಾಲಕಾರ್ಮಿಕ ಪುನರ್ವಸತಿ ನಿಧಿಯಡಿ ಐಟಿಐ ವಿದ್ಯಾರ್ಥಿವೇತನಕ್ಕೆ ದಾಖಲಿಸುತ್ತದೆ.",
      },
      choices: [
        {
          label: {
            en: 'Celebrate statutory justice and support Kabir’s secondary school journey',
            hi: 'वैधानिक न्याय का जश्न मनाएं और कबीर की माध्यमिक शिक्षा का समर्थन करें',
            kn: 'ಕಾನೂನಿನ ನ್ಯಾಯವನ್ನು ಸಂಭ್ರಮಿಸಿ ಕಬೀರ್‌ನ ಶಾಲಾ ಕಲಿಕೆಗೆ ಬೆಂಬಲವಾಗಿ ನಿಲ್ಲಿ',
          },
          next: 'labour_victory',
          xp: 25,
          type: 'strong',
        },
      ],
    },

    labour_victory: {
      id: 'labour_victory',
      end: true, isEnding: true,
      characterPose: 'cheering',
      location: 'workshop_school',
      mood: 'celebration',
      timeOfDay: 'day',
      text: {
        en: "Kabir returns to school with clean lungs, safe vocational skills, and full dignity. Vikram proved that adolescent constitutional rights turn dangerous exploitation into empowering education.",
        hi: "कबीर सुरक्षित कौशल, अच्छे स्वास्थ्य और पूरे आत्मसम्मान के साथ स्कूल लौटता है। विक्रम ने साबित किया कि किशोर अधिकारों की समझ शोषण को शिक्षा में बदल देती है।",
        kn: "ಕಬೀರ್ ಗೌರವ ಮತ್ತು ಸುರಕ್ಷಿತ ಕೌಶಲ್ಯಗಳೊಂದಿಗೆ ಶಾಲೆಗೆ ಮರಳುತ್ತಾನೆ. ಹದಿಹರೆಯದವರ ಸಾಂವಿಧಾನಿಕ ಹಕ್ಕುಗಳ ಅರಿವು ಅಪಾಯಕಾರಿ ಶೋಷಣೆಯಿಂದ ಶಿಕ್ಷಣದ ಬೆಳಕಿನೆಡೆಗೆ ಕೊಂಡೊಯ್ಯುತ್ತದೆ ಎಂಬುದನ್ನು ವಿಕ್ರಮ್ ಸಾಬೀತುಪಡಿಸಿದನು.",
      },
      didYouKnow: {
        en: 'The Child & Adolescent Labour Act mandates that fines collected from guilty employers are directly deposited into the rescued child’s bank account.',
        hi: 'बाल एवं किशोर श्रम अधिनियम के तहत दोषी नियोक्ताओं से वसूला गया जुर्माना सीधे बच्चे के बैंक खाते में जमा किया जाता है।',
        kn: 'ತಪ್ಪಿತಸ್ಥ ಮಾಲೀಕರಿಂದ ವಸೂಲಿ ಮಾಡಿದ ದಂಡದ ಹಣವನ್ನು ನೇರವಾಗಿ ಸಂತ್ರಸ್ತ ಮಗುವಿನ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಜಮಾ ಮಾಡಲಾಗುತ್ತದೆ.',
      },
      endingBadge: {
        name: 'Adolescent Rights Shield',
        icon: '🏭',
        xpBonus: 50,
      },
    },
  },
};
