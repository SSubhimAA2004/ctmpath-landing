
/* ==========================================================================
   CTM PATH™ Guided Journey

   FROM SURVIVAL TO LIVING™

   File        : assessmentData.js
   Version     : 5.0

   Status      : 🔒 KALA CHAKRA™ v3.0 KNOWLEDGE BASE

   Purpose:

       Assessment Content Repository

   Architecture:

       12 Pillars
            ↓
       36 Transformational Questions™
            ↓
       Life Alignment Score™
            ↓
       Learner → Leader → Legend™

   ========================================================================== */


"use strict";





/* ==========================================================================
   ASSESSMENT LEVEL CONFIGURATION
   ========================================================================== */


const LifeEvolutionLevels = {


    learner:{


        key:"LEARNER",


        tamil:"கற்றல் நிலை™",


        english:"Learner™",


        min:0,


        max:59,


        descriptionTa:


            "விழிப்புணர்வு மற்றும் வளர்ச்சியின் தொடக்க நிலை.",



        descriptionEn:


            "The beginning stage of awareness and personal growth."



    },





    leader:{


        key:"LEADER",


        tamil:"வழிநடத்தும் நிலை™",


        english:"Leader™",


        min:60,


        max:84,


        descriptionTa:


            "தன்னையும் தனது வாழ்க்கையையும் விழிப்புணர்வுடன் வழிநடத்தும் நிலை.",



        descriptionEn:


            "The stage of consciously leading your own life."



    },





    legend:{


        key:"LEGEND",


        tamil:"சாதனைச் சிகரம்™",


        english:"Legend™",


        min:85,


        max:100,


        descriptionTa:


            "நோக்கம், மதிப்புகள் மற்றும் செயல்களில் முழுமையான இணக்க நிலை.",



        descriptionEn:


            "The stage of deep alignment between purpose, values and actions."



    }



};








/* ==========================================================================
   ASSESSMENT REPOSITORY
   ========================================================================== */


const AssessmentRepository = {



    version:"3.0",



    titleTa:


        "மனித வளமையின் 12 தூண்கள்™",



    titleEn:


        "The 12 Pillars of Human Flourishing™",



    pillars:[





/* ==========================================================================
   SPOKE 01

   PURPOSE™

   ========================================================================== */


{

    id:1,


    spoke:1,


    key:"purpose",


    titleTa:


        "நோக்கம்™",



    titleEn:


        "Purpose™",



    coreQuestionTa:


        "நான் ஏன் இங்கு இருக்கிறேன்?",



    coreQuestionEn:


        "Why do I exist?",





    introductionTa:


        "உங்கள் வாழ்க்கையின் ஆழமான நோக்கத்தையும் அர்த்தத்தையும் கண்டறியும் முதல் பயணம்.",



    introductionEn:


        "The first journey of discovering the deeper purpose and meaning of your life.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "என் வாழ்க்கையின் ஆழமான நோக்கமும் அர்த்தமும் என்ன என்பது எனக்கு தெளிவாக உள்ளது.",



            textEn:


                "I have clarity about the deeper purpose and meaning of my life."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "என் வாழ்க்கை வெளிப்படுத்த விரும்பும் நோக்கத்துடன் என் தினசரி தேர்வுகள் இணைந்துள்ளன.",



            textEn:


                "My daily choices reflect the purpose I want my life to express."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "நான் வாழும் விதம் அர்த்தமுள்ள மற்றும் நிறைவான வாழ்க்கையை உருவாக்குகிறது.",



            textEn:


                "The way I live creates a meaningful and fulfilling life."



        }



    ],







    reflectionTa:


        "என் வாழ்க்கை நான் உள்ளுக்குள் விரும்பும் நோக்கத்தை உண்மையாக வெளிப்படுத்துகிறதா?",





    reflectionEn:


        "Is my current life expressing the purpose I truly desire?",






    wisdomTa:


        "தெளிவான நோக்கம் கொண்ட வாழ்க்கை, தெளிவான பாதையை உருவாக்குகிறது.",





    wisdomEn:


        "A life guided by clear purpose creates a clear path."



},




