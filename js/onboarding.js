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

  let counterActiveImg = 0;
  let counterActiveArrow = 0;

  setProgressBar(current);

  $(".next.nextBtn").click(function(){
  
    renderNextStep ();
    // 
    // showNewStep(current_fs,next_fs,);
    // setProgressBar(++current);
    // let closestPrevFieldset = current_fs.prev('.fieldset.top-fieldset');
  });

  $(".previous").click(function(){
      renderNextStep ( true);
  }); 
  $("#startStepper").click(function(){
      $("#onboarding").hide();
      $("#onboardingCalc").show();
      $("body").css("padding","0 calc(20px - (100vw - 100%)) 0 0");
  })

  $(".jumpBtn").click(function(){
    $('#onboardingCalc').hide() ; 
    $('#onboardingThankyou').show();
    $("body").css("padding","0");   
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

  const changeId = (id, index) => {
      return `${id}_${index + 1}`
  }
  const renderNextStep = (isPrev = false) => {
  current_fs = $('.formFieldset-wrapper__main-info .fieldset.top-fieldset.active');

  if (isPrev) {
    current_fs.prevAll().each(function() {
      if ($(this).hasClass('fieldset') && $(this).hasClass('top-fieldset')) {
        next_fs = $(this);
        return false;
      }
    });

    if (!next_fs) {
      current_fs.nextAll().each(function() {
        if ($(this).hasClass('fieldset') && $(this).hasClass('top-fieldset')) {
          next_fs = $(this);
          return false;
        }
      });
    }
  } else {
    next_fs = current_fs.nextAll('.fieldset.top-fieldset').first();
  }

  let nextStepId = next_fs.attr('id');
  checkIsPreviousStep(nextStepId);

  if ($(`#${nextStepId} input[type='radio']:checked`).length) {
    let checkedRadio = $(`#${nextStepId} input[type='radio']:checked`);
    let checkedRadioId = checkedRadio.attr('id');
    let checkedRadioName = checkedRadio.attr('name');
    !$(`#selectedOptions #${checkedRadioId}Tag`).length &&   renderNewOption(checkedRadio, checkedRadioName);
  }
  if (nextStepId == "step9") {
    $('.nextBtn').hide(); 
    $('.jumpBtn').show(); 
  } else {
    $('.nextBtn').show(); 
    $('.jumpBtn').hide(); 
  }
  showNewStep(current_fs, next_fs);
  // // setHeaderTitle(nextStepNumber);

  isPrev ? setProgressBar(--current) : setProgressBar(++current);
  }
  const showNewStep = (current_fs, next_fs, nextStepNumber ) => {
  current_fs.removeClass('active');
  next_fs.addClass('active');
  let next_fs_id = next_fs.attr('id');

  next_fs.show();
  let nxtStepRadio =  $(`#${next_fs_id} input[type='radio']:checked`);

  switch (next_fs_id) {
    
        case "step2" :
          addOptionToList('productVersion');
          break;
        case "step6" : 
        addOptionToList('administrativePanel');
        break;
        case "step9" : 
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
        let id = selectedRadioButton.attr("id");
    
        $(`[data-input=${name}]`).remove();

        renderNewOption(selectedRadioButton, name)

        if (id.indexOf("other") !== -1) {
          selectedRadioButton.closest('.fieldset').find('.addition-input').show();
        } else {
          selectedRadioButton.closest('.fieldset').find('.addition-input').hide();
        }

          // Apply blur effect
          const movingBox  = document.getElementById('summImg');
            movingBox.innerHTML = shuffleWord(movingBox.innerText);
      });

  }

  const shuffleWord = (word) => {
    // Преобразовать слово в массив символов
    var characters = word.split('');
  
    // Перемешать символы в массиве
    for (var i = characters.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = characters[i];
      characters[i] = characters[j];
      characters[j] = temp;
    }
  
    // Объединить перемешанные символы обратно в слово
    var shuffledWord = characters.join('');
    return shuffledWord;
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
        if (selectedCheckboxID.indexOf("other") !== -1) {
          $(this).closest('.fieldset').find('.addition-input').show();
        }
        renderNewOption($(this), $(this));

      } else {
        if (selectedCheckboxID.indexOf("other") !== -1) {
          $(this).closest('.fieldset').find('.addition-input').hide();
        }
        let newCon =  $(`#${selectedCheckboxID}Tag`)
        newCon.remove();
      }
       // Apply blur effect
       const movingBox  = document.getElementById('summImg');
       movingBox.innerHTML = shuffleWord(movingBox.innerText);
  });
  $(".multiStep .checkbox__input").on("change", function(e) {
      
      if ($(this).is(":checked")) {
       let checkboxes = $(".add-checkbox");
       let index = checkboxes.index(this);
       let closestMultiStep = $(this).closest(".multiStep");
       let closestMultiStepID = closestMultiStep.attr('id');
       let newId = changeId(closestMultiStepID, index);

       console.log($(`${newId}`))
       $(`#${newId}`).addClass('top-fieldset');
       steps++;
       setProgressBar(curStep);

       } else {
        $(`#${newId}`).removeClass('top-fieldset');
        steps--;
        setProgressBar(curStep)
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
 
function toggleActiveClass() {
  var bgCasesImgs = $(".bg-cases-img");
  var showArrows = $(".show-arrow");

  bgCasesImgs.removeClass("active");
  showArrows.removeClass("active");

  bgCasesImgs.eq(counter).addClass("active");
  showArrows.eq(counter).addClass("active");

  counter = (counter + 1) % bgCasesImgs.length;
}

var counter = 0;

setInterval(toggleActiveClass, 1400);



    })

