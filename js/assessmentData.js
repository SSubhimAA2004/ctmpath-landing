
/* ==========================================================================
   CTM PATH™ Guided Journey v2.0
   File        : assessmentData.js
   Version     : 1.0
   Status      : 🔒 LOCKED

   MASTER ASSESSMENT REPOSITORY

   This file contains ONLY assessment data.

   ✓ Assessment Content
   ✓ Pillar Metadata
   ✓ Introductions
   ✓ Questions
   ✓ Reflections
   ✓ Wisdom Statements

   This file contains NO

   ✗ Rendering
   ✗ DOM Manipulation
   ✗ API Calls
   ✗ Calculations
   ✗ Business Logic

   ========================================================================== */

'use strict';

/* ==========================================================================
   MASTER REPOSITORY
   ========================================================================== */

const AssessmentRepository = {

    version : '1.0',

    status : 'LOCKED',

    totalPillars : 12,

    questionsPerPillar : 3,

    maximumScorePerPillar : 30,

    ratingScale : {

        minimum : 1,

        maximum : 10

    },

    pillars : [

/* ==========================================================================
   SPOKE 01
   PURPOSE™
   ========================================================================== */

{

    id : 1,

    key : "purpose",

    spoke : 1,

    tamilTitle : "நோக்கம்™",

    englishTitle : "Purpose™",

    corePrinciple :

        "A meaningful life begins with a meaningful purpose.",

    introductionTa :

`ஒவ்வொரு மனிதனும் ஒரு காரணத்திற்காகப் பிறக்கிறார்.

உங்கள் வாழ்க்கைக்கு தெளிவான நோக்கம் இருக்கும்போது, உங்கள் முடிவுகள், உங்கள் முயற்சிகள் மற்றும் உங்கள் செயல்கள் அனைத்தும் அர்த்தமுள்ளதாக மாறுகின்றன.

இந்தப் பகுதி உங்கள் வாழ்க்கை எந்த அளவிற்கு தெளிவான நோக்கத்தால் வழிநடத்தப்படுகிறது என்பதைப் பற்றிய சுய மதிப்பீடு.`,

    introductionEn :

`Every person is born with the potential to live a meaningful life.

When your purpose is clear, your decisions become clearer, your efforts become more focused and your life gains direction.

This assessment invites you to reflect honestly on how clearly your life is guided by purpose.`,

    questions : [

        {

            id : 1,

            tamil :

            "என் வாழ்க்கையின் உயர்ந்த நோக்கம் என்ன என்பது எனக்கு தெளிவாக தெரியும்.",

            english :

            "I have a clear understanding of the higher purpose of my life."

        },

        {

            id : 2,

            tamil :

            "எனது அன்றாட முடிவுகள் என் வாழ்க்கை நோக்கத்துடன் ஒத்திசைவாக உள்ளன.",

            english :

            "My daily decisions are aligned with my life's purpose."

        },

        {

            id : 3,

            tamil :

            "நான் வாழும் வாழ்க்கை எனக்கு ஆழமான அர்த்தத்தையும் நிறைவையும் அளிக்கிறது.",

            english :

            "The life I am living gives me a deep sense of meaning and fulfilment."

        }

    ],

    reflectionTa :

`நோக்கம் தெளிவாக இருக்கும் போது,
முடிவுகள் எளிதாகின்றன.

நோக்கம் இல்லாத வாழ்க்கை
சூழ்நிலைகளால் இழுத்துச் செல்லப்படும்.`,

    reflectionEn :

`When purpose is clear,
decisions become easier.

Without purpose,
life is often driven by circumstances rather than conscious choice.`,

    wisdomTa :

`நோக்கம் வாழ்க்கைக்கு திசையைக் கொடுக்கிறது.

திசை பெற்ற வாழ்க்கையே
நிறைவான வாழ்க்கையாக மலர்கிறது.`,

    wisdomEn :

`Purpose gives direction.

Direction gives meaning.

Meaning transforms existence into a life well lived.`,

    implementation : {

        maximumScore : 30,

        output : "Purpose Percentage",

        storedValue : "Purpose %",

        googleSheetColumn : "Purpose",

        kalaChakraSpoke : 1,

        diagnosisInput : "Purpose %",

        prescriptionInput : "Purpose %"

    }

}

/* ==========================================================================
   SPOKE 02
   Continues in Batch 2
   ========================================================================== */

    ]

};

/* ==========================================================================
   End of Batch 1
   assessmentData.js continues in Batch 2
   ========================================================================== */

/* ==========================================================================
   SPOKE 02
   HEALTH™
   ========================================================================== */

,