/* Continue in Batch 1B */

       /* ==========================================================================
   SPOKE 02

   VITALITY™

   ========================================================================== */


{

    id:2,


    spoke:2,


    key:"vitality",


    titleTa:


        "உயிர்ச்சக்தி™",



    titleEn:


        "Vitality™",





    coreQuestionTa:


        "என் சிறந்த வாழ்க்கையை வாழ எனக்கு தேவையான சக்தி உள்ளதா?",



    coreQuestionEn:


        "Do I have the energy to live my best life?",





    introductionTa:


        "உங்கள் உடலும் மனமும் உங்கள் வாழ்க்கைப் பயணத்தின் அடித்தளம் என்பதை உணர்ந்து, உயிர்ச்சக்தியை வளர்க்கும் பயணம்.",



    introductionEn:


        "A journey to recognize that your body and mind are the foundation of your life and to strengthen your vitality.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "எனது உடல் மற்றும் மன சக்தியே என் வாழ்க்கையின் அடித்தளம் என்பதை நான் புரிந்துகொள்கிறேன்.",



            textEn:


                "I understand that my physical and mental energy is the foundation of my life."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "எனது தினசரி வாழ்க்கை முறை தேர்வுகள் என் ஆரோக்கியத்தையும் உயிர்ச்சக்தியையும் ஆதரிக்கின்றன.",



            textEn:


                "My daily lifestyle choices support my health and vitality."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "என் வாழ்க்கை நோக்கத்திற்கான மதிப்புமிக்க கருவியாக என் உடலை தொடர்ந்து மதித்து பராமரிக்கிறேன்.",



            textEn:


                "I consistently treat my body as a valuable instrument for my life's mission."



        }



    ],





    reflectionTa:


        "என் வாழ்க்கையின் உயர்ந்த நோக்கத்தை நிறைவேற்ற என் உடலும் மனமும் தயாராக உள்ளதா?",





    reflectionEn:


        "Is my body and mind ready to support the highest purpose of my life?",





    wisdomTa:


        "உயிர்ச்சக்தி நிறைந்த உடல், உயர்ந்த வாழ்க்கையை உருவாக்கும் கருவியாகிறது.",





    wisdomEn:


        "A body filled with vitality becomes the instrument for a greater life."



},







/* ==========================================================================
   SPOKE 03

   LOVE & RELATIONSHIPS™

   ========================================================================== */


{

    id:3,


    spoke:3,


    key:"relationships",


    titleTa:


        "அன்பும் உறவுகளும்™",



    titleEn:


        "Love & Relationships™",





    coreQuestionTa:


        "நான் அர்த்தமுள்ள தொடர்புகளை உருவாக்குகிறேனா?",



    coreQuestionEn:


        "Am I creating meaningful connections?",





    introductionTa:


        "அன்பு, நம்பிக்கை மற்றும் பரஸ்பர வளர்ச்சி நிறைந்த உறவுகளை உருவாக்கும் பயணம்.",



    introductionEn:


        "A journey to create relationships filled with love, trust and mutual growth.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "நிறைவான வாழ்க்கையில் அன்பும் உறவுகளும் முக்கியமானவை என்பதை நான் புரிந்துகொள்கிறேன்.",



            textEn:


                "I understand the importance of love and relationships in a fulfilled life."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "நான் மதிக்கும் உறவுகளை என் தொடர்புகளும் செயல்களும் வலுப்படுத்துகின்றன.",



            textEn:


                "My communication and actions strengthen the relationships I value."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "நம்பிக்கை, அன்பு மற்றும் பரஸ்பர வளர்ச்சி நிறைந்த உறவுகளை நான் உருவாக்குகிறேன்.",



            textEn:


                "I create relationships filled with trust, love and mutual growth."



        }



    ],






    reflectionTa:


        "என் வாழ்க்கையில் நான் விரும்பும் அன்பையும் உறவுகளையும் நான் உருவாக்குகிறேனா?",





    reflectionEn:


        "Am I creating the love and relationships I truly desire in my life?",






    wisdomTa:


        "வாழ்க்கையின் உண்மையான செல்வம், நாம் உருவாக்கும் ஆழமான உறவுகளில் உள்ளது.",





    wisdomEn:


        "The true wealth of life is found in the meaningful relationships we create."



},




