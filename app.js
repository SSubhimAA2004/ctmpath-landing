
/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 01
    APPLICATION KERNEL

    ---------------------------------------------------------------
    01. Configuration
    02. Constants
    03. Journey Store
    04. DOM Cache
    05. Registry
    06. Journey Core
    07. Bootstrap
═══════════════════════════════════════════════════════════════════════*/

"use strict";


/*═══════════════════════════════════════════════════════════════════════
01. CONFIGURATION
═══════════════════════════════════════════════════════════════════════*/

const CONFIG = Object.freeze({

    APP_NAME           : "CTM PATH™ Guided Journey",

    VERSION            : "6.0.0",

    TOTAL_SCENES       : 9,

    DEFAULT_SCENE      : "scene01",

    DEFAULT_LANGUAGE   : "ta",

    DEBUG              : false,

    ANIMATION_DURATION : 700

});


/*═══════════════════════════════════════════════════════════════════════
02. CONSTANTS
═══════════════════════════════════════════════════════════════════════*/

const EVENTS = Object.freeze({

    READY      : "DOMContentLoaded",

    CLICK      : "click",

    CHANGE     : "change",

    INPUT      : "input",

    KEYDOWN    : "keydown",

    RESIZE     : "resize"

});


const LANGUAGE = Object.freeze({

    TAMIL   : "ta",

    ENGLISH : "en"

});


/*═══════════════════════════════════════════════════════════════════════
03. JOURNEY STORE

Single Source Of Truth
═══════════════════════════════════════════════════════════════════════*/

const Store = {

    app : {

        initialized : false,

        currentScene : CONFIG.DEFAULT_SCENE,

        previousScene : null,

        language : CONFIG.DEFAULT_LANGUAGE,

        busy : false

    },

    visitor : {

        id : "",

        name : "",

        mobile : "",

        email : ""

    },

    answers : {},

    insights : {},

    ui : {}

};


/*═══════════════════════════════════════════════════════════════════════
04. DOM CACHE
═══════════════════════════════════════════════════════════════════════*/

const DOM = {

    html : null,

    body : null,

    app : null,

    journey : null,

    scenes : []

};


/*═══════════════════════════════════════════════════════════════════════
05. REGISTRY

Every module registers itself.

Nothing is hardcoded.
═══════════════════════════════════════════════════════════════════════*/

const Registry = {

    scenes : Object.create(null),

    components : Object.create(null),

    services : Object.create(null),

    rules : Object.create(null)

};


/*═══════════════════════════════════════════════════════════════════════
06. JOURNEY CORE
═══════════════════════════════════════════════════════════════════════*/

const Journey = {

    start,

    initialize,

    cacheDOM,

    validate,

    boot,

    log

};


/*═══════════════════════════════════════════════════════════════════════
BOOTSTRAP
═══════════════════════════════════════════════════════════════════════*/

document.addEventListener(

    EVENTS.READY,

    Journey.start

);


/*═══════════════════════════════════════════════════════════════════════
APPLICATION START
═══════════════════════════════════════════════════════════════════════*/

function start(){

    Journey.initialize();

}


/*═══════════════════════════════════════════════════════════════════════
INITIALIZATION
═══════════════════════════════════════════════════════════════════════*/

function initialize(){

    Journey.cacheDOM();

    Journey.validate();

    Journey.boot();

    Store.app.initialized = true;

    Journey.log(

        CONFIG.APP_NAME +

        " initialized."

    );

}


/*═══════════════════════════════════════════════════════════════════════
CACHE DOM
═══════════════════════════════════════════════════════════════════════*/

function cacheDOM(){

    DOM.html = document.documentElement;

    DOM.body = document.body;

    DOM.app = document.getElementById(

        "app"

    );

    DOM.journey = document.getElementById(

        "journey"

    );

    DOM.scenes = Array.from(

        document.querySelectorAll(

            ".scene"

        )

    );

}


/*═══════════════════════════════════════════════════════════════════════
VALIDATION
═══════════════════════════════════════════════════════════════════════*/

function validate(){

    if(!DOM.app){

        throw new Error(

            "Application container (#app) not found."

        );

    }

    if(!DOM.journey){

        throw new Error(

            "Journey container (#journey) not found."

        );

    }

    if(

        DOM.scenes.length !==

        CONFIG.TOTAL_SCENES

    ){

        throw new Error(

            "Expected "

            +

            CONFIG.TOTAL_SCENES

            +

            " scenes."

        );

    }

}


/*═══════════════════════════════════════════════════════════════════════
BOOT

Engines initialize themselves
in later batches.
═══════════════════════════════════════════════════════════════════════*/

function boot(){

    Journey.log(

        "Boot sequence started."

    );

}


/*═══════════════════════════════════════════════════════════════════════
LOGGER
═══════════════════════════════════════════════════════════════════════*/

function log(message){

    if(!CONFIG.DEBUG){

        return;

    }

    console.log(

        "[CTM]",

        message

    );

}

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 02

    07. Scene Engine
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCENE ENGINE
═══════════════════════════════════════════════════════════════════════*/

