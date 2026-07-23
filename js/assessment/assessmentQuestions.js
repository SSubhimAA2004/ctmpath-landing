
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    assessmentQuestions.js

    Version
    1.0

    Purpose

    Master Question Database

    Responsibilities

    • Assessment Pillars
    • Reflection Copy
    • Question Library
    • Bilingual Content

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

/*=====================================================================

    QUESTION DATABASE

======================================================================*/

CTM.assessmentQuestions = {

    /*==================================================
    PURPOSE™

    Screen03

    ==================================================*/

    purpose:{

        id:'purpose',

        screen:'Screen03',

        title:'Purpose™',

        titleTamil:'வாழ்க்கை நோக்கம்™',

        icon:

            'assets/images/purpose.png',

        reflection:{

            tamil:

                'நீங்கள் தினமும் செய்கிற செயல்கள், நீங்கள் வாழ விரும்பும் வாழ்க்கையை நோக்கி உங்களை நகர்த்துகிறதா? அல்லது வெறும் வாழ்க்கையை நடத்துவதற்காக மட்டும் ஓடிக்கொண்டிருக்கிறீர்களா?',

            english:

                'Are your daily actions moving you toward the life you truly want to live, or are you simply moving through life without a clear direction?'

        },

        questions:[

            {

                id:'purpose_q1',

                number:1,

                tamil:

                    'என் வாழ்க்கையின் நோக்கம் என்ன என்பதை நான் தெளிவாக அறிந்திருக்கிறேன்.',

                english:

                    'I have a clear understanding of my life purpose.'

            },

            {

                id:'purpose_q2',

                number:2,

                tamil:

                    'என் தினசரி செயல்கள் என் நீண்டகால வாழ்க்கை இலக்குகளுடன் ஒத்துப்போகின்றன.',

                english:

                    'My daily actions are aligned with my long-term life goals.'

            },

            {

                id:'purpose_q3',

                number:3,

                tamil:

                    'நான் எடுக்கும் முக்கியமான முடிவுகள் என் வாழ்க்கை நோக்கத்தை அடிப்படையாகக் கொண்டவை.',

                english:

                    'The important decisions I make are guided by my life purpose.'

            },

            {

                id:'purpose_q4',

                number:4,

                tamil:

                    'என் வாழ்க்கை அர்த்தமுள்ளதாகவும் மதிப்புமிக்கதாகவும் இருப்பதாக நான் உணர்கிறேன்.',

                english:

                    'I feel that my life is meaningful and valuable.'

            },

            {

                id:'purpose_q5',

                number:5,

                tamil:

                    'என் வாழ்க்கை மூலம் உலகிற்கு ஒரு நேர்மறையான பங்களிப்பை செய்ய வேண்டும் என்ற தெளிவான விருப்பம் எனக்குள்ளது.',

                english:

                    'I have a clear desire to make a positive contribution to the world through my life.'

            }

        ]

    },



    /*==================================================
    HEALTH™

    Screen04

    ==================================================*/

    health:{

        id:'health',

        screen:'Screen04',

        title:'Health™',

        titleTamil:'உடல்நலம்™',

        icon:

            'assets/images/health.png',

        reflection:{

            tamil:

                'உங்கள் உடலும் மனமும் உங்கள் வாழ்க்கைப் பயணத்தின் அடித்தளம். இன்று நீங்கள் உங்கள் உடல்நலத்தை எவ்வாறு மதிப்பிடுகிறீர்கள்?',

            english:

                'Your body and mind are the foundation of your life journey. How would you honestly rate your health today?'

        },

        questions:[

            {

                id:'health_q1',

                number:1,

                tamil:

                    'என் தற்போதைய உடல்நலத்தில் நான் திருப்தியாக இருக்கிறேன்.',

                english:

                    'I am satisfied with my current physical health.'

            },

            {

                id:'health_q2',

                number:2,

                tamil:

                    'எனக்கு தினசரி தேவையான அளவு ஆற்றலும் உற்சாகமும் உள்ளது.',

                english:

                    'I have enough energy and vitality for my daily activities.'

            },

            {

                id:'health_q3',

                number:3,

                tamil:

                    'நான் ஒழுங்கான உடற்பயிற்சி அல்லது உடல் இயக்கத்தில் தொடர்ந்து ஈடுபடுகிறேன்.',

                english:

                    'I consistently engage in regular exercise or physical activity.'

            },

            {

                id:'health_q4',

                number:4,

                tamil:

                    'எனக்கு போதுமான தூக்கமும் ஓய்வும் கிடைக்கிறது.',

                english:

                    'I get adequate sleep and proper rest.'

            },

            {

                id:'health_q5',

                number:5,

                tamil:

                    'என் மனநலமும் உணர்ச்சி சமநிலையும் ஆரோக்கியமாக இருப்பதாக நான் உணர்கிறேன்.',

                english:

                    'I feel emotionally balanced and mentally healthy.'

            }

        ]

    },



    /*==================================================
    RELATIONSHIPS™

    Screen05

    ==================================================*/

    relationships:{

        id:'relationships',

        screen:'Screen05',

        title:'Relationships™',

        titleTamil:'உறவுகள்™',

        icon:

            'assets/images/relationships.png',

        reflection:{

            tamil:

                'வாழ்க்கையின் உண்மையான செல்வம் பணத்தில் அல்ல; அர்த்தமுள்ள உறவுகளில் உள்ளது. உங்கள் உறவுகளை இன்று நீங்கள் எவ்வாறு மதிப்பிடுகிறீர்கள்?',

            english:

                'The true wealth of life is not measured by money but by meaningful relationships. How would you rate yours today?'

        },

        questions:[

            {

                id:'relationships_q1',

                number:1,

                tamil:

                    'என் குடும்ப உறவுகளில் நான் மகிழ்ச்சியுடனும் திருப்தியுடனும் இருக்கிறேன்.',

                english:

                    'I am happy and satisfied with my family relationships.'

            },

            {

                id:'relationships_q2',

                number:2,

                tamil:

                    'எனக்கு ஆதரவாக இருக்கும் நம்பகமான நண்பர்கள் அல்லது உறவினர்கள் உள்ளனர்.',

                english:

                    'I have trusted friends or relatives who genuinely support me.'

            },


            {

                id:'relationships_q3',

                number:3,

                tamil:

                    'நான் மற்றவர்களுடன் திறந்த மனதுடன் மற்றும் நேர்மையாக தொடர்பு கொள்கிறேன்.',

                english:

                    'I communicate openly and honestly with the people around me.'

            },

            {

                id:'relationships_q4',

                number:4,

                tamil:

                    'மன்னிக்கவும், புரிந்துகொள்ளவும், உறவுகளை பாதுகாக்கவும் நான் முயற்சி செய்கிறேன்.',

                english:

                    'I make a conscious effort to forgive, understand and preserve my relationships.'

            },

            {

                id:'relationships_q5',

                number:5,

                tamil:

                    'என் வாழ்க்கையில் உள்ள முக்கியமான உறவுகள் எனக்கு மகிழ்ச்சியையும் அமைதியையும் அளிக்கின்றன.',

                english:

                    'The important relationships in my life bring me happiness and peace.'

            }

        ]

    },



    /*==================================================
    CHARACTER™

    Screen06

    ==================================================*/

    character:{

        id:'character',

        screen:'Screen06',

        title:'Character™',

        titleTamil:'குணநலம்™',

        icon:

            'assets/images/character.png',

        reflection:{

            tamil:

                'உங்கள் உண்மையான வெற்றி உங்கள் திறமையால் மட்டும் அல்ல; உங்கள் குணநலத்தாலும் தீர்மானிக்கப்படுகிறது. நீங்கள் உங்களை எப்படி மதிப்பிடுகிறீர்கள்?',

            english:

                'True success is determined not only by your abilities but also by your character. How would you honestly evaluate yourself?'

        },

        questions:[

            {

                id:'character_q1',

                number:1,

                tamil:

                    'நான் சொன்னதை நிறைவேற்றும் நம்பகமான மனிதராக இருக்கிறேன்.',

                english:

                    'I am a dependable person who keeps my promises.'

            },

            {

                id:'character_q2',

                number:2,

                tamil:

                    'யாரும் பார்க்காத நேரங்களிலும் நான் நேர்மையுடன் செயல்படுகிறேன்.',

                english:

                    'I act with honesty and integrity even when no one is watching.'

            },


            {

                id:'character_q3',

                number:3,

                tamil:

                    'என் தவறுகளை ஏற்றுக்கொண்டு அவற்றிலிருந்து கற்றுக்கொள்ள நான் தயாராக இருக்கிறேன்.',

                english:

                    'I willingly accept my mistakes and learn from them.'

            },

            {

                id:'character_q4',

                number:4,

                tamil:

                    'சிரமமான சூழ்நிலைகளிலும் நான் பொறுப்புடன் செயல்படுகிறேன்.',

                english:

                    'I act responsibly even during difficult situations.'

            },

            {

                id:'character_q5',

                number:5,

                tamil:

                    'என் வாழ்க்கை என் மதிப்புகளுக்கும் நெறிமுறைகளுக்கும் ஏற்ப அமைந்துள்ளது.',

                english:

                    'My life is aligned with my personal values and principles.'

            }

        ]

    },



    /*==================================================
    LEARNING™

    Screen07

    ==================================================*/

    learning:{

        id:'learning',

        screen:'Screen07',

        title:'Learning™',

        titleTamil:'கற்றல்™',

        icon:

            'assets/images/learning.png',

        reflection:{

            tamil:

                'உலகம் தொடர்ந்து மாறிக்கொண்டிருக்கிறது. தொடர்ந்து கற்றுக்கொள்பவர்களே தொடர்ந்து வளர்கிறார்கள். இன்று உங்கள் கற்றல் பயணத்தை நீங்கள் எவ்வாறு மதிப்பிடுகிறீர்கள்?',

            english:

                'The world is constantly changing. Those who continue to learn continue to grow. How would you honestly rate your learning journey today?'

        },

        questions:[

            {

                id:'learning_q1',

                number:1,

                tamil:

                    'புதிய விஷயங்களை கற்றுக்கொள்வதில் எனக்கு உண்மையான ஆர்வம் உள்ளது.',

                english:

                    'I genuinely enjoy learning new things.'

            },

            {

                id:'learning_q2',

                number:2,

                tamil:

                    'என் அறிவையும் திறமைகளையும் மேம்படுத்த நான் தொடர்ந்து நேரம் ஒதுக்குகிறேன்.',

                english:

                    'I consistently invest time in improving my knowledge and skills.'

            },


            {

                id:'learning_q3',

                number:3,

                tamil:

                    'என் வாழ்க்கை மற்றும் தொழிலுக்கு தேவையான புதிய திறன்களை தொடர்ந்து வளர்த்துக் கொள்கிறேன்.',

                english:

                    'I continuously develop new skills that improve my life and career.'

            },

            {

                id:'learning_q4',

                number:4,

                tamil:

                    'புத்தகங்கள், பயிற்சிகள் அல்லது வழிகாட்டிகளிடமிருந்து நான் தொடர்ந்து கற்றுக்கொள்கிறேன்.',

                english:

                    'I regularly learn from books, courses or mentors.'

            },

            {

                id:'learning_q5',

                number:5,

                tamil:

                    'கற்றவற்றை என் வாழ்க்கையில் நடைமுறைப்படுத்துகிறேன்.',

                english:

                    'I consistently apply what I learn in my daily life.'

            }

        ]

    },



    /*==================================================
    CAREER™

    Screen08

    ==================================================*/

    career:{

        id:'career',

        screen:'Screen08',

        title:'Career™',

        titleTamil:'தொழில் வளர்ச்சி™',

        icon:

            'assets/images/career.png',

        reflection:{

            tamil:

                'உங்கள் தொழில் என்பது வருமானம் ஈட்டும் ஒரு வழி மட்டுமல்ல. அது உங்கள் திறமைகளையும் உங்கள் மதிப்பையும் உலகிற்கு வெளிப்படுத்தும் ஒரு வாய்ப்பு.',

            english:

                'Your career is more than a source of income. It is a platform to express your talents and create value for the world.'

        },

        questions:[

            {

                id:'career_q1',

                number:1,

                tamil:

                    'என் தற்போதைய தொழில் அல்லது வேலை குறித்து நான் திருப்தியாக இருக்கிறேன்.',

                english:

                    'I am satisfied with my current career or profession.'

            },

            {

                id:'career_q2',

                number:2,

                tamil:

                    'என் திறமைகளுக்கு ஏற்ற வாய்ப்புகள் எனக்கு கிடைக்கின்றன.',

                english:

                    'I have opportunities that match my talents and abilities.'

            },

            {

                id:'career_q3',

                number:3,

                tamil:

                    'என் தொழிலில் தொடர்ந்து முன்னேற்றம் அடைந்து வருகிறேன்.',

                english:

                    'I am making consistent progress in my career.'

            },


            {

                id:'career_q4',

                number:4,

                tamil:

                    'என் தொழிலில் நான் தொடர்ந்து புதிய பொறுப்புகளையும் சவால்களையும் ஏற்றுக்கொள்கிறேன்.',

                english:

                    'I continuously take on new responsibilities and challenges in my career.'

            },

            {

                id:'career_q5',

                number:5,

                tamil:

                    'என் தொழில் என் வாழ்க்கை இலக்குகளை அடைய உதவுகிறது.',

                english:

                    'My career supports me in achieving my long-term life goals.'

            }

        ]

    },



    /*==================================================
    CASHFLOW™

    Screen09

    ==================================================*/

    cashflow:{

        id:'cashflow',

        screen:'Screen09',

        title:'Cashflow™',

        titleTamil:'பணப்புழக்கம்™',

        icon:

            'assets/images/cashflow.png',

        reflection:{

            tamil:

                'வருமானம் சம்பாதிப்பது மட்டும் போதாது. தொடர்ந்து வரும் பணப்புழக்கம்தான் நிதி சுதந்திரத்தின் அடித்தளம். உங்கள் தற்போதைய நிதி நிலையை நீங்கள் எவ்வாறு மதிப்பிடுகிறீர்கள்?',

            english:

                'Earning money alone is not enough. Consistent cashflow is the foundation of financial freedom. How would you rate your current financial situation?'

        },

        questions:[

            {

                id:'cashflow_q1',

                number:1,

                tamil:

                    'என் மாதாந்திர வருமானம் என் வாழ்க்கைத் தேவைகளை சௌகரியமாக பூர்த்தி செய்கிறது.',

                english:

                    'My monthly income comfortably meets my living expenses.'

            },

            {

                id:'cashflow_q2',

                number:2,

                tamil:

                    'எனக்கு ஒழுங்கையான சேமிப்பு மற்றும் முதலீட்டு பழக்கம் உள்ளது.',

                english:

                    'I have a consistent habit of saving and investing.'

            },

            {

                id:'cashflow_q3',

                number:3,

                tamil:

                    'ஒரே வருமானத்தை மட்டுமே சாராமல் பல வருமான வாய்ப்புகளை உருவாக்கி வருகிறேன்.',

                english:

                    'I am building multiple sources of income rather than depending on just one.'

            },

            {

                id:'cashflow_q4',

                number:4,

                tamil:

                    'என் பணத்தை திட்டமிட்டு நிர்வகிக்கிறேன்.',

                english:

                    'I manage my money with a clear financial plan.'

            },

            {

                id:'cashflow_q5',

                number:5,

                tamil:

                    'நிதி சுதந்திரத்தை அடைவதற்கான தெளிவான திட்டம் எனக்கு உள்ளது.',

                english:

                    'I have a clear plan for achieving financial freedom.'

            },


        ]

    },



    /*==================================================
    TIME FREEDOM™

    Screen10

    ==================================================*/

    timeFreedom:{

        id:'timeFreedom',

        screen:'Screen10',

        title:'Time Freedom™',

        titleTamil:'நேர சுதந்திரம்™',

        icon:

            'assets/images/timeFreedom.png',

        reflection:{

            tamil:

                'பணம் சம்பாதிப்பது முக்கியம். ஆனால் உங்கள் நேரத்தை நீங்கள் விரும்பியபடி பயன்படுத்த முடியாவிட்டால், அது உண்மையான சுதந்திரமல்ல. இன்று உங்கள் நேர சுதந்திரத்தை நீங்கள் எவ்வாறு மதிப்பிடுகிறீர்கள்?',

            english:

                'Earning money is important. But if you cannot control how you spend your time, true freedom remains out of reach. How would you rate your time freedom today?'

        },

        questions:[

            {

                id:'timeFreedom_q1',

                number:1,

                tamil:

                    'என் நாளை நான் திட்டமிட்டு நிர்வகிக்கிறேன்.',

                english:

                    'I plan and manage my day effectively.'

            },

            {

                id:'timeFreedom_q2',

                number:2,

                tamil:

                    'என் குடும்பம், உடல்நலம் மற்றும் தனிப்பட்ட வளர்ச்சிக்காக போதுமான நேரம் ஒதுக்குகிறேன்.',

                english:

                    'I dedicate sufficient time to my family, health and personal growth.'

            },

            {

                id:'timeFreedom_q3',

                number:3,

                tamil:

                    'என் வருமானம் முழுவதும் என் நேரத்தை விற்பதையே சார்ந்ததல்ல.',

                english:

                    'My income is not completely dependent on trading my time.'

            },

            {

                id:'timeFreedom_q4',

                number:4,

                tamil:

                    'என் நேரத்தை அதிக மதிப்புள்ள செயல்களில் செலவிடுகிறேன்.',

                english:

                    'I spend most of my time on activities that create meaningful value.'

            },

            {

                id:'timeFreedom_q5',

                number:5,

                tamil:

                    'எப்போது வேலை செய்ய வேண்டும், எப்போது ஓய்வெடுக்க வேண்டும் என்பதை நான் தேர்வு செய்யும் சுதந்திரம் எனக்கு உள்ளது.',

                english:

                    'I have the freedom to choose when to work and when to rest.'

            }

        ]

    },



    /*==================================================
    TRIBE™

    Screen11

    ==================================================*/

    tribe:{

        id:'tribe',

        screen:'Screen11',

        title:'Tribe™',

        titleTamil:'சமூக வலையமைப்பு™',

        icon:

            'assets/images/tribe.png',

        reflection:{

            tamil:

                'ஒரு மனிதன் தனியாக பெரிய சாதனைகளை உருவாக்க முடியாது. சரியான மனிதர்களுடன் இணைந்தால் வளர்ச்சி பல மடங்கு அதிகரிக்கும். உங்கள் சமூக வலையமைப்பை நீங்கள் எவ்வாறு மதிப்பிடுகிறீர்கள்?',

            english:

                'No one creates extraordinary success alone. Growth accelerates when you are surrounded by the right people. How would you rate your network today?'

        },

        questions:[

            {

                id:'tribe_q1',

                number:1,

                tamil:

                    'என்னை ஊக்குவிக்கும் மற்றும் முன்னேற்றம் காண விரும்பும் மனிதர்களுடன் நான் தொடர்பில் இருக்கிறேன்.',

                english:

                    'I regularly connect with people who inspire and encourage my growth.'

            },

            {

                id:'tribe_q2',

                number:2,

                tamil:

                    'தேவைப்படும் நேரத்தில் உதவி கேட்கவும் பெறவும் எனக்கு ஒரு வலுவான வலையமைப்பு உள்ளது.',

                english:

                    'I have a strong network that I can rely on when I need support.'

            },

            {

                id:'tribe_q3',

                number:3,

                tamil:

                    'நானும் மற்றவர்களின் வளர்ச்சிக்கு மதிப்புள்ள பங்களிப்பை செய்கிறேன்.',

                english:

                    'I actively contribute to the growth and success of others.'

            },

            {

                id:'tribe_q4',

                number:4,

                tamil:

                    'எனது வாழ்க்கை நோக்கத்துடன் ஒத்த எண்ணம் கொண்டவர்களுடன் நான் இணைந்து செயல்படுகிறேன்.',

                english:

                    'I collaborate with people who share similar values and life purpose.'

            },

            {

                id:'tribe_q5',

                number:5,

                tamil:

                    'எனது வெற்றியை வேகப்படுத்தும் ஒரு வலுவான சமூகத்தை நான் உருவாக்கி வருகிறேன்.',

                english:

                    'I am building a strong community that accelerates my success.'

            }

        ]

    },



    /*==================================================
    AUTOMATION™

    Screen12

    ==================================================*/

    automation:{

        id:'automation',

        screen:'Screen12',

        title:'Automation™',

        titleTamil:'தானியக்கம்™',

        icon:

            'assets/images/automation.png',

        reflection:{

            tamil:

                'உங்கள் நேரத்தையும் திறமையையும் பல மடங்கு அதிகரிப்பது தானியக்கத்தின் சக்தி. இன்று உங்கள் வாழ்க்கையிலும் தொழிலிலும் தானியக்கத்தை எவ்வாறு பயன்படுத்துகிறீர்கள்?',

            english:

                'Automation multiplies your time, effort and impact. How effectively are you using automation in your personal and professional life today?'

        },

        questions:[

            {

                id:'automation_q1',

                number:1,

                tamil:

                    'எனது தினசரி வேலைகளில் மீண்டும் மீண்டும் செய்யப்படும் செயல்களை எளிமைப்படுத்தி வருகிறேன்.',

                english:

                    'I simplify repetitive daily tasks wherever possible.'

            },

            {

                id:'automation_q2',

                number:2,

                tamil:

                    'டிஜிட்டல் கருவிகள் மற்றும் தொழில்நுட்பத்தை பயன்படுத்தி எனது உற்பத்தித்திறனை அதிகரிக்கிறேன்.',

                english:

                    'I use digital tools and technology to improve my productivity.'

            },

            {

                id:'automation_q3',

                number:3,

                tamil:

                    'எனது வருமானம் மற்றும் தொழிலை அதிகரிக்க தானியக்க முறைகளை பயன்படுத்துகிறேன்.',

                english:

                    'I use automation to improve my business and income.'

            },

            {

                id:'automation_q4',

                number:4,

                tamil:

                    'எனது நேரத்தை மிச்சப்படுத்தும் அமைப்புகளையும் செயல்முறைகளையும் உருவாக்கியுள்ளேன்.',

                english:

                    'I have created systems and processes that save my time.'

            },

            {

                id:'automation_q5',

                number:5,

                tamil:

                    'என்னுடைய இல்லாத நேரத்திலும் மதிப்பை உருவாக்கும் அமைப்புகளை உருவாக்கி வருகிறேன்.',

                english:

                    'I am building systems that continue creating value even when I am not actively working.'

            }

        ]

    }

};

/*==================================================
END OF FILE
==================================================*/
