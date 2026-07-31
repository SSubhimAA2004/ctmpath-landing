
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   Guided Journey™

   PAGE06
   PERSONAL TRANSFORMATION PRESCRIPTION™

   File:
   js/page06.js

   Responsibility:
   Frontend interaction only

   Backend Intelligence:
   RoadmapEngine.gs

============================================================ */



(function(){


"use strict";





/* ============================================================
   PAGE INITIALIZATION
============================================================ */


document.addEventListener(
    "DOMContentLoaded",
    initializePage06
);





function initializePage06(){


    loadRoadmapData();


    setupNavigation();


}








/* ============================================================
   LOAD ROADMAP DATA
============================================================ */


function loadRoadmapData(){



    const roadmapData =
    getRoadmapData();



    if(!roadmapData){


        renderDefaultState();


        return;


    }




    renderPrimaryFocus(
        roadmapData.primaryFocus
    );



    renderFoundation(
        roadmapData.foundation
    );



    renderGrowth(
        roadmapData.growth
    );



    renderLeadership(
        roadmapData.leadership
    );



    renderDailyRhythm(
        roadmapData.dailyRhythm
    );



    renderOutcomes(
        roadmapData.expectedOutcomes
    );



}








/* ============================================================
   DATA READER
============================================================ */


function getRoadmapData(){



    try {


        const storedData =

        sessionStorage.getItem(
            "ctmRoadmap"
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

            "Roadmap data loading failed:",
            error

        );


        return null;


    }


}









/* ============================================================
   RENDER FUNCTIONS
============================================================ */



function renderPrimaryFocus(text){


    const element =

    document.getElementById(
        "primaryFocus"
    );



    if(element && text){


        element.textContent=text;


    }


}







function renderFoundation(text){


    renderText(
        "foundationPhase",
        text
    );


}





function renderGrowth(text){


    renderText(
        "growthPhase",
        text
    );


}





function renderLeadership(text){


    renderText(
        "leadershipPhase",
        text
    );


}





function renderText(id,text){


    const element =

    document.getElementById(id);



    if(element && text){


        element.textContent=text;


    }


}








function renderDailyRhythm(items){



    const container =

    document.getElementById(
        "dailyRhythm"
    );



    if(!container || !items){


        return;


    }



    container.innerHTML="";




    items.forEach(
        function(item){



            const div =

            document.createElement(
                "div"
            );



            div.className=
            "rhythm-item";



            div.textContent=item;



            container.appendChild(div);



        }
    );



}








function renderOutcomes(items){



    const container =

    document.getElementById(
        "expectedOutcomes"
    );



    if(!container || !items){


        return;


    }




    container.innerHTML="";



    items.forEach(
        function(item){



            const li =

            document.createElement(
                "li"
            );



            li.textContent=item;



            container.appendChild(li);



        }
    );



}









/* ============================================================
   DEFAULT STATE
   Temporary until backend connection
============================================================ */


function renderDefaultState(){



    renderPrimaryFocus(

        "Your transformation focus will be generated after analysing your complete life diagnosis."

    );




    renderFoundation(

        "Build your foundation through clarity, discipline and consistent daily actions."

    );




    renderGrowth(

        "Expand your capabilities, confidence and personal effectiveness."

    );




    renderLeadership(

        "Create greater impact through leadership and contribution."

    );




    renderDailyRhythm([


        "Morning reflection and intention setting",


        "Focused learning and personal growth",


        "Daily priority execution",


        "Evening review and improvement"



    ]);




    renderOutcomes([


        "Greater clarity about your direction",


        "Stronger daily success habits",


        "Improved alignment between vision and action"



    ]);



}









/* ============================================================
   PAGE07 NAVIGATION
============================================================ */


function setupNavigation(){



    const button =

    document.getElementById(
        "continueFinalJourneyBtn"
    );



    if(!button){


        return;


    }




    button.addEventListener(

        "click",

        function(){


            window.location.href=
            "page07.html";


        }

    );



}






})();

