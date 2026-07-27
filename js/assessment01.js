
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/assessment01.js
   Version     : 1.0
   Status      : LOCKED

   ==========================================================================
   PURPOSE

   Assessment 01 Page Controller™

   Spoke

   PURPOSE™

   Owns

   ✓ Page Initialization
   ✓ Component Loading
   ✓ Engine Startup
   ✓ UI Startup
   ✓ Dashboard Startup

   Does NOT

   ✗ Calculate Scores
   ✗ Render Business Data
   ✗ Manage Assessment Logic

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};



/* ==========================================================================
   PAGE CONTROLLER
   ========================================================================== */

CTM.Assessment01 = (function(){



    /* ======================================================================
       PRIVATE CONSTANTS
       ====================================================================== */

    const PILLAR_ID = 1;



    /* ======================================================================
       LOAD COMPONENTS
       ====================================================================== */

    async function loadComponents(){

        await CTM.Common.loadComponent({

            target:"#header",

            source:"components/header.html"

        });


        await CTM.Common.loadComponent({

            target:"#ratingScale",

            source:"components/rating-scale.html"

        });


        await CTM.Common.loadComponent({

            target:"#statusCard",

            source:"components/status-card.html"

        });


        await CTM.Common.loadComponent({

            target:"#kaalachakra",

            source:"components/kaalachakra-dashboard.html"

        });


        await CTM.Common.loadComponent({

            target:"#footer",

            source:"components/footer.html"

        });

    }



    /* ======================================================================
       START ENGINE
       ====================================================================== */

    function initializeEngine(){

        CTM.Engine.init(

            PILLAR_ID

        );

    }



    /* ======================================================================
       START UI
       ====================================================================== */

    function initializeUI(){

        CTM.UI.init();

        CTM.Dashboard.init();

    }



    /* ======================================================================
       PUBLIC INIT
       ====================================================================== */

    async function init(){

        try{


            await loadComponents();


            initializeEngine();


            initializeUI();


            CTM.Common.scrollTop();


        }

        catch(error){


            console.error(

                "Assessment 01 Initialization Error:",

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
   END OF BATCH 1A
   ==========================================================================
*/

    /* ======================================================================
       SAVE STATE
       ====================================================================== */

    function saveState(){

        const state =

            CTM.Engine.getState();


        CTM.Common.saveLocal(

            "CTM_ASSESSMENT_01_STATE",

            state

        );

    }



    /* ======================================================================
       RESTORE STATE
       ====================================================================== */

    function restoreState(){

        const saved =

            CTM.Common.loadLocal(

                "CTM_ASSESSMENT_01_STATE"

            );


        if(!saved){

            return;

        }


        if(saved.answers){

            if(saved.answers.awareness){

                CTM.Engine.answer(

                    1,

                    saved.answers.awareness

                );

            }


            if(saved.answers.alignment){

                CTM.Engine.answer(

                    2,

                    saved.answers.alignment

                );

            }


            if(saved.answers.embodiment){

                CTM.Engine.answer(

                    3,

                    saved.answers.embodiment

                );

            }

        }

    }



    /* ======================================================================
       BIND CONTINUE BUTTON
       ====================================================================== */

    function bindContinue(){

        const button =

            document.querySelector(

                "#continueButton"

            );


        if(!button){

            return;

        }


        button.addEventListener(

            "click",

            function(){


                if(!CTM.Engine.validate()){


                    alert(

                        "Please complete all questions."

                    );


                    return;

                }



                const result =

                    CTM.Engine.complete();



                CTM.Dashboard.refresh();



                saveState();



                console.log(

                    "Assessment Complete",

                    result

                );


            }

        );

    }



    /* ======================================================================
       ENGINE CHANGE LISTENER
       ====================================================================== */

    function bindEngineSync(){


        document.addEventListener(

            "ctm:answer",

            function(){


                CTM.Dashboard.refresh();


                saveState();


            }

        );


    }



    /* ======================================================================
       ENHANCED INITIALIZATION
       ====================================================================== */

    async function start(){


        await loadComponents();


        initializeEngine();


        restoreState();


        initializeUI();


        bindContinue();


        bindEngineSync();


        CTM.Common.scrollTop();


    }



    return {

        init:start

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

   Version : 1.0

   Status

   ✓ COMPLETE
   ✓ LOCKED

   ==========================================================================
*/

