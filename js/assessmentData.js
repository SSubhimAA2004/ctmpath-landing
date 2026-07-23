
/*=============================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    FILE

    assessmentData.js

    PURPOSE

    Master Assessment Data

    RESPONSIBILITIES

    • Assessment Configuration
    • Scoring Configuration
    • Pillar Definitions
    • Reflection Statements
    • Assessment Statements

    VERSION

    1.0

=============================================================================*/

'use strict';

/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/

window.CTM = window.CTM || {};

/*=============================================================================
    MASTER ASSESSMENT
=============================================================================*/

CTM.assessment = {

    /*=========================================================================
        CONFIGURATION
    =========================================================================*/

    version : "1.0",

    totalPages : 18,

    totalPillars : 12,

    questionsPerPillar : 5,

    totalQuestions : 60,

    minimumScore : 1,

    maximumScore : 10,

    rawMaximumScore : 600,

    finalScore : 100,



    /*=========================================================================
        PILLARS
    =========================================================================*/

    pillars : [

    /*=========================================================================

        PILLAR 01

        PURPOSE™

    =========================================================================*/

    {

        id : 1,

        key : "purpose",

        page : 3,

        title : "PURPOSE™",

        tamilTitle : "வாழ்க்கையின் நோக்கம்™",

        reflection :

            "Your purpose is the compass that gives direction to every decision you make.",

        tamilReflection :

            "வாழ்க்கையின் தெளிவான நோக்கமே உங்கள் ஒவ்வொரு முடிவுக்கும் திசையைக் காட்டும் திசைகாட்டியாகும்.",



        questions : [

            {

                id : 1,

                tamil :

                "என் வாழ்க்கைக்கு தெளிவான நோக்கம் உள்ளது; அது என் தினசரி முடிவுகளை வழிநடத்துகிறது.",

                english :

                "I have a clear purpose that guides my daily decisions."

            },



            {

                id : 2,

                tamil :

                "நான் செய்யும் வேலை என் வாழ்க்கையின் நோக்கத்துடன் பொருந்துகிறது.",

                english :

                "My daily work is aligned with my life purpose."

            },



            {

                id : 3,

                tamil :

                "என் வாழ்க்கையின் நீண்டகால இலக்குகள் எனக்கு தெளிவாக உள்ளன.",

                english :

                "I have a clear long-term vision for my life."

            },



            {

                id : 4,

                tamil :

                "என் வாழ்க்கைக்கு உண்மையாக முக்கியமானவற்றிற்கு நான் தொடர்ந்து நேரம் ஒதுக்குகிறேன்.",

                english :

                "I consistently invest my time in what matters most."

            },



            {

                id : 5,

                tamil :

                "ஒவ்வொரு நாளும் நான் அர்த்தமுள்ள வாழ்க்கையை வாழ்கிறேன் என்ற உணர்வு எனக்கு உள்ளது.",

                english :

                "I feel that I live a meaningful life every day."

            }

        ]

    }

    ]

};

