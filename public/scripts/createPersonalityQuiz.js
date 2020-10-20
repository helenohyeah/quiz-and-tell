$(() => {
  // Outcome count: Starts at 1 since we already have 1 outcome in viewport at start
  let outcomeCount = 1;
  // Question count: Starts at 0 since there is nothing in the viewport to start
  let questionCount = 0;
  // Options array for iterating through answer id's
  const options = ['a', 'b', 'c', 'd'];
  // Array for storing all given outcomes
  let outcomes = [];

  const addOutcome = () => {
    outcomeCount++;
    return `
    <div class='outcomes'>
      <label>Outcome ${outcomeCount} Title:</label>
      <input type='text' id='outcome${outcomeCount}' class='outcome' name='outcome${outcomeCount}' required='required'>
      <label>Photo URL:</label>
      <input type='url' id='photo${outcomeCount}' name='photo${outcomeCount}' required='required'>
      <label>Description:</label>
      <input type='text' name='description${outcomeCount}'>
    </div>
    `;
  };

  const addPersonalityQuestion = () => {
    questionCount++;
    return `
    <div class='newPersonalityQuestion'>
      <div>
        <h2>Question ${questionCount}:</h2>
        <button type="button" class="deleteQuestion btn btn-outline-danger" id='deleteQ${questionCount}'>X</button>
      </div>
      <div class='question'>
        <input type='text' name='question${questionCount}' required='required'>
      </div>
      <h3>Answers:</h3>
      <div class='answers' data-toggle="buttons">
        <div class='singleLine'>
          <label>A)</label>
          <input type='text' name='a${questionCount}' required='required'>
          <input type='hidden' id='pointer' name='category'>
          <select class='selectedOutcome' name='a${questionCount}_pointer' id='a${questionCount}_selectedOutcome'></select>
        </div>
        <div class='singleLine'>
          <label>B)</label>
          <input type='text' name='b${questionCount}' required='required'>
          <input type='hidden' id='pointer' name='category'>
          <select class='selectedOutcome' name='b${questionCount}_pointer' id='b${questionCount}_selectedOutcome'></select>
        </div>
        <div class='singleLine'>
          <label>C)</label>
          <input type='text' name='c${questionCount}' required='required'>
          <input type='hidden' id='pointer' name='category'>
          <select class='selectedOutcome' name='c${questionCount}_pointer' id='c${questionCount}_selectedOutcome'></select>
        </div>
        <div class='singleLine'>
          <label>D)</label>
          <input type='text' name='d${questionCount}' required='required'>
          <input type='hidden' id='pointer' name='category'>
          <select class='selectedOutcome name='d${questionCount}_pointer' id='d${questionCount}_selectedOutcome'></select>
        </div>
      </div>
    </div>
    `;
  };

  const outcomeDropdown = outcomes => {
    for (let outcome of outcomes) {
      $('.selectedOutcome').append(`<option class='pointer' required='required'>${outcome}</option>`);
    }
  };

  $('#selectPersonality').on('click', function() {
    $('#newPersonalityForm').slideDown(800);
    $('.quizType').css({display: 'none'});
    outcomes = [];
  })

  $('#addOutcome').on('click', function() {
    $('.outcomes').css({display: 'none'});
    const outcome = addOutcome();
    $('.newQuizContainer').append(outcome);
    $('#outcomeCount').val(outcomeCount);
  });

  $('#submitOutcomes').on('click', function() {
    $('.outcomes').css({display: 'none'});
    $('.newPersonalityQuestion').slideDown(800);
    let serialized = $('#newPersonalityForm').serialize()
    let list = serialized.split('outcome');

    for (string of list) {
      if (Number.isInteger(Number(string[0]))) {
        let newString = string.substring(2);
        let trimmed = newString.split('&');
        outcomes.push(trimmed[0]);
      }
    }
    const question = addPersonalityQuestion();
    $('.newQuizContainer').append(question);
    outcomeDropdown(outcomes);
  });

  $('#addPersonalityQuestion').on('click', function() {
    $('.newPersonalityQuestion').css({display: 'none'});
    const question = addPersonalityQuestion();
    $('.newQuizContainer').append(question);
    outcomeDropdown(outcomes);
    $('#questionCount').val(questionCount);
  });

  $('#reviewPersonalityQuiz').on('click', function() {
    $('.outcomes').slideDown(800);
    $('.newPersonalityquestion').slideDown(800);
    $('#createQuizButton').css({visibility: 'visible'});
    $('html, body').animate({scrollTop:200}, 2000);
    const category = $('#personalityCategory').find(":selected").text();
    $('.categoryInput').val(category);
    $('.deleteQuestion').css({visibility: 'visible'});
    // Check which outcome each answer is pointing to
    // for (let i = 1; i <= count; i++) {
    //   for (let letter of options) {
    //     const pointer = $(`${letter}${questionCount}_pointer`).find(":selected").text();
    //     $('#categoryInput').val(category);
    //   }
    // }
    // Once review button is clicked and we know the number of questions, activate each delete button
    for (let i = 1; i <= count; i++) {
      $(`#deleteQuestion${i}`).on('click', function() {
        $(`#deleteQuestion${i}`).parent().parent().remove();
      });
    }
  });

});
