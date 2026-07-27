
/* ==========================================================================
   CTM PATH™ Guided Journey

   File        : registration.js
   Version     : 1.0

   Purpose:
   PAGE 02 — REGISTRATION™ Controller

   Responsibilities:

   • Capture visitor registration data
   • Validate input
   • Send registration request
   • Receive VisitorID
   • Continue journey

   Backend:
   CTM PATH™ Visitor API

   ========================================================================== */





/* ==========================================================================
   CONFIGURATION
   ========================================================================== */


const REGISTRATION_CONFIG = {


  API_URL:

    "https://script.google.com/macros/s/AKfycbxyteSs7pXpvWGLT0uR0tWU-zcl5zuqIVOOBdQ_YdS1HJcjrGWFO9MN7yiSLqNUZ66RoA/exec",



  ACTION:

    "REGISTER"



};







/* ==========================================================================
   INITIALIZE REGISTRATION PAGE
   ========================================================================== */


function initRegistration(){



  const form =

    document.getElementById(

      "registrationForm"

    );





  if(!form){



    console.error(

      "Registration form not found"

    );


    return;



  }







  form.addEventListener(



    "submit",



    function(event){



      event.preventDefault();



      submitRegistration();



    }



  );



}







/* ==========================================================================
   COLLECT FORM DATA
   ========================================================================== */


function collectRegistrationData(){



  return {



    fullName:


      getInputValue(

        "fullName"

      ),





    email:


      getInputValue(

        "email"

      ),





    mobile:


      getInputValue(

        "mobile"

      ),





    district:


      getInputValue(

        "district"

      ),





    state:


      getInputValue(

        "state"

      ),





    language:


      getInputValue(

        "language"

      ) || "Tamil",





    source:


      getInputValue(

        "source"

      ) || "Landing Page",





    device:


      detectDevice()



  };


}



/* ==========================================================================
   VALIDATE REGISTRATION DATA
   ========================================================================== */


/**
 * Frontend validation
 */


function validateRegistrationData(data){



  if(!data.fullName){



    return {



      valid:false,



      message:"Please enter your name"



    };



  }







  if(!data.email){



    return {



      valid:false,



      message:"Please enter your email"



    };



  }







  if(!data.mobile){



    return {



      valid:false,



      message:"Please enter your mobile number"



    };



  }







  return {



    valid:true,



    message:""



  };



}







/* ==========================================================================
   SUBMIT REGISTRATION
   ========================================================================== */


/**
 *
 * Main registration transaction
 *
 */


async function submitRegistration(){



  try{





    showRegistrationLoading();







    const visitorData =



      collectRegistrationData();







    const validation =



      validateRegistrationData(



        visitorData



      );







    if(!validation.valid){



      showRegistrationError(



        validation.message



      );



      hideRegistrationLoading();



      return;



    }









    const payload = {



      action:

        REGISTRATION_CONFIG.ACTION,



      data:

        visitorData



    };







    const response =



      await sendRegistrationRequest(



        payload



      );







    if(



      !response.success



    ){



      throw new Error(



        response.message ||

        "Registration failed"



      );



    }







    handleRegistrationSuccess(



      response.data



    );







  }



  catch(error){





    console.error(



      "Registration Error:",



      error



    );





    showRegistrationError(



      error.message



    );



  }



  finally{



    hideRegistrationLoading();



  }





}







/* ==========================================================================
   SEND API REQUEST
   ========================================================================== */


async function sendRegistrationRequest(payload){



  const response =



    await fetch(



      REGISTRATION_CONFIG.API_URL,



      {



        method:"POST",





        headers:{



          "Content-Type":

            "text/plain;charset=utf-8"



        },





        body:



          JSON.stringify(

            payload

          )



      }



    );







  return await response.json();



}


/* ==========================================================================
   HANDLE REGISTRATION SUCCESS
   ========================================================================== */


/**
 *
 * Store visitor identity
 *
 */


function handleRegistrationSuccess(visitor){



  if(!visitor){



    showRegistrationError(

      "Invalid server response"

    );


    return;



  }







  const visitorID =



    visitor.visitorID;









  if(visitorID){



    sessionStorage.setItem(



      "CTM_VISITOR_ID",



      visitorID



    );



  }







  sessionStorage.setItem(



    "CTM_VISITOR_STATUS",



    visitor.status || "NEW"



  );







  showRegistrationSuccess(



    visitorID



  );







  continueJourney();





}







/* ==========================================================================
   DEVICE DETECTION
   ========================================================================== */


function detectDevice(){



  const width =



    window.innerWidth;







  if(width < 600){



    return "Mobile";



  }







  if(width < 1024){



    return "Tablet";



  }







  return "Desktop";



}







/* ==========================================================================
   INPUT HELPER
   ========================================================================== */


function getInputValue(id){



  const element =



    document.getElementById(id);







  if(!element){



    return "";



  }







  return element.value.trim();



}







/* ==========================================================================
   UI HELPERS
   ========================================================================== */


function showRegistrationLoading(){



  const button =



    document.querySelector(

      "#registrationSubmit"

    );







  if(button){



    button.disabled = true;



    button.innerText =

      "Registering...";



  }



}







function hideRegistrationLoading(){



  const button =



    document.querySelector(

      "#registrationSubmit"

    );







  if(button){



    button.disabled = false;



    button.innerText =

      "Continue";



  }



}







function showRegistrationError(message){



  console.error(



    message



  );







  const errorBox =



    document.getElementById(

      "registrationError"

    );







  if(errorBox){



    errorBox.innerText = message;



    errorBox.style.display =

      "block";



  }



}







function showRegistrationSuccess(visitorID){



  const successBox =



    document.getElementById(

      "registrationSuccess"

    );







  if(successBox){



    successBox.innerText =



      "Registration complete: " +

      visitorID;



    successBox.style.display =

      "block";



  }



}


/* ==========================================================================
   CONTINUE JOURNEY
   ========================================================================== */


/**
 *
 * Move visitor to next screen
 *
 */


function continueJourney(){



  /*
     PAGE FLOW

     PAGE 02 — REGISTRATION™

             ↓

     PAGE 03 — DISCOVERY™

  */





  if(

    typeof goToNextScreen === "function"

  ){



    goToNextScreen();



    return;



  }







  /*
     Fallback navigation

     Used when standalone page flow
  */



  const nextPage =

    document.body.dataset.nextPage;







  if(nextPage){



    window.location.href =

      nextPage;



  }



}







/* ==========================================================================
   GET STORED VISITOR ID
   ========================================================================== */


function getVisitorID(){



  return sessionStorage.getItem(



    "CTM_VISITOR_ID"



  );



}







/* ==========================================================================
   RESET REGISTRATION SESSION
   ========================================================================== */


function resetRegistrationSession(){



  sessionStorage.removeItem(



    "CTM_VISITOR_ID"



  );







  sessionStorage.removeItem(



    "CTM_VISITOR_STATUS"



  );



}







/* ==========================================================================
   AUTO INITIALIZE
   ========================================================================== */


document.addEventListener(



  "DOMContentLoaded",



  function(){



    initRegistration();



  }



);







/* ==========================================================================
   END OF FILE
   ========================================================================== */


