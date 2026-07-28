
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/welcome.js
   Version     : 2.1

   Page        : 01 — WELCOME™

   Purpose:
   Premium Welcome Page Controller

   Responsibilities:
   • Initialise Welcome experience
   • Capture journey start
   • Store temporary session data
   • Navigate to Registration™

   Architecture:

   welcome.js
        ↓
   sessionStorage
        ↓
   registration.js
        ↓
   api.js
        ↓
   Frozen Backend

========================================================================== */



/* ==========================================================================
   PAGE INITIALISATION
========================================================================== */


document.addEventListener(
    "DOMContentLoaded",
    initialiseWelcome
);



function initialiseWelcome(){


    console.log(
        "CTM PATH™ Welcome Journey Initialised"
    );


    captureJourneyStart();


    bindJourneyButton();


}






/* ==========================================================================
   JOURNEY SESSION INITIALISATION
========================================================================== */


function captureJourneyStart(){


    const journeyData = {


        journeyStarted:

            true,


        startedAt:

            new Date().toISOString(),



        device:

            detectDevice(),



        language:

            detectLanguage(),



        source:

            detectSource()



    };



    sessionStorage.setItem(

        "ctmJourneyStart",

        JSON.stringify(journeyData)

    );


}






/* ==========================================================================
   DEVICE DETECTION
========================================================================== */


function detectDevice(){


    const width =
        window.innerWidth;



    if(width <= 768){

        return "Mobile";

    }



    if(width <= 1024){

        return "Tablet";

    }



    return "Desktop";


}






/* ==========================================================================
   LANGUAGE DETECTION
========================================================================== */


function detectLanguage(){


    return (

        navigator.language

        ||

        "en"

    );


}






/* ==========================================================================
   SOURCE DETECTION
========================================================================== */


function detectSource(){


    const params =

        new URLSearchParams(

            window.location.search

        );



    return (

        params.get("source")

        ||

        "Direct"

    );


}






/* ==========================================================================
   BEGIN JOURNEY BUTTON
========================================================================== */


function bindJourneyButton(){


    const button =

        document.getElementById(

            "beginJourneyButton"

        );



    if(!button){


        console.warn(

            "CTM PATH™ Begin Journey button missing"

        );


        return;


    }





    button.addEventListener(

        "click",

        startJourney

    );


}






function startJourney(event){


    event.preventDefault();



    sessionStorage.setItem(

        "ctmJourneyStatus",

        "STARTED"

    );



    window.location.href =

        "pages/registration.html";


}






/* ==========================================================================
   JOURNEY RESET SUPPORT
========================================================================== */


window.CTMWelcome = {


    reset:function(){


        sessionStorage.removeItem(

            "ctmJourneyStart"

        );


        sessionStorage.removeItem(

            "ctmJourneyStatus"

        );


        window.location.reload();


    }


};






/* ==========================================================================
   END OF FILE

   CTM PATH™ Guided Journey™
   Welcome Controller v2.1

========================================================================== */

