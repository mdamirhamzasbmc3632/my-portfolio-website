import {
  ProfileData,
  PersonalDetails,
  WorkExperienceItem,
  VideoProject,
  DesignProject,
  ExpertiseItem,
  AcademicItem,
  TrainingInstitution,
} from "./types";

export const profileData: ProfileData = {
  "name": "মোঃ আমির হামজা",
  "nameEn": "Md Amir Hamza",
  "bio": "ফলাফল-কেন্দ্রিক ডিজিটাল মার্কেটিং ও মেটা অ্যাডস বিশেষজ্ঞ। ডেটা-ড্রিভেন ক্যাম্পেইন, হাই-কনভার্সন ভিডিও এডিটিং ও ভিজ্যুয়াল ডিজাইনের মাধ্যমে ব্র্যান্ডের বিক্রয় ও পরিচিতি বৃদ্ধিতে নিবেদিত।",
  "bioEn": "Results-driven Digital Marketing & Meta Ads Specialist. Leveraging data-driven campaigns, high-retention video editing, and graphic design to scale brand growth, conversions, and ROI.",
  "careerObjective": "To obtain a position with opportunities to utilize my technical, branding and marketing experiences, skill, talent, creativity, sincerity for the better achievement of the organization.",
  "careerObjectiveBn": "ডিজিটাল মার্কেটিং, ব্র্যান্ডিং ও টেকনিক্যাল অভিজ্ঞতার সমন্বয়ে মেধা, সততা ও সৃজনশীলতা কাজে লাগিয়ে যেকোনো প্রতিষ্ঠানের সর্বোচ্চ লক্ষ্য ও প্রবৃদ্ধি অর্জনে নিবেদিত।",
  "email": "mdamirhamzasbmc3632@gmail.com",
  "whatsapp": "01716689667",
  "whatsappUrl": "https://wa.me/8801716689667",
  "location": "Kazibari, Satarkul, Uttar Badda, Dhaka",
  "locationBn": "কাজী বাড়ি, সাঁতারকুল, উত্তর বাড্ডা, ঢাকা",
  "permanentAddress": "Dharmapasha, Sunamganj",
  "permanentAddressBn": "ধর্মপাশা, সুনামগঞ্জ",
  "defaultAvatar": "https://cdn.jsdelivr.net/gh/mdamirhamzasbmc3632/my-portfolio-images@main/Amir%20Hamzxa.png",
  "defaultBackground": "/amir-lab-bg.jpg",
  "cvUrl": "https://raw.githubusercontent.com/mdamirhamzasbmc3632/my-portfolio-website/main/assets/Amir-Hamza-3632-Cv.pdf",
  "socials": {
    "youtube": "https://youtube.com",
    "facebook": "https://www.facebook.com/amirhamzasbmc3632",
    "instagram": "",
    "linkedin": "https://linkedin.com"
  }
};

export const personalDetailsData: PersonalDetails = {
  fatherName: "Md Saju Mia",
  fatherNameBn: "মোঃ সাজু মিয়া",
  motherName: "Johura Begum",
  motherNameBn: "জোহুরা বেগম",
  dob: "12/02/1997",
  maritalStatus: "Single",
  maritalStatusBn: "অবিবাহিত",
  religion: "Islam",
  religionBn: "ইসলাম",
  permanentAddress: "Dharmapasha, Sunamganj",
  permanentAddressBn: "ধর্মপাশা, সুনামগঞ্জ",
  languages: [
    { lang: "Bengali", langBn: "বাংলা", proficiency: "Fluent speaking & writing", proficiencyBn: "অনর্গল বলা ও লেখায় পারদর্শী" },
    { lang: "English", langBn: "ইংরেজি", proficiency: "Basic speaking & writing", proficiencyBn: "বেসিক বলা ও লেখায় দক্ষ" }
  ]
};

export const workExperienceData: WorkExperienceItem[] = [
  {
    role: "Marketing Assistant & Operations Executive",
    roleBn: "মার্কেটিং সহকারী ও অপারেশনস এক্সিকিউটিভ",
    organization: "IQRA ONLINE MADRASA",
    organizationBn: "ইকরা অনলাইন মাদরাসা (IQRA Online Madrasa)",
    organizationUrl: "https://iqraonlinemadrasa.com/",
    period: "Professional Experience",
    periodBn: "পেশাগত অভিজ্ঞতা",
    responsibilities: [
      "Marketing Assistant (Highlighted): Assisted in digital marketing campaigns, promotional outreach, student enrollment drives, and social media coordination.",
      "Provided end-to-end technical support to teachers and students, ensuring seamless navigation of LMS, educational software, and hardware tools.",
      "Streamlined daily operational workflows to enhance administrative efficiency and improve academic delivery.",
      "Integrated digital communication pipelines, Google Workspace tools, and managed online educational systems."
    ],
    responsibilitiesBn: [
      "মার্কেটিং সহকারী (বিশেষ দায়িত্ব): অনলাইন প্রচারণা, শিক্ষার্থী ভর্তি ক্যাম্পেইন এবং সোশ্যাল মিডিয়া মার্কেটিং কার্যক্রমে সক্রিয় ভূমিকা পালন।",
      "শিক্ষক ও শিক্ষার্থীদের এন্ড-টু-এন্ড টেকনিক্যাল সাপোর্ট প্রদান এবং এলএমএস (LMS), এডুকেশনাল সফটওয়্যার ও হার্ডওয়্যার টুলস পরিচালনা।",
      "দৈনন্দিন অপারেশনাল ওয়ার্কফ্লো আধুনিকীকরণ, যা প্রশাসনিক কার্যদক্ষতা ও অ্যাকাডেমিক ডেলিভারি বহুগুণে বৃদ্ধি করেছে।",
      "ডিজিটাল কমিউনিকেশন পাইপলাইন, গুগল ওয়ার্কস্পেস ও অনলাইন শিক্ষা ব্যবস্থার সমন্বয় সাধন।"
    ]
  }
];