/* Continue in Batch 1C */

       /* ==========================================================================
   SPOKE 04

   CHARACTER & INTEGRITY™

   ========================================================================== */


{

    id:4,


    spoke:4,


    key:"character",


    titleTa:


        "நற்பண்பும் நேர்மையும்™",



    titleEn:


        "Character & Integrity™",





    coreQuestionTa:


        "நான் யாராக மாறிக்கொண்டிருக்கிறேன்?",



    coreQuestionEn:


        "Who am I becoming?",





    introductionTa:


        "உங்கள் மதிப்புகள், கொள்கைகள் மற்றும் செயல்களின் மூலம் உங்கள் உண்மையான குணத்தை உருவாக்கும் பயணம்.",



    introductionEn:


        "A journey of building your true character through your values, principles and actions.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "என்னை வரையறுக்கும் மதிப்புகளும் கொள்கைகளும் எனக்கு தெளிவாக உள்ளன.",



            textEn:


                "I am clear about the values and principles that define who I am."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "எனது செயல்கள் தொடர்ந்து என் ஆழமான மதிப்புகளை பிரதிபலிக்கின்றன.",



            textEn:


                "My actions consistently reflect my deepest values."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "நேர்மை, பொறுப்பு மற்றும் நம்பகத்தன்மை கொண்ட மனிதராக நான் அறியப்படுகிறேன்.",



            textEn:


                "I am known as a person of integrity, responsibility and trust."



        }



    ],





    reflectionTa:


        "என் செயல்கள் நான் நம்பும் மதிப்புகளை உண்மையாக பிரதிபலிக்கின்றனவா?",





    reflectionEn:


        "Do my actions truly reflect the values I believe in?",






    wisdomTa:


        "உங்கள் குணமே உங்கள் வாழ்க்கையின் உண்மையான அடித்தளம்.",





    wisdomEn:


        "Your character is the true foundation of your life."



},







/* ==========================================================================
   SPOKE 05

   FINANCIAL FREEDOM™

   ========================================================================== */


{

    id:5,


    spoke:5,


    key:"financialFreedom",


    titleTa:


        "நிதி சுதந்திரம்™",



    titleEn:


        "Financial Freedom™",





    coreQuestionTa:


        "ஞானமான நிர்வாகத்தின் மூலம் நான் சுதந்திரத்தை உருவாக்குகிறேனா?",



    coreQuestionEn:


        "Am I creating freedom through wise stewardship?",





    introductionTa:


        "பணத்தை ஒரு கருவியாக பயன்படுத்தி பாதுகாப்பு, சுதந்திரம் மற்றும் வளத்தை உருவாக்கும் பயணம்.",



    introductionEn:


        "A journey of using money as a tool to create security, freedom and abundance.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "பணத்துடனான எனது உறவையும் என் வாழ்க்கையில் அதன் பங்கையும் நான் புரிந்துகொள்கிறேன்.",



            textEn:


                "I understand my relationship with money and its role in my life."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "எனது நிதி முடிவுகள் என் எதிர்கால இலக்குகளுக்கும் பொறுப்புகளுக்கும் ஆதரவாக உள்ளன.",



            textEn:


                "My financial decisions support my future goals and responsibilities."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "நான் நிதி பாதுகாப்பு, சுதந்திரம் மற்றும் வளத்தை உருவாக்கிக் கொண்டிருக்கிறேன்.",



            textEn:


                "I am building financial security, freedom and abundance."



        }



    ],






    reflectionTa:


        "எனது பண மேலாண்மை என் விரும்பும் வாழ்க்கை சுதந்திரத்தை உருவாக்குகிறதா?",





    reflectionEn:


        "Is my relationship with money creating the freedom I desire?",






    wisdomTa:


        "பணம் ஒரு இலக்கு அல்ல; அது அர்த்தமுள்ள வாழ்க்கையை உருவாக்கும் ஒரு கருவி.",





    wisdomEn:


        "Money is not the destination; it is a tool for creating a meaningful life."



},




/* Continue in Batch 1D */

       /* ==========================================================================
   SPOKE 06

   INNER PEACE™

   ========================================================================== */


