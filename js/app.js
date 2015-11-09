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
        var userRef = usersRef.child(authData.uid);
        $scope.user = $firebaseObject(userRef);
        var favedArtistsRef = userRef.child('favedArtists');
        $scope.userFavedArtists = $firebaseArray(favedArtistsRef);

        // I can't read the $scope.userFaved artists as an array here.

        console.log($scope.userFavedArtists);
        // faved songs for voting
        var favedSongsRef = userRef.child('favedSongs');
        $scope.userFavedSongs = $firebaseArray(favedSongsRef);
        // artists similar to favedArtists
        var similarArtistsRef = userRef.child('similarArtists');
        $scope.similarArtists = $firebaseObject(similarArtistsRef);
        // songs contains top tracks of similar artists to users favorited artists

        $scope.getArtistId = function(artist) {
            var current = Spotify.getArtist(artist.$value);
            return current.name;
        }

        for(var artist in $scope.userFavedArtists) {
            console.log(artist);
        }

        var buildSongs = function(artistId) {
            Spotify.getArtistTopTracks(artistId, 'US')
            .then(function(result) {
                $scope.songs = result.tracks;
            });
        };


        buildSongs('1kM5rgJvkiDMOoKX56H6pX');


        $scope.userFavedArtists.forEach(function(artist) {
            console.log(artist);
            if(angular.isArray(artist)) {
                artist.forEach(function(current) {
                    console.log(current);
                });
            }

        });
    }

    // slideshow style transitions
    // start slideshow
    var startButton = $('#start');
    $scope.start = function() {
        startButton.fadeOut(500, function() {
            startButton.next().fadeIn(500);
        });
    };

    $scope.audioObject = {}

    $scope.play = function(song) {
        if($scope.currentSong == song) {
            $scope.audioObject.pause();
            $scope.currentSong = false;
            return;
        }
        else {
            if($scope.audioObject.pause != undefined) {
                $scope.audioObject.pause();
            }
            $scope.audioObject = new Audio(song);
            $scope.audioObject.play();
            $scope.currentSong = song
        }
    }

    $scope.upVote = function(song, liked) {
        if(liked) {
            $scope.userFavedSongs.$add(song.id);
        }
        var currentCard = $('#' + song.id);
        currentCard.fadeOut(500, function() {
            currentCard.next().fadeIn(500);
        });

    };

    $scope.tracks = Spotify.getArtistTopTracks("1e7uyBB3QYqNvrtb6RHDnm", "US");

    $scope.logOut = function() {
        window.location.replace("login.html")
    }

});