/**
 * right-to-education.js
 * 
 * "Meena's Right to Education" — Article 21-A
 * Full reference story with 26 nodes, 5 acts, recovery arcs, and 7 outcomes.
 * Fully localized for English, Hindi, and Kannada.
 */

export default {
  id: 'right-to-education',
  title: {
    en: "Meena's Right to Education",
    hi: 'मीना की शिक्षा का अधिकार',
    kn: 'ಮೀನಾಳ ಶಿಕ್ಷಣದ ಹಕ್ಕು',
  },
  startNode: 'start',
  stages: [
    { icon: '🎒', label: 'Schoolyard' },
    { icon: '🫖', label: 'Tea Stall' },
    { icon: '💬', label: 'The Reveal' },
    { icon: '🏛️', label: 'Committee' },
    { icon: '🏁', label: 'Outcome' },
  ],
  nodes: {
    start: {
      stage: 0,
      mood: 'neutral',
      location: 'classroom',
      timeOfDay: 'dusk',
      sceneObjects: [
        { p: 'deskRow', x: 30, y: 220, args: [4] },
        { p: 'emptyDesk', x: 120, y: 280, args: [true] },
        { p: 'classroomWindow', x: 300, y: 60 },
        { p: 'wallClock', x: 220, y: 40 },
        { p: 'schoolBell', x: 360, y: 30 },
      ],
      characterPose: 'standing',
      secondaryCharacter: null,
      text: {
        en: "Meena's seat is empty again — third day this week. The last bell rings for the day.",
        hi: 'मीना की सीट फिर खाली है — इस हफ्ते तीसरा दिन। दिन की आखिरी घंटी बजती है।',
        kn: 'ಮೀನಾಳ ಸೀಟು ಮತ್ತೆ ಖಾಲಿಯಾಗಿದೆ — ಈ ವಾರದ ಮೂರನೇ ದಿನ. ಶಾಲೆಯ ಕೊನೆಯ ಗಂಟೆ ಬಾರಿಸುತ್ತದೆ.',
      },
      didYouKnow: {
        en: 'Under Section 12(1)(c) of the RTE Act 2009, all private schools must reserve at least 25% of entry-level seats for children from economically weaker sections for free education. (Source: Ministry of Education)',
        hi: 'आरटीई अधिनियम 2009 की धारा 12(1)(c) के तहत, सभी निजी स्कूलों में कमजोर वर्ग के बच्चों के लिए 25% सीटें मुफ्त शिक्षा हेतु आरक्षित हैं। (स्रोत: शिक्षा मंत्रालय)',
        kn: 'ಆರ್‌ಟಿಇ ಕಾಯ್ದೆ 2009 ರ ಪ್ರಕಾರ ಖಾಸಗಿ ಶಾಲೆಗಳಲ್ಲಿ ಬಡ ಮಕ್ಕಳಿಗೆ ಶೇ 25 ರಷ್ಟು ಸೀಟುಗಳನ್ನು ಉಚಿತ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಮೀಸಲಿಡಲಾಗಿದೆ. (ಮೂಲ: ಶಿಕ್ಷಣ ಸಚಿವಾಲಯ)',
      },
      choices: [
        {
          label: {
            en: 'Go look for her right after school',
            hi: 'स्कूल के तुरंत बाद उसे ढूंढने जाएं',
            kn: 'ಶಾಲೆ ಮುಗಿದ ತಕ್ಷಣ ಅವಳನ್ನು ಹುಡುಕಲು ಹೋಗಿ',
          },
          next: 'teastall',
          xp: 15,
          propIcon: '🎒',
        },
        {
          label: {
            en: "Ask around if anyone's seen her",
            hi: 'आसपास पूछें कि क्या किसी ने उसे देखा है',
            kn: 'ಯಾರಾದರೂ ಅವಳನ್ನು ನೋಡಿದ್ದಾರೆಯೇ ಎಂದು ವಿಚಾರಿಸಿ',
          },
          next: 'ask_friend',
          xp: 10,
          propIcon: '💬',
        },
        {
          label: {
            en: "Shrug it off — she'll turn up eventually",
            hi: 'ध्यान न दें — वह कभी न कभी आ ही जाएगी',
            kn: 'ನಿರ್ಲಕ್ಷಿಸಿ — ಅವಳು ಯಾವಾಗಲಾದರೂ ಬರುತ್ತಾಳೆ',
          },
          next: 'quiet_week',
          xp: 2,
          risky: true,
          propIcon: '🤷',
        },
      ],
    },

    ask_friend: {
      stage: 0,
      mood: 'neutral',
      location: 'schoolyard',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'busStandSign', x: 340, y: 120 }],
      characterPose: 'standing',
      secondaryCharacter: { id: 'aisha', pose: 'talking', mood: 'neutral' },
      text: {
        en: "Your friend Aisha says she's spotted Meena helping at a tea stall near the bus stand the last few mornings.",
        hi: 'आपकी सहेली आयशा कहती है कि उसने पिछले कुछ दिनों से बस स्टैंड के पास एक चाय की दुकान पर मीना को काम करते देखा है।',
        kn: 'ನಿಮ್ಮ ಗೆಳತಿ ಆಯಿಷಾ ಹೇಳುತ್ತಾಳೆ, ಕಳೆದ ಕೆಲವು ದಿನಗಳಿಂದ ಬಸ್ ನಿಲ್ದಾಣದ ಬಳಿಯ ಟೀ ಅಂಗಡಿಯಲ್ಲಿ ಮೀನಾ ಕೆಲಸ ಮಾಡುತ್ತಿರುವುದನ್ನು ನೋಡಿದ್ದೇನೆ ಎಂದು.',
      },
      choices: [
        {
          label: {
            en: 'Head there right now',
            hi: 'अभी सीधे वहां जाएं',
            kn: 'ಈಗಲೇ ಅಲ್ಲಿಗೆ ಹೋಗಿ',
          },
          next: 'teastall',
          xp: 15,
          propIcon: '🫖',
        },
        {
          label: {
            en: 'Tell a teacher first',
            hi: 'पहले शिक्षक को बताएं',
            kn: 'ಮೊದಲು ಶಿಕ್ಷಕರಿಗೆ ತಿಳಿಸಿ',
          },
          next: 'teacher_heads_up',
          xp: 10,
          propIcon: '👩‍🏫',
        },
      ],
    },

    teacher_heads_up: {
      stage: 0,
      mood: 'hopeful',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'teacherDesk', x: 100, y: 230 },
        { p: 'blackboard', x: 80, y: 60 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'teacher', pose: 'talking', mood: 'hopeful' },
      text: {
        en: '"Thank you for telling me," the teacher says, making a note. "I\'ll look into it. But if you can, talk to Meena yourself — sometimes a friend\'s voice reaches where ours can\'t."',
        hi: '"मुझे बताने के लिए धन्यवाद," शिक्षक नोट बनाते हुए कहते हैं। "मैं पता लगाऊंगा। लेकिन यदि संभव हो, तो आप भी मीना से बात करें — कभी-कभी एक दोस्त की बात अधिक असर करती है।"',
        kn: '"ತಿಳಿಸಿದ್ದಕ್ಕಾಗಿ ಧನ್ಯವಾದಗಳು," ಶಿಕ್ಷಕರು ಹೇಳುತ್ತಾರೆ. "ನಾನು ವಿಚಾರಿಸುತ್ತೇನೆ. ಆದರೆ ಸಾಧ್ಯವಾದರೆ ನೀವೂ ಮೀನಾಳೊಂದಿಗೆ ಮಾತನಾಡಿ — ಕೆಲವೊಮ್ಮೆ ಸ್ನೇಹಿತರ ಧ್ವನಿ ಹೆಚ್ಚು ಪರಿಣಾಮ ಬೀರುತ್ತದೆ."',
      },
      choices: [
        {
          label: {
            en: 'Go find Meena at the tea stall',
            hi: 'चाय की दुकान पर जाकर मीना से मिलें',
            kn: 'ಟೀ ಅಂಗಡಿಗೆ ಹೋಗಿ ಮೀನಾಳನ್ನು ಹುಡುಕಿ',
          },
          next: 'teastall',
          xp: 15,
          propIcon: '🫖',
        },
        {
          label: {
            en: 'Wait for the teacher to handle it',
            hi: 'शिक्षक द्वारा संभालने का इंतजार करें',
            kn: 'ಶಿಕ್ಷಕರು ನಿಭಾಯಿಸುವವರೆಗೆ ಕಾಯಿರಿ',
          },
          next: 'quiet_week',
          xp: 5,
          risky: true,
          propIcon: '🪑',
        },
      ],
    },

    quiet_week: {
      stage: 0,
      mood: 'worried',
      location: 'corridor',
      timeOfDay: 'evening',
      sceneObjects: [
        { p: 'corridorPillars', x: 20, y: 100, args: [3] },
        { p: 'attendanceRegister', x: 160, y: 180 },
      ],
      characterPose: 'eavesdrop',
      secondaryCharacter: null,
      text: {
        en: 'A quiet week passes. You overhear two teachers in the corridor: "That girl from 7-B — ten days absent now. If it hits fifteen, we\'ll have to cross her off."',
        hi: 'एक हफ्ता बीत जाता है। आप बरामदे में दो शिक्षकों को बात करते सुनते हैं: "7-बी की वह लड़की — अब दस दिन से अनुपस्थित है। यदि पंद्रह दिन हो गए, तो नाम काटना पड़ेगा।"',
        kn: 'ಒಂದು ಶಾಂತ ವಾರ ಕಳೆಯುತ್ತದೆ. ಕಾರಿಡಾರ್‌ನಲ್ಲಿ ಇಬ್ಬರು ಶಿಕ್ಷಕರು ಮಾತನಾಡುತ್ತಿರುವುದು ಕೇಳಿಸುತ್ತದೆ: "7-ಬಿ ಹುಡುಗಿ — ಹತ್ತು ದಿನಗಳಿಂದ ಗೈರುಹಾಜರಾಗಿದ್ದಾಳೆ. ಹದಿನೈದು ದಿನಗಳಾದರೆ ಹೆಸರು ತೆಗೆಯಬೇಕಾಗುತ್ತದೆ."',
      },
      choices: [
        {
          label: {
            en: "Rush to find Meena — it's now or never",
            hi: 'मीना को ढूंढने तुरंत दौड़ें — अब नहीं तो कभी नहीं',
            kn: 'ಮೀನಾಳನ್ನು ಹುಡುಕಲು ಓಡಿ — ಈಗಲೇ ಸರಿ',
          },
          next: 'teastall_late',
          xp: 10,
          propIcon: '🏃',
        },
        {
          label: {
            en: 'Tell the teacher what you overheard',
            hi: 'शिक्षक को बताएं जो आपने सुना',
            kn: 'ನೀವು ಕೇಳಿದ್ದನ್ನು ಶಿಕ್ಷಕರಿಗೆ ತಿಳಿಸಿ',
          },
          next: 'teacher_heads_up_late',
          xp: 8,
          propIcon: '👩‍🏫',
        },
      ],
    },

    teacher_heads_up_late: {
      stage: 0,
      mood: 'hopeful',
      location: 'staffroom',
      timeOfDay: 'dusk',
      sceneObjects: [
        { p: 'teacherDesk', x: 100, y: 230 },
        { p: 'calendarPage', x: 300, y: 100 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'teacher', pose: 'talking', mood: 'concerned' },
      text: {
        en: 'The teacher frowns. "I wish you\'d come sooner. But let\'s try — can you bring Meena in so I can talk to her?"',
        hi: 'शिक्षक चिंतित होते हैं। "काश तुम पहले आए होते। लेकिन कोशिश करते हैं — क्या तुम मीना को ला सकते हो ताकि मैं उससे बात कर सकूं?"',
        kn: 'ಶಿಕ್ಷಕರು ಚಿಂತಿಸುತ್ತಾರೆ. "ನೀವು ಮೊದಲೇ ಬರಬೇಕಿತ್ತು. ಆದರೆ ಪ್ರಯತ್ನಿಸೋಣ — ಮೀನಾಳನ್ನು ಕರೆತರಬಹುದೇ?"',
      },
      choices: [
        {
          label: {
            en: 'Go find Meena at the tea stall',
            hi: 'चाय की दुकान पर जाकर मीना को लाएं',
            kn: 'ಟೀ ಅಂಗಡಿಗೆ ಹೋಗಿ ಮೀನಾಳನ್ನು ಹುಡುಕಿ',
          },
          next: 'teastall_late',
          xp: 10,
          propIcon: '🫖',
        },
        {
          label: {
            en: 'Promise to try, but do nothing',
            hi: 'कोशिश करने का वादा करें, लेकिन कुछ न करें',
            kn: 'ಪ್ರಯತ್ನಿಸುವ ಭರವಸೆ ನೀಡಿ, ಆದರೆ ಏನೂ ಮಾಡಬೇಡಿ',
          },
          next: 'fading_out',
          xp: 2,
          risky: true,
          propIcon: '🙈',
        },
      ],
    },

    fading_out: {
      stage: 1,
      mood: 'sad',
      location: 'noticeboard',
      timeOfDay: 'evening',
      sceneObjects: [
        { p: 'noticeBoard', x: 120, y: 80 },
        { p: 'pinnedPaper', x: 135, y: 95, args: ['Withdrawn'] },
        { p: 'pinnedPaper', x: 168, y: 100, args: ['Notice'] },
      ],
      characterPose: 'standing',
      secondaryCharacter: null,
      text: {
        en: 'Weeks later, the notice board has a short update: "Meena Kumari — withdrawn." Her name disappears like she was never here.',
        hi: 'कुछ हफ़्तों बाद, नोटिस बोर्ड पर एक सूचना लगती है: "मीना कुमारी — नाम वापस लिया गया।" उसका नाम ऐसे गायब हो जाता है जैसे वह कभी यहाँ थी ही नहीं।',
        kn: 'ಕೆಲವು ವಾರಗಳ ನಂತರ ನೋಟಿಸ್ ಬೋರ್ಡ್‌ನಲ್ಲಿ ಬರೆದಿರುತ್ತದೆ: "ಮೀನಾ ಕುಮಾರಿ — ಹೆಸರು ಹಿಂಪಡೆಯಲಾಗಿದೆ." ಅವಳ ಹೆಸರು ಮರೆಯಾಗುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Read the final result',
            hi: 'अंतिम परिणाम देखें',
            kn: 'ಅಂತಿಮ ಫಲಿತಾಂಶವನ್ನು ನೋಡಿ',
          },
          next: 'ending_missed',
          xp: 0,
          propIcon: '📋',
        },
      ],
    },

    teastall: {
      stage: 1,
      mood: 'neutral',
      location: 'teastall',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'teaStallCounter', x: 60, y: 200 },
        { p: 'kettleSteaming', x: 80, y: 170 },
        { p: 'teaCups', x: 170, y: 195, args: [3] },
        { p: 'stool', x: 260, y: 250 },
      ],
      characterPose: 'walking',
      secondaryCharacter: { id: 'meena', pose: 'wiping', mood: 'embarrassed' },
      text: {
        en: 'You find Meena behind a tea stall near the bus stand, wiping tables. She freezes when she sees you. "It\'s… it\'s not what you think. Papa\'s sick. I\'m just helping for a while."',
        hi: 'आप मीना को बस स्टैंड के पास चाय की दुकान पर टेबल साफ करते पाते हैं। वह आपको देखकर चौंक जाती है। "यह वैसा नहीं है जैसा तुम सोच रहे हो। पापा बीमार हैं। मैं बस कुछ दिन मदद कर रही हूँ।"',
        kn: 'ಬಸ್ ನಿಲ್ದಾಣದ ಬಳಿಯ ಟೀ ಅಂಗಡಿಯಲ್ಲಿ ಮೀನಾ ಮೇಜುಗಳನ್ನು ಒರೆಸುತ್ತಿರುವುದನ್ನು ನೀವು ಕಾಣುತ್ತೀರಿ. ನಿಮ್ಮನ್ನು ನೋಡಿ ಅವಳು ದಿಗ್ಭ್ರಮೆಗೊಳ್ಳುತ್ತಾಳೆ. "ಇದು ನೀನು ಅಂದುಕೊಂಡಿದ್ದಲ್ಲ. ಅಪ್ಪನಿಗೆ ಹುಷಾರಿಲ್ಲ. ನಾನು ಸ್ವಲ್ಪ ದಿನ ಸಹಾಯ ಮಾಡುತ್ತಿದ್ದೇನೆ ಅಷ್ಟೇ."',
      },
      choices: [
        {
          label: {
            en: 'Sit down and help her finish the tables first',
            hi: 'बैठकर पहले टेबल साफ करने में उसकी मदद करें',
            kn: 'ಕುಳಿತುಕೊಂಡು ಮೊದಲು ಮೇಜುಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸಲು ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'help_first',
          xp: 15,
          propIcon: '🧹',
        },
        {
          label: {
            en: '"Meena, everyone\'s asking where you are." Try to convince her',
            hi: '"मीना, सब पूछ रहे हैं कि तुम कहाँ हो।" उसे समझाने की कोशिश करें',
            kn: '"ಮೀನಾ, ಎಲ್ಲರೂ ನೀನೆಲ್ಲಿ ಎಂದು ಕೇಳುತ್ತಿದ್ದಾರೆ." ಅವಳಿಗೆ ಮನವರಿಕೆ ಮಾಡಲು ಪ್ರಯತ್ನಿಸಿ',
          },
          next: 'reveal',
          xp: 10,
          propIcon: '💬',
        },
        {
          label: {
            en: 'This feels awkward — say you will check in later and leave',
            hi: 'असहज महसूस होता है — कहें कि बाद में मिलेंगे और चले जाएं',
            kn: 'ಮುಜುಗರವಾಗುತ್ತದೆ — ಆಮೇಲೆ ಸಿಗುತ್ತೇನೆ ಎಂದು ಹೊರಟುಬಿಡಿ',
          },
          next: 'awkward_exit',
          xp: 3,
          risky: true,
          propIcon: '👋',
        },
      ],
    },

    teastall_late: {
      stage: 1,
      mood: 'worried',
      location: 'teastall',
      timeOfDay: 'dusk',
      sceneObjects: [
        { p: 'teaStallCounter', x: 60, y: 200 },
        { p: 'kettleSteaming', x: 80, y: 170 },
        { p: 'teaCups', x: 170, y: 195, args: [2] },
        { p: 'stool', x: 260, y: 250 },
        { p: 'dustCue', x: 150, y: 260 },
      ],
      characterPose: 'walking',
      secondaryCharacter: { id: 'meena', pose: 'wiping', mood: 'worried' },
      text: {
        en: 'Meena looks more tired than before. The counter is dustier, the cups fewer. "You came… I didn\'t think anyone remembered me."',
        hi: 'मीना पहले से ज्यादा थकी हुई लग रही है। काउंटर पर धूल है, कप कम हैं। "तुम आए... मुझे लगा नहीं था कि किसी को मेरी याद होगी।"',
        kn: 'ಮೀನಾ ಮೊದಲಿಗಿಂತ ಹೆಚ್ಚು ದಣಿದಂತೆ ಕಾಣುತ್ತಾಳೆ. "ನೀನು ಬಂದೆಯಾ... ನನ್ನನ್ನು ಯಾರೂ ನೆನಪಿಟ್ಟುಕೊಂಡಿಲ್ಲ ಅಂದುಕೊಂಡಿದ್ದೆ."',
      },
      choices: [
        {
          label: {
            en: '"I should have come sooner. Let\'s fix this together."',
            hi: '"मुझे पहले आना चाहिए था। चलो मिलकर इसे ठीक करते हैं।"',
            kn: '"ನಾನು ಮೊದಲೇ ಬರಬೇಕಿತ್ತು. ಬನ್ನಿ ಒಟ್ಟಾಗಿ ಸರಿಪಡಿಸೋಣ."',
          },
          next: 'reveal_late',
          xp: 10,
          propIcon: '💬',
        },
        {
          label: {
            en: 'Offer to lend her your old textbooks',
            hi: 'अपनी पुरानी पाठ्यपुस्तकें देने की पेशकश करें',
            kn: 'ನಿಮ್ಮ ಹಳೆಯ ಪಠ್ಯಪುಸ್ತಕಗಳನ್ನು ನೀಡಲು ಮುಂದಾಗಿ',
          },
          next: 'partial_fix_start',
          xp: 5,
          propIcon: '📚',
        },
      ],
    },

    help_first: {
      stage: 1,
      mood: 'hopeful',
      location: 'teastall',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'teaStallCounter', x: 60, y: 200 },
        { p: 'twoRags', x: 180, y: 210 },
        { p: 'teaCups', x: 120, y: 195, args: [2] },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'meena', pose: 'talking', mood: 'happy' },
      text: {
        en: 'You grab a rag and start wiping. Meena stares, then laughs for the first time in weeks. Between tables, the real story comes out: her father lost his job, and she is earning ₹30 a day here.',
        hi: 'आप कपड़ा उठाकर पोंछना शुरू करते हैं। मीना देखती है, फिर हफ़्तों बाद पहली बार हंसती है। वह बताती है: उसके पिता की नौकरी चली गई और वह यहाँ ₹30 रोज कमा रही है।',
        kn: 'ನೀವು ಬಟ್ಟೆ ಹಿಡಿದು ಒರೆಸಲು ಶುರುಮಾಡುತ್ತೀರಿ. ಮೀನಾ ನಗುತ್ತಾಳೆ. ಅಪ್ಪನ ಕೆಲಸ ಹೋಗಿದೆ, ತಾನು ದಿನಕ್ಕೆ ₹30 ಸಂಪಾದಿಸುತ್ತಿದ್ದೇನೆ ಎಂದು ನಿಜವಾದ ವಿಷಯ ಹೇಳುತ್ತಾಳೆ.',
      },
      choices: [
        {
          label: {
            en: '"There is a law that says school is free for kids our age. Do you know about Article 21-A?"',
            hi: '"एक कानून है जो कहता है कि हमारी उम्र के बच्चों के लिए स्कूल मुफ्त है। क्या तुम अनुच्छेद 21-ए जानती हो?"',
            kn: '"ನಮ್ಮ ವಯಸ್ಸಿನ ಮಕ್ಕಳಿಗೆ ಶಾಲೆ ಉಚಿತ ಎಂದು ಹೇಳುವ ಕಾನೂನಿದೆ. 21-ಎ ವಿಧಿ ಬಗ್ಗೆ ನಿನಗೆ ತಿಳಿದಿದೆಯೇ?"',
          },
          next: 'figure_out_together',
          xp: 15,
          propIcon: '📜',
        },
        {
          label: {
            en: "Slip her a note with the counsellor's number before leaving",
            hi: 'जाने से पहले काउंसलर के नंबर वाला पर्चा उसे दें',
            kn: 'ಕೌನ್ಸಿಲರ್ ಸಂಖ್ಯೆಯುಳ್ಳ ಚೀಟಿಯನ್ನು ಅವಳಿಗೆ ನೀಡಿ',
          },
          next: 'note_route',
          xp: 10,
          propIcon: '📝',
        },
        {
          label: {
            en: 'Bring her a tiffin tomorrow so she does not go hungry',
            hi: 'कल उसके लिए टिफिन लाएं ताकि वह भूखी न रहे',
            kn: 'ಅವಳಿಗೆ ನಾಳೆ ಊಟ ತಂದುಕೊಡಿ',
          },
          next: 'partial_fix_start',
          xp: 5,
          propIcon: '🍱',
        },
      ],
    },

    awkward_exit: {
      stage: 1,
      mood: 'sad',
      location: 'street',
      timeOfDay: 'dusk',
      sceneObjects: [{ p: 'recedingTeaStall', x: 500, y: 300 }],
      characterPose: 'walking',
      secondaryCharacter: null,
      text: {
        en: "You walk away. Meena's half-smile fades behind you. The tea stall shrinks into the distance, and so does your chance to help.",
        hi: 'आप चले जाते हैं। मीना की मुस्कान पीछे छूट जाती है। चाय की दुकान दूर होती जाती है, और मदद करने का आपका मौका भी।',
        kn: 'ನೀವು ಹೊರಟುಹೋಗುತ್ತೀರಿ. ಮೀನಾಳ ಮುಖದ ನಗು ಮಾಯವಾಗುತ್ತದೆ. ಟೀ ಅಂಗಡಿ ದೂರವಾಗುತ್ತದೆ, ಜೊತೆಗೆ ಸಹಾಯ ಮಾಡುವ ಅವಕಾಶವೂ.',
      },
      choices: [
        {
          label: {
            en: "Go back the next day — you can't stop thinking about it",
            hi: 'अगले दिन वापस जाएं — आप इसके बारे में सोचना बंद नहीं कर सकते',
            kn: 'ಮರುದಿನ ಹಿಂತಿರುಗಿ ಹೋಗಿ — ಸಹಾಯ ಮಾಡಲೇಬೇಕು',
          },
          next: 'reveal_late',
          xp: 8,
          propIcon: '🫖',
        },
        {
          label: {
            en: 'Tell a teacher what you saw',
            hi: 'शिक्षक को बताएं जो आपने देखा',
            kn: 'ನೀವು ನೋಡಿದ್ದನ್ನು ಶಿಕ್ಷಕರಿಗೆ ತಿಳಿಸಿ',
          },
          next: 'tell_teacher_late',
          xp: 6,
          propIcon: '👩‍🏫',
        },
      ],
    },

    note_route: {
      stage: 1,
      mood: 'hopeful',
      location: 'schoolyard',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'handwrittenNote', x: 180, y: 220 }],
      characterPose: 'standing',
      secondaryCharacter: { id: 'meena', pose: 'standing', mood: 'hopeful' },
      text: {
        en: 'The next day, you slip Meena a folded note with the counsellor\'s number: "You don\'t have to do this alone." She reads it quietly, then nods.',
        hi: 'अगले दिन, आप मीना को काउंसलर के नंबर वाला नोट देते हैं: "तुम्हें अकेले यह सब सहने की ज़रूरत नहीं है।" वह चुपचाप पढ़कर सिर हिलाती है।',
        kn: 'ಮರುದಿನ ನೀವು ಮೀನಾಗೆ ಚೀಟಿ ನೀಡುತ್ತೀರಿ: "ನೀನು ಒಂಟಿಯಾಗಿ ಇದನ್ನು ಎದುರಿಸಬೇಕಿಲ್ಲ." ಅವಳು ಓದಿ ಒಪ್ಪಿಕೊಳ್ಳುತ್ತಾಳೆ.',
      },
      choices: [
        {
          label: {
            en: 'Follow up with the teacher yourself',
            hi: 'खुद जाकर शिक्षक से बात करें',
            kn: 'ಸ್ವತಃ ಶಿಕ್ಷಕರೊಂದಿಗೆ ಮಾತನಾಡಿ',
          },
          next: 'tell_teacher',
          xp: 15,
          propIcon: '👩‍🏫',
        },
        {
          label: {
            en: 'Wait for Meena to make the call',
            hi: 'मीना के कॉल करने का इंतजार करें',
            kn: 'ಮೀನಾ ಕರೆ ಮಾಡುವವರೆಗೆ ಕಾಯಿರಿ',
          },
          next: 'waiting_game',
          xp: 5,
          risky: true,
          propIcon: '🪑',
        },
      ],
    },

    waiting_game: {
      stage: 2,
      mood: 'sad',
      location: 'classroom',
      timeOfDay: 'dusk',
      sceneObjects: [
        { p: 'emptyDesk', x: 150, y: 250, args: [true] },
        { p: 'calendarPage', x: 300, y: 80 },
      ],
      characterPose: 'standing',
      secondaryCharacter: null,
      text: {
        en: 'Days pass. The seat stays empty. The calendar flips. Meena never calls.',
        hi: 'दिन बीतते हैं। सीट खाली रहती है। कैलेंडर पलटता है। मीना कभी फोन नहीं करती।',
        kn: 'ದಿನಗಳು ಕಳೆಯುತ್ತವೆ. ಸೀಟು ಖಾಲಿಯಾಗಿಯೇ ಇರುತ್ತದೆ. ಮೀನಾ ಕರೆ ಮಾಡುವುದೇ ಇಲ್ಲ.',
      },
      choices: [
        {
          label: {
            en: 'Go back to the tea stall one more time',
            hi: 'एक बार फिर चाय की दुकान पर जाएं',
            kn: 'ಇನ್ನೊಮ್ಮೆ ಟೀ ಅಂಗಡಿಗೆ ಹೋಗಿ',
          },
          next: 'reveal_late',
          xp: 8,
          propIcon: '🫖',
        },
        {
          label: {
            en: 'Finally tell the teacher',
            hi: 'आखिरकार शिक्षक को सब बताएं',
            kn: 'ಕೊನೆಗೂ ಶಿಕ್ಷಕರಿಗೆ ತಿಳಿಸಿ',
          },
          next: 'tell_teacher_late',
          xp: 6,
          propIcon: '👩‍🏫',
        },
      ],
    },

    reveal: {
      stage: 2,
      mood: 'worried',
      location: 'teastall',
      timeOfDay: 'dusk',
      sceneObjects: [
        { p: 'teaStallCounter', x: 80, y: 220 },
        { p: 'kettleSteaming', x: 100, y: 190 },
        { p: 'stool', x: 260, y: 260 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'meena', pose: 'talking', mood: 'worried' },
      text: {
        en: '"Papa says school costs too much — books, uniform, fees. He says I\'ll go back when things get better." She looks down. "Maybe they won\'t get better."',
        hi: '"पापा कहते हैं स्कूल में बहुत खर्च होता है — किताबें, यूनिफॉर्म, फीस। कहते हैं जब हालात सुधरेंगे तब जाऊंगी।" वह नीचे देखती है। "शायद कभी नहीं सुधरेंगे।"',
        kn: '"ಶಾಲೆಗೆ ತುಂಬಾ ಖರ್ಚಾಗುತ್ತದೆ — ಪುಸ್ತಕಗಳು, ಸಮವಸ್ತ್ರ, ಶುಲ್ಕ ಎಂದು ಅಪ್ಪ ಹೇಳುತ್ತಾರೆ. ಪರಿಸ್ಥಿತಿ ಸುಧಾರಿಸಿದಾಗ ಹೋಗು ಅಂತಾರೆ." ಅವಳು ತಲೆ ತಗ್ಗಿಸುತ್ತಾಳೆ. "ಬಹುಶಃ ಎಂದಿಗೂ ಸುಧಾರಿಸುವುದಿಲ್ಲ."',
      },
      choices: [
        {
          label: {
            en: '"Let\'s figure this out together — meet me at school during recess"',
            hi: '"चलो मिलकर हल निकालते हैं — आधी छुट्टी में स्कूल में मिलो"',
            kn: '"ಒಟ್ಟಾಗಿ ಪರಿಹಾರ ಹುಡುಕೋಣ — ಮಧ್ಯಾಹ್ನದ ವಿರಾಮದಲ್ಲಿ ಶಾಲೆಗೆ ಬಾ"',
          },
          next: 'figure_out_together',
          xp: 15,
          propIcon: '💡',
        },
        {
          label: {
            en: '"My cousin knows someone at the ward office — let me ask"',
            hi: '"मेरा चचेरा भाई वार्ड कार्यालय में किसी को जानता है — मैं पूछता हूँ"',
            kn: '"ನನ್ನ ಸಂಬಂಧಿಕರಿಗೆ ವಾರ್ಡ್ ಕಚೇರಿಯಲ್ಲಿ ಪರಿಚಯವಿದೆ — ನಾನು ವಿಚಾರಿಸುತ್ತೇನೆ"',
          },
          next: 'cousin_lead',
          xp: 12,
          propIcon: '📝',
        },
        {
          label: {
            en: 'Lend her your old textbooks so she can study at home',
            hi: 'उसे अपनी पुरानी किताबें दें ताकि वह घर पर पढ़ सके',
            kn: 'ಮನೆಯಲ್ಲೇ ಓದಲು ಹಳೆಯ ಪುಸ್ತಕಗಳನ್ನು ನೀಡಿ',
          },
          next: 'partial_fix_start',
          xp: 5,
          propIcon: '📚',
        },
      ],
    },

    reveal_late: {
      stage: 2,
      mood: 'worried',
      location: 'teastall',
      timeOfDay: 'evening',
      sceneObjects: [
        { p: 'teaStallCounter', x: 80, y: 220 },
        { p: 'teaCups', x: 150, y: 210, args: [1] },
        { p: 'stool', x: 260, y: 260 },
        { p: 'dustCue', x: 200, y: 270 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'meena', pose: 'talking', mood: 'sad' },
      text: {
        en: 'Meena\'s eyes look heavier. "Papa still can\'t work. The stall owner says I can do full mornings now." She\'s slipping further away from school.',
        hi: 'मीना की आंखें भारी लग रही हैं। "पापा अभी भी काम नहीं कर सकते। दुकान मालिक ने कहा है कि मैं पूरी सुबह काम कर सकती हूँ।" वह स्कूल से और दूर हो रही है।',
        kn: 'ಮೀನಾಳ ಕಣ್ಣುಗಳಲ್ಲಿ ನಿರಾಶೆಯಿದೆ. "ಅಪ್ಪನಿಗೆ ಇನ್ನೂ ಹುಷಾರಾಗಿಲ್ಲ. ಅಂಗಡಿಯವರು ಇಡೀ ಬೆಳಿಗ್ಗೆ ಕೆಲಸ ಮಾಡಲು ಹೇಳಿದ್ದಾರೆ." ಅವಳು ಶಾಲೆಯಿಂದ ಇನ್ನಷ್ಟು ದೂರವಾಗುತ್ತಿದ್ದಾಳೆ.',
      },
      choices: [
        {
          label: {
            en: '"I talked to a teacher — they want to help. Will you come to school just once?"',
            hi: '"मैंने शिक्षक से बात की है — वे मदद करना चाहते हैं। क्या तुम सिर्फ एक बार स्कूल आओगी?"',
            kn: '"ನಾನು ಶಿಕ್ಷಕರೊಂದಿಗೆ ಮಾತನಾಡಿದ್ದೇನೆ — ಸಹಾಯ ಮಾಡುತ್ತಾರೆ. ಒಮ್ಮೆ ಶಾಲೆಗೆ ಬರುತ್ತೀಯಾ?"',
          },
          next: 'tell_teacher_late',
          xp: 10,
          propIcon: '👩‍🏫',
        },
        {
          label: {
            en: '"What if school was actually free? There is a law called RTE…"',
            hi: '"अगर स्कूल वाकई मुफ्त हो तो? शिक्षा का अधिकार कानून है..."',
            kn: '"ಶಾಲೆ ನಿಜವಾಗಿಯೂ ಉಚಿತವಾಗಿದ್ದರೆ? ಶಿಕ್ಷಣದ ಹಕ್ಕು ಕಾಯ್ದೆ ಇದೆ..."',
          },
          next: 'cousin_lead',
          xp: 8,
          propIcon: '📜',
        },
      ],
    },

    figure_out_together: {
      stage: 2,
      mood: 'hopeful',
      location: 'schoolyard',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'bench', x: 80, y: 250 },
        { p: 'notebooksOut', x: 120, y: 245 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'meena', pose: 'seated', mood: 'hopeful' },
      text: {
        en: 'At recess the next day, you sit together and search: turns out Article 21-A and the RTE Act say every child aged 6–14 has the right to free education — no fees, free textbooks, no denial.',
        hi: 'अगले दिन आधी छुट्टी में, आप साथ बैठकर पता लगाते हैं: अनुच्छेद 21-ए और आरटीई अधिनियम के तहत 6 से 14 वर्ष के हर बच्चे को मुफ्त शिक्षा का अधिकार है — कोई फीस नहीं, मुफ्त किताबें।',
        kn: 'ಮರುದಿನ ವಿರಾಮದಲ್ಲಿ ನೀವಿಬ್ಬರೂ ಒಟ್ಟಿಗೆ ತಿಳಿಯುತ್ತೀರಿ: 21-ಎ ವಿಧಿಯ ಪ್ರಕಾರ 6 ರಿಂದ 14 ವರ್ಷದ ಪ್ರತಿಯೊಂದು ಮಗುವಿಗೂ ಉಚಿತ ಶಿಕ್ಷಣದ ಹಕ್ಕಿದೆ — ಯಾವುದೇ ಶುಲ್ಕವಿಲ್ಲ, ಉಚಿತ ಪುಸ್ತಕಗಳು.',
      },
      choices: [
        {
          label: {
            en: 'Take this to the teacher and ask for help approaching the school committee',
            hi: 'इसे शिक्षक के पास ले जाएं और स्कूल प्रबंधन समिति से बात करने में मदद मांगें',
            kn: 'ಇದನ್ನು ಶಿಕ್ಷಕರ ಬಳಿಗೆ ಕೊಂಡೊಯ್ದು ಶಾಲಾ ಸಮಿತಿಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಹಾಯ ಕೇಳಿ',
          },
          next: 'tell_teacher',
          xp: 15,
          propIcon: '👩‍🏫',
        },
        {
          label: {
            en: "Try to talk to Meena's father directly with this information",
            hi: 'इस जानकारी के साथ सीधे मीना के पिता से बात करने की कोशिश करें',
            kn: 'ಈ ಮಾಹಿತಿಯೊಂದಿಗೆ ನೇರವಾಗಿ ಮೀನಾಳ ತಂದೆಯೊಂದಿಗೆ ಮಾತನಾಡಿ',
          },
          next: 'committee_maybe',
          xp: 8,
          propIcon: '👨',
        },
      ],
    },

    cousin_lead: {
      stage: 2,
      mood: 'hopeful',
      location: 'teastall',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'teaStallCounter', x: 80, y: 220 },
        { p: 'penProp', x: 200, y: 230 },
        { p: 'handwrittenNote', x: 220, y: 210 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'meena', pose: 'talking', mood: 'hopeful' },
      text: {
        en: 'Your cousin explains: "Under Article 21-A, government and neighbourhood schools cannot charge fees for children up to age 14. Write to the School Management Committee (SMC)!"',
        hi: 'आपका भाई समझाता है: "अनुच्छेद 21-ए के तहत, 14 वर्ष तक के बच्चों से कोई फीस नहीं ली जा सकती। स्कूल प्रबंधन समिति (एसएमसी) को पत्र लिखो!"',
        kn: 'ನಿಮ್ಮ ಸಂಬಂಧಿ ವಿವರಿಸುತ್ತಾರೆ: "21-ಎ ವಿಧಿಯಡಿ 14 ವರ್ಷದೊಳಗಿನ ಮಕ್ಕಳಿಂದ ಶಾಲೆಗಳು ಶುಲ್ಕ ಪಡೆಯುವಂತಿಲ್ಲ. ಶಾಲಾ ನಿರ್ವಹಣಾ ಸಮಿತಿಗೆ (ಎಸ್.ಎಂ.ಸಿ) ಪತ್ರ ಬರೆಯಿರಿ!"',
      },
      choices: [
        {
          label: {
            en: 'Go straight to the teacher with this info',
            hi: 'इस जानकारी के साथ सीधे शिक्षक के पास जाएं',
            kn: 'ಈ ಮಾಹಿತಿಯೊಂದಿಗೆ ನೇರವಾಗಿ ಶಿಕ್ಷಕರ ಬಳಿಗೆ ಹೋಗಿ',
          },
          next: 'tell_teacher',
          xp: 15,
          propIcon: '👩‍🏫',
        },
        {
          label: {
            en: 'Try writing the letter to the SMC yourself',
            hi: 'खुद एसएमसी को पत्र लिखने की कोशिश करें',
            kn: 'ಎಸ್.ಎಂ.ಸಿಗೆ ನೀವೇ ಪತ್ರ ಬರೆಯಲು ಪ್ರಯತ್ನಿಸಿ',
          },
          next: 'committee_maybe',
          xp: 8,
          propIcon: '📝',
        },
      ],
    },

    partial_fix_start: {
      stage: 2,
      mood: 'sad',
      location: 'teastall',
      timeOfDay: 'dusk',
      sceneObjects: [
        { p: 'oldTextbooks', x: 160, y: 220 },
        { p: 'teaStallCounter', x: 60, y: 200 },
        { p: 'feeNoticePaper', x: 260, y: 180 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'meena', pose: 'standing', mood: 'sad' },
      text: {
        en: 'You hand Meena old textbooks. She smiles, but a ₹2,400 fee notice arrives at her home. Books alone are not enough — the systemic fee barrier is the real wall.',
        hi: 'आप मीना को पुरानी किताबें देते हैं। वह मुस्कुराती है, लेकिन उसके घर ₹2,400 का फीस नोटिस आता है। सिर्फ किताबें काफी नहीं हैं — असल बाधा फीस का सिस्टम है।',
        kn: 'ನೀವು ಹಳೆಯ ಪುಸ್ತಕಗಳನ್ನು ನೀಡುತ್ತೀರಿ. ಆದರೆ ಅವಳ ಮನೆಗೆ ₹2,400 ಶುಲ್ಕದ ನೋಟಿಸ್ ಬರುತ್ತದೆ. ಬರೀ ಪುಸ್ತಕಗಳು ಸಾಲದು — ಶುಲ್ಕದ ವ್ಯವಸ್ಥೆಯೇ ದೊಡ್ಡ ತಡೆಗೋಡೆ.',
      },
      choices: [
        {
          label: {
            en: 'This is not working — talk to the teacher about the RTE Act',
            hi: 'यह काम नहीं कर रहा — आरटीई कानून के बारे में शिक्षक से बात करें',
            kn: 'ಇದು ಸರಿಹೋಗುತ್ತಿಲ್ಲ — ಶಿಕ್ಷಣ ಹಕ್ಕಿನ ಬಗ್ಗೆ ಶಿಕ್ಷಕರೊಂದಿಗೆ ಮಾತನಾಡಿ',
          },
          next: 'tell_teacher_late',
          xp: 10,
          propIcon: '👩‍🏫',
        },
        {
          label: {
            en: 'Try to raise money among friends to pay her fees',
            hi: 'दोस्तों से चंदा इकट्ठा करके उसकी फीस भरने की कोशिश करें',
            kn: 'ಸ್ನೇಹಿತರಿಂದ ಹಣ ಸಂಗ್ರಹಿಸಿ ಶುಲ್ಕ ಕಟ್ಟಲು ಪ್ರಯತ್ನಿಸಿ',
          },
          next: 'ending_partial',
          xp: 3,
          risky: true,
          propIcon: '💰',
        },
      ],
    },

    tell_teacher: {
      stage: 3,
      mood: 'hopeful',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'teacherDesk', x: 80, y: 230 },
        { p: 'blackboard', x: 60, y: 50 },
        { p: 'rtePamphlet', x: 200, y: 240 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'teacher', pose: 'talking', mood: 'happy' },
      text: {
        en: 'The teacher listens carefully, then pulls out a handbook: "You are right — Article 21-A. The School Management Committee must act on this. Let me draft the official waiver request."',
        hi: 'शिक्षक ध्यान से सुनते हैं, फिर पुस्तिका निकालते हैं: "तुम सही हो — अनुच्छेद 21-ए। स्कूल प्रबंधन समिति को इस पर कार्रवाई करनी होगी। मैं आधिकारिक पत्र तैयार करता हूँ।"',
        kn: 'ಶಿಕ್ಷಕರು ಗಮನವಿಟ್ಟು ಕೇಳಿ ಪುಸ್ತಕ ತೆಗೆಯುತ್ತಾರೆ: "ನೀವು ಹೇಳಿದ್ದು ಸರಿ — 21-ಎ ವಿಧಿ. ಶಾಲಾ ಸಮಿತಿ ಇದಕ್ಕೆ ಸ್ಪಂದಿಸಲೇಬೇಕು. ನಾನು ಪತ್ರ ಸಿದ್ಧಪಡಿಸುತ್ತೇನೆ."',
      },
      choices: [
        {
          label: {
            en: 'Help draft the letter and bring Meena to the committee meeting',
            hi: 'पत्र तैयार करने में मदद करें और मीना को समिति की बैठक में लाएं',
            kn: 'ಪತ್ರ ಸಿದ್ಧಪಡಿಸಲು ಸಹಾಯ ಮಾಡಿ ಮೀನಾಳನ್ನು ಸಮಿತಿ ಸಭೆಗೆ ಕರೆತನ್ನಿ',
          },
          next: 'committee_win',
          xp: 20,
          propIcon: '🏆',
        },
        {
          label: {
            en: 'Tell the teacher to proceed — you will encourage Meena separately',
            hi: 'शिक्षक को आगे बढ़ने दें — आप मीना को अलग से समझाएंगे',
            kn: 'ಶಿಕ್ಷಕರಿಗೆ ಮುಂದುವರಿಯಲು ಹೇಳಿ — ನೀವು ಮೀನಾಗೆ ಧೈರ್ಯ ತುಂಬಿ',
          },
          next: 'committee_win_helped',
          xp: 15,
          propIcon: '🏛️',
        },
      ],
    },

    tell_teacher_late: {
      stage: 3,
      mood: 'hopeful',
      location: 'classroom',
      timeOfDay: 'dusk',
      sceneObjects: [
        { p: 'teacherDesk', x: 80, y: 230 },
        { p: 'blackboard', x: 60, y: 50 },
        { p: 'rtePamphlet', x: 200, y: 240 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'teacher', pose: 'talking', mood: 'hopeful' },
      text: {
        en: '"It\'s late, but not too late," the teacher says. "The law is clear: free and compulsory education up to age 14. Let me bring this before the School Management Committee today."',
        hi: '"देर हुई है, लेकिन बहुत देर नहीं," शिक्षक कहते हैं। "कानून स्पष्ट है: 14 वर्ष तक मुफ्त और अनिवार्य शिक्षा। मैं आज ही इसे एसएमसी के सामने रखता हूँ।"',
        kn: '"ತಡವಾಗಿದೆ, ಆದರೆ ತೀರಾ ತಡವಾಗಿಲ್ಲ," ಶಿಕ್ಷಕರು ಹೇಳುತ್ತಾರೆ. "14 ವರ್ಷದವರೆಗೆ ಉಚಿತ ಮತ್ತು ಕಡ್ಡಾಯ ಶಿಕ್ಷಣವೆಂದು ಕಾನೂನಿನಲ್ಲಿ ಸ್ಪಷ್ಟವಾಗಿದೆ. ಇಂದೇ ಸಮಿತಿಯ ಮುಂದಿಡುತ್ತೇನೆ."',
      },
      choices: [
        {
          label: {
            en: "Offer to help and bring Meena's family in for support",
            hi: 'मदद की पेशकश करें और समर्थन के लिए मीना के परिवार को साथ लाएं',
            kn: 'ಮೀನಾಳ ಕುಟುಂಬವನ್ನು ಜೊತೆಯಲ್ಲಿ ಕರೆತರಲು ಸಹಾಯ ಮಾಡಿ',
          },
          next: 'committee_win_late',
          xp: 15,
          propIcon: '🏛️',
        },
        {
          label: {
            en: 'Let the teacher handle it from here',
            hi: 'शिक्षक को यहाँ से आगे संभालने दें',
            kn: 'ಇಲ್ಲಿಂದ ಮುಂದೆ ಶಿಕ್ಷಕರಿಗೆ ವಹಿಸಿ',
          },
          next: 'committee_maybe',
          xp: 8,
          propIcon: '🪑',
        },
      ],
    },

    // ── ENDINGS ──
    committee_win: {
      stage: 4,
      end: true,
      outcome: 'strong',
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'committeeTable', x: 60, y: 180 },
        { p: 'filledDesk', x: 200, y: 260 },
        { p: 'schoolGate', x: 300, y: 100 },
        { p: 'seedlingPot', x: 380, y: 260 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'meena', pose: 'seated', mood: 'happy' },
      badge: 'Gold Ending — Full Rights Restored',
      badgeIcon: '🏆',
      bonusXp: 50,
      text: {
        en: "The committee acts decisively. Meena's fees are completely waived, textbooks and uniform provided, and her enrollment restored. On Monday, she walks proudly through the school gate and sits at her desk, whispering: \"Thank you for not giving up on me.\"",
        hi: 'समिति ने तुरंत फैसला लिया। मीना की फीस पूरी तरह माफ कर दी गई, किताबें और यूनिफॉर्म दी गईं और उसका दाखिला बहाल हो गया। सोमवार को वह गर्व से स्कूल के गेट से अंदर आई और अपनी डेस्क पर बैठकर फुसफुसाई: "मुझ पर विश्वास बनाए रखने के लिए धन्यवाद।"',
        kn: 'ಸಮಿತಿಯು ತ್ವರಿತವಾಗಿ ಕ್ರಮ ಕೈಗೊಂಡಿತು. ಮೀನಾಳ ಶುಲ್ಕ ಸಂಪೂರ್ಣ ಮನ್ನಾವಾಯಿತು, ಪುಸ್ತಕಗಳು ಮತ್ತು ಸಮವಸ್ತ್ರ ದೊರೆತವು. ಸೋಮವಾರ ಅವಳು ಹೆಮ್ಮೆಯಿಂದ ಶಾಲೆಗೆ ಬಂದು ತನ್ನ ಡೆಸ್ಕ್‌ನಲ್ಲಿ ಕುಳಿತು ಪಿಸುಗುಟ್ಟಿದಳು: "ನನ್ನನ್ನು ಕೈಬಿಡದಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು."',
      },
    },

    committee_win_helped: {
      stage: 4,
      end: true,
      outcome: 'strong',
      mood: 'happy',
      location: 'classroom',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'teacherDesk', x: 80, y: 220 },
        { p: 'committeeTable', x: 180, y: 180 },
        { p: 'teaStallFamilies', x: 300, y: 240 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'teacher', pose: 'talking', mood: 'happy' },
      badge: 'Silver Ending — Ripple Effect Champion',
      badgeIcon: '🥈',
      bonusXp: 40,
      text: {
        en: 'The teacher presents the case to the SMC. Not only is Meena welcomed back with fee waivers, but three other families in the neighbourhood learn about their constitutional rights and enroll their children too!',
        hi: 'शिक्षक ने एसएमसी के सामने मामला रखा। न केवल मीना की फीस माफ हुई, बल्कि पड़ोस के तीन अन्य परिवारों ने भी अपने अधिकारों के बारे में जाना और अपने बच्चों का स्कूल में दाखिला कराया!',
        kn: 'ಶಿಕ್ಷಕರು ಸಮಿತಿಯಲ್ಲಿ ವಿಷಯ ಮಂಡಿಸಿದರು. ಮೀನಾಳ ಶುಲ್ಕ ಮನ್ನಾ ಆದುದಲ್ಲದೆ, ನೆರೆಹೊರೆಯ ಇನ್ನೂ 3 ಕುಟುಂಬಗಳು ತಮ್ಮ ಹಕ್ಕುಗಳನ್ನು ತಿಳಿದು ಮಕ್ಕಳನ್ನು ಶಾಲೆಗೆ ಸೇರಿಸಿದರು!',
      },
    },

    committee_win_late: {
      stage: 4,
      end: true,
      outcome: 'medium',
      mood: 'happy',
      location: 'gate',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'schoolGate', x: 120, y: 80 }],
      characterPose: 'standing',
      secondaryCharacter: { id: 'meena', pose: 'walking', mood: 'happy' },
      badge: 'Bronze Ending — Late but Restored',
      badgeIcon: '🥉',
      bonusXp: 30,
      text: {
        en: "It took longer than it should have, and catching up won't be easy. But Meena is back — walking through the school gate with hope in her eyes. The Right to Education prevailed.",
        hi: 'इसमें समय लगा और पढ़ाई की भरपाई आसान नहीं होगी। लेकिन मीना वापस आ गई है — उम्मीद भरी आँखों के साथ स्कूल के गेट से अंदर आते हुए। शिक्षा के अधिकार की जीत हुई।',
        kn: 'ಸ್ವಲ್ಪ ಸಮಯ ಹಿಡಿಯಿತು, ಆದರೆ ಮೀನಾ ಮತ್ತೆ ಶಾಲೆಗೆ ಬಂದಿದ್ದಾಳೆ. ಶಿಕ್ಷಣದ ಹಕ್ಕು ಜಯಗಳಿಸಿತು.',
      },
    },

    committee_maybe: {
      stage: 4,
      end: true,
      outcome: 'medium-low',
      mood: 'hopeful',
      location: 'teastall',
      timeOfDay: 'dusk',
      sceneObjects: [
        { p: 'teaStallCounter', x: 80, y: 220 },
        { p: 'teaStallFamilies', x: 250, y: 240 },
      ],
      characterPose: 'standing',
      secondaryCharacter: null,
      badge: 'Hopeful Ending — The Seed Planted',
      badgeIcon: '🌱',
      bonusXp: 20,
      text: {
        en: "Meena's father begins discussing with community elders. Change is gradual, but the knowledge of Article 21-A is spreading. The seed of legal empowerment is planted.",
        hi: 'मीना के पिता समुदाय के बुजुर्गों से चर्चा करने लगे हैं। बदलाव धीमा है, लेकिन अनुच्छेद 21-ए की जानकारी फैल रही है। जागरूकता का बीज बो दिया गया है।',
        kn: 'ಮೀನಾಳ ತಂದೆ ಹಿರಿಯರೊಂದಿಗೆ ಚರ್ಚಿಸಲು ಪ್ರಾರಂಭಿಸಿದ್ದಾರೆ. ಬದಲಾವಣೆ ನಿಧಾನವಾದರೂ, 21-ಎ ವಿಧಿಯ ಅರಿವು ಮೂಡಿದೆ.',
      },
    },

    ending_partial: {
      stage: 4,
      end: true,
      outcome: 'weak',
      mood: 'sad',
      location: 'teastall',
      timeOfDay: 'evening',
      sceneObjects: [
        { p: 'teaStallCounter', x: 80, y: 220 },
        { p: 'feeNoticePaper', x: 200, y: 210 },
      ],
      characterPose: 'standing',
      secondaryCharacter: { id: 'meena', pose: 'standing', mood: 'sad' },
      badge: 'Partial Ending — Charity without System',
      badgeIcon: '💔',
      bonusXp: 10,
      text: {
        en: 'Crowdfunding helped for one month, but recurring fees returned. Goodwill without enforcing constitutional rights cannot substitute for the Right to Education Act.',
        hi: 'दोस्तों की मदद से एक महीने की फीस तो भर गई, लेकिन अगले महीने फिर वही समस्या आई। कानूनी अधिकारों को जाने बिना केवल दान से स्थायी समाधान नहीं हो सकता।',
        kn: 'ಒಂದು ತಿಂಗಳ ಶುಲ್ಕ ಸಹಾಯವಾಯಿತು, ಆದರೆ ಮುಂದಿನ ತಿಂಗಳು ಸಮಸ್ಯೆ ಮರುಕಳಿಸಿತು. ಕೇವಲ ದಾನದಿಂದ ಶಿಕ್ಷಣದ ಹಕ್ಕಿನ ಬದಲೀ ವ್ಯವಸ್ಥೆ ಸಾಧ್ಯವಿಲ್ಲ.',
      },
    },

    ending_missed: {
      stage: 4,
      end: true,
      outcome: 'weak',
      mood: 'sad',
      location: 'gate',
      timeOfDay: 'evening',
      sceneObjects: [
        { p: 'schoolGateClosed', x: 120, y: 80 },
        { p: 'noticeBoard', x: 300, y: 120 },
        { p: 'pinnedPaper', x: 315, y: 135, args: ['Withdrawn'] },
      ],
      characterPose: 'standing',
      secondaryCharacter: null,
      badge: 'Closed Gate Ending — Silence Has a Cost',
      badgeIcon: '🔒',
      bonusXp: 5,
      text: {
        en: "Meena's name is crossed off the attendance register. Rights on paper mean nothing if no one speaks up. Article 21-A exists so that we stand together for every child's future.",
        hi: 'मीना का नाम रजिस्टर से काट दिया गया। कागजों पर अधिकार होने का कोई मतलब नहीं जब तक कोई आवाज न उठाए। अनुच्छेद 21-ए इसीलिए है ताकि हम हर बच्चे के भविष्य के लिए खड़े हों।',
        kn: 'ಮೀನಾಳ ಹೆಸರು ದಾಖಲೆಯಿಂದ ತೆಗೆಯಲ್ಪಟ್ಟಿತು. ಯಾರೂ ಧ್ವನಿ ಎತ್ತದಿದ್ದರೆ ಕಾಗದದಲ್ಲಿರುವ ಹಕ್ಕುಗಳು ನಿಷ್ಪ್ರಯೋಜಕ. ಪ್ರತಿಯೊಂದು ಮಗುವಿನ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ನಾವು ನಿಲ್ಲಬೇಕು.',
      },
    },
  },
  quiz: [
    {
      question: {
        en: 'Under Article 21-A of the Indian Constitution, education is a free and compulsory fundamental right for children between what ages?',
        hi: 'भारतीय संविधान के अनुच्छेद 21-ए के तहत, किस आयु वर्ग के बच्चों के लिए शिक्षा एक मुफ्त और अनिवार्य मौलिक अधिकार है?',
        kn: 'ಭಾರತೀಯ ಸಂವಿಧಾನದ ವಿಧಿ 21-ಎ ಅಡಿಯಲ್ಲಿ ಯಾವ ವಯಸ್ಸಿನ ಮಕ್ಕಳಿಗೆ ಶಿಕ್ಷಣ ಉಚಿತ ಮತ್ತು ಕಡ್ಡಾಯ ಮೂಲಭೂತ ಹಕ್ಕಾಗಿದೆ?',
      },
      options: [
        { en: '3 to 8 years', hi: '3 से 8 वर्ष', kn: '3 ರಿಂದ 8 ವರ್ಷ' },
        { en: '6 to 14 years', hi: '6 से 14 वर्ष', kn: '6 ರಿಂದ 14 ವರ್ಷ' },
        { en: '10 to 18 years', hi: '10 से 18 वर्ष', kn: '10 ರಿಂದ 18 ವರ್ಷ' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'Article 21-A guarantees free and compulsory elementary education to every child aged 6 to 14 in India.',
        hi: 'अनुच्छेद 21-ए भारत में 6 से 14 वर्ष की आयु के प्रत्येक बच्चे को मुफ्त और अनिवार्य प्राथमिक शिक्षा की गारंटी देता है।',
        kn: 'ವಿಧಿ 21-ಎ ಭಾರತದಲ್ಲಿ 6 ರಿಂದ 14 ವರ್ಷದ ಪ್ರತಿಯೊಂದು ಮಗುವಿಗೂ ಉಚಿತ ಮತ್ತು ಕಡ್ಡಾಯ ಶಿಕ್ಷಣವನ್ನು ಖಾತರಿಪಡಿಸುತ್ತದೆ.',
      },
    },
    {
      question: {
        en: 'Can a school deny admission or expel a child due to lack of a birth certificate or inability to pay sudden extra fees?',
        hi: 'क्या कोई स्कूल जन्म प्रमाण पत्र न होने या अतिरिक्त फीस न दे पाने के कारण बच्चे को स्कूल से निकाल सकता है?',
        kn: 'ಜನನ ಪ್ರಮಾಣಪತ್ರ ಇಲ್ಲದಿರುವುದು ಅಥವಾ ಶುಲ್ಕ ಪಾವತಿಸಲಾಗದ ಕಾರಣಕ್ಕೆ ಮಗುವನ್ನು ಶಾಲೆಯಿಂದ ಹೊರಹಾಕಬಹುದೇ?',
      },
      options: [
        { en: 'Yes, if the headmaster orders it', hi: 'हाँ, यदि प्रधानाध्यापक आदेश दें', kn: 'ಹೌದು, ಮುಖ್ಯಸ್ಥರು ಆದೇಶಿಸಿದರೆ' },
        { en: 'No, Section 3 & 14 of RTE strictly forbid denying education', hi: 'नहीं, आरटीई कानून शिक्षा से वंचित करने पर रोक लगाता है', kn: 'ಇಲ್ಲ, ಆರ್‌ಟಿಇ ಕಾಯ್ದೆಯು ಶಿಕ್ಷಣ ನಿರಾಕರಿಸುವುದನ್ನು ನಿಷೇಧಿಸುತ್ತದೆ' },
        { en: 'Only for private schools', hi: 'केवल निजी स्कूलों के लिए', kn: 'ಕೇವಲ ಖಾಸಗಿ ಶಾಲೆಗಳಿಗೆ' },
      ],
      correctIndex: 1,
      explanation: {
        en: 'Under the RTE Act, lack of age proof or financial hardship can never be grounds to deny admission or expel a child.',
        hi: 'आरटीई अधिनियम के तहत, उम्र का प्रमाण न होना या आर्थिक तंगी कभी भी निष्कासन का आधार नहीं हो सकती।',
        kn: 'ಆರ್‌ಟಿಇ ಕಾಯ್ದೆಯಡಿ, ಆರ್ಥಿಕ ತೊಂದರೆ ಅಥವಾ ದಾಖಲೆಗಳ ಕೊರತೆಯು ಶಾಲೆಯಿಂದ ಹೊರಹಾಕಲು ಕಾರಣವಾಗಲಾರದು.',
      },
    },
  ],
};