{

    id : 2,

    key : "health",

    spoke : 2,

    tamilTitle : "ஆரோக்கியம்™",

    englishTitle : "Health™",

    corePrinciple :

        "Health is the foundation upon which every other pillar of life is built.",

    introductionTa :

`உங்கள் உடலும் மனமும் உங்கள் வாழ்க்கைப் பயணத்தின் வாகனமாகும்.

ஆரோக்கியமான உடலும் அமைதியான மனமும் இணைந்தால் மட்டுமே முழுமையான வாழ்க்கையை அனுபவிக்க முடியும்.

இந்தப் பகுதி உங்கள் தற்போதைய ஆரோக்கிய நிலையைப் பற்றி நேர்மையாக சிந்திக்க உதவுகிறது.`,

    introductionEn :

`Your body and mind are the vehicle through which you experience life.

Good health provides the energy to pursue your purpose, nurture your relationships and contribute meaningfully to the world.

This section invites you to reflect honestly on your present state of health.`,

    questions : [

        {

            id : 1,

            tamil :

            "எனது உடல்நலம் என் அன்றாட வாழ்க்கையை உற்சாகமாக வாழ உதவுகிறது.",

            english :

            "My physical health gives me the energy to live each day with vitality."

        },

        {

            id : 2,

            tamil :

            "என் மனம் பெரும்பாலான நேரங்களில் அமைதியாகவும் தெளிவாகவும் உள்ளது.",

            english :

            "My mind remains calm, clear and emotionally balanced most of the time."

        },

        {

            id : 3,

            tamil :

            "உடலையும் மனதையும் ஆரோக்கியமாக வைத்திருக்க நான் தொடர்ந்து நல்ல பழக்கங்களைப் பின்பற்றுகிறேன்.",

            english :

            "I consistently practise habits that protect and improve my physical and mental health."

        }

    ],

    reflectionTa :

`ஆரோக்கியம் இல்லாமல் எந்த சாதனையும் நீண்ட காலம் நிலைக்காது.

உங்கள் உடலே உங்கள் வாழ்க்கையின் முதல் செல்வம்.`,

    reflectionEn :

`Without health,
every other success becomes difficult to sustain.

Your greatest wealth is the body and mind through which you live your life.`,

    wisdomTa :

`ஆரோக்கியத்தை பாதுகாப்பது
வாழ்க்கையை பாதுகாப்பதற்குச் சமம்.`,

    wisdomEn :

`When health flourishes,
life flourishes.

Protect your health,
and every other pillar gains strength.`,

    implementation : {

        maximumScore : 30,

        output : "Health Percentage",

        storedValue : "Health %",

        googleSheetColumn : "Health",

        kalaChakraSpoke : 2,

        diagnosisInput : "Health %",

        prescriptionInput : "Health %"

    }

}

/* ==========================================================================
   SPOKE 03
   RELATIONSHIPS™
   ========================================================================== */

,

{

    id : 3,

    key : "relationships",

    spoke : 3,

    tamilTitle : "உறவுகள்™",

    englishTitle : "Relationships™",

    corePrinciple :

        "The quality of your life is deeply influenced by the quality of your relationships.",

    introductionTa :

`வாழ்க்கையின் உண்மையான செல்வம் பணம் அல்ல;

அன்பும் நம்பிக்கையும் நிறைந்த உறவுகளே.

இந்தப் பகுதி உங்கள் குடும்பம், நண்பர்கள் மற்றும் முக்கியமான உறவுகளைப் பற்றி நேர்மையாக சிந்திக்க உதவுகிறது.`,

    introductionEn :

`Life is enriched not merely by achievements, but by meaningful relationships built on love, trust and mutual respect.

This section invites you to reflect honestly on the health of your most important relationships.`,

    questions : [

        {

            id : 1,

            tamil :

            "என் குடும்பத்தினருடனும் நெருங்கியவர்களுடனும் ஆரோக்கியமான உறவை நான் பேணுகிறேன்.",

            english :

            "I maintain healthy and meaningful relationships with my family and those closest to me."

        },

        {

            id : 2,

            tamil :

            "நான் மற்றவர்களுடன் திறந்த மனதுடன் பேசவும் கவனமாகக் கேட்கவும் முயற்சிக்கிறேன்.",

            english :

            "I communicate openly and listen with empathy and respect."

        },

        {

            id : 3,

            tamil :

            "என் வாழ்க்கையில் என்னை ஊக்குவிக்கும் மற்றும் வளரச் செய்யும் நல்ல உறவுகள் உள்ளன.",

            english :

            "I am surrounded by relationships that encourage my growth and well-being."

        }

    ],

    reflectionTa :

`உறவுகள் தானாக வளர்வதில்லை.

அவற்றை அன்பு, நேரம் மற்றும் கவனத்தால் வளர்க்க வேண்டும்.`,

    reflectionEn :

`Relationships are not maintained by chance.

They flourish through intentional care, time and understanding.`,

    wisdomTa :

`அன்பு பகிரப்படும் இடத்தில்
வாழ்க்கை மலர்கிறது.`,

    wisdomEn :

`Strong relationships do not merely support life.

They give life its deepest meaning.`,

    implementation : {

        maximumScore : 30,

        output : "Relationships Percentage",

        storedValue : "Relationships %",

        googleSheetColumn : "Relationships",

        kalaChakraSpoke : 3,

        diagnosisInput : "Relationships %",

        prescriptionInput : "Relationships %"

    }

}

/* ==========================================================================
   SPOKE 04
   Continues in Batch 3
   ========================================================================== */

/* ==========================================================================
   SPOKE 04
   CHARACTER™
   ========================================================================== */

,

