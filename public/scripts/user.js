$(document).ready(function() {
  const $filterBtns = $(".quiz-filter button");
  let currentFilter = '_quizzes';

  $(".quiz-filter button").click(function(e) {
    count = 0;
    const $button = $(this);
    currentFilter = $button.attr("name");
    $.ajax({
      method: "GET",
      url: `/api/partial/${currentFilter}`,
    })
      .then(res => {
        $("#container").empty();
        $("#container").append(res)

        $filterBtns.each(function() {
          if($(this).hasClass("btn-primary")) {
            $(this).removeClass("btn-primary").addClass("btn-outline-primary");
          }
        });

        $button.removeClass("btn-outline-primary").addClass("btn-primary");
      });
  });

  let count = 0;
  const offset = 12;
  const pageLimit = 10;
  const buffer = 50;

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - buffer) {
      count++;
      const currentOffset = offset * count;
      if (currentOffset > offset * pageLimit) return;
      $.ajax({
        method: "GET",
        url: `/api/partial/${currentFilter}`,
        data: { offset: currentOffset }
      }).then((res) => {
        const $res = $(res).wrap('<div />').parent();
        $res.find('h2').remove();
        $("#container").append($res)
      });
    }
 });
});