const SceneEngine = {

    init,

    register,

    goto,

    next,

    previous,

    current,

    refresh

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function init(){

    DOM.scenes.forEach(scene=>{

        Registry.scenes[scene.id]={

            id:scene.id,

            element:scene

        };

        scene.hidden=true;

        scene.classList.remove(

            "is-active"

        );

    });

    SceneEngine.goto(

        CONFIG.DEFAULT_SCENE

    );

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER CONTROLLER
═══════════════════════════════════════════════════════════════════════*/

function register(

    sceneId,

    controller

){

    if(

        !Registry.scenes[sceneId]

    ){

        Registry.scenes[sceneId]={};

    }

    Registry.scenes[sceneId].controller=

        controller;

}



/*═══════════════════════════════════════════════════════════════════════
GO TO SCENE
═══════════════════════════════════════════════════════════════════════*/

function goto(sceneId){

    if(

        Store.app.busy

    ){

        return;

    }

    const target=

        Registry.scenes[sceneId];

    if(!target){

        return;

    }

    Store.app.busy=true;

    const previous=

        Registry.scenes[

            Store.app.currentScene

        ];

    if(previous){

        previous.element.hidden=true;

        previous.element.classList.remove(

            "is-active"

        );

        if(

            previous.controller &&

            typeof previous.controller.leave==="function"

        ){

            previous.controller.leave();

        }

    }

    target.element.hidden=false;

    target.element.classList.add(

        "is-active"

    );

    if(

        target.controller &&

        typeof target.controller.enter==="function"

    ){

        target.controller.enter();

    }

    Store.app.previousScene=

        Store.app.currentScene;

    Store.app.currentScene=

        sceneId;

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

    SceneEngine.refresh();

    Store.app.busy=false;

}



/*═══════════════════════════════════════════════════════════════════════
NEXT
═══════════════════════════════════════════════════════════════════════*/

function next(){

    const index=

        parseInt(

            Store.app.currentScene.replace(

                "scene",

                ""

            ),

            10

        );

    if(

        index>=CONFIG.TOTAL_SCENES

    ){

        return;

    }

    SceneEngine.goto(

        "scene"+

        String(index+1)

        .padStart(2,"0")

    );

}



/*═══════════════════════════════════════════════════════════════════════
PREVIOUS
═══════════════════════════════════════════════════════════════════════*/

function previous(){

    const index=

        parseInt(

            Store.app.currentScene.replace(

                "scene",

                ""

            ),

            10

        );

    if(index<=1){

        return;

    }

    SceneEngine.goto(

        "scene"+

        String(index-1)

        .padStart(2,"0")

    );

}



/*═══════════════════════════════════════════════════════════════════════
CURRENT
═══════════════════════════════════════════════════════════════════════*/

function current(){

    return Registry.scenes[

        Store.app.currentScene

    ];

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH
═══════════════════════════════════════════════════════════════════════*/

function refresh(){

    document.dispatchEvent(

        new CustomEvent(

            "scenechange",

            {

                detail:{

                    current:

                        Store.app.currentScene,

                    previous:

                        Store.app.previousScene

                }

            }

        )

    );

}



/*═══════════════════════════════════════════════════════════════════════
BOOT UPDATE

Replace boot()

with

function boot(){

    Journey.log("Boot sequence started.");

    SceneEngine.init();

}
═══════════════════════════════════════════════════════════════════════*/

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 03

    08. COMPONENT ENGINE
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
COMPONENT ENGINE
═══════════════════════════════════════════════════════════════════════*/

const ComponentEngine={

    init,

    register,

    get,

    refresh,

    destroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function init(){

    Object.values(

        Registry.components

    ).forEach(component=>{

        if(

            typeof component.init==="function"

        ){

            component.init();

        }

    });

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER COMPONENT
═══════════════════════════════════════════════════════════════════════*/

function register(

    name,

    component

){

    if(

        !name ||

        !component

    ){

        throw new Error(

            "Invalid component registration."

        );

    }

    Registry.components[name]=component;

}



/*═══════════════════════════════════════════════════════════════════════
GET COMPONENT
═══════════════════════════════════════════════════════════════════════*/

function get(name){

    return Registry.components[name];

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH COMPONENTS
═══════════════════════════════════════════════════════════════════════*/

function refresh(){

    Object.values(

        Registry.components

    ).forEach(component=>{

        if(

            typeof component.refresh==="function"

        ){

            component.refresh();

        }

    });

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY COMPONENTS
═══════════════════════════════════════════════════════════════════════*/

function destroy(){

    Object.values(

        Registry.components

    ).forEach(component=>{

        if(

            typeof component.destroy==="function"

        ){

            component.destroy();

        }

    });

}



/*═══════════════════════════════════════════════════════════════════════
BASE COMPONENT

Reusable template for every component.

Lifecycle

init()

refresh()

destroy()

═══════════════════════════════════════════════════════════════════════*/

const BaseComponent={

    init(){},

    refresh(){},

    destroy(){}

};



/*═══════════════════════════════════════════════════════════════════════
REGISTER BUILT-IN COMPONENTS

Actual implementations arrive in later batches.
═══════════════════════════════════════════════════════════════════════*/

ComponentEngine.register(

    "radio",

    Object.create(BaseComponent)

);

ComponentEngine.register(

    "slider",

    Object.create(BaseComponent)

);

ComponentEngine.register(

    "button",

    Object.create(BaseComponent)

);

ComponentEngine.register(

    "language",

    Object.create(BaseComponent)

);

ComponentEngine.register(

    "binding",

    Object.create(BaseComponent)

);

ComponentEngine.register(

    "animation",

    Object.create(BaseComponent)

);



/*═══════════════════════════════════════════════════════════════════════
BOOT UPDATE

Update boot()

function boot(){

    Journey.log(

        "Boot sequence started."

    );

    SceneEngine.init();

    ComponentEngine.init();

}

═══════════════════════════════════════════════════════════════════════*/

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 04

    09. SERVICE ENGINE
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SERVICE ENGINE
═══════════════════════════════════════════════════════════════════════*/

const ServiceEngine={

    init : serviceEngineInit,

    register : serviceEngineRegister,

    get : serviceEngineGet,

    refresh : serviceEngineRefresh,

    destroy : serviceEngineDestroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE SERVICES
═══════════════════════════════════════════════════════════════════════*/

function serviceEngineInit(){

    Object.values(

        Registry.services

    ).forEach(service=>{

        if(

            typeof service.init==="function"

        ){

            service.init();

        }

    });

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER SERVICE
═══════════════════════════════════════════════════════════════════════*/

function serviceEngineRegister(

    name,

    service

){

    if(

        !name ||

        !service

    ){

        throw new Error(

            "Invalid service registration."

        );

    }

    Registry.services[name]=service;

}



/*═══════════════════════════════════════════════════════════════════════
GET SERVICE
═══════════════════════════════════════════════════════════════════════*/

function serviceEngineGet(name){

    return Registry.services[name];

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH SERVICES
═══════════════════════════════════════════════════════════════════════*/

function serviceEngineRefresh(){

    Object.values(

        Registry.services

    ).forEach(service=>{

        if(

            typeof service.refresh==="function"

        ){

            service.refresh();

        }

    });

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY SERVICES
═══════════════════════════════════════════════════════════════════════*/

function serviceEngineDestroy(){

    Object.values(

        Registry.services

    ).forEach(service=>{

        if(

            typeof service.destroy==="function"

        ){

            service.destroy();

        }

    });

}



/*═══════════════════════════════════════════════════════════════════════
BASE SERVICE

Every service follows the same lifecycle.

init()

refresh()

destroy()

═══════════════════════════════════════════════════════════════════════*/

const BaseService={

    init(){},

    refresh(){},

    destroy(){}

};



/*═══════════════════════════════════════════════════════════════════════
REGISTER CORE SERVICES

Implementation arrives in later batches.
═══════════════════════════════════════════════════════════════════════*/

ServiceEngine.register(

    "scroll",

    Object.create(BaseService)

);

ServiceEngine.register(

    "storage",

    Object.create(BaseService)

);

ServiceEngine.register(

    "language",

    Object.create(BaseService)

);

ServiceEngine.register(

    "binding",

    Object.create(BaseService)

);

ServiceEngine.register(

    "animation",

    Object.create(BaseService)

);

ServiceEngine.register(

    "validation",

    Object.create(BaseService)

);



/*═══════════════════════════════════════════════════════════════════════
BOOT UPDATE

Update boot()

function boot(){

    Journey.log(

        "Boot sequence started."

    );

    SceneEngine.init();

    ComponentEngine.init();

    ServiceEngine.init();

}

═══════════════════════════════════════════════════════════════════════*/

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 05

    10. RULE ENGINE
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
RULE ENGINE
═══════════════════════════════════════════════════════════════════════*/

const RuleEngine={

    init : ruleEngineInit,

    register : ruleEngineRegister,

    get : ruleEngineGet,

    execute : ruleEngineExecute,

    executeAll : ruleEngineExecuteAll,

    destroy : ruleEngineDestroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function ruleEngineInit(){

    Journey.log(

        "Rule Engine Initialized."

    );

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER RULE
═══════════════════════════════════════════════════════════════════════*/

function ruleEngineRegister(

    name,

    rule

){

    if(

        !name ||

        typeof rule!=="function"

    ){

        throw new Error(

            "Invalid rule registration."

        );

    }

    Registry.rules[name]=rule;

}



/*═══════════════════════════════════════════════════════════════════════
GET RULE
═══════════════════════════════════════════════════════════════════════*/

function ruleEngineGet(name){

    return Registry.rules[name];

}



/*═══════════════════════════════════════════════════════════════════════
EXECUTE ONE RULE
═══════════════════════════════════════════════════════════════════════*/

function ruleEngineExecute(

    name,

    context={}

){

    const rule=

        Registry.rules[name];

    if(

        typeof rule!=="function"

    ){

        return null;

    }

    return rule(context);

}



/*═══════════════════════════════════════════════════════════════════════
EXECUTE ALL RULES
═══════════════════════════════════════════════════════════════════════*/

function ruleEngineExecuteAll(

    context={}

){

    const result={};

    Object.entries(

        Registry.rules

    ).forEach(([name,rule])=>{

        result[name]=

            rule(context);

    });

    return result;

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function ruleEngineDestroy(){

    Object.keys(

        Registry.rules

    ).forEach(name=>{

        delete Registry.rules[name];

    });

}



/*═══════════════════════════════════════════════════════════════════════
BASE RULE

Every rule returns

true

false

or an object

═══════════════════════════════════════════════════════════════════════*/

function BaseRule(){

    return false;

}



/*═══════════════════════════════════════════════════════════════════════
DEFAULT RULES

Real implementations arrive later.
═══════════════════════════════════════════════════════════════════════*/

RuleEngine.register(

    "alwaysTrue",

    function(){

        return true;

    }

);

RuleEngine.register(

    "alwaysFalse",

    function(){

        return false;

    }

);



/*═══════════════════════════════════════════════════════════════════════
BOOT UPDATE

Update boot()

function boot(){

    Journey.log(

        "Boot sequence started."

    );

    SceneEngine.init();

    ComponentEngine.init();

    ServiceEngine.init();

    RuleEngine.init();

}

═══════════════════════════════════════════════════════════════════════*/

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 06

    SERVICE
    Scroll Service
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCROLL SERVICE
═══════════════════════════════════════════════════════════════════════*/

const ScrollService = Object.create(BaseService);



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

ScrollService.init = function(){

    Journey.log(

        "Scroll Service Ready."

    );

};



/*═══════════════════════════════════════════════════════════════════════
SCROLL TO TOP
═══════════════════════════════════════════════════════════════════════*/

ScrollService.toTop = function(

    smooth = true

){

    window.scrollTo({

        top:0,

        left:0,

        behavior:

            smooth

            ? "smooth"

            : "auto"

    });

};



/*═══════════════════════════════════════════════════════════════════════
SCROLL TO ELEMENT
═══════════════════════════════════════════════════════════════════════*/

ScrollService.toElement = function(

    element,

    smooth = true

){

    if(

        !element

    ){

        return;

    }

    element.scrollIntoView({

        behavior:

            smooth

            ? "smooth"

            : "auto",

        block:"start"

    });

};



/*═══════════════════════════════════════════════════════════════════════
SCROLL TO SELECTOR
═══════════════════════════════════════════════════════════════════════*/

ScrollService.toSelector = function(

    selector,

    smooth = true

){

    const element =

        document.querySelector(

            selector

        );

    if(

        !element

    ){

        return;

    }

    ScrollService.toElement(

        element,

        smooth

    );

};



/*═══════════════════════════════════════════════════════════════════════
GET SCROLL POSITION
═══════════════════════════════════════════════════════════════════════*/

ScrollService.position = function(){

    return {

        x:

            window.scrollX,

        y:

            window.scrollY

    };

};



/*═══════════════════════════════════════════════════════════════════════
IS TOP
═══════════════════════════════════════════════════════════════════════*/

ScrollService.isTop = function(){

    return window.scrollY===0;

};



/*═══════════════════════════════════════════════════════════════════════
REFRESH
═══════════════════════════════════════════════════════════════════════*/

ScrollService.refresh = function(){

    /* Reserved */

};



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

ScrollService.destroy = function(){

    /* Reserved */

};



/*═══════════════════════════════════════════════════════════════════════
REGISTER SERVICE
═══════════════════════════════════════════════════════════════════════*/

ServiceEngine.register(

    "scroll",

    ScrollService

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 07

    SERVICE
    Language Service
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
LANGUAGE SERVICE
═══════════════════════════════════════════════════════════════════════*/

const LanguageService={

    init,

    set,

    get,

    toggle,

    refresh,

    destroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function init(){

    LanguageService.refresh();

    Journey.log(

        "Language Service Ready."

    );

}



/*═══════════════════════════════════════════════════════════════════════
GET LANGUAGE
═══════════════════════════════════════════════════════════════════════*/

function get(){

    return Store.app.language;

}



/*═══════════════════════════════════════════════════════════════════════
SET LANGUAGE
═══════════════════════════════════════════════════════════════════════*/

function set(language){

    if(

        language!==LANGUAGE.TAMIL &&

        language!==LANGUAGE.ENGLISH

    ){

        return;

    }

    Store.app.language=language;

    LanguageService.refresh();

}



/*═══════════════════════════════════════════════════════════════════════
TOGGLE LANGUAGE
═══════════════════════════════════════════════════════════════════════*/

function toggle(){

    if(

        Store.app.language===LANGUAGE.TAMIL

    ){

        LanguageService.set(

            LANGUAGE.ENGLISH

        );

    }

    else{

        LanguageService.set(

            LANGUAGE.TAMIL

        );

    }

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH UI
═══════════════════════════════════════════════════════════════════════*/

function refresh(){

    document.documentElement.lang=

        Store.app.language;

    document.documentElement.dataset.language=

        Store.app.language;

    document.dispatchEvent(

        new CustomEvent(

            "languagechange",

            {

                detail:{

                    language:

                        Store.app.language

                }

            }

        )

    );

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function destroy(){

    /* Reserved */

}



/*═══════════════════════════════════════════════════════════════════════
LANGUAGE BUTTONS
═══════════════════════════════════════════════════════════════════════*/

document.addEventListener(

    EVENTS.CLICK,

    function(event){

        const button=

            event.target.closest(

                "[data-language]"

            );

        if(!button){

            return;

        }

        LanguageService.set(

            button.dataset.language

        );

    }

);



/*═══════════════════════════════════════════════════════════════════════
REGISTER SERVICE
═══════════════════════════════════════════════════════════════════════*/

ServiceEngine.register(

    "language",

    LanguageService

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 08

    SERVICE
    Binding Service
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
BINDING SERVICE
═══════════════════════════════════════════════════════════════════════*/

const BindingService={

    init,

    set,

    get,

    bind,

    refresh,

    replace,

    destroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function init(){

    BindingService.refresh();

    Journey.log(

        "Binding Service Ready."

    );

}



/*═══════════════════════════════════════════════════════════════════════
SET VALUE

Supports nested paths

visitor.name

visitor.city

answers.q01

═══════════════════════════════════════════════════════════════════════*/

function set(path,value){

    const keys=path.split(".");

    let target=Store;

    while(keys.length>1){

        const key=keys.shift();

        if(!(key in target)){

            target[key]={};

        }

        target=target[key];

    }

    target[keys[0]]=value;

    BindingService.refresh();

}



/*═══════════════════════════════════════════════════════════════════════
GET VALUE
═══════════════════════════════════════════════════════════════════════*/

function get(path){

    return path

        .split(".")

        .reduce(

            (obj,key)=>

                obj && obj[key],

            Store

        );

}



/*═══════════════════════════════════════════════════════════════════════
BIND SINGLE ELEMENT

Example

data-bind="visitor.name"

═══════════════════════════════════════════════════════════════════════*/

function bind(element){

    if(!element){

        return;

    }

    const path=

        element.dataset.bind;

    element.textContent=

        BindingService.get(path)

        ??

        "";

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH ALL BINDINGS
═══════════════════════════════════════════════════════════════════════*/

function refresh(){

    document

        .querySelectorAll(

            "[data-bind]"

        )

        .forEach(

            BindingService.bind

        );

}



/*═══════════════════════════════════════════════════════════════════════
TEXT REPLACEMENT

{Name}

{visitor.name}

{answers.q01}

═══════════════════════════════════════════════════════════════════════*/

function replace(text){

    if(

        !text

    ){

        return "";

    }

    return text.replace(

        /\{([^}]+)\}/g,

        function(match,path){

            return (

                BindingService.get(

                    path.trim()

                )

                ??

                ""

            );

        }

    );

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function destroy(){

    /* Reserved */

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER SERVICE
═══════════════════════════════════════════════════════════════════════*/

ServiceEngine.register(

    "binding",

    BindingService

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 09

    SERVICE
    Validation Service
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
VALIDATION SERVICE
═══════════════════════════════════════════════════════════════════════*/

const ValidationService={

    init,

    required,

    email,

    mobile,

    number,

    range,

    scene,

    clear,

    destroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function init(){

    Journey.log(

        "Validation Service Ready."

    );

}



/*═══════════════════════════════════════════════════════════════════════
REQUIRED
═══════════════════════════════════════════════════════════════════════*/

function required(value){

    return String(

        value ?? ""

    ).trim().length>0;

}



/*═══════════════════════════════════════════════════════════════════════
EMAIL
═══════════════════════════════════════════════════════════════════════*/

function email(value){

    if(!required(value)){

        return false;

    }

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(value);

}



/*═══════════════════════════════════════════════════════════════════════
MOBILE
Accepts 10 digit mobile number
═══════════════════════════════════════════════════════════════════════*/

function mobile(value){

    if(!required(value)){

        return false;

    }

    return /^[6-9]\d{9}$/

        .test(

            String(value)

                .replace(/\D/g,"")

        );

}



/*═══════════════════════════════════════════════════════════════════════
NUMBER
═══════════════════════════════════════════════════════════════════════*/

function number(value){

    return !Number.isNaN(

        Number(value)

    );

}



/*═══════════════════════════════════════════════════════════════════════
RANGE
═══════════════════════════════════════════════════════════════════════*/

function range(

    value,

    minimum,

    maximum

){

    const numeric=

        Number(value);

    if(

        Number.isNaN(

            numeric

        )

    ){

        return false;

    }

    return (

        numeric>=minimum &&

        numeric<=maximum

    );

}



/*═══════════════════════════════════════════════════════════════════════
VALIDATE CURRENT SCENE

Scene Controllers may override this later.

Return

true

or

false
═══════════════════════════════════════════════════════════════════════*/

function scene(sceneId){

    const controller=

        Registry.scenes[sceneId]

        ?.controller;

    if(

        controller &&

        typeof controller.validate==="function"

    ){

        return controller.validate();

    }

    return true;

}



/*═══════════════════════════════════════════════════════════════════════
CLEAR ERRORS

Reserved for future UI validation.

═══════════════════════════════════════════════════════════════════════*/

function clear(){

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function destroy(){

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER SERVICE
═══════════════════════════════════════════════════════════════════════*/

ServiceEngine.register(

    "validation",

    ValidationService

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 10

    COMPONENT
    Radio Card Component
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
RADIO CARD COMPONENT
═══════════════════════════════════════════════════════════════════════*/

const RadioCardComponent={

    init : radioComponentInit,

    refresh : radioComponentRefresh,

    destroy : radioComponentDestroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function radioComponentInit(){

    DOM.journey.addEventListener(

        EVENTS.CHANGE,

        radioComponentHandleChange

    );

    Journey.log(

        "Radio Card Component Ready."

    );

}



/*═══════════════════════════════════════════════════════════════════════
CHANGE HANDLER
═══════════════════════════════════════════════════════════════════════*/

function radioComponentHandleChange(event){

    const input=event.target;

    if(

        !input.matches(

            ".radio-card input[type='radio']"

        )

    ){

        return;

    }

    radioComponentUpdateSelection(

        input

    );

}



/*═══════════════════════════════════════════════════════════════════════
UPDATE SELECTION
═══════════════════════════════════════════════════════════════════════*/

function radioComponentUpdateSelection(input){

    const group=input.name;

    const value=input.value;

    const cards=document.querySelectorAll(

        `.radio-card input[name="${group}"]`

    );

    cards.forEach(item=>{

        const card=item.closest(

            ".radio-card"

        );

        if(card){

            card.classList.remove(

                "selected"

            );

        }

    });

    const selectedCard=input.closest(

        ".radio-card"

    );

    if(selectedCard){

        selectedCard.classList.add(

            "selected"

        );

    }

    Store.answers[group]=value;

    document.dispatchEvent(

        new CustomEvent(

            "answerchange",

            {

                detail:{

                    question:group,

                    answer:value

                }

            }

        )

    );

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH
═══════════════════════════════════════════════════════════════════════*/

function radioComponentRefresh(){

    Object.entries(

        Store.answers

    ).forEach(([group,value])=>{

        const input=document.querySelector(

            `.radio-card input[name="${group}"][value="${value}"]`

        );

        if(input){

            input.checked=true;

            radioComponentUpdateSelection(

                input

            );

        }

    });

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function radioComponentDestroy(){

    /* Reserved */

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER COMPONENT
═══════════════════════════════════════════════════════════════════════*/

ComponentEngine.register(

    "radio-card",

    RadioCardComponent

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 11

    COMPONENT
    Financial Slider Component
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SLIDER COMPONENT
═══════════════════════════════════════════════════════════════════════*/

const SliderComponent={

    init : sliderComponentInit,

    refresh : sliderComponentRefresh,

    destroy : sliderComponentDestroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function sliderComponentInit(){

    DOM.journey.addEventListener(

        EVENTS.INPUT,

        sliderComponentHandleInput

    );

    Journey.log(

        "Slider Component Ready."

    );

}



/*═══════════════════════════════════════════════════════════════════════
INPUT HANDLER
═══════════════════════════════════════════════════════════════════════*/

function sliderComponentHandleInput(event){

    const slider=event.target;

    if(

        !slider.matches(

            ".slider"

        )

    ){

        return;

    }

    sliderComponentUpdate(

        slider

    );

}



/*═══════════════════════════════════════════════════════════════════════
UPDATE SLIDER
═══════════════════════════════════════════════════════════════════════*/

function sliderComponentUpdate(slider){

    const question=

        slider.name ||

        slider.id;

    const value=

        Number(

            slider.value

        );

    Store.answers[question]=value;

    slider.style.setProperty(

        "--slider-value",

        value

    );

    sliderComponentUpdateLabel(

        slider,

        value

    );

    document.dispatchEvent(

        new CustomEvent(

            "sliderchange",

            {

                detail:{

                    question,

                    value

                }

            }

        )

    );

}



/*═══════════════════════════════════════════════════════════════════════
UPDATE VALUE LABEL

HTML

<span data-slider-value="incomeGap"></span>

═══════════════════════════════════════════════════════════════════════*/

function sliderComponentUpdateLabel(

    slider,

    value

){

    const question=

        slider.name ||

        slider.id;

    const label=

        document.querySelector(

            `[data-slider-value="${question}"]`

        );

    if(

        label

    ){

        label.textContent=value;

    }

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH
═══════════════════════════════════════════════════════════════════════*/

function sliderComponentRefresh(){

    document

        .querySelectorAll(

            ".slider"

        )

        .forEach(slider=>{

            const question=

                slider.name ||

                slider.id;

            if(

                Store.answers[question]!==undefined

            ){

                slider.value=

                    Store.answers[question];

            }

            sliderComponentUpdate(

                slider

            );

        });

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function sliderComponentDestroy(){

    /* Reserved */

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER COMPONENT
═══════════════════════════════════════════════════════════════════════*/

ComponentEngine.register(

    "slider",

    SliderComponent

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 12

    COMPONENT
    Button Component
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
BUTTON COMPONENT
═══════════════════════════════════════════════════════════════════════*/

const ButtonComponent={

    init : buttonComponentInit,

    refresh : buttonComponentRefresh,

    destroy : buttonComponentDestroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function buttonComponentInit(){

    DOM.journey.addEventListener(

        EVENTS.CLICK,

        buttonComponentHandleClick

    );

    Journey.log(

        "Button Component Ready."

    );

}



/*═══════════════════════════════════════════════════════════════════════
CLICK HANDLER
═══════════════════════════════════════════════════════════════════════*/

function buttonComponentHandleClick(event){

    const button=

        event.target.closest(

            "[data-action]"

        );

    if(!button){

        return;

    }

    event.preventDefault();

    buttonComponentExecute(

        button

    );

}



/*═══════════════════════════════════════════════════════════════════════
EXECUTE ACTION
═══════════════════════════════════════════════════════════════════════*/

function buttonComponentExecute(button){

    const action=

        button.dataset.action;

    switch(action){

        case "next":

            buttonComponentNext();

            break;

        case "previous":

            buttonComponentPrevious();

            break;

        case "goto":

            buttonComponentGoto(

                button.dataset.scene

            );

            break;

        case "toggle-language":

            ServiceEngine

                .get("language")

                .toggle();

            break;

        default:

            document.dispatchEvent(

                new CustomEvent(

                    "buttonaction",

                    {

                        detail:{

                            action,

                            button

                        }

                    }

                )

            );

    }

}



/*═══════════════════════════════════════════════════════════════════════
NEXT
═══════════════════════════════════════════════════════════════════════*/

function buttonComponentNext(){

    const validation=

        ServiceEngine.get(

            "validation"

        );

    if(

        validation &&

        !validation.scene(

            Store.app.currentScene

        )

    ){

        return;

    }

    SceneEngine.next();

}



/*═══════════════════════════════════════════════════════════════════════
PREVIOUS
═══════════════════════════════════════════════════════════════════════*/

function buttonComponentPrevious(){

    SceneEngine.previous();

}



/*═══════════════════════════════════════════════════════════════════════
GO TO SCENE
═══════════════════════════════════════════════════════════════════════*/

function buttonComponentGoto(sceneId){

    if(

        !sceneId

    ){

        return;

    }

    SceneEngine.goto(

        sceneId

    );

}



/*═══════════════════════════════════════════════════════════════════════
ENABLE BUTTON
═══════════════════════════════════════════════════════════════════════*/

ButtonComponent.enable=function(button){

    if(button){

        button.disabled=false;

    }

};



/*═══════════════════════════════════════════════════════════════════════
DISABLE BUTTON
═══════════════════════════════════════════════════════════════════════*/

ButtonComponent.disable=function(button){

    if(button){

        button.disabled=true;

    }

};



/*═══════════════════════════════════════════════════════════════════════
REFRESH
═══════════════════════════════════════════════════════════════════════*/

function buttonComponentRefresh(){

    /* Reserved */

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function buttonComponentDestroy(){

    /* Reserved */

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER COMPONENT
═══════════════════════════════════════════════════════════════════════*/

ComponentEngine.register(

    "button",

    ButtonComponent

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 13

    COMPONENT
    Animation Component
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
ANIMATION COMPONENT
═══════════════════════════════════════════════════════════════════════*/

const AnimationComponent={

    init : animationComponentInit,

    reveal : animationComponentReveal,

    revealScene : animationComponentRevealScene,

    hideScene : animationComponentHideScene,

    refresh : animationComponentRefresh,

    destroy : animationComponentDestroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function animationComponentInit(){

    document.addEventListener(

        "scenechange",

        animationComponentSceneChanged

    );

    Journey.log(

        "Animation Component Ready."

    );

}



/*═══════════════════════════════════════════════════════════════════════
SCENE CHANGED
═══════════════════════════════════════════════════════════════════════*/

function animationComponentSceneChanged(event){

    const scene=

        document.getElementById(

            event.detail.current

        );

    if(!scene){

        return;

    }

    AnimationComponent.revealScene(

        scene

    );

}



/*═══════════════════════════════════════════════════════════════════════
REVEAL SCENE
═══════════════════════════════════════════════════════════════════════*/

function animationComponentRevealScene(scene){

    const elements=

        scene.querySelectorAll(

            "[data-animate]"

        );

    elements.forEach((element,index)=>{

        element.classList.remove(

            "visible"

        );

        window.setTimeout(

            function(){

                AnimationComponent.reveal(

                    element

                );

            },

            index*120

        );

    });

}



/*═══════════════════════════════════════════════════════════════════════
REVEAL ELEMENT
═══════════════════════════════════════════════════════════════════════*/

function animationComponentReveal(element){

    if(!element){

        return;

    }

    element.classList.add(

        "visible"

    );

}



/*═══════════════════════════════════════════════════════════════════════
HIDE SCENE
═══════════════════════════════════════════════════════════════════════*/

function animationComponentHideScene(scene){

    if(!scene){

        return;

    }

    scene

        .querySelectorAll(

            "[data-animate]"

        )

        .forEach(element=>{

            element.classList.remove(

                "visible"

            );

        });

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH
═══════════════════════════════════════════════════════════════════════*/

function animationComponentRefresh(){

    const scene=

        document.getElementById(

            Store.app.currentScene

        );

    if(scene){

        AnimationComponent.revealScene(

            scene

        );

    }

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function animationComponentDestroy(){

    /* Reserved */

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER COMPONENT
═══════════════════════════════════════════════════════════════════════*/

ComponentEngine.register(

    "animation",

    AnimationComponent

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 14

    SCENE 01 CONTROLLER
    Welcome Journey
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCENE 01
═══════════════════════════════════════════════════════════════════════*/

const Scene01={

    init : scene01Init,

    enter : scene01Enter,

    leave : scene01Leave,

    validate : scene01Validate,

    destroy : scene01Destroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE

Runs once during application startup.
═══════════════════════════════════════════════════════════════════════*/

function scene01Init(){

    Journey.log(

        "Scene01 Initialized."

    );

}



/*═══════════════════════════════════════════════════════════════════════
ENTER

Runs every time Scene 01 becomes active.
═══════════════════════════════════════════════════════════════════════*/

function scene01Enter(){

    const scene=

        document.getElementById(

            "scene01"

        );

    if(!scene){

        return;

    }

    Store.app.currentScene=

        "scene01";

    ComponentEngine

        .get("animation")

        .revealScene(

            scene

        );

    Journey.log(

        "Entered Scene01."

    );

}



/*═══════════════════════════════════════════════════════════════════════
LEAVE

Runs before Scene 01 is hidden.
═══════════════════════════════════════════════════════════════════════*/

function scene01Leave(){

    const scene=

        document.getElementById(

            "scene01"

        );

    if(!scene){

        return;

    }

    ComponentEngine

        .get("animation")

        .hideScene(

            scene

        );

    Journey.log(

        "Leaving Scene01."

    );

}



/*═══════════════════════════════════════════════════════════════════════
VALIDATE

Scene 01 always allows continuation.
═══════════════════════════════════════════════════════════════════════*/

function scene01Validate(){

    return true;

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY

Reserved.
═══════════════════════════════════════════════════════════════════════*/

function scene01Destroy(){

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER

Scene Engine discovers this automatically.
═══════════════════════════════════════════════════════════════════════*/

SceneEngine.register(

    "scene01",

    Scene01

);




/*═══════════════════════════════════════════════════════════════════════
APPLICATION STARTUP

After SceneEngine.init()

Initialize all registered scenes.
═══════════════════════════════════════════════════════════════════════*/

Object.values(

    Registry.scenes

).forEach(scene=>{

    if(

        scene.controller &&

        typeof scene.controller.init==="function"

    ){

        scene.controller.init();

    }

});

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 15

    SCENE 02 CONTROLLER
    Financial Discovery™

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCENE 02
═══════════════════════════════════════════════════════════════════════*/

const Scene02={

    init : scene02Init,

    enter : scene02Enter,

    leave : scene02Leave,

    validate : scene02Validate,

    destroy : scene02Destroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE

Runs once.
═══════════════════════════════════════════════════════════════════════*/

function scene02Init(){

    Journey.log(

        "Scene02 Initialized."

    );

}



/*═══════════════════════════════════════════════════════════════════════
ENTER
═══════════════════════════════════════════════════════════════════════*/

function scene02Enter(){

    const scene=

        document.getElementById(

            "scene02"

        );

    if(!scene){

        return;

    }

    ComponentEngine

        .get("animation")

        .revealScene(

            scene

        );

    ComponentEngine

        .get("slider")

        .refresh();

    ComponentEngine

        .get("radio-card")

        .refresh();

    ServiceEngine

        .get("binding")

        .refresh();

    Journey.log(

        "Entered Scene02."

    );

}



/*═══════════════════════════════════════════════════════════════════════
LEAVE
═══════════════════════════════════════════════════════════════════════*/

function scene02Leave(){

    const scene=

        document.getElementById(

            "scene02"

        );

    if(!scene){

        return;

    }

    ComponentEngine

        .get("animation")

        .hideScene(

            scene

        );

    Journey.log(

        "Leaving Scene02."

    );

}



/*═══════════════════════════════════════════════════════════════════════
VALIDATE

Every required control inside Scene02
must contain an answer before
the visitor can continue.

Required controls must have

data-required

═══════════════════════════════════════════════════════════════════════*/

function scene02Validate(){

    const scene=

        document.getElementById(

            "scene02"

        );

    if(!scene){

        return false;

    }

    const controls=

        scene.querySelectorAll(

            "[data-required]"

        );

    for(

        const control

        of

        controls

    ){

        const key=

            control.name ||

            control.id;

        if(

            key===undefined ||

            key===""

        ){

            continue;

        }

        if(

            Store.answers[key]===undefined ||

            Store.answers[key]===""

        ){

            control.focus();

            return false;

        }

    }

    return true;

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function scene02Destroy(){

}



/*═══════════════════════════════════════════════════════════════════════
LISTEN FOR ANSWERS

Allows Scene02 to react to changes
without polling.
═══════════════════════════════════════════════════════════════════════*/

document.addEventListener(

    "answerchange",

    scene02HandleAnswer

);

document.addEventListener(

    "sliderchange",

    scene02HandleSlider

);



/*═══════════════════════════════════════════════════════════════════════
RADIO ANSWER
═══════════════════════════════════════════════════════════════════════*/

function scene02HandleAnswer(event){

    if(

        Store.app.currentScene!==

        "scene02"

    ){

        return;

    }

    Journey.log(

        "Answer changed: " +

        event.detail.question

    );

}



/*═══════════════════════════════════════════════════════════════════════
SLIDER ANSWER
═══════════════════════════════════════════════════════════════════════*/

function scene02HandleSlider(event){

    if(

        Store.app.currentScene!==

        "scene02"

    ){

        return;

    }

    Journey.log(

        "Slider changed: " +

        event.detail.question +

        " = " +

        event.detail.value

    );

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER
═══════════════════════════════════════════════════════════════════════*/

SceneEngine.register(

    "scene02",

    Scene02

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 16

    SCENE 03 CONTROLLER
    Financial Reflection™

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCENE 03
═══════════════════════════════════════════════════════════════════════*/

const Scene03={

    init : scene03Init,

    enter : scene03Enter,

    leave : scene03Leave,

    validate : scene03Validate,

    destroy : scene03Destroy

};



/*═══════════════════════════════════════════════════════════════════════
PRIVATE STATE
═══════════════════════════════════════════════════════════════════════*/

let scene03ListenersAttached=false;



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function scene03Init(){

    Journey.log(

        "Scene03 Initialized."

    );

}



/*═══════════════════════════════════════════════════════════════════════
ENTER
═══════════════════════════════════════════════════════════════════════*/

function scene03Enter(){

    const scene=

        document.getElementById(

            "scene03"

        );

    if(!scene){

        return;

    }

    ComponentEngine

        .get("animation")

        .revealScene(scene);

    ServiceEngine

        .get("binding")

        .refresh();

    scene03AttachListeners();

    Journey.log(

        "Entered Scene03."

    );

}



/*═══════════════════════════════════════════════════════════════════════
LEAVE
═══════════════════════════════════════════════════════════════════════*/

function scene03Leave(){

    const scene=

        document.getElementById(

            "scene03"

        );

    if(scene){

        ComponentEngine

            .get("animation")

            .hideScene(scene);

    }

    scene03DetachListeners();

    Journey.log(

        "Leaving Scene03."

    );

}



/*═══════════════════════════════════════════════════════════════════════
VALIDATE

Scene03 contains no mandatory input.
═══════════════════════════════════════════════════════════════════════*/

function scene03Validate(){

    return true;

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function scene03Destroy(){

    scene03DetachListeners();

}



/*═══════════════════════════════════════════════════════════════════════
ATTACH LISTENERS
═══════════════════════════════════════════════════════════════════════*/

function scene03AttachListeners(){

    if(scene03ListenersAttached){

        return;

    }

    document.addEventListener(

        "answerchange",

        scene03AnswerChanged

    );

    document.addEventListener(

        "sliderchange",

        scene03SliderChanged

    );

    scene03ListenersAttached=true;

}



/*═══════════════════════════════════════════════════════════════════════
DETACH LISTENERS
═══════════════════════════════════════════════════════════════════════*/

function scene03DetachListeners(){

    if(!scene03ListenersAttached){

        return;

    }

    document.removeEventListener(

        "answerchange",

        scene03AnswerChanged

    );

    document.removeEventListener(

        "sliderchange",

        scene03SliderChanged

    );

    scene03ListenersAttached=false;

}



/*═══════════════════════════════════════════════════════════════════════
ANSWER CHANGED
═══════════════════════════════════════════════════════════════════════*/

function scene03AnswerChanged(event){

    Journey.log(

        "Scene03 Answer: " +

        event.detail.question

    );

}



/*═══════════════════════════════════════════════════════════════════════
SLIDER CHANGED
═══════════════════════════════════════════════════════════════════════*/

function scene03SliderChanged(event){

    Journey.log(

        "Scene03 Slider: " +

        event.detail.question +

        " = " +

        event.detail.value

    );

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER
═══════════════════════════════════════════════════════════════════════*/

SceneEngine.register(

    "scene03",

    Scene03

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 17

    SCENE 04 CONTROLLER
    Financial Awareness™

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCENE 04
═══════════════════════════════════════════════════════════════════════*/

const Scene04={

    init : scene04Init,

    enter : scene04Enter,

    leave : scene04Leave,

    validate : scene04Validate,

    destroy : scene04Destroy

};



/*═══════════════════════════════════════════════════════════════════════
PRIVATE STATE
═══════════════════════════════════════════════════════════════════════*/

let scene04ListenersAttached=false;



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function scene04Init(){

    Journey.log(

        "Scene04 Initialized."

    );

}



/*═══════════════════════════════════════════════════════════════════════
ENTER
═══════════════════════════════════════════════════════════════════════*/

function scene04Enter(){

    const scene=

        document.getElementById(

            "scene04"

        );

    if(!scene){

        return;

    }

    ComponentEngine

        .get("animation")

        .revealScene(

            scene

        );

    ServiceEngine

        .get("binding")

        .refresh();

    scene04AttachListeners();

    Journey.log(

        "Entered Scene04."

    );

}



/*═══════════════════════════════════════════════════════════════════════
LEAVE
═══════════════════════════════════════════════════════════════════════*/

function scene04Leave(){

    const scene=

        document.getElementById(

            "scene04"

        );

    if(scene){

        ComponentEngine

            .get("animation")

            .hideScene(

                scene

            );

    }

    scene04DetachListeners();

    Journey.log(

        "Leaving Scene04."

    );

}



/*═══════════════════════════════════════════════════════════════════════
VALIDATE

All required controls inside Scene04
must contain answers.

Required controls must contain

data-required

═══════════════════════════════════════════════════════════════════════*/

function scene04Validate(){

    const scene=

        document.getElementById(

            "scene04"

        );

    if(!scene){

        return false;

    }

    const controls=

        scene.querySelectorAll(

            "[data-required]"

        );

    for(

        const control

        of

        controls

    ){

        const key=

            control.name ||

            control.id;

        if(

            !key

        ){

            continue;

        }

        if(

            Store.answers[key]===undefined ||

            Store.answers[key]===""

        ){

            control.focus();

            return false;

        }

    }

    return true;

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

function scene04Destroy(){

    scene04DetachListeners();

}



/*═══════════════════════════════════════════════════════════════════════
ATTACH LISTENERS
═══════════════════════════════════════════════════════════════════════*/

function scene04AttachListeners(){

    if(scene04ListenersAttached){

        return;

    }

    document.addEventListener(

        "answerchange",

        scene04AnswerChanged

    );

    document.addEventListener(

        "sliderchange",

        scene04SliderChanged

    );

    scene04ListenersAttached=true;

}



/*═══════════════════════════════════════════════════════════════════════
DETACH LISTENERS
═══════════════════════════════════════════════════════════════════════*/

function scene04DetachListeners(){

    if(!scene04ListenersAttached){

        return;

    }

    document.removeEventListener(

        "answerchange",

        scene04AnswerChanged

    );

    document.removeEventListener(

        "sliderchange",

        scene04SliderChanged

    );

    scene04ListenersAttached=false;

}



/*═══════════════════════════════════════════════════════════════════════
ANSWER CHANGED
═══════════════════════════════════════════════════════════════════════*/

function scene04AnswerChanged(event){

    if(

        Store.app.currentScene!==

        "scene04"

    ){

        return;

    }

    Journey.log(

        "Scene04 Answer: " +

        event.detail.question

    );

}



/*═══════════════════════════════════════════════════════════════════════
SLIDER CHANGED
═══════════════════════════════════════════════════════════════════════*/

function scene04SliderChanged(event){

    if(

        Store.app.currentScene!==

        "scene04"

    ){

        return;

    }

    Journey.log(

        "Scene04 Slider: " +

        event.detail.question +

        " = " +

        event.detail.value

    );

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER
═══════════════════════════════════════════════════════════════════════*/

SceneEngine.register(

    "scene04",

    Scene04

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 18

    BASE SCENE CONTROLLER

    (Reusable Parent Controller)

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
BASE SCENE

Every scene inherits this controller.

Scene01

Scene02

...

Scene09

override only what they need.

═══════════════════════════════════════════════════════════════════════*/

const BaseScene={

    id:"",

    initialize:baseSceneInitialize,

    enter:baseSceneEnter,

    leave:baseSceneLeave,

    validate:baseSceneValidate,

    refresh:baseSceneRefresh,

    destroy:baseSceneDestroy

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE

Runs once.

═══════════════════════════════════════════════════════════════════════*/

function baseSceneInitialize(){

    Journey.log(

        this.id+

        " initialized."

    );

}



/*═══════════════════════════════════════════════════════════════════════
ENTER

Common logic shared by all scenes.

═══════════════════════════════════════════════════════════════════════*/

function baseSceneEnter(){

    const scene=

        document.getElementById(

            this.id

        );

    if(!scene){

        return;

    }

    ComponentEngine

        .get("animation")

        .revealScene(

            scene

        );

    const binding=

        ServiceEngine.get(

            "binding"

        );

    if(binding){

        binding.refresh();

    }

    Journey.log(

        this.id+

        " entered."

    );

}



/*═══════════════════════════════════════════════════════════════════════
LEAVE

═══════════════════════════════════════════════════════════════════════*/

function baseSceneLeave(){

    const scene=

        document.getElementById(

            this.id

        );

    if(!scene){

        return;

    }

    ComponentEngine

        .get("animation")

        .hideScene(

            scene

        );

    Journey.log(

        this.id+

        " left."

    );

}



/*═══════════════════════════════════════════════════════════════════════
VALIDATE

Default implementation.

Individual scenes override this when needed.

═══════════════════════════════════════════════════════════════════════*/

function baseSceneValidate(){

    return true;

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH

Optional

═══════════════════════════════════════════════════════════════════════*/

function baseSceneRefresh(){

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY

═══════════════════════════════════════════════════════════════════════*/

function baseSceneDestroy(){

}

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 19

    SCENE 05 CONTROLLER
    Financial Reality™

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCENE 05

Financial Reality™

Inherits BaseScene

═══════════════════════════════════════════════════════════════════════*/

const Scene05=Object.create(

    BaseScene

);



Scene05.id="scene05";



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE

Runs once.
═══════════════════════════════════════════════════════════════════════*/

Scene05.initialize=function(){

    BaseScene.initialize.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
ENTER
═══════════════════════════════════════════════════════════════════════*/

Scene05.enter=function(){

    BaseScene.enter.call(

        this

    );



    scene05RefreshSummary();



    Journey.log(

        "Financial Reality Loaded."

    );

};



/*═══════════════════════════════════════════════════════════════════════
LEAVE
═══════════════════════════════════════════════════════════════════════*/

Scene05.leave=function(){

    BaseScene.leave.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
VALIDATE

Scene05 contains no mandatory inputs.

═══════════════════════════════════════════════════════════════════════*/

Scene05.validate=function(){

    return true;

};



/*═══════════════════════════════════════════════════════════════════════
REFRESH SUMMARY

Displays calculated values collected
from previous scenes.

═══════════════════════════════════════════════════════════════════════*/

function scene05RefreshSummary(){

    const binding=

        ServiceEngine.get(

            "binding"

        );



    if(

        binding

    ){

        binding.refresh();

    }

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

Scene05.destroy=function(){

    BaseScene.destroy.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
REGISTER
═══════════════════════════════════════════════════════════════════════*/

SceneEngine.register(

    "scene05",

    Scene05

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 20

    SCENE 06 CONTROLLER
    Emotional Cost™

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCENE 06

Emotional Cost™

Inherits BaseScene

═══════════════════════════════════════════════════════════════════════*/

const Scene06=Object.create(

    BaseScene

);



Scene06.id="scene06";



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

Scene06.initialize=function(){

    BaseScene.initialize.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
ENTER
═══════════════════════════════════════════════════════════════════════*/

Scene06.enter=function(){

    BaseScene.enter.call(

        this

    );

    scene06UpdateReflection();

    Journey.log(

        "Scene06 Loaded."

    );

};



/*═══════════════════════════════════════════════════════════════════════
LEAVE
═══════════════════════════════════════════════════════════════════════*/

Scene06.leave=function(){

    BaseScene.leave.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
VALIDATE

Scene06 requires every required
reflection question to be answered.

Required controls must contain

data-required

═══════════════════════════════════════════════════════════════════════*/

Scene06.validate=function(){

    const scene=

        document.getElementById(

            this.id

        );

    if(!scene){

        return false;

    }

    const controls=

        scene.querySelectorAll(

            "[data-required]"

        );

    for(

        const control

        of

        controls

    ){

        const key=

            control.name ||

            control.id;

        if(

            !key

        ){

            continue;

        }

        if(

            Store.answers[key]===undefined ||

            Store.answers[key]===""

        ){

            control.focus();

            return false;

        }

    }

    return true;

};



/*═══════════════════════════════════════════════════════════════════════
UPDATE REFLECTION

Refreshes all dynamic values
displayed inside Scene06.

═══════════════════════════════════════════════════════════════════════*/

function scene06UpdateReflection(){

    const binding=

        ServiceEngine.get(

            "binding"

        );

    if(binding){

        binding.refresh();

    }

}



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

Scene06.destroy=function(){

    BaseScene.destroy.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
REGISTER
═══════════════════════════════════════════════════════════════════════*/

SceneEngine.register(

    "scene06",

    Scene06

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 21

    SCENE 07 CONTROLLER
    Awakening™

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCENE 07

Awakening™

Inherits BaseScene

Purpose

• Display personalized insights
• Calculate visitor readiness
• Trigger AI rule evaluation

═══════════════════════════════════════════════════════════════════════*/

const Scene07=Object.create(

    BaseScene

);



Scene07.id="scene07";



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

Scene07.initialize=function(){

    BaseScene.initialize.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
ENTER
═══════════════════════════════════════════════════════════════════════*/

Scene07.enter=function(){

    BaseScene.enter.call(

        this

    );

    scene07EvaluateJourney();

    scene07RefreshInsights();

    Journey.log(

        "Scene07 Loaded."

    );

};



/*═══════════════════════════════════════════════════════════════════════
LEAVE
═══════════════════════════════════════════════════════════════════════*/

Scene07.leave=function(){

    BaseScene.leave.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
VALIDATE

Scene07 is informational.

No mandatory inputs.

═══════════════════════════════════════════════════════════════════════*/

Scene07.validate=function(){

    return true;

};



/*═══════════════════════════════════════════════════════════════════════
EVALUATE JOURNEY

Runs all registered business rules.

Stores the results inside

Store.insights

═══════════════════════════════════════════════════════════════════════*/

function scene07EvaluateJourney(){

    Store.insights=

        RuleEngine.executeAll(

            Store

        );

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH INSIGHTS

Updates all

data-bind

placeholders.

═══════════════════════════════════════════════════════════════════════*/

function scene07RefreshInsights(){

    const binding=

        ServiceEngine.get(

            "binding"

        );

    if(binding){

        binding.refresh();

    }

}



/*═══════════════════════════════════════════════════════════════════════
GET READINESS SCORE

Utility used by Scene08
and Scene09.

═══════════════════════════════════════════════════════════════════════*/

Scene07.getReadiness=function(){

    return Store.insights

        .readinessScore

        ??

        0;

};



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

Scene07.destroy=function(){

    BaseScene.destroy.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
REGISTER
═══════════════════════════════════════════════════════════════════════*/

SceneEngine.register(

    "scene07",

    Scene07

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 22

    SCENE 08 CONTROLLER
    Your CTM PATH™

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCENE 08

Your CTM PATH™

Inherits BaseScene

Purpose

• Build visitor recommendation
• Calculate journey profile
• Prepare final decision page

═══════════════════════════════════════════════════════════════════════*/

const Scene08=Object.create(

    BaseScene

);



Scene08.id="scene08";



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

Scene08.initialize=function(){

    BaseScene.initialize.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
ENTER
═══════════════════════════════════════════════════════════════════════*/

Scene08.enter=function(){

    BaseScene.enter.call(

        this

    );

    scene08BuildRecommendation();

    scene08PrepareDecision();

    scene08RefreshBindings();

    Journey.log(

        "Scene08 Loaded."

    );

};



/*═══════════════════════════════════════════════════════════════════════
LEAVE
═══════════════════════════════════════════════════════════════════════*/

Scene08.leave=function(){

    BaseScene.leave.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
VALIDATE

Scene08 is informational.

No mandatory inputs.

═══════════════════════════════════════════════════════════════════════*/

Scene08.validate=function(){

    return true;

};



/*═══════════════════════════════════════════════════════════════════════
BUILD RECOMMENDATION

Creates the personalized recommendation
using previously calculated insights.

═══════════════════════════════════════════════════════════════════════*/

function scene08BuildRecommendation(){

    const readiness=

        Store.insights.readinessScore

        ??

        0;

    let recommendation;

    if(readiness>=80){

        recommendation=

            "READY_NOW";

    }

    else if(readiness>=60){

        recommendation=

            "READY_WITH_GUIDANCE";

    }

    else{

        recommendation=

            "FOUNDATION_FIRST";

    }

    Store.insights.recommendation=

        recommendation;

}



/*═══════════════════════════════════════════════════════════════════════
PREPARE DECISION

Creates the summary that will be shown
inside Scene09.

═══════════════════════════════════════════════════════════════════════*/

function scene08PrepareDecision(){

    Store.insights.decision={

        recommendation:

            Store.insights.recommendation,

        readinessScore:

            Store.insights.readinessScore,

        financialGap:

            Store.insights.financialGap,

        nextStep:

            Store.insights.nextStep

    };

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH BINDINGS

Updates every personalized placeholder.

═══════════════════════════════════════════════════════════════════════*/

function scene08RefreshBindings(){

    const binding=

        ServiceEngine.get(

            "binding"

        );

    if(binding){

        binding.refresh();

    }

}



/*═══════════════════════════════════════════════════════════════════════
GET RECOMMENDATION

Public helper used by Scene09.

═══════════════════════════════════════════════════════════════════════*/

Scene08.getRecommendation=function(){

    return Store.insights

        .recommendation;

};



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

Scene08.destroy=function(){

    BaseScene.destroy.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
REGISTER
═══════════════════════════════════════════════════════════════════════*/

SceneEngine.register(

    "scene08",

    Scene08

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 23

    SCENE 09 CONTROLLER
    Your Decision™

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
SCENE 09

Your Decision™

Inherits BaseScene

Purpose

• Present Final Recommendation
• Display Journey Summary
• Complete Journey
• Dispatch Completion Event

═══════════════════════════════════════════════════════════════════════*/

const Scene09=Object.create(

    BaseScene

);



Scene09.id="scene09";



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

Scene09.initialize=function(){

    BaseScene.initialize.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
ENTER
═══════════════════════════════════════════════════════════════════════*/

Scene09.enter=function(){

    BaseScene.enter.call(

        this

    );

    scene09PrepareSummary();

    scene09RefreshBindings();

    scene09CompleteJourney();

    Journey.log(

        "Scene09 Loaded."

    );

};



/*═══════════════════════════════════════════════════════════════════════
LEAVE
═══════════════════════════════════════════════════════════════════════*/

Scene09.leave=function(){

    BaseScene.leave.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
VALIDATE

Final Scene

Always valid.

═══════════════════════════════════════════════════════════════════════*/

Scene09.validate=function(){

    return true;

};



/*═══════════════════════════════════════════════════════════════════════
PREPARE SUMMARY

Creates the final summary object
used throughout Scene09.

═══════════════════════════════════════════════════════════════════════*/

function scene09PrepareSummary(){

    Store.summary={

        visitor:{

            name:

                Store.visitor.name,

            mobile:

                Store.visitor.mobile,

            email:

                Store.visitor.email

        },

        insights:{

            readiness:

                Store.insights.readinessScore,

            financialGap:

                Store.insights.financialGap,

            recommendation:

                Store.insights.recommendation,

            nextStep:

                Store.insights.nextStep

        },

        completedAt:

            new Date()

                .toISOString()

    };

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH PERSONALIZATION

Updates all

data-bind

elements.

═══════════════════════════════════════════════════════════════════════*/

function scene09RefreshBindings(){

    const binding=

        ServiceEngine.get(

            "binding"

        );

    if(binding){

        binding.refresh();

    }

}



/*═══════════════════════════════════════════════════════════════════════
COMPLETE JOURNEY

Dispatches a completion event.

Future versions may

• Save to database

• Send email

• Generate report

• Open calendar

═══════════════════════════════════════════════════════════════════════*/

function scene09CompleteJourney(){

    document.dispatchEvent(

        new CustomEvent(

            "journeycompleted",

            {

                detail:Store.summary

            }

        )

    );

}



/*═══════════════════════════════════════════════════════════════════════
PUBLIC API

Returns final journey summary.

═══════════════════════════════════════════════════════════════════════*/

Scene09.getSummary=function(){

    return Store.summary;

};



/*═══════════════════════════════════════════════════════════════════════
DESTROY
═══════════════════════════════════════════════════════════════════════*/

Scene09.destroy=function(){

    BaseScene.destroy.call(

        this

    );

};



/*═══════════════════════════════════════════════════════════════════════
REGISTER
═══════════════════════════════════════════════════════════════════════*/

SceneEngine.register(

    "scene09",

    Scene09

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 24

    BUSINESS RULES LIBRARY
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
BUSINESS RULES

Single source of truth
for all calculations.

═══════════════════════════════════════════════════════════════════════*/

const BusinessRules={

    calculateFinancialGap,

    calculateReadiness,

    calculateCommitment,

    calculateAwareness,

    calculateUrgency,

    calculateRecommendation,

    evaluateJourney

};



/*═══════════════════════════════════════════════════════════════════════
FINANCIAL GAP

Desired Income

minus

Current Income

═══════════════════════════════════════════════════════════════════════*/

function calculateFinancialGap(){

    const current=

        Number(

            Store.answers.currentIncome

            ??

            0

        );

    const desired=

        Number(

            Store.answers.desiredIncome

            ??

            0

        );

    return Math.max(

        desired-current,

        0

    );

}



/*═══════════════════════════════════════════════════════════════════════
READINESS SCORE

Average of all slider values

═══════════════════════════════════════════════════════════════════════*/

function calculateReadiness(){

    const sliders=

        Object.values(

            Store.answers

        ).filter(value=>

            typeof value==="number"

        );

    if(

        sliders.length===0

    ){

        return 0;

    }

    const total=

        sliders.reduce(

            (sum,value)=>

                sum+value,

            0

        );

    return Math.round(

        (

            total/

            sliders.length

        )*10

    );

}



/*═══════════════════════════════════════════════════════════════════════
COMMITMENT SCORE

Placeholder

Expanded later

═══════════════════════════════════════════════════════════════════════*/

function calculateCommitment(){

    return 75;

}



/*═══════════════════════════════════════════════════════════════════════
AWARENESS SCORE

Placeholder

Expanded later

═══════════════════════════════════════════════════════════════════════*/

function calculateAwareness(){

    return 80;

}



/*═══════════════════════════════════════════════════════════════════════
URGENCY SCORE

Placeholder

Expanded later

═══════════════════════════════════════════════════════════════════════*/

function calculateUrgency(){

    return 70;

}



/*═══════════════════════════════════════════════════════════════════════
RECOMMENDATION

═══════════════════════════════════════════════════════════════════════*/

function calculateRecommendation(

    readiness

){

    if(

        readiness>=80

    ){

        return "READY_NOW";

    }

    if(

        readiness>=60

    ){

        return "READY_WITH_GUIDANCE";

    }

    return "FOUNDATION_FIRST";

}



/*═══════════════════════════════════════════════════════════════════════
MASTER EVALUATION

Runs all business calculations.

═══════════════════════════════════════════════════════════════════════*/

function evaluateJourney(){

    const readiness=

        calculateReadiness();

    Store.insights={

        financialGap:

            calculateFinancialGap(),

        readinessScore:

            readiness,

        commitment:

            calculateCommitment(),

        awareness:

            calculateAwareness(),

        urgency:

            calculateUrgency(),

        recommendation:

            calculateRecommendation(

                readiness

            )

    };

    return Store.insights;

}



/*═══════════════════════════════════════════════════════════════════════
REGISTER

═══════════════════════════════════════════════════════════════════════*/

RuleEngine.register(

    "journey",

    evaluateJourney

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 25

    AI PERSONALIZATION ENGINE
═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
AI PERSONALIZATION ENGINE
═══════════════════════════════════════════════════════════════════════*/

const PersonalizationEngine={

    initialize:personalizationInitialize,

    evaluate:personalizationEvaluate,

    buildProfile:personalizationBuildProfile,

    buildMentorMessage:personalizationBuildMentorMessage,

    buildJourneySummary:personalizationBuildJourneySummary,

    refresh:personalizationRefresh

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function personalizationInitialize(){

    Journey.log(

        "Personalization Engine Ready."

    );

}



/*═══════════════════════════════════════════════════════════════════════
MASTER EVALUATION
═══════════════════════════════════════════════════════════════════════*/

function personalizationEvaluate(){

    PersonalizationEngine.buildProfile();

    PersonalizationEngine.buildMentorMessage();

    PersonalizationEngine.buildJourneySummary();

    return Store.personalization;

}



/*═══════════════════════════════════════════════════════════════════════
BUILD PROFILE
═══════════════════════════════════════════════════════════════════════*/

function personalizationBuildProfile(){

    const insights=

        Store.insights;

    Store.personalization={

        profile:{

            readiness:

                insights.readinessScore,

            commitment:

                insights.commitment,

            awareness:

                insights.awareness,

            urgency:

                insights.urgency,

            recommendation:

                insights.recommendation

        }

    };

}



/*═══════════════════════════════════════════════════════════════════════
MENTOR MESSAGE
═══════════════════════════════════════════════════════════════════════*/

function personalizationBuildMentorMessage(){

    const score=

        Store.insights

            .readinessScore;

    let message="";

    if(score>=80){

        message=

            "You appear ready to begin your transformation immediately.";

    }

    else if(score>=60){

        message=

            "You have strong potential. A structured mentor can accelerate your journey.";

    }

    else{

        message=

            "Your foundation needs strengthening before pursuing bigger financial goals.";

    }

    Store.personalization

        .mentorMessage=

        message;

}



/*═══════════════════════════════════════════════════════════════════════
JOURNEY SUMMARY
═══════════════════════════════════════════════════════════════════════*/

function personalizationBuildJourneySummary(){

    Store.personalization.summary={

        visitor:

            Store.visitor.name,

        readiness:

            Store.insights

                .readinessScore,

        recommendation:

            Store.insights

                .recommendation,

        financialGap:

            Store.insights

                .financialGap,

        mentorMessage:

            Store.personalization

                .mentorMessage

    };

}



/*═══════════════════════════════════════════════════════════════════════
REFRESH
═══════════════════════════════════════════════════════════════════════*/

function personalizationRefresh(){

    const binding=

        ServiceEngine.get(

            "binding"

        );

    if(binding){

        binding.refresh();

    }

}



/*═══════════════════════════════════════════════════════════════════════
PUBLIC EVENT

Allows scenes to react
to updated personalization.
═══════════════════════════════════════════════════════════════════════*/

document.dispatchEvent(

    new CustomEvent(

        "personalizationupdated",

        {

            detail:

                Store.personalization

        }

    )

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 26

    JOURNEY PUBLIC API

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
PUBLIC API

This is the ONLY public interface
used by external code.

═══════════════════════════════════════════════════════════════════════*/

Journey.start=function(){

    SceneEngine.goto(

        CONFIG.DEFAULT_SCENE

    );

};



Journey.next=function(){

    SceneEngine.next();

};



Journey.previous=function(){

    SceneEngine.previous();

};



Journey.goto=function(sceneId){

    SceneEngine.goto(

        sceneId

    );

};



Journey.getCurrentScene=function(){

    return Store.app.currentScene;

};



Journey.getVisitor=function(){

    return structuredClone(

        Store.visitor

    );

};



Journey.getAnswers=function(){

    return structuredClone(

        Store.answers

    );

};



Journey.getInsights=function(){

    return structuredClone(

        Store.insights

    );

};



Journey.getPersonalization=function(){

    return structuredClone(

        Store.personalization

    );

};



Journey.getSummary=function(){

    return structuredClone(

        Store.summary

    );

};



Journey.setValue=function(

    path,

    value

){

    ServiceEngine

        .get("binding")

        .set(

            path,

            value

        );

};



Journey.getValue=function(path){

    return ServiceEngine

        .get("binding")

        .get(

            path

        );

};



Journey.refresh=function(){

    ComponentEngine.refresh();

};



Journey.evaluate=function(){

    RuleEngine.execute(

        "journey"

    );

    PersonalizationEngine.evaluate();

};



Journey.reset=function(){

    Store.answers={};

    Store.insights={};

    Store.personalization={};

    Store.summary={};

    ComponentEngine.refresh();

};



Journey.export=function(){

    return {

        visitor:

            Journey.getVisitor(),

        answers:

            Journey.getAnswers(),

        insights:

            Journey.getInsights(),

        personalization:

            Journey.getPersonalization(),

        summary:

            Journey.getSummary()

    };

};



/*═══════════════════════════════════════════════════════════════════════
FREEZE PUBLIC API

Prevents accidental modification.

═══════════════════════════════════════════════════════════════════════*/

Object.freeze(

    Journey

);

/*═══════════════════════════════════════════════════════════════════════
    CTM PATH™ Guided Journey
    Enterprise Application Engine
    Version : 6.0

    BATCH 27

    APPLICATION BOOTSTRAP
    FINAL INTEGRATION

═══════════════════════════════════════════════════════════════════════*/


/*═══════════════════════════════════════════════════════════════════════
APPLICATION
═══════════════════════════════════════════════════════════════════════*/

const Application={

    initialize : applicationInitialize,

    validate : applicationValidate,

    initializeServices : applicationInitializeServices,

    initializeComponents : applicationInitializeComponents,

    initializeScenes : applicationInitializeScenes,

    registerEvents : applicationRegisterEvents,

    start : applicationStart

};



/*═══════════════════════════════════════════════════════════════════════
INITIALIZE
═══════════════════════════════════════════════════════════════════════*/

function applicationInitialize(){

    Journey.log(

        "Initializing Application..."

    );

    Application.validate();

    Application.initializeServices();

    Application.initializeComponents();

    Application.initializeScenes();

    Application.registerEvents();

    Application.start();

}



/*═══════════════════════════════════════════════════════════════════════
VALIDATION
═══════════════════════════════════════════════════════════════════════*/

function applicationValidate(){

    if(

        DOM.scenes.length!==

        CONFIG.TOTAL_SCENES

    ){

        throw new Error(

            "Scene count mismatch."

        );

    }

}



/*═══════════════════════════════════════════════════════════════════════
SERVICES
═══════════════════════════════════════════════════════════════════════*/

function applicationInitializeServices(){

    ServiceEngine.init();

}



/*═══════════════════════════════════════════════════════════════════════
COMPONENTS
═══════════════════════════════════════════════════════════════════════*/

function applicationInitializeComponents(){

    ComponentEngine.init();

}



/*═══════════════════════════════════════════════════════════════════════
SCENES
═══════════════════════════════════════════════════════════════════════*/

function applicationInitializeScenes(){

    Object.values(

        Registry.scenes

    ).forEach(scene=>{

        if(

            scene.controller &&

            typeof scene.controller.initialize==="function"

        ){

            scene.controller.initialize();

        }

    });

}



/*═══════════════════════════════════════════════════════════════════════
GLOBAL EVENTS
═══════════════════════════════════════════════════════════════════════*/

function applicationRegisterEvents(){

    window.addEventListener(

        EVENTS.RESIZE,

        applicationResize

    );

    document.addEventListener(

        "journeycompleted",

        applicationJourneyCompleted

    );

}



/*═══════════════════════════════════════════════════════════════════════
WINDOW RESIZE
═══════════════════════════════════════════════════════════════════════*/

function applicationResize(){

    ComponentEngine.refresh();

}



/*═══════════════════════════════════════════════════════════════════════
JOURNEY COMPLETED
═══════════════════════════════════════════════════════════════════════*/

function applicationJourneyCompleted(event){

    Journey.log(

        "Journey Completed."

    );

    Journey.log(

        event.detail

    );

}



/*═══════════════════════════════════════════════════════════════════════
START APPLICATION
═══════════════════════════════════════════════════════════════════════*/

function applicationStart(){

    SceneEngine.init();

    SceneEngine.goto(

        CONFIG.DEFAULT_SCENE

    );

    Journey.log(

        CONFIG.APP_NAME+

        " Ready."

    );

}



/*═══════════════════════════════════════════════════════════════════════
BOOTSTRAP

Replace the previous

boot()

implementation

with this.

═══════════════════════════════════════════════════════════════════════*/

function boot(){

    try{

        Application.initialize();

    }

    catch(error){

        console.error(

            error

        );

        alert(

            "Unable to start CTM PATH™."

        );

    }

}

