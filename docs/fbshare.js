var game_url;
var game_message;
var loggedIn = false;
var uid;
window.fbAsyncInit = function() {
  FB.init({
    appId: '235211213653145',
    autoLogAppEvents : true,
    xfbml            : true,
    status           : true,
    version          : 'v2.12'
  });

  FB.AppEvents.logPageView();

  FB.getLoginStatus(function(response) {
    console.log(response);
    if (response.status === 'connected') {
      uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;
      // shareOnFb(uid, game_ref);
      //shareTest();
      loggedIn = true;
    } else {
      loggedIn = false;
    }
  });

  window.addEventListener('ShareClicked', function(e) {
    game_url = e.detail[0];
    game_message = e.detail[1];
    game_ref = e.detail[2];

    if(loggedIn) {
      //shareOnFb(uid, game_ref);
      shareTest();
    } else {
      FB.login(function(response) {
        if(response.authResponse) {
          uid = response.authResponse.userID;
          //shareOnFb(uid, game_ref); //so publish_actions
          shareTest();
        } else {
          console.log("Not logged in!");
        }
      }, {scope: 'publish_actions'});
    }

  })
  window.addEventListener('ShopShareClicked', function(e) {
    game_url = e.detail[0];
    game_message = e.detail[1];
    game_ref = e.detail[2];

    if(loggedIn) {
      //shareShopOnFb(uid, game_ref);
      shareShopTest(game_ref);
    } else {
      FB.login(function(response) {
        if(response.authResponse) {
          uid = response.authResponse.userID;
          //shareShopOnFb(uid, game_ref); //so publish_actions
          shareShopTest(game_ref);
        } else {
          //console.log("Not logged in!");
          //alert('not logged in');
        }
      }, {scope: 'publish_actions'});
    }

  })
};

// function shareShopOnFb(uid, game_ref) {
//   FB.api(
//     // "/" + uid + "/feed",
//     "/me/feed",
//     "POST",
//     {
//       "link": game_url,
//       "message": game_message
//     },
//     function(response) {
//       console.log(response);
//       if(response && response.id) {
//         //alert(response.id);
//         var shareSuccess = new CustomEvent('ShopShareSuccess', {'detail':[game_ref]});
//         window.dispatchEvent(shareSuccess);
//       }
//       else if(response.error){
//         FB.api(
//           '/me/permissions',
//           function (response) {
//             console.log(response);
//             //alert(response.error);
// 					  for(var i = 0; i < response.data.length; i++) {
//               if(response.data[i].permission === 'publish_actions' && response.data[i].status === 'declined') {
//                 FB.login(function(response) {
//
//                   var uid = response.authResponse.userID;
//                   FB.api(
//                     "/" + uid + "/feed",
//                     "POST",
//                     {
//                       "link": game_url,
//                       "message": game_message
//                     },
//                     function(response) {
//                       console.log(response);
//                       if(response && response.id) {
//                         var shareSuccess = new CustomEvent('ShopShareSuccess', {'detail':[game_ref]});
//                         window.dispatchEvent(shareSuccess);
//                       }
//                     }
//                   );
//
//                   console.log(response);
//                 }, {scope: 'publish_actions', auth_type: 'rerequest'});
// 						  }
// 				    }
// 			    }
//         );
//       }
//     }
//
//   );
// }


// function shareOnFb(uid, game_ref) {
//   FB.api(
//     // "/" + uid + "/feed",
//     "/me/feed",
//     "POST",
//     {
//       "link": game_url,
//       "message": game_message
//     },
//     function(response) {
//       console.log(response);
//       if(response && response.id) {
//         var shareSuccess = new CustomEvent('ShareSuccess', {'detail':[game_ref]});
//         window.dispatchEvent(shareSuccess);
//       }
//       else if(response.error){
//         FB.api(
//           '/me/permissions',
//           function (response) {
//             console.log(response);
// 					  for(var i = 0; i < response.data.length; i++) {
//               if(response.data[i].permission === 'publish_actions' && response.data[i].status === 'declined') {
//                 FB.login(function(response) {
//
//                   var uid = response.authResponse.userID;
//                   FB.api(
//                     "/" + uid + "/feed",
//                     "POST",
//                     {
//                       "link": game_url,
//                       "message": game_message
//                     },
//                     function(response) {
//                       console.log(response);
//                       if(response && response.id) {
//                         var shareSuccess = new CustomEvent('ShareSuccess', {'detail':[game_ref]});
//                         window.dispatchEvent(shareSuccess);
//                       }
//                     }
//                   );
//
//                   console.log(response);
//                 }, {scope: 'publish_actions', auth_type: 'rerequest'});
// 						  }
// 				    }
// 			    }
//         );
//       }
//     }
//
//   );
// }



// function shareOnFb(uid) {
//   FB.api(
//     "/" + uid + "/feed",
//     "POST",
//     {
//       "link": game_url,
//       "message": game_message
//     },
//     function(response) {
//       console.log(response);
//       if(response && response.id) {
//         var shareSuccess = new Event('ShareSuccess');
//         window.dispatchEvent(shareSuccess);
//       }
//     }
//   );
// }

//share dialog
function shareTest() {
  FB.ui({
    method: 'share',
    href: game_url,
    quote: game_message
  }, function(response){
    console.log(response);
    //if(response && response.post_id) {
    if(response && response.error_code != 4201){ //error code: 4201 if share dialog canceled
      var shareSuccess = new CustomEvent('ShareSuccess', {'detail':[game_ref]});
      window.dispatchEvent(shareSuccess);
    }
  });
}

//share direct
function shareShopTest(game_ref) {
  FB.ui({
    method: 'share',
    href: game_url,
    quote: game_message
  }, function(response){
    console.log(response);
    //if(response && response.post_id) {
    if(response && response.error_code != 4201){ //error code: 4201 if share dialog canceled
      var shareSuccess = new CustomEvent('ShopShareSuccess', {'detail':[game_ref]});
      window.dispatchEvent(shareSuccess);
    }
  });
}

(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
