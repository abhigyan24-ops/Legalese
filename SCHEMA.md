# Story JSON Schema

## Overview

Rights Quest stories are defined as JSON files following a branching narrative structure. Each story consists of nodes (scenes) connected by choices, with multiple possible endings based on the player's decisions.

## Schema Structure

### Root Level

```json
{
  "startNode": "string",
  "stages": [/* array of 5 stage objects */],
  "nodes": {/* object keyed by node ID */}
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `startNode` | string | Yes | ID of the first node to display |
| `stages` | array | Yes | Array of exactly 5 stage marker objects (acts/chapters) |
| `nodes` | object | Yes | Object containing all story nodes, keyed by node ID |

### Stage Object

```json
{
  "icon": "emoji",
  "label": "string"
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `icon` | string | Yes | Emoji representing this stage |
| `label` | string | Yes | Stage name (not currently localized) |

**Example:**
```json
{
  "icon": "🏫",
  "label": "The Beginning"
}
```

### Story Node (Non-Ending)

```json
{
  "stage": 0,
  "mood": "neutral",
  "characters": ["teacher", "student"],
  "text": {
    "en": "You arrive at school...",
    "hi": "आप स्कूल पहुंचते हैं...",
    "kn": "ನೀವು ಶಾಲೆಗೆ ಬರುತ್ತೀರಿ..."
  },
  "sceneObjects": ["classroom", "books"],
  "choices": [
    {
      "label": {
        "en": "Enter the classroom",
        "hi": "कक्षा में प्रवेश करें",
        "kn": "ತರಗತಿಯನ್ನು ಪ್ರವೇಶಿಸಿ"
      },
      "next": "node2",
      "xp": 10
    }
  ]
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `stage` | number | Yes | Stage index (0-4) indicating which act this node belongs to |
| `mood` | string | Yes | Emotional tone: `"neutral"`, `"worried"`, `"hopeful"`, `"happy"` |
| `characters` | array | Yes | Array of character IDs present in this scene |
| `text` | object | Yes | Localized narrative text with keys: `en`, `hi`, `kn` |
| `sceneObjects` | array | Yes | Array of scene prop IDs for background elements |
| `didYouKnow` | object | No | Optional verified statutory fact callout with keys: `en`, `hi`, `kn` |
| `choices` | array | Yes | Array of choice objects (see below) |

### Choice Object

```json
{
  "label": {
    "en": "Choice text",
    "hi": "विकल्प पाठ",
    "kn": "ಆಯ್ಕೆ ಪಠ್ಯ"
  },
  "next": "node_id",
  "xp": 10
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | object | Yes | Localized choice button text with keys: `en`, `hi`, `kn` |
| `next` | string | Yes | ID of the next node to navigate to |
| `xp` | number | Yes | Experience points awarded for selecting this choice |

### Story Node (Ending)

```json
{
  "stage": 4,
  "end": true,
  "outcome": "strong",
  "mood": "happy",
  "characters": ["teacher", "student"],
  "badge": "Education Champion",
  "badgeIcon": "🎓",
  "bonusXp": 50,
  "sceneObjects": ["classroom", "trophy"],
  "text": {
    "en": "You completed your education journey!",
    "hi": "आपने अपनी शिक्षा यात्रा पूरी की!",
    "kn": "ನೀವು ನಿಮ್ಮ ಶಿಕ್ಷಣ ಪ್ರಯಾಣವನ್ನು ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ!"
  }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `stage` | number | Yes | Always `4` for ending nodes (final act) |
| `end` | boolean | Yes | Always `true` to mark this as an ending node |
| `outcome` | string | Yes | Ending quality: `"strong"`, `"medium"`, `"medium-low"`, `"weak"` |
| `mood` | string | Yes | Emotional tone of the ending |
| `characters` | array | Yes | Characters present in the ending scene |
| `badge` | string | Yes | Badge name awarded for reaching this ending |
| `badgeIcon` | string | Yes | Emoji representing the badge |
| `bonusXp` | number | Yes | Bonus XP awarded for completing the story with this ending |
| `sceneObjects` | array | Yes | Scene props for the ending screen |
| `text` | object | Yes | Localized ending narrative text |

**Note:** Ending nodes do NOT have a `choices` array.

## Character IDs

Standard character identifiers used across stories:

- `teacher` - School teacher
- `student` - Child protagonist
- `parent` - Parent/guardian
- `doctor` - Healthcare worker
- `principal` - School principal
- `friend` - Peer/classmate
- `official` - Government official
- `worker` - Adult worker/employer
- `elder` - Community elder
- `sibling` - Brother/sister

## Scene Object IDs

Standard scene prop identifiers:

- `classroom` - School classroom setting
- `books` - Educational materials
- `hospital` - Healthcare facility
- `home` - House/family dwelling
- `factory` - Workplace/industrial setting
- `office` - Government/administrative office
- `playground` - Play area
- `village` - Rural community setting
- `city` - Urban setting

## Design Guidelines

### Branching Structure

- **3-Choice Branching:** Each non-ending node should have 2-4 choices (3 is ideal)
- **Recovery Arcs:** Weak choices should not lead to instant dead ends; include paths back to positive outcomes
- **Multiple Endings:** Aim for 5-7 distinct endings covering the full outcome spectrum
- **Node Count:** Complete stories should have 20-26 nodes for adequate depth

### XP Distribution

- **Strong Choices:** 15-20 XP
- **Neutral/Medium Choices:** 8-12 XP
- **Weak Choices:** 3-5 XP
- **Strong Ending Bonus:** 50-75 XP
- **Medium Ending Bonus:** 25-40 XP
- **Weak Ending Bonus:** 10-20 XP

### Translation Requirements

**CRITICAL:** All text fields (`text`, `label`) must include content for all three languages:
- `en` - English
- `hi` - Hindi (Devanagari script)
- `kn` - Kannada script

**Never leave translations as placeholders or empty strings.** If professional translation is not available, use machine translation as a starting point BUT add a comment at the top of the file:

```
// TRANSLATION REVIEW REQUIRED
// Hindi and Kannada translations must be reviewed by native/fluent speakers
// before production deployment. Never ship machine-translated legal terminology
// without expert review.
```

### Post-Story Knowledge Check Quiz Schema (`quiz`)

Each story includes a `quiz` array with 2–3 multiple-choice statutory questions to reinforce real constitutional facts:

```json
"quiz": [
  {
    "question": {
      "en": "Under Article 21-A, education is free and compulsory up to what age?",
      "hi": "अनुच्छेद 21-ए के तहत, किस आयु तक शिक्षा मुफ्त और अनिवार्य है?",
      "kn": "ವಿಧಿ 21-ಎ ಅಡಿಯಲ್ಲಿ ಯಾವ ವಯಸ್ಸಿನವರೆಗೆ ಶಿಕ್ಷಣ ಉಚಿತ ಮತ್ತು ಕಡ್ಡಾಯವಾಗಿದೆ?"
    },
    "options": [
      { "en": "6 to 14 years", "hi": "6 से 14 वर्ष", "kn": "6 ರಿಂದ 14 ವರ್ಷ" },
      { "en": "Up to 10 years", "hi": "10 वर्ष तक", "kn": "10 ವರ್ಷದವರೆಗೆ" },
      { "en": "10 to 18 years", "hi": "10 से 18 वर्ष", "kn": "10 ರಿಂದ 18 ವರ್ಷ" }
    ],
    "correctIndex": 0,
    "explanation": {
      "en": "Article 21-A guarantees free and compulsory elementary education to every child aged 6 to 14 in India.",
      "hi": "अनुच्छेद 21-ए 6 से 14 वर्ष के बच्चों के लिए मुफ्त प्राथमिक शिक्षा की गारंटी देता है।",
      "kn: "ವಿಧಿ 21-ಎ 6 ರಿಂದ 14 ವರ್ಷದ ಮಕ್ಕಳಿಗೆ ಉಚಿತ ಶಿಕ್ಷಣದ ಭರವಸೆ ನೀಡುತ್ತದೆ."
    }
  }
]
```

| Field | Type | Required | Description |
|---|---|---|---|
| `question` | LocalizedText | Yes | Question text in `{en, hi, kn}` |
| `options` | Array<LocalizedText> | Yes | Array of 3 multiple choice options |
| `correctIndex` | number (0-2) | Yes | Zero-based index of the correct statutory answer |
| `explanation` | LocalizedText | Yes | Educational explanation displayed after answering |

### Educational Content

Stories must:
- Reference specific Indian laws (e.g., RTE Act 2009)
- Use age-appropriate language for 8-16 age range
- Be factually accurate about children's rights
- Avoid graphic or traumatic content
- Include crisis resource links where appropriate (e.g., Childline 1098)

## Example Story Structure

```
startNode
    ├─→ choice1 ──→ node2
    ├─→ choice2 ──→ node3
    └─→ choice3 ──→ node4
                      ├─→ choice1 ──→ ending1 (strong)
                      ├─→ choice2 ──→ node5
                      └─→ choice3 ──→ node6
                                       ├─→ choice1 ──→ ending2 (medium)
                                       ├─→ choice2 ──→ ending3 (weak)
                                       └─→ choice3 ──→ recovery_path ──→ ending4 (medium)
```

## Validation Checklist

Before considering a story complete, verify:

- [ ] `startNode` references an existing node ID
- [ ] All `next` values in choices reference existing node IDs
- [ ] All ending nodes have `stage: 4` and `end: true`
- [ ] All ending nodes have `outcome`, `badge`, `badgeIcon`, `bonusXp`
- [ ] All text fields have `en`, `hi`, `kn` keys with non-empty content
- [ ] No node is unreachable from `startNode`
- [ ] At least one path leads to a "strong" outcome
- [ ] Story has 5-7 distinct endings
- [ ] Story has 20-26 total nodes
- [ ] XP values are balanced across choices
- [ ] Educational content is factually accurate
- [ ] Language is age-appropriate for 8-16 age range

## File Naming Convention

Story files are saved in `src/stories/` with kebab-case naming:

- `education.json` - Right to Education (RTE Act 2009)
- `healthcare.json` - Right to Healthcare
- `child-labour.json` - Protection from Child Labour
- `abuse.json` - Protection from Abuse
- `child-marriage.json` - Protection from Child Marriage

## Related Documentation

- **Data Model:** See `DATA_MODEL.md` for Firestore collection schemas
- **Implementation:** Story engine component reads these JSON files to render interactive narratives
