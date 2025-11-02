window.addEventListener('DOMContentLoaded', function (event) {
  console.log('DOM fully loaded and parsed');
  $(document).ready(function () {
    var $slider = $('.carousel__inner');
    var $currentPage = $('.current-page');
    var $totalPages = $('.total-pages');
    
    $slider.slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      dots: false,
      arrows: true,
      swipeToSlide: true,
      waitForAnimate: false,
      autoplay: false,
      responsive: [
        {
          breakpoint: 850,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 650,
          settings: {
            slidesToShow: 1,
          },
        }
      ],
    });

    // Упрощенная логика пейджера
    function updatePager() {
      var slick = $slider.slick('getSlick');
      var originalSlides = 8; // Фиксированное количество - 8 изображений
      var slidesToShow = slick.options.slidesToShow;
      
      var totalPages = Math.ceil(originalSlides / slidesToShow);
      $totalPages.text(totalPages);
      
      // Получаем текущий слайд и корректируем для бесконечного режима
      var currentSlide = slick.currentSlide;
      var adjustedSlide = currentSlide % originalSlides;
      if (adjustedSlide < 0) adjustedSlide = originalSlides + adjustedSlide;
      
      var currentPage = Math.floor(adjustedSlide / slidesToShow) + 1;
      $currentPage.text(currentPage);
    }

    $slider.on('afterChange', function(event, slick, currentSlide){
      updatePager();
    });

    $(window).on('resize', function(){
      setTimeout(updatePager, 100);
    });

    // Инициализация
    setTimeout(updatePager, 100);
  });
});