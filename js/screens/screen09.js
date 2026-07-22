
/*
======================================================================

CTM PATH™ Guided Journey v6.2

SCREEN 09 — YOUR CHOICE™

File:
js/screens/screen09.js

Purpose
Dynamic Personalisation

Responsibilities

• Initialise Screen
• Render Visitor Name
• Render Dream Orbit
• Render Selected Dream Cards
• Sequential Dream Animation
• Navigate to Screen 10

======================================================================
*/

"use strict";


(() => {


    const CTM = window.CTM;


    if (!CTM) return;




    /*==================================================
    Screen Configuration
    ==================================================*/


    CTM.screen09 = {


        id:"screen09",


        nextScreen:"screen10"


    };





    /*==================================================
    Cached DOM
    ==================================================*/


    const DOM = {


        orbit:null,


        selectedDreamsGrid:null,


        next:null,


        visitorNames:[]


    };






    /*==================================================
    Dream Icons
    ==================================================*/


    const DREAM_ICONS = {


        home:"🏡",


        family:"👨‍👩‍👧",


        education:"🎓",


        travel:"✈️",


        health:"❤️",


        peace:"😊",


        "financial-freedom":"💰",


        business:"🚀",


        time:"⏰",


        passion:"🎨",


        service:"🤝",


        freedom:"🌍"


    };






    /*==================================================
    Dream Names
    ==================================================*/


    const DREAM_NAMES = {


        home:{

            ta:"என் சொந்த வீடு",

            en:"Own My Dream Home"

        },


        family:{

            ta:"குடும்ப பாதுகாப்பு",

            en:"Secure My Family"

        },


        education:{

            ta:"குழந்தைகளின் கல்வி",

            en:"Children's Education"

        },


        travel:{

            ta:"உலகம் சுற்றிப் பார்க்க",

            en:"Travel the World"

        },


        health:{

            ta:"நல்ல உடல்நலம்",

            en:"Better Health"

        },


        peace:{

            ta:"மன அமைதி",

            en:"Peace of Mind"

        },


        "financial-freedom":{

            ta:"நிதி சுதந்திரம்",

            en:"Financial Freedom"

        },


        business:{

            ta:"என் சொந்த தொழில்",

            en:"Start My Own Business"

        },


        time:{

            ta:"எனக்கான நேரம்",

            en:"More Time For Myself"

        },


        passion:{

            ta:"என் கனவை வாழ",

            en:"Live My Passion"

        },


        service:{

            ta:"பிறருக்கு உதவ",

            en:"Help Other People"

        },


        freedom:{

            ta:"நான் விரும்பும் வாழ்க்கை",

            en:"Live Life On My Own Terms"

        }


    };






    function getDreamTamil(id){


        return DREAM_NAMES[id]?.ta || "";


    }





    function getDreamEnglish(id){


        return DREAM_NAMES[id]?.en || "";


    }







    /*==================================================
    Initialise
    ==================================================*/


    CTM.initScreen09 = function(){


        cacheDOM();


        renderVisitorName();


        renderDreamOrbit();


        renderSelectedDreams();


        bindEvents();


    };








    /*==================================================
    Cache DOM
    ==================================================*/


    function cacheDOM(){


        DOM.orbit =

            document.getElementById(

                "dream-orbit"

            );



        DOM.selectedDreamsGrid =

            document.getElementById(

                "selected-dreams-grid"

            );



        DOM.next =

            document.getElementById(

                "screen09-next"

            );



        DOM.visitorNames = [

            ...document.querySelectorAll(

                "#screen09 .visitor-name"

            )

        ];


    }







    /*==================================================
    Render Visitor Name
    ==================================================*/


    function renderVisitorName(){


        const name =


            window.CTM_STATE?.visitorName ||


            localStorage.getItem(

                "ctmVisitorName"

            ) ||


            "";



        DOM.visitorNames.forEach(

            element => {


                element.textContent = name;


            }

        );


    }







    /*==================================================
    Get Dreams

    Preserve selection order

    ==================================================*/


    function getDreams(){


        if(


            Array.isArray(

                window.CTM_STATE?.dreamLife

            )


        ){


            return [

                ...window.CTM_STATE.dreamLife

            ];


        }





        try{


            return JSON.parse(

                localStorage.getItem(

                    "ctmDreamLife"

                )

            ) || [];



        }


        catch{


            return [];

        }


    }







    /*==================================================
    Render Selected Dreams

    Dynamic Card Rendering

    ==================================================*/


    function renderSelectedDreams(){


        if(!DOM.selectedDreamsGrid){

            return;

        }



        DOM.selectedDreamsGrid.innerHTML = "";



        const dreams = getDreams();



        if(!dreams.length){

            return;

        }





        dreams.forEach(dreamId=>{



            const card =

                document.createElement(

                    "div"

                );



            card.className =

                "dream-card readonly";



            card.innerHTML = `


                <div class="dream-card-inner">


                    <div class="dream-icon">

                        ${

                            DREAM_ICONS[dreamId] || "✨"

                        }

                    </div>


                    <div class="dream-title-ta">

                        ${

                            getDreamTamil(dreamId)

                        }

                    </div>


                    <div class="dream-title-en">

                        ${

                            getDreamEnglish(dreamId)

                        }

                    </div>


                </div>


            `;



            DOM.selectedDreamsGrid.appendChild(card);



        });


    }








    /*==================================================
    Render Dream Orbit

    Preserves Selection Order

    ==================================================*/


    function renderDreamOrbit(){


        if(!DOM.orbit) return;



        DOM.orbit.innerHTML = "";



        const dreams = getDreams();



        if(dreams.length === 0){


            return;


        }






        const orbitSize =

            DOM.orbit.offsetWidth || 360;



        const center = orbitSize / 2;



        const radius = orbitSize * .36;







        dreams.forEach((dreamId,index)=>{


            const angle =


                (-90 + (360 / dreams.length) * index)

                *

                Math.PI / 180;





            const x =

                center +

                Math.cos(angle) * radius;



            const y =

                center +

                Math.sin(angle) * radius;






            const node =

                document.createElement(

                    "div"

                );





            node.className =

                "dream-node";





            node.dataset.dream =

                dreamId;





            node.innerHTML =

                DREAM_ICONS[dreamId] || "✨";





            node.style.left =

                `${x - 32}px`;





            node.style.top =

                `${y - 32}px`;





            node.style.animationDelay =

                `${index*.35}s`;





            DOM.orbit.appendChild(node);



        });





        startSequentialPulse();



    }







    /*==================================================
    Sequential Pulse

    ==================================================*/


    function startSequentialPulse(){


        const nodes =


            DOM.orbit.querySelectorAll(

                ".dream-node"

            );





        if(!nodes.length){

            return;

        }






        let index = 0;






        function pulseNext(){


            nodes.forEach(node=>


                node.classList.remove(

                    "pulse"

                )

            );





            nodes[index].classList.add(

                "pulse"

            );





            index++;





            if(index >= nodes.length){


                index = 0;


            }


        }






        pulseNext();






        window.clearInterval(

            CTM.screen09PulseTimer

        );





        CTM.screen09PulseTimer =


            window.setInterval(

                pulseNext,

                900

            );



    }







    /*==================================================
    Continue Journey

    ==================================================*/


    function continueJourney(){


        window.clearInterval(

            CTM.screen09PulseTimer

        );



        CTM.navigate(

            CTM.screen09.nextScreen

        );


    }







    /*==================================================
    Click Handler

    ==================================================*/


    function handleClick(event){


        const nextButton =


            event.target.closest(

                "#screen09-next"

            );



        if(!nextButton){

            return;

        }



        event.preventDefault();



        continueJourney();



    }







    /*==================================================
    Bind Events

    ==================================================*/


    function bindEvents(){


        document.removeEventListener(

            "click",

            handleClick

        );



        document.addEventListener(

            "click",

            handleClick

        );


    }







    /*==================================================
    Unbind Events

    ==================================================*/


    function unbindEvents(){


        document.removeEventListener(

            "click",

            handleClick

        );


    }







    /*==================================================
    Refresh Screen

    ==================================================*/


    CTM.refreshScreen09 = function(){


        cacheDOM();


        renderVisitorName();


        renderDreamOrbit();


        renderSelectedDreams();



    };







    /*==================================================
    Screen Loaded Hook

    ==================================================*/


    CTM.afterScreen09Loaded = function(){


        const screen =

            document.getElementById(

                "screen09"

            );



        if(!screen){

            return;

        }



        CTM.initScreen09();



    };







    /*==================================================
    Validation

    ==================================================*/


    CTM.validateScreen09 = function(){


        return true;


    };







    /*==================================================
    Cleanup

    ==================================================*/


    CTM.destroyScreen09 = function(){


        unbindEvents();



        window.clearInterval(

            CTM.screen09PulseTimer

        );



        DOM.orbit = null;


        DOM.selectedDreamsGrid = null;


        DOM.next = null;


        DOM.visitorNames = [];



    };







    /*==================================================
    Module Ready

    ==================================================*/


    CTM.log(

        "Screen 09 module loaded."

    );



})();