{

    id:6,


    spoke:6,


    key:"innerPeace",


    titleTa:


        "உள்ளமைதி™",



    titleEn:


        "Inner Peace™",





    coreQuestionTa:


        "என்னையே நான் ஆள முடியுமா?",



    coreQuestionEn:


        "Can I master myself?",





    introductionTa:


        "உங்கள் எண்ணங்கள், உணர்வுகள் மற்றும் உள்ளார்ந்த நிலையை புரிந்து கொண்டு உங்களை நீங்களே வழிநடத்தும் பயணம்.",



    introductionEn:


        "A journey of understanding your thoughts, emotions and inner world to master yourself.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "என் எண்ணங்கள், உணர்வுகள் மற்றும் உள்ளார்ந்த வடிவங்களை நான் புரிந்துகொள்கிறேன்.",



            textEn:


                "I understand my thoughts, emotions and inner patterns."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "வாழ்க்கையின் சவால்களுக்கு நான் அளிக்கும் பதில்கள் உணர்ச்சி ஞானத்தை பிரதிபலிக்கின்றன.",



            textEn:


                "My responses to life's challenges reflect emotional wisdom."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "நான் உள்ளார்ந்த அமைதி, மன உறுதி மற்றும் சமநிலையுடன் வாழ்கிறேன்.",



            textEn:


                "I live with inner calm, resilience and peace."



        }



    ],





    reflectionTa:


        "வெளிப்புற சூழ்நிலைகளை விட என் உள்ளார்ந்த நிலையை நான் வழிநடத்துகிறேனா?",





    reflectionEn:


        "Am I able to guide my inner state beyond external circumstances?",






    wisdomTa:


        "தன்னை வென்றவன் வாழ்க்கையின் சவால்களை வெல்லும் வலிமையை பெறுகிறான்.",





    wisdomEn:


        "One who masters oneself gains the strength to master life's challenges."



},







/* ==========================================================================
   SPOKE 07

   GROWTH & MASTERY™

   ========================================================================== */


{

    id:7,


    spoke:7,


    key:"growthMastery",


    titleTa:


        "வளர்ச்சியும் மேன்மையும்™",



    titleEn:


        "Growth & Mastery™",





    coreQuestionTa:


        "நான் ஒவ்வொரு நாளும் சிறந்த மனிதராக மாறிக்கொண்டிருக்கிறேனா?",



    coreQuestionEn:


        "Am I becoming better every day?",





    introductionTa:


        "தொடர்ந்து கற்றல், வளர்ச்சி மற்றும் திறன் மேம்பாட்டின் மூலம் உங்கள் உயர்ந்த திறனை வெளிப்படுத்தும் பயணம்.",



    introductionEn:


        "A journey of continuous learning, growth and mastery to express your highest potential.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "வாழ்நாள் முழுவதும் கற்றல் என் வளர்ச்சிக்கு அத்தியாவசியமானது என்பதை நான் உணர்கிறேன்.",



            textEn:


                "I recognize that lifelong learning is essential for growth."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "என்னை மேம்படுத்துவதற்காக நான் தொடர்ந்து நேரத்தையும் முயற்சியையும் முதலீடு செய்கிறேன்.",



            textEn:


                "I actively invest time and effort in improving myself."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "எனது உயர்ந்த திறனை நோக்கி நான் தொடர்ந்து வளர்ந்து கொண்டிருக்கிறேன்.",



            textEn:


                "I continuously evolve toward my highest potential."



        }



    ],






    reflectionTa:


        "நான் நேற்று இருந்த என்னைவிட இன்று சிறந்த மனிதராக மாறிக்கொண்டிருக்கிறேனா?",





    reflectionEn:


        "Am I becoming a better version of myself compared to who I was yesterday?",






    wisdomTa:


        "தொடர்ச்சியான வளர்ச்சியே மனிதனின் உயர்ந்த பயணமாகும்.",





    wisdomEn:


        "Continuous growth is the highest journey of human evolution."



},




/* Continue in Batch 1E */

       /* ==========================================================================
   SPOKE 08

   DISCIPLINE & HABITS™

   ========================================================================== */


