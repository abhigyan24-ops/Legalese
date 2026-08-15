# Rights Quest — System Architecture & Data Flow

**Rights Quest** is an interactive, browser-based gamified learning platform that teaches Indian children (ages 8–16) about fundamental constitutional rights through branching graphic stories. The system is designed to run 100% on the free Firebase Spark plan with zero personally identifiable information (PII) collection.

---

## 1. End-to-End Data Flow

The diagram and walkthrough below explain how data moves through the application from the first click to persistent game state.

```text
┌────────────────┐     ┌──────────────┐     ┌──────────────┐     ┌────────────────┐
│ Onboarding     │ ──▶ │ Rights Map   │ ──▶ │ Story Screen │ ──▶ │ Story Engine   │
│ (Avatar/Name/  │     │ (Lock logic  │     │ (Lazy-loads  │     │ (State machine,│
│  Age/Language) │     │  from state) │     │  story JSON) │     │  choices, XP)  │
└────────────────┘     └──────────────┘     └──────────────┘     └────────────────┘
        │                                                                │
        ▼ (init session)                                                 ▼ (on ending reached)
┌────────────────┐                                               ┌────────────────┐
│ Firebase Auth  │                                               │ 1. users/{uid} │
│ (Anonymous)    │                                               │    doc update  │
└────────────────┘                                               └────────────────┘
        │                                                                │
        ▼ (create doc)                                                   ▼ (sync score)
┌────────────────┐                                               ┌────────────────┐
│ users/{uid}    │                                               │ 2. leaderboard │
│ (Private doc)  │                                               │    /{uid} doc  │
└────────────────┘                                               └────────────────┘
                                                                         │
                                                                         ▼ (real-time listen)
                                                                 ┌────────────────┐
                                                                 │ Leaderboard &  │
                                                                 │ Community Wall │
                                                                 └────────────────┘
```

### Step 1: Safe Anonymous Onboarding
1. The child completes the 4-step onboarding flow: chooses a hero avatar, picks an anonymous auto-generated or custom handle (`AdjectiveAnimalNumber`), selects an age bracket (`8–11` or `12–16`), and chooses their language (`en`, `hi`, `kn`).
2. `initAnonymousSession()` in `src/firebase/firebase.js` initializes a Firebase Anonymous Authentication session. No email, phone, password, or device tracking is ever requested.
3. The app creates the initial document in Firestore at `users/{userId}` with `{ avatar, nickname, ageTier, language, xp: 0, badges: [], completedStories: [] }`.
4. `AppContext.jsx` receives the user payload via `dispatch({ type: 'SET_USER', payload })` and transitions route to `/map`.

### Step 2: Rights Map & Progressive Unlock Evaluation
1. `RightsMap.jsx` reads `state.completedStories` from `AppContext`.
2. The unlock helper `isStoryUnlocked(index)` applies the progressive unlock curve:
   - **Stories 0–2** (Education, Healthcare, Child Labour) are immediately unlocked for exploration.
   - **Stories 3–4** (Abuse/POCSO, Child Marriage) remain locked until the child has completed at least 3 stories.
3. Clicking an unlocked story routes the child to `/story/:storyId`.

### Step 3: Module Loading & Story Screen
1. `StoryScreen.jsx` acts as the route wrapper for `/story/:storyId`.
2. It dynamically imports the story module from `src/content/stories/<storyId>.js`.
3. If a locked or non-existent story is requested, it safely redirects back to `/map`.
4. Once loaded, it passes the story definition to `StoryEngine.jsx`.

### Step 4: Story Engine State Machine & Real-Time Gameplay
1. `StoryEngine.jsx` manages node-by-node execution:
   - Sets the active node starting from `story.startNode`.
   - Renders background environment layers via `SceneBackground.jsx` and vector sprites via `CharacterAvatar.jsx`.
   - Triggers Web Speech API audio narration in the selected language.
   - Evaluates player choices:
     - Normal choices award immediate XP (`+10` to `+25 XP`).
     - `risky: true` choices dim a heart (`HeartsHUD.jsx`) and route to coaching recovery arcs without hard game-overs.
2. XP accumulates in local React component state until an ending is reached.

### Step 5: Ending Resolution & Secure Dual-Write
When the child reaches an ending node (`end: true`):
1. **Primary Write (`users/{userId}`)**:
   - `updateDoc` increments the user's persistent XP, appends the earned badge object to `badges[]`, and appends `story.id` to `completedStories[]`.
2. **Leaderboard Write (`leaderboard/{userId}`)**:
   - `setDoc` writes the public scoreboard summary: `{ nickname, avatar, xp: newTotalXp, badgeCount }`.
   - **Security Rule Enforcement**: `firestore.rules` validates that `request.resource.data.xp <= get(/databases/$(database)/documents/users/$(request.auth.uid)).data.xp`. This stops score tampering on the client side without needing paid backend Cloud Functions.

### Step 6: Real-Time Community & Leaderboard Listeners
1. `Leaderboard.jsx` maintains an `onSnapshot` query on the `leaderboard` collection sorted by `xp` descending, rendering the live hall of fame and child-safe quick-chat cheers.
2. `CommunityWall.jsx` listens to `community_posts` filtered by `storyId` with a 280-character cap and keyword moderation.
3. `ResourceDirectory.jsx` listens to `resource_directory` to provide instant access to Childline 1098 and verified NGO support.

---

## 2. Technology Stack & Design Decisions

| Layer | Technology | Architectural Rationale |
|---|---|---|
| **Build & Tooling** | Vite + React 18 | Lightning-fast HMR and small production bundle size (< 800 KB). |
| **Styling** | Tailwind CSS + CSS Design Tokens | Unified warm palette (`#132A20`, `#F5B942`, `#FBF3E3`) in `tokens.css`. |
| **State Management** | Context API + `useReducer` | Lightweight global store for user session, language, and progress without Redux boilerplate. |
| **Backend & Database** | Firebase Spark (Auth + Cloud Firestore) | Zero-cost serverless stack with client-enforced security rules. |
| **Audio Engine** | Web Speech API + Web Audio API | Procedural sound synthesis and multi-language voice narration with zero audio asset weight. |
| **Visual Assets** | Parametric Vector SVG | 100% SVG scene props and character sprites; eliminates external image downloads. |

---

## 3. Privacy & Compliance Boundary (DPDP Act 2023)

> **Architectural Privacy Guarantee**: Rights Quest operates on a strict **zero-PII** architecture. It does not collect names, email addresses, phone numbers, location data, or cookies. This deliberate design ensures full compliance with India's Digital Personal Data Protection (DPDP) Act 2023 by not collecting personal data that would require parental-consent verification machinery.

---

## 4. Related Technical Documents

- **[DATA_MODEL.md](file:///c:/Users/abhig/OneDrive/Desktop/Legal/DATA_MODEL.md)** — Firestore document schemas and security rule specifications.
- **[SCHEMA.md](file:///c:/Users/abhig/OneDrive/Desktop/Legal/SCHEMA.md)** — Story JSON structure, node formats, choice rules, and validation guidelines.
- **[README.md](file:///c:/Users/abhig/OneDrive/Desktop/Legal/README.md)** — Project setup, quick start, and environment configuration.
