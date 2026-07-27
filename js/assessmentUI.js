
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/assessmentUI.js
   Version     : 1.2

   Status      : 🔒 PRODUCTION REPAIR


   PURPOSE

   Assessment Presentation Engine™

   Owns

   ✓ Render Questions
   ✓ Render Titles
   ✓ Render Rating Scale
   ✓ Render Colours
   ✓ Render Symbols
   ✓ Render Progress
   ✓ Render Status
   ✓ Bind UI Events
   ✓ Master Render Pipeline


   Does NOT

   ✗ Calculate Scores
   ✗ Business Logic
   ✗ Read Database

   ========================================================================== */


"use strict";


window.CTM = window.CTM || {};



/* ==========================================================================
   CTM.UI NAMESPACE
   ========================================================================== */


CTM.UI = (function(){



    /* ======================================================================
       PRIVATE HELPERS
       ====================================================================== */


    function $(selector){

        return document.querySelector(selector);

    }



    function $all(selector){

        return document.querySelectorAll(selector);

    }



    function exists(selector){

        return $(selector) !== null;

    }



    function safeText(selector,value){


        if(exists(selector)){


            $(selector).textContent = value;


        }


    }



    function safeHTML(selector,value){


        if(exists(selector)){


            $(selector).innerHTML = value;


        }


    }



    function safeStyle(selector,property,value){


        if(exists(selector)){


            $(selector).style[property] = value;


        }


    }







    /* ======================================================================
       PUBLIC API
       ====================================================================== */


    return {



        /* ==============================================================
           MASTER RENDER PIPELINE
           
           Restored in Version 1.2

           ============================================================== */


        render : function(){



            this.renderHeader();



            this.renderTheme();



            this.renderSymbol();



            this.renderQuestions();



            this.renderRatingScale();



            this.renderProgress();



            this.renderStatus();



            this.renderDashboard();



        },









        /* ==============================================================
           INIT
           ============================================================== */


        init : function(){



            this.render();



            this.renderRatingScale();



            this.renderProgress();



            this.bindRatingEvents();



            this.animateCards();



            this.scrollTop();



        },

       
        /* ==============================================================
           Render Pillar Header
           ============================================================== */


        renderHeader : function(){



            const state =

                CTM.Engine.getState();





            if(!state.data){


                return;


            }





            safeText(

                "#pillarTamil",

                state.data.title.tamil

            );





            safeText(

                "#pillarEnglish",

                state.data.title.english

            );





            safeText(

                "#coreQuestionTamil",

                state.data.coreQuestion.tamil

            );





            safeText(

                "#coreQuestionEnglish",

                state.data.coreQuestion.english

            );


        },









        /* ==============================================================
           Render Theme
           ============================================================== */


        renderTheme : function(){



            const state =

                CTM.Engine.getState();





            if(!state.data){


                return;


            }





            const colour =

                state.data.presentation.colour;







            document.documentElement.style.setProperty(

                "--pillar-primary",

                colour.primary

            );







            document.documentElement.style.setProperty(

                "--pillar-secondary",

                colour.secondary

            );







            document.documentElement.style.setProperty(

                "--pillar-accent",

                colour.accent

            );







            document.documentElement.style.setProperty(

                "--pillar-glow",

                colour.glow

            );


        },









        /* ==============================================================
           Render Symbol
           ============================================================== */


        renderSymbol : function(){



            const state =

                CTM.Engine.getState();





            if(!state.data){


                return;


            }





            safeText(

                "#pillarSymbol",

                state.data.presentation.symbol.emoji

            );


        },









        /* ==============================================================
           Render Questions
           ============================================================== */


        renderQuestions : function(){



            const state =

                CTM.Engine.getState();





            if(!state.data){


                return;


            }





            const container =

                $("#questionContainer");





            if(!container){


                return;


            }





            container.innerHTML = "";







            state.data.questions.forEach(function(question){



                const card =

                    document.createElement("div");





                card.className =

                    "question-card";





                card.dataset.questionId =

                    question.id;







                card.innerHTML = `



                    <div class="question-number">

                        ${question.id}

                    </div>



                    <div class="question-text-ta">

                        ${question.tamil}

                    </div>



                    <div class="question-text-en">

                        ${question.english}

                    </div>



                    <div

                    class="rating-container"

                    data-question="${question.id}">


                    </div>



                `;







                container.appendChild(card);



            });



        },

               /* ==============================================================
           Render Rating Scale
           ============================================================== */


        renderRatingScale : function(){



            const containers =

                $all(".rating-container");





            containers.forEach(function(container){



                container.innerHTML = "";







                for(let score = 1; score <= 10; score++){



                    const button =

                        document.createElement("button");







                    button.type =

                        "button";







                    button.className =

                        "rating-button";







                    button.dataset.value =

                        score;







                    button.dataset.question =

                        container.dataset.question;







                    button.textContent =

                        score;







                    container.appendChild(button);



                }



            });



        },









        /* ==============================================================
           Update Rating Selection
           ============================================================== */


        updateSelection : function(

            questionId,

            value

        ){



            const buttons =

                $all(

                    `[data-question="${questionId}"] .rating-button`

                );







            buttons.forEach(function(button){



                button.classList.remove(

                    "selected"

                );







                if(

                    Number(button.dataset.value)

                    ===

                    Number(value)

                ){



                    button.classList.add(

                        "selected"

                    );



                }



            });



        },









        /* ==============================================================
           Render Progress
           ============================================================== */


        renderProgress : function(){



            const state =

                CTM.Engine.getState();







            if(!state){


                return;


            }







            const current =

                state.currentQuestion || 1;







            safeText(

                "#progressCurrent",

                current

            );







            safeText(

                "#progressTotal",

                12

            );







            safeStyle(

                "#progressBar",

                "width",

                (

                    current / 12 * 100

                )

                +

                "%"

            );



        },









        /* ==============================================================
           Render Status Card
           ============================================================== */


        renderStatus : function(){



            if(

                !CTM.Engine.hasResult()

            ){


                return;


            }







            const result =

                CTM.Engine.getResult();







            safeText(

                "#currentStatus",

                result.title

            );







            safeText(

                "#overallScore",

                result.percentage + "%"

            );







            safeStyle(

                "#statusCard",

                "borderColor",

                result.colour

            );







            safeStyle(

                "#statusCard",

                "boxShadow",

                "0 0 20px " +

                result.colour

            );



        },

       
        /* ==============================================================
           Render KALA CHAKRA™ Dashboard
           ============================================================== */


        renderDashboard : function(){



            if(

                !CTM.Engine.hasResult()

            ){


                return;


            }







            const result =

                CTM.Engine.getResult();







            safeText(

                "#wheelScore",

                result.raw +

                "/30"

            );







            safeText(

                "#wheelPercentage",

                result.percentage +

                "%"

            );







            safeText(

                "#wheelLevel",

                result.title

            );







            safeStyle(

                "#wheelScore",

                "color",

                result.colour

            );







            safeStyle(

                "#wheelPercentage",

                "color",

                result.colour

            );







            safeStyle(

                "#wheelLevel",

                "color",

                result.colour

            );


        },









        /* ==============================================================
           Refresh Entire UI
           ============================================================== */


        refresh : function(){



            this.renderHeader();



            this.renderTheme();



            this.renderSymbol();



            this.renderQuestions();



            this.renderRatingScale();



            this.renderProgress();



            this.renderStatus();



            this.renderDashboard();



        },









        /* ==============================================================
           Bind Rating Events
           ============================================================== */


        bindRatingEvents : function(){



            const self =

                this;







            const buttons =

                $all(

                    ".rating-button"

                );







            buttons.forEach(function(button){



                button.addEventListener(

                    "click",

                    function(){



                        const question =

                            Number(

                                this.dataset.question

                            );







                        const score =

                            Number(

                                this.dataset.value

                            );







                        CTM.Engine.answer(

                            question,

                            score

                        );







                        self.updateSelection(

                            question,

                            score

                        );







                        self.renderProgress();



                    }

                );



            });



        },









        /* ==============================================================
           Animate Cards
           ============================================================== */


        animateCards : function(){



            const cards =

                $all(

                    ".question-card"

                );







            cards.forEach(function(card,index){



                card.style.opacity = "0";



                card.style.transform =

                    "translateY(20px)";







                setTimeout(function(){



                    card.style.transition =

                        "all .35s ease";



                    card.style.opacity = "1";



                    card.style.transform =

                        "translateY(0)";



                }, index * 80);



            });



        },

       
        /* ==============================================================
           Scroll To Top
           ============================================================== */


        scrollTop : function(){



            window.scrollTo({


                top:0,


                behavior:"smooth"



            });



        },









        /* ==============================================================
           Destroy

           Reserved for future cleanup.

           ============================================================== */


        destroy : function(){



            /*


            Future cleanup:

            - remove event listeners
            - clear timers
            - release observers


            */



        }



    };



})();









/* ==========================================================================
   LOCK UI

   ========================================================================== */


Object.freeze(

    CTM.UI

);









/* ==========================================================================
   END OF FILE

   assessmentUI.js

   Version : 1.2

   Status

   ✓ SYNTAX REPAIRED
   ✓ MASTER RENDER PIPELINE RESTORED
   ✓ CTM.UI INIT ACTIVE
   ✓ UI MODULES CONNECTED

   ==========================================================================
*/