/*=============================================================================

    END OF BATCH 01

=============================================================================*/

    /*=========================================================================

        PILLAR 02

        HEALTH™

    =========================================================================*/

    ,

    {

        id : 2,

        key : "health",

        page : 4,

        title : "HEALTH™",

        tamilTitle : "ஆரோக்கியம்™",

        reflection :

            "Your health is the foundation that supports every dream, relationship, achievement and contribution in your life.",

        tamilReflection :

            "உங்கள் வாழ்க்கையின் ஒவ்வொரு கனவு, உறவு, சாதனை மற்றும் பங்களிப்பிற்கும் அடித்தளம் உங்கள் ஆரோக்கியமே.",

        questions : [

            {

                id : 1,

                tamil :

                "எனது உடல் ஆரோக்கியத்தை நான் தொடர்ந்து கவனித்து பராமரிக்கிறேன்.",

                english :

                "I consistently take care of my physical health."

            },

            {

                id : 2,

                tamil :

                "எனக்கு தினசரி பணிகளை உற்சாகமாகச் செய்ய போதுமான ஆற்றல் உள்ளது.",

                english :

                "I have enough energy to perform my daily activities enthusiastically."

            },

            {

                id : 3,

                tamil :

                "எனது உணவு மற்றும் வாழ்க்கை முறையில் ஆரோக்கியமான பழக்கங்களை நான் பின்பற்றுகிறேன்.",

                english :

                "I maintain healthy eating and lifestyle habits."

            },

            {

                id : 4,

                tamil :

                "எனது மனநிலையை அமைதியாகவும் சமநிலையுடனும் வைத்திருக்க முடிகிறது.",

                english :

                "I am able to maintain emotional balance and inner calm."

            },

            {

                id : 5,

                tamil :

                "நான் நீண்ட கால ஆரோக்கியமான வாழ்க்கையை உருவாக்கும் பழக்கங்களை வளர்த்துவருகிறேன்.",

                english :

                "I am building habits that support lifelong health."

            }

        ]

    },



    /*=========================================================================

        PILLAR 03

        RELATIONSHIPS™

    =========================================================================*/

    {

        id : 3,

        key : "relationships",

        page : 5,

        title : "RELATIONSHIPS™",

        tamilTitle : "உறவுகள்™",

        reflection :

            "The quality of your life is deeply influenced by the quality of your relationships.",

        tamilReflection :

            "உங்கள் வாழ்க்கையின் தரத்தை தீர்மானிப்பதில் உங்கள் உறவுகளின் தரம் மிக முக்கியமான பங்கு வகிக்கிறது.",

        questions : [

            {

                id : 1,

                tamil :

                "எனது குடும்பத்தினருடன் அன்பும் நம்பிக்கையும் நிறைந்த உறவை நான் பேணுகிறேன்.",

                english :

                "I maintain loving and trusting relationships with my family."

            },

            {

                id : 2,

                tamil :

                "மற்றவர்களின் கருத்துகளையும் உணர்வுகளையும் நான் மரியாதையுடன் கேட்கிறேன்.",

                english :

                "I listen to others with respect and empathy."

            },

            {

                id : 3,

                tamil :

                "எனது உறவுகளில் நேர்மையும் வெளிப்படைத்தன்மையும் உள்ளது.",

                english :

                "My relationships are built on honesty and openness."

            },

            {

                id : 4,

                tamil :

                "மற்றவர்களுடன் ஏற்படும் கருத்து வேறுபாடுகளை நான் முதிர்ச்சியுடன் கையாள்கிறேன்.",

                english :

                "I handle disagreements with maturity and respect."

            },

            {

                id : 5,

                tamil :

                "என் வாழ்க்கைப் பயணத்தில் என்னை ஊக்குவிக்கும் நல்ல உறவுகள் எனக்கு உள்ளன.",

                english :

                "I have positive relationships that encourage my personal growth."

            }

        ]

    }

    /*=========================================================================

        PILLAR 04

        CHARACTER™

    =========================================================================*/

    ,

    {

        id : 4,

        key : "character",

        page : 6,

        title : "CHARACTER™",

        tamilTitle : "குணநலம்™",

        reflection :

            "Your character determines how you think, decide, act and influence the world around you.",

        tamilReflection :

            "உங்கள் குணநலமே உங்கள் சிந்தனை, முடிவுகள், செயல்கள் மற்றும் உலகின் மீது ஏற்படுத்தும் தாக்கத்தை நிர்ணயிக்கிறது.",

        questions : [

            {

                id : 1,

                tamil :

                "என் வார்த்தைகளுக்கும் செயல்களுக்கும் நான் பொறுப்பேற்கிறேன்.",

                english :

                "I take responsibility for my words and actions."

            },

            {

                id : 2,

                tamil :

                "சூழ்நிலை எப்படியிருந்தாலும் நான் நேர்மையுடன் நடந்து கொள்கிறேன்.",

                english :

                "I choose honesty even when it is difficult."

            },

            {

                id : 3,

                tamil :

                "என் மதிப்புகளுக்கு ஏற்ப நான் தொடர்ந்து வாழ்கிறேன்.",

                english :

                "I consistently live according to my values."

            },

            {

                id : 4,

                tamil :

                "என் தவறுகளை ஒப்புக்கொண்டு அதிலிருந்து கற்றுக்கொள்கிறேன்.",

                english :

                "I acknowledge my mistakes and learn from them."

            },

            {

                id : 5,

                tamil :

                "மற்றவர்கள் என்னை நம்பகமான மனிதராக கருதுகிறார்கள்.",

                english :

                "Others see me as a trustworthy person."

            }

        ]

    },



    /*=========================================================================

        PILLAR 05

        LEARNING™

    =========================================================================*/

    {

        id : 5,

        key : "learning",

        page : 7,

        title : "LEARNING™",

        tamilTitle : "கற்றல்™",

        reflection :

            "Continuous learning is the foundation of continuous growth.",

        tamilReflection :

            "தொடர்ச்சியான கற்றலே தொடர்ச்சியான வளர்ச்சியின் அடித்தளமாகும்.",

        questions : [

            {

                id : 1,

                tamil :

                "புதிய விஷயங்களை கற்றுக்கொள்ள நான் தொடர்ந்து நேரம் ஒதுக்குகிறேன்.",

                english :

                "I consistently invest time in learning new things."

            },

            {

                id : 2,

                tamil :

                "என் அறிவையும் திறமைகளையும் மேம்படுத்த நான் முனைப்புடன் செயல்படுகிறேன்.",

                english :

                "I actively improve my knowledge and skills."

            },

            {

                id : 3,

                tamil :

                "பின்னூட்டங்களை ஏற்றுக்கொண்டு என்னை மேம்படுத்த பயன்படுத்துகிறேன்.",

                english :

                "I welcome feedback and use it to improve myself."

            },

            {

                id : 4,

                tamil :

                "என் அனுபவங்களிலிருந்து தொடர்ந்து பாடங்களை கற்றுக்கொள்கிறேன்.",

                english :

                "I regularly learn valuable lessons from my experiences."

            },

            {

                id : 5,

                tamil :

                "கற்றதை நடைமுறையில் செயல்படுத்துகிறேன்.",

                english :

                "I apply what I learn in my daily life."

            }

        ]

    }

    /*=========================================================================

        PILLAR 06

        CAREER™

    =========================================================================*/

    ,

    {

        id : 6,

        key : "career",

        page : 8,

        title : "CAREER™",

        tamilTitle : "தொழில் வளர்ச்சி™",

        reflection :

            "A fulfilling career is built through purpose, competence, continuous growth and meaningful contribution.",

        tamilReflection :

            "நோக்கம், திறன், தொடர்ச்சியான வளர்ச்சி மற்றும் அர்த்தமுள்ள பங்களிப்பு ஆகியவற்றின் மீது ஒரு சிறந்த தொழில் உருவாகிறது.",

        questions : [

            {

                id : 1,

                tamil :

                "எனது தொழில் அல்லது பணியின் திசை எனக்கு தெளிவாக உள்ளது.",

                english :

                "I have a clear direction for my career or profession."

            },

            {

                id : 2,

                tamil :

                "எனது தொழிலில் முன்னேற தேவையான திறன்களை தொடர்ந்து வளர்த்துக் கொள்கிறேன்.",

                english :

                "I continuously develop the skills needed to advance in my career."

            },

            {

                id : 3,

                tamil :

                "எனது பணிகளை தரமாகவும் பொறுப்புடனும் நிறைவேற்றுகிறேன்.",

                english :

                "I consistently perform my work with excellence and responsibility."

            },

            {

                id : 4,

                tamil :

                "புதிய வாய்ப்புகளை கண்டறிந்து பயன்படுத்துவதில் நான் முனைப்பாக இருக்கிறேன்.",

                english :

                "I proactively identify and pursue new career opportunities."

            },

            {

                id : 5,

                tamil :

                "எனது தொழில் மற்றவர்களுக்கு மதிப்பையும் எனக்கு நிறைவையும் அளிக்கிறது.",

                english :

                "My career creates value for others and fulfillment for me."

            }

        ]

    },



    /*=========================================================================

        PILLAR 07

        CASHFLOW™

    =========================================================================*/

    {

        id : 7,

        key : "cashflow",

        page : 9,

        title : "CASHFLOW™",

        tamilTitle : "பணப்புழக்கம்™",

        reflection :

            "Financial freedom begins with disciplined cashflow management rather than income alone.",

        tamilReflection :

            "நிதி சுதந்திரம் அதிக வருமானத்தால் அல்ல; ஒழுங்கான பணப்புழக்க மேலாண்மையால் தொடங்குகிறது.",

        questions : [

            {

                id : 1,

                tamil :

                "எனது மாதாந்திர வருமானம் மற்றும் செலவுகளை நான் தெளிவாக கண்காணிக்கிறேன்.",

                english :

                "I clearly monitor my monthly income and expenses."

            },

            {

                id : 2,

                tamil :

                "எனது வருமானத்தை விட குறைவாகச் செலவழிக்கும் பழக்கம் எனக்கு உள்ளது.",

                english :

                "I consistently spend less than I earn."

            },

            {

                id : 3,

                tamil :

                "எனது வருமானத்தில் ஒரு பகுதியை தொடர்ந்து சேமித்து முதலீடு செய்கிறேன்.",

                english :

                "I consistently save and invest a portion of my income."

            },

            {

                id : 4,

                tamil :

                "ஒரே வருமானத்தை மட்டும் சார்ந்து இல்லாமல் பல்வேறு வருமான வாய்ப்புகளை உருவாக்குகிறேன்.",

                english :

                "I actively build multiple sources of income."

            },

            {

                id : 5,

                tamil :

                "எனது பணப்புழக்கம் என் நீண்டகால வாழ்க்கை இலக்குகளை ஆதரிக்கிறது.",

                english :

                "My cashflow supports my long-term life goals."

            }

        ]

    }

    /*=========================================================================

        PILLAR 08

        TIME FREEDOM™

    =========================================================================*/

    ,

    {

        id : 8,

        key : "timeFreedom",

        page : 10,

        title : "TIME FREEDOM™",

        tamilTitle : "நேர சுதந்திரம்™",

        reflection :

            "Time is your most valuable asset. How you invest it determines the quality of your life.",

        tamilReflection :

            "நேரமே உங்கள் மிக மதிப்புமிக்க சொத்து. அதை நீங்கள் எவ்வாறு பயன்படுத்துகிறீர்கள் என்பதே உங்கள் வாழ்க்கையின் தரத்தை தீர்மானிக்கிறது.",

        questions : [

            {

                id : 1,

                tamil :

                "எனது நேரத்தை தெளிவான முன்னுரிமைகளின் அடிப்படையில் திட்டமிடுகிறேன்.",

                english :

                "I plan my time according to clear priorities."

            },

            {

                id : 2,

                tamil :

                "எனது முக்கியமான பணிகளை தாமதப்படுத்தாமல் தொடர்ந்து நிறைவேற்றுகிறேன்.",

                english :

                "I consistently complete my important tasks without unnecessary delay."

            },

            {

                id : 3,

                tamil :

                "எனது குடும்பம், ஆரோக்கியம் மற்றும் வளர்ச்சிக்காக போதுமான நேரம் ஒதுக்குகிறேன்.",

                english :

                "I allocate sufficient time for my family, health and personal growth."

            },

            {

                id : 4,

                tamil :

                "தேவையற்ற செயல்களில் நேரத்தை வீணாக்குவதை நான் கட்டுப்படுத்துகிறேன்.",

                english :

                "I effectively minimize time spent on unnecessary activities."

            },

            {

                id : 5,

                tamil :

                "எனது நேரத்தை நான் கட்டுப்படுத்துகிறேன்; நேரம் என்னை கட்டுப்படுத்தவில்லை.",

                english :

                "I am in control of my time rather than being controlled by it."

            }

        ]

    },



    /*=========================================================================

        PILLAR 09

        TRIBE™

    =========================================================================*/

    {

        id : 9,

        key : "tribe",

        page : 11,

        title : "TRIBE™",

        tamilTitle : "சமூக வட்டம்™",

        reflection :

            "The people around you influence your thinking, decisions, growth and future.",

        tamilReflection :

            "உங்களைச் சுற்றியுள்ள மனிதர்களே உங்கள் சிந்தனை, முடிவுகள், வளர்ச்சி மற்றும் எதிர்காலத்தை அதிகமாக பாதிக்கிறார்கள்.",

        questions : [

            {

                id : 1,

                tamil :

                "எனது வாழ்க்கை இலக்குகளை ஆதரிக்கும் நல்ல மனிதர்களுடன் நான் தொடர்ந்து பழகுகிறேன்.",

                english :

                "I consistently associate with people who support my life goals."

            },

            {

                id : 2,

                tamil :

                "மற்றவர்களின் வளர்ச்சிக்கும் வெற்றிக்கும் நான் மதிப்புள்ள பங்களிப்பு செய்கிறேன்.",

                english :

                "I make meaningful contributions to the growth and success of others."

            },

            {

                id : 3,

                tamil :

                "எனது தொடர்புகள் நம்பிக்கை, மரியாதை மற்றும் ஒத்துழைப்பின் மீது அமைந்துள்ளன.",

                english :

                "My relationships are built on trust, respect and collaboration."

            },

            {

                id : 4,

                tamil :

                "புதிய மற்றும் மதிப்புமிக்க தொடர்புகளை உருவாக்க நான் முனைப்புடன் செயல்படுகிறேன்.",

                english :

                "I actively build valuable new relationships and networks."

            },

            {

                id : 5,

                tamil :

                "நான் சேர்ந்திருக்கும் சமூக வட்டம் என் வாழ்க்கை முன்னேற்றத்தை ஊக்குவிக்கிறது.",

                english :

                "The community around me inspires and accelerates my personal growth."

            }

        ]

    }

    /*=========================================================================

        PILLAR 10

        AUTOMATION™

    =========================================================================*/

    ,

    {

        id : 10,

        key : "automation",

        page : 12,

        title : "AUTOMATION™",

        tamilTitle : "தன்னியக்க அமைப்பு™",

        reflection :

            "Systems and automation free your time, increase consistency and multiply your results.",

        tamilReflection :

            "சரியான அமைப்புகளும் தன்னியக்க முறைகளும் உங்கள் நேரத்தை விடுவித்து, செயல்திறனை அதிகரித்து, பலமடங்கு விளைவுகளை உருவாக்குகின்றன.",

        questions : [

            {

                id : 1,

                tamil :

                "எனது முக்கியமான பணிகளுக்கு நான் தெளிவான செயல்முறைகளை உருவாக்கியுள்ளேன்.",

                english :

                "I have clear systems for my important activities."

            },

            {

                id : 2,

                tamil :

                "மீண்டும் மீண்டும் செய்யப்படும் பணிகளை எளிமைப்படுத்தும் பழக்கம் எனக்கு உள்ளது.",

                english :

                "I simplify repetitive tasks whenever possible."

            },

            {

                id : 3,

                tamil :

                "தொழில்நுட்ப கருவிகளை பயன்படுத்தி எனது செயல்திறனை மேம்படுத்துகிறேன்.",

                english :

                "I use technology to improve my productivity."

            },

            {

                id : 4,

                tamil :

                "எனது பணிகள் என்னை சார்ந்து இல்லாமல் தொடர்ந்து நடைபெறும் அமைப்புகளை உருவாக்குகிறேன்.",

                english :

                "I build systems that continue to work without depending entirely on me."

            },

            {

                id : 5,

                tamil :

                "தன்னியக்க முறைகள் மூலம் எனது நேரத்தையும் ஆற்றலையும் மதிப்புள்ள செயல்களுக்கு பயன்படுத்துகிறேன்.",

                english :

                "Automation enables me to invest more time in high-value activities."

            }

        ]

    },



    /*=========================================================================

        PILLAR 11

        CONTRIBUTION™

    =========================================================================*/

    {

        id : 11,

        key : "contribution",

        page : 13,

        title : "CONTRIBUTION™",

        tamilTitle : "பங்களிப்பு™",

        reflection :

            "A meaningful life is measured not only by what you achieve, but by the value you create for others.",

        tamilReflection :

            "ஒரு அர்த்தமுள்ள வாழ்க்கை என்பது நீங்கள் அடைந்த வெற்றியால் மட்டுமல்ல; மற்றவர்களுக்கு நீங்கள் உருவாக்கும் மதிப்பாலும் அளவிடப்படுகிறது.",

        questions : [

            {

                id : 1,

                tamil :

                "எனது திறமைகளை மற்றவர்களின் நலனுக்காக பயன்படுத்துகிறேன்.",

                english :

                "I use my abilities to benefit other people."

            },

            {

                id : 2,

                tamil :

                "எனது குடும்பம், சமூகம் அல்லது பணியிடத்திற்கு தொடர்ந்து மதிப்புள்ள பங்களிப்பு செய்கிறேன்.",

                english :

                "I consistently contribute value to my family, community or workplace."

            },

            {

                id : 3,

                tamil :

                "மற்றவர்கள் வளரவும் வெற்றி பெறவும் நான் ஊக்குவிக்கிறேன்.",

                english :

                "I encourage others to grow and succeed."

            },

            {

                id : 4,

                tamil :

                "நான் செய்யும் செயல்கள் என்னைத் தாண்டி நேர்மறையான தாக்கத்தை உருவாக்குகின்றன.",

                english :

                "My actions create a positive impact beyond myself."

            },

            {

                id : 5,

                tamil :

                "என் வாழ்க்கை மற்றவர்களின் வாழ்க்கையில் அர்த்தமுள்ள மாற்றத்தை உருவாக்குகிறது.",

                english :

                "My life makes a meaningful difference in the lives of others."

            }

        ]

    },



    /*=========================================================================

        PILLAR 12

        VISION™

    =========================================================================*/

    {

        id : 12,

        key : "vision",

        page : 14,

        title : "VISION™",

        tamilTitle : "எதிர்காலக் காட்சி™",

        reflection :

            "A compelling vision inspires purposeful action today and creates a better tomorrow.",

        tamilReflection :

            "தெளிவான எதிர்காலக் காட்சியே இன்றைய அர்த்தமுள்ள செயல்களுக்கு ஊக்கமளித்து சிறந்த நாளையை உருவாக்குகிறது.",

        questions : [

            {

                id : 1,

                tamil :

                "எனது எதிர்கால வாழ்க்கையைப் பற்றிய தெளிவான காட்சி எனக்கு உள்ளது.",

                english :

                "I have a clear vision for my future."

            },

            {

                id : 2,

                tamil :

                "எனது நீண்டகால கனவுகளுக்காக நான் தொடர்ந்து செயல்படுகிறேன்.",

                english :

                "I consistently work towards my long-term dreams."

            },

            {

                id : 3,

                tamil :

                "சவால்கள் வந்தாலும் என் இலக்குகளில் உறுதியாக இருக்கிறேன்.",

                english :

                "I remain committed to my goals despite challenges."

            },

            {

                id : 4,

                tamil :

                "என் வாழ்க்கையின் எதிர்காலத்தை நான் திட்டமிட்டு உருவாக்குகிறேன்.",

                english :

                "I intentionally design the future I want to create."

            },

            {

                id : 5,

                tamil :

                "எனது எதிர்காலக் காட்சி தினமும் என்னை ஊக்குவிக்கிறது.",

                english :

                "My vision inspires me to take meaningful action every day."

            }

        ]

    }

    ]

};

/*=============================================================================

    END OF FILE

=============================================================================*/
