$(function() {
  // Menu
  $(".menu_btn").click(function() {
    $(".menu_btn").children('.ph-bold').toggleClass('ph-list').toggleClass('ph-x');
    $(".menu").slideToggle();
  });

  // Header sticky
  $(window).scroll(function() {
    var scrollPosition = $(window).scrollTop();
    if (scrollPosition > 40) {
      $("header").addClass("fixed");
    } else {
      $("header").removeClass("fixed");
    }
  });
  // Custom background image
  $('.bg_img').each(function(index, el) {
    var imageURL = $(el).attr('data-src');
    $(el).css('backgroundImage', `url('${imageURL}')`);
  });

  // Booknow form
  $('.select2').select2();

  // Appointment form
  /*const modalHTML = `<div class="modal fade" id="appointment_modal">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body">
          <i class="ph-fill ph-check-circle"></i>
          <h5>Appointment Booked!</h5>
          <p>Thank you. Your appointment has been confirmed.</p>
          <button class="btn" data-bs-dismiss="modal">
            <span>Continue</span>
          </button>
        </div>
      </div>
    </div>
  </div>`;

  $('.appointment_layout').submit(function(e) {
    e.preventDefault();
    $('body').prepend(modalHTML);
    $('#appointment_modal').modal('show');
  });*/

  // Calendar

  var availableTimesPerDate = [{
      "date": "2024-01-15",
      "timings": [
        "09:00 AM",
        "10:00 AM",
        "11:00 AM",
        "12:00 AM",
      ]
    },
    {
      "date": "2024-01-17",
      "timings": [
        "10:00 AM",
        "01:00 PM",
        "03:00 PM",
        "04:00 PM",
        "05:00 PM",
        "06:00 PM",
        "07:00 PM",
        "08:00 PM"
      ]
    },
    {
      "date": "2024-01-18",
      "timings": [
        "11:00 AM",
        "02:00 PM",
        "03:00 PM"
      ]
    }
  ];

  const currentDateFunc = () => {
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    var day = ('0' + currentDate.getDate()).slice(-2);
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
  }

  const selectDate = (selectedDate) => {
    const times = availableTimesPerDate.find(date => date.date === selectedDate);
    const appointmentTimeContainer = $('.appointment_time');

    if (times && times.timings) {
      appointmentTimeContainer.empty();
      $(times.timings).each(function(index, el) {
        appointmentTimeContainer.append(`<button type="button" class="time">${el}</button>`);
      });
    } else {
      appointmentTimeContainer.html(`<p>No available times for selected date</p>`);
    }
  };
  // selectDate(currentDateFunc());

  var calenderInput = $('input[type="hidden"]').val();
  if (calenderInput === "calendar") {
    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      selectable: true,
      dateClick: function(info) {
        // selectDate(info.dateStr);
      }
    });
    calendar.render();
  }

  // gallery js


  $('.gallery_item').each(function(index, el) {
    var galleryImg = $(el).data('img');
    var galleryTitle = $(el).data('title');
    var galleryHTML = `<figure class="gallery_img"><img src="${galleryImg}" alt=""></figure><div class="gallery_content"><h3 class="gallery_title">${galleryTitle}</h3></div>`;
    $(el).append(galleryHTML);
  });

  var galleryModal = `<div class="gallery_modal">
  <div class="gallery_modal_wrapper">
    <div class="gallery_modal_header">
      <h3 class="gallery_modal_title"></h3>
      <button class="gallery_modal_close">
        <i class="ph-bold ph-x"></i>
      </button>
    </div>
    <figure class="gallery_modal_img">
      <img src="" alt="">
    </figure>
  </div>
</div>`;

  $('.gallery_grid').after(galleryModal);

  $('.gallery_item, .gallery_modal_close').click(function(event) {
    var $modal = $('.gallery_modal');
    var $clickedItem = $(this);

    if ($clickedItem.hasClass('gallery_item')) {
      var imgSrc = $clickedItem.find('img').attr('src');
      var title = $clickedItem.find('.gallery_title').text();

      $modal.find('.gallery_modal_img img').attr('src', imgSrc);
      $modal.find('.gallery_modal_title').text(title);
    }

    $modal.toggleClass('open');
  });
});