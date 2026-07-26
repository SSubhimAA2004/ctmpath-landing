
/* ==========================================================================
   CTM PATH™ Guided Journey

   File        : assessmentData.js
   Version     : 3.0
   Status      : 🔒 ASSESSMENT CONTENT DATABASE

   Purpose:

      Stores all 12 Assessment Pillars

   Owns:

      • Pillar Content
      • Questions
      • Reflection
      • Wisdom

   Owns NO:

      • Rendering
      • Storage
      • API
      • Navigation

   ========================================================================== */


"use strict";



const AssessmentRepository = {


    pillars : [


        /* ==========================================================
           SPOKE 01

           PURPOSE™

           ========================================================== */


        {

            spoke:1,


            titleTa:

                "நோக்கம்™",


            titleEn:

                "Purpose™",



            introductionTa:

                "உங்கள் வாழ்க்கையின் திசையை தெளிவாக அறியும் பயணம் இது. உங்கள் உள்ளார்ந்த நோக்கம், கனவுகள் மற்றும் வாழ்க்கையின் அர்த்தத்தை சிந்திக்க இந்த பகுதி உதவுகிறது.",



            introductionEn:

                "This journey helps you discover the clarity of your life's direction. Reflect on your inner purpose, dreams and the meaning you wish to create.",



            questions:[


                {

                    id:1,


                    textTa:

                        "உங்கள் வாழ்க்கையின் உண்மையான நோக்கம் என்ன என்பதை நீங்கள் தெளிவாக அறிந்திருக்கிறீர்களா?",


                    textEn:

                        "Do you have a clear understanding of your life's true purpose?"


                },


                {

                    id:2,


                    textTa:

                        "உங்கள் தினசரி செயல்கள் உங்கள் வாழ்க்கை நோக்கத்துடன் இணைந்துள்ளதா?",


                    textEn:

                        "Are your daily actions aligned with your life's purpose?"


                },


                {

                    id:3,


                    textTa:

                        "உங்கள் வாழ்க்கை எந்த திசையில் செல்ல வேண்டும் என்பது உங்களுக்கு தெளிவாக உள்ளதா?",


                    textEn:

                        "Are you clear about the direction your life should move towards?"


                }


            ],



            reflectionTa:

                "உங்கள் நோக்கம் தெளிவாகும் போது, உங்கள் முடிவுகளும் செயல்களும் புதிய அர்த்தம் பெறுகின்றன.",



            reflectionEn:

                "When your purpose becomes clear, your decisions and actions begin to carry deeper meaning.",



            wisdomTa:

                "நோக்கம் தெளிவான மனிதனுக்கு பாதை எப்போதும் தெளிவாகும்.",



            wisdomEn:

                "A person with a clear purpose always finds a clearer path."

        },


/* Continue in Batch 1B */

       /* ==========================================================
   SPOKE 02

   HEALTH™

   ========================================================== */


{

    spoke:2,


    titleTa:

        "உடல்நலம்™",


    titleEn:

        "Health™",



    introductionTa:

        "உங்கள் உடல் உங்கள் வாழ்க்கைப் பயணத்தின் அடித்தளம். உங்கள் உடல் ஆரோக்கியம், ஆற்றல் மற்றும் வாழ்க்கை முறையை சிந்திக்கும் பகுதி இது.",



    introductionEn:

        "Your body is the foundation of your life journey. Reflect on your health, energy and lifestyle choices.",



    questions:[


        {

            id:1,


            textTa:

                "எனது உடல் ஆரோக்கியத்தை நான் தொடர்ந்து கவனித்து வருகிறேன்.",


            textEn:

                "I consistently take care of my physical health."

        },


        {

            id:2,


            textTa:

                "எனது தினசரி பழக்கங்கள் எனக்கு அதிக ஆற்றலை வழங்குகின்றன.",


            textEn:

                "My daily habits provide me with greater energy."

        },


        {

            id:3,


            textTa:

                "ஆரோக்கியமான வாழ்க்கை முறைக்கு நான் முழுமையாக அர்ப்பணித்துள்ளேன்.",


            textEn:

                "I am committed to living a healthy lifestyle."

        }


    ],



    reflectionTa:

        "உங்கள் உடலை மதிப்பது, உங்கள் வாழ்க்கையை மதிப்பதற்கான முதல் படியாகும்.",



    reflectionEn:

        "Respecting your body is the first step towards respecting your life.",



    wisdomTa:

        "ஆரோக்கியமான உடல் உயர்ந்த வாழ்க்கைக்கு அடித்தளம்.",



    wisdomEn:

        "A healthy body is the foundation of a meaningful life."

},




/* ==========================================================
   SPOKE 03

   RELATIONSHIPS™

   ========================================================== */


{

    spoke:3,


    titleTa:

        "உறவுகள்™",


    titleEn:

        "Relationships™",



    introductionTa:

        "அன்பு, நம்பிக்கை மற்றும் புரிதல் ஆகியவை வாழ்க்கையின் முக்கிய செல்வங்கள்.",



    introductionEn:

        "Love, trust and understanding are among life's greatest treasures.",



    questions:[


        {

            id:1,


            textTa:

                "எனது முக்கியமான உறவுகளில் நான் அன்பையும் நேரத்தையும் வழங்குகிறேன்.",


            textEn:

                "I invest love and time in my important relationships."

        },


        {

            id:2,


            textTa:

                "நான் மற்றவர்களை கவனமாகக் கேட்டு புரிந்து கொள்கிறேன்.",


            textEn:

                "I listen and understand others with care."

        },


        {

            id:3,


            textTa:

                "எனது உறவுகள் எனக்கு மகிழ்ச்சியும் ஆதரவையும் வழங்குகின்றன.",


            textEn:

                "My relationships provide me with happiness and support."

        }


    ],



    reflectionTa:

        "உறவுகளின் தரம் வாழ்க்கையின் தரத்தை தீர்மானிக்கிறது.",



    reflectionEn:

        "The quality of your relationships shapes the quality of your life.",



    wisdomTa:

        "உண்மையான செல்வம் மனித உறவுகளில் உள்ளது.",



    wisdomEn:

        "True wealth exists in meaningful relationships."

},

/* Continue in Batch 1C */

       /* ==========================================================
   SPOKE 04

   CHARACTER™

   ========================================================== */


{

    spoke:4,


    titleTa:

        "குணநலம்™",


    titleEn:

        "Character™",



    introductionTa:

        "உங்கள் குணம், மதிப்புகள் மற்றும் நேர்மை உங்கள் வாழ்க்கையின் உண்மையான அடையாளத்தை உருவாக்குகின்றன.",



    introductionEn:

        "Your character, values and integrity define who you truly are.",



    questions:[


        {

            id:1,


            textTa:

                "எனது மதிப்புகளுக்கு ஏற்ப நான் வாழ்க்கையை நடத்துகிறேன்.",


            textEn:

                "I live according to my values."

        },


        {

            id:2,


            textTa:

                "சரியானதை செய்வதற்கு நான் உறுதியாக இருக்கிறேன்.",


            textEn:

                "I remain committed to doing what is right."

        },


        {

            id:3,


            textTa:

                "எனது வார்த்தைகளுக்கும் செயல்களுக்கும் இடையில் ஒற்றுமை உள்ளது.",


            textEn:

                "My words and actions are aligned."

        }


    ],



    reflectionTa:

        "உங்கள் குணமே உங்கள் வாழ்க்கையின் அடையாளம்.",



    reflectionEn:

        "Your character is the signature of your life.",



    wisdomTa:

        "நல்ல குணம் உயர்ந்த வாழ்க்கையை உருவாக்கும்.",



    wisdomEn:

        "Strong character creates an extraordinary life."

},





/* ==========================================================
   SPOKE 05

   FINANCIAL STABILITY & ABUNDANCE™

   ========================================================== */


{

    spoke:5,


    titleTa:

        "பொருளாதார நிலைத்தன்மை™",


    titleEn:

        "Financial Stability & Abundance™",



    introductionTa:

        "பணத்தைப் பற்றிய உங்கள் எண்ணங்கள், பழக்கங்கள் மற்றும் முடிவுகள் உங்கள் எதிர்காலத்தை உருவாக்குகின்றன.",



    introductionEn:

        "Your beliefs, habits and decisions about money shape your future.",



    questions:[


        {

            id:1,


            textTa:

                "எனது வருமானம் மற்றும் செலவுகளை நான் தெளிவாக நிர்வகிக்கிறேன்.",


            textEn:

                "I manage my income and expenses clearly."

        },


        {

            id:2,


            textTa:

                "எதிர்கால நிதி பாதுகாப்புக்காக நான் திட்டமிடுகிறேன்.",


            textEn:

                "I plan for my future financial security."

        },


        {

            id:3,


            textTa:

                "செல்வத்தை உருவாக்கும் வாய்ப்புகளை நான் தேடுகிறேன்.",


            textEn:

                "I actively seek opportunities to create wealth."

        }


    ],



    reflectionTa:

        "பணம் ஒரு கருவி; தெளிவான நோக்கத்துடன் பயன்படுத்தும் போது அது சுதந்திரத்தை உருவாக்குகிறது.",



    reflectionEn:

        "Money is a tool that creates freedom when guided by purpose.",



    wisdomTa:

        "நிதி ஒழுக்கம் எதிர்கால சுதந்திரத்தின் விதை.",



    wisdomEn:

        "Financial discipline is the seed of future freedom."

},





/* ==========================================================
   SPOKE 06

   MIND & EMOTIONAL WELL-BEING™

   ========================================================== */


{

    spoke:6,


    titleTa:

        "மனம் மற்றும் உணர்ச்சி நலம்™",


    titleEn:

        "Mind & Emotional Well-Being™",



    introductionTa:

        "உங்கள் மனநிலை, உணர்வுகளை கையாளும் திறன் மற்றும் உள்ளார்ந்த அமைதி உங்கள் வாழ்க்கை அனுபவத்தை தீர்மானிக்கின்றன.",



    introductionEn:

        "Your mindset, emotional awareness and inner peace shape your experience of life.",



    questions:[


        {

            id:1,


            textTa:

                "எனது உணர்வுகளை நான் புரிந்து கொண்டு கையாள முடிகிறது.",


            textEn:

                "I understand and manage my emotions effectively."

        },


        {

            id:2,


            textTa:

                "சவாலான சூழ்நிலைகளிலும் நான் அமைதியாக இருக்க முடிகிறது.",


            textEn:

                "I remain calm during challenging situations."

        },


        {

            id:3,


            textTa:

                "எனது மன வளர்ச்சிக்காக தொடர்ந்து முயற்சி செய்கிறேன்.",


            textEn:

                "I continuously work on my mental growth."

        }


    ],



    reflectionTa:

        "அமைதியான மனம் தெளிவான முடிவுகளை உருவாக்குகிறது.",



    reflectionEn:

        "A peaceful mind creates clearer decisions.",



    wisdomTa:

        "உள்ளார்ந்த அமைதி வெளிப்புற வெற்றிக்கான அடித்தளம்.",



    wisdomEn:

        "Inner peace is the foundation of outer success."

},

/* Continue in Batch 1D */

       /* ==========================================================
   SPOKE 07

   GROWTH & LEARNING MINDSET™

   ========================================================== */


{

    spoke:7,


    titleTa:

        "வளர்ச்சி மற்றும் கற்றல் மனப்பான்மை™",


    titleEn:

        "Growth & Learning Mindset™",



    introductionTa:

        "தொடர்ந்து கற்றுக்கொள்வதும் வளர்வதும் வாழ்க்கையின் முன்னேற்றத்திற்கான முக்கிய திறவுகோல்.",



    introductionEn:

        "Continuous learning and personal growth are the keys to lifelong progress.",



    questions:[


        {

            id:1,


            textTa:

                "புதிய விஷயங்களை கற்றுக்கொள்ள நான் தொடர்ந்து முயற்சி செய்கிறேன்.",


            textEn:

                "I continuously seek opportunities to learn new things."

        },


        {

            id:2,


            textTa:

                "சவால்களை வளர்ச்சிக்கான வாய்ப்புகளாக பார்க்கிறேன்.",


            textEn:

                "I see challenges as opportunities for growth."

        },


        {

            id:3,


            textTa:

                "எனது திறமைகளை மேம்படுத்த நான் நேரம் ஒதுக்குகிறேன்.",


            textEn:

                "I invest time in improving my skills."

        }


    ],



    reflectionTa:

        "கற்றல் நிற்கும் இடத்தில் வளர்ச்சியும் நிற்கிறது.",



    reflectionEn:

        "Where learning stops, growth stops.",



    wisdomTa:

        "வளர்ந்து கொண்டிருப்பதே வாழ்க்கையின் இயல்பு.",



    wisdomEn:

        "Growth is the natural rhythm of life."

},





/* ==========================================================
   SPOKE 08

   SELF-DISCIPLINE & DAILY HABITS™

   ========================================================== */


{

    spoke:8,


    titleTa:

        "சுய ஒழுக்கம் மற்றும் தினசரி பழக்கங்கள்™",


    titleEn:

        "Self-Discipline & Daily Habits™",



    introductionTa:

        "சிறிய தினசரி பழக்கங்கள் பெரிய வாழ்க்கை மாற்றங்களை உருவாக்குகின்றன.",



    introductionEn:

        "Small daily habits create powerful life transformations.",



    questions:[


        {

            id:1,


            textTa:

                "எனது இலக்குகளை அடைய நான் ஒழுக்கமான பழக்கங்களை பின்பற்றுகிறேன்.",


            textEn:

                "I follow disciplined habits to achieve my goals."

        },


        {

            id:2,


            textTa:

                "எனது நேரத்தை நான் திறமையாக பயன்படுத்துகிறேன்.",


            textEn:

                "I use my time effectively."

        },


        {

            id:3,


            textTa:

                "நான் தொடங்கிய செயல்களை முடிக்கும் பழக்கம் எனக்குள்ளது.",


            textEn:

                "I have the habit of completing what I start."

        }


    ],



    reflectionTa:

        "ஒழுக்கம் என்பது கனவுகளுக்கும் சாதனைகளுக்கும் இடையிலான பாலம்.",



    reflectionEn:

        "Discipline is the bridge between dreams and achievements.",



    wisdomTa:

        "தினசரி சிறிய செயல்கள் பெரிய வெற்றிகளை உருவாக்கும்.",



    wisdomEn:

        "Small daily actions create extraordinary results."

},





/* ==========================================================
   SPOKE 09

   GRATITUDE & AWARENESS™

   ========================================================== */


{

    spoke:9,


    titleTa:

        "நன்றியுணர்வு மற்றும் விழிப்புணர்வு™",


    titleEn:

        "Gratitude & Awareness™",



    introductionTa:

        "நன்றியுணர்வு வாழ்க்கையின் அழகை உணரச் செய்கிறது மற்றும் உள்ளார்ந்த மகிழ்ச்சியை வளர்க்கிறது.",



    introductionEn:

        "Gratitude helps you appreciate life and cultivate inner happiness.",



    questions:[


        {

            id:1,


            textTa:

                "எனது வாழ்க்கையில் உள்ள நல்ல விஷயங்களுக்கு நான் நன்றி கூறுகிறேன்.",


            textEn:

                "I regularly appreciate the blessings in my life."

        },


        {

            id:2,


            textTa:

                "தற்போதைய தருணத்தை முழுமையாக அனுபவிக்கிறேன்.",


            textEn:

                "I fully experience and appreciate the present moment."

        },


        {

            id:3,


            textTa:

                "எனது எண்ணங்கள் மற்றும் செயல்களில் விழிப்புணர்வுடன் இருக்கிறேன்.",


            textEn:

                "I remain aware of my thoughts and actions."

        }


    ],



    reflectionTa:

        "நன்றியுள்ள மனம் வாழ்க்கையில் நிறைவைக் காண்கிறது.",



    reflectionEn:

        "A grateful mind discovers abundance in life.",



    wisdomTa:

        "நன்றி உணர்வு மகிழ்ச்சியின் கதவைத் திறக்கிறது.",



    wisdomEn:

        "Gratitude opens the door to happiness."

},

/* Continue in Batch 1E */

       /* ==========================================================
   SPOKE 10

   CONTRIBUTION™

   ========================================================== */


{

    spoke:10,


    titleTa:

        "பங்களிப்பு™",


    titleEn:

        "Contribution™",



    introductionTa:

        "உங்கள் வாழ்க்கை மற்றவர்களின் வாழ்க்கையில் ஏற்படுத்தும் தாக்கத்தை சிந்திக்கும் பகுதி இது.",



    introductionEn:

        "Reflect on the positive impact your life creates in the lives of others.",



    questions:[


        {

            id:1,


            textTa:

                "மற்றவர்களின் வளர்ச்சிக்கும் நலனுக்கும் நான் பங்களிக்கிறேன்.",


            textEn:

                "I contribute to the growth and wellbeing of others."

        },


        {

            id:2,


            textTa:

                "எனது திறமைகளையும் அனுபவங்களையும் பகிர்ந்து கொள்கிறேன்.",


            textEn:

                "I share my talents and experiences with others."

        },


        {

            id:3,


            textTa:

                "உலகிற்கு ஒரு நல்ல மாற்றத்தை உருவாக்க விரும்புகிறேன்.",


            textEn:

                "I desire to create a positive change in the world."

        }


    ],



    reflectionTa:

        "உண்மையான நிறைவு என்பது நாம் பெறுவதில் அல்ல, நாம் வழங்குவதில் உள்ளது.",



    reflectionEn:

        "True fulfilment is found not only in what we receive, but in what we give.",



    wisdomTa:

        "பங்களிப்பு வாழ்க்கைக்கு ஆழமான அர்த்தத்தை தருகிறது.",



    wisdomEn:

        "Contribution gives life a deeper meaning."

},





/* ==========================================================
   SPOKE 11

   INNER MEANING™

   ========================================================== */


{

    spoke:11,


    titleTa:

        "உள்ளார்ந்த அர்த்தம்™",


    titleEn:

        "Inner Meaning™",



    introductionTa:

        "உங்கள் உள்ளார்ந்த அமைதி, நம்பிக்கைகள் மற்றும் வாழ்க்கையின் ஆழமான அர்த்தத்தை ஆராயும் பகுதி இது.",



    introductionEn:

        "Explore your inner peace, beliefs and the deeper meaning of your life.",



    questions:[


        {

            id:1,


            textTa:

                "எனது வாழ்க்கைக்கு ஆழமான அர்த்தம் உள்ளது என்று உணர்கிறேன்.",


            textEn:

                "I feel that my life has a deeper meaning."

        },


        {

            id:2,


            textTa:

                "எனது உள்ளார்ந்த அமைதியை வளர்க்க நேரம் ஒதுக்குகிறேன்.",


            textEn:

                "I make time to nurture my inner peace."

        },


        {

            id:3,


            textTa:

                "எனது வாழ்க்கை மதிப்புகளுடன் நான் இணைந்திருக்கிறேன்.",


            textEn:

                "I live aligned with my deeper values."

        }


    ],



    reflectionTa:

        "வெளிப்புற வெற்றியை விட உள்ளார்ந்த நிறைவு முக்கியமானது.",



    reflectionEn:

        "Inner fulfilment is more important than external success alone.",



    wisdomTa:

        "உள்ளத்தை அறிந்தவன் வாழ்க்கையை முழுமையாக வாழ்கிறான்.",



    wisdomEn:

        "One who understands oneself lives fully."

},





/* ==========================================================
   SPOKE 12

   LEGACY™

   ========================================================== */


{

    spoke:12,


    titleTa:

        "மரபுச் சுவடு™",


    titleEn:

        "Legacy™",



    introductionTa:

        "நீங்கள் உலகில் விட்டுச் செல்ல விரும்பும் தாக்கத்தையும் நினைவையும் சிந்திக்கும் இறுதி பகுதி.",



    introductionEn:

        "Reflect on the impact and memories you wish to leave behind.",



    questions:[


        {

            id:1,


            textTa:

                "எனது வாழ்க்கை ஒரு அர்த்தமுள்ள தாக்கத்தை உருவாக்குகிறது.",


            textEn:

                "My life creates a meaningful impact."

        },


        {

            id:2,


            textTa:

                "எதிர்கால தலைமுறைகளுக்கு நல்ல முன்மாதிரியாக இருக்க விரும்புகிறேன்.",


            textEn:

                "I aspire to be a positive example for future generations."

        },


        {

            id:3,


            textTa:

                "எனது வாழ்க்கையின் முடிவில் நான் பெருமைப்படும் பயணத்தை உருவாக்குகிறேன்.",


            textEn:

                "I am creating a journey I will be proud of."

        }


    ],



    reflectionTa:

        "நாம் வாழ்ந்த விதமே நாம் விட்டுச் செல்லும் உண்மையான மரபு.",



    reflectionEn:

        "The way we live becomes the true legacy we leave behind.",



    wisdomTa:

        "சிறந்த வாழ்க்கை ஒரு அழகான நினைவாக மாறும்.",



    wisdomEn:

        "A great life becomes a beautiful legacy."

}


       