export const videoProjects: VideoProject[] = [
  {
    id: "yt-boost-brand-identity",
    title: "Boost Your Brand Identity | Strategic Marketing & Video Editing",
    titleBn: "বুস্ট ইওর ব্র্যান্ড আইডেন্টিটি | স্ট্র্যাটেজিক মার্কেটিং ও ভিডিও এডিটিং",
    category: "commercial",
    categoryLabel: "Commercial & Strategic Promo",
    categoryLabelBn: "কমার্শিয়াল ও স্ট্র্যাটেজিক প্রোমো",
    platform: "youtube",
    youtubeId: "8eIfQb4pf-k",
    youtubeUrl: "https://www.youtube.com/watch?v=8eIfQb4pf-k",
    youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/8eIfQb4pf-k?autoplay=1&rel=0",
    thumbnail: "https://i.ytimg.com/vi/8eIfQb4pf-k/hqdefault.jpg",
    duration: "Portfolio",
    client: "Sably Media / Brand Promotion",
    views: "Featured",
    aspectRatio: "16:9",
    description: "High-impact brand identity and strategic marketing video edit showcasing seamless visual flow, punchy messaging, and conversion-focused storytelling.",
    descriptionBn: "ব্র্যান্ড আইডেন্টিটি বৃদ্ধি ও স্ট্র্যাটেজিক মার্কেটিং ফোকাসড প্রফেশনাল ভিডিও এডিটিং পোর্টফোলিও, যাতে রয়েছে আকর্ষণীয় ভিজ্যুয়াল ফ্লো এবং শক্তিশালী স্টোরিটেলিং।",
    toolsUsed: ["Premiere Pro", "After Effects", "DaVinci Resolve"],
    keyFeatures: [
      "Conversion-Focused Visual Hook",
      "Kinetic Typography & Lower Thirds",
      "Cinematic Sound Design",
      "Commercial Color Grading"
    ],
    keyFeaturesBn: [
      "কনভার্সন-ফোকাসড ভিজ্যুয়াল হুক",
      "কাইনেটিক টাইপোগ্রাফি ও লোয়ার থার্ডস",
      "সিনেমাটিক সাউন্ড ডিজাইন",
      "কমার্শিয়াল কালার গ্রেডিং"
    ]
  },
  {
    id: "yt-nafees-selim-promo",
    title: "Nafees Selim Promo Video | As-Sunnah Skill Development Institute",
    titleBn: "নাফিস সেলিম প্রোমো ভিডিও | আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট",
    category: "commercial",
    categoryLabel: "Course & Institute Promo",
    categoryLabelBn: "কোর্স ও ইনস্টিটিউট প্রোমো",
    platform: "youtube",
    youtubeId: "59DlElHzmnE",
    youtubeUrl: "https://www.youtube.com/watch?v=59DlElHzmnE",
    youtubeEmbedUrl: "https://www.youtube-nocookie.com/embed/59DlElHzmnE?autoplay=1&rel=0",
    thumbnail: "https://i.ytimg.com/vi/59DlElHzmnE/hqdefault.jpg",
    duration: "Promo",
    client: "As-Sunnah Skill Development Institute",
    views: "Institute Campaign",
    aspectRatio: "16:9",
    description: "Official promotional campaign video for As-Sunnah Skill Development Institute, highlighting syllabus breakdown, engaging instructor introduction, and dynamic audio-visual presentation.",
    descriptionBn: "আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউটের জন্য নির্মিত অফিসিয়াল কোর্স প্রোমোশনাল ভিডিও—ইনস্ট্রাক্টর ইন্ট্রোডাকশন ও ডায়নামিক অডিও-ভিজ্যুয়াল প্রেজেন্টেশন।",
    toolsUsed: ["Premiere Pro", "After Effects", "Audition"],
    keyFeatures: [
      "Educational Narrative Structuring",
      "High Retention Pacing",
      "Voice-Over Enhancement & Mixing",
      "Clean Modern Graphic Overlays"
    ],
    keyFeaturesBn: [
      "শিক্ষণীয় তথ্যবহুল ন্যারেটিভ স্ট্রাকচার",
      "হাই রিটেনশন ও গতিশীল পেসিং",
      "ভয়েস-ওভার এনহ্যান্সমেন্ট ও মিক্সিং",
      "আধুনিক ক্লিন গ্রাফিক ওভারলে"
    ]
  },
  {
    id: "vimeo-before-after",
    title: "Before & After Video Transformation",
    titleBn: "বিফোর অ্যান্ড আফটার ভিডিও ট্রান্সফর্মেশন (Vertical 9:16)",
    category: "reels",
    categoryLabel: "Vertical Reel (9:16)",
    categoryLabelBn: "ভার্টিকাল রিলস (৯:১৬)",
    platform: "vimeo",
    vimeoId: "1226358155",
    vimeoEmbedUrl: "https://player.vimeo.com/video/1226358155?badge=0&autopause=1&player_id=vimeo-modal-player&app_id=58479&autoplay=1",
    thumbnail: "https://vumbnail.com/1226358155.jpg",
    duration: "0:30",
    client: "Short-Form Reel",
    views: "Viral Breakdown",
    aspectRatio: "9:16",
    description: "Raw footage to master grade split comparison showcasing color correction, audio restoration, visual hook timing, and pacing difference.",
    descriptionBn: "কাঁচা ফুটেজ থেকে ফাইনাল মাস্টার এডিট পর্যন্ত কালার কারেকশন, অডিও রিস্টোরেশন ও ভিজ্যুয়াল হুকের জীবন্ত বিফোর-আফটার রূপান্তর।",
    toolsUsed: [
      "Premiere Pro",
      "DaVinci Resolve",
      "CapCut Pro"
    ],
    keyFeatures: [
      "Side-by-Side Comparison",
      "Color Grading Breakdown",
      "Speed Ramping & Zoom Ins",
      "Enhanced Foley Sound FX"
    ],
    keyFeaturesBn: [
      "সাইড-বাই-সাইড কম্প্যারিজন",
      "কালার গ্রেডিং ব্রেকডাউন",
      "স্পিড র‍্যাম্পিং ও জুম-ইন",
      "এনহ্যান্সড ফলি সাউন্ড এফএক্স"
    ]
  }
];

