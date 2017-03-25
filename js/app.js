(function(window, undefined){

  var channels = ["NateKh2", "TwitchPresents", "Twitch", "Bacon_Space", "BaconHawkJS"];

  function channelDetails(){

    // Loop through each user/channel
    channels.forEach(function(channel) {

      // Check the API for each user/channel
      function apiLink(type, name){
        return 'https://api.twitch.tv/kraken/' + type + '/' + name + '?client_id=ba5m54krq9n07wh8ra7ee5lb53vxaag';
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
          status = "offline";
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

          // Build the channel list content
          var html = "<li class='" + status + "'>";

          html+= "<div class='channel-wrap'>";
          html += "<img width='75' src='" + logo +  "'>";

          if(status !== 'account closed'){
            html += "<span class='status'>" + status + "</span>";
            html += "<a class='user-name' href='" + channelLink + "' target='_blank'>" + name + "</a>" + " ";
          } else {
            html += name + " ";
          }

          html+= "</div><!-- .channel-wrap -->";

          if(status === 'online'){
            html += "<a class='channel-name' href='" + channelLink + "' target='_blank' data-tooltip='" + description +"'>Channel: " + game +  "</a>";
          } else {
            html += "<a class='channel-name' href='" + channelLink + "' target='_blank'>Channel: " + game +  "</a>";
          }

          html+=  "</li>";

          // Display the content
          $("#channels-list").append(html);

        });

      });

    });

  }

  $(document).ready(function() {

    // List the channels
    channelDetails();

    /*
     *  Here we're setting up the filters
     */

    // Get the channel types as arrays
    var onlineChannels = document.getElementsByClassName('online');
    var offlineChannels = document.getElementsByClassName('offline');

    // Clicking 'online' removes all 'offline' channels
    document.getElementById('online-sort').addEventListener('click', function(){

      document.getElementById('display-all').className = '';
      document.getElementById('offline-sort').className = '';
      document.getElementById('online-sort').className = 'active';

      for(var j = 0; j < offlineChannels.length; j++){
        offlineChannels[j].classList.add('filtered');
      }
      for(var i = 0; i < onlineChannels.length; i++){
        onlineChannels[i].classList.remove('filtered');
      }
    });

    // Clicking 'offline' removes all 'online' channels
    document.getElementById('offline-sort').addEventListener('click', function(){

      document.getElementById('display-all').className = '';
      document.getElementById('offline-sort').className = 'active';
      document.getElementById('online-sort').className = '';

      for(var j = 0; j < onlineChannels.length; j++){
        onlineChannels[j].classList.add('filtered');
      }
      for(var i = 0; i < offlineChannels.length; i++){
        offlineChannels[i].classList.remove('filtered');
      }
    });

    // Clicking 'all' displays all channels
    document.getElementById('display-all').addEventListener('click', function(){

      document.getElementById('display-all').className = 'active';
      document.getElementById('offline-sort').className = '';
      document.getElementById('online-sort').className = '';

      for(var j = 0; j < onlineChannels.length; j++){
        onlineChannels[j].classList.remove('filtered');
      }
      for(var i = 0; i < offlineChannels.length; i++){
        offlineChannels[i].classList.remove('filtered');
      }
    });

  });

})(window);
