$(document).ready(function(){
    let StepNames =  [
        {"title" : 'Choose your industry'},
        {"title" : 'Which versions of the product do you wish to build at this stage?'},
        {"title" : 'What type of platform do you need?'},
        {"title" : 'Login options'},
        {"title" : 'How do you see the user interface design of your future solution?'},
        {"title" : 'Do you need any third-party service integrations?'},
        {"title" : 'Do you need an Administrative panel for your solution? '},
        {"title" : 'What kinds of functionality will your solution have? '},
        {"title" : 'Choose your industry'},
                    ]
    let current_fs, next_fs, previous_fs; //fieldsets
    let opacity;
    let current = 1;
    let steps = $("fieldset").length;
    
    setProgressBar(current);
    
    $(".next").click(function(){

    current_fs = $('.formFieldset-wrapper__main-info .fieldset.active');
    let current_fs__id = current_fs.attr('id');
    let [ numberID, subStepNumber, nextStep ] = checkID(current_fs__id);

    
    // next_fs = current_fs.next();
    next_fs =  $(`#${nextStep}`);


    // let next_fs__id = next_fs.attr('id');
    current_fs.removeClass('active');
   
    checkIsPreviousStep(nextStep);
  
    next_fs.addClass('active');
    
    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
    step: function(now) {
    // for making fielset appear animation
    opacity = 1 - now;
    
    current_fs.css({
    'display': 'none',
    'position': 'relative'
    });
    next_fs.css({'opacity': opacity, 'display': 'grid'});
    },
    duration: 500
    });
    setProgressBar(++current);
    });
    
    $(".previous").click(function(){
    
    current_fs = $('.formFieldset-wrapper__main-info .fieldset.active');
    let current_fs__id = current_fs.attr('id');

    let [ numberID, subStepNumber, nextStep ] = checkID(current_fs__id, true);

    previous_fs = $(`#${nextStep}`);

    current_fs.removeClass('active');
    checkIsPreviousStep(nextStep);
    previous_fs.addClass('active');
    
    
    //show the previous fieldset
    previous_fs.show();
    
    //hide the current fieldset with style
    current_fs.animate({opacity: 0}, {
    step: function(now) {
    // for making fielset appear animation
    opacity = 1 - now;
    
    current_fs.css({
    'display': 'none',
    'position': 'relative'
    });
    previous_fs.css({'opacity': opacity, 'display': 'grid'});
    },
    duration: 500
    });
    setProgressBar(--current);
    });

    $("#startStepper").click(function(){
      $("#onboarding").hide();
      $("#onboardingCalc").show();
    })
    
    function setProgressBar(curStep){
    let percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar")
    .css("width",percent+"%")
    }
    
    $(".submit").click(function(){
    return false;
    })

    const checkIsPreviousStep = (id) => {
         (id !== "step1") 
       ? $("#prevBtn").css("display",'flex')
       : $("#prevBtn").hide()
    }

    const checkID = (id, isPrev = false) => {
      let subStepNumber;
      let nextStep;
      let parts = id.split("_");
      let numberID =  parts[0].replace("step", "");

      nextStep = isPrev ? 'step' + (+numberID - 1) :'step' + (+numberID + 1);
     
      if (parts.length > 1) {
        subStepNumber = parts[1];
      }

      return [numberID, subStepNumber, nextStep];
    }
    
    })