{

    id : 4,

    key : "character",

    spoke : 4,

    tamilTitle : "நற்பண்பு™",

    englishTitle : "Character™",

    corePrinciple :

        "Character is revealed not by what we achieve, but by who we become.",

    introductionTa :

`உங்கள் வாழ்க்கையின் உண்மையான மதிப்பு,

நீங்கள் என்ன பெற்றுள்ளீர்கள் என்பதில் அல்ல;

நீங்கள் எப்படி வாழ்கிறீர்கள் என்பதில் உள்ளது.

இந்தப் பகுதி உங்கள் நேர்மை, பொறுப்பு,
ஒழுக்கம் மற்றும் நம்பகத்தன்மையைப் பற்றி
நேர்மையாக சிந்திக்க உதவுகிறது.`,

    introductionEn :

`Character is the invisible foundation upon which every meaningful life is built.

Integrity, honesty and responsibility determine the quality of every relationship and every achievement.

This section invites you to reflect honestly on the strength of your character.`,

    questions : [

        {

            id : 1,

            tamil :

            "யாரும் பார்க்காத நேரங்களிலும் நான் சரியானதைச் செய்ய முயல்கிறேன்.",

            english :

            "I strive to do what is right even when no one is watching."

        },

        {

            id : 2,

            tamil :

            "என் சொற்களுக்கும் செயல்களுக்கும் நான் முழுப் பொறுப்பேற்கிறேன்.",

            english :

            "I take responsibility for my words, actions and decisions."

        },

        {

            id : 3,

            tamil :

            "மற்றவர்கள் என்னை நேர்மையான மற்றும் நம்பகமான மனிதராகக் கருதுகிறார்கள்.",

            english :

            "Others would describe me as an honest and trustworthy person."

        }

    ],

    reflectionTa :

`நற்பண்பு என்பது நாம் சொல்லுவது அல்ல.

நாம் தொடர்ந்து செய்வதே
நமது நற்பண்பாகும்.`,

    reflectionEn :

`Character is not built by words.

It is revealed through consistent choices made every day.`,

    wisdomTa :

`நற்பண்பு உங்கள் மிகப்பெரிய செல்வம்.

அதை பாதுகாத்தால்,
வாழ்க்கை உங்களை உயர்த்தும்.`,

    wisdomEn :

`Character earns trust.

Trust opens doors.

Strong character creates a life of lasting significance.`,

    implementation : {

        maximumScore : 30,

        output : "Character Percentage",

        storedValue : "Character %",

        googleSheetColumn : "Character",

        kalaChakraSpoke : 4,

        diagnosisInput : "Character %",

        prescriptionInput : "Character %"

    }

}

/* ==========================================================================
   SPOKE 05
   FINANCIAL STEWARDSHIP™
   ========================================================================== */

,

{

    id : 5,

    key : "financial",

    spoke : 5,

    tamilTitle : "நிதி வளம்™",

    englishTitle : "Financial Stewardship™",

    corePrinciple :

        "Money is not the purpose of life, but it is an essential tool for living a life of dignity, freedom and contribution.",

    introductionTa :

`பணம் மகிழ்ச்சியை வாங்க முடியாது.

ஆனால் நிதி ஒழுங்கு மன அமைதியையும்
வாழ்க்கைத் தேர்வுகளுக்கான சுதந்திரத்தையும் வழங்குகிறது.

இந்தப் பகுதி உங்கள் நிதி நிலையைப் பற்றி
நேர்மையாக சிந்திக்க உதவுகிறது.`,

    introductionEn :

`Financial well-being is not measured merely by income.

It is reflected in how wisely you manage resources, plan for the future and create financial stability.

This section invites you to reflect honestly on your present financial health.`,

    questions : [

        {

            id : 1,

            tamil :

            "என் தற்போதைய வருமானம் என் அடிப்படைத் தேவைகளை நிம்மதியாக பூர்த்தி செய்கிறது.",

            english :

            "My current income comfortably supports my essential needs."

        },

        {

            id : 2,

            tamil :

            "நான் திட்டமிட்டு சேமித்து, செலவுகளை பொறுப்புடன் நிர்வகிக்கிறேன்.",

            english :

            "I manage my money responsibly through planning, saving and disciplined spending."

        },

        {

            id : 3,

            tamil :

            "எதிர்கால நிதி பாதுகாப்பிற்காக நான் தொடர்ந்து செயல்பட்டு வருகிறேன்.",

            english :

            "I am consistently building long-term financial security for myself and my family."

        }

    ],

    reflectionTa :

`நிதி சுதந்திரம் என்பது
அதிக பணம் வைத்திருப்பதல்ல.

பணத்தை அறிவுடன் நிர்வகிப்பதே
உண்மையான நிதி வளம்.`,

    reflectionEn :

`Financial freedom is not created by income alone.

It is created by wise stewardship of resources.`,

    wisdomTa :

`பணத்தை ஆளுங்கள்.

பணம் உங்களை ஆள விடாதீர்கள்.`,

    wisdomEn :

`Money is an excellent servant,
but a poor master.

Use it wisely to support a life of purpose and contribution.`,

    implementation : {

        maximumScore : 30,

        output : "Financial Percentage",

        storedValue : "Financial %",

        googleSheetColumn : "Financial",

        kalaChakraSpoke : 5,

        diagnosisInput : "Financial %",

        prescriptionInput : "Financial %"

    }

}

