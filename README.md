# Team Task Manager — Starter Project

This is the starter project for the **Senior React Native Engineer** coding assessment.

---

## Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Xcode) or Android Emulator (Android Studio), or the Expo Go app on a physical device

### Setup

```bash
npm install
npm start
```

Press `i` to open iOS Simulator, `a` for Android, or scan the QR code with Expo Go.

### Running Tests

```bash
npm test
```

---

## Project Structure

```
src/
├── data/
│   └── mockData.ts          # 10 sample tasks — seed your state from here
├── hooks/
│   └── index.ts             # Custom hooks stub (bonus: useTaskManager)
├── navigation/
│   └── index.tsx            # Navigator setup — deep links pre-configured
├── screens/
│   ├── TaskListScreen.tsx   # Implement me
│   ├── TaskDetailScreen.tsx # Implement me
│   ├── EditTaskScreen.tsx   # Implement me
│   └── ProfileScreen.tsx    # Implement me
├── state/
│   └── index.ts             # State management — your choice of solution
└── types/
    └── index.ts             # Task interface and navigation param types
```

---

## What's Already Done

- Expo project with TypeScript configured
- React Navigation installed and wired up (bottom tabs + stack navigator)
- Deep link config for `taskmanager://task/:taskId` → TaskDetail screen
- All screen stubs with typed props
- Mock data (10 tasks, 1 user)
- Type definitions for `Task`, `User`, and navigation param lists
- Test scaffolding with placeholder tests

---

## Deep Link Testing

Once your TaskDetail screen is implemented, test deep linking with:

```bash
# iOS Simulator
npx uri-scheme open "taskmanager://task/task-001" --ios

# Android Emulator
npx uri-scheme open "taskmanager://task/task-001" --android
```

---

## Submission

When complete, please:

1. Push all code to the `main` branch of your provided repository
2. Ensure `npm start` runs without errors
3. Update this README with the sections below
4. Notify your recruiter via email: `[Your Name] — React Native Assessment Submitted`

### Please add to this README before submitting:

**State management choice:**
> I used React Context + `useState` in a small, focused task provider. This keeps the implementation lightweight, easy to reason about, and avoids adding a new dependency for an assessment-sized app. I would switch to Zustand or Redux if the app grew more complex, needed offline persistence, or required more composable asynchronous state logic.

**Assumptions made:**
> I treated the mock data as the single source of truth stored in memory, without a backend or persistent storage. Navigation is based on the provided deep link structure, and task updates are applied immediately in UI state for optimistic feedback.

**If I had more time:**
> I would add unit/integration tests for task completion and editing flows, persist tasks locally with `expo-secure-store` or SQLite, improve accessibility and theming (dark mode), and polish the UI with better animations and error handling.

---

## Time Limit

**2 hours.** Focus on architecture and correctness over completeness. A well-structured partial solution is preferred over a messy complete one.
