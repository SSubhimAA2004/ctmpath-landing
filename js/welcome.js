
/* ==========================================================================
   
   CTM PATH™ Guided Journey™

   File        : js/welcome.js
   Version     : 2.2

   Page        : PAGE 01 — WELCOME™

   Purpose:
   Premium Welcome Page Controller

   Responsibilities:
   • Initialise welcome experience
   • Capture journey metadata
   • Handle journey start
   • Navigate to registration

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
    initWelcomePage
);



function initWelcomePage(){


    console.log(
        "CTM PATH™ Welcome Journey Loaded"
    );


    initialiseJourneySession();


    bindBeginJourneyButton();


}






/* ==========================================================================
   JOURNEY SESSION
========================================================================== */


function initialiseJourneySession(){


    const journeySession = {


        journey:

            "CTM PATH™ Guided Journey™",


        page:

            "WELCOME",


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

        "ctmJourneySession",

        JSON.stringify(journeySession)

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


    const browserLanguage =

        navigator.language;



    if(browserLanguage){


        return browserLanguage;


    }



    return "en";


}






/* ==========================================================================
   SOURCE TRACKING
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
   BEGIN JOURNEY ACTION
========================================================================== */


function bindBeginJourneyButton(){


    const button =

        document.getElementById(

            "beginJourneyButton"

        );



    if(!button){


        console.warn(

            "CTM PATH™ Begin Journey button not found"

        );


        return;


    }





    button.addEventListener(

        "click",

        beginJourney

    );


}






function beginJourney(event){


    event.preventDefault();



    sessionStorage.setItem(

        "ctmJourneyStatus",

        "STARTED"

    );



    window.location.href =

        "pages/registration.html";


}






/* ==========================================================================
   PUBLIC JOURNEY CONTROLS
========================================================================== */


window.CTMWelcome = {


    getSession:function(){


        return JSON.parse(

            sessionStorage.getItem(

                "ctmJourneySession"

            )

        );


    },



    reset:function(){


        sessionStorage.removeItem(

            "ctmJourneySession"

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
   Welcome Controller v2.2

========================================================================== */

