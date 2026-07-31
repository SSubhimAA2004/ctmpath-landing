
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   Guided Journey™

   PAGE07
   CONTINUE YOUR GUIDED JOURNEY™

   File:
   js/page07.js

   Responsibility:
   Frontend interaction only

   Backend:
   ReportEngine.gs
   Discovery Session Service

============================================================ */



(function(){


"use strict";





/* ============================================================
   PAGE INITIALIZATION
============================================================ */


document.addEventListener(

    "DOMContentLoaded",

    initializePage07

);





function initializePage07(){


    loadJourneySummary();


    setupReportDownload();


    setupDiscoveryBooking();



}








/* ============================================================
   LOAD JOURNEY SUMMARY
============================================================ */


function loadJourneySummary(){



    const journeyData =

    getJourneySummary();




    if(!journeyData){


        renderDefaultSummary();


        return;


    }





    setValue(

        "lifeScore",

        journeyData.lifeScore

    );




    setValue(

        "alignmentScore",

        journeyData.alignmentScore

    );




    setValue(

        "focusSummary",

        journeyData.focus

    );




}








/* ============================================================
   SESSION DATA
============================================================ */


function getJourneySummary(){



    try {


        const storedData =

        sessionStorage.getItem(

            "ctmJourneySummary"

        );



        if(!storedData){


            return null;


        }




        return JSON.parse(

            storedData

        );



    }

    catch(error){


        console.error(

            "Journey summary loading failed:",

            error

        );



        return null;


    }



}








function setValue(id,value){



    const element =

    document.getElementById(id);



    if(element && value){


        element.textContent=value;


    }


}








/* ============================================================
   DEFAULT SUMMARY
============================================================ */


function renderDefaultSummary(){



    setValue(

        "lifeScore",

        "--"

    );



    setValue(

        "alignmentScore",

        "--"

    );



    setValue(

        "focusSummary",

        "Transformation Focus"

    );



}









/* ============================================================
   REPORT DOWNLOAD
============================================================ */


function setupReportDownload(){



    const button =

    document.getElementById(

        "downloadReportBtn"

    );



    if(!button){


        return;


    }




    button.addEventListener(

        "click",

        function(){


            requestReport();



        }

    );



}







function requestReport(){



    /*
       Future API connection:

       api.generateReport()

       Backend:
       ReportEngine.gs

    */



    console.log(

        "Report generation requested"

    );



}








/* ============================================================
   DISCOVERY SESSION
============================================================ */


function setupDiscoveryBooking(){



    const button =

    document.getElementById(

        "bookDiscoveryBtn"

    );



    if(!button){


        return;


    }





    button.addEventListener(

        "click",

        function(){


            bookDiscoverySession();


        }

    );



}







function bookDiscoverySession(){



    /*
       Future API connection:

       api.bookDiscovery()

       Backend:
       DiscoverySessions

    */



    console.log(

        "Discovery session booking requested"

    );



}








})();

