
/**
 * =============================================================================
 * CTM PATH™ MILLIONAIRES™
 * Guided Journey™
 *
 * File  : js/page07.js
 * Page  : 07 — Final CTA / Mentorship Invitation
 *
 * PURPOSE
 * -----------------------------------------------------------------------------
 * Page 07 is the final conversion page of the Guided Journey.
 *
 * Responsibilities:
 *
 *   • Confirm Page 07 runtime is ready
 *   • Restore visitor name when available
 *   • Mark the Guided Journey as completed locally
 *   • Track CTA interactions locally
 *   • Support CTA links without backend dependency
 *
 * IMPORTANT
 * -----------------------------------------------------------------------------
 * Page 07 DOES NOT:
 *
 *   • Generate reports
 *   • Generate PDFs
 *   • Call DocumentService
 *   • Generate roadmaps
 *   • Send completion email
 *   • Require backend success to render
 *
 * Page 06 owns completion-email delivery.
 *
 * =============================================================================
 */

'use strict';


(function () {


    /* ======================================================================
       CONFIGURATION
    ====================================================================== */

    const PAGE07_CONFIG = {

        pageNumber: 7,

        pageName:
            "MILLIONAIRE INVITATION",

        journeyStorageKey:
            "ctmJourneyState",

        completedStorageKey:
            "ctmGuidedJourneyCompleted",

        ctaStorageKey:
            "ctmPage07LastCTA"

    };


    /* ======================================================================
       RUNTIME STATE
    ====================================================================== */

    const page07State = {

        initialized:
            false,

        fullName:
            "",

        completedAt:
            null

    };


    /* ======================================================================
       SAFE JSON PARSER
    ====================================================================== */

    function safeParse(value) {

        if (!value) {
            return null;
        }

        try {

            return JSON.parse(
                value
            );

        }
        catch (error) {

            return null;

        }

    }


    /* ======================================================================
       SAFE STORAGE READ
    ====================================================================== */

    function readStorage(
        storage,
        key
    ) {

        try {

            return safeParse(
                storage.getItem(
                    key
                )
            );

        }
        catch (error) {

            return null;

        }

    }


    /* ======================================================================
       FIND FIRST VALUE
    ====================================================================== */

    function firstValue() {

        for (
            let i = 0;
            i < arguments.length;
            i++
        ) {

            const value =
                arguments[i];

            if (
                value !== undefined &&
                value !== null &&
                String(value).trim() !== ""
            ) {

                return String(value).trim();

            }

        }

        return "";

    }


    /* ======================================================================
       RESOLVE VISITOR NAME
    ====================================================================== */

    function resolveVisitorName() {

        /*
         * We intentionally check several existing storage structures.
         *
         * Page 07 must remain tolerant of minor differences between
         * earlier Guided Journey page implementations.
         */

        const possibleKeys = [

            "ctmJourneyIdentity",

            "ctmVisitor",

            "ctmRegistration",

            "ctmPerson",

            "ctmPeople",

            "ctmJourneyState"

        ];


        const stores = [

            sessionStorage,

            localStorage

        ];


        for (
            let s = 0;
            s < stores.length;
            s++
        ) {

            for (
                let k = 0;
                k < possibleKeys.length;
                k++
            ) {

                const data =
                    readStorage(
                        stores[s],
                        possibleKeys[k]
                    );


                if (
                    !data ||
                    typeof data !== "object"
                ) {

                    continue;

                }


                const name =
                    firstValue(

                        data.fullName,

                        data.FullName,

                        data.name,

                        data.Name,

                        data.visitorName,

                        data.personName,

                        data.identity &&
                            data.identity.fullName,

                        data.person &&
                            data.person.fullName

                    );


                if (name) {

                    return name;

                }

            }

        }


        /*
         * Page 06 may expose identity/runtime information globally.
         */

        if (
            window.CTM_JOURNEY_IDENTITY &&
            typeof window.CTM_JOURNEY_IDENTITY === "object"
        ) {

            const runtimeName =
                firstValue(

                    window
                        .CTM_JOURNEY_IDENTITY
                        .fullName,

                    window
                        .CTM_JOURNEY_IDENTITY
                        .name

                );


            if (runtimeName) {

                return runtimeName;

            }

        }


        return "";

    }


    /* ======================================================================
       PERSONALIZE PAGE
    ====================================================================== */

    function personalizePage() {

        const fullName =
            resolveVisitorName();


        page07State.fullName =
            fullName;


        if (!fullName) {

            return;

        }


        /*
         * Optional HTML hooks.
         *
         * Any element in page07.html can use:
         *
         *      data-page07-name
         *
         * Example:
         *
         * <span data-page07-name></span>
         */

        const nameElements =
            document.querySelectorAll(
                "[data-page07-name]"
            );


        nameElements.forEach(
            function (element) {

                element.textContent =
                    fullName;

            }
        );

    }


    /* ======================================================================
       MARK GUIDED JOURNEY COMPLETE
    ====================================================================== */

    function markJourneyComplete() {

        const completedAt =
            new Date().toISOString();


        page07State.completedAt =
            completedAt;


        let journeyState =
            readStorage(
                sessionStorage,
                PAGE07_CONFIG.journeyStorageKey
            );


        if (
            !journeyState ||
            typeof journeyState !== "object"
        ) {

            journeyState = {};

        }


        journeyState.currentPage =
            PAGE07_CONFIG.pageNumber;


        journeyState.currentPageName =
            PAGE07_CONFIG.pageName;


        journeyState.page07Reached =
            true;


        journeyState.page07ReachedAt =
            completedAt;


        journeyState.guidedJourneyCompleted =
            true;


        journeyState.guidedJourneyCompletedAt =
            completedAt;


        journeyState.lastUpdatedAt =
            completedAt;


        /*
         * Session copy
         */

        try {

            sessionStorage.setItem(

                PAGE07_CONFIG.journeyStorageKey,

                JSON.stringify(
                    journeyState
                )

            );

        }
        catch (error) {

            console.warn(
                "Page07: Unable to update session journey state.",
                error
            );

        }


        /*
         * Persistent completion marker
         */

        try {

            localStorage.setItem(

                PAGE07_CONFIG.completedStorageKey,

                JSON.stringify({

                    completed:
                        true,

                    completedAt:
                        completedAt,

                    page:
                        PAGE07_CONFIG.pageNumber

                })

            );

        }
        catch (error) {

            console.warn(
                "Page07: Unable to save completion marker.",
                error
            );

        }

    }


    /* ======================================================================
       CTA TRACKING
    ====================================================================== */

    function saveCTAInteraction(
        ctaName,
        href
    ) {

        const interaction = {

            cta:
                ctaName || "CTA",

            href:
                href || "",

            page:
                PAGE07_CONFIG.pageNumber,

            clickedAt:
                new Date().toISOString()

        };


        try {

            localStorage.setItem(

                PAGE07_CONFIG.ctaStorageKey,

                JSON.stringify(
                    interaction
                )

            );

        }
        catch (error) {

            console.warn(
                "Page07: Unable to store CTA interaction.",
                error
            );

        }

    }


    /* ======================================================================
       BIND CTA LINKS
    ====================================================================== */

    function bindCTAButtons() {

        /*
         * Preferred hook:
         *
         *      data-page07-cta="BOOK_SESSION"
         *
         * Example:
         *
         * <a
         *   href="..."
         *   data-page07-cta="BOOK_SESSION">
         *      Book My Session
         * </a>
         *
         * No preventDefault().
         *
         * The browser follows the CTA normally.
         */

        const buttons =
            document.querySelectorAll(
                "[data-page07-cta]"
            );


        buttons.forEach(
            function (button) {


                if (
                    button.dataset.page07Bound ===
                    "true"
                ) {

                    return;

                }


                button.dataset.page07Bound =
                    "true";


                button.addEventListener(
                    "click",
                    function () {

                        saveCTAInteraction(

                            button.dataset.page07Cta ||
                                "CTA",

                            button.getAttribute(
                                "href"
                            ) || ""

                        );

                    }
                );

            }
        );

    }


    /* ======================================================================
       OPTIONAL SMOOTH SCROLL
    ====================================================================== */

    function bindInternalLinks() {

        const links =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        links.forEach(
            function (link) {


                if (
                    link.dataset.page07ScrollBound ===
                    "true"
                ) {

                    return;

                }


                link.dataset.page07ScrollBound =
                    "true";


                link.addEventListener(
                    "click",
                    function (event) {


                        const href =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !href ||
                            href === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                href
                            );


                        if (!target) {

                            return;

                        }


                        event.preventDefault();


                        target.scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                    }
                );

            }
        );

    }


    /* ======================================================================
       RESET SCROLL POSITION
    ====================================================================== */

    function resetScrollPosition() {

        try {

            window.scrollTo({

                top:
                    0,

                left:
                    0,

                behavior:
                    "instant"

            });

        }
        catch (error) {

            window.scrollTo(
                0,
                0
            );

        }

    }


    /* ======================================================================
       INITIALIZE PAGE 07
    ====================================================================== */

    function initPage07() {

        if (
            page07State.initialized
        ) {

            return;

        }


        page07State.initialized =
            true;


        console.log(
            "CTM PATH™ MILLIONAIRES™ Page07 Initializing..."
        );


        resetScrollPosition();


        personalizePage();


        markJourneyComplete();


        bindCTAButtons();


        bindInternalLinks();


        console.log(
            "CTM PATH™ MILLIONAIRES™ Page07 Ready.",
            {
                page:
                    PAGE07_CONFIG.pageNumber,

                pageName:
                    PAGE07_CONFIG.pageName,

                visitor:
                    page07State.fullName || null,

                completedAt:
                    page07State.completedAt
            }
        );

    }


    /* ======================================================================
       DOM READY
    ====================================================================== */

    if (
        document.readyState ===
        "loading"
    ) {

        document.addEventListener(
            "DOMContentLoaded",
            initPage07
        );

    }
    else {

        initPage07();

    }


    /* ======================================================================
       PUBLIC DEBUG API
    ====================================================================== */

    window.CTM_PAGE07 = {

        init:
            initPage07,

        getState:
            function () {

                return Object.assign(
                    {},
                    page07State
                );

            }

    };


})();

