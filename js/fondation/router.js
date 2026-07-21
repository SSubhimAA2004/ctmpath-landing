
/*
======================================================================

CTM PATH™ Guided Journey v1.0

File
js/foundation/router.js

Purpose
Application Router

Responsibility
• Handle screen navigation
• Validate screen requests
• Manage browser URL hash
• Move between journey screens
• Prevent duplicate navigation
• Maintain clean transitions

======================================================================
*/


'use strict';


(() => {



    const CTM = window.CTM;



    if (!CTM) {


        console.error(

            'CTM core has not been initialized.'

        );


        return;


    }







    /*
    ==================================================
    Navigation Control
    ==================================================
    */


    let navigating = false;







    /*
    ==================================================
    Validate Screen
    ==================================================
    */


    CTM.isValidScreen = function(screenId){



        if(!screenId){


            return false;


        }





        return /^screen\d{2}$/.test(

            screenId

        );



    };







    /*
    ==================================================
    Navigate To Screen
    ==================================================
    */


    CTM.navigate = async function(screenId){



        if (

            !CTM.isValidScreen(screenId)

        ){



            console.warn(

                'Invalid screen:',

                screenId

            );



            return false;



        }







        if(navigating){



            return false;



        }







        navigating = true;







        try {



            const success =


                await CTM.loadScreen(

                    screenId

                );







            if(!success){



                return false;



            }







            /*
            Update browser hash

            Example:

            #screen01

            */


            history.replaceState(



                {


                    screen:screenId


                },



                '',



                '#' + screenId



            );







            return true;



        }


        catch(error){



            console.error(

                error

            );



            return false;



        }


        finally {



            navigating = false;



        }



    };







    /*
    ==================================================
    Navigate Next
    ==================================================
    */


    CTM.navigateNext = async function(){



        const current =


            CTM.getCurrentScreen();







        if(!current){



            return;



        }







        const number =


            parseInt(



                current.replace(

                    'screen',

                    ''

                ),



                10



            );







        if (

            number >= CTM.state.totalScreens

        ){



            return;



        }







        const nextScreen =


            'screen' +



            String(

                number + 1

            )

            .padStart(

                2,

                '0'

            );







        await CTM.navigate(

            nextScreen

        );



    };







    /*
    ==================================================
    Navigate Back
    ==================================================
    */


    CTM.navigateBack = async function(){



        const previous =


            CTM.state.previousScreen;







        if(!previous){



            return;



        }







        await CTM.navigate(

            previous

        );



    };







    /*
    ==================================================
    Browser Hash Navigation
    ==================================================
    */


    window.addEventListener(



        'hashchange',



        async function(){



            const screen =


                window.location.hash.replace(

                    '#',

                    ''

                );







            if (

                CTM.isValidScreen(

                    screen

                )

            ){



                await CTM.navigate(

                    screen

                );



            }



        }



    );







    /*
    ==================================================
    Navigation Button Binding
    ==================================================
    */


    CTM.bindNavigation = function(){



        document.addEventListener(



            'click',



            async function(event){



                const button =


                    event.target.closest(

                        '[data-next]'

                    );







                if(!button){



                    return;



                }







                event.preventDefault();







                const nextScreen =


                    button.dataset.next;







                if(nextScreen){



                    await CTM.navigate(

                        nextScreen

                    );



                }



            }



        );



    };







    /*
    ==================================================
    Initialize Router
    ==================================================
    */


    document.addEventListener(



        'DOMContentLoaded',



        function(){



            CTM.bindNavigation();



        }



    );







})();
