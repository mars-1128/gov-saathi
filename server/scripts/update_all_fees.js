import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

console.log('1. Updating server/data/verifiedServices.js...');

let vs = fs.readFileSync('server/data/verifiedServices.js', 'utf8');

// Aadhaar fee update
vs = vs.replace(
  "fee: 'e-Aadhaar Download: Free; Address Update Online: Rs. 50; PVC Card Delivery: Rs. 50',",
  "fee: 'Demographic Update (Address/Name): Rs. 75; Biometric Update: Rs. 125; PVC Card: Rs. 50; e-Aadhaar Download: Free (Rs. 0)',"
);

// Aadhaar step update
vs = vs.replace(
  "{ step_number: 3, title: 'Download or Complete Order', description: 'For PVC card, pay Rs. 50 fee via UPI/card. Speed Post tracking number will be provided upon dispatch.', action_url: null, estimated_time: '2 mins' }",
  "{ step_number: 3, title: 'Verify Proof & Make Secure Payment', description: 'Upload valid proof document if updating address. Pay the official government fee (Rs. 75 for demographic update / Rs. 50 for PVC card) via UPI or card. Download the URN acknowledgement receipt.', action_url: null, estimated_time: '2 mins' }"
);

// Passport fee update
vs = vs.replace(
  "fee: 'Normal (36 pages): Rs. 1,500; Tatkaal (36 pages): Rs. 3,500',",
  "fee: 'Normal (36 pages): Rs. 1,500 | 60 pages: Rs. 2,000; Tatkaal: Rs. 3,500 (36 pages) / Rs. 4,000 (60 pages); Police Clearance (PCC): Rs. 500',"
);

// Driving Licence fee update
vs = vs.replace(
  "fee: 'State specific (approx. Rs. 200 for LL application + test fee; Rs. 200-500 for permanent DL slot + smart card fee)',",
  "fee: 'Learner Licence (LL): Rs. 200; Permanent DL: Rs. 700 (Test Rs. 300 + Issue Rs. 200 + Smart Card Rs. 200); DL Renewal: Rs. 200',"
);

// PAN Card fee update
vs = vs.replace(
  "fee: 'Rs. 107 (Physical card delivered in India); Rs. 1,017 (Foreign dispatch); Rs. 50 (Reprint only)',",
  "fee: 'Physical PAN Card (in India): Rs. 107; Foreign Dispatch: Rs. 1,017; Physical Reprint: Rs. 50; e-PAN Download: Rs. 8.26 (Free within 30 days)',"
);

// Ration Card fee update
vs = vs.replace(
  "fee: 'Free of Cost or nominal state fee (Rs. 5 - Rs. 45 depending on card category)',",
  "fee: 'Free of Cost (Central NFSA PMGKAY) or nominal state fee (Rs. 5 - Rs. 50 depending on state)',"
);

// Voter ID fee update
vs = vs.replace(
  "fee: '100% Free of Cost',",
  "fee: '100% Free of Cost (Rs. 0 - Zero fee for New Registration, Corrections, & EPIC PVC Delivery)',"
);

// Update VERIFIED_DIGITAL_DOCUMENTS
const oldDocsStr = `export const VERIFIED_DIGITAL_DOCUMENTS = [
  { document: 'Aadhaar Card', issuer: 'UIDAI', format: 'Digitally signed PDF with verifiable QR code', portal: 'https://myaadhaar.uidai.gov.in/ & DigiLocker' },
  { document: 'Driving Licence (DL)', issuer: 'Ministry of Road Transport & Highways (MoRTH)', format: 'Digital Smart Card format on DigiLocker / mParivahan', portal: 'https://sarathi.parivahan.gov.in/' },
  { document: 'Vehicle Registration Certificate (RC)', issuer: 'MoRTH / State Transport Depts', format: 'Verified Digital RC accepted by Traffic Police', portal: 'https://parivahan.gov.in/' },
  { document: 'Class 10 & 12 Marksheets', issuer: 'CBSE, CISCE, and State Secondary Education Boards', format: 'Legally authentic digitally signed marksheets from 1975 onwards', portal: 'https://www.digilocker.gov.in/' },
  { document: 'PAN Verification Record', issuer: 'Income Tax Department', format: 'Authentic digital PAN verification record', portal: 'https://www.digilocker.gov.in/' },
  { document: 'Vehicle Insurance Policy', issuer: 'Insurance Information Bureau (IIB) & General Insurers', format: 'Valid electronic motor insurance certificate', portal: 'https://www.digilocker.gov.in/' },
  { document: 'COVID-19 Vaccination Certificate', issuer: 'Ministry of Health & Family Welfare (MoHFW)', format: 'WHO-compliant verifiable vaccination pass', portal: 'https://cowin.gov.in/ & DigiLocker' }
];`;

