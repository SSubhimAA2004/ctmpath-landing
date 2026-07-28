
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : questions.js
   Version     : 1.0
   Status      : DEVELOPMENT
   Stage       : STAGE 0 — FOUNDATION

   Purpose     :
   Frontend assessment question repository.

   Responsibilities:

   • Store assessment question content.
   • Organize questions by pillar.
   • Provide display metadata.
   • Support assessment rendering.

   Does NOT:

   • Calculate scores.
   • Define scoring weights.
   • Evaluate responses.
   • Generate diagnosis.
   • Generate prescriptions.

   Backend Ownership:

   • Assessment validation
   • Scoring engine
   • KALA CHAKRA™ engine
   • Diagnosis engine
   • Prescription engine

   ========================================================================== */


/* ==========================================================================
   GLOBAL NAMESPACE
   ========================================================================== */


window.CTMPATH = window.CTMPATH || {};



/* ==========================================================================
   QUESTION DATA STRUCTURE

   Each pillar contains:

   • pillarId
   • page
   • title
   • questions[]

   ========================================================================== */


CTMPATH.Questions = [


    {


        pillarId:

            "purpose",



        page:

            3,



        title:

            "Purpose™",



        questions:


            [


                {


                    id:

                        "purpose_01",



                    text:

                        "Do you have a clear understanding of the direction you want your life to move toward?",



                    type:

                        "rating"



                },


                {


                    id:

                        "purpose_02",



                    text:

                        "Do your daily actions reflect what truly matters to you?",



                    type:

                        "rating"



                },


                {


                    id:

                        "purpose_03",



                    text:

                        "Do you feel connected to a meaningful personal mission?",



                    type:

                        "rating"



                },


                {


                    id:

                        "purpose_04",



                    text:

                        "Do you regularly reflect on the life you want to create?",



                    type:

                        "rating"



                },


                {


                    id:

                        "purpose_05",



                    text:

                        "Are your choices aligned with your deeper values?",



                    type:

                        "rating"



                }



            ]



    },



    {


        pillarId:

            "vitality",



        page:

            4,



        title:

            "Vitality™",



        questions:


            [


                {


                    id:

                        "vitality_01",



                    text:

                        "How consistently do you maintain habits that support your physical energy?",



                    type:

                        "rating"



                },


                {


                    id:

                        "vitality_02",



                    text:

                        "Do you prioritize your health as an essential part of your life?",



                    type:

                        "rating"



                }


            ]



    }



];

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : questions.js
   Continuation: Batch 1B

   ========================================================================== */


/* ==========================================================================
   CONTINUED QUESTION DATA

   ========================================================================== */


CTMPATH.Questions.push(


    {


        pillarId:

            "vitality",



        page:

            4,



        title:

            "Vitality™",



        questions:


            [


                {


                    id:

                        "vitality_03",



                    text:

                        "Do you maintain consistent routines that improve your physical wellbeing?",



                    type:

                        "rating"



                },


                {


                    id:

                        "vitality_04",



                    text:

                        "Do you feel energized and capable in your everyday life?",



                    type:

                        "rating"



                },


                {


                    id:

                        "vitality_05",



                    text:

                        "Do you make conscious choices about nutrition, movement and rest?",



                    type:

                        "rating"



                }



            ]



    },



    {


        pillarId:

            "relationships",



        page:

            5,



        title:

            "Love & Relationships™",



        questions:


            [


                {


                    id:

                        "relationships_01",



                    text:

                        "Do you experience meaningful and supportive relationships in your life?",



                    type:

                        "rating"



                },


                {


                    id:

                        "relationships_02",



                    text:

                        "Do you communicate openly and honestly with people important to you?",



                    type:

                        "rating"



                },


                {


                    id:

                        "relationships_03",



                    text:

                        "Do you invest time and attention into nurturing relationships?",



                    type:

                        "rating"



                },


                {


                    id:

                        "relationships_04",



                    text:

                        "Do you resolve conflicts with understanding and maturity?",



                    type:

                        "rating"



                },


                {


                    id:

                        "relationships_05",



                    text:

                        "Do you feel loved, valued and connected with others?",



                    type:

                        "rating"



                }



            ]



    },



    {


        pillarId:

            "character",



        page:

            6,



        title:

            "Character & Integrity™",



        questions:


            [


                {


                    id:

                        "character_01",



                    text:

                        "Do your actions consistently reflect your values?",



                    type:

                        "rating"



                },


                {


                    id:

                        "character_02",



                    text:

                        "Do you take responsibility for your decisions and outcomes?",



                    type:

                        "rating"



                }



            ]



    }



);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : questions.js
   Continuation: Batch 1C

   ========================================================================== */