/* ==========================================================================
   SPOKE 06
   Continues in Batch 4
   ========================================================================== */

/* ==========================================================================
   SPOKE 06
   MIND & EMOTIONAL WELL-BEING™
   ========================================================================== */

,

{

    id : 6,

    key : "mind",

    spoke : 6,

    tamilTitle : "மனம் & உணர்வு நலம்™",

    englishTitle : "Mind & Emotional Well-Being™",

    corePrinciple :

        "The quality of your life is determined not only by what happens to you, but by how you respond to it.",

    introductionTa :

`வெளிப்புற வெற்றி மட்டுமே மகிழ்ச்சியைத் தராது.

உள்ளார்ந்த அமைதியும் உணர்ச்சி சமநிலையும் தான்
நிலையான நல்வாழ்வின் அடித்தளம்.

இந்தப் பகுதி உங்கள் மன அமைதியையும் உணர்ச்சி நலனையும்
நேர்மையாக மதிப்பிட உதவுகிறது.`,

    introductionEn :

`True well-being begins within.

A calm mind and balanced emotions help us face life's challenges with wisdom, courage and hope.

This section invites you to reflect honestly on your mental and emotional well-being.`,

    questions : [

        {

            id : 1,

            tamil :

            "பெரும்பாலான நாட்களில் நான் மன அமைதியுடனும் நம்பிக்கையுடனும் வாழ்கிறேன்.",

            english :

            "Most days I experience inner peace, optimism and emotional stability."

        },

        {

            id : 2,

            tamil :

            "சவால்களை சந்திக்கும் போது நான் அமைதியாக சிந்தித்து சரியான முடிவுகளை எடுக்கிறேன்.",

            english :

            "When facing challenges, I remain calm and respond thoughtfully rather than reacting impulsively."

        },

        {

            id : 3,

            tamil :

            "என் மனநலனையும் உணர்ச்சி சமநிலையையும் பாதுகாக்க நான் தொடர்ந்து முயற்சி செய்கிறேன்.",

            english :

            "I intentionally practise habits that strengthen my mental and emotional well-being."

        }

    ],

    reflectionTa :

`அமைதியான மனம்
வாழ்க்கையின் மிகப் பெரிய பலமாகும்.`,

    reflectionEn :

`Peace within creates strength beyond.

A healthy mind transforms the way we experience every area of life.`,

    wisdomTa :

`உள்ளத்தில் அமைதி இருந்தால்,

வாழ்க்கையில் தெளிவு பிறக்கும்.`,

    wisdomEn :

`A peaceful mind sees possibilities where an anxious mind sees only problems.`,

    implementation : {

        maximumScore : 30,

        output : "Mind Percentage",

        storedValue : "Mind %",

        googleSheetColumn : "Mind",

        kalaChakraSpoke : 6,

        diagnosisInput : "Mind %",

        prescriptionInput : "Mind %"

    }

}

/* ==========================================================================
   SPOKE 07
   GROWTH & LEARNING™
   ========================================================================== */

,

{

    id : 7,

    key : "learning",

    spoke : 7,

    tamilTitle : "வளர்ச்சி™",

    englishTitle : "Growth & Learning™",

    corePrinciple :

        "Life flourishes when learning never stops.",

    introductionTa :

`கற்றல் என்பது பள்ளியுடன் முடிவதில்லை.

வாழ்நாள் முழுவதும் வளர்ந்து கொண்டிருப்பவர்களே
நிறைவான வாழ்க்கையை உருவாக்குகிறார்கள்.

இந்தப் பகுதி உங்கள் வளர்ச்சி மனப்பான்மையை
பற்றி சிந்திக்க உதவுகிறது.`,

    introductionEn :

`Learning is a lifelong journey.

Every meaningful improvement in life begins with a willingness to grow.

This section invites you to reflect on your commitment to continuous learning and personal development.`,

    questions : [

        {

            id : 1,

            tamil :

            "புதிய விஷயங்களை கற்றுக்கொள்வதில் எனக்கு உண்மையான ஆர்வம் உள்ளது.",

            english :

            "I actively seek opportunities to learn new knowledge and skills."

        },

        {

            id : 2,

            tamil :

            "என் தவறுகளிலிருந்து நான் தொடர்ந்து கற்றுக்கொண்டு முன்னேறுகிறேன்.",

            english :

            "I learn from my mistakes and use them as opportunities to improve."

        },

        {

            id : 3,

            tamil :

            "ஒவ்வொரு ஆண்டும் நான் ஒரு சிறந்த மனிதராக மாறிக் கொண்டிருக்கிறேன்.",

            english :

            "Each year I am becoming a wiser, more capable and better version of myself."

        }

    ],

    reflectionTa :

`வளர்ச்சியை நிறுத்தும் தருணத்தில்
வாழ்க்கையும் நின்றுவிடுகிறது.`,

    reflectionEn :

`Growth is a lifelong choice.

The moment we stop learning,
we stop expanding our potential.`,

    wisdomTa :

`தொடர்ந்து கற்றுக்கொள்வோர்
தொடர்ந்து உயர்கிறார்கள்.`,

    wisdomEn :

`Every day is an opportunity to become a better version of yourself.

Small improvements create extraordinary lives.`,

    implementation : {

        maximumScore : 30,

        output : "Learning Percentage",

        storedValue : "Learning %",

        googleSheetColumn : "Learning",

        kalaChakraSpoke : 7,

        diagnosisInput : "Learning %",

        prescriptionInput : "Learning %"

    }

}

