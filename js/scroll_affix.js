  $(function () {
        $.scrollUp({
          scrollDistance: 300, // Distance from top/bottom before showing element (px)
          zIndex: 2147483647 // Z-Index for the overlay
          });
        $('.destroy').click(function(){
          $.scrollUp.destroy();
          });
        $('#sidebar').affix({
          offset: {
          top: 500,
          bottom: 50
          }
          }); 
        $('#countdown').timeTo({
          timeTo: new Date(new Date('Wed May 7 2014 10:59:00 GMT+0300')),
          countdownAlertLimit:60,
          displayDays: 2,
          //theme: "black",
          displayCaptions: true,
          });
      });