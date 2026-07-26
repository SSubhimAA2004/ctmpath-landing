
/* ==========================================================================
   CTM PATH™ Guided Journey

   FROM SURVIVAL TO LIVING™

   File        : assessmentData.js
   Version     : 4.0

   Status      : 🔒 PREMIUM ASSESSMENT KNOWLEDGE BASE

   Purpose:

       Stores Assessment Content

   Supports:

       assessment-01.html
       assessment-02.html
       ...
       assessment-12.html


   Owns:

       • Pillar Information
       • Questions
       • Reflection
       • Wisdom


   Owns NO:

       • Rendering
       • Logic
       • Storage

   ========================================================================== */


"use strict";





const AssessmentRepository = {



    pillars:[





/* ==========================================================================
   SPOKE 01

   PURPOSE™

   ========================================================================== */


{

    spoke:1,



    titleTa:

        "நோக்கம்™",



    titleEn:

        "Purpose™",






    introductionTa:


        "உங்கள் வாழ்க்கையின் உயர்ந்த நோக்கம் என்ன என்பதை அறிந்து, உங்கள் பயணத்தின் திசையை தெளிவுபடுத்தும் பகுதி இது.",





    introductionEn:


        "This section helps you reflect on your higher purpose and gain clarity about the direction of your life journey.",







    questions:[



        {


            id:1,


            textTa:


                "என் வாழ்க்கையின் உயர்ந்த நோக்கம் என்ன என்பது எனக்கு தெளிவாக தெரியும்.",



            textEn:


                "I have a clear understanding of the higher purpose of my life."



        },






        {


            id:2,


            textTa:


                "எனது அன்றாட முடிவுகள் என் வாழ்க்கை நோக்கத்துடன் ஒத்திசைவாக உள்ளன.",



            textEn:


                "My daily decisions are aligned with my life's purpose."



        },






        {


            id:3,


            textTa:


                "நான் வாழும் வாழ்க்கை எனக்கு ஆழமான அர்த்தத்தையும் நிறைவையும் அளிக்கிறது.",



            textEn:


                "The life I am living gives me a deep sense of meaning and fulfilment."



        }



    ],






    reflectionTa:


        "உங்கள் நோக்கம் தெளிவாகும் போது, உங்கள் வாழ்க்கையின் ஒவ்வொரு செயலும் அதிக அர்த்தம் பெறுகிறது.",





    reflectionEn:


        "When your purpose becomes clear, every action in your life begins to carry deeper meaning.",






    wisdomTa:


        "தெளிவான நோக்கம் கொண்ட வாழ்க்கை தெளிவான பாதையை உருவாக்கும்.",





    wisdomEn:


        "A life guided by clear purpose creates a clear path."



},





/* Continue in Batch 1B */

       /* ==========================================================================
   PREMIUM ASSESSMENT CONFIGURATION

   Shared Experience Language

   ========================================================================== */


const AssessmentExperience = {


    scale:{


        minimum:1,


        maximum:10,



        labels:{


            low:


                "Needs Attention",



            medium:


                "Growing Awareness",



            high:


                "Strong Alignment"



        }



    },





    reflectionLabel:


        "REFLECTION MOMENT™",





    wisdomLabel:


        "WISDOM MOMENT™",





    journeyTitle:


        "YOUR LIFE MAP™"



};









/* ==========================================================================
   SPOKE METADATA

   Used by Premium Life Map™

   ========================================================================== */


const AssessmentSpokeMap = [


    {


        spoke:1,


        title:"Purpose™",


        shortTitle:"Purpose"


    },



    {


        spoke:2,


        title:"Health™",


        shortTitle:"Health"


    },



    {


        spoke:3,


        title:"Relationships™",


        shortTitle:"Relationships"


    },



    {


        spoke:4,


        title:"Character™",


        shortTitle:"Character"


    },



    {


        spoke:5,


        title:"Financial Stability & Abundance™",


        shortTitle:"Wealth"


    },



    {


        spoke:6,


        title:"Mind & Emotional Well-Being™",


        shortTitle:"Mind"


    },



    {


        spoke:7,


        title:"Growth & Learning Mindset™",


        shortTitle:"Growth"


    },



    {


        spoke:8,


        title:"Self-Discipline & Daily Habits™",


        shortTitle:"Discipline"


    },



    {


        spoke:9,


        title:"Gratitude & Awareness™",


        shortTitle:"Gratitude"


    },



    {


        spoke:10,


        title:"Contribution™",


        shortTitle:"Contribution"


    },



    {


        spoke:11,


        title:"Inner Meaning™",


        shortTitle:"Meaning"


    },



    {


        spoke:12,


        title:"Legacy™",


        shortTitle:"Legacy"


    }



];






/* ==========================================================================
   EXPORT SUPPORT

   ========================================================================== */


Object.freeze(

    AssessmentExperience

);



Object.freeze(

    AssessmentSpokeMap

);



/* Continue in Batch 1C */

/* ==========================================================================
   ASSESSMENT DATA VALIDATION
   ========================================================================== */


/**
 * Validate pillar structure
 *
 */


function validateAssessmentPillar(pillar){


    if(!pillar){

        return false;

    }



    if(

        !pillar.spoke

        ||

        !pillar.titleEn

        ||

        !pillar.titleTa

    ){

        return false;

    }



    if(

        !pillar.questions

        ||

        pillar.questions.length !== 3

    ){

        return false;

    }



    return true;


}








/* ==========================================================================
   PILLAR ACCESS HELPER
   ========================================================================== */


/**
 * Get assessment pillar safely
 *
 */


function getAssessmentContent(spokeNumber){



    return AssessmentRepository.pillars.find(


        function(pillar){


            return (

                pillar.spoke ===

                Number(spokeNumber)

            );


        }


    );


}







/* ==========================================================================
   DATA INTEGRITY CHECK
   ========================================================================== */


function validateAssessmentRepository(){



    return AssessmentRepository.pillars.every(


        function(pillar){


            return validateAssessmentPillar(

                pillar

            );


        }


    );


}







/* ==========================================================================
   FREEZE KNOWLEDGE BASE
   ========================================================================== */


Object.freeze(

    AssessmentRepository

);






/* ==========================================================================
   END OF FILE


   File        : assessmentData.js

   Version     : 4.0

   Status      : 🔒 PREMIUM ASSESSMENT KNOWLEDGE BASE


   ========================================================================== */
