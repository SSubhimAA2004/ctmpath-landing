
/*
======================================================================

CTM PATH™ Guided Journey v1.0

File
js/foundation/state.js

Purpose
Application State Management

Responsibility
• Create global CTM namespace
• Maintain visitor journey state
• Track current screen
• Store responses
• Store personalization data
• Manage journey progress

======================================================================
*/


'use strict';


(() => {



    /*
    ==================================================
    Create Global Namespace
    ==================================================
    */


    window.CTM = window.CTM || {};


    const CTM = window.CTM;







    /*
    ==================================================
    Application Version
    ==================================================
    */


    CTM.version = '1.0';







    /*
    ==================================================
    Global Application State
    ==================================================
    */


    CTM.state = {


        /*
        ----------------------------------------------
        System
        ----------------------------------------------
        */


        initialized:false,


        currentScreen:'screen01',


        previousScreen:null,



        totalScreens:36,







        /*
        ----------------------------------------------
        Visitor Profile
        ----------------------------------------------
        */


        visitor:{


            id:'',


            name:'',


            firstName:'',


            mobile:'',


            email:'',


            city:''



        },







        /*
        ----------------------------------------------
        Journey Status
        ----------------------------------------------
        */


        journey:{


            started:false,


            completed:false,


            progress:0,


            completion:0



        },







        /*
        ----------------------------------------------
        User Responses

        Screens will add values here

        Example:

        dream:
        [
            "home",
            "travel"
        ]

        ----------------------------------------------
        */


        responses:{



        },







        /*
        ----------------------------------------------
        Personalization Data
        ----------------------------------------------
        */


        personalization:{


            language:'ta',


            tamilFirst:true



        },







        /*
        ----------------------------------------------
        Insights

        Future screens populate this

        ----------------------------------------------
        */


        insights:{



        },







        /*
        ----------------------------------------------
        Recommendations

        Future screens populate this

        ----------------------------------------------
        */


        recommendations:{



        }



    };







    /*
    ==================================================
    Get Full State
    ==================================================
    */


    CTM.getState = function(){



        return CTM.state;



    };







    /*
    ==================================================
    Update State
    ==================================================
    */


    CTM.updateState = function(data){



        if(!data){


            return;


        }



        CTM.state = {


            ...CTM.state,


            ...data



        };



    };







    /*
    ==================================================
    Current Screen Management
    ==================================================
    */


    CTM.getCurrentScreen = function(){



        return CTM.state.currentScreen;



    };







    CTM.setCurrentScreen = function(screenId){



        if(!screenId){


            return;


        }



        CTM.state.previousScreen =

            CTM.state.currentScreen;



        CTM.state.currentScreen =

            screenId;



    };







    /*
    ==================================================
    Journey Controls
    ==================================================
    */


    CTM.startJourney = function(){



        CTM.state.journey.started = true;



    };







    CTM.completeJourney = function(){



        CTM.state.journey.completed = true;



    };







    /*
    ==================================================
    Progress Tracking
    ==================================================
    */


    CTM.setProgress = function(screenNumber){



        if(!screenNumber){


            return;


        }



        CTM.state.journey.progress =

            screenNumber;



        CTM.state.journey.completion =


            Math.round(


                (

                    screenNumber /

                    CTM.state.totalScreens


                ) * 100


            );



    };







    /*
    ==================================================
    Response Management
    ==================================================
    */


    CTM.setResponse = function(key,value){



        if(!key){


            return;


        }



        CTM.state.responses[key] = value;



    };







    CTM.getResponse = function(key){



        return CTM.state.responses[key];



    };







    CTM.clearResponses = function(){



        CTM.state.responses = {};



    };







    /*
    ==================================================
    Initialization Marker
    ==================================================
    */


    CTM.markInitialized = function(){



        CTM.state.initialized = true;



    };







})();