const newDocsStr = `export const VERIFIED_DIGITAL_DOCUMENTS = [
  { document: 'Aadhaar Card', issuer: 'UIDAI', format: 'Digitally signed PDF with verifiable QR code', portal: 'https://myaadhaar.uidai.gov.in/ & DigiLocker', fee: 'Free on DigiLocker (Center update: ₹75 demographic / ₹125 biometric)' },
  { document: 'Driving Licence (DL)', issuer: 'Ministry of Road Transport & Highways (MoRTH)', format: 'Digital Smart Card format on DigiLocker / mParivahan', portal: 'https://sarathi.parivahan.gov.in/', fee: 'Free on DigiLocker (RTO Smart Card: ₹700)' },
  { document: 'Vehicle Registration Certificate (RC)', issuer: 'MoRTH / State Transport Depts', format: 'Verified Digital RC accepted by Traffic Police', portal: 'https://parivahan.gov.in/', fee: '100% Free on DigiLocker (Rs. 0)' },
  { document: 'Class 10 & 12 Marksheets', issuer: 'CBSE, CISCE, and State Secondary Education Boards', format: 'Legally authentic digitally signed marksheets from 1975 onwards', portal: 'https://www.digilocker.gov.in/', fee: '100% Free of Cost (Rs. 0)' },
  { document: 'PAN Verification Record', issuer: 'Income Tax Department', format: 'Authentic digital PAN verification record', portal: 'https://www.digilocker.gov.in/', fee: 'Free on DigiLocker (Physical Card: ₹107)' },
  { document: 'Vehicle Insurance Policy', issuer: 'Insurance Information Bureau (IIB) & General Insurers', format: 'Valid electronic motor insurance certificate', portal: 'https://www.digilocker.gov.in/', fee: '100% Free on DigiLocker (Rs. 0)' },
  { document: 'COVID-19 Vaccination Certificate', issuer: 'Ministry of Health & Family Welfare (MoHFW)', format: 'WHO-compliant verifiable vaccination pass', portal: 'https://cowin.gov.in/ & DigiLocker', fee: '100% Free of Cost (Rs. 0)' }
];`;

if (vs.includes(oldDocsStr)) {
  vs = vs.replace(oldDocsStr, newDocsStr);
}

fs.writeFileSync('server/data/verifiedServices.js', vs, 'utf8');
console.log('server/data/verifiedServices.js successfully updated.');

console.log('2. Updating supabase/schema.sql...');
let schema = fs.readFileSync('supabase/schema.sql', 'utf8');

schema = schema.replace(
  "'Download: Free; Address Update Online: Rs. 50; PVC Card: Rs. 50',",
  "'Demographic Update (Address/Name): Rs. 75; Biometric Update: Rs. 125; PVC Card: Rs. 50; e-Aadhaar Download: Free (Rs. 0)',"
);

schema = schema.replace(
  "'Rs. 1,500 (Normal 36 pages), Rs. 3,500 (Tatkaal 36 pages)',",
  "'Normal (36 pages): Rs. 1,500 | 60 pages: Rs. 2,000; Tatkaal: Rs. 3,500 (36 pages) / Rs. 4,000 (60 pages); Police Clearance (PCC): Rs. 500',"
);

schema = schema.replace(
  "'Varies by state (approx. Rs. 200 for LL, Rs. 200-500 for DL test + smart card)',",
  "'Learner Licence (LL): Rs. 200; Permanent DL: Rs. 700 (Test Rs. 300 + Issue Rs. 200 + Smart Card Rs. 200); DL Renewal: Rs. 200',"
);