{

    id:8,


    spoke:8,


    key:"disciplineHabits",


    titleTa:


        "ஒழுக்கமும் பழக்கங்களும்™",



    titleEn:


        "Discipline & Habits™",





    coreQuestionTa:


        "எனது எண்ணங்களை செயல்களாக மாற்ற முடியுமா?",



    coreQuestionEn:


        "Can I transform intention into action?",





    introductionTa:


        "உங்கள் எண்ணங்கள் மற்றும் கனவுகளை தொடர்ந்து செயல்படும் பழக்கங்களாக மாற்றும் பயணம்.",



    introductionEn:


        "A journey of transforming your intentions and dreams into consistent actions and habits.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "எனது பழக்கங்களே எனது எதிர்காலத்தை உருவாக்குகின்றன என்பதை நான் புரிந்துகொள்கிறேன்.",



            textEn:


                "I understand that my habits shape my destiny."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "எனது தினசரி நடைமுறைகள் என் இலக்குகளுக்கும் மதிப்புகளுக்கும் ஆதரவாக உள்ளன.",



            textEn:


                "My daily routines support my goals and values."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "எனது வெற்றிக்குத் தேவையான செயல்களை நான் தொடர்ந்து செயல்படுத்துகிறேன்.",



            textEn:


                "I consistently execute the actions required for my success."



        }



    ],






    reflectionTa:


        "என் கனவுகளுக்கும் இலக்குகளுக்கும் தேவையான செயல்களை நான் தொடர்ந்து செய்கிறேனா?",





    reflectionEn:


        "Am I consistently taking the actions required for my dreams and goals?",






    wisdomTa:


        "சிறிய ஒழுக்கமான செயல்கள் பெரிய வாழ்க்கை மாற்றங்களை உருவாக்குகின்றன.",





    wisdomEn:


        "Small disciplined actions create extraordinary life transformations."



},







/* ==========================================================================
   SPOKE 09

   GRATITUDE & PRESENCE™

   ========================================================================== */


{

    id:9,


    spoke:9,


    key:"gratitudePresence",


    titleTa:


        "நன்றியுணர்வும் விழிப்புணர்வும்™",



    titleEn:


        "Gratitude & Presence™",





    coreQuestionTa:


        "நான் வாழ்க்கையை முழுமையாக அனுபவிக்கிறேனா?",



    coreQuestionEn:


        "Can I fully experience life?",





    introductionTa:


        "நிகழ்காலத்தை உணர்ந்து, வாழ்க்கையின் அருமையை நன்றியுடன் அனுபவிக்கும் பயணம்.",



    introductionEn:


        "A journey of experiencing the present moment and appreciating the beauty of life with gratitude.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "என் வாழ்க்கையில் ஏற்கனவே இருக்கும் ஆசீர்வாதங்களை நான் உணர்ந்து மதிக்கிறேன்.",



            textEn:


                "I recognize and appreciate the blessings already present in my life."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "எனது தினசரி வாழ்க்கையில் நன்றியுணர்வையும் நிகழ்கால விழிப்புணர்வையும் நான் தேர்ந்தெடுக்கிறேன்.",



            textEn:


                "I consciously choose gratitude and presence in my daily living."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "சாதாரணமான தருணங்களையும் மகிழ்ச்சியுடனும் விழிப்புணர்வுடனும் நான் அனுபவிக்கிறேன்.",



            textEn:


                "I experience ordinary moments with joy and awareness."



        }



    ],






    reflectionTa:


        "நான் இப்போதுள்ள வாழ்க்கை தருணங்களை முழுமையாக அனுபவிக்கிறேனா?",





    reflectionEn:


        "Am I fully experiencing and appreciating the moments of my life today?",






    wisdomTa:


        "நன்றியுணர்வு சாதாரண வாழ்க்கை தருணங்களையும் அரிய அனுபவங்களாக மாற்றுகிறது.",





    wisdomEn:


        "Gratitude transforms ordinary moments into extraordinary experiences."



},




/* Continue in Batch 1F */

       /* ==========================================================================
   SPOKE 10

   CONTRIBUTION & SERVICE™

   ========================================================================== */


