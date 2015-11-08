var myApp = angular.module('myApp', ['spotify', 'firebase']);

var myCtrl = myApp.controller('myCtrl', function($scope, $http, $firebaseAuth, $firebaseObject, $firebaseArray,  Spotify) {
    //initialize firebase
    var ref = new Firebase("https://showfinder.firebaseio.com");
    var usersRef = ref.child('users');

    //make users firebaseObject and firebaseAuth available to scope
    $scope.users = $firebaseObject(usersRef);
    $scope.authObj = $firebaseAuth(ref);

    var buildRelatedArtists = function() {
        console.log($scope.userFavedArtists);
        $scope.userFavedArtists.forEach(function(curr) {
            console.log(curr);
            Spotify.getArtistAlbums(curr)
            .then(function(result) {
                console.log(result);
            });
        });
    };

    Spotify.getRelatedArtists('3vAaWhdBR38Q02ohXqaNHT')
        .then(function(result) {
            console.log(result);
        });

    //initialize auth, fetch user
    var authData = $scope.authObj.$getAuth();
    if (authData) {
        var userRef = usersRef.child(authData.uid);
        $scope.user = $firebaseObject(userRef);
        var favedArtistsRef = userRef.child('favedArtists');
        $scope.userFavedArtists = $firebaseArray(favedArtistsRef);
        var similarArtistsRef = userRef.child('similarArtists');
        $scope.similarArtists = $firebaseObject(similarArtistsRef);
        // songs contains top tracks of similar artists to users favorited artists
        $scope.songs = buildRelatedArtists();
    }

    $scope.upVote = function(song, liked) {
        if(liked) {

        }

    };



    Spotify.getAlbumTracks('6akEvsycLGftJxYudPjmqK').then(function (data) {
		$scope.tracks = data.items;
	});

    $scope.logOut = function() {
        window.location.replace("login.html")
    }

});