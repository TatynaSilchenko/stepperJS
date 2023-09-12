$(document).ready(function(){
    let StepNames =  [
        {"title" : 'Choose your industry'},
        {"title" : 'Which versions of the product do you wish to build at this stage?'},
        {"title" : 'What type of platform do you need?'},
        {"title" : 'Login options'},
        {"title" : 'How do you see the user interface design of your future solution?'},
        {"title" : 'Do you need any third-party service integrations?'},
        {"title" : 'Do you need an Administrative panel for your solution? '},
        {"title" : 'What kinds of functionality will your solution have? ', 
        'subtitles': ['Real-time communication ', 'User roles', 'Social features', 'Geolocation services', 'Payments and purchasing ', 'Calendar']
      },
        {"title" : 'How much time do you have?'},
                    ]
    let current_fs, next_fs; //fieldsets
    let opacity;
    let current = 1;
    let steps = $(".top-fieldset").length;
    
    setProgressBar(current);
    
    $(".next").click(function(){
    renderNextStep ();
    });
    
    $(".previous").click(function(){
    renderNextStep (true);
    });

    $("#startStepper").click(function(){
      $("#onboarding").hide();
      $("#onboardingCalc").show();
    })
    
    $(".submit").click(function(){
    return false;
    })

    function setProgressBar(curStep){
      let percent = parseFloat(100 / steps) * curStep;
      percent = percent.toFixed();
      $(".progress-bar")
      .css("width",percent+"%")
      }

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

      if (parts.length > 1) {
        subStepNumber = parts[1];
      }

      nextStep = isPrev ? subStepNumber ? parts[0] : 'step' + (+numberID - 1) 
      :
      'step' + (+numberID + 1);

      nextStepNumber = isPrev ? subStepNumber ? numberID : (+numberID - 1) 
      : (+numberID + 1);

      return [numberID, subStepNumber, nextStep, nextStepNumber];
    }

    const changeId = (id, index) => {
      return `${id}_${index + 1}`
    }

    const renderNextStep = ( isPrev = false ) => {
      current_fs = $('.formFieldset-wrapper__main-info .fieldset.active');
      let current_fs__id = current_fs.attr('id');
      let [ numberID, subStepNumber, nextStep, nextStepNumber ] = checkID(current_fs__id, isPrev);
      next_fs =  $(`#${nextStep}`);
      checkIsPreviousStep(nextStep);
      showNewStep(current_fs, next_fs);

      setHeaderTitle(nextStepNumber);

      addOptionToList('productVersion');
      addOptionToList('administrativePanel');
      
      addOptionToList('geolocationServices');
      addOptionToList('paymentsAndPurchasing');
      addOptionToList('calendar');


      if (subStepNumber) return;

      isPrev ? setProgressBar(--current) : setProgressBar(++current);
    }

    const showNewStep = (current_fs, next_fs ) => {
      current_fs.removeClass('active');
      next_fs.addClass('active');
      next_fs.show();

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
    }

    const setHeaderTitle = (number) => {
       return  $("#stepName").html(StepNames[number - 1]["title"])
    }

    $(".multiStep .checkbox__input").on("change", function(e) {
      
      if ($(this).is(":checked")) {
       let checkboxes = $(".add-checkbox");
       let index = checkboxes.index(this);
       let closestMultiStep = $(this).closest(".multiStep");
       let closestMultiStepID = closestMultiStep.attr('id');
       let newId = changeId(closestMultiStepID, index);
       let nextStep = $(`#${newId}`);

       let [ numberID ] = checkID(closestMultiStepID, false);
       $("#stepName").html(StepNames[numberID - 1]["subtitles"][index])
    showNewStep(closestMultiStep, nextStep);
      }
    });

     const addOptionToList = (name) => {
      $(`input[type='radio'][name=${name}]`).on("change", function() {
        // Находим выбранную радиокнопку среди радиокнопок с атрибутом name="industry"
        let selectedRadioButton = $(`input[type='radio'][name=${name}]:checked`);
        let selectedRadioButtonID = selectedRadioButton.attr('id');

        console.log('selectedRadioButtonID',selectedRadioButtonID)

        var selectedText = selectedRadioButton.val(); // Для текста
      
        // Удаляем остальные радиокнопки с атрибутом name="industry"
        $(`[data-input=${name}]`).remove();
      
        // Добавляем значение (или текст) в элемент с ID "selectedOptions"
  
        $("#selectedOptions").append(`<div class="fieldset__payment__tag" data-input=${name} id="${selectedRadioButtonID}Tag">${selectedText}</>`); // Для текста
      });

    }

     addOptionToList('industry');

     $("input[type='checkbox']").on("change", function() {
      let selectedCheckboxID = $(this).attr('id');
      var selectedText = $(this).val();
      if ($(this).is(":checked")) {

        $("#selectedOptions").append(`<div class="fieldset__payment__tag" id="${selectedCheckboxID}Tag">${selectedText}</>`); 
      } else {

        let newCon =  $(`#${selectedCheckboxID}Tag`)
        newCon.remove();
      }
          });
    
    })