{

    id:10,


    spoke:10,


    key:"contributionService",


    titleTa:


        "பங்களிப்பும் சேவையும்™",



    titleEn:


        "Contribution & Service™",





    coreQuestionTa:


        "இந்த உலகில் நான் என்ன மாற்றத்தை உருவாக்குகிறேன்?",



    coreQuestionEn:


        "What difference do I make?",





    introductionTa:


        "உங்கள் திறமைகள், நேரம் மற்றும் வளங்களை பயன்படுத்தி உலகிற்கு அர்த்தமுள்ள பங்களிப்பை உருவாக்கும் பயணம்.",



    introductionEn:


        "A journey of using your talents, time and resources to create meaningful contribution to the world.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "என் வாழ்க்கை மற்றவர்களின் வாழ்க்கையில் நேர்மறையான தாக்கத்தை ஏற்படுத்தும் சக்தி கொண்டது என்பதை நான் புரிந்துகொள்கிறேன்.",



            textEn:


                "I understand that my life has the power to positively impact others."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "எனது திறமைகளையும் வளங்களையும் அர்த்தமுள்ள பங்களிப்பிற்காக பயன்படுத்துகிறேன்.",



            textEn:


                "My talents and resources are directed toward meaningful contribution."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "என் வாழ்க்கை என்னைத் தாண்டி மதிப்பையும் நன்மையையும் உருவாக்குகிறது.",



            textEn:


                "My life creates value beyond myself."



        }



    ],






    reflectionTa:


        "என் வாழ்க்கை என்னைத் தாண்டி மற்றவர்களுக்கு நல்ல தாக்கத்தை உருவாக்குகிறதா?",





    reflectionEn:


        "Is my life creating a positive impact beyond myself?",






    wisdomTa:


        "உண்மையான வெற்றி என்பது நம்மைத் தாண்டி மற்றவர்களின் வாழ்க்கையை உயர்த்துவதில் உள்ளது.",





    wisdomEn:


        "True success is found in elevating the lives of others beyond ourselves."



},







/* ==========================================================================
   SPOKE 11

   SPIRIT & ALIGNMENT™

   ========================================================================== */


{

    id:11,


    spoke:11,


    key:"spiritAlignment",


    titleTa:


        "ஆன்ம இணக்கமும் அர்த்தமும்™",



    titleEn:


        "Spirit & Alignment™",





    coreQuestionTa:


        "நான் என் ஆழமான உண்மையுடன் இணைந்திருக்கிறேனா?",



    coreQuestionEn:


        "Am I connected with my deepest self?",





    introductionTa:


        "உங்கள் ஆழமான மதிப்புகள், நம்பிக்கைகள் மற்றும் உள்ளார்ந்த உண்மையுடன் இணைந்து வாழும் பயணம்.",



    introductionEn:


        "A journey of living in connection with your deepest values, beliefs and inner truth.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "எனது ஆழமான நம்பிக்கைகள், மதிப்புகள் மற்றும் உள்ளார்ந்த உண்மையை நான் புரிந்துகொள்கிறேன்.",



            textEn:


                "I understand my deepest beliefs, values and inner truth."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "எனது தேர்வுகள் நான் உண்மையில் ஆக விரும்பும் மனிதரை பிரதிபலிக்கின்றன.",



            textEn:


                "My choices reflect who I truly want to become."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "எனது உள்ளார்ந்த உலகத்திற்கும் வெளிப்புற வாழ்க்கைக்கும் இடையே இணக்கத்துடன் வாழ்கிறேன்.",



            textEn:


                "I live with harmony between my inner world and outer life."



        }



    ],






    reflectionTa:


        "என் உள்ளார்ந்த உண்மைக்கும் நான் வாழும் வாழ்க்கைக்கும் இடையே இணக்கம் உள்ளதா?",





    reflectionEn:


        "Is there harmony between my inner truth and the life I live?",






    wisdomTa:


        "உள்ளார்ந்த இணக்கம் வெளிப்புற வாழ்க்கையில் அமைதியையும் அர்த்தத்தையும் உருவாக்குகிறது.",





    wisdomEn:


        "Inner alignment creates peace and meaning in outer life."



},