export const designProjects: DesignProject[] = [
  {
    "id": "design-amra",
    "title": "Amra - Social Media Poster",
    "titleBn": "আমরা (Amra) - সোশ্যাল মিডিয়া পোস্টার ডিজাইন",
    "category": "poster",
    "categoryLabel": "Social Poster",
    "categoryLabelBn": "সোশ্যাল পোস্টার",
    "image": "https://i.postimg.cc/KzXjBqPT/amra.jpg",
    "client": "Social Media Creative",
    "dimensions": "High-Res Artwork",
    "description": "Clean typography, Islamic aesthetic motif, and balanced composition tailored for digital audience engagement.",
    "descriptionBn": "পরিমিত টাইপোগ্রাফি, নান্দনিক আর্টওয়ার্ক এবং ভারসাম্যপূর্ণ কম্পোজিশনে তৈরি সোশ্যাল মিডিয়া পোস্টার ডিজাইন।",
    "toolsUsed": [
      "Photoshop",
      "Illustrator"
    ],
    "keyFeatures": [
      "Bangla Typography Arrangement",
      "Harmonious Color Palette",
      "High Contrast Visual Layout",
      "Digital Feed Optimization"
    ],
    "keyFeaturesBn": [
      "বাংলা টাইপোগ্রাফি বিন্যাস",
      "মনোরম কালার প্যালেট",
      "উচ্চ কনট্রাস্ট ভিজ্যুয়াল লেআউট",
      "সোশ্যাল ফিড অপ্টিমাইজেশন"
    ]
  },
  {
    "id": "design-anua-skincare",
    "title": "Anua Skincare Product Ad Creative",
    "titleBn": "আনুয়া স্কিন কেয়ার অ্যাড ক্রিয়েটিভ ডিজাইন",
    "category": "ad-creative",
    "categoryLabel": "E-Commerce Ad",
    "categoryLabelBn": "ই-কমার্স বিজ্ঞাপন",
    "image": "https://i.postimg.cc/858cMKRM/anua-skin-care-ad-design.jpg",
    "client": "Anua Skincare",
    "dimensions": "1080x1080 (Square)",
    "description": "Modern e-commerce product advertisement emphasizing freshness, soft lighting, and conversion-focused typography.",
    "descriptionBn": "প্রোডাক্টের সতেজতা, সফট লাইটিং এবং রূপচর্চা ব্র্যান্ডের প্রিমিয়াম ভাবমূর্তি ফুটিয়ে তুলতে তৈরি সোশ্যাল অ্যাড ক্রিয়েটিভ।",
    "toolsUsed": [
      "Photoshop",
      "Lightroom"
    ],
    "keyFeatures": [
      "Product Rim Lighting",
      "Soft Minimal Aesthetic",
      "High Conversion Ad Hierarchy",
      "E-commerce Feed Ready"
    ],
    "keyFeaturesBn": [
      "প্রোডাক্ট রিম লাইটিং",
      "সফট মিনিমালিস্টিক নান্দনিকতা",
      "হাই কনভার্সন অ্যাড হায়ারার্কি",
      "ই-কমার্স ফিড ফ্রেন্ডলি"
    ]
  },
  {
    "id": "design-artboard-branding",
    "title": "Creative Brand Identity Artboard",
    "titleBn": "ব্র্যান্ড আইডেন্টিটি ও ক্রিয়েটিভ আর্টবোর্ড ডিজাইন",
    "category": "poster",
    "categoryLabel": "Brand Artboard",
    "categoryLabelBn": "ব্র্যান্ড আর্টবোর্ড",
    "image": "https://i.postimg.cc/9fwz457B/Artboard-2.png",
    "client": "Brand Campaign",
    "dimensions": "Vector Masterpiece",
    "description": "Sophisticated brand layout featuring refined visual balance, abstract geometric shapes, and premium finish.",
    "descriptionBn": "রিফাইন্ড ভিজ্যুয়াল ব্যালেন্স, আধুনিক জিওমেট্রিক শেইপস এবং প্রিমিয়াম লুক সমৃদ্ধ ব্র্যান্ড আর্টবোর্ড ডিজাইন।",
    "toolsUsed": [
      "Illustrator",
      "Photoshop"
    ],
    "keyFeatures": [
      "Clean Geometric Layout",
      "Sharp Vector Composition",
      "Brand Palette Uniformity",
      "Multi-format Scaling"
    ],
    "keyFeaturesBn": [
      "ক্লিন জিওমেট্রিক লেআউট",
      "শার্প ভেক্টর কম্পোজিশন",
      "ব্র্যান্ড কালার সামঞ্জস্য",
      "মাল্টি-ফরম্যাট স্কেলিং"
    ]
  },
  {
    "id": "design-burger-ad",
    "title": "Delicious Gourmet Burger Ad Creative",
    "titleBn": "বার্গার প্রমোশনাল ফুড সোশ্যাল মিডিয়া অ্যাড",
    "category": "ad-creative",
    "categoryLabel": "Food Ad Creative",
    "categoryLabelBn": "ফুড অ্যাড ডিজাইন",
    "image": "https://i.postimg.cc/mDxkCXYF/Burger.jpg",
    "client": "Burger Bistro",
    "dimensions": "Social Media Feed",
    "description": "Appetite-inducing food advertisement with fiery embers, dramatic floating ingredients, and bold headline styling.",
    "descriptionBn": "জিভে জল আনা লোভনীয় ফুড সোশ্যাল মিডিয়া ব্যানার — ড্রামাটিক ব্যাকগ্রাউন্ড, স্পাইস এফেক্ট এবং বোল্ড অফার টেক্সট।",
    "toolsUsed": [
      "Photoshop",
      "Lightroom"
    ],
    "keyFeatures": [
      "Appetite Appeal Styling",
      "Dynamic Floating Ingredient Compositing",
      "Vibrant Contrast and Shadow Depth",
      "Stop-the-Scroll Layout"
    ],
    "keyFeaturesBn": [
      "লোভনীয় কালার গ্রেডিং",
      "ডায়নামিক ফ্লোটিং উপাদানের কম্পোজিটিং",
      "উচ্চ কনট্রাস্ট ও শ্যাডো ডেপথ",
      "স্টপ-দ্য-স্ক্রোল ডিজাইন"
    ]
  },
  {
    "id": "design-chicken-bowl",
    "title": "Crispy Chicken Bowl Menu Promo",
    "titleBn": "চিকেন বোল মেনু ও ফুড প্রমোশন ব্যানার",
    "category": "ad-creative",
    "categoryLabel": "Food Menu Promo",
    "categoryLabelBn": "মেনু ও প্রমোশন ব্যানার",
    "image": "https://i.postimg.cc/26pyhcQn/chiken-bowl.jpg",
    "client": "Fast Food Express",
    "dimensions": "1080x1080 (Square)",
    "description": "Vibrant culinary creative highlighting crispy textures, golden hues, and crisp typography for fast food marketing.",
    "descriptionBn": "খাস্তা ক্রিস্পি টেক্সচার, সোনালী আভা এবং চোখধাঁধানো টাইপোগ্রাফির সমন্বয়ে তৈরি ফাস্ট ফুড প্রমোশন ব্যানার।",
    "toolsUsed": [
      "Photoshop",
      "Illustrator"
    ],
    "keyFeatures": [
      "Food Retouching & Highlights",
      "Crispy Texture Enhancement",
      "Call-to-Action Price Tag",
      "Social Media Ready"
    ],
    "keyFeaturesBn": [
      "ফুড রিটাচিং ও হাইলাইটস",
      "ক্রিস্পি টেক্সচার বর্ধিতকরণ",
      "কল-টু-অ্যাকশন অফার ট্যাগ",
      "সোশ্যাল মিডিয়া অপ্টিমাইজড"
    ]
  },
  {
    "id": "design-hasan-typography",
    "title": "Hasan - Custom Calligraphy & Poster",
    "titleBn": "হাসান (Hasan) - কাস্টম ক্যালিগ্রাফি ও আর্ট পোস্টার",
    "category": "poster",
    "categoryLabel": "Calligraphy Poster",
    "categoryLabelBn": "ক্যালিগ্রাফি পোস্টার",
    "image": "https://i.postimg.cc/C1y5kPGj/Ha-SAN.jpg",
    "client": "Typography Series",
    "dimensions": "Artistic Poster",
    "description": "Handcrafted typographic letterforms combined with atmospheric textures and cultural visual heritage.",
    "descriptionBn": "হাতে আঁকা কাস্টম ক্যালিগ্রাফিক স্টাইল, ক্লাসিক্যাল টেক্সচার ও গভীর নান্দনিকতায় তৈরি শৈল্পিক পোস্টার ডিজাইন।",
    "toolsUsed": [
      "Photoshop",
      "Illustrator"
    ],
    "keyFeatures": [
      "Custom Typographic Lettering",
      "Deep Atmospheric Texturing",
      "Cultural Heritage Aesthetics",
      "Wall Art & Digital Poster"
    ],
    "keyFeaturesBn": [
      "কাস্টম টাইপোগ্রাফিক লেটারিং",
      "গভীর অ্যাটমোস্ফেরিক টেক্সচারিং",
      "ঐতিহ্যবাহী নান্দনিক রূপ",
      "ওয়াল আর্ট ও ডিজিটাল পোস্টার"
    ]
  },
  {
    "id": "design-mirath-poster",
    "title": "Mirath - Cinematic Brand Poster",
    "titleBn": "মিরাস (Mirath) - সিনেমাটিক ব্র্যান্ড পোস্টার",
    "category": "poster",
    "categoryLabel": "Cinematic Poster",
    "categoryLabelBn": "সিনেমাটিক পোস্টার",
    "image": "https://i.postimg.cc/gJ9j8SVy/Mirath-2.jpg",
    "client": "Mirath Project",
    "dimensions": "Cinematic Ratio",
    "description": "Dramatic visual poster with cinematic color grading, mysterious shadows, and majestic Islamic branding tone.",
    "descriptionBn": "সিনেমাটিক কালার গ্রেডিং, নাটকীয় ছায়া এবং রাজকীয় আভিজাত্যের সমন্বয়ে তৈরি মিরাস ব্র্যান্ডের এক্সক্লুসিভ পোস্টার।",
    "toolsUsed": [
      "Photoshop",
      "Lightroom"
    ],
    "keyFeatures": [
      "Cinematic Lighting Gradients",
      "Brand Monogram Placement",
      "Atmospheric Depth & Mist",
      "Story-Driven Composition"
    ],
    "keyFeaturesBn": [
      "সিনেমাটিক লাইটিং গ্রেডিয়েন্ট",
      "ব্র্যান্ড মনোগ্রাম প্লেসমেন্ট",
      "অ্যাটমোস্ফেরিক ডেপথ ও মিস্ট",
      "গল্পভিত্তিক আকর্ষণীয় কম্পোজিশন"
    ]
  },
  {
    "id": "design-mrittyu-cover",
    "title": "Mrityu - Conceptual Book Cover & Poster",
    "titleBn": "মৃত্যু (Mrityu) - কনসেপ্ট বুক কভার ও ড্রামাটিক পোস্টার",
    "category": "poster",
    "categoryLabel": "Book Cover & Poster",
    "categoryLabelBn": "বুক কভার ও পোস্টার",
    "image": "https://i.postimg.cc/50cyL7B3/mrittyu.jpg",
    "client": "Islamic Publication",
    "dimensions": "Book Cover / Vertical",
    "description": "Deeply emotional and philosophical book cover design exploring mortality with moody shadows and striking typography.",
    "descriptionBn": "গভীর ভাবগাম্ভীর্যপূর্ণ কনসেপ্ট, ড্রামাটিক অন্ধকার ও আলোর খেলা এবং বোল্ড টাইটেল সহযোগে তৈরি মনোগ্রাহী বুক কভার ডিজাইন।",
    "toolsUsed": [
      "Photoshop",
      "InDesign",
      "Illustrator"
    ],
    "keyFeatures": [
      "Emotional & Thought-Provoking Theme",
      "Moody Shadow Composition",
      "Custom Bangla Book Title Font",
      "Print-Ready Standard"
    ],
    "keyFeaturesBn": [
      "গভীর ভাবগাম্ভীর্যপূর্ণ বিষয়বস্তু",
      "মুডি শ্যাডো কম্পোজিশন",
      "কাস্টম বাংলা টাইটেল ফন্ট",
      "প্রিন্ট-রেডি নির্ভুল ফরম্যাট"
    ]
  },
  {
    "id": "design-set-cover",
    "title": "Multi-Volume Book Set Cover Design",
    "titleBn": "বইয়ের সেট কভার ও পাবলিকেশন প্যাকেজিং ডিজাইন",
    "category": "poster",
    "categoryLabel": "Publication Cover",
    "categoryLabelBn": "পাবলিকেশন কভার",
    "image": "https://i.postimg.cc/vBRTfqrq/set-cover-design-2.jpg",
    "client": "Heritage Publications",
    "dimensions": "Box Set / Multi-cover",
    "description": "Cohesive multi-volume editorial set design with elegant spine consistency, rich foil patterns, and unified color palette.",
    "descriptionBn": "ধারাবাহিক বইয়ের সেটের জন্য সমন্বিত স্পাইন ও ফ্রন্ট কভার ডিজাইন — প্রফেশনাল ফয়েল ইফেক্ট ও মার্জিত আর্টওয়ার্ক।",
    "toolsUsed": [
      "InDesign",
      "Photoshop",
      "Illustrator"
    ],
    "keyFeatures": [
      "Editorial Spine Uniformity",
      "Luxurious Decorative Framing",
      "High-Resolution Vector Borders",
      "Complete Publication Series Flow"
    ],
    "keyFeaturesBn": [
      "ধারাবাহিক স্পাইন সামঞ্জস্য",
      "আভিজাত্যপূর্ণ ফ্রেম নকশা",
      "হাই-রেজোলিউশন ভেক্টর বর্ডার",
      "পাবলিকেশন সিরিজের পূর্ণাঙ্গ ফ্লো"
    ]
  },
  {
    "id": "design-typography-02",
    "title": "Artistic Bangla Typography & Lettering",
    "titleBn": "বাংলা টাইপোগ্রাফি ও ক্যালিগ্রাফি আর্টওয়ার্ক ০২",
    "category": "poster",
    "categoryLabel": "Typography Art",
    "categoryLabelBn": "টাইপোগ্রাফি আর্ট",
    "image": "https://i.postimg.cc/HxGnXZwN/Typography-02.jpg",
    "client": "Typography Showcase",
    "dimensions": "Artistic Layout",
    "description": "Modernized Bengali letterforms exploring fluid strokes, balance, and creative negative space.",
    "descriptionBn": "আধুনিক বাংলা হরফের বৈচিত্র্যময় শৈল্পিক রূপ, সুষম নেগেটিভ স্পেস এবং চমৎকার স্ট্রোক শৈলীর অনন্য নিদর্শন।",
    "toolsUsed": [
      "Illustrator",
      "Photoshop"
    ],
    "keyFeatures": [
      "Custom Handwritten Letterform",
      "Creative Negative Space Use",
      "Minimalist Clean Visuals",
      "Authentic Bengali Artistry"
    ],
    "keyFeaturesBn": [
      "কাস্টম হস্তলিপিক হরফ",
      "সৃজনশীল নেগেটিভ স্পেস ব্যবহার",
      "মিনিমালিস্টিক ক্লিয়ার ভিজ্যুয়াল",
      "খাঁটি বাংলা নান্দনিকতা"
    ]
  },
  {
    "id": "design-yt-thumbnail-01",
    "title": "High CTR YouTube Video Thumbnail 01",
    "titleBn": "হাই-সিটিআর (CTR) ইউটিউব ভিডিও থাম্বনেইল ০১",
    "category": "thumbnail",
    "categoryLabel": "YouTube Thumbnail",
    "categoryLabelBn": "ইউটিউব থাম্বনেইল",
    "image": "https://i.postimg.cc/k5H8ZvxK/Thumbnail.png",
    "client": "Creator Channel",
    "dimensions": "1920x1080 (16:9 HD)",
    "description": "Engineered for algorithm click-through success with punchy color grading, clear subject isolation, and curiosity hook.",
    "descriptionBn": "অ্যালগরিদম উপযোগী উচ্চ ক্লিক রেট অর্জনের জন্য তৈরি থাম্বনেইল — পপ-আউট বিষয়বস্তু, বোল্ড টেক্সট ও কিউরিওসিটি হুক।",
    "toolsUsed": [
      "Photoshop",
      "Lightroom"
    ],
    "keyFeatures": [
      "High Visual Contrast for Mobile",
      "Instant Hook Readability",
      "Custom Edge Lighting and Retouching",
      "Proven CTR Optimization"
    ],
    "keyFeaturesBn": [
      "মোবাইল স্ক্রিনে স্পষ্ট ভিজ্যুয়াল কনট্রাস্ট",
      "০.২ সেকেন্ডে বোঝার উপযোগী হুক",
      "কাস্টম এজ লাইটিং ও রিটাচিং",
      "প্রমাণিত হাই সিটিআর ফর্মুলা"
    ]
  },
  {
    "id": "design-yt-thumbnail-aam",
    "title": "Storytelling YouTube Thumbnail - Mango Garden",
    "titleBn": "আম বাগানের গল্প - ইউটিউব স্টোরিটেলিং থাম্বনেইল",
    "category": "thumbnail",
    "categoryLabel": "Story Thumbnail",
    "categoryLabelBn": "স্টোরি থাম্বনেইল",
    "image": "https://i.postimg.cc/fbPXFfxY/thumbnail-aam.png",
    "client": "Documentary YouTube",
    "dimensions": "1920x1080 (16:9 HD)",
    "description": "Vivid storytelling thumbnail depicting lush orchard vibes, expressive facial acting, and high-impact curiosity cues.",
    "descriptionBn": "আম বাগানের সতেজ পরিবেশ, অভিব্যক্তিপূর্ণ ফেস রিটাচিং এবং কৌতূহলোদ্দীপক ফন্ট ডিজাইনে তৈরি স্টোরিটেলিং থাম্বনেইল।",
    "toolsUsed": [
      "Photoshop",
      "Lightroom"
    ],
    "keyFeatures": [
      "Lush Color Enhancement",
      "Facial Emotion Accentuation",
      "3D Perspective Font Styling",
      "15%+ Click Rate Design"
    ],
    "keyFeaturesBn": [
      "উজ্জ্বল প্রাকৃতিক কালার এনহ্যান্সমেন্ট",
      "ফেসিয়াল এক্সপ্রেশন রিটাচিং",
      "থ্রিডি পার্সপেক্টিভ ফন্ট স্টাইলিং",
      "উচ্চভিউ নিশ্চিতকরণ ডিজাইন"
    ]
  },
  {
    "id": "design-yt-thumbnail-02",
    "title": "Viral Video YouTube Thumbnail 02",
    "titleBn": "ভাইরাল ইউটিউব ভিডিও থাম্বনেইল ০২",
    "category": "thumbnail",
    "categoryLabel": "Viral Thumbnail",
    "categoryLabelBn": "ভাইরাল থাম্বনেইল",
    "image": "https://i.postimg.cc/q7FnYx8n/Thumnail-02.png",
    "client": "Popular YouTuber",
    "dimensions": "1920x1080 (16:9 HD)",
    "description": "Bold and dynamic YouTube thumbnail artwork crafted to dominate competitive video feeds.",
    "descriptionBn": "সোশ্যাল মিডিয়া ও ইউটিউবের তুমুল প্রতিযোগিতামূলক ফিডে দর্শকের চোখ আটকে দেওয়ার জন্য তৈরি পাওয়ারফুল থাম্বনেইল আর্ট।",
    "toolsUsed": [
      "Photoshop",
      "Illustrator"
    ],
    "keyFeatures": [
      "Extreme Focal Clarity",
      "Color Pop Glow Accents",
      "Zero Visual Clutter",
      "YouTube Algorithm Friendly"
    ],
    "keyFeaturesBn": [
      "চোখধাঁধানো ফোকাস ক্লিয়ারিটি",
      "কালার পপ গ্লো ইফেক্ট",
      "ক্লিন আনক্ল্যাটারড লেআউট",
      "ইউটিউব অ্যালগরিদম ফ্রেন্ডলি"
    ]
  }
];

