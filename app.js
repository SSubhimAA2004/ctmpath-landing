
/*======================================================================
    CTM PATH™ Guided Journey
    --------------------------------------------------------------------
    File        : app.js
    Version     : 1.0.0
    Status      : PRODUCTION
    Architecture: GitHub Pages + Vanilla JavaScript

    IMPORTANT

    This file contains ALL application logic.

    Scene HTML files contain NO JavaScript.

    styles.css contains NO logic.

======================================================================*/



/*======================================================================
    APPLICATION NAMESPACE
======================================================================*/

window.CTM = (() => {

    "use strict";



    /*==================================================================
        CONFIGURATION
    ==================================================================*/

    const CONFIG = Object.freeze({

        APP_NAME: "CTM PATH™ Guided Journey",

        VERSION: "1.0.0",

        DEFAULT_LANGUAGE: "ta",

        SUPPORTED_LANGUAGES: ["ta", "en"],

        TOTAL_SCENES: 9,

        DEBUG: false,

        STORAGE_KEY: "ctm-guided-journey",

        SCENE_PATH: "scenes/",

        SCENE_PREFIX: "scene",

        SCENE_EXTENSION: ".html"

    });



    /*==================================================================
        APPLICATION STATE
    ==================================================================*/

    const state = {

        initialized: false,

        currentScene: 1,

        previousScene: null,

        language: CONFIG.DEFAULT_LANGUAGE,

        loading: false,

        thinking: false,

        sceneCache: {},

        answers: {},

        reflections: {},

        sessionId: null

    };



    /*==================================================================
        DOM CACHE
    ==================================================================*/

    const dom = {

        app: null,

        header: null,

        progress: null,

        progressBar: null,

        progressPercentage: null,

        sceneIndicator: null,

        sceneRoot: null,

        loadingOverlay: null,

        loadingMessage: null,

        thinkingOverlay: null,

        thinkingMessage: null,

        toastContainer: null,

        modalContainer: null,

        errorBoundary: null,

        retryButton: null,

        liveRegion: null,

        languageToggle: null,

        helpButton: null

    };



    /*==================================================================
        UTILITY FUNCTIONS
    ==================================================================*/

    function $(selector, root = document){

        return root.querySelector(selector);

    }



    function $$(selector, root = document){

        return [...root.querySelectorAll(selector)];

    }



    function generateSessionId(){

        return "CTM-" +

            Date.now() +

            "-" +

            Math.random()

                .toString(36)

                .substring(2,8)

                .toUpperCase();

    }



    function log(...message){

        if(CONFIG.DEBUG){

            console.log("[CTM]", ...message);

        }

    }



    function warn(...message){

        console.warn("[CTM]", ...message);

    }



    function error(...message){

        console.error("[CTM]", ...message);

    }



    function clamp(value,min,max){

        return Math.min(

            Math.max(value,min),

            max

        );

    }



    function delay(milliseconds){

        return new Promise(resolve => {

            setTimeout(resolve,milliseconds);

        });

    }



    function scrollToTop(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }



    function announce(message){

        if(!dom.liveRegion){

            return;

        }

        dom.liveRegion.textContent = "";

        requestAnimationFrame(()=>{

            dom.liveRegion.textContent = message;

        });

    }



    function formatSceneNumber(number){

        return String(number)

            .padStart(2,"0");

    }



    function buildSceneFilename(sceneNumber){

        return CONFIG.SCENE_PATH +

            CONFIG.SCENE_PREFIX +

            formatSceneNumber(sceneNumber) +

            CONFIG.SCENE_EXTENSION;

    }



    function storageAvailable(){

        try{

            localStorage.setItem("__ctm_test","1");

            localStorage.removeItem("__ctm_test");

            return true;

        }

        catch(e){

            return false;

        }

    }



    function saveSession(){

        if(!storageAvailable()){

            return;

        }

        localStorage.setItem(

            CONFIG.STORAGE_KEY,

            JSON.stringify(state.answers)

        );

    }



    function loadSession(){

        if(!storageAvailable()){

            return;

        }

        const saved =

            localStorage.getItem(CONFIG.STORAGE_KEY);

        if(saved){

            state.answers = JSON.parse(saved);

        }

    }

    /*==================================================================
        DOM INITIALIZATION
    ==================================================================*/

    function cacheDomElements(){

        dom.app                 = $("#ctm-app");

        dom.header              = $(".app-header");

        dom.progress            = $("#journeyProgress");

        dom.progressBar         = $("#progressBar");

        dom.progressPercentage  = $("#progressPercentage");

        dom.sceneIndicator      = $("#sceneIndicator");

        dom.sceneRoot           = $("#sceneRoot");

        dom.loadingOverlay      = $("#loadingOverlay");

        dom.loadingMessage      = $("#loadingMessage");

        dom.thinkingOverlay     = $("#thinkingOverlay");

        dom.thinkingMessage     = $("#thinkingMessage");

        dom.toastContainer      = $("#toastContainer");

        dom.modalContainer      = $("#modalContainer");

        dom.errorBoundary       = $("#errorBoundary");

        dom.retryButton         = $("#retryButton");

        dom.liveRegion          = $("#liveRegion");

        dom.languageToggle      = $("#languageToggle");

        dom.helpButton          = $("#helpButton");

    }



    /*==================================================================
        APPLICATION INITIALIZATION
    ==================================================================*/

    async function initialize(){

        if(state.initialized){

            return;

        }

        log("Initializing application...");

        state.sessionId = generateSessionId();

        cacheDomElements();

        loadSession();

        initializeLanguage();

        initializeProgress();

        registerGlobalEvents();

        state.initialized = true;

    }



    /*==================================================================
        LANGUAGE
    ==================================================================*/

    function initializeLanguage(){

        const storedLanguage = localStorage.getItem(

            CONFIG.STORAGE_KEY + "-language"

        );

        if(

            storedLanguage &&

            CONFIG.SUPPORTED_LANGUAGES.includes(storedLanguage)

        ){

            state.language = storedLanguage;

        }

        document.documentElement.lang = state.language;

    }



    function toggleLanguage(){

        state.language =

            state.language === "ta"

                ? "en"

                : "ta";

        document.documentElement.lang = state.language;

        localStorage.setItem(

            CONFIG.STORAGE_KEY + "-language",

            state.language

        );

        document.dispatchEvent(

            new CustomEvent(

                "ctm:languageChanged",

                {

                    detail:{

                        language:state.language

                    }

                }

            )

        );

        announce(

            state.language === "ta"

                ? "தமிழ் தேர்ந்தெடுக்கப்பட்டது"

                : "English selected"

        );

    }



    /*==================================================================
        PROGRESS
    ==================================================================*/

    function initializeProgress(){

        updateProgress();

    }



    function updateProgress(){

        const percentage =

            Math.round(

                (

                    state.currentScene /

                    CONFIG.TOTAL_SCENES

                ) * 100

            );

        if(dom.progressBar){

            dom.progressBar.style.width =

                percentage + "%";

        }

        if(dom.progressPercentage){

            dom.progressPercentage.textContent =

                percentage + "%";

        }

        if(dom.sceneIndicator){

            dom.sceneIndicator.textContent =

                `Scene ${state.currentScene} of ${CONFIG.TOTAL_SCENES}`;

        }

    }



    /*==================================================================
        GLOBAL EVENTS
    ==================================================================*/

    function registerGlobalEvents(){

        if(dom.languageToggle){

            dom.languageToggle.addEventListener(

                "click",

                toggleLanguage

            );

        }

        if(dom.retryButton){

            dom.retryButton.addEventListener(

                "click",

                () => {

                    hideError();

                    loadScene(state.currentScene);

                }

            );

        }

        window.addEventListener(

            "beforeunload",

            saveSession

        );

        window.addEventListener(

            "resize",

            debounce(handleResize,200)

        );

    }



    /*==================================================================
        RESPONSIVE
    ==================================================================*/

    function handleResize(){

        document.dispatchEvent(

            new CustomEvent(

                "ctm:resize"

            )

        );

    }



    function debounce(callback,delayTime){

        let timer;

        return (...args)=>{

            clearTimeout(timer);

            timer = setTimeout(

                ()=>callback(...args),

                delayTime

            );

        };

    }

    /*==================================================================
        SCENE ENGINE
    ==================================================================*/

    async function loadScene(sceneNumber){

        sceneNumber = clamp(

            sceneNumber,

            1,

            CONFIG.TOTAL_SCENES

        );

        try{

            showLoading(

                "Preparing Your Journey..."

            );

            const html = await getScene(sceneNumber);

            await transitionOut();

            renderScene(html);

            state.previousScene = state.currentScene;

            state.currentScene = sceneNumber;

            updateProgress();

            initializeScene();

            await transitionIn();

            scrollToTop();

            announce(

                `Scene ${sceneNumber} loaded`

            );

            hideLoading();

        }

        catch(exception){

            error(exception);

            hideLoading();

            showError();

        }

    }



    /*==================================================================
        FETCH SCENE
    ==================================================================*/

    async function getScene(sceneNumber){

        if(

            state.sceneCache[sceneNumber]

        ){

            return state.sceneCache[sceneNumber];

        }

        const response = await fetch(

            buildSceneFilename(sceneNumber),

            {

                cache:"no-cache"

            }

        );

        if(

            !response.ok

        ){

            throw new Error(

                `Unable to load Scene ${sceneNumber}`

            );

        }

        const html = await response.text();

        state.sceneCache[sceneNumber] = html;

        return html;

    }



    /*==================================================================
        RENDER SCENE
    ==================================================================*/

    function renderScene(html){

        if(!dom.sceneRoot){

            return;

        }

        dom.sceneRoot.innerHTML = html;

        dom.sceneRoot.dataset.currentScene =

            state.currentScene;

    }



    /*==================================================================
        SCENE INITIALIZATION
    ==================================================================*/

    function initializeScene(){

        initializeButtons();

        initializeInputs();

        initializeRadioCards();

        initializeCheckboxCards();

        initializeSliders();

        initializeReflectionCards();

        initializeSceneAnimations();

        document.dispatchEvent(

            new CustomEvent(

                "ctm:sceneLoaded",

                {

                    detail:{

                        scene:state.currentScene

                    }

                }

            )

        );

    }



    /*==================================================================
        SCENE TRANSITIONS
    ==================================================================*/

    async function transitionOut(){

        if(!dom.sceneRoot){

            return;

        }

        dom.sceneRoot.classList.remove(

            "fade-in"

        );

        dom.sceneRoot.classList.add(

            "fade-out"

        );

        await delay(180);

    }



    async function transitionIn(){

        if(!dom.sceneRoot){

            return;

        }

        dom.sceneRoot.classList.remove(

            "fade-out"

        );

        dom.sceneRoot.classList.add(

            "fade-in"

        );

        await delay(220);

    }



    /*==================================================================
        SCENE ANIMATIONS
    ==================================================================*/

    function initializeSceneAnimations(){

        const animated = $$(
            "[data-animate]",
            dom.sceneRoot
        );

        animated.forEach(

            (element,index)=>{

                element.style.animationDelay =

                    `${index * 80}ms`;

                element.classList.add(

                    "slide-up"

                );

            }

        );

    }



    /*==================================================================
        SCENE HELPERS
    ==================================================================*/

    function currentScene(){

        return state.currentScene;

    }



    function previousScene(){

        return state.previousScene;

    }



    function sceneExists(sceneNumber){

        return (

            sceneNumber >= 1 &&

            sceneNumber <= CONFIG.TOTAL_SCENES

        );

    }



    function clearScene(){

        if(dom.sceneRoot){

            dom.sceneRoot.innerHTML = "";

        }

    }

    /*==================================================================
        NAVIGATION ENGINE
    ==================================================================*/

    async function nextScene(){

        if(

            state.currentScene >=

            CONFIG.TOTAL_SCENES

        ){

            return;

        }

        await goToScene(

            state.currentScene + 1

        );

    }



    async function previousScene(){

        if(

            state.currentScene <= 1

        ){

            return;

        }

        await goToScene(

            state.currentScene - 1

        );

    }



    async function goToScene(sceneNumber){

        if(

            !sceneExists(sceneNumber)

        ){

            return;

        }

        await loadScene(sceneNumber);

    }



    /*==================================================================
        CTA NAVIGATION
    ==================================================================*/

    function initializeButtons(){

        const nextButtons = $$(
            "[data-next]",
            dom.sceneRoot
        );

        nextButtons.forEach(button=>{

            button.addEventListener(

                "click",

                async ()=>{

                    const target =

                        Number(

                            button.dataset.next

                        );

                    if(target){

                        await goToScene(target);

                    }

                    else{

                        await nextScene();

                    }

                }

            );

        });



        const previousButtons = $$(
            "[data-previous]",
            dom.sceneRoot
        );

        previousButtons.forEach(button=>{

            button.addEventListener(

                "click",

                async ()=>{

                    const target =

                        Number(

                            button.dataset.previous

                        );

                    if(target){

                        await goToScene(target);

                    }

                    else{

                        await previousScene();

                    }

                }

            );

        });

    }



    /*==================================================================
        BROWSER HISTORY
    ==================================================================*/

    function updateHistory(){

        history.pushState(

            {

                scene:state.currentScene

            },

            "",

            `#scene-${state.currentScene}`

        );

    }



    function restoreHistory(){

        window.addEventListener(

            "popstate",

            async event=>{

                if(

                    event.state &&

                    event.state.scene

                ){

                    await goToScene(

                        event.state.scene

                    );

                }

            }

        );

    }



    /*==================================================================
        KEYBOARD NAVIGATION
    ==================================================================*/

    function initializeKeyboardNavigation(){

        document.addEventListener(

            "keydown",

            async event=>{

                if(

                    event.defaultPrevented

                ){

                    return;

                }

                switch(event.key){

                    case "ArrowRight":

                        await nextScene();

                        break;

                    case "ArrowLeft":

                        await previousScene();

                        break;

                    case "Home":

                        await goToScene(1);

                        break;

                    case "End":

                        await goToScene(

                            CONFIG.TOTAL_SCENES

                        );

                        break;

                }

            }

        );

    }



    /*==================================================================
        NAVIGATION HELPERS
    ==================================================================*/

    function firstScene(){

        return state.currentScene === 1;

    }



    function lastScene(){

        return (

            state.currentScene ===

            CONFIG.TOTAL_SCENES

        );

    }



    function canMoveNext(){

        return !lastScene();

    }



    function canMovePrevious(){

        return !firstScene();

    }



    /*==================================================================
        SCROLL MANAGEMENT
    ==================================================================*/

    function resetScroll(){

        scrollToTop();

    }



    function focusScene(){

        if(

            dom.sceneRoot

        ){

            dom.sceneRoot.focus();

        }

    }



    /*==================================================================
        POST NAVIGATION
    ==================================================================*/

    async function afterNavigation(){

        updateHistory();

        resetScroll();

        focusScene();

        announce(

            `Scene ${state.currentScene}`

        );

    }



              
