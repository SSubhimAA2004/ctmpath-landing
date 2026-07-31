
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   FILE:
   page04.js

   PAGE:
   KALA CHAKRA™ LIFE ALIGNMENT RESULT™

   VERSION:
   10.0


   RESPONSIBILITIES:

   ✓ Read Assessment Data
   ✓ Calculate Alignment Score
   ✓ Generate Life Level
   ✓ Identify Strengths
   ✓ Identify Growth Areas


   DOES NOT:

   ✗ Generate Reports
   ✗ Send Emails
   ✗ Database Operations

========================================================================== */


(function(){


"use strict";





/* ==========================================================================
   CONFIGURATION
========================================================================== */


const PAGE04_CONFIG = {


    storageKey:

        "CTM_PAGE03_ALIGNMENT",



    nextPage:

        "page05.html",



    maxScore:

        120



};







/* ==========================================================================
   LIFE PILLAR DEFINITIONS
========================================================================== */


const PILLARS = [


    {
        name:"Purpose™",
        icon:"🎯"
    },


    {
        name:"Health™",
        icon:"❤️"
    },


    {
        name:"Relationships™",
        icon:"🤝"
    },


    {
        name:"Character & Integrity™",
        icon:"🛡"
    },


    {
        name:"Learning & Mastery™",
        icon:"📚"
    },


    {
        name:"Career & Contribution™",
        icon:"💼"
    },


    {
        name:"Financial Freedom™",
        icon:"💰"
    },


    {
        name:"Time Freedom™",
        icon:"⏳"
    },


    {
        name:"Community & Tribe™",
        icon:"🌍"
    },


    {
        name:"Systems & Productivity™",
        icon:"⚙"
    },


    {
        name:"Service & Impact™",
        icon:"❤️"
    },


    {
        name:"Vision & Legacy™",
        icon:"🌟"
    }


];








/* ==========================================================================
   STATE
========================================================================== */


let alignmentData = {};








/* ==========================================================================
   INITIALIZE PAGE
========================================================================== */


function initPage04(){


    console.log(

        "CTM PATH™ MILLIONAIRES™ Page04 Loaded"

    );



    loadAssessmentData();



    calculateAlignment();



    renderResults();



    bindInteractions();



}








/* ==========================================================================
   LOAD PAGE03 DATA
========================================================================== */


function loadAssessmentData(){



    const stored =


        sessionStorage.getItem(

            PAGE04_CONFIG.storageKey

        );





    if(stored){


        alignmentData =

            JSON.parse(stored);


    }

    else{


        console.warn(

            "No Page03 assessment found"

        );


    }


}








/* ==========================================================================
   CALCULATE ALIGNMENT
========================================================================== */


function calculateAlignment(){



    let total = 0;



    Object.values(

        alignmentData

    ).forEach(

        function(score){


            total += Number(score);


        }

    );





    alignmentData.totalScore = total;



    alignmentData.percentage =


        Math.round(

            (

            total /

            PAGE04_CONFIG.maxScore

            )

            *

            100

        );





}


 /* ==========================================================================
   DETERMINE LIFE LEVEL
========================================================================== */


function determineLifeLevel(){



    const percentage =

        alignmentData.percentage || 0;





    if(percentage >= 85){


        return "🌟 MASTER™";


    }



    if(percentage >= 70){


        return "🚀 LEADER™";


    }



    if(percentage >= 55){


        return "🔥 BUILDER™";


    }



    if(percentage >= 40){


        return "🌱 EXPLORER™";


    }



    return "🌅 BEGINNER™";


}








/* ==========================================================================
   FIND STRONGEST PILLAR
========================================================================== */


function findStrongestPillar(){



    let highest = -1;


    let strongest = null;





    PILLARS.forEach(

        function(pillar,index){



            const score =

                Number(

                    alignmentData[

                        pillar.name

                    ]

                ) || 0;





            if(score > highest){



                highest = score;



                strongest = {


                    ...pillar,


                    score:score


                };



            }



        }


    );





    return strongest;



}








/* ==========================================================================
   FIND GROWTH OPPORTUNITY
========================================================================== */


function findGrowthOpportunity(){



    let lowest = 11;


    let opportunity = null;





    PILLARS.forEach(

        function(pillar){



            const score =

                Number(

                    alignmentData[

                        pillar.name

                    ]

                ) || 0;





            if(score < lowest){



                lowest = score;



                opportunity = {


                    ...pillar,


                    score:score


                };



            }



        }


    );





    return opportunity;



}









/* ==========================================================================
   RENDER RESULTS
========================================================================== */


function renderResults(){



    const percentage =

        document.getElementById(

            "alignment-percentage"

        );





    if(percentage){


        percentage.textContent =

            alignmentData.percentage

            +

            "%";


    }







    const score =

        document.getElementById(

            "alignment-score"

        );





    if(score){


        score.textContent =

            alignmentData.totalScore

            +

            " / "

            +

            PAGE04_CONFIG.maxScore;



    }








    const level =

        document.getElementById(

            "life-level"

        );





    if(level){


        level.textContent =

            determineLifeLevel();


    }







    renderInsights();



    renderPillarScores();



    renderLifeWheel();



}








/* ==========================================================================
   RENDER INSIGHT CARDS
========================================================================== */


function renderInsights(){



    const strongest =

        findStrongestPillar();




    const growth =

        findGrowthOpportunity();







    const strongestElement =

        document.getElementById(

            "strongest-pillar"

        );





    if(

        strongestElement &&

        strongest

    ){


        strongestElement.textContent =


            strongest.icon

            +

            " "

            +

            strongest.name;



    }








    const strongestScore =

        document.getElementById(

            "strongest-score"

        );





    if(

        strongestScore &&

        strongest

    ){


        strongestScore.textContent =


            strongest.score

            +

            " / 10";



    }








    const growthElement =

        document.getElementById(

            "growth-pillar"

        );





    if(

        growthElement &&

        growth

    ){


        growthElement.textContent =


            growth.icon

            +

            " "

            +

            growth.name;



    }







    const growthScore =

        document.getElementById(

            "growth-score"

        );





    if(

        growthScore &&

        growth

    ){


        growthScore.textContent =


            growth.score

            +

            " / 10";



    }



}

 /* ==========================================================================
   RENDER PILLAR SCORES
========================================================================== */


function renderPillarScores(){



    const container =

        document.getElementById(

            "pillar-score-list"

        );





    if(!container){


        return;


    }





    container.innerHTML = "";






    PILLARS.forEach(

        function(pillar){



            const score =

                alignmentData[

                    pillar.name

                ] || 0;





            const row =

                document.createElement(

                    "div"

                );





            row.className =

                "pillar-row";







            row.innerHTML = `

            
                <span>

                    ${pillar.icon}

                    ${pillar.name}

                </span>



                <strong>

                    ${score} / 10

                </strong>


            `;






            container.appendChild(row);



        }


    );


}









/* ==========================================================================
   KALA CHAKRA™ WHEEL RENDERING
========================================================================== */


function renderLifeWheel(){



    const wheel =

        document.getElementById(

            "kala-wheel"

        );





    if(!wheel){


        return;


    }







    wheel.innerHTML = "";






    const total =

        PILLARS.length;






    PILLARS.forEach(

        function(pillar,index){



            const score =

                alignmentData[

                    pillar.name

                ] || 0;






            const segment =

                document.createElement(

                    "div"

                );






            segment.className =

                "wheel-segment";







            segment.style.setProperty(

                "--position",

                index

            );







            segment.innerHTML = `

            
                <span>

                    ${pillar.icon}

                </span>



                <strong>

                    ${score}

                </strong>


            `;






            wheel.appendChild(

                segment

            );



        }


    );



}









/* ==========================================================================
   PILLAR DETAIL TOGGLE
========================================================================== */


function bindInteractions(){



    const toggle =

        document.getElementById(

            "pillar-toggle-button"

        );





    const list =

        document.getElementById(

            "pillar-score-list"

        );






    if(

        toggle &&

        list

    ){



        toggle.addEventListener(

            "click",

            function(){



                list.classList.toggle(

                    "active"

                );





                toggle.textContent =


                    list.classList.contains(

                        "active"

                    )


                    ?

                    "Hide 12 Pillar Scores™"


                    :

                    "View All 12 Pillar Scores™";



            }


        );



    }








    const diagnosisButton =

        document.getElementById(

            "diagnosis-button"

        );






    if(diagnosisButton){



        diagnosisButton.addEventListener(

            "click",

            function(){



                /*
                   Future:

                   api.generateDiagnosis()

                */





                window.location.href =

                    PAGE04_CONFIG.nextPage;



            }


        );



    }



}









/* ==========================================================================
   PUBLIC PAGE MODULE
========================================================================== */


window.CTM_PAGE04 = {


    init:

        initPage04,


    getAlignment:

        function(){



            return alignmentData;



        }


};



})();

