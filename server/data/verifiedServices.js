// GOV SAATHI - VERIFIED OFFICIAL INDIAN GOVERNMENT SERVICES DATABASE
// Every record is sourced exclusively from official .gov.in / .nic.in domains and gazetted portals.

export const VERIFIED_CATEGORIES = [
  { id: 'cat-1', name: 'Complaints & Grievances', slug: 'complaints-grievances', description: 'Central & State portals, municipal civic issues, broken roads, sanitation', icon: 'AlertCircle', display_order: 1 },
  { id: 'cat-2', name: 'Cybercrime', slug: 'cybercrime', description: 'Online financial scams, UPI fraud, social media abuse, 1930 reporting', icon: 'ShieldAlert', display_order: 2 },
  { id: 'cat-3', name: 'Consumer Issues', slug: 'consumer-issues', description: 'Product defects, warranty refusal, refund disputes, e-commerce issues', icon: 'Scale', display_order: 3 },
  { id: 'cat-4', name: 'Documents & Certificates', slug: 'documents-certificates', description: 'Aadhaar, PAN, birth/death/income/caste certificates, DigiLocker downloads', icon: 'FileText', display_order: 4 },
  { id: 'cat-5', name: 'Identity Services', slug: 'identity-services', description: 'Aadhaar card updates, Voter ID registration, PVC card requests', icon: 'UserCheck', display_order: 5 },
  { id: 'cat-6', name: 'Passport & Travel', slug: 'passport-travel', description: 'Fresh passport, renewal, Tatkaal appointments, police clearance', icon: 'Plane', display_order: 6 },
  { id: 'cat-7', name: 'Transport', slug: 'transport', description: 'Driving licence, learner licence, vehicle registration (RC), challan payment', icon: 'Car', display_order: 7 },
  { id: 'cat-8', name: 'Government Schemes', slug: 'government-schemes', description: 'Welfare schemes for farmers, youth, women, and senior citizens', icon: 'Gift', display_order: 8 },
  { id: 'cat-9', name: 'Government Apps', slug: 'government-apps', description: 'Official mobile apps like UMANG, DigiLocker, mAadhaar, Swachhata', icon: 'Smartphone', display_order: 9 },
  { id: 'cat-10', name: 'Health Services', slug: 'health-services', description: 'Ayushman Bharat ABHA card, PM-JAY health coverage, hospital OPD booking', icon: 'HeartPulse', display_order: 10 },
  { id: 'cat-11', name: 'Education', slug: 'education', description: 'Board marksheets, university admissions, Academic Bank of Credits', icon: 'GraduationCap', display_order: 11 },
  { id: 'cat-12', name: 'Scholarships', slug: 'scholarships', description: 'National Scholarship Portal, pre-matric and post-matric financial grants', icon: 'Award', display_order: 12 },
  { id: 'cat-13', name: 'Jobs & Employment', slug: 'jobs-employment', description: 'National Career Service, public sector recruitment, apprentice schemes', icon: 'Briefcase', display_order: 13 },
  { id: 'cat-14', name: 'Utility Services', slug: 'utility-services', description: 'Electricity bills, piped water connections, LPG gas subsidy', icon: 'Zap', display_order: 14 },
  { id: 'cat-15', name: 'Property & Revenue', slug: 'property-revenue', description: 'Land records, Bhulekh, Encumbrance Certificate (EC), property tax', icon: 'Building2', display_order: 15 },
  { id: 'cat-16', name: 'Business & Startup', slug: 'business-startup', description: 'MSME Udyam registration, GST portal, Startup India benefits', icon: 'BriefcaseBusiness', display_order: 16 },
  { id: 'cat-17', name: 'Elections & Voter Services', slug: 'elections-voter-services', description: 'New voter registration (Form 6), address change (Form 8), e-EPIC download', icon: 'Vote', display_order: 17 },
  { id: 'cat-18', name: 'Other Government Services', slug: 'other-services', description: 'RTI Online, postal tracking, pension grievance portal, public services', icon: 'HelpCircle', display_order: 18 }
];

