
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : welcome.js
   Version     : 1.0

   Page        : 01 — Welcome™

   Purpose:

   Welcome page controller.

   Responsibilities:

   ✓ Initialize welcome experience
   ✓ Capture journey start metadata
   ✓ Prepare session information


   Does NOT:

   ✗ Navigation
   ✗ Assessment
   ✗ Scoring
   ✗ Backend processing


   ========================================================================== */





const CTMWelome = (() => {



    const session = {


        startedAt:

        null,


        device:

        null,


        source:

        null



    };









    /* ==========================================================
       INITIALIZATION
       ========================================================== */


    function init(){



        session.startedAt =

        new Date().toISOString();



        session.device =

        detectDevice();



        session.source =

        detectSource();




        storeSession();



    }









    /* ==========================================================
       DEVICE DETECTION
       ========================================================== */


    function detectDevice(){



        const width =

        window.innerWidth;



        if(width < 768){


            return "mobile";


        }



        if(width < 1200){


            return "tablet";


        }



        return "desktop";



    }









    /* ==========================================================
       SOURCE DETECTION
       ========================================================== */


    function detectSource(){



        const params =

        new URLSearchParams(

            window.location.search

        );



        return (

            params.get("source")

            ||

            "direct"

        );



    }









    /* ==========================================================
       SESSION STORAGE

       Temporary frontend storage only.

       Backend persistence comes later.

       ========================================================== */


    function storeSession(){



        try {



            sessionStorage.setItem(

                "ctm_welcome_session",

                JSON.stringify(

                    session

                )

            );



        }



        catch(error){



            console.warn(

                "Session storage unavailable",

                error

            );



        }



    }









    /* ==========================================================
       PUBLIC API
       ========================================================== */


    return {


        init



    };



})();









/* ==========================================================================
   START PAGE CONTROLLER

   ========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        CTMWelome.init();



    }

);
