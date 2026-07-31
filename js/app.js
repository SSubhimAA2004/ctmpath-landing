
/*!
 * ==============================================================
 * CTM PATH™ Guided Journey™
 * Application Module
 * --------------------------------------------------------------
 * Version : 1.1 (Working MVP Orchestrator)
 * Pattern : Singleton
 *
 * Responsibilities
 * --------------------------------------------------------------
 * ✓ Bootstrap Application
 * ✓ Load Shared Components
 * ✓ Start Guided Journey
 * ✓ Manage Page Navigation
 * ✓ Bind Global Events
 * ✓ Handle Startup Errors
 *
 * Never
 * --------------------------------------------------------------
 * ✗ Business Logic
 * ✗ Assessment Calculation
 * ✗ Diagnosis Logic
 * ✗ API Processing
 * ✗ Data Rules
 *
 * ==============================================================
 */


window.CTM = window.CTM || {};



/* ==============================================================
   APPLICATION CLASS
============================================================== */


class App {


    /* ==========================================================
       PRIVATE STATE
    ========================================================== */


    #initialized = false;


    #starting = false;


    #currentPage = 1;


    #totalPages = 7;




    /* ==========================================================
       INITIALIZE APPLICATION
    ========================================================== */


    async init() {


        if (this.#initialized) {

            return;

        }


        if (this.#starting) {

            return;

        }


        this.#starting = true;



        try {


            console.log(

                "CTM PATH™ Starting..."

            );



            await this.#loadComponents();



            await this.#bindEvents();



            await this.#startJourney();



            this.#initialized = true;



            console.log(

                "CTM PATH™ Ready."

            );


        }


        catch(error) {


            this.#handleError(

                error

            );


        }


