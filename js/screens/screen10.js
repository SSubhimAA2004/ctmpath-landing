
/*
======================================================================

CTM PATH™ Guided Journey v6.2

SCREEN 10 — YOUR WHY™

File:
js/screens/screen10.js

Purpose:
Purpose Discovery

Responsibilities

• Initialise Screen
• Render Visitor Name
• Handle WHY selection
• Save Life WHY
• Enable Navigation
• Continue to Screen 11

======================================================================
*/


"use strict";


(() => {


    const CTM = window.CTM;


    if(!CTM) return;





    /*==================================================
    Screen Configuration
    ==================================================*/


    CTM.screen10 = {


        id:"screen10",


        nextScreen:"screen11"


    };







    /*==================================================
    DOM Cache
    ==================================================*/


    const DOM = {


        whyGrid:null,


        whyCards:[],


        confirmation:null,


        next:null,


        visitorNames:[]


    };







    /*==================================================
    WHY Data

    Single Source

    ==================================================*/


    const WHY_OPTIONS = {


        family:{


            ta:"அன்பும் குடும்பமும்",


            en:"To love and care for my family"


        },



        security:{


            ta:"பாதுகாப்பு",


            en:"To create security and stability"


        },



        freedom:{


            ta:"சுதந்திரம்",


            en:"To live life on my own terms"


        },



        growth:{


            ta:"வளர்ச்சி",


            en:"To become the best version of myself"


        },



        achievement:{


            ta:"சாதனை",


            en:"To achieve my dreams and goals"


        },



        peace:{


            ta:"மகிழ்ச்சியும் அமைதியும்",


            en:"To live with peace and happiness"


        },



        health:{


            ta:"ஆரோக்கியம்",


            en:"To enjoy a healthy life"


        },



        contribution:{


            ta:"பங்களிப்பு",


            en:"To make a difference in others' lives"


        },



        recognition:{


            ta:"அங்கீகாரம்",


            en:"To be valued and respected"


        },



        meaning:{


            ta:"அர்த்தமுள்ள வாழ்க்கை",


            en:"To live a meaningful life"


        }


    };








    /*==================================================
    Selected WHY

    ==================================================*/


    let selectedWhy = null;







    /*==================================================
    Initialise

    ==================================================*/


    CTM.initScreen10 = function(){


        cacheDOM();


        renderVisitorName();


        bindWhySelection();


        bindNavigation();


        restoreSelection();


    };







    /*==================================================
    Cache DOM

    ==================================================*/


    function cacheDOM(){



        DOM.whyGrid =

            document.getElementById(

                "why-grid"

            );



        DOM.whyCards =

            [

                ...document.querySelectorAll(

                    "#screen10 .why-card"

                )

            ];



        DOM.confirmation =

            document.getElementById(

                "why-confirmation"

            );



        DOM.next =

            document.getElementById(

                "screen10-next"

            );



        DOM.visitorNames =

            [

                ...document.querySelectorAll(

                    "#screen10 .visitor-name"

                )

            ];



    }







    /*==================================================
    Visitor Name

    ==================================================*/


    function renderVisitorName(){


        const name =


            window.CTM_STATE?.visitorName ||


            localStorage.getItem(

                "ctmVisitorName"

            ) || "";



        DOM.visitorNames.forEach(

            element => {


                element.textContent = name;


            }

        );


    }








    /*==================================================
    WHY Selection

    ==================================================*/


    function bindWhySelection(){



        DOM.whyCards.forEach(card=>{


            card.addEventListener(

                "click",

                ()=>{


                    selectWhy(

                        card.dataset.why

                    );


                }

            );


        });



    }







    function selectWhy(id){



        selectedWhy = id;



        DOM.whyCards.forEach(card=>{


            card.classList.remove(

                "selected"

            );


        });



        const selectedCard =

            DOM.whyCards.find(

                card =>

                    card.dataset.why === id

            );



        if(selectedCard){


            selectedCard.classList.add(

                "selected"

            );


        }



        DOM.whyGrid.classList.add(

            "has-selection"

        );



        saveWhy(id);



        showConfirmation();



        enableNext();



    }








    /*==================================================
    Save WHY

    ==================================================*/


    function saveWhy(id){



        const data = {


            id:id,


            tamil:

                WHY_OPTIONS[id]?.ta || "",


            english:

                WHY_OPTIONS[id]?.en || ""


        };



        window.CTM_STATE =

            window.CTM_STATE || {};



        window.CTM_STATE.lifeWhy = data;



        localStorage.setItem(

            "ctmLifeWhy",

            JSON.stringify(data)

        );


    }







    /*==================================================
    Confirmation

    ==================================================*/


    function showConfirmation(){


        if(!DOM.confirmation){

            return;

        }



        DOM.confirmation.classList.add(

            "active"

        );


    }







    /*==================================================
    Enable Continue

    ==================================================*/


    function enableNext(){



        if(DOM.next){


            DOM.next.disabled = false;


        }


    }







    /*==================================================
    Restore Existing Selection

    ==================================================*/


    function restoreSelection(){



        let saved = null;



        try{


            saved = JSON.parse(

                localStorage.getItem(

                    "ctmLifeWhy"

                )

            );


        }

        catch{


            saved = null;

        }



        if(saved?.id){


            selectWhy(

                saved.id

            );


        }


    }







    /*==================================================
    Navigation

    ==================================================*/


    function bindNavigation(){



        if(!DOM.next){

            return;

        }



        DOM.next.addEventListener(

            "click",

            ()=>{


                if(!selectedWhy){

                    return;

                }



                CTM.navigate(

                    CTM.screen10.nextScreen

                );


            }

        );


    }







    /*==================================================
    Refresh

    ==================================================*/


    CTM.refreshScreen10 = function(){


        cacheDOM();


        renderVisitorName();


        restoreSelection();


    };







    /*==================================================
    Screen Loaded Hook

    ==================================================*/


    CTM.afterScreen10Loaded = function(){



        const screen =

            document.getElementById(

                "screen10"

            );



        if(!screen){

            return;

        }



        CTM.initScreen10();



    };







    /*==================================================
    Validation

    ==================================================*/


    CTM.validateScreen10 = function(){


        return !!selectedWhy;


    };







    /*==================================================
    Cleanup

    ==================================================*/


    CTM.destroyScreen10 = function(){



        DOM.whyCards.forEach(card=>{


            card.replaceWith(

                card.cloneNode(true)

            );


        });



        DOM.whyCards=[];


        DOM.next=null;


        DOM.confirmation=null;


        DOM.visitorNames=[];


    };







    /*==================================================
    Module Ready

    ==================================================*/


    CTM.log(

        "Screen 10 module loaded."

    );



})();
