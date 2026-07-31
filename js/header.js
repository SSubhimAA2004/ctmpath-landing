
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   File      : header.js
   Version   : 2.0

   Status    : PREMIUM HEADER CONTROLLER


   Responsibilities:

   ✓ Detect Current Journey Page
   ✓ Update Journey Title
   ✓ Update Journey Counter
   ✓ Synchronize Global Header


   Does NOT:

   ✗ Routing
   ✗ Page Loading
   ✗ API Calls
   ✗ Assessment Logic
   ✗ Backend Communication

========================================================================== */


(function(){


"use strict";



/* ==========================================================================
   CONFIGURATION
========================================================================== */


const HEADER_CONFIG = {


    totalPages:7,



    journeys:{


        1:{

            title:"BEGINNING YOUR JOURNEY™"

        },


        2:{

            title:"FINANCIAL CONFIDENCE™"

        },


        3:{

            title:"LIFE ALIGNMENT™"

        },


        4:{

            title:"PERSONAL DISCOVERY™"

        },


        5:{

            title:"PERSONAL ROADMAP™"

        },


        6:{

            title:"TRANSFORMATION™"

        },


        7:{

            title:"MILLIONAIRE LEGACY™"

        }


    }


};






/* ==========================================================================
   DETECT CURRENT PAGE
========================================================================== */


function getCurrentPage(){


    const path =

        window.location.pathname;



    const match =

        path.match(

            /page(\d+)/

        );



    if(match){


        const page =

            Number(match[1]);



        if(

            page >=1 &&

            page <= HEADER_CONFIG.totalPages

        ){

            return page;

        }


    }



    return 1;


}







/* ==========================================================================
   UPDATE HEADER UI
========================================================================== */


function updateHeader(){



    const currentPage =

        getCurrentPage();




    const journey =

        HEADER_CONFIG.journeys[currentPage];



    if(!journey){


        return;


    }






    const titleElement =

        document.getElementById(

            "journey-title"

        );





    if(titleElement){


        titleElement.textContent =

            journey.title;


    }








    const counterElement =

        document.getElementById(

            "journey-counter"

        );





    if(counterElement){


        counterElement.textContent =


            String(currentPage)

            .padStart(2,"0")

            +

            " / "

            +

            String(

                HEADER_CONFIG.totalPages

            )

            .padStart(2,"0");



    }







    console.log(

        "CTM PATH™ Header Updated:",

        journey.title,

        currentPage

    );


}








/* ==========================================================================
   AUTO INITIALIZATION

   Works with dynamically injected components

========================================================================== */


function initializeHeader(){


    updateHeader();


}





if(

    document.readyState === "loading"

){



    document.addEventListener(

        "DOMContentLoaded",

        initializeHeader

    );



}

else{


    initializeHeader();


}








/* ==========================================================================
   PUBLIC API
========================================================================== */


window.CTM_HEADER = {


    update:

        updateHeader,


    currentPage:

        getCurrentPage



};






})();

