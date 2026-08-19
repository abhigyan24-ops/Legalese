/**
 * right-to-equality.js
 * 
 * "Kabir and the Playground of Equals" — Articles 14, 15 & 17 of the Constitution of India
 * Junior Track (Ages 8–11)
 * Full story with nodes, scene objects, acts, branch choices, XP rewards, and statutory facts.
 * Fully localized in English, Hindi, and Kannada.
 */

export default {
  id: 'right-to-equality',
  track: 'junior',
  ageTier: '8-11',
  title: {
    en: "Kabir and the Playground of Equals",
    hi: 'कबीर और समानता का खेल का मैदान',
    kn: 'ಕಬೀರ್ ಮತ್ತು ಸಮಾನತೆಯ ಆಟದ ಮೈದಾನ',
  },
  subtitle: {
    en: 'Articles 14, 15 & 17 — Equality Before Law & Prohibition of Discrimination',
    hi: 'अनुच्छेद 14, 15 और 17 — कानून के समक्ष समानता और भेदभाव का निषेध',
    kn: 'ವಿಧಿ 14, 15 ಮತ್ತು 17 — ಕಾನೂನಿನ ಮುಂದೆ ಸಮಾನತೆ ಮತ್ತು ತಾರತಮ್ಯ ನಿಷೇಧ',
  },
  actTag: 'Articles 14 & 15',
  icon: '⚖️',
  startNode: 'start',
  stages: [
    { icon: '🏃', label: 'Playground' },
    { icon: '💧', label: 'The Well' },
    { icon: '💬', label: 'The Protest' },
    { icon: '🏛️', label: 'Assembly' },
    { icon: '🏁', label: 'Fair Play' },
  ],
  nodes: {
    start: {
      stage: 0,
      mood: 'neutral',
      location: 'playground',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'sportsTrack', x: 50, y: 200 },
        { p: 'schoolBuilding', x: 280, y: 60 },
        { p: 'flagPost', x: 200, y: 80 },
        { p: 'waterStation', x: 120, y: 260 },
      ],
      characterPose: 'standing',
      secondaryCharacter: null,
      text: {
        en: "It is the annual Inter-School Sports Day. Kabir and his relay team arrive early, but a tournament referee tells them they must sit on the grass outside the main pavilion and cannot use the common water dispenser.",
        hi: 'यह वार्षिक अंतर-विद्यालय खेल दिवस है। कबीर और उसकी रिले टीम जल्दी पहुँचती है, लेकिन एक रेफरी उनसे कहता है कि उन्हें मुख्य मंडप से बाहर बैठना होगा और वे सामान्य पानी का उपयोग नहीं कर सकते।',
        kn: 'ಇದು ವಾರ್ಷಿಕ ಅಂತರ್-ಶಾಲಾ ಕ್ರೀಡಾ ದಿನ. ಕಬೀರ್ ಮತ್ತು ಅವನ ರಿಲೇ ತಂಡ ಬೇಗನೆ ಬರುತ್ತದೆ, ಆದರೆ ಮುಖ್ಯ ಮೈದಾನದಿಂದ ಹೊರಗೆ ಕುಳಿತುಕೊಳ್ಳಬೇಕೆಂದು ಮತ್ತು ಸಾಮಾನ್ಯ ನೀರಿನ ಬ್ಯಾರೆಲ್ ಬಳಸುವಂತಿಲ್ಲ ಎಂದು ರೆಫ್ರಿ ಹೇಳುತ್ತಾನೆ.',
      },
      didYouKnow: {
        en: 'Article 15 of the Constitution of India strictly prohibits discrimination against any citizen on grounds only of religion, race, caste, sex, place of birth or any of them in access to public places, wells, tanks, and sports grounds.',
        hi: 'भारतीय संविधान का अनुच्छेद 15 सार्वजनिक स्थानों, कुओं, मैदानों में धर्म, जाति, लिंग या जन्म स्थान के आधार पर किसी भी नागरिक के साथ भेदभाव पर सख्त रोक लगाता है।',
        kn: 'ಭಾರತೀಯ ಸಂವಿಧಾನದ ವಿಧಿ 15 ಯಾವುದೇ ಸಾರ್ವಜನಿಕ ಸ್ಥಳ, ಕುಡಿಯುವ ನೀರು ಅಥವಾ ಆಟದ ಮೈದಾನದಲ್ಲಿ ಜಾತಿ, ಧರ್ಮ, ಲಿಂಗದ ಆಧಾರದ ಮೇಲೆ ತಾರತಮ್ಯ ಮಾಡುವುದನ್ನು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ನಿಷೇಧಿಸುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Politely question the referee and assert that the sports ground belongs equally to all students',
            hi: 'रेफरी से विनम्रतापूर्वक प्रश्न करें और कहें कि खेल का मैदान सभी बच्चों का समान रूप से है',
            kn: 'ರೆಫ್ರಿಯನ್ನು ವಿನಮ್ರವಾಗಿ ಪ್ರಶ್ನಿಸಿ ಮತ್ತು ಕ್ರೀಡಾಂಗಣವು ಎಲ್ಲಾ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೂ ಸಮಾನವಾಗಿ ಸೇರಿದೆ ಎಂದು ತಿಳಿಸಿ',
          },
          next: 'question_referee',
          xp: 15,
          propIcon: '⚖️',
        },
        {
          label: {
            en: 'Go talk to the School Captain and Teacher-in-Charge immediately',
            hi: 'तुरंत स्कूल कैप्टन और प्रभारी शिक्षक से बात करने जाएं',
            kn: 'ಕೂಡಲೇ ಶಾಲಾ ನಾಯಕ ಮತ್ತು ಮುಖ್ಯ ಶಿಕ್ಷಕರ ಬಳಿ ಮಾತನಾಡಿ',
          },
          next: 'speak_to_captain',
          xp: 20,
          propIcon: '🗣️',
        },
        {
          label: {
            en: 'Silently sit in the corner and skip the tournament',
            hi: 'चुपचाप कोने में बैठ जाएं और खेल छोड़ दें',
            kn: 'ಸುಮ್ಮನೆ ಮೂಲೆಯಲ್ಲಿ ಕುಳಿತುಕೊಂಡು ಪಂದ್ಯಾವಳಿಯಿಂದ ಹಿಂದೆ ಸರಿಯಿರಿ',
          },
          next: 'hesitate_step',
          xp: 5,
          propIcon: '💔',
        },
      ],
    },

    question_referee: {
      stage: 1,
      mood: 'serious',
      location: 'playground',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'waterStation', x: 120, y: 260 },
        { p: 'refereeStand', x: 260, y: 180 },
      ],
      characterPose: 'speaking',
      text: {
        en: "Kabir looks the referee in the eye: 'Sir, our Constitution says every child has equal dignity and equal right to participate.' Other students gather around, listening closely.",
        hi: "कबीर रेफरी की आँखों में देखकर कहता है: 'सर, हमारा संविधान कहता है कि हर बच्चे को समान सम्मान और भाग लेने का समान अधिकार है।' अन्य छात्र आसपास इकट्ठा होकर ध्यान से सुनते हैं।",
        kn: "ಕಬೀರ್ ರೆಫ್ರಿಗೆ ಧೈರ್ಯದಿಂದ ಹೇಳುತ್ತಾನೆ: 'ಸರ್, ನಮ್ಮ ಸಂವಿಧಾನವು ಪ್ರತಿಯೊಂದು ಮಗುವಿಗೂ ಸಮಾನ ಗೌರವ ಮತ್ತು ಭಾಗವಹಿಸುವ ಹಕ್ಕನ್ನು ನೀಡಿದೆ.' ಇತರ ವಿದ್ಯಾರ್ಥಿಗಳು ಸುತ್ತಲೂ ಸೇರಿ ಕೇಳುತ್ತಾರೆ.",
      },
      didYouKnow: {
        en: 'Article 14 guarantees equality before the law and equal protection of the laws within the territory of India to all individuals.',
        hi: 'अनुच्छेद 14 भारत के क्षेत्र में सभी व्यक्तियों को कानून के समक्ष समानता और कानूनों के समान संरक्षण की गारंटी देता है।',
        kn: 'ವಿಧಿ 14 ಭಾರತದ ಪ್ರತಿಯೊಬ್ಬ ವ್ಯಕ್ತಿಗೂ ಕಾನೂನಿನ ಮುಂದೆ ಸಮಾನತೆ ಮತ್ತು ಸಮಾನ ರಕ್ಷಣೆಯನ್ನು ಖಾತರಿಪಡಿಸುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Invite all relay teams together to share the water station',
            hi: 'सभी रिले टीमों को एक साथ पानी साझा करने के लिए आमंत्रित करें',
            kn: 'ಎಲ್ಲಾ ರಿಲೇ ತಂಡಗಳನ್ನು ಒಟ್ಟಾಗಿ ನೀರಿನ ಕೇಂದ್ರಕ್ಕೆ ಆಹ್ವಾನಿಸಿ',
          },
          next: 'share_water',
          xp: 20,
          propIcon: '🤝',
        },
        {
          label: {
            en: 'Present the official tournament rulebook alongside the Constitution to the Head Judge',
            hi: 'मुख्य न्यायाधीश को संविधान और टूर्नामेंट की आधिकारिक नियम पुस्तिका दिखाएं',
            kn: 'ಮುಖ್ಯ ತೀರ್ಪುಗಾರರಿಗೆ ಸಂವಿಧಾನ ಮತ್ತು ನಿಯಮಾವಳಿಗಳನ್ನು ತೋರಿಸಿ',
          },
          next: 'head_judge',
          xp: 25,
          propIcon: '📜',
        },
      ],
    },

    speak_to_captain: {
      stage: 1,
      mood: 'hopeful',
      location: 'schoolBuilding',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'deskRow', x: 50, y: 220 },
        { p: 'trophyCabinet', x: 280, y: 140 },
      ],
      characterPose: 'explaining',
      text: {
        en: "School Captain Ananya and Civics Teacher Mr. Verma are shocked. 'Discrimination has no place in sports, in our school, or under Indian law,' says Mr. Verma.",
        hi: "स्कूल कैप्टन अनन्या और नागरिक शास्त्र के शिक्षक श्री वर्मा हैरान हैं। 'खेल में, हमारे स्कूल में और भारतीय कानून के तहत भेदभाव का कोई स्थान नहीं है,' श्री वर्मा कहते हैं।",
        kn: "ಶಾಲಾ ನಾಯಕಿ ಅನನ್ಯಾ ಮತ್ತು ಶಿಕ್ಷಕ ವರ್ಮಾ ಆಘಾತಕ್ಕೊಳಗಾಗುತ್ತಾರೆ. 'ಕ್ರೀಡೆಯಲ್ಲಿ ಮತ್ತು ನಮ್ಮ ಸಂವಿಧಾನದ ಅಡಿಯಲ್ಲಿ ತಾರತಮ್ಯಕ್ಕೆ ಕಿಂಚಿತ್ತೂ ಜಾಗವಿಲ್ಲ,' ಎನ್ನುತ್ತಾರೆ ವರ್ಮಾ.",
      },
      didYouKnow: {
        en: 'Article 17 of the Constitution completely abolishes untouchability and forbids its practice in any form. Practicing it is a punishable offence.',
        hi: 'संविधान का अनुच्छेद 17 अस्पृश्यता को पूरी तरह से समाप्त करता है और किसी भी रूप में इसके आचरण पर रोक लगाता है। ऐसा करना एक दंडनीय अपराध है।',
        kn: 'ಸಂವಿಧಾನದ ವಿಧಿ 17 ಅಸ್ಪೃಶ್ಯತೆಯನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ರದ್ದುಗೊಳಿಸಿದೆ ಮತ್ತು ಯಾವುದೇ ರೂಪದಲ್ಲಿ ತಾರತಮ್ಯ ಮಾಡುವುದು ಶಿಕ್ಷಾರ್ಹ ಅಪರಾಧವಾಗಿದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Lead a unified pledge on equality before the opening race starts',
            hi: 'दौड़ शुरू होने से पहले समानता पर एक संयुक्त शपथ का नेतृत्व करें',
            kn: 'ಸ್ಪರ್ಧೆ ಆರಂಭವಾಗುವ ಮುನ್ನ ಸಮಾನತೆಯ ಪ್ರತಿಜ್ಞೆಯನ್ನು ಮುನ್ನಡೆಸಿ',
          },
          next: 'pledge_unity',
          xp: 25,
          propIcon: '🌟',
        },
        {
          label: {
            en: 'File an official written note with the District Sports Committee',
            hi: 'जिला खेल समिति के पास एक आधिकारिक लिखित शिकायत दर्ज करें',
            kn: 'ಜಿಲ್ಲಾ ಕ್ರೀಡಾ ಸಮಿತಿಗೆ ಲಿಖಿತ ದೂರು ಸಲ್ಲಿಸಿ',
          },
          next: 'head_judge',
          xp: 20,
          propIcon: '📝',
        },
      ],
    },

    hesitate_step: {
      stage: 1,
      mood: 'sad',
      location: 'playground',
      timeOfDay: 'day',
      sceneObjects: [{ p: 'sportsTrack', x: 50, y: 200 }],
      characterPose: 'sitting',
      text: {
        en: "Sitting on the sidelines, Kabir remembers Dr. B.R. Ambedkar's words: 'Equality is the soul of justice.' He realizes staying silent allows unfairness to continue.",
        hi: "किनारे बैठकर कबीर को डॉ. बी.आर. अंबेडकर के शब्द याद आते हैं: 'समानता न्याय की आत्मा है।' उसे एहसास होता है कि चुप रहने से अन्याय बढ़ता है।",
        kn: "ದೂರದಲ್ಲಿ ಕುಳಿತ ಕಬೀರ್‌ಗೆ ಡಾ. ಬಿ.ಆರ್. ಅಂಬೇಡ್ಕರ್ ಅವರ ಮಾತು ನೆನಪಾಗುತ್ತದೆ: 'ಸಮಾನತೆಯೇ ನ್ಯಾಯದ ಜೀವಾಳ.' ಸುಮ್ಮನಿದ್ದರೆ ಅನ್ಯಾಯ ಮುಂದುವರಿಯುತ್ತದೆ ಎಂದು ಅರಿವಾಗುತ್ತದೆ.",
      },
      didYouKnow: {
        en: 'The Preamble to the Constitution of India explicitly resolves to secure to all its citizens: JUSTICE, LIBERTY, EQUALITY of status and of opportunity, and FRATERNITY.',
        hi: 'भारतीय संविधान की प्रस्तावना अपने सभी नागरिकों को न्याय, स्वतंत्रता, प्रतिष्ठा और अवसर की समानता तथा बंधुत्व सुरक्षित करने का संकल्प लेती है।',
        kn: 'ಭಾರತೀಯ ಸಂವಿಧಾನದ ಪ್ರಸ್ತಾವನೆಯು ಎಲ್ಲಾ ನಾಗರಿಕರಿಗೆ ಸಮಾನ ಸ್ಥಾನಮಾನ ಮತ್ತು ಅವಕಾಶದ ಸಮಾನತೆಯನ್ನು ಭರವಸೆ ನೀಡುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Stand back up, rally the team, and march to the teacher coordinator',
            hi: 'वापस खड़े हों, टीम को साथ लें और शिक्षक समन्वयक के पास जाएं',
            kn: 'ಧೈರ್ಯದಿಂದ ಎದ್ದುನಿಂತು ತಂಡವನ್ನು ಒಗ್ಗೂಡಿಸಿ ಶಿಕ್ಷಕರ ಬಳಿ ಹೋಗಿ',
          },
          next: 'speak_to_captain',
          xp: 20,
          propIcon: '✊',
        },
      ],
    },

    share_water: {
      stage: 2,
      mood: 'happy',
      location: 'waterStation',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'waterStation', x: 120, y: 260 },
        { p: 'bannerEquality', x: 200, y: 80 },
      ],
      characterPose: 'standing',
      text: {
        en: "Students from all competing schools drink from the same water station, celebrating friendship and sportsmanship. The referee realizes his mistake and apologizes.",
        hi: "सभी प्रतिस्पर्धी स्कूलों के छात्र एक ही पानी के केंद्र से पानी पीते हैं और दोस्ती का जश्न मनाते हैं। रेफरी को अपनी गलती का एहसास होता है और वह माफी मांगता है।",
        kn: "ಎಲ್ಲಾ ಶಾಲೆಗಳ ಮಕ್ಕಳು ಒಂದೇ ನೀರಿನ ಕೇಂದ್ರದಿಂದ ನೀರು ಕುಡಿದು ಕ್ರೀಡಾಸ್ಫೂರ್ತಿಯನ್ನು ಆಚರಿಸುತ್ತಾರೆ. ರೆಫ್ರಿಗೆ ತನ್ನ ತಪ್ಪಿನ ಅರಿವಾಗಿ ಕ್ಷಮೆ ಕೇಳುತ್ತಾನೆ.",
      },
      didYouKnow: {
        en: 'The Protection of Civil Rights Act, 1955 prescribes penalties for enforcing religious or social disabilities regarding access to water sources, public restaurants, and recreational areas.',
        hi: 'नागरिक अधिकार संरक्षण अधिनियम, 1955 जल स्रोतों, भोजनालयों और मनोरंजन स्थलों पर सामाजिक भेदभाव करने पर कानूनी दंड का प्रावधान करता है।',
        kn: 'ನಾಗರಿಕ ಹಕ್ಕುಗಳ ರಕ್ಷಣೆ ಕಾಯ್ದೆ 1955 ಸಾರ್ವಜನಿಕ ಸ್ಥಳಗಳು ಮತ್ತು ನೀರಿನ ಮೂಲಗಳಲ್ಲಿ ತಾರತಮ್ಯ ಮಾಡುವುದಕ್ಕೆ ಕಠಿಣ ಶಿಕ್ಷೆಯನ್ನು ವಿಧಿಸುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Proceed to the Grand Relay Race with all teams together',
            hi: 'सभी टीमों के साथ मिलकर ग्रैंड रिले रेस में भाग लें',
            kn: 'ಎಲ್ಲಾ ತಂಡಗಳೊಂದಿಗೆ ಒಟ್ಟಾಗಿ ಮುಖ್ಯ ರಿಲೇ ಓಟದ ಸ್ಪರ್ಧೆಗೆ ಮುನ್ನಡೆಯಿರಿ',
          },
          next: 'victory_relay',
          xp: 25,
          propIcon: '🏆',
        },
      ],
    },

    head_judge: {
      stage: 2,
      mood: 'celebratory',
      location: 'schoolBuilding',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'flagPost', x: 200, y: 80 },
        { p: 'podium', x: 150, y: 220 },
      ],
      characterPose: 'standing',
      text: {
        en: "The Head Judge immediately issues an announcement over the loudspeaker: 'Every student in this district stands as an equal competitor. The Constitution guarantees equal opportunity to all.'",
        hi: "मुख्य न्यायाधीश ने लाउडस्पीकर पर घोषणा की: 'इस जिले का हर छात्र समान प्रतियोगी है। संविधान सभी को समान अवसर की गारंटी देता है।'",
        kn: "ಮುಖ್ಯ ತೀರ್ಪುಗಾರರು ಮೈಕ್‌ನಲ್ಲಿ ಘೋಷಿಸುತ್ತಾರೆ: 'ಈ ಜಿಲ್ಲೆಯ ಪ್ರತಿಯೊಂದು ಮಗುವೂ ಸಮಾನ ಸ್ಪರ್ಧಿ. ಸಂವಿಧಾನವು ಎಲ್ಲರಿಗೂ ಸಮಾನ ಅವಕಾಶವನ್ನು ಖಾತರಿಪಡಿಸಿದೆ.'",
      },
      didYouKnow: {
        en: 'Equal opportunity in public participation builds fraternity and dignity, which are fundamental goals of the Indian Constitution.',
        hi: 'सार्वजनिक भागीदारी में समान अवसर बंधुत्व और सम्मान का निर्माण करता है, जो भारतीय संविधान का मूल लक्ष्य है।',
        kn: 'ಸಾರ್ವಜನಿಕ ಭಾಗವಹಿಸುವಿಕೆಯಲ್ಲಿ ಸಮಾನ ಅವಕಾಶವು ದೇಶದ ಏಕತೆ ಮತ್ತು ಸಹೋದರತ್ವವನ್ನು ಬಲಪಡಿಸುತ್ತದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Deliver the Opening Sports Equality Pledge on the Podium',
            hi: 'मंच से खेल समानता की प्रारंभिक शपथ दिलाएं',
            kn: 'ವೇದಿಕೆಯಿಂದ ಸಮಾನತೆಯ ಕ್ರೀಡಾ ಪ್ರತಿಜ್ಞೆಯನ್ನು ಬೋಧಿಸಿ',
          },
          next: 'pledge_unity',
          xp: 30,
          propIcon: '🎤',
        },
      ],
    },

    pledge_unity: {
      stage: 3,
      mood: 'inspiring',
      location: 'playground',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'sportsTrack', x: 50, y: 200 },
        { p: 'crowdCheers', x: 220, y: 120 },
      ],
      characterPose: 'cheering',
      text: {
        en: "Kabir leads over 500 student athletes in the pledge: 'We stand equal before the law, united in learning, united in play!' The crowd bursts into thunderous applause.",
        hi: "कबीर 500 से अधिक छात्रों को शपथ दिलाता है: 'हम कानून के समक्ष समान हैं, सीखने में एकजुट हैं, खेलने में एकजुट हैं!' मैदान तालियों की गड़गड़ाहट से गूंज उठता है।",
        kn: "ಕಬೀರ್ 500 ಕ್ಕೂ ಹೆಚ್ಚು ವಿದ್ಯಾರ್ಥಿಗಳೊಂದಿಗೆ ಪ್ರತಿಜ್ಞೆ ಮಾಡುತ್ತಾನೆ: 'ನಾವೆಲ್ಲರೂ ಕಾನೂನಿನ ಮುಂದೆ ಸಮಾನರು, ಕ್ರೀಡೆ ಮತ್ತು ಕಲಿಕೆಯಲ್ಲಿ ಒಂದಾಗಿದ್ದೇವೆ!' ಇಡೀ ಮೈದಾನ ಹರ್ಷೋದ್ಗಾರದಿಂದ ತುಂಬುತ್ತದೆ.",
      },
      didYouKnow: {
        en: 'Right to Equality forms the bedrock of Part III (Fundamental Rights) of the Constitution of India.',
        hi: 'समानता का अधिकार भारतीय संविधान के भाग III (मौलिक अधिकार) की नींव है।',
        kn: 'ಸಮಾನತೆಯ ಹಕ್ಕು ಭಾರತೀಯ ಸಂವಿಧಾನದ ಮೂಲಭೂತ ಹಕ್ಕುಗಳ ಅಡಿಪಾಯವಾಗಿದೆ.',
      },
      choices: [
        {
          label: {
            en: 'Step onto the track for the final championship race',
            hi: 'अंतिम चैंपियनशिप दौड़ के लिए ट्रैक पर कदम रखें',
            kn: 'ಅಂತಿಮ ಚಾಂಪಿಯನ್‌ಶಿಪ್ ಓಟದ ಸ್ಪರ್ಧೆಗೆ ಸಿದ್ಧರಾಗಿ',
          },
          next: 'victory_relay',
          xp: 25,
          propIcon: '🥇',
        },
      ],
    },

    victory_relay: {
      stage: 4,
      mood: 'victory',
      location: 'playground',
      timeOfDay: 'day',
      sceneObjects: [
        { p: 'podium', x: 150, y: 220 },
        { p: 'trophyCabinet', x: 280, y: 140 },
        { p: 'flagPost', x: 200, y: 80 },
      ],
      characterPose: 'triumph',
      end: true,
      text: {
        en: "Kabir's relay team crosses the finish line hand-in-hand with competitors from across the district. You have successfully defended the constitutional Right to Equality!",
        hi: "कबीर की रिले टीम सभी प्रतिस्पर्धियों के साथ मिलकर फिनिश लाइन पार करती है। आपने समानता के संवैधानिक अधिकार की सफलतापूर्वक रक्षा की है!",
        kn: "ಕಬೀರ್‌ನ ತಂಡವು ಎಲ್ಲಾ ಸಹ-ಸ್ಪರ್ಧಿಗಳೊಂದಿಗೆ ಗೆಲುವಿನ ಗೆರೆಯನ್ನು ದಾಟುತ್ತದೆ. ನೀವು ಸಮಾನತೆಯ ಸಾಂವಿಧಾನಿಕ ಹಕ್ಕನ್ನು ಯಶಸ್ವಿಯಾಗಿ ರಕ್ಷಿಸಿದ್ದೀರಿ!",
      },
      badge: {
        id: 'badge-equality-champion',
        name: 'Equality & Dignity Champion',
        icon: '⚖️',
        article: 'Articles 14 & 15',
      },
    },
  },
};
