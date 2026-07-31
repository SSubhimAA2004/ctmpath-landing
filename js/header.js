
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   File      : header.js
   Version   : 1.0

   Purpose:

   ✓ Dynamic Header Journey Navigator
   ✓ Detect Current Page
   ✓ Update Journey Counter
   ✓ Update Journey Title


   Does NOT:

   ✗ Load pages
   ✗ Handle APIs
   ✗ Manage assessments

========================================================================== */


(function(){

"use strict";



/* ==========================================================================
   JOURNEY CONFIGURATION
========================================================================== */


const HEADER_CONFIG = {


    totalPages: 7,


    journeys:{


        1:
        {
            number:"01",
            title:"BEGINNING YOUR JOURNEY™"
        },


        2:
        {
            number:"02",
            title:"FINANCIAL CONFIDENCE™"
        },


        3:
        {
            number:"03",
            title:"LIFE ALIGNMENT™"
        },


        4:
        {
            number:"04",
            title:"PERSONAL DISCOVERY™"
        },


        5:
        {
            number:"05",
            title:"PERSONAL ROADMAP™"
        },


        6:
        {
            number:"06",
            title:"TRANSFORMATION™"
        },


        7:
        {
            number:"07",
            title:"MILLIONAIRE LEGACY™"
        }


    }


};






/* ==========================================================================
   DETECT CURRENT PAGE
========================================================================== */


function getCurrentPage(){


    const filename =

        window.location.pathname
        .split("/")
        .pop();



    const match =

        filename.match(/page(\d+)/);



    if(match){


        return Number(match[1]);


    }



    return 1;


}







/* ==========================================================================
   UPDATE HEADER
========================================================================== */


function updateHeader(){


    const page =

        getCurrentPage();



    const journey =

        HEADER_CONFIG.journeys[page];



    if(!journey){

        return;

    }




    const counter =

        document.getElementById(
            "journey-counter"
        );




    if(counter){


        counter.textContent =

            journey.number
            +
            " / "
            +
            String(
                HEADER_CONFIG.totalPages
            ).padStart(2,"0");


    }






    const title =

        document.getElementById(
            "journey-title"
        );




    if(title){


        title.textContent =

            journey.title;


    }





    console.log(

        "CTM PATH™ Header Updated:",

        journey.number,

        journey.title

    );


}







/* ==========================================================================
   INITIALIZE
========================================================================== */


document.addEventListener(

"DOMContentLoaded",

function(){


    updateHeader();


});


/* ==========================================================================
   PUBLIC API
========================================================================== */


window.CTM_HEADER = {


    update:updateHeader,


    currentPage:getCurrentPage


};



})();

