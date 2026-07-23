
/*=====================================================================

    CTM PATH™
    FROM SURVIVAL TO LIVING™

    File
    loader.js

    Purpose
    Dynamic Screen Loader

    Responsibilities

    • Load HTML Screens
    • Inject into Screen Container
    • Show / Hide Loading Overlay

======================================================================*/

'use strict';

window.CTM = window.CTM || {};

CTM.loader = {

    /*==================================================
    SCREEN PATH
    ==================================================*/

    screenPath : 'screens/',

    screenContainer : null,

    loadingOverlay : null,



    /*==================================================
    INITIALIZE
    ==================================================*/

    init(){

        this.screenContainer = document.getElementById('screen-container');

        this.loadingOverlay = document.getElementById('loading-overlay');

    },



    /*==================================================
    LOAD SCREEN
    ==================================================*/

    async load(screenNumber){

        const fileName = `screen${String(screenNumber).padStart(2,'0')}.html`;

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

            window.scrollTo({

                top:0,

                behavior:'instant'

            });

            this.hideLoading();

            return true;

        }

        catch(error){

            console.error(

                'Screen Load Error',

                error

            );

            this.hideLoading();

            this.screenContainer.innerHTML = `

                <section class="screen">

                    <div class="glass-card"

                         style="padding:60px;text-align:center;max-width:700px;">

                        <h2 class="section-title-tamil">

                            திரையை ஏற்ற முடியவில்லை

                        </h2>

                        <p class="body-english">

                            Unable to load this screen.

                        </p>

                    </div>

                </section>

            `;

            return false;

        }

    },



    /*==================================================
    SHOW LOADING
    ==================================================*/

    showLoading(){

        if(this.loadingOverlay){

            this.loadingOverlay.classList.remove('hidden');

        }

    },



    /*==================================================
    HIDE LOADING
    ==================================================*/

    hideLoading(){

        if(this.loadingOverlay){

            this.loadingOverlay.classList.add('hidden');

        }

    }

};
