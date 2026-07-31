
/* ============================================================
   CTM PATH™ MILLIONAIRES™
   Guided Journey™

   PAGE05
   PERSONAL LIFE DIAGNOSIS™

   File:
   js/page05.js

   Responsibility:
   Frontend interaction only

   Backend Intelligence:
   DiagnosisEngine.gs

============================================================ */



(function(){


"use strict";



/* ============================================================
   PAGE INITIALIZATION
============================================================ */


document.addEventListener(
"DOMContentLoaded",
initializePage05
);



function initializePage05(){


    loadDiagnosisData();


    setupNavigation();


}





/* ============================================================
   LOAD DIAGNOSIS DATA
============================================================ */


function loadDiagnosisData(){



    let diagnosisData = getDiagnosisData();



    if(!diagnosisData){

        renderDefaultState();

        return;

    }



    renderPrimaryInsight(
        diagnosisData.primaryInsight
    );



    renderStrengths(
        diagnosisData.strengths
    );



    renderGrowthAreas(
        diagnosisData.growthAreas
    );



    renderRootPatterns(
        diagnosisData.rootPatterns
    );



    renderObservation(
        diagnosisData.professionalObservation
    );



}





/* ============================================================
   SESSION DATA READER
============================================================ */


function getDiagnosisData(){


    try {


        const storedData =
        sessionStorage.getItem(
            "ctmDiagnosis"
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
            "Diagnosis data loading failed:",
            error
        );


        return null;


    }



}







/* ============================================================
   RENDER FUNCTIONS
============================================================ */


function renderPrimaryInsight(text){


    const element =
    document.getElementById(
        "primaryInsight"
    );


    if(element && text){

        element.textContent=text;

    }


}





function renderStrengths(items){


    const container =
    document.getElementById(
        "strengthList"
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







function renderGrowthAreas(items){


    const container =
    document.getElementById(
        "growthList"
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







function renderRootPatterns(items){


    const container =
    document.getElementById(
        "rootPatterns"
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
            "pattern-item";


            div.textContent=item;


            container.appendChild(div);



        }
    );



}







function renderObservation(text){


    const element =
    document.getElementById(
        "professionalObservation"
    );


    if(element && text){

        element.textContent=text;

    }



}







/* ============================================================
   DEFAULT STATE
   Used before backend integration
============================================================ */


function renderDefaultState(){



    renderPrimaryInsight(

        "Your personal life diagnosis will appear here after completing your journey assessment."

    );



    renderStrengths([

        "Your strongest life pillars will be identified here."

    ]);



    renderGrowthAreas([

        "Your highest growth opportunities will be identified here."

    ]);



    renderRootPatterns([

        "Your recurring life patterns will appear here."

    ]);



    renderObservation(

        "Your professional observation will be generated after analysing your complete journey profile."

    );



}








/* ============================================================
   PAGE06 NAVIGATION
============================================================ */


function setupNavigation(){



    const button =
    document.getElementById(
        "continueRoadmapBtn"
    );



    if(!button){

        return;

    }




    button.addEventListener(
        "click",
        function(){



            window.location.href=
            "page06.html";



        }
    );



}





})();