        finally {


            this.#starting = false;


        }


    }




    /* ==========================================================
       PUBLIC STATUS
    ========================================================== */


    isInitialized() {


        return this.#initialized;


    }



    getCurrentPage() {


        return this.#currentPage;


    }



    getTotalPages() {


        return this.#totalPages;


    }



    /* ==========================================================
       NEXT:

       Batch 1B

       #loadComponents()
       #loadHeader()
       #loadFooter()
       #bindEvents()
       #startJourney()

    ========================================================== */

    /* ==========================================================
       LOAD SHARED COMPONENTS

       Header
       Footer

    ========================================================== */


    async #loadComponents() {


        await this.#loadHeader();


        await this.#loadFooter();



        console.log(

            "CTM PATH™ Components Loaded."

        );


    }




    /* ==========================================================
       LOAD HEADER COMPONENT

    ========================================================== */


    async #loadHeader() {


        const container = document.querySelector(

            "#header-container"

        );



        if (!container) {


            console.warn(

                "Header container not found."

            );


            return;


        }



        try {


            const response = await fetch(

                "components/header.html"

            );



            if (!response.ok) {


                throw new Error(

                    "Header component unavailable."

                );


            }



            container.innerHTML = await response.text();



        }


        catch(error) {


            console.error(

                "Header loading failed.",

                error

            );


        }


    }




    /* ==========================================================
       LOAD FOOTER COMPONENT

    ========================================================== */


    async #loadFooter() {


        const container = document.querySelector(

            "#footer-container"

        );



        if (!container) {


            console.warn(

                "Footer container not found."

            );


            return;


        }



        try {


            const response = await fetch(

                "components/footer.html"

            );



            if (!response.ok) {


                throw new Error(

                    "Footer component unavailable."

                );


            }



            container.innerHTML = await response.text();



        }


        catch(error) {


            console.error(

                "Footer loading failed.",

                error

            );


        }


    }




    /* ==========================================================
       GLOBAL EVENTS

    ========================================================== */


    async #bindEvents() {


        document.addEventListener(

            "click",

            event => {


                const nextButton = event.target.closest(

                    "[data-next-page]"

                );



                if (nextButton) {


                    const pageNumber = Number(

                        nextButton.dataset.nextPage

                    );



                    this.loadPage(

                        pageNumber

                    );


                }



                const previousButton = event.target.closest(

                    "[data-prev-page]"

                );



                if (previousButton) {


                    const pageNumber = Number(

                        previousButton.dataset.prevPage

                    );



                    this.loadPage(

                        pageNumber

                    );


                }


            }

        );


    }




    /* ==========================================================
       START JOURNEY

    ========================================================== */


    async #startJourney() {


        const hashPage = Number(

            location.hash.replace(

                "#page",

                ""

            )

        );



        if (

            hashPage >= 1 &&

            hashPage <= this.#totalPages

        ) {


            await this.loadPage(

                hashPage

            );


        }

        else {


            await this.loadPage(

                1

            );


        }


    }




    /* ==========================================================
       NEXT:

       Batch 1C

       loadPage()

       #handleError()

       destroy()

       restart()

       dispose()

       Closing class brace

       Singleton export

       DOMContentLoaded

    ========================================================== */

    /* ==========================================================
       LOAD PAGE

       page01.html → page07.html

    ========================================================== */


    async loadPage(pageNumber) {


        if (

            pageNumber < 1 ||

            pageNumber > this.#totalPages

        ) {


            return;


        }



        const container = document.querySelector(

            "#app"

        );



        if (!container) {


            console.error(

                "Application container #app missing."

            );


            return;


        }



        try {


            const response = await fetch(

                `pages/page0${pageNumber}.html`

            );



            if (!response.ok) {


                throw new Error(

                    `Page ${pageNumber} not found.`

                );


            }



            container.innerHTML = await response.text();



            this.#currentPage = pageNumber;



            location.hash =

                `page${pageNumber}`;



            window.scrollTo(

                {

                    top: 0,

                    behavior: "smooth"

                }

            );



            console.log(

                `Loaded CTM PATH™ Page ${pageNumber}/${this.#totalPages}`

            );


        }


        catch(error) {


            this.#handleError(

                error

            );


        }


    }




    /* ==========================================================
       ERROR HANDLING

    ========================================================== */


    #handleError(error) {


        console.error(

            "CTM PATH™ Application Error:",

            error

        );



        const container = document.querySelector(

            "#app"

        );



        if (container) {


            container.innerHTML = `

                <section class="error-screen">

                    <h2>
                        Something went wrong
                    </h2>

                    <p>
                        Please refresh and try again.
                    </p>

                </section>

            `;


        }


    }




    /* ==========================================================
       DESTROY

    ========================================================== */


    async destroy() {


        this.#initialized = false;


        this.#currentPage = 1;



        const container = document.querySelector(

            "#app"

        );



        if (container) {


            container.innerHTML = "";


        }



        console.log(

            "CTM PATH™ Application stopped."

        );


    }




    /* ==========================================================
       RESTART

    ========================================================== */


    async restart() {


        await this.destroy();


        await this.init();


    }




    /* ==========================================================
       DISPOSE

    ========================================================== */


    async dispose() {


        await this.destroy();


    }


}




/* ==============================================================
   SINGLETON EXPORT
============================================================== */


CTM.App = new App();




/* ==============================================================
   APPLICATION ENTRY POINT
============================================================== */


document.addEventListener(

    "DOMContentLoaded",

    async () => {


        await CTM.App.init();


    }

);




/* ==============================================================
   CTM PATH™ MVP ORCHESTRATOR v1.1

   Flow

   Browser

      ↓

   App.init()

      ↓

   Header Component

      ↓

   Footer Component

      ↓

   Page 01

      ↓

   Page 02

      ↓

   Page 03

      ↓

   Page 04

      ↓

   Page 05

      ↓

   Page 06

      ↓

   Page 07


   Status

   WORKING MVP ORCHESTRATOR v1.1

   EOF

============================================================== */

