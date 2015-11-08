var myApp = angular.module('myApp', ['spotify', 'firebase']);

var myCtrl = myApp.controller('myCtrl', function($scope, $http, $firebaseAuth, $firebaseObject, $firebaseArray,  Spotify) {
    //initialize firebase
    var ref = new Firebase("https://showfinder.firebaseio.com");
    var usersRef = ref.child('users');

    //make users firebaseObject and firebaseAuth available to scope
    $scope.users = $firebaseObject(usersRef);
    $scope.authObj = $firebaseAuth(ref);

    //initialize auth, fetch user
    var authData = $scope.authObj.$getAuth();
    if (authData) {
        var user = usersRef.child(authData.uid);
        $scope.user = $firebaseObject(user);
    }

    $.ajax({

        // The 'type' property sets the HTTP method.
        // A value of 'PUT' or 'DELETE' will trigger a preflight request.
        type: 'GET',

        // The URL to make the request to.
        url: 'http://api.bandsintown.com/artists/Skrillex/events.json?app_id=SHOW_FIND',

        // The 'contentType' property sets the 'Content-Type' header.
        // The JQuery default for this property is
        // 'application/x-www-form-urlencoded; charset=UTF-8', which does not trigger
        // a preflight. If you set this value to anything other than
        // application/x-www-form-urlencoded, multipart/form-data, or text/plain,
        // you will trigger a preflight request.
        contentType: 'text/plain',

        xhrFields: {
            // The 'xhrFields' property sets additional fields on the XMLHttpRequest.
            // This can be used to set the 'withCredentials' property.
            // Set the value to 'true' if you'd like to pass cookies to the server.
            // If this is enabled, your server must respond with the header
            // 'Access-Control-Allow-Credentials: true'.
            withCredentials: false
        },

        headers: {
            //'Access-Control-Allow-Origin'
            // Set any custom headers here.
            // If you set any non-simple headers, your server must include these
            // headers in the 'Access-Control-Allow-Headers' response header.
        },

        success: function(response) {
            // Here's where you handle a successful response.
            console.log(response);
        },

        error: function() {
            // Here's where you handle an error response.
            // Note that if the error was due to a CORS issue,
            // this function will still fire, but there won't be any additional
            // information about the error.
        }
    });





    /*$http({
        method: 'GET',
        url: 'http://api.bandsintown.com/artists/Skrillex/events.json?app_id=SHOW_FIND',
        datatype: 'jsonp'
    }).then(function successCallBack(response) {
        console.log(response);
    }, function errorCallback(response) {

    });*/

    Spotify.getAlbumTracks('6akEvsycLGftJxYudPjmqK').then(function (data) {
		$scope.tracks = data.items;
	});

    $scope.logOut = function() {
        window.location.replace("login.html")
    }

});