/* Continue in Batch 1G */

       /* ==========================================================================
   SPOKE 12

   LEGACY & VISION™

   ========================================================================== */


{

    id:12,


    spoke:12,


    key:"legacyVision",


    titleTa:


        "பாரம்பரியமும் பார்வையும்™",



    titleEn:


        "Legacy & Vision™",





    coreQuestionTa:


        "என் வாழ்க்கை எனக்குப் பிறகு எதை விட்டுச் செல்லும்?",



    coreQuestionEn:


        "What will my life leave behind?",





    introductionTa:


        "நீங்கள் உருவாக்க விரும்பும் எதிர்காலத்தையும், உலகிற்கு விட்டுச் செல்லும் நேர்மறையான தாக்கத்தையும் வடிவமைக்கும் பயணம்.",



    introductionEn:


        "A journey of creating the future you envision and the positive legacy you leave behind.",






    questions:[



        {


            id:1,


            type:"Awareness",


            typeTa:"விழிப்புணர்வு™",



            textTa:


                "நான் உருவாக்க விரும்பும் எதிர்காலத்தைப் பற்றிய தெளிவான பார்வை எனக்கு உள்ளது.",



            textEn:


                "I have clarity about the future I want to create."



        },





        {


            id:2,


            type:"Alignment",


            typeTa:"இணக்கம்™",



            textTa:


                "எனது தற்போதைய செயல்கள் நான் காண விரும்பும் எதிர்காலத்தை உருவாக்குகின்றன.",



            textEn:


                "My present actions are building the future I envision."



        },





        {


            id:3,


            type:"Embodiment",


            typeTa:"வெளிப்பாடு™",



            textTa:


                "என் வாழ்க்கை என்னைத் தாண்டியும் தொடரும் ஒரு நேர்மறையான பாரம்பரியத்தை உருவாக்குகிறது.",



            textEn:


                "My life creates a positive legacy for generations beyond me."



        }



    ],






    reflectionTa:


        "என் எதிர்காலத்திற்காகவும் அடுத்த தலைமுறைக்காகவும் நான் இன்று என்ன உருவாக்குகிறேன்?",





    reflectionEn:


        "What am I creating today for my future and the generations beyond me?",






    wisdomTa:


        "ஒரு சிறந்த வாழ்க்கையின் இறுதி நோக்கம், உலகை நாம் வந்ததைவிட சிறப்பாக விட்டுச் செல்வதாகும்.",





    wisdomEn:


        "The ultimate purpose of a great life is to leave the world better than we found it."



}





]

};








/* ==========================================================================
   SCORE CALCULATION HELPERS
   ========================================================================== */



function calculateSpokePercentage(score){


    return Math.round(

        (score / 30) * 100

    );


}







function calculateLifeAlignmentScore(spokeScores){


    if(

        !Array.isArray(spokeScores)

        ||

        spokeScores.length === 0

    ){

        return 0;

    }



    const total =

        spokeScores.reduce(

            function(sum,score){


                return sum + score;


            },

            0

        );



    return Math.round(

        total / spokeScores.length

    );


}







function getLifeEvolutionLevel(score){



    if(score <= 59){


        return LifeEvolutionLevels.learner;


    }



    if(score <= 84){


        return LifeEvolutionLevels.leader;


    }



    return LifeEvolutionLevels.legend;


}







/* ==========================================================================
   VALIDATION
   ========================================================================== */



function validateAssessmentRepository(){



    return AssessmentRepository.pillars.every(


        function(pillar){



            return (

                pillar.questions

                &&

                pillar.questions.length === 3

                &&

                pillar.titleEn

                &&

                pillar.titleTa

            );


        }


    );


}







/* ==========================================================================
   FREEZE MASTER KNOWLEDGE BASE
   ========================================================================== */


Object.freeze(

    LifeEvolutionLevels

);



Object.freeze(

    AssessmentRepository

);







/* ==========================================================================
   END OF FILE


   File        : assessmentData.js

   Version     : 5.0


   Status      : 🔒 CTM PATH™ KALA CHAKRA™ v3.0 KNOWLEDGE BASE


   ========================================================================== */
