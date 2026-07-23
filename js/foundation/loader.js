
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    Interactive Life Assessment v1.0

    --------------------------------------------------------------------

    File
    loader.js

    Purpose
    Dynamic Screen Loader

    Responsibilities

    • Load HTML Screens
    • Inject Screen into Application Shell
    • Initialize Screen Module
    • Show / Hide Loading Overlay
    • Scroll To Top

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

CTM.loader = {

    /*==================================================
    PROPERTIES
    ==================================================*/

    screenPath : 'screens/',

    screenContainer : null,

    loadingOverlay : null,



    /*==================================================
    INITIALIZE
    ==================================================*/

    init(){

        this.screenContainer = document.getElementById(
            'screen-container'
        );

        this.loadingOverlay = document.getElementById(
            'loading-overlay'
        );

    },



    /*==================================================
    LOAD SCREEN
    ==================================================*/

    async load(screenNumber){

        const fileName =
            `screen${String(screenNumber).padStart(2,'0')}.html`;

        try{

            this.showLoading();

            const response = await fetch(
                this.screenPath + fileName
            );

            if(!response.ok){

                throw new Error(
                    `Unable to load ${fileName}`
                );

            }

            const html = await response.text();

            this.screenContainer.innerHTML = html;

            /*------------------------------------------
            Scroll To Top
            ------------------------------------------*/

            window.scrollTo({

                top:0,

                left:0,

                behavior:'instant'

            });

            /*------------------------------------------
            Initialize Screen Module

            Example

            screen01
            screen02
            screen03

            ------------------------------------------*/

            const moduleName =
                `screen${String(screenNumber).padStart(2,'0')}`;

            if(

                CTM[moduleName] &&

                typeof CTM[moduleName].init === 'function'

            ){

                CTM[moduleName].init();

            }

            this.hideLoading();

            return true;

        }

        catch(error){

            console.error(

                'CTM Loader Error',

                error

            );

            this.hideLoading();

            this.showError(fileName);

            return false;

        }

    },



    /*==================================================
    SHOW LOADING
    ==================================================*/

    showLoading(){

        if(this.loadingOverlay){

            this.loadingOverlay.classList.remove(
                'hidden'
            );

        }

    },



    /*==================================================
    HIDE LOADING
    ==================================================*/

    hideLoading(){

        if(this.loadingOverlay){

            this.loadingOverlay.classList.add(
                'hidden'
            );

        }

    },



    /*==================================================
    SHOW ERROR
    ==================================================*/

    showError(fileName){

        if(!this.screenContainer){

            return;

        }

        this.screenContainer.innerHTML = `

            <section class="screen">

                <div class="glass-card"
                     style="
                        max-width:700px;
                        padding:60px;
                        text-align:center;
                     ">

                    <h2 class="section-title-tamil">

                        திரையை ஏற்ற முடியவில்லை

                    </h2>

                    <h3 class="section-title-english">

                        Unable to Load Screen

                    </h3>

                    <br>

                    <p class="body-tamil">

                        மீண்டும் முயற்சிக்கவும்.

                    </p>

                    <p class="body-english">

                        Please try again.

                    </p>

                    <br>

                    <p class="help-text">

                        ${fileName}

                    </p>

                </div>

            </section>

        `;

    }

};