export const expertiseList: ExpertiseItem[] = [
  {
    id: "meta-marketing",
    title: "DIGITAL & META MARKETING",
    titleBn: "ডিজিটাল ও মেটা মার্কেটিং",
    description: "Meta Marketing Specialist — Facebook & Instagram Ads campaigns, laser-targeted audiences, conversion tracking, Pixel setup & high ROI optimization.",
    descriptionBn: "মেটা মার্কেটিং স্পেশালিস্ট — ফেসবুক ও ইনস্টাগ্রাম অ্যাডস ক্যাম্পেইন, সুনির্দিষ্ট অডিয়েন্স রিসার্চ, কনভার্সন ট্র্যাকিং, পিক্সেল সেটআপ ও আরওআই বৃদ্ধি।",
    iconName: "trending-up",
    tools: ["Meta Ads Manager", "Meta Business Suite", "Pixel Setup", "Targeting & Scaling"]
  },
  {
    id: "video-editing",
    title: "HIGH-RETENTION VIDEO EDITING",
    titleBn: "হাই-রিটেনশন ভিডিও এডিটিং",
    description: "Commercial promo ads, social media reels, kinetic motion typography, audio mastering & pacing designed for engagement.",
    descriptionBn: "কমার্শিয়াল প্রোমো অ্যাড, সোশ্যাল মিডিয়া রিলস, কাইনেটিক টাইপোগ্রাফি, সাউন্ড ডিজাইন ও মার্কেটিং অ্যাড এডিটিং।",
    iconName: "video",
    tools: ["Premiere Pro", "After Effects", "DaVinci Resolve"]
  },
  {
    id: "graphic-design",
    title: "GRAPHIC DESIGN & AD CREATIVES",
    titleBn: "গ্রাফিক ডিজাইন ও অ্যাড ক্রিয়েটিভস",
    description: "High-CTR social media ad creatives, YouTube thumbnails, brand identities & marketing promotional materials.",
    descriptionBn: "উচ্চ ক্লিক রেটের (CTR) সোশ্যাল মিডিয়া অ্যাড ক্রিয়েটিভ, ইউটিউব থাম্বনেইল, ব্র্যান্ডিং ও প্রমোশনাল ভিজ্যুয়াল।",
    iconName: "palette",
    tools: ["Photoshop", "Illustrator", "Canva Pro"]
  }
];