/* ==========================================================================
   SPOKE 08
   Continues in Batch 5
   ========================================================================== */

/* ==========================================================================
   SPOKE 08
   SELF-DISCIPLINE™
   ========================================================================== */

,

{

    id : 8,

    key : "discipline",

    spoke : 8,

    tamilTitle : "சுய ஒழுக்கம்™",

    englishTitle : "Self-Discipline™",

    corePrinciple :

        "Dreams become reality only through disciplined action.",

    introductionTa :

`வெற்றி என்பது ஒரே நாளில் நிகழ்வதில்லை.

சிறிய நல்ல பழக்கங்களை தொடர்ந்து கடைப்பிடிக்கும் வாழ்க்கை
மிகப்பெரிய மாற்றத்தை உருவாக்குகிறது.

இந்தப் பகுதி உங்கள் சுய ஒழுக்கத்தையும்
அன்றாட பழக்கங்களையும் பற்றி சிந்திக்க உதவுகிறது.`,

    introductionEn :

`Success is rarely the result of one extraordinary effort.

It is built through small, disciplined actions repeated consistently over time.

This section invites you to reflect honestly on your daily habits and self-discipline.`,

    questions : [

        {

            id : 1,

            tamil :

            "நான் திட்டமிட்ட செயல்களை தொடர்ந்து நிறைவேற்றுகிறேன்.",

            english :

            "I consistently follow through on the commitments I make to myself."

        },

        {

            id : 2,

            tamil :

            "என் நீண்டகால இலக்குகளுக்கு உதவும் நல்ல தினசரி பழக்கங்களை நான் கடைப்பிடிக்கிறேன்.",

            english :

            "I practise daily habits that move me steadily toward my long-term goals."

        },

        {

            id : 3,

            tamil :

            "சோம்பேறித்தனத்தையும் தள்ளிப்போடும் பழக்கத்தையும் நான் வெற்றிகரமாக கட்டுப்படுத்துகிறேன்.",

            english :

            "I successfully overcome procrastination and remain disciplined even when motivation is low."

        }

    ],

    reflectionTa :

`ஒழுக்கம் என்பது
சுதந்திரத்தை பறிப்பதல்ல.

அது சிறந்த எதிர்காலத்தை உருவாக்கும் சக்தியாகும்.`,

    reflectionEn :

`Discipline is not restriction.

It is the freedom to become the person you aspire to be.`,

    wisdomTa :

`சிறிய ஒழுக்கங்கள்,

பெரிய சாதனைகளை உருவாக்குகின்றன.`,

    wisdomEn :

`Consistency is more powerful than intensity.

Daily discipline creates extraordinary lives.`,

    implementation : {

        maximumScore : 30,

        output : "Discipline Percentage",

        storedValue : "Discipline %",

        googleSheetColumn : "Discipline",

        kalaChakraSpoke : 8,

        diagnosisInput : "Discipline %",

        prescriptionInput : "Discipline %"

    }

}

/* ==========================================================================
   SPOKE 09
   GRATITUDE & AWARENESS™
   ========================================================================== */

,

{

    id : 9,

    key : "gratitude",

    spoke : 9,

    tamilTitle : "நன்றியுணர்வு™",

    englishTitle : "Gratitude & Awareness™",

    corePrinciple :

        "Gratitude transforms the way we experience life.",

    introductionTa :

`நன்றியுணர்வு என்பது வாழ்க்கையை மாற்றும் மனப்பான்மை.

ஏற்கனவே நமக்குள்ள அருள்களை உணரும்போது,
வாழ்க்கையின் வளமும் மகிழ்ச்சியும் அதிகரிக்கின்றன.

இந்தப் பகுதி உங்கள் நன்றியுணர்வையும்
விழிப்புணர்வையும் பற்றி சிந்திக்க உதவுகிறது.`,

    introductionEn :

`Gratitude is one of the most powerful habits of a fulfilled life.

When we appreciate what we already have, our outlook becomes more hopeful, more peaceful and more joyful.

This section invites you to reflect on your practice of gratitude and awareness.`,

    questions : [

        {

            id : 1,

            tamil :

            "என் வாழ்க்கையில் கிடைத்த நல்லவற்றிற்கு நான் தொடர்ந்து நன்றியுணர்வுடன் இருக்கிறேன்.",

            english :

            "I regularly express gratitude for the blessings already present in my life."

        },

        {

            id : 2,

            tamil :

            "நிகழ்காலத்தில் விழிப்புணர்வுடன் வாழ நான் முயற்சி செய்கிறேன்.",

            english :

            "I consciously live in the present with awareness and appreciation."

        },

        {

            id : 3,

            tamil :

            "சிறிய மகிழ்ச்சிகளையும் வாழ்க்கையின் அர்த்தமுள்ள தருணங்களையும் நான் கவனித்து ரசிக்கிறேன்.",

            english :

            "I notice and appreciate the small moments that make life meaningful."

        }

    ],

    reflectionTa :

`நன்றியுணர்வு இல்லாத மனம்

எப்போதும் குறைகளைத் தேடும்.`,

    reflectionEn :

`Gratitude does not change our circumstances.

It changes the way we experience them.`,

    wisdomTa :

`நன்றியுணர்வுடன் வாழும் மனம்

எப்போதும் வளமாக இருக்கும்.`,

    wisdomEn :

`Gratitude turns what we have into enough,

and enough into abundance.`,

    implementation : {

        maximumScore : 30,

        output : "Gratitude Percentage",

        storedValue : "Gratitude %",

        googleSheetColumn : "Gratitude",

        kalaChakraSpoke : 9,

        diagnosisInput : "Gratitude %",

        prescriptionInput : "Gratitude %"

    }

}