schema = schema.replace(
  "'Rs. 107 (Physical delivery in India); Rs. 1,017 (Foreign dispatch); Rs. 50 (Reprint only)',",
  "'Physical PAN Card (in India): Rs. 107; Foreign Dispatch: Rs. 1,017; Physical Reprint: Rs. 50; e-PAN Download: Rs. 8.26 (Free within 30 days)',"
);

schema = schema.replace(
  "'Free of Cost or nominal state fee (Rs. 5 - Rs. 45 depending on state card type)',",
  "'Free of Cost (Central NFSA PMGKAY) or nominal state fee (Rs. 5 - Rs. 50 depending on state)',"
);

fs.writeFileSync('supabase/schema.sql', schema, 'utf8');
console.log('supabase/schema.sql successfully updated.');

console.log('3. Updating Live Supabase Database...');
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yltapndppnqigiykzjgv.supabase.co';
const supabaseKey = process.env.SUPABASE_SECRET_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlsdGFwbmRwcG5xaWdpeWt6amd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc5MDU1NjgyMywiZXhwIjoyMTA2MTMyODIzfQ.NMAapzeIox5VVyVfwvFaZZfSWL7EbJebFAJAlQDleaA';
const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
  {
    slug: 'uidai-myaadhaar-services',
    fee: 'Demographic Update (Address/Name): Rs. 75; Biometric Update: Rs. 125; PVC Card: Rs. 50; e-Aadhaar Download: Free (Rs. 0)'
  },
  {
    slug: 'passport-seva-online',
    fee: 'Normal (36 pages): Rs. 1,500 | 60 pages: Rs. 2,000; Tatkaal: Rs. 3,500 (36 pages) / Rs. 4,000 (60 pages); Police Clearance (PCC): Rs. 500'
  },
  {
    slug: 'parivahan-sarathi-driving-licence',
    fee: 'Learner Licence (LL): Rs. 200; Permanent DL: Rs. 700 (Test Rs. 300 + Issue Rs. 200 + Smart Card Rs. 200); DL Renewal: Rs. 200'
  },
  {
    slug: 'pan-card-nsdl-utiitsl',
    fee: 'Physical PAN Card (in India): Rs. 107; Foreign Dispatch: Rs. 1,017; Physical Reprint: Rs. 50; e-PAN Download: Rs. 8.26 (Free within 30 days)'
  },
  {
    slug: 'ration-card-onorc-nfsa',
    fee: 'Free of Cost (Central NFSA PMGKAY) or nominal state fee (Rs. 5 - Rs. 50 depending on state)'
  },
  {
    slug: 'voters-service-portal-eci',
    fee: '100% Free of Cost (Rs. 0 - Zero fee for New Registration, Corrections, & EPIC PVC Delivery)'
  },
  {
    slug: 'digilocker-digital-documents',
    fee: '100% Free of Cost (Rs. 0 - Government IT Rules 2016)'
  },
  {
    slug: 'swachhata-civic-complaint-app',
    fee: '100% Free of Cost (Rs. 0)'
  },
  {
    slug: 'national-cyber-crime-reporting-portal',
    fee: '100% Free of Cost (Rs. 0 - Emergency Police Helpline 1930)'
  },
  {
    slug: 'instant-epan-income-tax',
    fee: '100% Free of Cost (Rs. 0)'
  },
  {
    slug: 'ayushman-bharat-abha-health-id',
    fee: '100% Free of Cost (Rs. 0)'
  },
  {
    slug: 'apaar-student-id-abc',
    fee: '100% Free of Cost (Rs. 0)'
  }
];

async function updateDb() {
  for (const item of updates) {
    const { error } = await supabase
      .from('government_services')
      .update({ fee: item.fee })
      .eq('slug', item.slug);
    if (error) {
      console.error(`Error updating ${item.slug}:`, error.message);
    } else {
      console.log(`Updated DB: ${item.slug} -> ${item.fee}`);
    }
  }
  console.log('All Database fee updates completed successfully!');
}

updateDb().catch(console.error);
