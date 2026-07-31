
/*!
 * ==============================================================
 * CTM PATH™ Guided Journey™
 * Navigation Module
 * --------------------------------------------------------------
 * Version : 1.0 (Working MVP)
 *
 * Responsibilities
 * --------------------------------------------------------------
 * ✓ Load Journey Pages
 * ✓ Handle Next Buttons
 * ✓ Handle Previous Buttons
 * ✓ Track Current Page
 *
 * Never
 * --------------------------------------------------------------
 * ✗ Business Logic
 * ✗ Assessment Calculation
 * ✗ Diagnosis Logic
 * ✗ API Processing
 *
 * ==============================================================
 */


window.CTM = window.CTM || {};



CTM.Navigation = {


    currentPage: 1,


    totalPages: 7,



    /* ==========================================================
       INITIALIZE
    ========================================================== */


    init() {


        this.bindEvents();


        console.log(

            "CTM PATH™ Navigation Ready."

        );


    },



    /* ==========================================================
       EVENT HANDLING
    ========================================================== */


    bindEvents() {


        document.addEventListener(

            "click",

            event => {


                const next = event.target.closest(

                    "[data-next-page]"

                );


                if (next) {


                    const page = Number(

                        next.dataset.nextPage

                    );


                    this.go(page);


                }



                const previous = event.target.closest(

                    "[data-prev-page]"

                );


                if (previous) {


                    const page = Number(

                        previous.dataset.prevPage

                    );


                    this.go(page);


                }


            }

        );


    },



    /* ==========================================================
       FIRST PAGE
    ========================================================== */


    first() {


        return this.go(

            1

        );


    },



    /* ==========================================================
       LOAD PAGE
    ========================================================== */


    async go(pageNumber) {


        if (

            pageNumber < 1 ||

            pageNumber > this.totalPages

        ) {


            return;


        }



        const container = document.querySelector(

            "#app"

        );



        if (!container) {


            console.error(

                "Missing #app container."

            );


            return;


        }



        try {


            const response = await fetch(

                `pages/page0${pageNumber}.html`

            );



            if (!response.ok) {


                throw new Error(

                    `Page ${pageNumber} unavailable`

                );


            }



            container.innerHTML = await response.text();



            this.currentPage = pageNumber;



            this.updateProgress();



            window.scrollTo(

                {

                    top: 0,

                    behavior: "smooth"

                }

            );



            console.log(

                `Loaded Page ${pageNumber}/${this.totalPages}`

            );



        }


        catch(error) {


            console.error(

                "Navigation failed:",

                error

            );


        }


    },



    /* ==========================================================
       PROGRESS
    ========================================================== */


    updateProgress() {


        const progress = document.querySelector(

            "#progress-container"

        );


        if (!progress) {


            return;


        }



        progress.innerHTML = `

            <div class="journey-progress">

                Journey

                ${this.currentPage}

                /

                ${this.totalPages}

            </div>

        `;


    }



};