export const academicList: AcademicItem[] = [
  {
    degree: "Takmeel Fil Hadith",
    institute: "Jamia Arabia Imdadul Uloom Faridabad",
    subject: "Al-Hadith And Islamic Studies",
    year: "2026",
    status: "Completed / Graduating",
    result: "GPA 4 (Out of 5.00)",
    iconName: "graduation-cap",
    desc: "Al-Hadith And Islamic Studies at Jamia Arabia Imdadul Uloom Faridabad. Result: GPA 4 (Out of 5.00)."
  },
  {
    degree: "Shorhe Bekaya",
    institute: "Jamia Islamia Miftahul Ulum Badda",
    subject: "General",
    year: "2023",
    status: "Completed with Distinction",
    result: "GPA 5 (Out of 5.00)",
    iconName: "award",
    desc: "General Islamic Studies curriculum at Jamia Islamia Miftahul Ulum Badda. Result: GPA 5 (Out of 5.00)."
  },
  {
    degree: "Hifjul Quran",
    institute: "Rotargown Hossainia Hafijia Madrasa",
    year: "2017",
    status: "Completed with Distinction",
    result: "GPA 5 (Out of 5.00)",
    iconName: "sparkles",
    desc: "Successful complete memorization of the Holy Qur'an at Rotargown Hossainia Hafijia Madrasa. Result: GPA 5 (Out of 5.00)."
  }
];