/* ==========================================================================
   SPOKE 10
   Continues in Batch 6
   ========================================================================== */

/* ==========================================================================
   SPOKE 10
   CONTRIBUTION™
   ========================================================================== */

,

{

    id : 10,

    key : "contribution",

    spoke : 10,

    tamilTitle : "பங்களிப்பு™",

    englishTitle : "Contribution™",

    corePrinciple :

        "A truly successful life is measured not only by what we accumulate, but by what we contribute.",

    introductionTa :

`உண்மையான நிறைவு,

நாம் பெற்றதில் அல்ல;

நாம் பகிர்ந்ததில் உள்ளது.

இந்தப் பகுதி உங்கள் குடும்பம்,
சமூகம்,
மற்றும் உலகத்திற்கு நீங்கள் வழங்கும் பங்களிப்பைப் பற்றி
நேர்மையாக சிந்திக்க உதவுகிறது.`,

    introductionEn :

`A meaningful life extends beyond personal success.

It leaves a positive impact on people,
communities
and future generations.

This section invites you to reflect honestly on the contribution you are making through your life.`,

    questions : [

        {

            id : 1,

            tamil :

            "என் குடும்பம் அல்லது சமூகத்தின் வாழ்க்கையை மேம்படுத்த நான் தொடர்ந்து பங்களித்து வருகிறேன்.",

            english :

            "I actively contribute to improving the lives of my family or community."

        },

        {

            id : 2,

            tamil :

            "என் திறமைகளையும் அனுபவங்களையும் பிறருடன் பகிர்ந்து அவர்களின் வளர்ச்சிக்கு உதவுகிறேன்.",

            english :

            "I willingly share my knowledge, skills and experience to help others grow."

        },

        {

            id : 3,

            tamil :

            "என் வாழ்க்கை மற்றவர்களுக்கு ஒரு நல்ல மாற்றத்தை ஏற்படுத்துகிறது என்று நான் உணர்கிறேன்.",

            english :

            "I believe my life is making a meaningful positive difference in the lives of others."

        }

    ],

    reflectionTa :

`வாழ்க்கையின் மதிப்பு

நாம் எவ்வளவு பெற்றோம் என்பதில் இல்லை.

நாம் எவ்வளவு பகிர்ந்தோம் என்பதில் உள்ளது.`,

    reflectionEn :

`Contribution gives deeper meaning to success.

A life that uplifts others becomes a life well lived.`,

    wisdomTa :

`பங்களிப்பே

நிலைத்த நினைவுகளை உருவாக்குகிறது.`,

    wisdomEn :

`The greatest legacy is not what you own,

but the lives you help transform.`,

    implementation : {

        maximumScore : 30,

        output : "Contribution Percentage",

        storedValue : "Contribution %",

        googleSheetColumn : "Contribution",

        kalaChakraSpoke : 10,

        diagnosisInput : "Contribution %",

        prescriptionInput : "Contribution %"

    }

}

/* ==========================================================================
   SPOKE 11
   INNER MEANING™
   ========================================================================== */

,