/* ==========================================================================
   CONTINUED QUESTION DATA

   ========================================================================== */


CTMPATH.Questions.push(


    {


        pillarId:

            "character",



        page:

            6,



        title:

            "Character & Integrity™",



        questions:


            [


                {


                    id:

                        "character_03",



                    text:

                        "Do you remain honest even when facing difficult situations?",



                    type:

                        "rating"



                },


                {


                    id:

                        "character_04",



                    text:

                        "Do you demonstrate discipline and self-respect in your choices?",



                    type:

                        "rating"



                },


                {


                    id:

                        "character_05",



                    text:

                        "Do others experience you as dependable and trustworthy?",



                    type:

                        "rating"



                }



            ]



    },



    {


        pillarId:

            "financialFreedom",



        page:

            7,



        title:

            "Financial Freedom™",



        questions:


            [


                {


                    id:

                        "financial_01",



                    text:

                        "Do you have clarity about your current financial situation?",



                    type:

                        "rating"



                },


                {


                    id:

                        "financial_02",



                    text:

                        "Do you manage money with awareness and responsibility?",



                    type:

                        "rating"



                },


                {


                    id:

                        "financial_03",



                    text:

                        "Do your financial decisions support your long-term goals?",



                    type:

                        "rating"



                },


                {


                    id:

                        "financial_04",



                    text:

                        "Do you continuously improve your ability to create value and income?",



                    type:

                        "rating"



                },


                {


                    id:

                        "financial_05",



                    text:

                        "Do you feel confident about building financial stability?",



                    type:

                        "rating"



                }



            ]



    },



    {


        pillarId:

            "innerPeace",



        page:

            8,



        title:

            "Inner Peace™",



        questions:


            [


                {


                    id:

                        "peace_01",



                    text:

                        "Do you maintain emotional balance during challenging moments?",



                    type:

                        "rating"



                },


                {


                    id:

                        "peace_02",



                    text:

                        "Do you practice awareness of your thoughts and emotions?",



                    type:

                        "rating"



                }



            ]



    }



);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : questions.js
   Continuation: Batch 1D

   ========================================================================== */


/* ==========================================================================
   CONTINUED QUESTION DATA

   ========================================================================== */


CTMPATH.Questions.push(


    {


        pillarId:

            "innerPeace",



        page:

            8,



        title:

            "Inner Peace™",



        questions:


            [


                {


                    id:

                        "peace_03",



                    text:

                        "Do you have practices that help you return to calm and clarity?",



                    type:

                        "rating"



                },


                {


                    id:

                        "peace_04",



                    text:

                        "Do you release unnecessary stress and emotional burdens effectively?",



                    type:

                        "rating"



                },


                {


                    id:

                        "peace_05",



                    text:

                        "Do you experience a sense of inner harmony in daily life?",



                    type:

                        "rating"



                }



            ]



    },



    {


        pillarId:

            "growthMastery",



        page:

            9,



        title:

            "Growth & Mastery™",



        questions:


            [


                {


                    id:

                        "growth_01",



                    text:

                        "Do you actively invest in learning and personal improvement?",



                    type:

                        "rating"



                },


                {


                    id:

                        "growth_02",



                    text:

                        "Do you seek feedback to improve yourself?",



                    type:

                        "rating"



                },


                {


                    id:

                        "growth_03",



                    text:

                        "Do you challenge yourself beyond your current comfort zone?",



                    type:

                        "rating"



                },


                {


                    id:

                        "growth_04",



                    text:

                        "Do you continuously develop new skills and capabilities?",



                    type:

                        "rating"



                },


                {


                    id:

                        "growth_05",



                    text:

                        "Do you view challenges as opportunities for growth?",



                    type:

                        "rating"



                }



            ]



    },



    {


        pillarId:

            "disciplineHabits",



        page:

            10,



        title:

            "Discipline & Habits™",



        questions:


            [


                {


                    id:

                        "discipline_01",



                    text:

                        "Do your daily habits support the person you want to become?",



                    type:

                        "rating"



                },


                {


                    id:

                        "discipline_02",



                    text:

                        "Do you consistently complete important commitments?",



                    type:

                        "rating"



                }



            ]



    }



);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : questions.js
   Continuation: Batch 1E

   ========================================================================== */


