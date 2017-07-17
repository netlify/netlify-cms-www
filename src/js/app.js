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


