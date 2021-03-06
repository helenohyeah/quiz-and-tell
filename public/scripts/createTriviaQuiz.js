$(() => {
  // Question count: Starts at 1 since we already have 1 question in viewport at start
  let count = 1;

  // Display trivia template
  if (document.location.pathname == "/quiz/create/trivia") {
    $('#newTriviaForm').slideDown(600);
  }

  const addTriviaQuestion = () => {
    count++;
    return `
    <div class='newQuestion'>
      <div class='question'>
        <label>Question:</label>
        <input type='text' name='question${count}' required='required' autocomplete='off'>
        <button type="button" class="deleteQuestion btn btn-outline-danger" id='deleteQuestion${count}'>X</button>
      </div>
      <h3>Answers:</h3>
      <div class='answers' data-toggle="buttons">
        <div class='singleLine'>
          <label>A)</label>
          <input type='text' name='a${count}' required='required' autocomplete='off'>
          <label class='check btn btn-outline-success'>
            <input type='radio' class='correct' name='correct${count}' autocomplete='off' required='required' value='1'><i class="gg-check"></i>
          </label>
        </div>
        <div class='singleLine'>
          <label>B)</label>
          <input type='text' name='b${count}' required='required' autocomplete='off'>
          <label class='check btn btn-outline-success'>
            <input type='radio' class='correct' name='correct${count}' value='2'><i class="gg-check"></i>
           </label>
        </div>
        <div class='singleLine'>
          <label>C)</label>
          <input type='text' name='c${count}' required='required' autocomplete='off'>
          <label class='check btn btn-outline-success'>
            <input type='radio' class='correct' name='correct${count}' value='3'><i class="gg-check"></i>
          </label>
        </div>
        <div class='singleLine'>
          <label>D)</label>
          <input type='text' name='d${count}' required='required' autocomplete='off'>
          <label class='check btn btn-outline-success'>
            <input type='radio' class='correct' name='correct${count}' value='4'><i class="gg-check"></i>
          </label>
        </div>
      </div>
    </div>
    `;
  };

  // Hide previous question container and replace with a new one
  $('#addNewQuestion').on('click', function() {
    $('.newQuestion').css({display: 'none'});
    const question = addTriviaQuestion();
    $('.newQuizContainer').append(question);
    $('.newQuestion').animate({width:'0px', opacity: '0'}, 'slow');
    $('.newQuestion').animate({width:'70vw', opacity: '1'}, 'slow');
    $('#count').val(count);
  });

  // Show all previously hidden questions to review
  $('#reviewQuiz').on('click', function() {
    $('.newQuestion').slideDown(800);
    $('#createQuizButton').css({display:'block'});
    $('html, body').animate({scrollTop:0}, 1200);
    const category = $('#triviaSelect').find(":selected").text();
    $('#tCategoryInput').val(category);
    $('.deleteQuestion').css({visibility: 'visible'});
    // Once review button is clicked and we know the number of questions, activate each delete button
    for (let i = 1; i <= count; i++) {
      $(`#deleteQuestion${i}`).on('click', function() {
        $(this).parent().parent().animate({width: '0px', opacity: '0'}, 'slow')
        $(this).parent().parent().slideUp(600, function() {
          $(this).remove();
        })
      });
    }
  });

  // Show image as soon as user inputs a URL
  $('.thumbnail').on('input', function() {
    $('.quizPhoto').attr('src', $(this).val());
  })

  // Select the entire input field on click
  $('.thumbnail').on('click', function() {
    $(this).select();
  })

});
