
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/report.js
   Version     : 1.1

   Status      : 🔒 PRODUCTION REPAIR


   PURPOSE

   Assessment Report Interpretation Layer™

   Owns

   ✓ Result Interpretation
   ✓ Pillar Summary
   ✓ Status Messages
   ✓ Reflection Framework
   ✓ Coaching Framework
   ✓ PDF Preparation Object


   Does NOT

   ✗ Calculate Scores
   ✗ Modify Engine State
   ✗ Render Components

   ========================================================================== */


"use strict";


window.CTM = window.CTM || {};



/* ==========================================================================
   REPORT ENGINE
   ========================================================================== */


CTM.Report = (function(){



    /* ======================================================================
       PRIVATE HELPERS
       ====================================================================== */


    function getState(){


        return CTM.Engine.getState();


    }







    function getResult(){


        return CTM.Engine.getResult();


    }







    function getData(){


        const state =

            getState();



        return state.data;


    }







    /* ======================================================================
       PUBLIC API
       ====================================================================== */


    return {



        /* ==============================================================
           Build Summary
           ============================================================== */


        buildSummary : function(){



            if(

                !CTM.Engine.hasResult()

            ){


                return null;


            }







            const state =

                getState();





            const result =

                getResult();





            const data =

                getData();







            return {



                pillar : {



                    tamil :

                        data.title.tamil,



                    english :

                        data.title.english



                },







                symbol :


                    data.presentation.symbol,







                colour :


                    data.presentation.colour,







                score : {



                    raw :


                        result.raw,



                    percentage :


                        result.percentage



                },







                status : {



                    level :


                        result.level,



                    title :


                        result.title,



                    colour :


                        result.colour



                },







                answers :


                    result.answers



            };



        },









        /* ==============================================================
           Build Reflection
           ============================================================== */


        buildReflection : function(){



            const data =

                getData();







            if(!data){


                return null;


            }







            return {



                learner :


                    data.reflection.learner,







                leader :


                    data.reflection.leader,







                legend :


                    data.reflection.legend



            };



        },

       
        /* ==============================================================
           Build Wisdom
           ============================================================== */


        buildWisdom : function(){



            const data =

                getData();







            if(!data){


                return null;


            }







            return {



                learner :


                    data.wisdom.learner,







                leader :


                    data.wisdom.leader,







                legend :


                    data.wisdom.legend



            };



        },









        /* ==============================================================
           Build Coaching Message
           ============================================================== */


        buildCoaching : function(){



            const data =

                getData();







            if(!data){


                return null;


            }







            return {



                learner :


                    data.coaching.learner,







                leader :


                    data.coaching.leader,







                legend :


                    data.coaching.legend



            };



        },









        /* ==============================================================
           Complete Report Object
           ============================================================== */


        generate : function(){



            return {



                summary :


                    this.buildSummary(),







                reflection :


                    this.buildReflection(),







                wisdom :


                    this.buildWisdom(),







                coaching :


                    this.buildCoaching()



            };



        },









        /* ==============================================================
           Format Score
           ============================================================== */


        formatScore : function(score){



            if(!score){


                return "0%";


            }







            return score.percentage + "%";



        },

       
        /* ==============================================================
           Format Status
           ============================================================== */


        formatStatus : function(result){



            if(!result){


                return null;


            }







            return {



                title :


                    result.title,







                level :


                    result.level,







                colour :


                    result.colour



            };



        },









        /* ==============================================================
           Prepare Client Summary
           ============================================================== */


        clientSummary : function(){



            const report =

                this.generate();







            if(

                !report.summary

            ){


                return null;


            }







            return {



                title :


                    report.summary.pillar,







                score :


                    this.formatScore(

                        report.summary.score

                    ),







                status :


                    this.formatStatus(

                        report.summary.status

                    ),







                symbol :


                    report.summary.symbol,







                answers :


                    report.summary.answers



            };



        },









        /* ==============================================================
           Prepare Multi Pillar Report
           ============================================================== */


        buildLifeAlignmentReport : function(){



            const state =

                CTM.Engine.getState();







            return {



                framework :


                    "KALA CHAKRA™",







                assessment :


                    "Life Alignment Scorecard™",







                currentPillar :


                    state.pillar,







                currentResult :


                    CTM.Engine.getResult(),







                generatedAt :


                    CTM.Common.timestamp()



            };



        },









        /* ==============================================================
           PDF Preparation Object
           ============================================================== */


        preparePDF : function(){



            const report =

                this.generate();







            return {



                metadata : {



                    application :


                        CTM.App.name,







                    framework :


                        CTM.App.framework,







                    version :


                        CTM.App.version



                },







                content :


                    report,







                generated :


                    CTM.Common.timestamp()



            };



        },









        /* ==============================================================
           Clear Report Cache
           ============================================================== */


        clear : function(){



            if(

                CTM.State

            ){



                CTM.State.report = {};



            }



        }


       
    };


})();









/* ==========================================================================
   LOCK REPORT

   ========================================================================== */


Object.freeze(

    CTM.Report

);









/* ==========================================================================
   END OF FILE

   report.js

   Version : 1.1

   Status

   ✓ SYNTAX REPAIRED
   ✓ SINGLE NAMESPACE RESTORED
   ✓ REPORT PIPELINE ACTIVE
   ✓ PDF PREPARATION ACTIVE

   ==========================================================================
*/
