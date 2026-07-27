
/*
==============================================================================
 CTM PATH™ Guided Journey™

 File        : js/storage.js
 Version     : 1.0

 Purpose:
 Browser storage manager.

 Responsibilities:
 - Store visitor session
 - Retrieve visitor identity
 - Maintain journey progress
 - Clear journey data when required

 Rules:
 - No backend calls
 - No scoring logic
 - No assessment calculations

==============================================================================
*/


(function () {


    "use strict";



    /*
    ==========================================================================
       STORAGE KEYS
    ==========================================================================
    */


    const STORAGE_KEYS = {


        VISITOR:

            "ctm_path_visitor",



        JOURNEY:

            "ctm_path_journey",



        LANGUAGE:

            "ctm_path_language"



    };








    /*
    ==========================================================================
       STORAGE MANAGER
    ==========================================================================
    */


    const CTM_STORAGE = {



        /*
        ----------------------------------------------------------------------
           SAVE VISITOR
        ----------------------------------------------------------------------
        */


        saveVisitor:

            function(visitor){


                localStorage.setItem(

                    STORAGE_KEYS.VISITOR,

                    JSON.stringify(visitor)

                );


            },







        /*
        ----------------------------------------------------------------------
           GET VISITOR
        ----------------------------------------------------------------------
        */


        getVisitor:

            function(){


                const visitor =

                    localStorage.getItem(

                        STORAGE_KEYS.VISITOR

                    );



                return visitor

                    ? JSON.parse(visitor)

                    : null;


            },







        /*
        ----------------------------------------------------------------------
           SAVE JOURNEY STATE
        ----------------------------------------------------------------------
        */


        saveJourney:

            function(data){


                localStorage.setItem(

                    STORAGE_KEYS.JOURNEY,

                    JSON.stringify(data)

                );


            },







        /*
        ----------------------------------------------------------------------
           GET JOURNEY STATE
        ----------------------------------------------------------------------
        */


        getJourney:

            function(){


                const journey =

                    localStorage.getItem(

                        STORAGE_KEYS.JOURNEY

                    );



                return journey

                    ? JSON.parse(journey)

                    : {};



            },







        /*
        ----------------------------------------------------------------------
           SAVE LANGUAGE
        ----------------------------------------------------------------------
        */


        saveLanguage:

            function(language){


                localStorage.setItem(

                    STORAGE_KEYS.LANGUAGE,

                    language

                );


            },







        /*
        ----------------------------------------------------------------------
           GET LANGUAGE
        ----------------------------------------------------------------------
        */


        getLanguage:

            function(){


                return localStorage.getItem(

                    STORAGE_KEYS.LANGUAGE

                );


            },







        /*
        ----------------------------------------------------------------------
           CLEAR JOURNEY
        ----------------------------------------------------------------------
        */


        clearJourney:

            function(){


                Object.values(

                    STORAGE_KEYS

                ).forEach(

                    function(key){


                        localStorage.removeItem(key);


                    }

                );


            }





    };








    /*
    ==========================================================================
       EXPOSE GLOBAL STORAGE
    ==========================================================================
    */


    window.CTM_STORAGE = CTM_STORAGE;



})();