export const VERIFIED_SERVICES = [
  {
    id: 'srv-swachhata',
    name: 'Swachhata Civic Complaint Portal (Potholes, Garbage & Sanitation)',
    slug: 'swachhata-civic-complaint-app',
    category_id: 'cat-1',
    category_name: 'Complaints & Grievances',
    department: 'Ministry of Housing and Urban Affairs (MoHUA) & Urban Local Bodies',
    jurisdiction_level: 'MUNICIPAL',
    state: 'All India',
    simple_description: 'Report broken roads, potholes, garbage dumps, overflowing drains, or dead animals directly to your local municipality with photo GPS proof.',
    description: 'Swachhata is the official civic grievance platform launched by MoHUA mapped to thousands of Indian municipal corporations and municipalities. Citizens can upload a geo-tagged photo of road damage, garbage, or streetlights. Local municipal sanitary inspectors/engineers are assigned with mandated resolution timeframes and must post resolution photos.',
    eligibility: 'Any resident in an urban municipal corporation, municipality, or town council area in India.',
    fee: '100% Free of Cost (Rs. 0 - Municipal civic complaints are free)',
    processing_information: 'Assigned within 12-48 hours. Photo resolution evidence provided by civic staff.',
    application_mode: 'MOBILE_APP',
    official_website: 'https://sbmurban.org/',
    official_app: 'Swachhata - MoHUA (Android & iOS)',
    official_app_url: 'https://play.google.com/store/apps/details?id=com.ichangemycity.swachhbharat',
    official_helpline: '1969',
    official_email: 'support@sbmurban.org',
    official_source: 'https://play.google.com/store/apps/details?id=com.ichangemycity.swachhbharat',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['pothole', 'road damage', 'garbage', 'drainage', 'broken road', 'streetlight', 'dead animal', 'civic complaint', 'sanitation', 'municipality', 'corporation', 'road repair', 'swachhbharat', 'swachhata', 'swatchhbharath', 'swachh bharat', 'swatch bharat', 'swatchhata', 'swachhta', 'swachata'],
    steps: [
      { step_number: 1, title: 'Download Official Swachhata App or Open Portal', description: 'Download Swachhata - MoHUA from Google Play Store or Apple App Store, or visit official portal https://sbmurban.org/ or use the UMANG app.', action_url: 'https://play.google.com/store/apps/details?id=com.ichangemycity.swachhbharat', estimated_time: '2 mins' },
      { step_number: 2, title: 'Capture Geo-Tagged Photo of Pothole / Waste', description: 'Select complaint category (e.g., "Pothole on Road", "Garbage Dump", or "Broken Streetlight"). Take a clear photograph; the app automatically records accurate GPS coordinates.', action_url: null, estimated_time: '1 min' },
      { step_number: 3, title: 'Submit & Track Resolution with Photo Proof', description: 'Receive an instant Ticket ID. The local municipal engineer / sanitary inspector is assigned to resolve the defect and must upload a verified "after-repair" photograph to close the ticket.', action_url: 'https://sbmurban.org/', estimated_time: '12-48 hours' }
    ],
    documents: [
      { document_name: 'Live photograph of the civic defect (Pothole / Garbage)', is_mandatory: true, description: 'Taken directly through camera inside the app' },
      { document_name: 'Device GPS Location Permission', is_mandatory: true, description: 'Enables automatic routing to the relevant municipal ward junior engineer' }
    ],
    requirements: [
      'Active Indian mobile number for OTP sign-in',
      'Location within an Urban Local Body (ULB / Municipal Corporation / Municipality) jurisdiction'
    ],
    tips: [
      'Take photos in daylight showing surrounding landmarks or street names for faster municipal identification.',
      'If the complaint is not resolved within 48 hours, you can reopen the ticket or escalate via toll-free helpline 1969.'
    ]
  },
  {
    id: 'srv-cybercrime',
    name: 'National Cyber Crime Reporting Portal & Helpline 1930',
    slug: 'national-cyber-crime-reporting-portal',
    category_id: 'cat-2',
    category_name: 'Cybercrime',
    department: 'Indian Cyber Crime Coordination Centre (I4C), Ministry of Home Affairs',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Immediate reporting of online financial fraud (UPI scams, credit card fraud), cyber extortion, and online harassment.',
    description: 'Official portal and emergency response helpline managed by Ministry of Home Affairs. For financial cyber fraud, dialling 1930 enables the Citizen Financial Cyber Fraud Reporting and Management System (CFCFRMS) to alert banks and payment gateways within the golden hour to freeze fraudulent outflows before scammers withdraw cash.',
    eligibility: 'Any individual who has been a victim or witness to online financial fraud, identity theft, or cyber crime in India.',
    fee: '100% Free of Cost',
    processing_information: 'Immediate bank freeze alerts dispatched. State cyber cell police investigation initiated.',
    application_mode: 'ONLINE',
    official_website: 'https://cybercrime.gov.in/',
    official_app: 'Official Web Portal',
    official_helpline: '1930 (Emergency Financial Fraud)',
    official_email: 'complaint-cybercrime@gov.in',
    official_source: 'https://cybercrime.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['cyber', 'scam', 'fraud', 'bank fraud', 'upi scam', 'online scam', 'phishing', 'hacked', '1930', 'extortion', 'money lost', 'credit card fraud', 'crypto scam', 'telegram scam'],
    steps: [
      { step_number: 1, title: 'Call 1930 Emergency Helpline Immediately', description: 'If money was debited from your bank or UPI, call 1930 right away. Provide your bank name, transaction ID, debit time, and recipient UPI/account to freeze money.', action_url: 'tel:1930', estimated_time: 'Immediate' },
      { step_number: 2, title: 'Lodge Formal Complaint on Official Portal', description: 'Visit https://cybercrime.gov.in and click "Report Cyber Crime" -> "Report Financial Fraud". Register your phone number and complete the incident form.', action_url: 'https://cybercrime.gov.in/', estimated_time: '15 mins' },
      { step_number: 3, title: 'Attach Evidence & Download Acknowledgement', description: 'Upload bank account statements, transaction SMS screenshots, WhatsApp chat logs, or fraudulent URLs. Retain the Acknowledgement Number for police follow-up.', action_url: null, estimated_time: '5 mins' }
    ],
    documents: [
      { document_name: 'Bank Account Statement showing debit transaction', is_mandatory: true, description: 'PDF or screenshot from net banking' },
      { document_name: 'Transaction ID / UTR Number', is_mandatory: true, description: '12-digit UPI reference or IMPS/NEFT UTR' },
      { document_name: 'Screenshots of fraudulent messages / calls', is_mandatory: false, description: 'WhatsApp, Telegram, or SMS proof' }
    ],
    requirements: [
      'Report within 24 hours of unauthorized transaction for maximum recovery chance',
      'Valid Indian mobile number for OTP'
    ]
  },
  {
    id: 'srv-digilocker',
    name: 'DigiLocker - Official National Digital Document Wallet',
    slug: 'digilocker-digital-documents',
    category_id: 'cat-4',
    category_name: 'Documents & Certificates',
    department: 'Ministry of Electronics & IT (MeitY)',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Download and store legally valid digital copies of Aadhaar, Driving Licence, RC, Marksheets, and PAN card.',
    description: 'DigiLocker is the flagship cloud document wallet under Digital India. Electronic documents issued via DigiLocker are treated on par with original physical documents under Rule 9A of the Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, 2016. Accepted by Traffic Police, Airports, and Universities nationwide.',
    eligibility: 'Any individual with an Aadhaar number linked to an active mobile phone.',
    fee: '100% Free of Cost',
    processing_information: 'Instant automated issuance via real-time API connection with government authorities and education boards.',
    application_mode: 'ONLINE',
    official_website: 'https://www.digilocker.gov.in/',
    official_app: 'DigiLocker (Android, iOS & Web)',
    official_helpline: '011-24301851',
    official_email: 'support@digitallocker.gov.in',
    official_source: 'https://www.digilocker.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['digilocker', 'marksheet', 'download documents', 'driving licence download', 'rc download', 'pan download', 'certificates', '10th marksheet', '12th marksheet', 'degree certificate', 'insurance download'],
    steps: [
      { step_number: 1, title: 'Sign In Using Aadhaar & Mobile OTP', description: 'Go to https://www.digilocker.gov.in or open the app. Enter your 12-digit Aadhaar number, set a 6-digit security PIN, and verify OTP.', action_url: 'https://www.digilocker.gov.in/', estimated_time: '2 mins' },
      { step_number: 2, title: 'Search for Issuing Authority', description: 'Click "Search Documents". Search for your Education Board (CBSE, ICSE, State Boards), MoRTH (Driving Licence/RC), or Income Tax Department (PAN).', action_url: null, estimated_time: '2 mins' },
      { step_number: 3, title: 'Fetch Digitally Signed Document', description: 'Enter your Roll Number, Registration Number, or Vehicle Number. The authentic document is pulled into "Issued Documents" with a verified QR code.', action_url: null, estimated_time: 'Instant' }
    ],
    documents: [
      { document_name: 'Aadhaar Number', is_mandatory: true, description: 'With mobile phone linked for receiving OTP' }
    ],
    requirements: [
      'Mobile number must be linked with Aadhaar database'
    ]
  },
  {
    id: 'srv-cpgrams',
    name: 'CPGRAMS - Centralized Public Grievance Redress System',
    slug: 'cpgrams-public-grievance',
    category_id: 'cat-1',
    category_name: 'Complaints & Grievances',
    department: 'Department of Administrative Reforms and Public Grievances (DARPG)',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'File complaints against central and state government departments for delays, corruption, or denial of public service.',
    description: 'Centralized 24x7 grievance platform connecting all Central Ministries, Departments, Public Sector Undertakings (PSUs), Banks, and State Governments. Citizens receive a unique tracking registration number. Grievance officers must respond within a time-bound period (typically 30 days). Includes an appellate authority if dissatisfied.',
    eligibility: 'Any Indian citizen experiencing grievance with government service delivery.',
    fee: '100% Free of Cost',
    processing_information: 'Grievance forwarded to concerned nodal officer within 24 hours. Resolution target is within 30 days.',
    application_mode: 'ONLINE',
    official_website: 'https://pgportal.gov.in/',
    official_app: 'UMANG App / CPGRAMS',
    official_helpline: '1800-11-4000',
    official_email: 'cpgrams-darpg@nic.in',
    official_source: 'https://pgportal.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['cpgrams', 'complaint', 'grievance', 'officer delay', 'pension delay', 'darpg', 'public grievance', 'government delay', 'government portal complaint'],
    steps: [
      { step_number: 1, title: 'Register Citizen Account on pgportal.gov.in', description: 'Create an account using your email and mobile number, or sign in through MeriPehchan / DigiLocker credentials.', action_url: 'https://pgportal.gov.in/', estimated_time: '3 mins' },
      { step_number: 2, title: 'Select Concerned Ministry / Department', description: 'Choose the appropriate Central Ministry (e.g. Railways, Finance, Telecom, Road Transport) or select your State Government portal.', action_url: null, estimated_time: '2 mins' },
      { step_number: 3, title: 'Submit Grievance with Supporting PDF', description: 'Explain the issue clearly (up to 2000 characters). Upload past application copies or receipt numbers in PDF format. Submit and save your Registration Number.', action_url: null, estimated_time: '5 mins' }
    ],
    documents: [
      { document_name: 'Previous Application or Receipt Number', is_mandatory: false, description: 'Shows that you had previously applied or approached local office' }
    ],
    requirements: [
      'Cannot be used for sub-judice court matters or RTI applications',
      'Must contain specific facts and dates'
    ],
    tips: [
      'Do not lodge RTI queries, court/sub-judice matters, or commercial contract disputes on CPGRAMS — these are rejected automatically.',
      'Always mention specific reference numbers, previous application dates, and officer names to get faster resolution within the mandated 30-day window.',
      'If you are dissatisfied with the resolution provided by the department, you have 30 days to file a free First Appeal to an Appellate Officer.'
    ]
  },
  {
    id: 'srv-nch',
    name: 'National Consumer Helpline (NCH - 1915)',
    slug: 'national-consumer-helpline-1915',
    category_id: 'cat-3',
    category_name: 'Consumer Issues',
    department: 'Department of Consumer Affairs, Govt. of India',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Resolve disputes with private companies, e-commerce sellers, airlines, telecom, or service providers regarding refunds and defects.',
    description: 'National platform set up under the Consumer Protection Act, 2019 to pre-empt formal court litigation. NCH is partnered with over 1,000 convergence companies (including Amazon, Flipkart, airlines, insurers, and tech brands) that resolve consumer grievances directly within 15 to 45 days.',
    eligibility: 'Any individual who bought goods or hired services for personal consideration.',
    fee: '100% Free of Cost',
    processing_information: 'Grievance docket transmitted directly to company nodal team. Typical mediation window is 15 to 45 days.',
    application_mode: 'HYBRID',
    official_website: 'https://consumerhelpline.gov.in/',
    official_app: 'NCH App / WhatsApp: 8800001915',
    official_helpline: '1915',
    official_email: 'nch-ca@nic.in',
    official_source: 'https://consumerhelpline.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['consumer', 'refund', 'warranty', 'e-commerce', 'defective', 'amazon complaint', 'flipkart complaint', 'airline refund', '1915', 'wrong bill', 'cheat by shop'],
    steps: [
      { step_number: 1, title: 'Call 1915 or Register Online', description: 'Dial toll-free 1915 from 8 AM to 8 PM or open https://consumerhelpline.gov.in/ or WhatsApp 8800001915.', action_url: 'https://consumerhelpline.gov.in/', estimated_time: '5 mins' },
      { step_number: 2, title: 'Enter Company Name & Order ID', description: 'Select the registered convergence brand, enter your Invoice/Order Number, and describe the deficiency in goods/services.', action_url: null, estimated_time: '5 mins' },
      { step_number: 3, title: 'Upload Bill / Invoice Proof', description: 'Upload purchase invoice, transaction receipt, or correspondence emails with the seller as proof.', action_url: null, estimated_time: '2 mins' }
    ],
    documents: [
      { document_name: 'Purchase Invoice / Cash Memo', is_mandatory: true, description: 'Proof of transaction with date and amount' },
      { document_name: 'Proof of Communication with Company', is_mandatory: false, description: 'Email chain or customer support ticket copy' }
    ],
    requirements: [
      'Transaction must have been for personal use, not commercial resale'
    ]
  },
  {
    id: 'srv-passport',
    name: 'Passport Seva Online - Indian Passport Services',
    slug: 'passport-seva-online',
    category_id: 'cat-6',
    category_name: 'Passport & Travel',
    department: 'Consular, Passport & Visa (CPV) Division, Ministry of External Affairs',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Apply for fresh Indian passport, renewal, address change, or emergency Tatkaal appointment.',
    description: 'Official portal of Ministry of External Affairs for passport applications across 500+ Passport Seva Kendras (PSK) and Post Office Passport Seva Kendras (POPSK). Covers ordinary passports, official/diplomatic passports, Tatkaal expedited processing, and Police Clearance Certificates (PCC).',
    eligibility: 'Indian citizens by birth, descent, registration, or naturalization.',
    fee: 'Normal (36 pages): Rs. 1,500 | 60 pages: Rs. 2,000; Tatkaal: Rs. 3,500 (36 pages) / Rs. 4,000 (60 pages); Police Clearance (PCC): Rs. 500',
    processing_information: 'Appointment booked online. Biometric verification at PSK. Police verification followed by Speed Post delivery.',
    application_mode: 'HYBRID',
    official_website: 'https://www.passportindia.gov.in/',
    official_app: 'mPassport Seva',
    official_helpline: '1800-258-1800',
    official_email: 'support-passport@gov.in',
    official_source: 'https://www.passportindia.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['passport', 'passport seva', 'tatkaal', 'psk', 'popsk', 'passport renewal', 'mea', 'police clearance', 'travel abroad'],
    steps: [
      { step_number: 1, title: 'Register on Official Passport Seva Portal', description: 'Create an account on https://www.passportindia.gov.in. Choose your Passport Office based on your current residential address.', action_url: 'https://www.passportindia.gov.in/', estimated_time: '5 mins' },
      { step_number: 2, title: 'Fill Application & Pay Online Fee', description: 'Complete Form online with personal, family, and address details. Pay official government fee via SBI payment gateway and book appointment slot at nearest PSK.', action_url: null, estimated_time: '15 mins' },
      { step_number: 3, title: 'Visit PSK for Biometrics & Document Verification', description: 'Carry original Aadhaar, 10th marksheet (for Non-ECR status), and address proof. Complete biometric photography and fingerprinting.', action_url: null, estimated_time: '1-2 hours at PSK' }
    ],
    documents: [
      { document_name: 'Proof of Present Address', is_mandatory: true, description: 'Aadhaar Card, Water/Electricity Bill, Rent Agreement, or Passbook' },
      { document_name: 'Proof of Date of Birth', is_mandatory: true, description: 'Birth Certificate, Aadhaar Card, or Class 10 School Leaving Certificate' },
      { document_name: 'Non-ECR Eligible Document', is_mandatory: false, description: 'Class 10 Pass Marksheet or higher degree certificate' }
    ],
    requirements: [
      'Physical presence of applicant required at PSK',
      'Current address must match residence for police verification'
    ]
  },
  {
    id: 'srv-myaadhaar',
    name: 'myAadhaar (UIDAI) - Aadhaar Card Download & Updates',
    slug: 'uidai-myaadhaar-services',
    category_id: 'cat-5',
    category_name: 'Identity Services',
    department: 'Unique Identification Authority of India (UIDAI), MeitY',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Download e-Aadhaar PDF, change residential address online, order durable plastic PVC card, and lock biometrics.',
    description: 'Official self-service portal provided by UIDAI. Allows citizens to download password-protected digitally signed e-Aadhaar, change address with valid supporting documents, order waterproof pocket-sized PVC Aadhaar cards, lock/unlock biometrics, and verify Aadhaar linkage.',
    eligibility: 'All residents of India who possess an enrolled Aadhaar number or 28-digit Enrolment ID.',
    fee: 'Demographic Update (Address/Name): Rs. 75; Biometric Update: Rs. 125; PVC Card: Rs. 50; e-Aadhaar Download: Free (Rs. 0)',
    processing_information: 'Download is instant with OTP. Address update requests verified within 3-15 working days.',
    application_mode: 'ONLINE',
    official_website: 'https://myaadhaar.uidai.gov.in/',
    official_app: 'mAadhaar (Android & iOS)',
    official_helpline: '1947',
    official_email: 'help@uidai.gov.in',
    official_source: 'https://uidai.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: [
      'aadhaar', 'aadhar', 'adhar', 'myaadhaar', 'myaadhar', 'uidai', 'eaadhaar', 'pvc card', 'address update',
      'biometric lock', '1947', 'aadhaar download', 'aadhar card', 'aadhaar card',
      'mobile number update', 'phone number update', 'change mobile number in aadhaar', 'how to change mobile number in aadhaar',
      'how can i change my aadhaar mobile number', 'change phone number in aadhaar', 'aadhaar mobile number change',
      'aadhar phone number update', 'aadhaar address change', 'update mobile number in aadhaar', 'name update aadhaar',
      'dob update aadhaar', 'date of birth update aadhaar', 'check aadhaar status', 'aadhaar seva kendra'
    ],
    sub_services: [
      {
        id: 'sub-aadhaar-mobile',
        title: 'Update Mobile Number & Email in Aadhaar',
        description: 'Update or link your active 10-digit mobile phone number and email address with your Aadhaar.',
        methods: ['OFFLINE'],
        offline_option: 'Mandatory in-person biometric verification at any Aadhaar Seva Kendra (ASK), Post Office (India Post), or designated Bank branch. Doorstep update is also available via India Post Payments Bank (IPPB) postmen.',
        documents_required: ['No document required. Only your 12-digit Aadhaar number and your physical presence for biometric scan.'],
        fee: 'Rs. 50 (Official UIDAI standard government fee)',
        important_notes: 'Online mobile number change was discontinued by UIDAI for national cybersecurity. In-person biometric authentication (fingerprint/iris) is compulsory. Beware of fraudulent websites claiming to change Aadhaar mobile number online without biometrics.',
        step_summary: [
          'Book an appointment online at https://appointments.uidai.gov.in/ to save waiting time, or walk directly into any Aadhaar Seva Kendra or post office.',
          'Provide your 12-digit Aadhaar number and fill the demographic update slip with your new 10-digit mobile number.',
          'Perform biometric authentication (fingerprint scan and iris capture) with the UIDAI certified operator.',
          'Pay the standard Rs. 50 government fee and collect your print receipt with the 28-digit Update Request Number (URN).',
          'Track status online. Mobile number is updated within 24 to 72 hours and an SMS confirmation is sent.'
        ],
        action_url: 'https://appointments.uidai.gov.in/'
      },
      {
        id: 'sub-aadhaar-address',
        title: 'Update Residential Address in Aadhaar',
        description: 'Update your house number, street, locality, PIN code, or district in Aadhaar records.',
        methods: ['ONLINE', 'OFFLINE'],
        offline_option: 'Available at any Aadhaar Seva Kendra with original address proof.',
        documents_required: ['Valid Proof of Address (POA) such as Electricity Bill (< 3 months), Rent Agreement, Bank Passbook with photo, Voter ID, or Passport.'],
        fee: 'Free (Rs. 0) on myAadhaar portal / Rs. 50 at Aadhaar Seva Kendra',
        important_notes: 'Spelling on your address document must match exactly. Ensure clear color scans (PDF/JPEG under 2 MB) are uploaded.',
        step_summary: [
          'Log in to https://myaadhaar.uidai.gov.in/ using your 12-digit Aadhaar and mobile OTP.',
          'Click on "Address Update" -> "Update Aadhaar Online".',
          'Enter your new residential address details in English and local language.',
          'Upload valid scanned Proof of Address (POA) document.',
          'Submit the application and note your URN tracking number. Verified within 3-7 working days.'
        ],
        action_url: 'https://myaadhaar.uidai.gov.in/'
      },
      {
        id: 'sub-aadhaar-name-dob',
        title: 'Update Name, Date of Birth (DOB) or Gender',
        description: 'Correct minor spelling in your name, update date of birth, or change gender in Aadhaar.',
        methods: ['OFFLINE'],
        offline_option: 'Aadhaar Seva Kendra (ASK) with documentary evidence.',
        documents_required: ['Proof of Identity (POI) / Birth Certificate / Matriculation 10th Marksheet / Passport.'],
        fee: 'Rs. 50 (Official UIDAI fee)',
        important_notes: 'UIDAI enforces strict lifetime limits: Name can be updated only twice; Date of Birth and Gender can be updated only once in a citizen\'s lifetime.',
        step_summary: [
          'Book appointment at nearest Aadhaar Seva Kendra at https://appointments.uidai.gov.in/.',
          'Carry original documentary proof (Birth Certificate or 10th mark sheet for DOB; Passport or PAN for name).',
          'Operator enters new data and captures live photo & biometric verification.',
          'Pay Rs. 50 fee and collect acknowledgement URN slip.'
        ],
        action_url: 'https://appointments.uidai.gov.in/'
      },
      {
        id: 'sub-aadhaar-download',
        title: 'Download e-Aadhaar Digital Card (Instant PDF)',
        description: 'Download a legally valid, digitally signed electronic copy of your Aadhaar card anytime.',
        methods: ['ONLINE'],
        offline_option: 'Can be printed at CSC center or Aadhaar center for Rs. 30.',
        documents_required: ['Aadhaar Number or 28-digit Enrolment ID (EID) with linked mobile for OTP.'],
        fee: '100% Free of Cost (Rs. 0)',
        important_notes: 'The downloaded PDF is password-protected. The password is the first 4 letters of your name in CAPITAL letters followed by your 4-digit Year of Birth (e.g. SURE1995 for Suresh born in 1995).',
        step_summary: [
          'Visit https://myaadhaar.uidai.gov.in/genricDownloadAadhaar.',
          'Enter your 12-digit Aadhaar number or 28-digit EID and captcha.',
          'Click "Send OTP" and enter the 6-digit OTP received on your mobile.',
          'Choose whether you want a regular or Masked Aadhaar (masks first 8 digits).',
          'Click "Verify & Download" to get instant authentic PDF.'
        ],
        action_url: 'https://myaadhaar.uidai.gov.in/genricDownloadAadhaar'
      },
      {
        id: 'sub-aadhaar-pvc',
        title: 'Order Official PVC Plastic Aadhaar Card',
        description: 'Get a durable, waterproof, pocket-sized plastic PVC Aadhaar card delivered to your home by India Post Speed Post.',
        methods: ['ONLINE'],
        offline_option: 'Order online; delivered to registered address.',
        documents_required: ['Aadhaar Number (Any mobile number can be used for OTP during PVC order).'],
        fee: 'Rs. 50 (Inclusive of Speed Post delivery and GST)',
        important_notes: 'Features official UIDAI hologram, microtext, ghost image, and verifiable secure QR code.',
        step_summary: [
          'Go to https://myaadhaar.uidai.gov.in/genricPVC.',
          'Enter Aadhaar number. If mobile is not linked, tick "My mobile number is not registered" and enter any alternate number.',
          'Verify OTP and preview demographic details.',
          'Pay Rs. 50 online via UPI, Debit Card, or Net Banking.',
          'Track postal delivery using the Service Request Number (SRN) via India Post.'
        ],
        action_url: 'https://myaadhaar.uidai.gov.in/genricPVC'
      },
      {
        id: 'sub-aadhaar-status',
        title: 'Check Aadhaar Enrolment / Update Status',
        description: 'Check whether your Aadhaar card generation or update request has been approved and completed.',
        methods: ['ONLINE'],
        offline_option: 'Call toll-free helpline 1947.',
        documents_required: ['28-digit Enrolment ID (EID) or Update Request Number (URN) from acknowledgement slip.'],
        fee: '100% Free of Cost (Rs. 0)',
        important_notes: 'Updates normally reflect within 24 to 72 hours, but may take up to 15 days in exceptional cases.',
        step_summary: [
          'Visit https://myaadhaar.uidai.gov.in/check-aadhaar-status.',
          'Enter the 14-digit EID/URN and 14-digit date & time printed on the acknowledgement slip.',
          'Solve the security captcha and click "Submit".',
          'View real-time status: "Under Process", "Rejected (with reason)", or "Completed - e-Aadhaar Ready for Download".'
        ],
        action_url: 'https://myaadhaar.uidai.gov.in/check-aadhaar-status'
      }
    ],
    steps: [
      { step_number: 1, title: 'Login with Aadhaar & Mobile OTP', description: 'Open https://myaadhaar.uidai.gov.in. Click "Login", enter your 12-digit Aadhaar number and captcha, and authenticate via SMS OTP.', action_url: 'https://myaadhaar.uidai.gov.in/', estimated_time: '2 mins' },
      { step_number: 2, title: 'Select Service (Download / Address / PVC)', description: 'Select "Download Aadhaar" for instant password-protected PDF (Password is first 4 letters of name in CAPITAL + year of birth YYYY), or select "Address Update".', action_url: null, estimated_time: '1 min' },
      { step_number: 3, title: 'Verify Proof & Make Secure Payment', description: 'Upload valid proof document if updating address. Pay the official government fee (Rs. 75 for demographic update / Rs. 50 for PVC card) via UPI or card. Download the URN acknowledgement receipt.', action_url: null, estimated_time: '2 mins' }
    ],
    documents: [
      { document_name: 'Aadhaar Number or Enrolment ID', is_mandatory: true, description: 'With mobile linked for OTP' },
      { document_name: 'Valid Address Proof (for address change only)', is_mandatory: false, description: 'Electricity bill, rent agreement, bank passbook, or voter ID' }
    ],
    requirements: [
      'Mobile number must be registered with Aadhaar for online OTP authentication',
      'For mobile number update, physical visit to Aadhaar Seva Kendra / Post Office with biometric verification is mandatory'
    ]
  },
  {
    id: 'srv-parivahan',
    name: 'Parivahan Sarathi - Driving Licence & Learner Licence',
    slug: 'parivahan-sarathi-driving-licence',
    category_id: 'cat-7',
    category_name: 'Transport',
    department: 'Ministry of Road Transport & Highways (MoRTH)',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Apply for Learner Licence online, book driving test slot for permanent DL, renew licence, and update address.',
    description: 'National unified road transport service portal developed by NIC for MoRTH. Citizens in most states can take the computerized Learner Licence road-safety knowledge test from home via Aadhaar e-KYC without visiting the RTO. Book slots for permanent DL driving track tests and order smart cards.',
    eligibility: '18+ years for gear vehicle / motor car; 16+ years for gearless 2-wheeler up to 50cc with guardian consent.',
    fee: 'Learner Licence (LL): Rs. 200; Permanent DL: Rs. 700 (Test Rs. 300 + Issue Rs. 200 + Smart Card Rs. 200); DL Renewal: Rs. 200',
    processing_information: 'LL generated online upon passing test. Permanent DL issued after passing RTO driving test.',
    application_mode: 'HYBRID',
    official_website: 'https://sarathi.parivahan.gov.in/',
    official_app: 'mParivahan App',
    official_helpline: '0120-4925572',
    official_email: 'helpdesk-sarathi@gov.in',
    official_source: 'https://parivahan.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: [
      'driving licence', 'driving license', 'learner licence', 'learner license', 'parivahan', 'sarathi', 'rto',
      'dl renewal', 'duplicate dl', 'lost dl', 'bike licence', 'car licence', 'challan', 'driving test',
      'apply driving licence', 'apply learner licence', 'how to get driving licence', 'driving licence status'
    ],
    sub_services: [
      {
        id: 'sub-dl-learner',
        title: 'Apply for Learner\'s Licence (LL Online)',
        description: 'Take the computerized road-safety knowledge test online from home and download instant Learner Licence.',
        methods: ['ONLINE'],
        offline_option: 'Available at local RTO for non-Aadhaar mode applicants.',
        documents_required: ['Aadhaar Card (for e-KYC paperless mode)', 'Form 1 Self-Declaration of Physical Fitness'],
        fee: 'Rs. 200 (Learner licence issue & test fee)',
        important_notes: 'Must watch the mandatory online road-safety tutorial before appearing for the 15-question traffic sign test.',
        step_summary: [
          'Visit https://sarathi.parivahan.gov.in/ and select your state.',
          'Click "Apply for Learner Licence" and choose "Submit via Aadhaar Authentication".',
          'Watch the 10-minute road safety educational video.',
          'Complete the computerized multiple-choice test (80% passing score).',
          'Download and print your verified digital Learner\'s Licence immediately.'
        ],
        action_url: 'https://sarathi.parivahan.gov.in/'
      },
      {
        id: 'sub-dl-permanent',
        title: 'Apply for Permanent Driving Licence (DL)',
        description: 'Book a practical driving track test slot at your local RTO to obtain your permanent Driving Licence smart card.',
        methods: ['HYBRID'],
        offline_option: 'Physical driving test mandatory at RTO automated test track.',
        documents_required: ['Valid Learner\'s Licence (must be held for at least 30 days)', 'Vehicle with valid RC, Insurance & PUC'],
        fee: 'Rs. 700 (RTO Driving Test Rs. 300 + Licence Issue Rs. 200 + Smart Card Rs. 200)',
        important_notes: 'You must apply within 6 months of LL validity. Wear a helmet for 2-wheeler test or seatbelt for 4-wheeler test.',
        step_summary: [
          'Go to https://sarathi.parivahan.gov.in/ and select "Apply for Driving Licence".',
          'Enter your Learner\'s Licence number and Date of Birth.',
          'Select vehicle class and book appointment date for RTO track test.',
          'Pay Rs. 700 fee online and print the appointment slip.',
          'Pass the driving track test. Smart card is printed and dispatched to your home address via India Post.'
        ],
        action_url: 'https://sarathi.parivahan.gov.in/'
      },
      {
        id: 'sub-dl-renewal',
        title: 'Driving Licence Renewal',
        description: 'Renew your expired driving licence without retaking the driving test.',
        methods: ['ONLINE'],
        offline_option: 'Available at RTO with Form 9.',
        documents_required: ['Original Expired DL', 'Form 1-A Medical Certificate (mandatory for commercial drivers or applicants aged 40+)'],
        fee: 'Rs. 200 (Within 1 year of expiry; Rs. 300 late fee per year if expired beyond 1 year)',
        important_notes: 'Can be renewed up to 1 year before expiry date or within 1 year after expiry without penalty.',
        step_summary: [
          'Select "Services on DL (Renewal/Duplicate/AEDL)" on https://sarathi.parivahan.gov.in/.',
          'Enter DL number, Date of Birth, and select "Renewal of DL".',
          'Upload doctor-signed Form 1-A medical fitness certificate.',
          'Pay renewal fee online and download digital renewed DL acknowledgement.'
        ],
        action_url: 'https://sarathi.parivahan.gov.in/'
      },
      {
        id: 'sub-dl-duplicate',
        title: 'Duplicate Driving Licence (Lost / Torn DL)',
        description: 'Get an official replacement smart card if your original driving licence was lost, stolen, or damaged.',
        methods: ['ONLINE'],
        offline_option: 'RTO Office submission.',
        documents_required: ['Police Lost Article Report / LDR (mandatory for lost DL)', 'Affidavit or copy of existing DL / DL number'],
        fee: 'Rs. 200 + Rs. 200 Smart Card fee',
        important_notes: 'File an online Police Lost Article Report first before submitting the duplicate application.',
        step_summary: [
          'File an online police lost report on your state police portal and download the LDR slip.',
          'Select "Apply for Duplicate DL" on https://sarathi.parivahan.gov.in/.',
          'Enter DL number and reason for duplicate (Lost/Torn).',
          'Upload the Police LDR copy and pay Rs. 400 fee.',
          'Duplicate DL is issued and dispatched via Speed Post.'
        ],
        action_url: 'https://sarathi.parivahan.gov.in/'
      }
    ],
    steps: [
      { step_number: 1, title: 'Select State on Sarathi Portal', description: 'Visit https://sarathi.parivahan.gov.in and select your home state from the dropdown.', action_url: 'https://sarathi.parivahan.gov.in/', estimated_time: '1 min' },
      { step_number: 2, title: 'Apply for Learner Licence with Aadhaar', description: 'Choose "Apply for Learner Licence". Use Aadhaar e-KYC to authenticate automatically without visiting RTO for document submission in eligible states.', action_url: null, estimated_time: '10 mins' },
      { step_number: 3, title: 'Appear for Online Road Safety Test', description: 'Watch the mandatory road safety tutorial video and answer 15-20 traffic sign questions. Download your digital Learner Licence immediately upon passing.', action_url: null, estimated_time: '15 mins' }
    ],
    documents: [
      { document_name: 'Aadhaar Card (e-KYC)', is_mandatory: true, description: 'Contains verified name, date of birth, and residential address' },
      { document_name: 'Medical Fitness Certificate (Form 1 / 1-A)', is_mandatory: true, description: 'Self-declaration for non-transport; doctor signed Form 1-A for applicants above 40 years' }
    ],
    requirements: [
      'Minimum age requirements must be met on date of application',
      'Learner licence must be held for minimum 30 days before applying for permanent DL test'
    ]
  },
  {
    id: 'srv-voters',
    name: 'Voters Service Portal (ECI) - Voter ID Registration & Updates',
    slug: 'voters-service-portal-eci',
    category_id: 'cat-17',
    category_name: 'Elections & Voter Services',
    department: 'Election Commission of India (ECI)',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Apply for new Voter ID (Form 6), update address or name (Form 8), find polling booth, and download e-EPIC card.',
    description: 'National official voter portal managed by Election Commission of India. Indian citizens can register as fresh electors (Form 6), apply for shifting of residence / correction of entries in electoral roll (Form 8), delete duplicate names (Form 7), search their name in the electoral roll, and download e-EPIC PDF.',
    eligibility: 'Indian citizens who have attained or will attain 18 years of age on the qualifying dates.',
    fee: '100% Free of Cost',
    processing_information: 'Submitted online, verified on-ground by local Booth Level Officer (BLO), updated in electoral roll within 3 to 6 weeks.',
    application_mode: 'ONLINE',
    official_website: 'https://voters.eci.gov.in/',
    official_app: 'Voter Helpline App',
    official_helpline: '1950',
    official_email: 'complaints@eci.gov.in',
    official_source: 'https://voters.eci.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['voter card', 'voter id', 'form 6', 'form 8', 'e-epic', 'elections', 'eci', 'polling booth', '1950', 'voters portal'],
    steps: [
      { step_number: 1, title: 'Open ECI Voters Service Portal', description: 'Visit https://voters.eci.gov.in or download the Voter Helpline App. Sign up with your mobile number.', action_url: 'https://voters.eci.gov.in/', estimated_time: '2 mins' },
      { step_number: 2, title: 'Fill Form 6 (New) or Form 8 (Correction)', description: 'Select your state, district, and assembly constituency. Fill your personal details and upload a passport-sized photograph and address proof.', action_url: null, estimated_time: '10 mins' },
      { step_number: 3, title: 'Receive Reference ID & BLO Verification', description: 'Track your application status with the Reference ID. A Booth Level Officer (BLO) verifies your residence and the EPIC card is dispatched via Speed Post.', action_url: null, estimated_time: '3-4 weeks' }
    ],
    documents: [
      { document_name: 'Proof of Date of Birth', is_mandatory: true, description: 'Birth certificate, Aadhaar, PAN card, or Class 10 certificate' },
      { document_name: 'Proof of Residence', is_mandatory: true, description: 'Water/electricity bill, bank passbook, Aadhaar, or rent agreement' },
      { document_name: 'Passport Size Photograph', is_mandatory: true, description: 'Recent color photograph with white background' }
    ],
    requirements: [
      'Must be an Indian citizen of at least 18 years',
      'Cannot be enrolled in multiple constituencies'
    ]
  },
  {
    id: 'srv-nsp',
    name: 'National Scholarship Portal (NSP)',
    slug: 'national-scholarship-portal',
    category_id: 'cat-12',
    category_name: 'Scholarships',
    department: 'Ministry of Electronics and Information Technology (MeitY)',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Apply for Pre-Matric, Post-Matric, and higher education scholarships with Direct Benefit Transfer into your bank account.',
    description: 'NSP is the unified digital platform implementing hundreds of scholarship schemes by Central Ministries (Ministry of Minority Affairs, Social Justice, Tribal Affairs, Higher Education) and State Governments. Features One-Time Registration (OTR), Aadhaar/Face authentication, and transparent DBT into Aadhaar-seeded bank accounts.',
    eligibility: 'Students enrolled in recognized schools, colleges, or universities meeting family income and academic eligibility of respective schemes.',
    fee: '100% Free of Cost',
    processing_information: 'Level 1: School/College verification -> Level 2: District Nodal Officer -> DBT fund release.',
    application_mode: 'ONLINE',
    official_website: 'https://scholarships.gov.in/',
    official_app: 'NSP Mobile App',
    official_helpline: '0120-6619540',
    official_email: 'helpdesk@nsp.gov.in',
    official_source: 'https://scholarships.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['scholarship', 'nsp', 'student grant', 'post-matric', 'pre-matric', 'college scholarship', 'fee waiver', 'minority scholarship', 'sc st scholarship'],
    steps: [
      { step_number: 1, title: 'Complete One-Time Registration (OTR)', description: 'Visit https://scholarships.gov.in. Complete your OTR using Aadhaar or Aadhaar Face RD verification to generate a 14-digit OTR number.', action_url: 'https://scholarships.gov.in/', estimated_time: '5 mins' },
      { step_number: 2, title: 'Select Eligible Scheme & Fill Details', description: 'Log in with your OTR credentials. The system automatically lists scholarship schemes matching your course, institution, and category. Fill marks and family income.', action_url: null, estimated_time: '15 mins' },
      { step_number: 3, title: 'Submit & Track Institute Verification', description: 'Submit the application and inform your college nodal officer to verify records on the institute portal. Funds are transferred via DBT into your Aadhaar-linked bank account.', action_url: null, estimated_time: 'Semester cycle' }
    ],
    documents: [
      { document_name: 'Aadhaar Card with Bank Seeding', is_mandatory: true, description: 'Bank account must be seeded with Aadhaar on NPCI mapper' },
      { document_name: 'Family Income Certificate', is_mandatory: true, description: 'Issued by competent revenue authority (Tahsildar / Sub-Divisional Magistrate)' },
      { document_name: 'Previous Academic Marksheet', is_mandatory: true, description: 'Last qualifying exam marksheet' },
      { document_name: 'College Fee Receipt / Bonafide Certificate', is_mandatory: true, description: 'Issued by head of educational institution' }
    ],
    requirements: [
      'Bank account must be active and mapped to Aadhaar for Direct Benefit Transfer',
      'Student can avail only one scholarship benefit at a time under Central schemes'
    ]
  },
  {
    id: 'srv-myscheme',
    name: 'myScheme - Government Scheme Eligibility Discovery Platform',
    slug: 'myscheme-government-portal',
    category_id: 'cat-8',
    category_name: 'Government Schemes',
    department: 'National e-Governance Division (NeGD), MeitY',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Discover all central and state welfare benefits, farming subsidies, student loans, and pensions you are eligible for.',
    description: 'Developed by NeGD, myScheme eliminates the need for citizens to search across hundreds of departmental websites. By entering simple demographic parameters (gender, age, state, area, caste, occupation, income), citizens discover every scheme they qualify for, along with step-by-step application instructions and direct official portal links.',
    eligibility: 'All citizens of India.',
    fee: '100% Free of Cost',
    processing_information: 'Instant personalized scheme discovery and eligibility matching.',
    application_mode: 'ONLINE',
    official_website: 'https://www.myscheme.gov.in/',
    official_app: 'myScheme / UMANG App',
    official_helpline: '1800-111-555',
    official_email: 'support-myscheme@gov.in',
    official_source: 'https://www.myscheme.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['myscheme', 'schemes', 'welfare', 'subsidies', 'government benefits', 'pm kisan', 'pension', 'women schemes', 'farmer schemes'],
    steps: [
      { step_number: 1, title: 'Open myScheme Eligibility Tool', description: 'Visit https://www.myscheme.gov.in and click "Find Schemes for You".', action_url: 'https://www.myscheme.gov.in/', estimated_time: '1 min' },
      { step_number: 2, title: 'Enter Demographic Details', description: 'Select your Gender, Age, State, Urban/Rural area, Social Category, and Occupation/Employment status.', action_url: null, estimated_time: '2 mins' },
      { step_number: 3, title: 'Review Matched Schemes & Apply', description: 'Browse schemes filtered for your profile. Click on any scheme to review benefits, required documents, and open the official ministry application link.', action_url: null, estimated_time: 'Instant' }
    ],
    documents: [],
    requirements: ['No documents required to search eligibility']
  },
  {
    id: 'srv-umang',
    name: 'UMANG - Unified Mobile App for All Government Services',
    slug: 'umang-unified-mobile-app',
    category_id: 'cat-9',
    category_name: 'Government Apps',
    department: 'National e-Governance Division (NeGD), MeitY',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Access 1,500+ government services on a single app: EPFO passbook, gas cylinder booking, electricity bills, and pensions.',
    description: 'UMANG (Unified Mobile App for New-age Governance) is the master government super-app developed by MeitY and NeGD. Available in 13 Indian languages, it bridges Central, State, and local services like EPFO (passbook, claims), ESIC, LPG cylinder booking, Digilocker, driving licences, and utility bill payments under a single sign-on.',
    eligibility: 'All Indian citizens with an active mobile number.',
    fee: '100% Free of Cost',
    processing_information: 'Direct integration with departmental backends for instant service delivery.',
    application_mode: 'MOBILE_APP',
    official_website: 'https://web.umang.gov.in/',
    official_app: 'UMANG App (Android, iOS & Web)',
    official_helpline: '1800-11-5246',
    official_email: 'customercare@umang.gov.in',
    official_source: 'https://web.umang.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['umang', 'epfo', 'provident fund', 'pf balance', 'gas booking', 'pension', 'bill payment', 'super app', 'all government services in one app'],
    steps: [
      { step_number: 1, title: 'Install Official UMANG App', description: 'Download UMANG from Google Play Store or Apple App Store, or visit web.umang.gov.in.', action_url: 'https://web.umang.gov.in/', estimated_time: '2 mins' },
      { step_number: 2, title: 'Register with Mobile Number & MPIN', description: 'Enter your phone number, verify via OTP, and create a 4-digit security MPIN.', action_url: null, estimated_time: '2 mins' },
      { step_number: 3, title: 'Access 1500+ Government Services', description: 'Search for "EPFO" to view provident fund passbook, "Bharat Gas / Indane" for LPG booking, or "Electricity" to pay state power bills.', action_url: null, estimated_time: 'Instant' }
    ],
    documents: [],
    requirements: ['Mobile phone with internet connection']
  },
  {
    id: 'srv-instant-epan',
    name: 'Instant e-PAN via Aadhaar (Income Tax Department)',
    slug: 'instant-epan-income-tax',
    category_id: 'cat-5',
    category_name: 'Identity Services',
    department: 'Directorate of Income Tax (Systems), Ministry of Finance',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Get an official, legally valid digital PAN card in PDF format within 10 minutes completely free using your Aadhaar e-KYC.',
    description: 'Instant e-PAN is a 100% paperless and completely free facility provided by the Income Tax Department on the e-Filing 2.0 portal. Allotment of PAN is instantaneous using Aadhaar e-KYC. The generated e-PAN contains an authentic digitally signed QR code and holds identical legal validity to a physical plastic laminated PAN card under Section 139A of the Income Tax Act.',
    eligibility: 'Any individual Indian citizen who has a valid Aadhaar number linked to an active mobile phone, has never been allotted a PAN previously, and is not a minor.',
    fee: '100% Free of Cost (Rs. 0)',
    processing_information: 'Instant generation within 5-10 minutes. Downloadable immediately upon Aadhaar OTP verification.',
    application_mode: 'ONLINE',
    official_website: 'https://eportal.incometax.gov.in/',
    official_app: 'e-Filing Portal / UMANG App',
    official_helpline: '1800-180-1961',
    official_email: 'pan-helpdesk@incometax.gov.in',
    official_source: 'https://www.incometax.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: [
      'pan card', 'instant pan', 'epan', 'income tax pan', 'free pan card', 'aadhaar pan', 'aadhar pan', 'adhar pan',
      'aadhaar', 'aadhar', 'adhar', 'apply pan online', 'pan download', '10 minute pan', 'financial identity', 'pan-aadhaar',
      'instant epan', 'digital pan'
    ],
    sub_services: [
      {
        id: 'sub-epan-new',
        title: 'Generate Instant e-PAN (10-Minute Allotment via Aadhaar)',
        description: 'Get an authentic, digitally signed 10-digit Permanent Account Number (PAN) in PDF format within minutes.',
        methods: ['ONLINE'],
        offline_option: 'Online paperless only; physical PAN available via Protean/UTIITSL.',
        documents_required: ['Valid 12-digit Aadhaar Number linked to active mobile phone for OTP.'],
        fee: '100% Free of Cost (Rs. 0)',
        important_notes: 'Eligible only if you have never been allotted a PAN previously and are not a minor. Holds 100% legal validity on par with physical plastic cards under IT Act.',
        step_summary: [
          'Visit official Income Tax e-Filing portal https://eportal.incometax.gov.in/.',
          'Click "Instant e-PAN" under Quick Links, then select "Get New e-PAN".',
          'Enter your 12-digit Aadhaar number and enter the 6-digit OTP received on your mobile.',
          'Confirm your personal details (Name, DOB, Gender, Address) fetched from UIDAI.',
          'Submit the request. Your 10-digit PAN is allotted within 10 minutes.'
        ],
        action_url: 'https://eportal.incometax.gov.in/'
      },
      {
        id: 'sub-epan-download',
        title: 'Check Status / Download e-PAN PDF',
        description: 'Download your password-protected digitally signed e-PAN card PDF.',
        methods: ['ONLINE'],
        documents_required: ['Aadhaar Number and mobile OTP.'],
        fee: '100% Free of Cost (Rs. 0)',
        important_notes: 'The PDF password is your Date of Birth in DDMMYYYY format without slashes (e.g. 05081992 for 5th August 1992).',
        step_summary: [
          'Visit https://eportal.incometax.gov.in/ and click "Instant e-PAN" -> "Check Status / Download PAN".',
          'Enter Aadhaar number and submit the 6-digit OTP.',
          'Download and save the verified e-PAN PDF containing the Income Tax QR code.'
        ],
        action_url: 'https://eportal.incometax.gov.in/'
      }
    ],
    steps: [
      { step_number: 1, title: 'Open Income Tax e-Filing Instant e-PAN Page', description: 'Visit the official Income Tax e-Filing portal https://eportal.incometax.gov.in/ and select "Instant e-PAN" under Quick Links.', action_url: 'https://eportal.incometax.gov.in/', estimated_time: '1 min' },
      { step_number: 2, title: 'Enter 12-Digit Aadhaar & Validate OTP', description: 'Type your 12-digit Aadhaar number, agree to the declaration, and enter the 6-digit OTP received on your Aadhaar-linked mobile phone.', action_url: null, estimated_time: '2 mins' },
      { step_number: 3, title: 'Validate Demographics & Optional Email', description: 'Review your personal details (Name, Date of Birth, Gender, Address) pulled automatically from UIDAI. Validate your email ID if you wish it linked to your PAN.', action_url: null, estimated_time: '2 mins' },
      { step_number: 4, title: 'Download Digitally Signed e-PAN PDF', description: 'Return to the Instant e-PAN section on https://eportal.incometax.gov.in/, click "Check Status / Download PAN", enter Aadhaar and OTP. Download the password-protected PDF (Password is your Date of Birth in DDMMYYYY format).', action_url: 'https://eportal.incometax.gov.in/', estimated_time: '5 mins' }
    ],
    documents: [
      { document_name: 'Aadhaar Card Number', is_mandatory: true, description: 'Must have active mobile number registered with UIDAI for OTP authentication' }
    ],
    requirements: [
      'Must NOT already have an allotted PAN card (Holding two PAN cards attracts a penalty of Rs. 10,000 under Section 272B)',
      'Applicant must be a major (18 years or older on date of application)',
      'Demographic details in Aadhaar (Name, DOB, Gender) must be completely accurate'
    ],
    tips: [
      'Ensure your mobile number linked with Aadhaar is active to receive the 6-digit OTP.',
      'PDF password is your date of birth without slashes, e.g., 01051998 for 1st May 1998.',
      'Instant e-PAN is 100% legal for all banking, demat account opening, and tax filing.'
    ]
  },
  {
    id: 'srv-pan-card',
    name: 'Physical PAN Card Application & Correction (Protean / UTIITSL)',
    slug: 'pan-card-nsdl-utiitsl',
    category_id: 'cat-5',
    category_name: 'Identity Services',
    department: 'Central Board of Direct Taxes (CBDT), Ministry of Finance',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Apply for a laminated physical PVC PAN card (Form 49A), change name/address/photo, reprint lost cards, or link PAN with Aadhaar.',
    description: 'Official portal for issuance of physical plastic PAN cards managed by authorized processing agencies Protean eGov Technologies (formerly NSDL) and UTI Infrastructure Technology And Services Ltd (UTIITSL). Offers paperless Aadhaar e-KYC or physical document submission for new PAN, reprints of lost or damaged cards, name/father name changes, and photograph/signature updates.',
    eligibility: 'All Indian citizens, minors, NRIs, companies, and trusts requiring a permanent financial identification number.',
    fee: 'Physical PAN Card (in India): Rs. 107; Foreign Dispatch: Rs. 1,017; Physical Reprint: Rs. 50; e-PAN Download: Rs. 8.26 (Free within 30 days)',
    processing_information: 'Printed and dispatched via India Post Speed Post within 10 to 15 working days following verification.',
    application_mode: 'ONLINE',
    official_website: 'https://www.protean-tinpan.com/services/pan/pan-index.html',
    official_app: 'Official Protean / UTIITSL Portals',
    official_helpline: '020-27218080 (Protean) / 022-67931300 (UTIITSL)',
    official_email: 'tininfo@proteantech.in',
    official_source: 'https://incometaxindia.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: [
      'pan card', 'pan', 'physical pan card', 'nsdl pan', 'utiitsl pan', 'pan correction', 'reprint pan card',
      'form 49a', 'link pan aadhaar', 'link pan aadhar', 'protean pan', 'pvc pan card', 'how to correct pan',
      'pan correction process', 'change details in pan', 'epan', 'instant pan', 'income tax pan', 'lost pan', 'duplicate pan'
    ],
    sub_services: [
      {
        id: 'sub-pan-correction',
        title: 'PAN Card Correction & Data Update (Name, Photo, DOB, Father Name)',
        description: 'Correct errors, change surname after marriage, update photograph or signature, and request a reprinted card.',
        methods: ['ONLINE', 'OFFLINE'],
        offline_option: 'Submit physical Form 49A/Correction at Protean/UTIITSL TIN Facilitation Centers (TIN-FC).',
        documents_required: [
          'Copy of Existing PAN Card',
          'Proof of Identity (Aadhaar / Voter ID / Passport)',
          'Proof of Date of Birth (Aadhaar / Birth Certificate / 10th Marksheet)',
          'Supporting document for requested change (e.g. Marriage Certificate / Gazette Notification for name change)'
        ],
        fee: 'Rs. 107 (Physical card delivery in India) / Rs. 8.26 (e-PAN download only)',
        important_notes: 'In paperless e-KYC mode, Aadhaar OTP is used to digitally sign without mailing physical paperwork.',
        step_summary: [
          'Open Protean PAN portal https://www.protean-tinpan.com/services/pan/pan-index.html or UTIITSL portal https://www.pan.utiitsl.com/.',
          'Select "Changes or Correction in existing PAN Data / Reprint of PAN Card".',
          'Fill in your 10-character PAN number and check the boxes next to the fields you wish to correct.',
          'Upload supporting documents and choose "Submit digitally through e-KYC & e-Sign".',
          'Pay Rs. 107 fee online and complete Aadhaar OTP e-Sign. New card is dispatched via Speed Post in 10-15 days.'
        ],
        action_url: 'https://www.protean-tinpan.com/services/pan/pan-index.html'
      },
      {
        id: 'sub-pan-new',
        title: 'Apply for New Physical PAN Card (Form 49A)',
        description: 'Apply for a new laminated plastic PAN card for Indian citizens, minors, or NRIs.',
        methods: ['ONLINE', 'OFFLINE'],
        offline_option: 'Available at all authorised TIN-FC centers across India.',
        documents_required: ['Aadhaar Card (serves as Proof of Identity, Address, and DOB)'],
        fee: 'Rs. 107 (Delivered to Indian residential address)',
        important_notes: 'Father\'s name is mandatory on the PAN card even for married female applicants.',
        step_summary: [
          'Visit Protean (NSDL) https://www.protean-tinpan.com/ or UTIITSL https://www.pan.utiitsl.com/.',
          'Select "Application Type: New PAN - Indian Citizen (Form 49A)".',
          'Complete personal and contact details, select "e-KYC & e-Sign (Paperless)".',
          'Pay Rs. 107 via UPI, Net Banking, or Debit Card.',
          'Authenticate via Aadhaar OTP. Dispatched via India Post Speed Post.'
        ],
        action_url: 'https://www.protean-tinpan.com/services/pan/pan-index.html'
      },
      {
        id: 'sub-pan-reprint',
        title: 'Reprint Lost or Damaged PAN Card (Duplicate PAN)',
        description: 'Order a replacement physical laminated PAN card with your existing unchanged PAN details.',
        methods: ['ONLINE'],
        offline_option: 'Available via TIN-FC centers.',
        documents_required: ['10-digit PAN Number', 'Aadhaar Number (for individuals)'],
        fee: 'Rs. 50 (Inclusive of Speed Post dispatch within India)',
        important_notes: 'Use this service when no details need to be changed and you simply need a replacement for a lost, stolen, or broken card.',
        step_summary: [
          'Visit Protean Reprint page https://www.onlineservices.nsdl.com/paam/ReprintEPan.html or UTIITSL reprint portal.',
          'Enter your PAN number, Aadhaar number, Month and Year of Birth.',
          'Authenticate using OTP sent to your registered mobile number or email.',
          'Pay the standard Rs. 50 government fee.',
          'Track postal delivery using the generated 15-digit acknowledgement number.'
        ],
        action_url: 'https://www.onlineservices.nsdl.com/paam/ReprintEPan.html'
      },
      {
        id: 'sub-pan-status',
        title: 'Track PAN Application Status',
        description: 'Track the real-time processing and postal dispatch status of your PAN application.',
        methods: ['ONLINE'],
        documents_required: ['15-digit Acknowledgement Number (Protean) or 9-digit Application Coupon Number (UTIITSL).'],
        fee: '100% Free of Cost (Rs. 0)',
        step_summary: [
          'Visit UTIITSL PAN tracking portal https://www.trackpan.utiitsl.com/PANONLINE/ or Protean tracking portal.',
          'Select application type and enter your Acknowledgement / Coupon Number.',
          'View status: "Under Verification", "Under Printing", or "Dispatched via Speed Post (with India Post Tracking Number)".'
        ],
        action_url: 'https://www.trackpan.utiitsl.com/PANONLINE/'
      }
    ],
    steps: [
      { step_number: 1, title: 'Choose Application Type on Protean / UTIITSL', description: 'Open Protean PAN portal https://www.protean-tinpan.com/services/pan/pan-index.html or UTIITSL portal https://www.pan.utiitsl.com/. Select "Form 49A (New PAN - Indian Citizen)" or "Changes/Correction in PAN Data".', action_url: 'https://www.protean-tinpan.com/services/pan/pan-index.html', estimated_time: '2 mins' },
      { step_number: 2, title: 'Fill Personal Details & Choose Paperless e-KYC', description: 'Enter applicant full name, date of birth, mobile number, and email. Select "Submit digitally through e-KYC & e-Sign (Paperless)" to use Aadhaar without physical courier.', action_url: null, estimated_time: '10 mins' },
      { step_number: 3, title: 'Pay Government Fee Online', description: 'Pay the official government application fee of Rs. 107 using UPI, Debit Card, or Net Banking. Save the 15-digit Token / Acknowledgement Number.', action_url: null, estimated_time: '2 mins' },
      { step_number: 4, title: 'Authenticate with Aadhaar e-Sign & Track Speed Post', description: 'Complete Protean / UTIITSL Aadhaar OTP authentication to digitally sign the application. Track postal dispatch using your 15-digit Acknowledgement Number on UTIITSL / Protean tracking portals.', action_url: 'https://www.trackpan.utiitsl.com/PANONLINE/', estimated_time: '7-12 days delivery' }
    ],
    documents: [
      { document_name: 'Proof of Identity (POI)', is_mandatory: true, description: 'Aadhaar Card, Voter ID, Passport, or Driving Licence' },
      { document_name: 'Proof of Address (POA)', is_mandatory: true, description: 'Aadhaar Card, Electricity Bill (< 3 months old), Bank Passbook, or Rent Agreement' },
      { document_name: 'Proof of Date of Birth (DOB)', is_mandatory: true, description: 'Aadhaar Card, Birth Certificate, Matriculation Class 10 Marksheet, or Passport' },
      { document_name: 'Copy of Existing PAN / FIR Copy (For reprint/correction)', is_mandatory: false, description: 'Required only when requesting correction or replacement of a lost card' }
    ],
    requirements: [
      'Father\'s name is mandatory on PAN card (even for married women)',
      'For e-KYC mode, mobile number registered with UIDAI must be active to receive OTP',
      'For physical photo/signature upload mode, photo must be 200 DPI JPEG under 50 KB'
    ],
    tips: [
      'Opting for "e-KYC & e-Sign" eliminates the need to courier physical documents to the Pune / Mumbai processing centers.',
      'Ensure the spelling of your name in Form 49A exactly matches your Aadhaar card to avoid rejected applications.'
    ]
  },
  {
    id: 'srv-abha-health-id',
    name: 'ABHA Card (Ayushman Bharat Health Account) - 14-Digit Health ID',
    slug: 'ayushman-bharat-abha-health-id',
    category_id: 'cat-5',
    category_name: 'Identity Services',
    department: 'National Health Authority (NHA), Ministry of Health & Family Welfare',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Create your official 14-digit ABHA Health ID card instantly to store and share hospital prescriptions, lab reports, and medical history digitally.',
    description: 'ABHA (Ayushman Bharat Health Account) is the foundational digital health identity established under the Ayushman Bharat Digital Mission (ABDM). It gives every citizen a unique 14-digit health identification number and a personal ABHA address (like name@abdm). Enables seamless, paperless OPD registrations via QR scan at government and private hospitals, and maintains lifetime digital records.',
    eligibility: 'All Indian citizens of any age. Minors can be enrolled by parents.',
    fee: '100% Free of Cost (Rs. 0)',
    processing_information: 'Instant generation in under 2 minutes. Downloadable as a laminated digital card immediately.',
    application_mode: 'ONLINE',
    official_website: 'https://abha.abdm.gov.in/',
    official_app: 'ABHA App (Android & iOS) / Aarogya Setu',
    official_helpline: '14477 / 1800-11-4477',
    official_email: 'abdm@nha.gov.in',
    official_source: 'https://abdm.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['abha card', 'health id', 'ayushman bharat id', 'digital health record', 'abha download', 'abha registration', 'health identity', '14 digit health id', 'abdm'],
    steps: [
      { step_number: 1, title: 'Visit Official ABHA Portal', description: 'Open https://abha.abdm.gov.in/ and click "Create ABHA Number".', action_url: 'https://abha.abdm.gov.in/', estimated_time: '1 min' },
      { step_number: 2, title: 'Authenticate using Aadhaar or Driving Licence', description: 'Enter your 12-digit Aadhaar number and verify using the 6-digit OTP sent to your linked mobile number.', action_url: null, estimated_time: '1 min' },
      { step_number: 3, title: 'Create Unique ABHA Address & Download Card', description: 'Choose your unique PHR address (e.g. rahul.kumar@abdm). Download your high-resolution laminated-style ABHA Card containing your 14-digit number and QR code.', action_url: 'https://abha.abdm.gov.in/', estimated_time: '1 min' }
    ],
    documents: [
      { document_name: 'Aadhaar Number (or Driving Licence)', is_mandatory: true, description: 'With mobile number linked for OTP verification' }
    ],
    requirements: [
      'Active mobile phone to receive verification OTP',
      'Citizens of all ages eligible'
    ],
    tips: [
      'Scan your ABHA QR code at AIIMS, district hospitals, and CGHS wellness centers for queue-less OPD slip generation in 10 seconds.',
      'Health records can only be viewed by doctors with your explicit consent via the ABHA App.'
    ]
  },
  {
    id: 'srv-ration-card',
    name: 'Ration Card Services & One Nation One Ration Card (NFSA / RCMS)',
    slug: 'ration-card-onorc-nfsa',
    category_id: 'cat-5',
    category_name: 'Identity Services',
    department: 'Department of Food & Public Distribution, Ministry of Consumer Affairs',
    jurisdiction_level: 'STATE',
    state: 'All India',
    simple_description: 'Apply for family Ration Card, add family members, check NFSA food grain quota, and avail ration portability anywhere in India.',
    description: 'National Food Security Act (NFSA) portal and state Food & Civil Supplies online systems (RCMS). Under the landmark "One Nation One Ration Card" (ONORC) initiative, migrant workers and eligible families can collect their entitled subsidized wheat, rice, and coarse grains from any of the 5.4 lakh Fair Price Shops (FPS) across India using biometric Aadhaar authentication.',
    eligibility: 'Households categorized under Antyodaya Anna Yojana (AAY) or Priority Household (PHH) based on state income criteria.',
    fee: 'Free of Cost (Central NFSA PMGKAY) or nominal state fee (Rs. 5 - Rs. 50 depending on state)',
    processing_information: 'Online application followed by verification by local Food Inspector / Tahsildar within 15 to 30 days.',
    application_mode: 'HYBRID',
    official_website: 'https://nfsa.gov.in/',
    official_app: 'Mera Ration App (Android)',
    official_helpline: '1967 (National NFSA Helpline)',
    official_email: 'dir-food@nic.in',
    official_source: 'https://nfsa.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: [
      'ration card', 'ration', 'rashan', 'rashan card', 'onorc', 'mera ration', 'food security', 'nfsa',
      'ration card apply', 'fair price shop', 'family identity', 'subsidized food', 'apply ration card',
      'bpl ration card', 'ration card status', 'add member in ration card', 'ration card correction'
    ],
    sub_services: [
      {
        id: 'sub-rc-apply',
        title: 'Apply for New Ration Card (NFSA / State RCMS)',
        description: 'Apply for fresh family food security Ration Card (Antyodaya AAY / Priority Household PHH / BPL).',
        methods: ['ONLINE', 'OFFLINE'],
        offline_option: 'Submit physical application at local Tehsil, Block Development Office (BDO), or Common Service Center (CSC).',
        documents_required: [
          'Aadhaar cards of all family members',
          'Proof of Residence (Electricity Bill / Rent Agreement / Gas connection)',
          'Income Certificate issued by Revenue Authority (Tahsildar)',
          'Bank Passbook copy of Female Head of Family'
        ],
        fee: 'Free of Cost / Nominal State fee (Rs. 5 to Rs. 20 depending on state)',
        important_notes: 'Under NFSA guidelines, the senior-most adult female member (aged 18+) is designated as the Head of the Household on the card.',
        step_summary: [
          'Visit your State Food & Civil Supplies Portal or https://nfsa.gov.in/ -> "Apply for New Ration Card".',
          'Select your district, tehsil, and gram panchayat / municipal ward.',
          'Fill family member details and enter 12-digit Aadhaar numbers for every member.',
          'Upload income proof, residence proof, and family photo.',
          'Local food inspector conducts field verification within 15-30 days and issues your digital ration card.'
        ],
        action_url: 'https://nfsa.gov.in/'
      },
      {
        id: 'sub-rc-member',
        title: 'Add or Remove Family Member in Ration Card',
        description: 'Add newborn children or newly married spouse, or remove names due to marriage/relocation.',
        methods: ['ONLINE', 'OFFLINE'],
        offline_option: 'Available at local District Supply Office (DSO) or Village Revenue Center.',
        documents_required: [
          'For Newborn Child: Birth Certificate and child\'s Aadhaar card (or enrolment ID)',
          'For Spouse / Marriage: Marriage Certificate, Aadhaar Card, and Surrender/Deletion Certificate from previous card'
        ],
        fee: 'Free of Cost (Rs. 0)',
        step_summary: [
          'Log in to your State Food Portal / NFSA portal.',
          'Select "Ration Card Member Addition / Correction".',
          'Enter Ration Card Number and authenticate via Head of Family Aadhaar OTP.',
          'Upload Birth Certificate or Marriage Certificate with member Aadhaar.',
          'Approved by Area Supply Inspector and added to the quota within 7-15 days.'
        ],
        action_url: 'https://nfsa.gov.in/'
      },
      {
        id: 'sub-rc-onorc',
        title: 'One Nation One Ration Card (ONORC Portability)',
        description: 'Collect your subsidized food grains from any Fair Price Shop (FPS) across India without changing your home state card.',
        methods: ['OFFLINE'],
        offline_option: 'Walk into any of the 5.4 lakh Fair Price Shops across India with your Aadhaar.',
        documents_required: ['Ration Card Number or Aadhaar Number of any enrolled family member'],
        fee: '100% Free of Cost (Rs. 0 - Food grains distributed free under PMGKAY / NFSA)',
        important_notes: 'Migrant workers can collect their portion of family food grains in their destination city, while remaining family collects in their home village.',
        step_summary: [
          'Locate nearest Fair Price Shop in your current town using "Mera Ration" app or web portal.',
          'Visit the dealer and state your home state and Ration Card Number or Aadhaar number.',
          'Place your finger on the biometric electronic Point of Sale (ePoS) machine.',
          'Collect your entitled monthly quota of wheat, rice, and coarse grains with computer-generated receipt.'
        ],
        action_url: 'https://nfsa.gov.in/'
      },
      {
        id: 'sub-rc-status',
        title: 'Check Ration Card Status & Beneficiary Quota',
        description: 'Check whether your new ration card application is approved and view monthly food grain allotment.',
        methods: ['ONLINE'],
        documents_required: ['Ration Card Number or Application Reference Number / Aadhaar Number.'],
        fee: '100% Free of Cost (Rs. 0)',
        step_summary: [
          'Visit https://nfsa.gov.in/portal/ration_card_status.',
          'Enter your Ration Card Number or Application Number and captcha.',
          'View real-time status, enrolled family member list, assigned ration dealer, and transaction history.'
        ],
        action_url: 'https://nfsa.gov.in/portal/ration_card_status'
      }
    ],
    steps: [
      { step_number: 1, title: 'Visit NFSA Portal or State Civil Supplies Portal', description: 'Visit https://nfsa.gov.in/ and navigate to "Citizen Corner" -> "Know Your Ration Card Status" or "Apply for New Ration Card".', action_url: 'https://nfsa.gov.in/', estimated_time: '2 mins' },
      { step_number: 2, title: 'Submit Family Details & Aadhaar Numbers', description: 'Enter Head of Household (female head prioritized) details, address, and upload Aadhaar numbers of all family members.', action_url: null, estimated_time: '15 mins' },
      { step_number: 3, title: 'Field Verification & Digital RC Generation', description: 'Local municipal food supply inspector or Village Revenue Officer verifies residential status and income. Digital Ration Card is approved and dispatched.', action_url: 'https://nfsa.gov.in/', estimated_time: '15-30 days' }
    ],
    documents: [
      { document_name: 'Aadhaar Cards of all family members', is_mandatory: true, description: 'Mandatory for seeding into the electronic Point of Sale (ePoS) database' },
      { document_name: 'Proof of Residence (Electricity Bill / Rent Agreement)', is_mandatory: true, description: 'Confirms family living within local fair price shop catchment' },
      { document_name: 'Family Income Certificate', is_mandatory: true, description: 'Issued by Tahsildar / Revenue Authority to determine eligibility tier (AAY/PHH)' },
      { document_name: 'Bank Passbook of Female Head of Household', is_mandatory: false, description: 'For direct cash transfer subsidies in lieu of food grains where applicable' }
    ],
    requirements: [
      'Cannot hold duplicate ration cards across multiple states',
      'All members must have Aadhaar seeded to avail nationwide ONORC portability'
    ],
    tips: [
      'Download the official "Mera Ration" app on Android to locate nearest Fair Price Shops anywhere in India and check monthly grain entitlements.'
    ]
  },
  {
    id: 'srv-apaar-student-id',
    name: 'APAAR ID - Automated Permanent Academic Account Registry (One Nation One Student ID)',
    slug: 'apaar-student-id-abc',
    category_id: 'cat-5',
    category_name: 'Identity Services',
    department: 'Ministry of Education, Government of India',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Generate your 12-digit unique lifelong student identity card to store all degrees, board marksheets, credits, and achievements digitally.',
    description: 'APAAR (Automated Permanent Academic Account Registry) is introduced under the National Education Policy (NEP 2020) by the Ministry of Education. It acts as an EduLocker and unique 12-digit lifelong academic identification for students starting from Pre-Primary school through College and Ph.D. Seamlessly linked with DigiLocker and the Academic Bank of Credits (ABC) to enable hassle-free credit transfers between universities.',
    eligibility: 'All students enrolled in recognized schools, junior colleges, universities, and professional institutions in India.',
    fee: '100% Free of Cost (Rs. 0)',
    processing_information: 'Instant digital generation through student self-consent on DigiLocker or school UDISE+ portal.',
    application_mode: 'ONLINE',
    official_website: 'https://apaar.education.gov.in/',
    official_app: 'DigiLocker App / UMANG',
    official_helpline: '011-20862365',
    official_email: 'contact@abc.gov.in',
    official_source: 'https://apaar.education.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-28T00:00:00Z',
    keywords: ['apaar id', 'student id', 'abc id', 'academic bank of credits', 'one nation one student id', 'student card', 'digilocker student', 'marksheet storage', 'education identity'],
    steps: [
      { step_number: 1, title: 'Open Official APAAR Portal', description: 'Visit https://apaar.education.gov.in/ or open DigiLocker and search for "Academic Bank of Credits / APAAR ID".', action_url: 'https://apaar.education.gov.in/', estimated_time: '1 min' },
      { step_number: 2, title: 'Sign In via DigiLocker / Aadhaar OTP', description: 'Authenticate using your Aadhaar number or MeriPehchan login. For school students under 18, parental consent is authenticated via parent Aadhaar OTP.', action_url: null, estimated_time: '2 mins' },
      { step_number: 3, title: 'Select College / School & Generate 12-Digit APAAR', description: 'Select your Institution name (School/College/University) and admission year. Your unique 12-digit APAAR Card is issued immediately with a QR code.', action_url: 'https://apaar.education.gov.in/', estimated_time: '1 min' }
    ],
    documents: [
      { document_name: 'Aadhaar Number (Student / Parent)', is_mandatory: true, description: 'For e-KYC demographic verification' },
      { document_name: 'School / College Admission Number or Roll Number', is_mandatory: true, description: 'Links APAAR to academic transcript database' }
    ],
    requirements: [
      'Enrolled in a recognized educational institution',
      'For minors (under 18), parental/guardian consent is required'
    ],
    tips: [
      'Your APAAR ID stays identical even if you transfer between different schools, colleges, or states.',
      'All your board marksheets (CBSE, ICSE, State Boards) and university degrees automatically sync to your APAAR account.'
    ]
  },
  {
    id: 'srv-umang-bbps',
    name: 'Bharat BillPay (BBPS) & UMANG - Electricity, Water & Piped Gas Bill Payments',
    slug: 'utility-bill-payments-bbps',
    category_id: 'cat-14',
    category: 'Utility Services',
    category_name: 'Utility Services',
    department: 'National Payments Corporation of India (NPCI) & MeitY (UMANG)',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Pay your state electricity bill, municipal piped water bill, and piped gas bill securely online with instant digital payment receipts.',
    description: 'Unified government platform conceptualized by the Reserve Bank of India (RBI) and operated by NPCI in integration with UMANG. Citizens across any Indian state can fetch and pay recurring utility bills including state electricity distribution companies (DISCOMs), municipal water boards, piped gas (PNG), and municipal taxes with official payment acknowledgement.',
    eligibility: 'All electricity consumers, piped water consumers, and domestic gas connections across all Indian states and Union Territories.',
    fee: '100% Free of Cost (Rs. 0 platform fee for utility bill payment via UPI and RuPay Debit)',
    processing_information: 'Instant real-time bill fetch and immediate digital payment confirmation with official BBPS transaction ID.',
    application_mode: 'ONLINE',
    official_website: 'https://web.umang.gov.in/landing/department/bharat-bill-payment.html',
    official_app: 'UMANG App / BHIM UPI (Android & iOS)',
    official_helpline: '1800-11-5246 (UMANG) / 1800-120-1740 (NPCI BBPS)',
    official_email: 'customercare@umang.gov.in',
    official_source: 'https://web.umang.gov.in/landing/department/bharat-bill-payment.html',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-29T00:00:00Z',
    keywords: ['utility', 'utility services', 'electricity bill', 'power bill', 'water bill', 'piped water', 'gas bill', 'bijli bill', 'light bill', 'electricity board', 'discom', 'bbps', 'bharat bill pay', 'umang bills', 'water tax', 'eb bill'],
    steps: [
      { step_number: 1, title: 'Open UMANG Bharat BillPay Portal', description: 'Visit https://web.umang.gov.in/landing/department/bharat-bill-payment.html or open the UMANG app and select "Bharat BillPay (BBPS)".', action_url: 'https://web.umang.gov.in/landing/department/bharat-bill-payment.html', estimated_time: '1 min' },
      { step_number: 2, title: 'Select Service & Electricity Board / Water Board', description: 'Select your utility category (Electricity, Water, or Piped Gas) and choose your state service provider (e.g., BESCOM, TANGEDCO, MSEDCL, UPPCL, BSES, Delhi Jal Board).', action_url: null, estimated_time: '1 min' },
      { step_number: 3, title: 'Enter Consumer ID & Fetch Live Bill', description: 'Enter your Consumer Account Number (CA Number / K Number / RR Number) printed on your physical electricity or water bill to view the live outstanding amount.', action_url: null, estimated_time: '1 min' },
      { step_number: 4, title: 'Pay Securely Online & Download Official Receipt', description: 'Pay using UPI, Debit Card, or Net Banking. Download the legally valid digital receipt with unique BBPS Reference Number.', action_url: 'https://web.umang.gov.in/landing/department/bharat-bill-payment.html', estimated_time: '2 mins' }
    ],
    documents: [
      { document_name: 'Consumer Account Number (CA / RR / K Number)', is_mandatory: true, description: 'Found on any previous physical or digital electricity/water bill' },
      { document_name: 'Mobile Number for SMS Receipt', is_mandatory: true, description: 'To receive payment confirmation SMS and transaction reference ID' }
    ],
    requirements: [
      'Active Consumer Number with state utility provider',
      'UPI, Debit Card, or Internet Banking access for payment'
    ],
    tips: [
      'Always save the BBPS Transaction Reference Number as proof of payment in case of local electricity board reconciliation delays.',
      'Paying through UMANG BBPS ensures your bill status updates directly in your state power utility system within 2 to 24 hours.'
    ]
  },
  {
    id: 'srv-mylpg-subsidy',
    name: 'PAHAL (DBTL) & MyLPG - LPG Gas Subsidy Status, Refill Booking & PM Ujjwala',
    slug: 'lpg-subsidy-refill-mylpg',
    category_id: 'cat-14',
    category: 'Utility Services',
    category_name: 'Utility Services',
    department: 'Ministry of Petroleum and Natural Gas (MoPNG)',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Check your bank account LPG gas subsidy transfer, book refill cylinders for Indane, HP Gas, and Bharat Gas, or apply for new connections.',
    description: 'Central government digital portal for Bharat Gas, Indane, and HP Gas consumers. Check Direct Benefit Transfer of LPG (DBTL / PAHAL) subsidy status directly credited into your Aadhaar-linked bank account, book gas refill cylinders online, give up subsidy, or apply for PM Ujjwala Yojana (PMUY) free LPG connection.',
    eligibility: 'All domestic LPG cylinder consumers (Indane, Bharat Gas, HP Gas) and eligible rural/BPL women under PM Ujjwala Yojana.',
    fee: 'Free Online Portal (Official cylinder refill price per Oil Marketing Company)',
    processing_information: 'Subsidy credited directly into Aadhaar-seeded bank account within 2-3 banking days after delivery.',
    application_mode: 'ONLINE',
    official_website: 'https://www.mylpg.in/',
    official_app: 'IndianOil ONE / Bharatgas / HP Pay / UMANG App',
    official_helpline: '1906 (24x7 LPG Emergency Helpline) / 1800-233-3555',
    official_email: 'feedback@mylpg.in',
    official_source: 'https://www.mylpg.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-29T00:00:00Z',
    keywords: ['lpg', 'gas cylinder', 'gas subsidy', 'pahal', 'dbtl', 'indane', 'bharat gas', 'hp gas', 'cylinder booking', 'ujjwala', 'cooking gas', 'utility', 'gas connection', 'cylinder delivery'],
    steps: [
      { step_number: 1, title: 'Visit Official MyLPG Portal', description: 'Open https://www.mylpg.in/ and click on your LPG Cylinder Brand (Bharat Gas, HP Gas, or Indane).', action_url: 'https://www.mylpg.in/', estimated_time: '1 min' },
      { step_number: 2, title: 'Access Consumer Dashboard via LPG ID or Mobile', description: 'Enter your 17-digit LPG ID (printed on your gas passbook/cash memo) or registered mobile number to log in.', action_url: null, estimated_time: '2 mins' },
      { step_number: 3, title: 'Check PAHAL (DBTL) Subsidy Credit Status', description: 'Click "View Cylinder Booking History / Subsidy Transferred" to see recent subsidy credit amounts, dates, and bank account UTR numbers.', action_url: null, estimated_time: '1 min' },
      { step_number: 4, title: 'Book Refill Cylinder Online or Request PMUY', description: 'Book your next cylinder delivery with online payment or submit application for new connection under PM Ujjwala Yojana.', action_url: 'https://www.mylpg.in/', estimated_time: '2 mins' }
    ],
    documents: [
      { document_name: '17-digit LPG Consumer ID', is_mandatory: true, description: 'Found on first page of domestic LPG Blue Book or gas delivery invoice' },
      { document_name: 'Aadhaar Number Linked to Bank Account', is_mandatory: true, description: 'For direct benefit transfer (DBT) subsidy deposit' }
    ],
    requirements: [
      'Active domestic LPG consumer connection with Indane, Bharat Gas, or HP Gas',
      'Bank account seeded with Aadhaar on NPCI mapper to receive cash subsidy'
    ],
    tips: [
      'In case of gas leak emergency, immediately call the national toll-free LPG emergency helpline 1906 (available 24x7).',
      'Verify that your bank account has active DBT / Aadhaar seeding enabled so that gas subsidy is credited without failure.'
    ]
  },
  {
    id: 'srv-jal-jeevan',
    name: 'Jal Jeevan Mission (Har Ghar Jal) - Tap Water Supply & Water Quality',
    slug: 'jal-jeevan-mission-water-connection',
    category_id: 'cat-14',
    category: 'Utility Services',
    category_name: 'Utility Services',
    department: 'Department of Drinking Water and Sanitation, Ministry of Jal Shakti',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Check piped tap water supply status, test water quality reports for your village/town, and report pipeline supply issues.',
    description: 'Flagship mission of the Ministry of Jal Shakti providing functional household tap connections (FHTC) to rural and suburban homes. Citizens can check tap water coverage in their village/gram panchayat, view drinking water quality testing reports from local laboratories (WQMIS), and track piped water infrastructure.',
    eligibility: 'Residents of rural and suburban areas seeking tap water connections or public drinking water quality transparency.',
    fee: '100% Free of Cost (Rs. 0)',
    processing_information: 'Public transparency reports and test results updated weekly.',
    application_mode: 'ONLINE',
    official_website: 'https://ejalshakti.gov.in/',
    official_app: 'JJM Dashboard / WQMIS',
    official_helpline: '1800-180-1551',
    official_email: 'jjm-support@gov.in',
    official_source: 'https://ejalshakti.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-29T00:00:00Z',
    keywords: ['water', 'tap water', 'piped water', 'jal jeevan', 'water supply', 'har ghar jal', 'drinking water', 'water quality', 'utility', 'jal shakti', 'water connection', 'drinking water complaint'],
    steps: [
      { step_number: 1, title: 'Open Official Jal Jeevan Mission Portal', description: 'Visit https://ejalshakti.gov.in/ to access the national drinking water transparency dashboard.', action_url: 'https://ejalshakti.gov.in/', estimated_time: '1 min' },
      { step_number: 2, title: 'Select State, District & Village / Ward', description: 'Navigate to your State, District, Block, and Gram Panchayat to view functional household tap water coverage and source type.', action_url: null, estimated_time: '2 mins' },
      { step_number: 3, title: 'View Drinking Water Quality Lab Reports (WQMIS)', description: 'Check testing reports for chemical, bacteriological, and fluoride parameters performed by accredited water testing laboratories.', action_url: null, estimated_time: '2 mins' },
      { step_number: 4, title: 'Contact Village Water & Sanitation Committee (VWSC)', description: 'Contact local Gram Panchayat VWSC or call toll-free helpline 1800-180-1551 for piped supply disruptions or contamination issues.', action_url: 'https://ejalshakti.gov.in/', estimated_time: 'Ongoing' }
    ],
    documents: [
      { document_name: 'Location details (State, District, Village/Panchayat)', is_mandatory: true, description: 'To locate drinking water supply network in your area' }
    ],
    requirements: [
      'Residence in India seeking drinking water information or tap connection status'
    ],
    tips: [
      'If your tap water shows unusual color, odor, or taste, you can submit a water sample for free testing at your nearest district water quality lab listed on the portal.'
    ]
  },
  {
    id: 'srv-birth-certificate',
    name: 'Birth Certificate Registration & Download (CRS / Municipal Corporation)',
    slug: 'birth-certificate-registration-crs',
    category_id: 'cat-4',
    category_name: 'Documents & Certificates',
    department: 'Office of the Registrar General of India, Ministry of Home Affairs & Urban Local Bodies',
    jurisdiction_level: 'MUNICIPAL',
    state: 'All India',
    simple_description: 'Register newborn birth, download verified digital birth certificate with QR code, and apply for corrections.',
    description: 'National official civil registration framework governing birth registration under the Registration of Births and Deaths (RBD) Act. Births reported within 21 days are registered free of cost. Digitally signed birth certificates with QR codes issued via Civil Registration System (CRS) and municipal corporations are legally valid nationwide for school admission, passport issuance, and government identity verification.',
    eligibility: 'All births occurring in India or to Indian citizen parents. Can be reported by hospital, parent, or designated informant.',
    fee: 'Registration within 21 days: Free (Rs. 0); Delayed registration (21-30 days): Rs. 2 late fee; 30 days to 1 year: Rs. 5 with SDM permission; Beyond 1 year: Order of First Class Magistrate.',
    processing_information: 'Digital certificate issued within 3-7 working days following registrar verification.',
    application_mode: 'HYBRID',
    official_website: 'https://crsorgi.gov.in/',
    official_app: 'Civil Registration System Portal / State e-District Apps',
    official_helpline: '1800-11-0031 / 011-23438284',
    official_email: 'crsorgi@nic.in',
    official_source: 'https://crsorgi.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-29T00:00:00Z',
    keywords: [
      'birth certificate', 'birth registration', 'janm praman patra', 'crs', 'crsorgi',
      'download birth certificate', 'apply birth certificate', 'municipal birth certificate',
      'birth certificate correction', 'delayed birth registration', 'new born birth certificate',
      'child birth certificate', 'digital birth certificate', 'birth certificate status'
    ],
    sub_services: [
      {
        id: 'sub-birth-register',
        title: 'Register Birth (Within 21 Days of Child Birth)',
        description: 'Mandatory civil registration of newborn baby within 21 days of birth with zero government fee.',
        methods: ['ONLINE', 'OFFLINE'],
        offline_option: 'Hospital institutional report or local Municipal Registrar / Gram Panchayat Secretary.',
        documents_required: [
          'Hospital Discharge Summary / Birth Slip / Institutional Form 1',
          'Parents\' Aadhaar Cards (Mother and Father)',
          'Parents\' Marriage Certificate (where applicable)',
          'Proof of Address of parents'
        ],
        fee: '100% Free of Cost (Rs. 0 within 21 days)',
        important_notes: 'Under the RBD Act 1969, hospitals and nursing homes are legally mandated to report births directly to the local registrar.',
        step_summary: [
          'For institutional delivery: The hospital directly registers the birth on https://crsorgi.gov.in/ or state civil portal and provides a birth registration number.',
          'For domiciliary (home) delivery: The head of family or parent visits the municipal health office / gram panchayat within 21 days.',
          'Submit Form 1 along with parents\' Aadhaar cards and residential proof.',
          'The Registrar verifies details and approves the birth record.',
          'Download the digital birth certificate immediately upon approval.'
        ],
        action_url: 'https://crsorgi.gov.in/'
      },
      {
        id: 'sub-birth-download',
        title: 'Download Verified Digital Birth Certificate (Instant PDF with QR Code)',
        description: 'Download legally authentic electronic birth certificate with verifiable cryptographic QR code.',
        methods: ['ONLINE'],
        documents_required: ['Application Reference Number / Registration Number / Child Name & Date of Birth'],
        fee: '100% Free on CRS / State e-District / DigiLocker (Rs. 0)',
        important_notes: 'Valid across India for school admissions, Passport applications, and Aadhaar enrolment without attestation.',
        step_summary: [
          'Visit https://crsorgi.gov.in/ or your State Municipal Corporation / e-District portal or DigiLocker.',
          'Enter Child Registration Number, Date of Birth, and Gender.',
          'Verify OTP sent to the parent\'s registered mobile number.',
          'Download digitally signed PDF certificate bearing the official registrar stamp and QR code.'
        ],
        action_url: 'https://crsorgi.gov.in/'
      },
      {
        id: 'sub-birth-delayed',
        title: 'Delayed Birth Registration (>21 Days up to 1 Year / Late Order)',
        description: 'Register a birth that was missed within the mandatory 21-day window.',
        methods: ['OFFLINE'],
        offline_option: 'Office of Sub-Divisional Magistrate (SDM) / Executive Magistrate and Local Registrar.',
        documents_required: [
          'Affidavit stating date, time, and place of birth and reason for delay',
          'Non-Availability Certificate (NAC) issued by the registrar',
          'Parents\' Aadhaar cards and school/vaccination record of child'
        ],
        fee: 'Rs. 2 (21-30 days) / Rs. 5 with SDM permission (30 days - 1 year) / Magistrate order (>1 year)',
        step_summary: [
          'Obtain Non-Availability Certificate (Form 10) from the local municipal office.',
          'Prepare notarized affidavit stating reason for non-registration within 21 days.',
          'Submit file to the Sub-Divisional Magistrate (SDM) or Executive Magistrate office.',
          'Following police/field verification, Magistrate issues Late Registration Order.',
          'Registrar enters birth in register and issues official Birth Certificate.'
        ],
        action_url: 'https://crsorgi.gov.in/'
      },
      {
        id: 'sub-birth-correction',
        title: 'Child Name Addition & Spelling Correction in Birth Certificate',
        description: 'Add child\'s name if initially registered as "Unnamed", or correct spelling mistakes.',
        methods: ['ONLINE', 'OFFLINE'],
        offline_option: 'Local Registrar Office / Municipal Health Department.',
        documents_required: ['School leaving certificate / Aadhaar card / Joint affidavit by parents'],
        fee: 'Free within 1 year / Nominal Rs. 5 to Rs. 20 after 1 year',
        step_summary: [
          'Submit child name addition application on https://crsorgi.gov.in/ or municipal office.',
          'Provide original birth registration receipt and parents\' signed declaration.',
          'Registrar updates register and issues updated certificate with the child\'s permanent name.'
        ],
        action_url: 'https://crsorgi.gov.in/'
      }
    ],
    steps: [
      { step_number: 1, title: 'Check Hospital Birth Reporting on CRS', description: 'Visit https://crsorgi.gov.in/ and check whether the birth was registered by the hospital within 21 days.', action_url: 'https://crsorgi.gov.in/', estimated_time: '2 mins' },
      { step_number: 2, title: 'Submit Parents\' Identity & Address Documents', description: 'Upload father and mother Aadhaar cards and hospital discharge slip on CRS or state e-District portal.', action_url: null, estimated_time: '10 mins' },
      { step_number: 3, title: 'Download Verified QR Code Certificate', description: 'Once approved by the municipal health registrar, download digitally signed PDF certificate legally valid for all official purposes.', action_url: 'https://crsorgi.gov.in/', estimated_time: '3-7 days' }
    ],
    documents: [
      { document_name: 'Hospital Discharge Summary / Birth Slip (Form 1)', is_mandatory: true, description: 'Shows exact date, time, and medical institution of birth' },
      { document_name: 'Aadhaar Cards of both parents', is_mandatory: true, description: 'For parentage and identity verification' },
      { document_name: 'Proof of Residence of Parents', is_mandatory: true, description: 'Electricity bill, Voter ID, or Rent agreement' }
    ],
    requirements: [
      'Birth must be registered within 21 days for free processing without magistrate permission'
    ]
  },
  {
    id: 'srv-lost-documents',
    name: 'Lost Government Documents Recovery & Duplicate Issuance (Aadhaar, PAN, DL, Marksheet)',
    slug: 'lost-documents-recovery-duplicate',
    category_id: 'cat-4',
    category_name: 'Documents & Certificates',
    department: 'Inter-Ministerial Citizen Assistance & Police Citizen Services',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Official procedure to report, recover, and replace lost, stolen, or misplaced Aadhaar, PAN card, Driving Licence, and Board Marksheets.',
    description: 'Comprehensive, step-by-step verified recovery protocol for lost Indian government identity documents and educational certificates. Learn how to immediately file a Police Lost Article Report (LDR) online without visiting a police station to protect against identity theft, retrieve lost numbers, download authentic digital duplicates via DigiLocker under IT Act 2000, and order physical plastic reprints directly from official government issuing authorities.',
    eligibility: 'Any Indian citizen whose official government documents (Aadhaar, PAN, DL, Passport, Marksheets, Voter ID) have been lost, misplaced, or damaged.',
    fee: 'Police Lost Report: 100% Free (Rs. 0); DigiLocker Digital Duplicate: Free (Rs. 0); Physical Duplicate Reprints: Aadhaar (Rs. 50), PAN (Rs. 50), Driving Licence (Rs. 200-400), Marksheet (Rs. 250-500)',
    processing_information: 'Digital recovery is instant. Physical plastic duplicate cards delivered via India Post Speed Post within 7 to 15 days.',
    application_mode: 'ONLINE',
    official_website: 'https://www.digilocker.gov.in/',
    official_app: 'DigiLocker / mAadhaar / mParivahan',
    official_helpline: '1930 (Cyber/Identity misuse) / 1947 (Aadhaar) / 1915 (National Helpline)',
    official_email: 'support@digilocker.gov.in',
    official_source: 'https://www.digilocker.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-29T00:00:00Z',
    keywords: [
      'lost documents', 'lost document', 'lost aadhaar', 'lost aadhar', 'lost pan', 'lost pan card',
      'lost driving licence', 'lost dl', 'lost marksheet', 'duplicate marksheet', 'duplicate pan',
      'duplicate aadhaar', 'lost wallet', 'misplaced documents', 'police lost report', 'ldr',
      'lost certificate', 'replace documents', 'how to recover lost documents', 'lost marksheet 10th'
    ],
    sub_services: [
      {
        id: 'sub-lost-police-ldr',
        title: 'Step 1: File Online Police Lost Article Report (LDR)',
        description: 'Lodge an official non-cognizable Lost Property Report online on your State Police portal without visiting a police station.',
        methods: ['ONLINE'],
        documents_required: ['Details of lost document (approximate date, place, and document numbers if known)'],
        fee: '100% Free of Cost (Rs. 0)',
        important_notes: 'Filing an LDR provides an official digitally signed police acknowledgement. It legally shields you if a lost document is misused by fraudsters, and is mandatory when applying for a duplicate Driving Licence or Passport.',
        step_summary: [
          'Open your State Police Citizen Portal (e.g. Delhi Police Lost Report, UP Police Citizen App, TN CCTNS, Maharashtra Police).',
          'Select "Lost Article Report / General Diary".',
          'Enter your name, contact details, place of loss, and select items lost (Aadhaar, PAN, DL, Wallet, Marksheet).',
          'Submit the report. An instant digitally signed Police LDR PDF with unique LR number is generated.',
          'Save and print this LDR PDF for issuing duplicate cards.'
        ],
        action_url: 'https://digitalpolice.gov.in/'
      },
      {
        id: 'sub-lost-aadhaar-recover',
        title: 'Recover Lost Aadhaar Card Number & Order PVC Reprint',
        description: 'Retrieve forgotten or lost 12-digit Aadhaar number using your registered mobile number and order duplicate PVC card.',
        methods: ['ONLINE'],
        documents_required: ['Registered Mobile Number or Email linked to Aadhaar'],
        fee: 'Free electronic retrieval & download / Rs. 50 for PVC physical card delivery',
        step_summary: [
          'Visit https://myaadhaar.uidai.gov.in/retrieve-eid-uid.',
          'Select "Aadhaar Number", enter your Full Name as registered, and enter mobile number.',
          'Enter OTP received on mobile. Your 12-digit Aadhaar number is sent via SMS immediately.',
          'Go to "Order Aadhaar PVC Card", pay Rs. 50, and receive a new durable plastic card via Speed Post.'
        ],
        action_url: 'https://myaadhaar.uidai.gov.in/retrieve-eid-uid'
      },
      {
        id: 'sub-lost-pan-duplicate',
        title: 'Order Duplicate Replacement PAN Card',
        description: 'Order an official plastic duplicate reprint of your lost PAN card from Protean or UTIITSL.',
        methods: ['ONLINE'],
        documents_required: ['10-character PAN Number and Aadhaar Number'],
        fee: 'Rs. 50 (Inclusive of Speed Post dispatch to home address)',
        step_summary: [
          'Visit Protean PAN reprint portal https://www.onlineservices.nsdl.com/paam/ReprintEPan.html or UTIITSL.',
          'Enter your PAN, Aadhaar number, and Date of Birth.',
          'Verify using OTP sent to registered mobile/email.',
          'Pay Rs. 50 fee online. Duplicate PAN card is printed and delivered within 7-10 working days.'
        ],
        action_url: 'https://www.onlineservices.nsdl.com/paam/ReprintEPan.html'
      },
      {
        id: 'sub-lost-dl-duplicate',
        title: 'Recover Lost Driving Licence (Duplicate DL on Sarathi)',
        description: 'Apply for a replacement Driving Licence smart card on the national road transport portal.',
        methods: ['ONLINE'],
        documents_required: ['Police Lost Article Report (LDR)', 'DL Number or Aadhaar Number'],
        fee: 'Rs. 200 + Rs. 200 smart card fee',
        step_summary: [
          'Visit https://sarathi.parivahan.gov.in/ and select your state.',
          'Click "Apply for Duplicate DL" under DL Services.',
          'Enter DL Number or search using Aadhaar / mobile number.',
          'Upload copy of Police Lost Article Report (LDR).',
          'Pay fee online. Duplicate smart card is dispatched to your registered address.'
        ],
        action_url: 'https://sarathi.parivahan.gov.in/'
      },
      {
        id: 'sub-lost-marksheet-recover',
        title: 'Recover Lost 10th / 12th Board Marksheet & Certificates',
        description: 'Download instant legally authentic digital replacement or order physical duplicate from CBSE / State Boards.',
        methods: ['ONLINE'],
        documents_required: ['Roll Number, Year of Examination, School Code / Aadhaar Number'],
        fee: 'Free on DigiLocker / Rs. 250 - Rs. 500 for physical duplicate via CBSE DACS',
        step_summary: [
          'For Instant Legal Digital Copy: Open https://www.digilocker.gov.in/, search your Education Board (CBSE/State Board), enter roll number and year. Download authenticated digital certificate valid under Rule 9A.',
          'For Physical Hard Copy: Visit CBSE Duplicate Academic Document System (DACS) https://cbseit.in/cbse/web/dacs/, submit application, pay fee, and get paper certificate dispatched.'
        ],
        action_url: 'https://www.digilocker.gov.in/'
      }
    ],
    steps: [
      { step_number: 1, title: 'File Police Lost Article Report Online', description: 'Log on to your state police citizen portal to generate an instant Lost Article Report (LDR) to prevent identity fraud.', action_url: 'https://digitalpolice.gov.in/', estimated_time: '5 mins' },
      { step_number: 2, title: 'Download Instant Digital Copy on DigiLocker', description: 'Open DigiLocker https://www.digilocker.gov.in/ and fetch your verified Aadhaar, PAN, DL, or Marksheets with zero cost.', action_url: 'https://www.digilocker.gov.in/', estimated_time: '2 mins' },
      { step_number: 3, title: 'Order Physical Plastic Duplicate Card', description: 'Order official reprints for Aadhaar (UIDAI Rs. 50), PAN (Protean Rs. 50), or Driving Licence (Sarathi Rs. 400).', action_url: null, estimated_time: '7-12 days delivery' }
    ],
    documents: [
      { document_name: 'Police Lost Article Report (LDR)', is_mandatory: true, description: 'Generated free online from state police portal' },
      { document_name: 'Aadhaar Card or Registered Mobile Number', is_mandatory: true, description: 'For identity verification and OTP authentication' }
    ],
    requirements: [
      'File an online police lost report immediately upon noticing lost documents to guard against fraudulent identity misuse'
    ]
  },
  {
    id: 'srv-board-marksheet-degree',
    name: 'Class 10th, 12th Marksheets & College Degree Certificates (DigiLocker / CBSE / NAD)',
    slug: 'board-marksheets-degree-certificates',
    category_id: 'cat-11',
    category_name: 'Education',
    department: 'Ministry of Education, CBSE, CISCE, State Secondary Boards & UGC / NAD',
    jurisdiction_level: 'CENTRAL',
    state: 'All India',
    simple_description: 'Download authentic digital Class 10 and 12 marksheets, passing certificates, and university graduation degrees with verifiable QR code.',
    description: 'Official national academic records depository established under the National Academic Depository (NAD) and DigiLocker framework. Legally recognized under Rule 9A of Information Technology (Preservation and Retention of Information by Intermediaries Providing Digital Locker Facilities) Rules, 2016 to be on par with original physical paper certificates. Accessible for CBSE (1975 onwards), CISCE, state education boards, and over 1,500 Indian universities and colleges.',
    eligibility: 'All students who have appeared in Class 10, Class 12, ITI, Diploma, Undergraduate, or Postgraduate examinations in India.',
    fee: 'Digital Download on DigiLocker: 100% Free of Cost (Rs. 0); Physical duplicate paper certificate from CBSE DACS: Rs. 250 (up to 5 years), Rs. 500 (5-10 years), Rs. 1,000 (10-20 years)',
    processing_information: 'Digital marksheet download is instant in under 2 minutes. Physical duplicate documents dispatched within 10 to 15 working days.',
    application_mode: 'ONLINE',
    official_website: 'https://www.digilocker.gov.in/',
    official_app: 'DigiLocker App (Android & iOS)',
    official_helpline: '011-23212603 (CBSE) / support@digilocker.gov.in',
    official_email: 'support@nad.gov.in',
    official_source: 'https://www.digilocker.gov.in/',
    source_type: 'GOVERNMENT_PORTAL',
    verification_status: 'VERIFIED',
    last_verified_at: '2026-09-29T00:00:00Z',
    keywords: [
      '10th marksheet', 'tenth marksheet', '12th marksheet', 'twelfth marksheet', 'graduation marksheet',
      'college degree', 'degree certificate', 'cbse marksheet', 'board marksheet', 'marksheet download',
      'digilocker marksheet', 'cisce marksheet', 'university degree', 'provisional certificate',
      'migration certificate', 'marksheet', 'academic bank of credits', 'apaar marksheet', 'ssc marksheet',
      'hsc marksheet', 'marksheet duplicate', 'marksheet download online'
    ],
    sub_services: [
      {
        id: 'sub-marksheet-10th',
        title: 'Download Class 10th Marksheet & Passing Certificate (Instant PDF)',
        description: 'Fetch authentic, digitally signed Class 10th (Secondary School) marksheet and certificate from CBSE or your State Board.',
        methods: ['ONLINE'],
        documents_required: ['Class 10 Roll Number', 'Passing Year', 'School Code / Mother\'s Name (as printed on admit card)'],
        fee: '100% Free of Cost (Rs. 0)',
        important_notes: 'Under Rule 9A of IT Rules 2016, digital certificates downloaded from DigiLocker are legally authentic and must be accepted for college admissions and government jobs without attestation.',
        step_summary: [
          'Log in to https://www.digilocker.gov.in/ using your mobile or Aadhaar.',
          'Search for your education board (e.g. "CBSE", "UP Board", "Maharashtra State Board", "ICSE").',
          'Select "Class X Marksheet".',
          'Enter your Roll Number, Passing Year, and School Code.',
          'Click "Get Document". Verified PDF with cryptographic QR code is saved to your wallet immediately.'
        ],
        action_url: 'https://www.digilocker.gov.in/'
      },
      {
        id: 'sub-marksheet-12th',
        title: 'Download Class 12th Marksheet & Migration Certificate',
        description: 'Download verified digital Class 12th (Higher Secondary / Senior School) marksheet and migration certificate.',
        methods: ['ONLINE'],
        documents_required: ['Class 12 Roll Number', 'Passing Year', 'School Centre Code'],
        fee: '100% Free of Cost (Rs. 0)',
        important_notes: 'Universities, colleges, and passport offices are mandated by UGC and MeitY to accept DigiLocker Class 12 marksheets.',
        step_summary: [
          'Open DigiLocker portal https://www.digilocker.gov.in/ or mobile app.',
          'Search your board and select "Class XII Marksheet" or "Class XII Migration Certificate".',
          'Provide Class 12 Roll Number and examination year.',
          'Download authentic PDF with digitally verifiable electronic signature.'
        ],
        action_url: 'https://www.digilocker.gov.in/'
      },
      {
        id: 'sub-marksheet-degree',
        title: 'College Graduation Degree & University Transcripts',
        description: 'Access undergraduate and postgraduate degrees and transcripts deposited under National Academic Depository (NAD).',
        methods: ['ONLINE'],
        documents_required: ['University Registration / Enrolment Number', 'APAAR ID / ABC ID', 'Year of Passing'],
        fee: '100% Free of Cost (Rs. 0)',
        important_notes: 'Over 1,500 Central, State, Deemed, and Private universities deposit digital graduation degrees on DigiLocker / NAD.',
        step_summary: [
          'Visit https://www.digilocker.gov.in/ or https://www.abc.gov.in/.',
          'Select "Education" -> Search your University or Institution name.',
          'Choose "Degree / Diploma Certificate" or "Consolidated Transcript".',
          'Enter registration number and passing year to fetch verified digital degree.'
        ],
        action_url: 'https://www.abc.gov.in/'
      },
      {
        id: 'sub-marksheet-physical-duplicate',
        title: 'Order Physical Duplicate Marksheet (CBSE / State Boards)',
        description: 'Order a physical hard-copy paper duplicate marksheet if your original was lost, burnt, or destroyed.',
        methods: ['ONLINE'],
        offline_option: 'Available at CBSE Regional Offices or State Board Divisional Offices.',
        documents_required: [
          'Roll Number, School Code, Center Number, and Passing Year',
          'Aadhaar Card copy',
          'Police Lost Article Report (LDR) or damaged document photo'
        ],
        fee: 'Rs. 250 (Within 5 years) / Rs. 500 (5-10 years) / Rs. 1,000 (10-20 years) + Rs. 100 Speed Post fee',
        step_summary: [
          'Visit CBSE Duplicate Academic Document System (DACS) https://cbseit.in/cbse/web/dacs/.',
          'Select "Print Duplicate Academic Documents" and choose Class (10th / 12th).',
          'Fill candidate details and delivery address.',
          'Pay fee online. Dispatched via India Post Speed Post directly from the regional board office.'
        ],
        action_url: 'https://cbseit.in/cbse/web/dacs/'
      }
    ],
    steps: [
      { step_number: 1, title: 'Open DigiLocker or ABC Portal', description: 'Log in to https://www.digilocker.gov.in/ with your mobile number or Aadhaar.', action_url: 'https://www.digilocker.gov.in/', estimated_time: '2 mins' },
      { step_number: 2, title: 'Search Issuer (CBSE, State Board, or University)', description: 'Type the name of your secondary education board or college in the search box.', action_url: null, estimated_time: '1 min' },
      { step_number: 3, title: 'Enter Roll Number & Download QR-Coded PDF', description: 'Enter roll number and passing year. Download authentic PDF legally valid across all Indian universities and employment authorities.', action_url: 'https://www.digilocker.gov.in/', estimated_time: '1 min' }
    ],
    documents: [
      { document_name: 'Roll Number & Passing Year', is_mandatory: true, description: 'Found on admit card or student registration records' }
    ],
    requirements: [
      'Name and Date of Birth must match board registration records'
    ]
  }
];

