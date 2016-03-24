(function(window, undefined){

  var channels = ["ungespielt", "kylelong75", "comster404", "LumpTV", "freecodecamp", "dreamleague", "gogcom"];

  function channelDetails(){

    // Loop through each user/channel
    channels.forEach(function(channel) {

      // Check the API for each user/channel
      function apiLink(type, name){
        return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?callback=?';
      }

      // Get the channel's status
      $.getJSON(apiLink('streams', channel), function(data){

        var game,
            status;

        // Determine channel's current status
        if(data.stream === null){
          game = "Offline";
          status = "offline";
        } else if (data.stream === undefined){
          game = "Account Closed";
          status = "account closed";
        } else if (typeof data.stream === 'object'){
          game = data.stream.game;
          status = "online";
        } else {
          game = "Offline";
          status = "offline";
        }

        // Tap into the channel's deets
        $.getJSON(apiLink('channels', channel), function(data){

          // Gather channel's details
          var logo = typeof data.logo === 'string' ? data.logo : "img/unknown.gif";
          var name = data.display_name === 'string' ? data.display_name : channel;
          var description = status === 'online' ? ': ' + data.status : "";
          var channelLink = data.url;

          // Put together the content
          var html = "<div>";

          html += "<img width='125' src='" + logo +  "'>";
          html += status + " ";

          if(status !== 'account closed'){
            html += "<a href='" + channelLink + "' target='_blank'>" + name + "</a>" + " ";
          } else {
            html += name + " ";
          }

          html += game + " " + description;
          html+=  "</div><hr>";

          // Display the content
          $("#channels-list").append(html);

        });

      });

    });

  }

  $(document).ready(function() {
    channelDetails();
  });

})(window);
