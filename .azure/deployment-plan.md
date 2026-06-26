# ByteQuest — Azure Deployment Plan

**Status:** Ready for Deployment

## Target

- **Service:** Azure Static Web Apps (Free tier)
- **App type:** Static single-page app (Vite + React + TypeScript); no backend / API
- **Build:** `npm run build` (`tsc -b && vite build`) → output in `dist/`
- **Routing:** client-side. `public/staticwebapp.config.json` provides the SPA fallback to `/index.html` and immutable caching for `/assets/*`.

## Deployment method

- **CI/CD:** GitHub Actions — `.github/workflows/azure-static-web-apps.yml`
- **Trigger:** push to `main` (plus PR preview environments)
- **Auth:** deployment token in repo secret `AZURE_STATIC_WEB_APPS_API_TOKEN`
- **Build settings:** `app_location: "/"`, `output_location: "dist"`, `api_location: ""`

## One-time setup

1. `az group create --name rg-bytequest --location westeurope`
2. `az staticwebapp create --name swa-bytequest --resource-group rg-bytequest --location westeurope --sku Free`
3. Get token: `az staticwebapp secrets list --name swa-bytequest --resource-group rg-bytequest --query "properties.apiKey" -o tsv`
4. `gh secret set AZURE_STATIC_WEB_APPS_API_TOKEN --repo vigamX/revision_bytequest --body "<token>"`
5. Push to `main` → deploys automatically.

## Repository

- Remote: `git@gh-personal:vigamX/revision_bytequest.git`
- Branch: `main`