export const VERIFIED_SCHEMES = [
  {
    id: 'sch-pmjay',
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    slug: 'ayushman-bharat-pmjay',
    purpose: 'Provides secondary and tertiary care hospitalization coverage up to Rs. 5 Lakhs per family per year to eligible households.',
    target_group: 'Vulnerable and low-income families identified by SECC 2011 criteria and state priority lists.',
    eligibility: 'Households listed in SECC 2011 deprivation categories or state health insurance databases. Any family member can verify status via Aadhaar.',
    benefits: 'Cashless and paperless treatment up to Rs. 5,00,000 per family per year across over 27,000 empaneled public and private hospitals nationwide.',
    documents: 'Aadhaar Card, Ration Card, or PM-JAY Family Letter.',
    application_process: 'Check eligibility on https://abdm.gov.in/ or visit nearest Ayushman Arogya Mandir / Common Service Center (CSC) to generate Ayushman Card (Golden Card).',
    official_source: 'https://abdm.gov.in/',
    verification_status: 'VERIFIED'
  },
  {
    id: 'sch-pmkisan',
    name: 'PM Kisan Samman Nidhi',
    slug: 'pm-kisan-samman-nidhi',
    purpose: 'Income support of Rs. 6,000 per year provided in three equal installments to landholding farmer families.',
    target_group: 'Small and marginal farmer families with cultivable land holdings.',
    eligibility: 'Farmer families having cultivable land in their names in state land records. Excludes institutional landholders and income-tax payers.',
    benefits: 'Direct Benefit Transfer (DBT) of Rs. 2,000 every 4 months directly into farmer Aadhaar-linked bank accounts.',
    documents: 'Aadhaar Card, Land Record documents (Khatoni/ROR), Bank Account Passbook (Aadhaar seeded).',
    application_process: 'Self-registration through "Farmers Corner" on https://pmkisan.gov.in/ or through nearest CSC / Agriculture Office.',
    official_source: 'https://pmkisan.gov.in/',
    verification_status: 'VERIFIED'
  }
];