/* ==========================================================================
   CONTINUED QUESTION DATA

   ========================================================================== */


CTMPATH.Questions.push(


    {


        pillarId:

            "disciplineHabits",



        page:

            10,



        title:

            "Discipline & Habits™",



        questions:


            [


                {


                    id:

                        "discipline_03",



                    text:

                        "Do you maintain consistency even when motivation is low?",



                    type:

                        "rating"



                },


                {


                    id:

                        "discipline_04",



                    text:

                        "Do you organize your time around your highest priorities?",



                    type:

                        "rating"



                },


                {


                    id:

                        "discipline_05",



                    text:

                        "Do your routines create progress toward your goals?",



                    type:

                        "rating"



                }



            ]



    },



    {


        pillarId:

            "gratitudePresence",



        page:

            11,



        title:

            "Gratitude & Presence™",



        questions:


            [


                {


                    id:

                        "gratitude_01",



                    text:

                        "Do you regularly recognize the positive aspects of your life?",



                    type:

                        "rating"



                },


                {


                    id:

                        "gratitude_02",



                    text:

                        "Are you able to remain present instead of constantly worrying about the future?",



                    type:

                        "rating"



                },


                {


                    id:

                        "gratitude_03",



                    text:

                        "Do you appreciate the people and experiences around you?",



                    type:

                        "rating"



                },


                {


                    id:

                        "gratitude_04",



                    text:

                        "Do you practice awareness in your everyday activities?",



                    type:

                        "rating"



                },


                {


                    id:

                        "gratitude_05",



                    text:

                        "Do you experience joy and appreciation in ordinary moments?",



                    type:

                        "rating"



                }



            ]



    }



);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : questions.js
   Continuation: Batch 1F

   ========================================================================== */


/* ==========================================================================
   CONTINUED QUESTION DATA

   ========================================================================== */


CTMPATH.Questions.push(


    {


        pillarId:

            "contributionService",



        page:

            12,



        title:

            "Contribution & Service™",



        questions:


            [


                {


                    id:

                        "service_01",



                    text:

                        "Do you actively look for ways to create value for others?",



                    type:

                        "rating"



                },


                {


                    id:

                        "service_02",



                    text:

                        "Do you use your abilities to make a positive difference?",



                    type:

                        "rating"



                },


                {


                    id:

                        "service_03",



                    text:

                        "Do you feel connected to a purpose beyond personal achievement?",



                    type:

                        "rating"



                },


                {


                    id:

                        "service_04",



                    text:

                        "Do you contribute your time, knowledge or resources meaningfully?",



                    type:

                        "rating"



                },


                {


                    id:

                        "service_05",



                    text:

                        "Do you believe your life creates positive impact?",



                    type:

                        "rating"



                }



            ]



    },



    {


        pillarId:

            "spiritAlignment",



        page:

            13,



        title:

            "Spirit & Alignment™",



        questions:


            [


                {


                    id:

                        "spirit_01",



                    text:

                        "Do you feel aligned with your deepest values and beliefs?",



                    type:

                        "rating"



                },


                {


                    id:

                        "spirit_02",



                    text:

                        "Do your choices reflect who you truly want to become?",



                    type:

                        "rating"



                },


                {


                    id:

                        "spirit_03",



                    text:

                        "Do you create time for reflection and inner connection?",



                    type:

                        "rating"



                }



            ]



    }



);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : questions.js
   Continuation: Batch 1G

   ========================================================================== */


