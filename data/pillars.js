
/*
========================================================

CTM PATH™ GUIDED JOURNEY™
DATA LAYER

File:
data/pillars.js

Purpose:
Central pillar metadata database for the
CTM PATH™ Life Assessment Engine™

Ownership:
- Pillar names
- Pillar descriptions
- Icons
- Display information
- Journey presentation data

Rules:
- Questions belong only in questions.js
- Scoring belongs only in scoring.js
- Diagnosis and prescription belong to backend

Assessment Structure:

12 Pillars™

========================================================
*/


/*
========================================================
NAMESPACE
========================================================
*/

const CTM_PILLARS = {


/*
========================================================
METADATA
========================================================
*/

version: "1.0",

totalPillars: 12,


/*
========================================================
PILLAR DATABASE
========================================================
*/

pillars: [


/*
========================================================
PILLAR 01

PURPOSE™

========================================================
*/

{
    id: "PURPOSE",

    number: 1,

    name: "Purpose™",

    tamilName:
    "வாழ்க்கை நோக்கம்™",

    shortDescription:
    "Discover your direction, meaning and inner calling.",

    tamilDescription:
    "உங்கள் வாழ்க்கையின் திசை, அர்த்தம் மற்றும் உள்ளார்ந்த அழைப்பை கண்டறிதல்.",

    icon:
    "compass",

    colorTheme:
    "purpose",

    displayOrder: 1
},


/*
========================================================
PILLAR 02

HEALTH™

========================================================
*/

{
    id: "HEALTH",

    number: 2,

    name: "Health™",

    tamilName:
    "ஆரோக்கியம்™",

    shortDescription:
    "Build physical vitality and lifelong well-being.",

    tamilDescription:
    "உடல் சக்தி மற்றும் நீண்டகால நலனை உருவாக்குதல்.",

    icon:
    "heart",

    colorTheme:
    "health",

    displayOrder: 2
},


/*
========================================================
PILLAR 03

RELATIONSHIPS™

========================================================
*/

{
    id: "RELATIONSHIPS",

    number: 3,

    name: "Relationships™",

    tamilName:
    "உறவுகள்™",

    shortDescription:
    "Create meaningful connections and supportive relationships.",

    tamilDescription:
    "அர்த்தமுள்ள இணைப்புகள் மற்றும் ஆதரவான உறவுகளை உருவாக்குதல்.",

    icon:
    "users",

    colorTheme:
    "relationships",

    displayOrder: 3
}


/*
========================================================
END OF BATCH 1A

Completed:
✅ Namespace
✅ Metadata
✅ Purpose™
✅ Health™
✅ Relationships™

Next:
PILLAR 04 — Character & Integrity™

========================================================
*/

   /*
========================================================

CTM PATH™ GUIDED JOURNEY™
DATA LAYER

Continuation:
data/pillars.js

Batch:
1B

Current Section:
PILLAR 04 — CHARACTER & INTEGRITY™

========================================================
*/


/*
========================================================
PILLAR 04

CHARACTER & INTEGRITY™

========================================================
*/

{
    id: "CHARACTER",

    number: 4,

    name: "Character & Integrity™",

    tamilName:
    "குணநலம் மற்றும் நேர்மை™",

    shortDescription:
    "Strengthen values, honesty and self-leadership.",

    tamilDescription:
    "மதிப்புகள், நேர்மை மற்றும் சுய தலைமைத்துவத்தை வலுப்படுத்துதல்.",

    icon:
    "shield",

    colorTheme:
    "character",

    displayOrder: 4
},


/*
========================================================
PILLAR 05

LEARNING & MASTERY™

========================================================
*/

{
    id: "LEARNING",

    number: 5,

    name: "Learning & Mastery™",

    tamilName:
    "கற்றல் மற்றும் திறமை மேம்பாடு™",

    shortDescription:
    "Develop continuous learning and personal excellence.",

    tamilDescription:
    "தொடர்ச்சியான கற்றல் மற்றும் தனிப்பட்ட மேன்மையை வளர்த்தல்.",

    icon:
    "book",

    colorTheme:
    "learning",

    displayOrder: 5
},


/*
========================================================
PILLAR 06

CAREER & CONTRIBUTION™

========================================================
*/

{
    id: "CAREER",

    number: 6,

    name: "Career & Contribution™",

    tamilName:
    "தொழில் மற்றும் பங்களிப்பு™",

    shortDescription:
    "Create excellence, meaningful work and impact.",

    tamilDescription:
    "சிறப்பு, அர்த்தமுள்ள வேலை மற்றும் தாக்கத்தை உருவாக்குதல்.",

    icon:
    "briefcase",

    colorTheme:
    "career",

    displayOrder: 6
},


/*
========================================================
PILLAR 07

FINANCIAL FREEDOM™

========================================================
*/

{
    id: "FINANCIAL",

    number: 7,

    name: "Financial Freedom™",

    tamilName:
    "நிதி சுதந்திரம்™",

    shortDescription:
    "Build financial stability, security and abundance.",

    tamilDescription:
    "நிதி நிலைத்தன்மை, பாதுகாப்பு மற்றும் வளத்தை உருவாக்குதல்.",

    icon:
    "wallet",

    colorTheme:
    "financial",

    displayOrder: 7
}


/*
========================================================
END OF BATCH 1B

Completed:
✅ Purpose™
✅ Health™
✅ Relationships™
✅ Character & Integrity™
✅ Learning & Mastery™
✅ Career & Contribution™
✅ Financial Freedom™

Next:
PILLAR 08 — Time Freedom™
PILLAR 09 — Tribe™

========================================================
*/

/*
========================================================

CTM PATH™ GUIDED JOURNEY™
DATA LAYER

Continuation:
data/pillars.js

Batch:
1C

Current Section:
PILLAR 08 — TIME FREEDOM™
PILLAR 09 — TRIBE™

========================================================
*/


/*
========================================================
PILLAR 08

TIME FREEDOM™

========================================================
*/

{
    id: "TIME",

    number: 8,

    name: "Time Freedom™",

    tamilName:
    "நேர சுதந்திரம்™",

    shortDescription:
    "Design your time around priorities, balance and freedom.",

    tamilDescription:
    "முன்னுரிமைகள், சமநிலை மற்றும் சுதந்திரத்திற்கு ஏற்ப உங்கள் நேரத்தை வடிவமைத்தல்.",

    icon:
    "clock",

    colorTheme:
    "time",

    displayOrder: 8
},


/*
========================================================
PILLAR 09

TRIBE™

========================================================
*/

{
    id: "TRIBE",

    number: 9,

    name: "Tribe™",

    tamilName:
    "உங்கள் மக்கள் வட்டம்™",

    shortDescription:
    "Create a supportive community and meaningful connections.",

    tamilDescription:
    "ஆதரவான சமூகத்தையும் அர்த்தமுள்ள மனித இணைப்புகளையும் உருவாக்குதல்.",

    icon:
    "community",

    colorTheme:
    "tribe",

    displayOrder: 9
},


/*
========================================================
PILLAR 10

AUTOMATION™

========================================================
*/

{
    id: "AUTOMATION",

    number: 10,

    name: "Automation™",

    tamilName:
    "அமைப்புகள் மற்றும் தானியக்கம்™",

    shortDescription:
    "Create systems that improve efficiency and multiply results.",

    tamilDescription:
    "திறனை உயர்த்தும் மற்றும் முடிவுகளை பெருக்கும் அமைப்புகளை உருவாக்குதல்.",

    icon:
    "system",

    colorTheme:
    "automation",

    displayOrder: 10
}


/*
========================================================
END OF BATCH 1C

Completed:
✅ Purpose™
✅ Health™
✅ Relationships™
✅ Character & Integrity™
✅ Learning & Mastery™
✅ Career & Contribution™
✅ Financial Freedom™
✅ Time Freedom™
✅ Tribe™
✅ Automation™

Next:
PILLAR 11 — Contribution™
PILLAR 12 — Vision™

========================================================
*/

/*
========================================================

CTM PATH™ GUIDED JOURNEY™
DATA LAYER

Continuation:
data/pillars.js

Batch:
1D

Current Section:
PILLAR 11 — CONTRIBUTION™
PILLAR 12 — VISION™

========================================================
*/


/*
========================================================
PILLAR 11

CONTRIBUTION™

========================================================
*/

{
    id: "CONTRIBUTION",

    number: 11,

    name: "Contribution™",

    tamilName:
    "பங்களிப்பு மற்றும் மரபு™",

    shortDescription:
    "Create meaningful service, impact and lasting legacy.",

    tamilDescription:
    "அர்த்தமுள்ள சேவை, தாக்கம் மற்றும் நிலையான மரபை உருவாக்குதல்.",

    icon:
    "gift",

    colorTheme:
    "contribution",

    displayOrder: 11
},


/*
========================================================
PILLAR 12

VISION™

========================================================
*/

{
    id: "VISION",

    number: 12,

    name: "Vision™",

    tamilName:
    "எதிர்கால பார்வை™",

    shortDescription:
    "Define your dreams, possibilities and desired future.",

    tamilDescription:
    "உங்கள் கனவுகள், வாய்ப்புகள் மற்றும் விரும்பும் எதிர்காலத்தை தெளிவுபடுத்துதல்.",

    icon:
    "eye",

    colorTheme:
    "vision",

    displayOrder: 12
}


]

};


/*
========================================================

PILLAR DATABASE COMPLETE

Total Structure:

12 Pillars™

Completed:

✅ Purpose™
✅ Health™
✅ Relationships™
✅ Character & Integrity™
✅ Learning & Mastery™
✅ Career & Contribution™
✅ Financial Freedom™
✅ Time Freedom™
✅ Tribe™
✅ Automation™
✅ Contribution™
✅ Vision™

Global Access:

CTM_PILLARS.pillars


========================================================
*/

