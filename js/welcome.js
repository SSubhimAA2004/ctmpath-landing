
/* ==========================================================================
   CTM PATH™ Guided Journey™

   File        : js/welcome.js
   Version     : 2.0

   Page        : 01 — WELCOME™

   Purpose:
   Welcome page controller

   Responsibilities:
   • Initialise page
   • Capture journey start
   • Capture device metadata
   • Navigate visitor to registration

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
        "CTM PATH™ Welcome Page Initialised"
    );


    captureJourneyStart();


    bindJourneyButton();


}






/* ==========================================================================
   JOURNEY START TRACKING
   ========================================================================== */


function captureJourneyStart(){


    const journeyStart = {


        startedAt:
            new Date().toISOString(),


        device:
            detectDevice(),


        language:
            navigator.language || "en",


        source:
            getSource()



    };



    sessionStorage.setItem(

        "ctmJourneyStart",

        JSON.stringify(journeyStart)

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
   SOURCE TRACKING
   ========================================================================== */


function getSource(){


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
            "Begin Journey button not found"
        );

        return;

    }




    button.addEventListener(
        "click",
        handleJourneyStart
    );


}






function handleJourneyStart(event){


    event.preventDefault();



    sessionStorage.setItem(

        "ctmJourneyStatus",

        "STARTED"

    );



    window.location.href =
        "pages/registration.html";


}






/* ==========================================================================
   PUBLIC API
   ========================================================================== */


window.CTMWelcome = {


    restartJourney:function(){


        sessionStorage.clear();


        window.location.reload();


    }



};






/* ==========================================================================
   END OF FILE

   CTM PATH™ Guided Journey™
   Welcome Controller v2.0

   ========================================================================== */