export const academicListBn: AcademicItem[] = [
  {
    degree: "তাকমীল ফিল হাদিস (Takmeel Fil Hadith)",
    institute: "মাদরাসা আরাবিয়া ইমদাদুল উলূম ফরিদাবাদ",
    subject: "আল-হাদিস অ্যান্ড ইসলামিক স্টাডিজ",
    year: "২০২৬",
    status: "সমাপ্ত / উত্তীর্ণ",
    result: "জিপিএ ৪ (৫.০০ এর মধ্যে)",
    iconName: "graduation-cap",
    desc: "মাদরাসা আরাবিয়া ইমদাদুল উলূম ফরিদাবাদ থেকে আল-হাদিস ও ইসলামিক স্টাডিজে উচ্চতর তাকমীল সম্পন্ন। ফলাফল: জিপিএ ৪ (৫.০০ এর মধ্যে)।"
  },
  {
    degree: "শরহে বেকায়া (Shorhe Bekaya)",
    institute: "জামিয়া ইসলামিয়া মিফতাহুল উলুম বাড্ডা",
    subject: "সাধারণ বিভাগ",
    year: "২০২৩",
    status: "কৃতিত্বের সাথে সম্পন্ন",
    result: "জিপিএ ৫ (৫.০০ এর মধ্যে)",
    iconName: "award",
    desc: "জামিয়া ইসলামিয়া মিফতাহুল উলুম বাড্ডা থেকে ইসলামিক শিক্ষা ও সাধারণ কারিকুলাম সম্পন্ন। ফলাফল: জিপিএ ৫ (৫.০০ এর মধ্যে)।"
  },
  {
    degree: "হিফজুল কুরআন (Hifjul Quran)",
    institute: "রোটারগাঁও হোসাইনিয়া হাফিজিয়া মাদরাসা",
    year: "২০১৭",
    status: "কৃতিত্বের সাথে সম্পন্ন",
    result: "জিপিএ ৫ (৫.০০ এর মধ্যে)",
    iconName: "sparkles",
    desc: "রোটারগাঁও হোসাইনিয়া হাফিজিয়া মাদরাসা থেকে সম্পূর্ণ পবিত্র কুরআনুল কারীম হিফজ সম্পন্ন। ফলাফল: জিপিএ ৫ (৫.০০ এর মধ্যে)।"
  }
];

