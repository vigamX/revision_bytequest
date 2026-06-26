# ByteQuest

A quest-style revision game for **OCR GCSE Computer Science (J277)**. Level up through topic quizzes and an arcade mini-game covering both exam papers.

Built with **Vite + React + TypeScript + Tailwind CSS** as a pure static SPA, deployed to **Azure Static Web Apps**.

## What's inside

- **Hub map** — two "realms" (the two exam papers) with a zone for every J277 specification section.
- **Topic quizzes** — multiple-choice questions written in OCR mark-scheme language, with an explanation on every answer.
- **Base Converter Arcade** — a 60-second binary ⇄ denary ⇄ hexadecimal challenge (spec 1.2).
- **Progress & stats** — XP, levels, per-topic mastery and an arcade high score, all saved in the browser (`localStorage`).

### OCR J277 coverage

**Paper 1 — Computer Systems (J277/01):** 1.1 Systems architecture · 1.2 Memory and storage · 1.3 Networks & protocols · 1.4 Network security · 1.5 Systems software · 1.6 Ethical, legal & environmental.

**Paper 2 — Computational Thinking, Algorithms & Programming (J277/02):** 2.1 Algorithms · 2.2 Programming fundamentals · 2.3 Producing robust programs · 2.4 Boolean logic · 2.5 Languages & IDEs.

## Run locally

Prerequisites: Node.js 20+.

```bash
npm install
npm run dev      # dev server with HMR (http://localhost:5173)
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build locally
npm run lint     # oxlint
```

## Project structure

```
src/
  data/        topics.ts (J277 taxonomy) + questions.ts (question bank)
  lib/         storage, progress/XP, quiz builder, base-converter logic
  hooks/       useProgress (localStorage-backed game state)
  components/  Header
  screens/     HubScreen, QuizScreen, ConverterScreen, StatsScreen
  App.tsx      state-based navigation between screens
public/
  favicon.svg
  staticwebapp.config.json   SPA fallback + asset caching for Azure
.github/workflows/
  azure-static-web-apps.yml  CI/CD to Azure Static Web Apps
```

## Add more questions

Append objects to `src/data/questions.ts`. Each question targets a topic by `topicId` (e.g. `"2.4"`) and provides `options`, the `answerIndex`, an `explanation`, and a `difficulty` (1–3). The app shuffles options at runtime and picks new questions up automatically — no other changes needed.

## Deploy to Azure Static Web Apps (GitHub Actions)

The included workflow builds and deploys on every push to `main`, authenticating with a deployment token stored as the repo secret `AZURE_STATIC_WEB_APPS_API_TOKEN`.

1. **Create the Static Web App** (Free tier — choose your own names/region):

   ```bash
   az group create --name rg-bytequest --location westeurope
   az staticwebapp create \
     --name swa-bytequest \
     --resource-group rg-bytequest \
     --location westeurope \
     --sku Free
   ```

2. **Get the deployment token:**

   ```bash
   az staticwebapp secrets list \
     --name swa-bytequest \
     --resource-group rg-bytequest \
     --query "properties.apiKey" -o tsv
   ```

3. **Store it as a GitHub Actions secret** (GitHub CLI):

   ```bash
   gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN \
     --repo vigamX/revision_bytequest \
     --body "<paste-the-token>"
   ```

4. **Push to `main`** — the workflow builds (`app_location: "/"`, `output_location: "dist"`) and deploys. Find the live URL with:

   ```bash
   az staticwebapp show \
     --name swa-bytequest \
     --resource-group rg-bytequest \
     --query "defaultHostname" -o tsv
   ```

### First push

The git remote is already configured.

```bash
git add -A
git commit -m "Initial commit: ByteQuest MVP"
git push -u origin main
```
