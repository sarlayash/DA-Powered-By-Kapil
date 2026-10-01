# Master Data Analytics With Kapil

Official executive learning application covering the full **87-module curriculum** (Annexure 1: Modules 1–82 and Annexure 2: Modules 83–87 Enterprise Data Lake Specialization).

Built with a **Black, White, and Gold** theme, structured at **10% Theory and 90% Applied Hands-On Labs**, and certified under the **Powered By Kapil** curriculum framework.

---

## 🚀 Live App Deployment Links

- **Live Application URL**: [https://ais-pre-ewbqk2bbqzxwtcfzpytrcc-252756721792.asia-east1.run.app](https://ais-pre-ewbqk2bbqzxwtcfzpytrcc-252756721792.asia-east1.run.app)
- **Live Development URL**: [https://ais-dev-ewbqk2bbqzxwtcfzpytrcc-252756721792.asia-east1.run.app](https://ais-dev-ewbqk2bbqzxwtcfzpytrcc-252756721792.asia-east1.run.app)
- **GitHub Target**: `https://github.com/sarlayash/DA-Powered-By-Kapil.git`

---

## 📦 Key Capabilities

- **Complete 87-Module Curriculum**:
  - **Week 1 (Modules 1–27)**: AI Analytics Foundations, Advanced Excel with AI, MECE Problem Solving, Python with Copilot/Claude, Pandas EDA, Decision Trees, Random Forests, XGBoost.
  - **Week 2 (Modules 28–56)**: Neural Networks, Deep Learning, CNNs, Computer Vision, NLP, Generative AI, Industrial Agentic AI, Responsible AI Governance, Time Series Modeling.
  - **Week 3 (Modules 57–82)**: Mathematical Optimization (LP, MIP, SciPy, PuLP), Data Warehousing, Prompt Engineering, RAG Architectures, DevSecOps, MLflow Model Registries, Docker Containers.
  - **Annexure 2 Track (Modules 83–87)**: Enterprise Data Lake (EDL), Medallion Architecture (Bronze/Silver/Gold), Parquet/ORC columnar optimization, and Lakehouse governance.
- **10% Theory / 90% Hands-On**: Every module contains executive theoretical grounding and interactive code sandboxes with verification checks.
- **Executive Certificate & Badges (PNG & PDF)**:
  - Downloadable High-Res PNG Certificate (2400x1600 Canvas rendering)
  - Downloadable Vector A4 Landscape PDF Certificate via jsPDF
  - 8 Specialized Competency Badges with PNG and PDF card exports
- **Secure Authentication**: Google Sign-In support + instant One-Click Demo User (Kapil Narula, Lead AI Architect).

---

## ⚙️ GitHub Actions CI/CD Workflows

Two automated GitHub Actions workflows are configured in `.github/workflows/`:

1. **`ci.yml` (Build & Lint Verification)**:
   - Triggers on every push & pull request to `main`.
   - Executes `npm run lint` and `npm run build`.
   - Packages and uploads production build artifacts (`dist/`).
2. **`deploy.yml` (GitHub Pages Deployment)**:
   - Deploys the built single-page application directly to GitHub Pages.

---

## 🛠️ GitHub Push Instructions

The local Git repository has been initialized on branch `main` with all changes committed. To push to GitHub using your Personal Access Token (PAT):

```bash
# Push directly using your GitHub username and Personal Access Token:
git push https://<YOUR_GITHUB_TOKEN>@github.com/sarlayash/DA-Powered-By-Kapil.git main
```

Or configure your GitHub SSH key:

```bash
git remote set-url origin git@github.com:sarlayash/DA-Powered-By-Kapil.git
git push -u origin main
```

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Run local development server (port 3000)
npm run dev

# Build production assets
npm run build
```

---

*© 2026 Powered By Kapil. All rights reserved.*
