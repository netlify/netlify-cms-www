// Sticky Nav Functionality in Vanilla JS

var header = $("#header");

if ($('.landing.page, .community.page').length) {
  window.onscroll = function() {

    var currentWindowPos = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentWindowPos > 0) {
      header.addClass('scrolled');
    } else {
      header.removeClass('scrolled');
    }
  };
}

// Auto Indexing Docs Nav

var indexDocsSubsections = function() {
  if ($('.docs.page').length) {

    if ($('#docs-content h2').length > 1) {
      $('<ul class="nav-subsections" id="nav-subsections"></ul>').insertAfter($('#docs-nav .nav-link.active'));

      $('#docs-content h2').each(function() {
        var sectionTitle = $(this).html(),
          anchor     = $(this).attr("id");

        $('#nav-subsections').append('<li><a class="subnav-link for-' + anchor + '" href="#' + anchor + '">' + sectionTitle + '</a></li>');

      });

      $.localScroll({
        offset: -120,
        duration:200,
        hash:true
      });
    }

    $(window).on('scroll', function(){
      window.requestAnimationFrame(scrollHandler);

      function scrollHandler() {
        var scrollTop      = $(window).scrollTop(),
          windowHeight   = $(window).height(),
          first        = false,
          allSubnavLinks = $("#docs-nav .subnav-link");

        $("#docs-content h2").each( function() {
          var offset   = $(this).offset(),
            thisLink = '.for-' + $(this).attr("id");

          if (scrollTop <= offset.top && ($(this).height() + offset.top) < (scrollTop + windowHeight) && first == false) {
            allSubnavLinks.removeClass('active');
            $(thisLink).addClass('active');
            first=true;
          } else {
            first=false;
          }
        });
      }
    });
  }
}

indexDocsSubsections();

var docsMobileMenu = function() {
  if ($('.docs.page').length) {

    $("#mobile-docs-nav").change(function() {
      window.location = $(this).find("option:selected").val();
    });
  }
}

docsMobileMenu();

// search
$('#search-button').click(function() {
  console.log("clicked")
  $('.search-icon').toggleClass('active');
  $('.algolia-search').toggleClass('closed');
});


// eventbrite info
var eventInfoLoad = function() {
  if ($('.community.page').length) {
    var eventRequest = new XMLHttpRequest;
    var eventbriteToken = 'C5PX65CJBVIXWWLNFKLO';
    var eventbriteOrganiser = '14281996019';
    eventRequest.open('GET', 'https://www.eventbriteapi.com/v3/events/search/?token=' + eventbriteToken + '&organizer.id=' + eventbriteOrganiser + '&expand=venue%27', true);

    eventRequest.onload = function() {
      if (eventRequest.status >= 200 && eventRequest.status < 400) {
        // Success!
        var data = JSON.parse(eventRequest.responseText);
        var upcomingDate = data.events[0].start.utc;
        updateDate(upcomingDate);
      } else {
        var upcomingDate = "0000-00-00T00:00:00Z";
        updateDate(upcomingDate);
      }

    };

    eventRequest.onerror = function() {
       alert('The event info could not be loaded at this time, please try again later.');
    };

    function updateDate(eventDate) {
      $('.month').append(moment(eventDate).format('MMMM'));
      $('.day').append(moment(eventDate).format('DD'));
      $('.calendar-cta h2 strong:first-child()').append(moment(eventDate).format('dddd, MMMM Do'));
      $('.calendar-cta h2 strong:last-child()').append(moment(eventDate).utcOffset(-7).format('h a'));
    }

    eventRequest.send();
  }
}

eventInfoLoad();