

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
• Support all 36 screens

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
    Preserve Existing State

    Prevent accidental overwrite
    during reloads.

    ==================================================
    */


    CTM.state = CTM.state || {};







    /*
    ==================================================
    Default Application State
    ==================================================
    */


    const defaultState = {



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

        All screen answers stored here.

        Example:

        lifePriorities:[
            "dream-home",
            "travel"
        ]

        =================================================
        */


        responses:{



        },







        /*
        ----------------------------------------------
        Personalization
        ----------------------------------------------
        */


        personalization:{


            language:'ta',


            tamilFirst:true,


            welcomeName:''



        },







        /*
        ----------------------------------------------
        Insights Engine
        ----------------------------------------------
        */


        insights:{



        },







        /*
        ----------------------------------------------
        Recommendations Engine
        ----------------------------------------------
        */


        recommendations:{



        }



    };







    /*
    ==================================================
    Merge Default State

    ==================================================
    */


    CTM.state = {



        ...defaultState,



        ...CTM.state,



        visitor:{



            ...defaultState.visitor,



            ...(CTM.state.visitor || {})



        },



        journey:{



            ...defaultState.journey,



            ...(CTM.state.journey || {})



        },



        responses:{



            ...defaultState.responses,



            ...(CTM.state.responses || {})



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
    Update Complete State
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
    Visitor Management
    ==================================================
    */


    CTM.setVisitor = function(data){



        if(!data){



            return;



        }







        CTM.state.visitor = {



            ...CTM.state.visitor,



            ...data



        };



    };







    CTM.getVisitor = function(){



        return CTM.state.visitor;



    };







    /*
    ==================================================
    Screen Management
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







    CTM.getPreviousScreen = function(){



        return CTM.state.previousScreen;



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







    CTM.isJourneyStarted = function(){



        return CTM.state.journey.started;



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







    CTM.getProgress = function(){



        return CTM.state.journey;



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



        if(!key){



            return null;



        }







        return CTM.state.responses[key];



    };







    CTM.hasResponse = function(key){



        return Object.prototype.hasOwnProperty.call(



            CTM.state.responses,



            key



        );



    };

 


    /*
    ==================================================
    Response Utilities
    ==================================================
    */


    CTM.removeResponse = function(key){



        if(!key){



            return;



        }







        delete CTM.state.responses[key];



    };







    CTM.clearResponses = function(){



        CTM.state.responses = {};



    };







    CTM.mergeResponses = function(data){



        if(!data){



            return;



        }







        CTM.state.responses = {



            ...CTM.state.responses,



            ...data



        };



    };







    /*
    ==================================================
    Personalization Management
    ==================================================
    */


    CTM.setPersonalization = function(data){



        if(!data){



            return;



        }







        CTM.state.personalization = {



            ...CTM.state.personalization,



            ...data



        };



    };







    CTM.getPersonalization = function(){



        return CTM.state.personalization;



    };







    /*
    ==================================================
    Journey Reset

    Used for fresh visitor sessions

    ==================================================
    */


    CTM.resetJourney = function(){



        CTM.state.currentScreen =

            'screen01';



        CTM.state.previousScreen =

            null;







        CTM.state.journey = {



            started:false,



            completed:false,



            progress:0,



            completion:0



        };







        CTM.state.responses = {};







        CTM.state.insights = {};







        CTM.state.recommendations = {};



    };







    /*
    ==================================================
    Initialization Marker
    ==================================================
    */


    CTM.markInitialized = function(){



        CTM.state.initialized = true;



    };







    CTM.isInitialized = function(){



        return CTM.state.initialized;



    };







    /*
    ==================================================
    Debug State

    ==================================================
    */


    CTM.debugState = function(){



        console.table(

            CTM.state

        );



    };







})();