{

    id : 11,

    key : "innerMeaning",

    spoke : 11,

    tamilTitle : "உள்ளார்ந்த அர்த்தம்™",

    englishTitle : "Inner Meaning™",

    corePrinciple :

        "A fulfilled life is rooted in inner alignment.",

    introductionTa :

`வெளிப்புற சாதனைகள் வாழ்க்கைக்கு மதிப்பைக் கொடுக்கலாம்.

ஆனால் உள்ளார்ந்த அர்த்தம்தான் வாழ்க்கைக்கு ஆழத்தை அளிக்கிறது.

இந்தப் பகுதி உங்கள் வாழ்க்கை உங்கள் மதிப்புகளுடனும்
உள்ளார்ந்த நம்பிக்கைகளுடனும் ஒத்திசைவாக உள்ளதா என்பதை
சிந்திக்க உதவுகிறது.`,

    introductionEn :

`A meaningful life begins within.

When our daily choices reflect our deepest values,
we experience greater peace,
purpose
and fulfilment.

This section invites you to reflect on your sense of inner meaning.`,

    questions : [

        {

            id : 1,

            tamil :

            "என் வாழ்க்கை என் முக்கியமான மதிப்புகளுடன் ஒத்திசைவாக உள்ளது.",

            english :

            "My daily life is aligned with my deepest personal values."

        },

        {

            id : 2,

            tamil :

            "நான் வாழும் வாழ்க்கை எனக்கு உள்ளார்ந்த அமைதியையும் நிறைவையும் அளிக்கிறது.",

            english :

            "The way I live gives me a deep sense of inner peace and fulfilment."

        },

        {

            id : 3,

            tamil :

            "சவால்கள் வந்தாலும் என் வாழ்க்கைக்கு அர்த்தம் உள்ளது என்று நான் நம்புகிறேன்.",

            english :

            "Even during difficult times, I continue to experience meaning and hope in my life."

        }

    ],

    reflectionTa :

`வாழ்க்கையின் ஆழம்

வெளிப்புற சாதனைகளால் அளவிடப்படுவதில்லை.`,

    reflectionEn :

`Meaning is discovered within,

not accumulated from outside.`,

    wisdomTa :

`உள்ளார்ந்த அர்த்தம் கொண்ட வாழ்க்கை

எந்த சூழலிலும் நிலைத்து நிற்கும்.`,

    wisdomEn :

`A meaningful life remains rich,

even when circumstances change.`,

    implementation : {

        maximumScore : 30,

        output : "Inner Meaning Percentage",

        storedValue : "Inner Meaning %",

        googleSheetColumn : "InnerMeaning",

        kalaChakraSpoke : 11,

        diagnosisInput : "Inner Meaning %",

        prescriptionInput : "Inner Meaning %"

    }

}

/* ==========================================================================
   SPOKE 12
   Continues in Batch 7
   ========================================================================== */


/* ==========================================================================
   SPOKE 12
   LEGACY™
   ========================================================================== */

,

{

    id : 12,

    key : "legacy",

    spoke : 12,

    tamilTitle : "மரபு™",

    englishTitle : "Legacy™",

    corePrinciple :

        "Every life leaves a legacy. The question is not whether we will leave one, but what kind of legacy we will leave.",

    introductionTa :

`நாம் வாழ்ந்த பிறகும்

நம் வாழ்க்கையின் தாக்கம் தொடரலாம்.

நாம் உலகிற்கு என்ன விட்டுச் செல்கிறோம் என்பதே
நமது மரபாகும்.

இந்தப் பகுதி நீங்கள் உருவாக்கிக் கொண்டிருக்கும்
மரபைப் பற்றி சிந்திக்க உதவுகிறது.`,

    introductionEn :

`Legacy is the lasting influence of a life well lived.

It is reflected in the people we inspire,
the values we uphold,
and the positive change we create.

This section invites you to reflect on the legacy you are building.`,

    questions : [

        {

            id : 1,

            tamil :

            "என் வாழ்க்கை அடுத்த தலைமுறைக்கு ஒரு நல்ல தாக்கத்தை ஏற்படுத்தும் என்று நான் நம்புகிறேன்.",

            english :

            "I believe my life will leave a positive impact on future generations."

        },

        {

            id : 2,

            tamil :

            "நான் வாழும் விதம் மற்றவர்களுக்கு ஒரு நல்ல முன்மாதிரியாக உள்ளது.",

            english :

            "The way I live serves as a positive example for others."

        },

        {

            id : 3,

            tamil :

            "என் வாழ்க்கை முடிவில் நான் அர்த்தமுள்ள வாழ்க்கையை வாழ்ந்தேன் என்று சொல்ல முடியும்.",

            english :

            "If my life ended today, I would feel that I have lived a meaningful and purposeful life."

        }

    ],

    reflectionTa :

`மரபு என்பது

நாம் விட்டுச் செல்லும் பொருளல்ல.

நாம் விட்டுச் செல்லும் தாக்கம்.`,

    reflectionEn :

`Legacy is measured not by possessions,

but by the positive influence we leave behind.`,

    wisdomTa :

`சிறந்த மரபு என்பது

மற்றவர்களின் வாழ்க்கையை
வளப்படுத்திய நினைவாகும்.`,

    wisdomEn :

`The greatest legacy is a life that continues to inspire long after it has ended.`,

    implementation : {

        maximumScore : 30,

        output : "Legacy Percentage",

        storedValue : "Legacy %",

        googleSheetColumn : "Legacy",

        kalaChakraSpoke : 12,

        diagnosisInput : "Legacy %",

        prescriptionInput : "Legacy %"

    }

}

    ]

};

/* ==========================================================================
   MASTER CONSTANTS
   ========================================================================== */

const AssessmentConstants = Object.freeze({

    TOTAL_PILLARS : 12,

    QUESTIONS_PER_PILLAR : 3,

    TOTAL_QUESTIONS : 36,

    MAX_RATING : 10,

    MIN_RATING : 1,

    MAXIMUM_SCORE_PER_PILLAR : 30,

    MAXIMUM_TOTAL_SCORE : 360

});


/* ==========================================================================
   RATING LEGEND
   ========================================================================== */

const RatingScale = Object.freeze([

    { value : 1, label : "Strongly Disagree" },

    { value : 2, label : "Very Low" },

    { value : 3, label : "Low" },

    { value : 4, label : "Below Average" },

    { value : 5, label : "Average" },

    { value : 6, label : "Fair" },

    { value : 7, label : "Good" },

    { value : 8, label : "Very Good" },

    { value : 9, label : "Excellent" },

    { value : 10, label : "Outstanding" }

]);