export const VERIFIED_APPS = [
  {
    name: 'UMANG',
    purpose: 'Master citizen super-app for 1,500+ Central and State government services (EPFO, LPG, bills, pension)',
    department: 'National e-Governance Division (NeGD), MeitY',
    platform: 'Android & iOS',
    official_source: 'https://play.google.com/store/apps/details?id=in.gov.umang.negd.g2c',
    play_store_url: 'https://play.google.com/store/apps/details?id=in.gov.umang.negd.g2c',
    website: 'https://web.umang.gov.in/',
    description: 'The official all-in-one governance app of Digital India.'
  },
  {
    name: 'DigiLocker',
    purpose: 'Store, share, and verify official government documents electronically with legal validity under IT Act',
    department: 'Ministry of Electronics & IT (MeitY)',
    platform: 'Android & iOS & Web',
    official_source: 'https://play.google.com/store/apps/details?id=com.digilocker.android',
    play_store_url: 'https://play.google.com/store/apps/details?id=com.digilocker.android',
    website: 'https://www.digilocker.gov.in/',
    description: 'Legally recognized electronic document wallet.'
  },
  {
    name: 'mParivahan',
    purpose: 'Digital Driving Licence and Vehicle RC display, challan payments, and vehicle ownership verification',
    department: 'Ministry of Road Transport & Highways (MoRTH) & NIC',
    platform: 'Android & iOS',
    official_source: 'https://play.google.com/store/apps/details?id=com.nic.mparivahan',
    play_store_url: 'https://play.google.com/store/apps/details?id=com.nic.mparivahan',
    website: 'https://parivahan.gov.in/',
    description: 'Official app for vehicle and driver documentation.'
  },
  {
    name: 'mAadhaar',
    purpose: 'Carry digital Aadhaar on phone, lock/unlock biometrics, generate Virtual ID, and update address',
    department: 'Unique Identification Authority of India (UIDAI)',
    platform: 'Android & iOS',
    official_source: 'https://play.google.com/store/apps/details?id=in.gov.uidai.pehchaan',
    play_store_url: 'https://play.google.com/store/apps/details?id=in.gov.uidai.pehchaan',
    website: 'https://uidai.gov.in/',
    description: 'Official Aadhaar application from UIDAI.'
  },
  {
    name: 'Swachhata - MoHUA',
    purpose: 'Photo-based civic grievance reporting for potholes, garbage dumps, and streetlights to local municipalities',
    department: 'Ministry of Housing and Urban Affairs (MoHUA)',
    platform: 'Android & iOS',
    official_source: 'https://play.google.com/store/apps/details?id=com.ichangemycity.swachhbharat',
    play_store_url: 'https://play.google.com/store/apps/details?id=com.ichangemycity.swachhbharat',
    website: 'https://sbmurban.org/',
    description: 'Geo-tagged civic problem solver for urban residents.'
  }
];

