
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/dashboard.js
   Version     : 1.0
   Status      : LOCKED

   ==========================================================================
   PURPOSE

   Dashboard Presentation Engine™

   Owns

   ✓ Overall Score Card
   ✓ Learner™ / Leader™ / Legend™
   ✓ KALA CHAKRA™ Score
   ✓ Progress Indicators
   ✓ Theme Synchronization

   Does NOT

   ✗ Calculate Scores
   ✗ Read Database
   ✗ Business Logic

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

CTM.Dashboard = (function () {

    /* ======================================================================
       PRIVATE HELPERS
       ====================================================================== */

    function $(selector){

        return document.querySelector(selector);

    }

    function exists(selector){

        return $(selector) !== null;

    }

    function setText(selector,value){

        if(exists(selector)){

            $(selector).textContent = value;

        }

    }

    function setStyle(selector,property,value){

        if(exists(selector)){

            $(selector).style[property] = value;

        }

    }

    /* ======================================================================
       PUBLIC API
       ====================================================================== */

    return {

        /* ==============================================================
           Render Dashboard
           ============================================================== */

        render : function(){

            if(

                !CTM.Engine.hasResult()

            ){

                return;

            }

            const result =

                CTM.Engine.getResult();

            const state =

                CTM.Engine.getState();

            /* ----------------------------------------------------------
               Score
               ---------------------------------------------------------- */

            setText(

                "#dashboardRawScore",

                result.raw + "/30"

            );

            setText(

                "#dashboardPercentage",

                result.percentage + "%"

            );

            /* ----------------------------------------------------------
               Level
               ---------------------------------------------------------- */

            setText(

                "#dashboardLevel",

                result.title

            );

            /* ----------------------------------------------------------
               Theme
               ---------------------------------------------------------- */

            setStyle(

                "#dashboardCard",

                "borderColor",

                result.colour

            );

            setStyle(

                "#dashboardCard",

                "boxShadow",

                "0 0 24px " +

                result.colour

            );

            /* ----------------------------------------------------------
               Symbol
               ---------------------------------------------------------- */

            setText(

                "#dashboardSymbol",

                state.data.presentation.symbol.emoji

            );

            /* ----------------------------------------------------------
               Pillar
               ---------------------------------------------------------- */

            setText(

                "#dashboardTamil",

                state.data.title.tamil

            );

            setText(

                "#dashboardEnglish",

                state.data.title.english

            );

        },



        /* ==============================================================
           Clear Dashboard
           ============================================================== */

        clear : function(){

            setText(

                "#dashboardRawScore",

                "--"

            );

            setText(

                "#dashboardPercentage",

                "--"

            );

            setText(

                "#dashboardLevel",

                "--"

            );

        }

    };

})();

        /* ==============================================================
           Highlight Active Spoke
           ============================================================== */

        highlightSpoke : function(){

            const state =

                CTM.Engine.getState();

            if(!state.data){

                return;

            }

            const spoke =

                state.data.identity.spoke;

            document

                .querySelectorAll(

                    ".wheel-spoke"

                )

                .forEach(function(item){

                    item.classList.remove(

                        "active"

                    );

                });

            const active =

                document.querySelector(

                    '[data-spoke="' +

                    spoke +

                    '"]'

                );

            if(active){

                active.classList.add(

                    "active"

                );

            }

        },



        /* ==============================================================
           Paint Spoke
           ============================================================== */

        paintSpoke : function(){

            if(

                !CTM.Engine.hasResult()

            ){

                return;

            }

            const state =

                CTM.Engine.getState();

            const result =

                CTM.Engine.getResult();

            const spoke =

                document.querySelector(

                    '[data-spoke="' +

                    state.data.identity.spoke +

                    '"]'

                );

            if(!spoke){

                return;

            }

            spoke.style.background =

                result.colour;

            spoke.style.boxShadow =

                "0 0 18px " +

                result.colour;

        },



        /* ==============================================================
           Animate Score
           ============================================================== */

        animateScore : function(){

            if(

                !CTM.Engine.hasResult()

            ){

                return;

            }

            const result =

                CTM.Engine.getResult();

            const score =

                document.querySelector(

                    "#dashboardPercentage"

                );

            if(!score){

                return;

            }

            score.animate(

                [

                    {

                        transform:

                        "scale(.8)",

                        opacity:.4

                    },

                    {

                        transform:

                        "scale(1.15)",

                        opacity:1

                    },

                    {

                        transform:

                        "scale(1)"

                    }

                ],

                {

                    duration:400,

                    easing:"ease-out"

                }

            );

        },



        /* ==============================================================
           Highest Pillar
           ============================================================== */

        renderHighest : function(){

            setText(

                "#highestPillar",

                "Available After Assessment"

            );

        },



        /* ==============================================================
           Lowest Pillar
           ============================================================== */

        renderLowest : function(){

            setText(

                "#lowestPillar",

                "Available After Assessment"

            );

        },



        /* ==============================================================
           Refresh Dashboard
           ============================================================== */

        refresh : function(){

            this.render();

            this.highlightSpoke();

            this.paintSpoke();

            this.animateScore();

            this.renderHighest();

            this.renderLowest();

        },



        /* ==============================================================
           Initialize Dashboard
           ============================================================== */

        init : function(){

            this.clear();

            this.highlightSpoke();

        }

    };

})();



/* ==========================================================================
   LOCK DASHBOARD
   ========================================================================== */

Object.freeze(

    CTM.Dashboard

);



/* ==========================================================================
   END OF FILE

   dashboard.js

   Version : 1.0

   Status

   ✓ COMPLETE
   ✓ LOCKED

   ==========================================================================
*/

