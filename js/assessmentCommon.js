
/* ==========================================================================
   CTM PATH™
   KALA CHAKRA™ v3.0

   File        : js/assessmentCommon.js
   Version     : 1.0
   Status      : LOCKED

   ==========================================================================
   PURPOSE

   Shared Utility Library™

   Owns

   ✓ DOM Helpers
   ✓ Storage Helpers
   ✓ Formatting
   ✓ Animation
   ✓ Scroll Helpers

   Does NOT

   ✗ Business Logic
   ✗ Scoring
   ✗ Rendering

   ========================================================================== */

"use strict";

window.CTM = window.CTM || {};

CTM.Common = (function () {

    /* ==============================================================
       DOM
       ============================================================== */

    function $(selector){

        return document.querySelector(selector);

    }

    function $all(selector){

        return document.querySelectorAll(selector);

    }

    function exists(selector){

        return $(selector) !== null;

    }

    /* ==============================================================
       PUBLIC API
       ============================================================== */

    return {

        /* ----------------------------------------------------------
           Query
           ---------------------------------------------------------- */

        query : function(selector){

            return $(selector);

        },

        queryAll : function(selector){

            return $all(selector);

        },

        exists : function(selector){

            return exists(selector);

        },

        /* ----------------------------------------------------------
           Text
           ---------------------------------------------------------- */

        text : function(selector,value){

            if(!exists(selector)){

                return;

            }

            $(selector).textContent = value;

        },

        /* ----------------------------------------------------------
           HTML
           ---------------------------------------------------------- */

        html : function(selector,value){

            if(!exists(selector)){

                return;

            }

            $(selector).innerHTML = value;

        },

        /* ----------------------------------------------------------
           Style
           ---------------------------------------------------------- */

        style : function(

            selector,

            property,

            value

        ){

            if(!exists(selector)){

                return;

            }

            $(selector).style[property] = value;

        },

        /* ----------------------------------------------------------
           Add Class
           ---------------------------------------------------------- */

        addClass : function(

            selector,

            className

        ){

            if(!exists(selector)){

                return;

            }

            $(selector).classList.add(

                className

            );

        },

        /* ----------------------------------------------------------
           Remove Class
           ---------------------------------------------------------- */

        removeClass : function(

            selector,

            className

        ){

            if(!exists(selector)){

                return;

            }

            $(selector).classList.remove(

                className

            );

        },

        /* ----------------------------------------------------------
           Toggle Class
           ---------------------------------------------------------- */

        toggleClass : function(

            selector,

            className

        ){

            if(!exists(selector)){

                return;

            }

            $(selector).classList.toggle(

                className

            );

        }

               /* ----------------------------------------------------------
           Scroll To Top
           ---------------------------------------------------------- */

        scrollTop : function(){

            window.scrollTo({

                top : 0,

                behavior : "smooth"

            });

        },



        /* ----------------------------------------------------------
           Scroll Into View
           ---------------------------------------------------------- */

        scrollIntoView : function(selector){

            if(!exists(selector)){

                return;

            }

            $(selector).scrollIntoView({

                behavior : "smooth",

                block : "start"

            });

        },



        /* ----------------------------------------------------------
           Fade In
           ---------------------------------------------------------- */

        fadeIn : function(selector){

            if(!exists(selector)){

                return;

            }

            const element = $(selector);

            element.style.opacity = "0";

            element.style.display = "";

            requestAnimationFrame(function(){

                element.style.transition =

                    "opacity .30s ease";

                element.style.opacity = "1";

            });

        },



        /* ----------------------------------------------------------
           Fade Out
           ---------------------------------------------------------- */

        fadeOut : function(selector){

            if(!exists(selector)){

                return;

            }

            const element = $(selector);

            element.style.transition =

                "opacity .30s ease";

            element.style.opacity = "0";

            setTimeout(function(){

                element.style.display = "none";

            },300);

        },



        /* ----------------------------------------------------------
           Save Local
           ---------------------------------------------------------- */

        saveLocal : function(key,value){

            localStorage.setItem(

                key,

                JSON.stringify(value)

            );

        },



        /* ----------------------------------------------------------
           Load Local
           ---------------------------------------------------------- */

        loadLocal : function(key){

            const value =

                localStorage.getItem(key);

            if(!value){

                return null;

            }

            return JSON.parse(value);

        },



        /* ----------------------------------------------------------
           Remove Local
           ---------------------------------------------------------- */

        removeLocal : function(key){

            localStorage.removeItem(key);

        },



        /* ----------------------------------------------------------
           Format Percentage
           ---------------------------------------------------------- */

        formatPercentage : function(value){

            return Number(value) + "%";

        },



        /* ----------------------------------------------------------
           Format Score
           ---------------------------------------------------------- */

        formatScore : function(

            score,

            maximum

        ){

            return score + "/" + maximum;

        },



        /* ----------------------------------------------------------
           Delay
           ---------------------------------------------------------- */

        delay : function(milliseconds){

            return new Promise(function(resolve){

                setTimeout(

                    resolve,

                    milliseconds

                );

            });

        },



        /* ----------------------------------------------------------
           Debounce
           ---------------------------------------------------------- */

        debounce : function(callback,wait){

            let timeout;

            return function(){

                clearTimeout(timeout);

                timeout = setTimeout(

                    callback.bind(

                        this,

                        ...arguments

                    ),

                    wait

                );

            };

        },



        /* ----------------------------------------------------------
           Throttle
           ---------------------------------------------------------- */

        throttle : function(callback,wait){

            let waiting = false;

            return function(){

                if(waiting){

                    return;

                }

                callback.apply(

                    this,

                    arguments

                );

                waiting = true;

                setTimeout(function(){

                    waiting = false;

                },wait);

            };

        },

                      /* ----------------------------------------------------------
           Load HTML Component
           ---------------------------------------------------------- */

        loadComponent : async function(options){

            const config = Object.assign({

                target : null,

                source : null,

                replace : true,

                cache : false,

                callback : null

            }, options);

            if(!config.target){

                throw new Error(

                    "Component target is required."

                );

            }

            if(!config.source){

                throw new Error(

                    "Component source is required."

                );

            }

            const container =

                document.querySelector(

                    config.target

                );

            if(!container){

                throw new Error(

                    "Target element not found : " +

                    config.target

                );

            }

            const response =

                await fetch(

                    config.source,

                    {

                        cache :

                        config.cache

                        ? "force-cache"

                        : "no-store"

                    }

                );

            if(!response.ok){

                throw new Error(

                    "Unable to load component : " +

                    config.source

                );

            }

            const html =

                await response.text();

            if(config.replace){

                container.innerHTML = html;

            }

            else{

                container.insertAdjacentHTML(

                    "beforeend",

                    html

                );

            }

            if(

                typeof config.callback ===

                "function"

            ){

                config.callback(

                    container

                );

            }

            return container;

        },



        /* ----------------------------------------------------------
           Generate UUID
           ---------------------------------------------------------- */

        uuid : function(){

            return crypto.randomUUID();

        },



        /* ----------------------------------------------------------
           Timestamp
           ---------------------------------------------------------- */

        timestamp : function(){

            return new Date().toISOString();

        },



        /* ----------------------------------------------------------
           Clone Object
           ---------------------------------------------------------- */

        clone : function(object){

            return structuredClone(object);

        },



        /* ----------------------------------------------------------
           Freeze Object
           ---------------------------------------------------------- */

        freeze : function(object){

            return Object.freeze(object);

        }

    };

})();



/* ==========================================================================
   LOCK COMMON
   ========================================================================== */

Object.freeze(

    CTM.Common

);



/* ==========================================================================
   END OF FILE

   assessmentCommon.js

   Version : 1.0

   Status

   ✓ COMPLETE
   ✓ LOCKED

   ==========================================================================
*/

