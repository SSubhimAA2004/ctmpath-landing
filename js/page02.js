
/* ==========================================================================
   CTM PATH™ MILLIONAIRES™

   PAGE 02 JAVASCRIPT CONTROLLER

   FINANCIAL CONFIDENCE DISCOVERY™

   Version: 10.0


   Responsibilities:

   ✓ Initialize Page 02
   ✓ Enhance User Experience
   ✓ Save Temporary Progress
   ✓ Prepare Page 03 Transition


========================================================================== */


(function(){


"use strict";





/* ==========================================================================
   PAGE CONFIGURATION
========================================================================== */


const PAGE02_CONFIG = {


    page:

        "02",


    nextPage:

        "page03.html",


    storageKey:

        "CTM_PAGE02_DATA"


};








/* ==========================================================================
   INITIALIZE PAGE
========================================================================== */


function initPage02(){



    console.log(

        "CTM PATH™ MILLIONAIRES™ Page02 Loaded"

    );



    bindInputTracking();



    bindRatingInteraction();



    bindNavigation();



    restoreSavedData();



}









/* ==========================================================================
   INPUT TRACKING
========================================================================== */


function bindInputTracking(){



    const inputs =


        document.querySelectorAll(

            "input, textarea, select"

        );





    inputs.forEach(

        function(input){



            input.addEventListener(

                "change",

                saveProgress

            );



            input.addEventListener(

                "blur",

                saveProgress

            );



        }


    );


}







/* ==========================================================================
   SAVE TEMPORARY PROGRESS
========================================================================== */


function saveProgress(){



    const formData = {};





    const fields =


        document.querySelectorAll(

            "input, textarea, select"

        );





    fields.forEach(

        function(field,index){



            if(field.type === "checkbox"){



                formData[

                    "field_"+index

                ] = field.checked;



            }


            else if(field.type === "radio"){



                if(field.checked){



                    formData[

                        field.name

                    ] = field.value;



                }


            }


            else {



                formData[

                    "field_"+index

                ] = field.value;



            }



        }


    );





    sessionStorage.setItem(


        PAGE02_CONFIG.storageKey,


        JSON.stringify(formData)


    );



}








/* ==========================================================================
   RESTORE PROGRESS
========================================================================== */


function restoreSavedData(){



    const saved =


        sessionStorage.getItem(

            PAGE02_CONFIG.storageKey

        );





    if(!saved){

        return;

    }





    const data =


        JSON.parse(saved);





    const fields =


        document.querySelectorAll(

            "input, textarea, select"

        );





    fields.forEach(

        function(field,index){



            const key =

                "field_"+index;





            if(field.type === "checkbox"){



                field.checked =

                    data[key] || false;



            }


            else if(

                field.type !== "radio"

            ){



                field.value =

                    data[key] || "";



            }



        }


    );



}


 /* ==========================================================================
   RATING INTERACTION
========================================================================== */


function bindRatingInteraction(){



    const ratingButtons =


        document.querySelectorAll(

            ".rating-scale button"

        );





    ratingButtons.forEach(

        function(button){



            button.addEventListener(

                "click",

                function(){



                    const parent =

                        button.parentElement;



                    parent

                        .querySelectorAll(

                            "button"

                        )

                        .forEach(

                            function(item){



                                item.classList.remove(

                                    "selected"

                                );


                            }

                        );





                    button.classList.add(

                        "selected"

                    );



                    saveProgress();



                }


            );



        }


    );



}








/* ==========================================================================
   NAVIGATION
========================================================================== */


function bindNavigation(){



    const button =


        document.querySelector(

            ".journey-button"

        );





    if(!button){

        return;

    }





    button.addEventListener(

        "click",

        function(event){



            event.preventDefault();





            saveProgress();





            console.log(

                "Moving to Page 03 — Life Assessment"

            );





            window.location.href =

                PAGE02_CONFIG.nextPage;



        }


    );



}








/* ==========================================================================
   COMPLETION FEEDBACK
========================================================================== */


function showCompletionMessage(){



    const message =


        document.createElement(

            "div"

        );





    message.className =

        "page-feedback";





    message.innerHTML = `

        <strong>

        Great!

        </strong>

        <br>

        Let's understand your next step.

    `;





    document.body.appendChild(

        message

    );





    setTimeout(

        function(){



            message.remove();



        },

        3000

    );



}








/* ==========================================================================
   PUBLIC PAGE MODULE
========================================================================== */


window.CTM_PAGE02 = {


    init:

        initPage02,


    save:

        saveProgress


};








/* ==========================================================================
   AUTO INITIALIZE
========================================================================== */


document.addEventListener(

    "DOMContentLoaded",

    function(){


        initPage02();


    }

);



})();