/* ==========================================================================
   COLOUR LOGIC
   ========================================================================== */

const RatingColours = Object.freeze({

    LOW : {

        minimum : 1,

        maximum : 3,

        cssClass : "active-low"

    },

    MEDIUM : {

        minimum : 4,

        maximum : 7,

        cssClass : "active-medium"

    },

    HIGH : {

        minimum : 8,

        maximum : 10,

        cssClass : "active-high"

    }

});


/* ==========================================================================
   Repository Helper Functions
   Continues in Batch 8
   ========================================================================== */


/* ==========================================================================
   REPOSITORY HELPERS
   ========================================================================== */

/**
 * Returns the complete repository.
 */

function getAssessmentRepository() {

    return AssessmentRepository;

}

/**
 * Returns all twelve pillars.
 */

function getAllPillars() {

    return AssessmentRepository.pillars;

}

/**
 * Returns one pillar by spoke number.
 */

function getPillarBySpoke(spokeNumber) {

    return AssessmentRepository.pillars.find(

        pillar => pillar.spoke === spokeNumber

    ) || null;

}

/**
 * Returns one pillar by key.
 */

function getPillarByKey(key) {

    return AssessmentRepository.pillars.find(

        pillar => pillar.key === key

    ) || null;

}

/**
 * Returns total pillars.
 */

function getTotalPillars() {

    return AssessmentRepository.totalPillars;

}

/**
 * Returns total questions.
 */

function getTotalQuestions() {

    return AssessmentConstants.TOTAL_QUESTIONS;

}

/**
 * Returns maximum score per pillar.
 */

function getMaximumScorePerPillar() {

    return AssessmentConstants.MAXIMUM_SCORE_PER_PILLAR;

}

/**
 * Returns maximum assessment score.
 */

function getMaximumAssessmentScore() {

    return AssessmentConstants.MAXIMUM_TOTAL_SCORE;

}


/* ==========================================================================
   RATING HELPERS
   ========================================================================== */

/**
 * Returns rating label.
 */

function getRatingLabel(value) {

    const rating = RatingScale.find(

        item => item.value === value

    );

    return rating ? rating.label : "";

}

/**
 * Returns colour class.
 */

function getRatingColour(value) {

    if (

        value >= RatingColours.LOW.minimum &&
        value <= RatingColours.LOW.maximum

    ) {

        return RatingColours.LOW.cssClass;

    }

    if (

        value >= RatingColours.MEDIUM.minimum &&
        value <= RatingColours.MEDIUM.maximum

    ) {

        return RatingColours.MEDIUM.cssClass;

    }

    return RatingColours.HIGH.cssClass;

}


/* ==========================================================================
   VALIDATION HELPERS
   ========================================================================== */

/**
 * Validates rating.
 */

function isValidRating(value) {

    return (

        Number.isInteger(value) &&

        value >= AssessmentConstants.MIN_RATING &&

        value <= AssessmentConstants.MAX_RATING

    );

}

/**
 * Validates spoke.
 */

function isValidSpoke(spoke) {

    return (

        Number.isInteger(spoke) &&

        spoke >= 1 &&

        spoke <= AssessmentConstants.TOTAL_PILLARS

    );

}

/**
 * Validates repository.
 */

function validateRepository() {

    return (

        AssessmentRepository.pillars.length ===
        AssessmentConstants.TOTAL_PILLARS

    );

}


/* ==========================================================================
   EXPORTS
   ========================================================================== */

window.AssessmentRepository = AssessmentRepository;

window.AssessmentConstants = AssessmentConstants;

window.RatingScale = RatingScale;

window.RatingColours = RatingColours;

window.getAssessmentRepository = getAssessmentRepository;

window.getAllPillars = getAllPillars;

window.getPillarBySpoke = getPillarBySpoke;

window.getPillarByKey = getPillarByKey;

window.getTotalPillars = getTotalPillars;

window.getTotalQuestions = getTotalQuestions;

window.getMaximumScorePerPillar = getMaximumScorePerPillar;

window.getMaximumAssessmentScore = getMaximumAssessmentScore;

window.getRatingLabel = getRatingLabel;

window.getRatingColour = getRatingColour;

window.isValidRating = isValidRating;

window.isValidSpoke = isValidSpoke;

window.validateRepository = validateRepository;


/* ==========================================================================
   LOCK VERIFICATION
   ========================================================================== */

Object.freeze(AssessmentConstants);

Object.freeze(RatingScale);

Object.freeze(RatingColours);


/* ==========================================================================
   End of File

   File   : assessmentData.js

   Version: 1.0

   Status : 🔒 LOCKED

   Source of Truth:
   CTM PATH™ Assessment Knowledge Base™ v1.0

   This repository contains:

   ✓ 12 Pillars
   ✓ 36 Questions
   ✓ 12 Introductions
   ✓ 12 Reflections
   ✓ 12 Wisdom Statements
   ✓ Rating Scale
   ✓ Colour Logic
   ✓ Repository Helpers
   ✓ Validation Helpers

   No rendering logic.
   No calculations.
   No DOM manipulation.
   No API calls.

   ========================================================================== */

