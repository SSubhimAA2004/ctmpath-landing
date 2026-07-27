
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/assessment01.js
   Version     : 1.1

   Status      : 🔒 PRODUCTION DEBUG BUILD

   Assessment  : Spoke 01
   Pillar      : Purpose™

   ==========================================================================

   PURPOSE

   Assessment 01 Page Controller™

   Responsibilities:

   ✓ Load HTML Components
   ✓ Initialize Engine
   ✓ Restore State
   ✓ Initialize UI
   ✓ Bind Events

   Does NOT:

   ✗ Calculate Scores
   ✗ Own Assessment Data
   ✗ Render Components Directly

   ========================================================================== */


"use strict";


window.CTM = window.CTM || {};



/* ==========================================================================
   ASSESSMENT 01 CONTROLLER
   ========================================================================== */


CTM.Assessment01 = (function(){



    /* ======================================================================
       CONSTANTS
       ====================================================================== */


    const CONFIG = {


        pillarId : 1,


        storageKey :

            "CTM_ASSESSMENT_01_STATE",


        components : {


            header :

                "../components/header.html",


            ratingScale :

                "../components/rating-scale.html",


            statusCard :

                "../components/status-card.html",


            kaalachakra :

                "../components/kaalachakra-dashboard.html",


            footer :

                "../components/footer.html"


        }


    };



    /* ======================================================================
       COMPONENT LOADER
       ====================================================================== */


    async function loadComponent(

        target,

        source

    ){


        try {


            console.log(

                "Loading component:",

                source

            );



            await CTM.Common.loadComponent({


                target : target,


                source : source


            });



            console.log(

                "Loaded:",

                source

            );



        }


        catch(error){


            console.error(

                "Component Load Failed:",

                source,

                error

            );


            throw error;


        }


    }



    /* ======================================================================
       LOAD ALL COMPONENTS
       ====================================================================== */


    async function loadComponents(){


        await loadComponent(

            "#header",

            CONFIG.components.header

        );



        await loadComponent(

            "#ratingScale",

            CONFIG.components.ratingScale

        );



        await loadComponent(

            "#statusCard",

            CONFIG.components.statusCard

        );



        await loadComponent(

            "#kaalachakra",

            CONFIG.components.kaalachakra

        );



        await loadComponent(

            "#footer",

            CONFIG.components.footer

        );


    }



    /* ======================================================================
       ENGINE INITIALIZATION
       ====================================================================== */


    function initializeEngine(){


        CTM.Engine.init(

            CONFIG.pillarId

        );


    }



    /* ======================================================================
       RESTORE PREVIOUS STATE
       ====================================================================== */


    function restoreState(){


        const saved =

            CTM.Common.loadLocal(

                CONFIG.storageKey

            );



        if(!saved){

            return;

        }


        console.log(

            "Previous state found:",

            saved

        );


    }

                    
    /* ======================================================================
       SAVE STATE
       ====================================================================== */


    function saveState(){


        const state =

            CTM.Engine.getState();



        CTM.Common.saveLocal(


            CONFIG.storageKey,


            state


        );


        console.log(

            "Assessment state saved",

            state

        );


    }




    /* ======================================================================
       HANDLE ANSWER CHANGE
       ====================================================================== */


    function bindAnswerEvents(){


        document.addEventListener(

            "click",

            function(event){



                const target =

                    event.target;



                if(

                    target.matches(

                        "[data-question][data-score]"

                    )

                ){



                    saveState();



                    CTM.Dashboard.refresh();



                }



            }


        );


    }





    /* ======================================================================
       CONTINUE BUTTON
       ====================================================================== */


    function bindContinue(){


        const button =

            document.querySelector(

                "#continueButton"

            );



        if(!button){


            console.warn(

                "Continue button not found"

            );


            return;


        }




        button.addEventListener(

            "click",

            function(){



                if(

                    !CTM.Engine.validate()

                ){


                    alert(

                        "Please complete all questions."

                    );


                    return;


                }



                const result =

                    CTM.Engine.complete();



                saveState();



                CTM.Dashboard.refresh();



                console.log(

                    "Assessment completed",

                    result

                );


            }


        );


    }




    /* ======================================================================
       INITIALIZE UI
       ====================================================================== */


    function initializeUI(){


        CTM.UI.init();


        CTM.Dashboard.init();



        CTM.UI.refresh();


        CTM.Dashboard.refresh();


    }




    /* ======================================================================
       APPLICATION START
       ====================================================================== */


    async function init(){



        try {



            console.log(

                "CTM PATH™ Assessment 01 Starting"

            );



            await loadComponents();



            initializeEngine();



            restoreState();



            initializeUI();



            bindAnswerEvents();



            bindContinue();



            CTM.Common.scrollTop();



            console.log(

                "CTM PATH™ Assessment 01 Ready"

            );



        }



        catch(error){



            console.error(

                "Assessment 01 Startup Failed",

                error

            );



        }


    }




    return {


        init:init


    };



})();





/* ==========================================================================
   DOM READY
   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        CTM.Assessment01.init();


    }


);





/* ==========================================================================
   END OF FILE

   assessment01.js

   Version : 1.1

   Status

   ✓ COMPLETE
   ✓ DEBUG ENABLED

   ==========================================================================
*/

