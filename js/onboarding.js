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
    
    $(".next.nextBtn").click(function(){
    renderNextStep ();
    });
    
    $(".previous").click(function(){
    renderNextStep (true);
    });

    $("#startStepper").click(function(){
      $("#onboarding").hide();
      $("#onboardingCalc").show();
    })
    
    $(".jumpBtn").click(function(){
      $('#onboardingCalc').hide() ; 
      $('#onboardingThankyou').show() ; 

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
      if (nextStep == "step9") {
        $('.nextBtn').hide(); 
        $('.jumpBtn').show(); 
      } 
      showNewStep(current_fs, next_fs, nextStepNumber);

      setHeaderTitle(nextStepNumber);
         
      if (subStepNumber) return;

      isPrev ? setProgressBar(--current) : setProgressBar(++current);
    }

    const showNewStep = (current_fs, next_fs, nextStepNumber ) => {
      current_fs.removeClass('active');
      next_fs.addClass('active');
      let next_fs_id = next_fs.attr('id');
      next_fs.show();

      let nxtStepRadio =  $(`#${next_fs_id} input[type='radio']:checked`);

      // if (nxtStepRadio.length) {
      //   let nxtStepRadioName =  $(`#${next_fs_id} input[type='radio']:checked`).attr("name");
 
      //   $(`[data-input=${nxtStepRadioName}]`).remove();

      //   renderNewOption(nxtStepRadio, nxtStepRadioName);
 
      //  addOptionToList(nxtStepRadioName);
      //  } else {

      //  }

      switch (nextStepNumber) {
    
        case 2 :
          addOptionToList('productVersion');
          break;
        case 6 : 
        addOptionToList('administrativePanel');
        break;
        case 9 : 
        addOptionToList('time');
        break;
      }

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

     const addOptionToList = (name) => {
      $(`input[type='radio'][name=${name}]`).on("change", function() {
        // Находим выбранную радиокнопку среди радиокнопок с атрибутом name="industry"
        let selectedRadioButton = $(`input[type='radio'][name=${name}]:checked`);
      
        // Удаляем остальные радиокнопки с атрибутом name="industry"
        $(`[data-input=${name}]`).remove();
      
        // Добавляем значение (или текст) в элемент с ID "selectedOptions"

        renderNewOption(selectedRadioButton, name)
      });

    }

    const renderNewOption = (el, name ) => {
      let elementId =  el.attr('id');
      let selectedText = el.val();
     return  $("#selectedOptions").append(`<div class="fieldset__payment__tag" data-input=${name ? name : selectedText} id="${elementId}Tag">${selectedText}</>`)
    }

     addOptionToList('industry');

     $("input[type='checkbox']").on("change", function() {
      let selectedCheckboxID = $(this).attr('id');
      if ($(this).is(":checked")) {
        renderNewOption($(this), $(this));
      } else {

        let newCon =  $(`#${selectedCheckboxID}Tag`)
        newCon.remove();
      }
    });

    $(".multiStep .checkbox__input").on("change", function(e) {
      
      if ($(this).is(":checked")) {
       let checkboxes = $(".add-checkbox");
       let index = checkboxes.index(this);
       let closestMultiStep = $(this).closest(".multiStep");
       let closestMultiStepID = closestMultiStep.attr('id');
       let newId = changeId(closestMultiStepID, index);
       let nextStep = $(`#${newId}`);

       let nxtStepRadio =  $(`#${newId} input[type='radio']:checked`);

      //  if (nxtStepRadio.length) {
      //   let nxtStepRadioName =  $(`#${newId} input[type='radio']:checked`).attr("name");
 
      //   $(`[data-input=${nxtStepRadioName}]`).remove();

      //   renderNewOption(nxtStepRadio, nxtStepRadioName);
 
      //  addOptionToList(nxtStepRadioName);
      //  } else {

      //  }




       let [ numberID ] = checkID(closestMultiStepID, false);
       $("#stepName").html(StepNames[numberID - 1]["subtitles"][index])
    showNewStep(closestMultiStep, nextStep);
      }
    });

    //change state of checkbox

const changeCheckbox = () => {

  let checkInput = document.querySelectorAll('.checkmark');
  if (checkInput) {
    checkInput = [...checkInput]
    checkInput.forEach((el) => {
      el.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();

        let isChecked = el.closest('.checkbox-container').querySelector('.checkbox-input');
        let labelChecked = el.closest('.checkbox-container').querySelector('.checkbox');
        isChecked.removeAttribute("checked");
        console.log(isChecked)
        isChecked.checked = !isChecked.checked;
        labelChecked.classList.toggle("checkbox-checked");
      })
    })
  }
}

changeCheckbox();

let projectTeam = new Swiper('.caseSwiperTeamOnboard', {
  spaceBetween: 10,
  slidesPerView: 1,
  infinite: true,
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,

  },
  breakpoints: {

    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 32,
    },
  },
  on: {
    init: function (slider) {
      document.querySelector('.caseSwiperTeamOnboard').style.opacity = 1;

    },
  },
});

    
    })