export const trainingDataEn: TrainingInstitution = {
  institution: "As-Sunnah Skill Development Institute",
  courseName: "SBMC (Small Business Management Course)",
  batch: "Batch 36",
  topics: [
    { name: "Meta Marketing Specialist", tools: "Facebook & Instagram Ads Strategy, Campaign Setup & ROAS" },
    { name: "Google Workspace & Productivity", tools: "Workspace Tools, Google Forms & Administrative Workflows" },
    { name: "High-Retention Video Editing", tools: "Premiere Pro & After Effects (Promos, Reels & Ads)" },
    { name: "Graphic Design & Ad Creatives", tools: "Photoshop, Illustrator & Canva Pro (High CTR Artworks)" }
  ]
};

export const trainingDataBn: TrainingInstitution = {
  institution: "আস-সুন্নাহ স্কিল ডেভেলপমেন্ট ইনস্টিটিউট",
  courseName: "SBMC (Small Business Management Course)",
  batch: "Batch 36",
  topics: [
    { name: "মেটা মার্কেটিং স্পেশালিস্ট", tools: "ফেসবুক ও ইনস্টাগ্রাম অ্যাডস স্ট্র্যাটেজি, ক্যাম্পেইন ও আরওআই বৃদ্ধি" },
    { name: "গুগল ওয়ার্কস্পেস ও প্রোডাক্টিভিটি", tools: "ওয়ার্কস্পেস টুলস, গুগল ফর্মস ও প্রশাসনিক ওয়ার্কফ্লো" },
    { name: "হাই-রিটেনশন ভিডিও এডিটিং", tools: "প্রিমিয়ার প্রো ও আফটার ইফেক্টস (মার্কেটিং প্রোমো ও রিলস)" },
    { name: "গ্রাফিক ডিজাইন ও অ্যাড ক্রিয়েটিভস", tools: "ফটোশপ, ইলাস্ট্রেটর ও ক্যানভা প্রো (হাই সিটিআর থাম্বনেইল ও ডিজাইন)" }
  ]
};
