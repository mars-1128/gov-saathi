# GOV SAATHI — BEGINNER SETUP GUIDE

Welcome to **Gov Saathi** ("Your Guide to Government Services"). This guide is written in simple, step-by-step language so you can set up, run, and understand everything without any prior experience.

---

## 📌 1. What is Gov Saathi?

Gov Saathi is an AI-powered citizen guidance platform for Indian government services.

* **What it does:** Helps citizens describe a problem in plain language (e.g. *"There is a pothole near my house"*, *"Someone scammed me online"*), identifies the correct government department (Central, State, or Municipal), explains the required documents and fees, and provides the verified official government portal link (`.gov.in` / `.nic.in`).
* **What it NEVER does:** It never pretends to be a government body, never takes user passwords, and never fakes submitting complaints.

---

## 🛠️ 2. The Technology Stack

* **Frontend:** React.js, TypeScript, Tailwind CSS, Lucide Icons, React Router.
* **Backend:** Node.js, Express API server.
* **Database & Auth:** Supabase (PostgreSQL with Row Level Security).
* **AI Engine:** Google Gemini (`gemini-2.5-flash`) strictly grounded on verified gazetted data.

---

## 🚀 3. How to Run Gov Saathi on Your Computer

Everything is already installed and built on your computer!

### Step 1: Open Terminal in this folder
In Antigravity IDE (or PowerShell), navigate to this project folder:
```powershell
c:\Users\MARS\OneDrive\Documents\hackathon_1
```

### Step 2: Start the Application
Run this simple command:
```bash
node server/index.js
```

### Step 3: Open in Your Browser
Open your browser (Chrome or Edge) and go to:
👉 **`http://localhost:5000`**

That's it! You will see the complete Gov Saathi website running live.

---

## 🗄️ 4. Supabase Database Setup (1-Minute Step)

We have created an automated, all-in-one database script for you at:
`supabase/schema.sql`

To load all 25 tables, Row Level Security policies, and verified government services into your Supabase database:

1. Open your browser and go to your **Supabase Dashboard**:
   [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click on your project: **`yltapndppnqigiykzjgv`**
3. In the left-hand sidebar, click on **SQL Editor** (icon looks like `>_` or SQL).
4. Click **New Query** (green button at top).
5. Open the file `supabase/schema.sql` from this project, copy all its text, and paste it into the Supabase SQL Editor box.
6. Click the green **Run** button at the bottom right.
7. You will see: *"Success. No rows returned."* All tables and verified seed records are now active in your database!

*(Note: Gov Saathi has a built-in hybrid memory system. Even if you haven't run the SQL script yet, the app works 100% out of the box using verified in-memory records!)*

---

## 🔐 5. Environment Variables (.env)

Your `.env` file is already created in the root folder with verified credentials:

```ini
PORT=5000
NEXT_PUBLIC_SUPABASE_URL=https://yltapndppnqigiykzjgv.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOi...
SUPABASE_SECRET_KEY=eyJhbGciOi...
AI_API_KEY=AQ.Ab8RN6...
AI_MODEL=gemini-2.5-flash
```

⚠️ **Security Rule:** The `.env` file contains your private secret keys. It is automatically ignored by `.gitignore` so it will never be leaked to GitHub or public places.

---

## 🎯 6. Hackathon Demo Scenarios to Show the Judges

When presenting Gov Saathi to judges or users, demonstrate these three key scenarios:

### Demo 1: The Pothole Scenario (Municipal Civic Issue)
1. Type in the search bar or click the chip:
   > *"There is a pothole near my house."*
2. **Observe:** Gov Saathi recognizes this as a **Municipal/Local issue**, identifies the **Swachhata - MoHUA** platform, explains how to upload photo proof with GPS, gives the toll-free helpline **1969**, and provides the direct official link.

### Demo 2: The Online Cyber Scam Scenario (Emergency Central Issue)
1. Type in the search bar or AI Saathi:
   > *"Someone scammed me online through UPI."*
2. **Observe:** Gov Saathi immediately flags the **National Cyber Crime Reporting Portal & Helpline 1930**, advises calling **1930** within the golden hour to freeze bank funds, lists required proofs (transaction UTR, bank statement), and provides the official `cybercrime.gov.in` link.

### Demo 3: Download Marksheets & Documents (Digital India)
1. Navigate to **DigiLocker** or search:
   > *"I need to download my class 10 and 12 marksheets."*
2. **Observe:** Shows how to fetch authentic, legally valid documents from CBSE or state education boards with zero agent fees under IT Rules 2016.

---

## 🚢 7. Deploying to Vercel (When Ready)

1. Go to [https://vercel.com](https://vercel.com) and sign in.
2. Click **Add New Project**.
3. Select your GitHub repository for `Gov Saathi`.
4. Under **Environment Variables**, paste the variables from your `.env` file:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_SECRET_KEY`
   - `AI_API_KEY`
   - `AI_MODEL`
5. Click **Deploy**. Vercel will give you a public URL (e.g. `https://gov-saathi.vercel.app`).

---

## ❓ 8. Troubleshooting

* **If port 5000 is in use:** Open `.env` and change `PORT=5000` to `PORT=5001`.
* **If AI Saathi responds slowly:** Ensure your internet connection is active so the server can reach Google Gemini API.
* **If you make changes to frontend code:** Run `npm run build` to update the production bundle.
