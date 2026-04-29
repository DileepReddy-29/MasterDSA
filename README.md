# DSA Mastery

A complete static study website for learning Data Structures and Algorithms from beginner to advanced level.

## What is included

- Home page with learning roadmap and website architecture
- Topic pages for Arrays, Linked Lists, Stacks/Queues, Trees, Graphs, Hashing, Heaps, DP, and Tries
- Algorithms page covering important industry and interview algorithms with child-friendly concepts, code, and deep explanations
- Complexity page with Big O explanations, visual growth bars, comparison tables, code examples, and interview wording
- 50 interview questions inside every topic page with Easy, Medium, and Hard filters
- LeetCode-style problem statement, examples, constraints, and think-first prompt for every topic question
- Reference Python solution code, step-by-step explanation, and complexity notes for every topic question
- C++ / Java / Python code snippets
- Practice problems grouped by pattern and difficulty
- Notes, flashcards, spaced repetition, and downloadable revision notes
- Real-world DSA projects
- Mock interview simulator
- Progress dashboard using `localStorage`
- Dark/light mode

## Run locally

Open `index.html` in a browser.

For a local server from VS Code, use the Live Server extension or run:

```bash
python3 -m http.server 8080
```

Then visit:

```text
http://localhost:8080
```

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload `index.html`, `styles.css`, `script.js`, and `README.md`.
3. Go to repository `Settings` -> `Pages`.
4. Set source to `Deploy from a branch`.
5. Choose branch `main` and folder `/root`.
6. Save and open the generated GitHub Pages URL.

## Suggested next upgrades

- Convert the content arrays in `script.js` into separate JSON files.
- Move to React + Vite when you want components, routing, and reusable topic templates.
- Add Firebase Auth and Firestore to sync progress across devices.
- Integrate Judge0 or another code judge API for executable submissions.