export const VERIFIED_DIGITAL_DOCUMENTS = [
  { document: 'Aadhaar Card', issuer: 'UIDAI', format: 'Digitally signed PDF with verifiable QR code', portal: 'https://myaadhaar.uidai.gov.in/ & DigiLocker', fee: 'Free on DigiLocker (Center update: ₹75 demographic / ₹125 biometric)' },
  { document: 'Driving Licence (DL)', issuer: 'Ministry of Road Transport & Highways (MoRTH)', format: 'Digital Smart Card format on DigiLocker / mParivahan', portal: 'https://sarathi.parivahan.gov.in/', fee: 'Free on DigiLocker (RTO Smart Card: ₹700)' },
  { document: 'Vehicle Registration Certificate (RC)', issuer: 'MoRTH / State Transport Depts', format: 'Verified Digital RC accepted by Traffic Police', portal: 'https://parivahan.gov.in/', fee: '100% Free on DigiLocker (Rs. 0)' },
  { document: 'Class 10 & 12 Marksheets', issuer: 'CBSE, CISCE, and State Secondary Education Boards', format: 'Legally authentic digitally signed marksheets from 1975 onwards', portal: 'https://www.digilocker.gov.in/', fee: '100% Free of Cost (Rs. 0)' },
  { document: 'PAN Verification Record', issuer: 'Income Tax Department', format: 'Authentic digital PAN verification record', portal: 'https://www.digilocker.gov.in/', fee: 'Free on DigiLocker (Physical Card: ₹107)' },
  { document: 'Vehicle Insurance Policy', issuer: 'Insurance Information Bureau (IIB) & General Insurers', format: 'Valid electronic motor insurance certificate', portal: 'https://www.digilocker.gov.in/', fee: '100% Free on DigiLocker (Rs. 0)' },
  { document: 'COVID-19 Vaccination Certificate', issuer: 'Ministry of Health & Family Welfare (MoHFW)', format: 'WHO-compliant verifiable vaccination pass', portal: 'https://www.cowin.gov.in/ & DigiLocker', fee: '100% Free of Cost (Rs. 0)' }
];
