
/*!
 * ==============================================================
 * CTM PATH™ Guided Journey™
 * Application Module
 * --------------------------------------------------------------
 * Version : 1.0 (Working MVP Orchestrator)
 * Pattern : Singleton
 * Author  : CTM PATH™ Engineering
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
       NEXT BATCH

       Batch 1B

       --------------------------------------

       #loadComponents()

       #loadHeader()

       #loadFooter()

       #bindEvents()

       #startJourney()

       loadPage()

    ========================================================== */


}

/* ==============================================================
   LOAD SHARED COMPONENTS

   Header
   Footer

============================================================== */


async #loadComponents() {


    await this.#loadHeader();


    await this.#loadFooter();


    console.log(

        "CTM PATH™ Components Loaded."

    );


}



/* ==============================================================
   LOAD HEADER

============================================================== */


async #loadHeader() {


    const container = document.querySelector(

        "#header"

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


        container.innerHTML = await response.text();



    }

    catch(error) {


        console.error(

            "Header loading failed.",

            error

        );


    }


}




/* ==============================================================
   LOAD FOOTER

============================================================== */


async #loadFooter() {


    const container = document.querySelector(

        "#footer"

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


        container.innerHTML = await response.text();



    }

    catch(error) {


        console.error(

            "Footer loading failed.",

            error

        );


    }


}





/* ==============================================================
   GLOBAL EVENTS

============================================================== */


async #bindEvents() {


    document.addEventListener(

        "click",

        event => {


            const button = event.target.closest(

                "[data-next-page]"

            );


            if (!button) {


                return;


            }



            const nextPage = Number(

                button.dataset.nextPage

            );



            if (nextPage) {


                this.loadPage(

                    nextPage

                );


            }


        }

    );



    window.addEventListener(

        "popstate",

        () => {


            const page = Number(

                location.hash.replace(

                    "#page",

                    ""

                )

            );



            if (page) {


                this.loadPage(

                    page

                );


            }


        }

    );


}





/* ==============================================================
   START JOURNEY

============================================================== */


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





/* ==============================================================
   LOAD PAGE

   page01.html → page07.html

============================================================== */


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

                `Page ${pageNumber} not found`

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

            `Loaded CTM PATH™ Page ${pageNumber}/7`

        );



    }

    catch(error) {


        this.#handleError(

            error

        );


    }


}



/* ==============================================================
   Remaining

   Batch 1C

   --------------------------------------

   #handleError()

   destroy()

   Singleton Export

   DOMContentLoaded

   EOF

============================================================== */


/* ==============================================================
   ERROR HANDLING

============================================================== */


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




/* ==============================================================
   DESTROY

============================================================== */


async destroy() {


    this.#initialized = false;


    this.#currentPage = 1;



    const app = document.querySelector(

        "#app"

    );


    if (app) {


        app.innerHTML = "";


    }



    console.log(

        "CTM PATH™ Application stopped."

    );


}




/* ==============================================================
   RESTART

============================================================== */


async restart() {


    await this.destroy();


    await this.init();


}




/* ==============================================================
   DISPOSE

============================================================== */


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
   WORKING MVP ORCHESTRATOR v1.0

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


   Responsibilities

   ✓ Component Loading

   ✓ Page Loading

   ✓ Navigation Triggering

   ✓ Startup Handling

   ✓ Error Handling


   Preserved

   ✓ Existing Components

   ✓ Existing CSS

   ✓ Existing Page Content

   ✓ Existing Seven Page Journey


   Status

   CTM PATH™ MVP ORCHESTRATOR v1.0

   EOF

============================================================== */