/* ==========================================================================
   CONTINUED QUESTION DATA

   ========================================================================== */


CTMPATH.Questions.push(


    {


        pillarId:

            "spiritAlignment",



        page:

            13,



        title:

            "Spirit & Alignment™",



        questions:


            [


                {


                    id:

                        "spirit_04",



                    text:

                        "Do you experience a sense of connection with something greater than yourself?",



                    type:

                        "rating"



                },


                {


                    id:

                        "spirit_05",



                    text:

                        "Do you live with inner clarity and alignment between your thoughts, words and actions?",



                    type:

                        "rating"



                }



            ]



    },



    {


        pillarId:

            "legacyVision",



        page:

            14,



        title:

            "Legacy & Vision™",



        questions:


            [


                {


                    id:

                        "legacy_01",



                    text:

                        "Do you have a clear vision for the future you want to create?",



                    type:

                        "rating"



                },


                {


                    id:

                        "legacy_02",



                    text:

                        "Do your present actions contribute toward your long-term vision?",



                    type:

                        "rating"



                },


                {


                    id:

                        "legacy_03",



                    text:

                        "Do you think about the positive impact you want to leave behind?",



                    type:

                        "rating"



                },


                {


                    id:

                        "legacy_04",



                    text:

                        "Do you intentionally build something meaningful beyond immediate success?",



                    type:

                        "rating"



                },


                {


                    id:

                        "legacy_05",



                    text:

                        "Do you feel prepared to create a lasting contribution through your life?",



                    type:

                        "rating"



                }



            ]



    }



);

/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : questions.js
   Continuation: Batch 1H

   ========================================================================== */


/* ==========================================================================
   QUESTION DATA HELPERS

   Frontend content utilities only.

   ========================================================================== */


/**
 * Get all assessment question groups.
 *
 * @returns {Array}
 */

CTMPATH.getQuestions = function() {


    return CTMPATH.Questions;



};




/**
 * Get questions by pillar identifier.
 *
 * @param {String} pillarId
 *
 * @returns {Object|null}
 */

CTMPATH.getQuestionsByPillar = function(pillarId) {


    return CTMPATH.Questions.find(function(group) {


        return group.pillarId === pillarId;



    }) || null;



};




/**
 * Get questions by assessment page.
 *
 * @param {Number} page
 *
 * @returns {Object|null}
 */

CTMPATH.getQuestionsByPage = function(page) {


    return CTMPATH.Questions.find(function(group) {


        return group.page === Number(page);



    }) || null;



};




/**
 * Get total question count.
 *
 * Presentation helper only.
 *
 * @returns {Number}
 */

CTMPATH.getTotalQuestionCount = function() {


    return CTMPATH.Questions.reduce(

        function(total, group) {


            return (

                total +

                group.questions.length

            );


        },

        0

    );



};




/**
 * Validate question data structure.
 *
 * Frontend consistency check only.
 *
 * @returns {Boolean}
 */

CTMPATH.validateQuestionData = function() {


    return CTMPATH.Questions.every(function(group) {


        return (

            group.pillarId &&

            group.page &&

            Array.isArray(

                group.questions

            )

        );



    });



};




/* ==========================================================================
   QUESTION DATA READY EVENT

   Allows dependent frontend modules to initialize.

   ========================================================================== */


document.dispatchEvent(

    new CustomEvent(

        "CTMPATH_QUESTIONS_READY",

        {


            detail:

                {


                    groups:

                        CTMPATH.Questions.length,



                    totalQuestions:

                        CTMPATH.getTotalQuestionCount()



                }



        }

    )

);




/* ==========================================================================
   END OF FILE

   File:

   data/questions.js


   Status:

   FOUNDATION MODULE COMPLETE


   Next:

   data/diagnosisLibrary.js

   ========================================================================== */

