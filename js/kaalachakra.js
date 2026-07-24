
/*=============================================================================

    CTM PATH™

    FROM SURVIVAL TO LIVING™

    FILE

    kaalachakra.js

    PURPOSE

    Screen 15 Controller

    RESPONSIBILITIES

    • Read Assessment Results
    • Draw Kala Chakra™
    • Display Overall Score
    • Continue To Diagnosis™

=============================================================================*/


'use strict';



/*=============================================================================
    GLOBAL NAMESPACE
=============================================================================*/


window.CTM = window.CTM || {};



/*=============================================================================
    KALA CHAKRA MODULE
=============================================================================*/


CTM.kaalachakra=(function(){



/*=============================================================================
    MODULE VARIABLES
=============================================================================*/


let svg=null;

let overallScore=null;

let continueButton=null;



const SIZE=800;

const CENTER=400;

const MAX_RADIUS=300;



const SPOKES=[

"Purpose",

"Health",

"Relationships",

"Character",

"Financial",

"Mind",

"Growth",

"Discipline",

"Gratitude",

"Contribution",

"Meaning",

"Legacy"

];



let scores=[];



/*=============================================================================
    INITIALIZE
=============================================================================*/


function init(){



    svg=document.getElementById(

        "wheelSvg"

    );



    overallScore=document.getElementById(

        "overallScore"

    );



    continueButton=document.getElementById(

        "continueDiagnosis"

    );



    loadScores();



    drawWheel();



    drawRadar();



    displayOverall();



    attachEvents();



}



/*=============================================================================
    EVENTS
=============================================================================*/


function attachEvents(){



    continueButton.addEventListener(

        "click",

        function(){

            CTM.router.go(

                "diagnosis"

            );

        }

    );



}



/*=============================================================================
    LOAD SCORES
=============================================================================*/


function loadScores(){



    scores=[

        CTM.storage.getPillarScore("purpose")||0,

        CTM.storage.getPillarScore("health")||0,

        CTM.storage.getPillarScore("relationships")||0,

        CTM.storage.getPillarScore("character")||0,

        CTM.storage.getPillarScore("financialStewardship")||0,

        CTM.storage.getPillarScore("mind")||0,

        CTM.storage.getPillarScore("growth")||0,

        CTM.storage.getPillarScore("discipline")||0,

        CTM.storage.getPillarScore("gratitude")||0,

        CTM.storage.getPillarScore("contribution")||0,

        CTM.storage.getPillarScore("innerMeaning")||0,

        CTM.storage.getPillarScore("legacy")||0

    ];



}



/*=============================================================================
    DISPLAY OVERALL
=============================================================================*/


function displayOverall(){



    const total=

        scores.reduce(

            function(sum,value){

                return sum+value;

            },

            0

        );



    const average=

        Math.round(

            total/

            scores.length

        );



    overallScore.textContent=

        average+"%";



}



/*=============================================================================
    DRAW WHEEL
=============================================================================*/


function drawWheel(){



    svg.innerHTML="";



    drawRings();



    drawAxes();



    drawLabels();



}

                 /*=============================================================================
    DRAW CONCENTRIC RINGS
=============================================================================*/


function drawRings(){



    const levels=[

        20,

        40,

        60,

        80,

        100

    ];



    levels.forEach(function(level){



        const radius=

            (level/100)

            *

            MAX_RADIUS;



        const circle=

            document.createElementNS(

                "http://www.w3.org/2000/svg",

                "circle"

            );



        circle.setAttribute(

            "cx",

            CENTER

        );



        circle.setAttribute(

            "cy",

            CENTER

        );



        circle.setAttribute(

            "r",

            radius

        );



        circle.setAttribute(

            "class",

            "ring"

        );



        svg.appendChild(

            circle

        );



        /*---------------------------------------------
            Percentage Label
        ---------------------------------------------*/



        const label=

            document.createElementNS(

                "http://www.w3.org/2000/svg",

                "text"

            );



        label.setAttribute(

            "x",

            CENTER+radius+10

        );



        label.setAttribute(

            "y",

            CENTER-4

        );



        label.textContent=

            level+"%";



        svg.appendChild(

            label

        );



    });



}



/*=============================================================================
    DRAW AXES
=============================================================================*/


function drawAxes(){



    const total=

        SPOKES.length;



    for(

        let i=0;

        i<total;

        i++

    ){



        const angle=

            (

                Math.PI*2

            )

            /

            total

            *

            i

            -

            Math.PI/2;



        const x=

            CENTER+

            Math.cos(angle)

            *

            MAX_RADIUS;



        const y=

            CENTER+

            Math.sin(angle)

            *

            MAX_RADIUS;



        const line=

            document.createElementNS(

                "http://www.w3.org/2000/svg",

                "line"

            );



        line.setAttribute(

            "x1",

            CENTER

        );



        line.setAttribute(

            "y1",

            CENTER

        );



        line.setAttribute(

            "x2",

            x

        );



        line.setAttribute(

            "y2",

            y

        );



        line.setAttribute(

            "class",

            "axis"

        );



        svg.appendChild(

            line

        );



    }



}



/*=============================================================================
    DRAW LABELS
=============================================================================*/


function drawLabels(){



    const total=

        SPOKES.length;



    for(

        let i=0;

        i<total;

        i++

    ){



        const angle=

            (

                Math.PI*2

            )

            /

            total

            *

            i

            -

            Math.PI/2;



        const labelRadius=

            MAX_RADIUS+42;



        const x=

            CENTER+

            Math.cos(angle)

            *

            labelRadius;



        const y=

            CENTER+

            Math.sin(angle)

            *

            labelRadius;



        const label=

            document.createElementNS(

                "http://www.w3.org/2000/svg",

                "text"

            );



        label.setAttribute(

            "x",

            x

        );



        label.setAttribute(

            "y",

            y

        );



        label.setAttribute(

            "text-anchor",

            "middle"

        );



        label.setAttribute(

            "dominant-baseline",

            "middle"

        );



        label.textContent=

            SPOKES[i];



        svg.appendChild(

            label

        );



    }



}



/*=============================================================================
    HELPER

    POLAR → CARTESIAN
=============================================================================*/


function polarToCartesian(

    angle,

    percentage

){



    const radius=

        (

            percentage

            /

            100

        )

        *

        MAX_RADIUS;



    return{

        x:

            CENTER+

            Math.cos(angle)

            *

            radius,



        y:

            CENTER+

            Math.sin(angle)

            *

            radius

    };

}

                 /*=============================================================================
    DRAW RADAR POLYGON
=============================================================================*/


function drawRadar(){



    const total=

        SPOKES.length;



    let points=[];



    for(

        let i=0;

        i<total;

        i++

    ){



        const angle=

            (

                Math.PI*2

            )

            /

            total

            *

            i

            -

            Math.PI/2;



        const point=

            polarToCartesian(

                angle,

                scores[i]

            );



        points.push(

            point.x+

            ","+

            point.y

        );



        drawScorePoint(

            point.x,

            point.y,

            scores[i]

        );



    }



    const polygon=

        document.createElementNS(

            "http://www.w3.org/2000/svg",

            "polygon"

        );



    polygon.setAttribute(

        "points",

        points.join(

            " "

        )

    );



    polygon.setAttribute(

        "class",

        "polygon"

    );



    svg.appendChild(

        polygon

    );



}



/*=============================================================================
    DRAW SCORE POINT
=============================================================================*/


function drawScorePoint(

    x,

    y,

    value

){

    const point=

        document.createElementNS(

            "http://www.w3.org/2000/svg",

            "circle"

        );



    point.setAttribute(

        "cx",

        x

    );



    point.setAttribute(

        "cy",

        y

    );



    point.setAttribute(

        "r",

        5

    );



    point.setAttribute(

        "fill",

        getPointColour(

            value

        )

    );



    point.setAttribute(

        "stroke",

        "#FFFFFF"

    );



    point.setAttribute(

        "stroke-width",

        "2"

    );



    svg.appendChild(

        point

    );



}



/*=============================================================================
    POINT COLOUR
=============================================================================*/


function getPointColour(

    value

){



    if(

        value<=30

    ){

        return "#C0392B";

    }



    if(

        value<=70

    ){

        return "#D68910";

    }



    return "#1F7A45";



}



/*=============================================================================
    ANIMATE POLYGON
=============================================================================*/


function animatePolygon(){



    const polygon=

        svg.querySelector(

            ".polygon"

        );



    if(

        !polygon

    ){

        return;

    }



    polygon.animate(

        [

            {

                opacity:0,

                transform:

                    "scale(.82)"

            },

            {

                opacity:1,

                transform:

                    "scale(1)"

            }

        ],

        {

            duration:900,

            easing:"ease-out",

            fill:"forwards"

        }

    );



}



/*=============================================================================
    SAVE CURRENT PAGE
=============================================================================*/


function savePage(){



    if(

        CTM.storage.setCurrentPage

    ){

        CTM.storage.setCurrentPage(

            "kaalachakra.html"

        );

    }



}



/*=============================================================================
    UPDATE STATUS
=============================================================================*/


function updateStatus(){



    if(

        CTM.storage.setCompletionStatus

    ){

        CTM.storage.setCompletionStatus(

            "Kala Chakra"

        );

    }



}



/*=============================================================================
    START
=============================================================================*/


function start(){



    savePage();



    updateStatus();



    init();



    animatePolygon();



}



/*=============================================================================
    PUBLIC API
=============================================================================*/


return{

    init:start

};



})();



/*=============================================================================
    APPLICATION START
=============================================================================*/


document.addEventListener(

    "DOMContentLoaded",

    function(){



        CTM.kaalachakra.init();



    }

);



/*=============================================================================

    END OF FILE

=============================================================================*/
