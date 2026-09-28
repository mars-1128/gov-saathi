# 🇮🇳 GOV SAATHI — "Your Guide to Government Services"
### AI-Powered Citizen Guidance & Verification Platform for Indian Public Services

Gov Saathi is an intelligent, civic-tech web platform designed to help Indian citizens navigate the complex ecosystem of Central, State, and Municipal government services. Built for maximum trust, transparency, and accessibility, Gov Saathi eliminates citizen confusion, middleman exploitation, and phishing scams.

---

## 🌟 Key Features

1. **Intelligent Citizen Search & AI Saathi:**
   - Understands colloquial citizen complaints in English, Hindi (हिन्दी), and Telugu (తెలుగు).
   - Dynamically determines administrative jurisdiction (Central, State, District, Municipal Local Body).
   - Strictly grounded on verified gazetted data using Google Gemini (`gemini-2.5-flash`). Zero invented phone numbers or fake URLs.

2. **Official Verification System:**
   - Every service is audited against genuine `.gov.in` and `.nic.in` domains.
   - Shows verified fee structures, mandatory vs optional documents, and official toll-free helplines (1930, 1915, 1947, 1950, 1800-11-4000).

3. **Problem Redressal Wizard:**
   - Interactive guided workflows for road potholes, municipal sanitation, online financial cyber scams, defective consumer products, and government service delays.

4. **18 Database-Driven Categories:**
   - Complaints & Grievances, Cybercrime, Consumer Issues, Documents & Certificates, Identity Services, Transport, Passport & Travel, Welfare Schemes, Mobile Apps, Health, Education, Scholarships, and more.

5. **DigiLocker & Document Services:**
   - Direct step-by-step guidance on fetching legally valid digital marksheets, driving licences, and registration certificates under Rule 9A of IT Rules 2016.

6. **Citizen Security & Privacy:**
   - Full Row Level Security (RLS) via Supabase PostgreSQL.
   - User bookmarks and personalization without personal data exposure.

---

## 🏛️ Official Product Principle

> **"Gov Saathi does not replace government services. It helps citizens understand which official government service to use, why they need it, how to use it, and where to access it."**

Gov Saathi NEVER claims to file complaints on behalf of citizens, NEVER invents fake complaint IDs, and NEVER asks for user passwords or OTPs. All submissions occur directly on genuine government portals.

---

## ⚙️ Tech Stack

* **Frontend:** React 19, TypeScript, Tailwind CSS v4, Lucide React, React Router 7.
* **Backend:** Node.js, Express.js REST API.
* **Database & Auth:** Supabase PostgreSQL with Row Level Security (RLS).
* **AI Engine:** Google Gemini API (`@google/generative-ai`).
* **Deployment Ready:** Vercel / Node.js production server.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Build frontend production assets
npm run build

# 3. Start unified application server
node server/index.js

# 4. Open in browser
http://localhost:5000
```

For detailed beginner instructions, see [`SETUP.md`](file:///c:/Users/MARS/OneDrive/Documents/hackathon_1/SETUP.md).

---

## 📄 License
MIT License. Built for public good and civic innovation.
