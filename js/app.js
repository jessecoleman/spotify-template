var myApp = angular.module('myApp', ['spotify', 'firebase']);

var myCtrl = myApp.controller('myCtrl', function($scope, $http, $firebaseAuth, $firebaseObject, $firebaseArray,  Spotify) {
    //initialize firebase
    var ref = new Firebase("https://showfinder.firebaseio.com");
    var usersRef = ref.child('users');

    //make users firebaseObject and firebaseAuth available to scope
    $scope.users = $firebaseObject(usersRef);
    $scope.authObj = $firebaseAuth(ref);

    // function to build songs list similar to artists you like
	// add top song from each related artist
    var buildSongs = function(artistId) {
        Spotify.getRelatedArtists(artistId)
	        .then(function(result) {
	        $scope.relatedArtists = result.artists;
	        //add top three tracks from each related artist to three arrays
	        $scope.relatedArtists.forEach(function(artist) {
		        Spotify.getArtistTopTracks(artist.id, 'US')
	            .then(function(result1) {
			        if(result1.tracks[0].id) {
				        $scope.relatedArtistsTopSongs.push(result1.tracks[0]);
			        }
	            });
            });
        });
    };

    //initialize auth, fetch user
    var authData = $scope.authObj.$getAuth();
    if (authData) {
        var userRef = usersRef.child(authData.uid);
        $scope.user = $firebaseObject(userRef);
        // faved artists
	    var favedArtistsRef = userRef.child('favedArtists');
        $scope.userFavedArtists = $firebaseArray(favedArtistsRef);
        // faved songs for voting
        var favedSongsRef = userRef.child('favedSongs');
        $scope.userFavedSongs = $firebaseArray(favedSongsRef);
        //artist to use in quiz, passed in url from setup.html
        $scope.selectedArtist = window.location.search.substring(8);
	    //0: artist, 1: #1 track, 2: #2 track, 3: #3 track
	    $scope.relatedArtistsTopSongs = [];
        // build songs from similar artists
	    if($scope.selectedArtist) {
		    buildSongs($scope.selectedArtist);
		    //show related artists at end of slideshow
		    $scope.displayArtists = [];
		    $('.favorite').show();
	    } else {
		    $('#faved-artists').fadeIn(500);
		    $('#start').hide();
		    //show user favorited artists
		    $scope.displayArtists = $scope.userFavedArtists;
		    $('.favorite').hide();
	    }

        $scope.getArtistId = function(artist) {
            var current = Spotify.getArtist(artist.$value);
            return current.name;
        };
    }

    // slideshow style transitions
    // start slideshow
    var startButton = $('#start');
    $scope.start = function() {
        startButton.fadeOut(500, function() {
	        startButton.next().fadeIn(500);
        });
    };

    $scope.faved = function(artist) {
        return $scope.userFavedArtists.$indexFor(artist.id) != -1;
    };

    $scope.audioObject = {};

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
            $scope.currentSong = song;
        }
    };

    $scope.upVote = function(song, liked, that) {
	    var currentCard = $('#' + song.id);

        //console.log(song);
	    //pause track
	    if($scope.audioObject.pause != undefined) {
		    $scope.audioObject.pause();
	    }
	    //add artist
	    if(liked) {
		    song.artists.forEach(function(artist) {
			    $scope.displayArtists.push(artist);
		    });
	    }

        currentCard.fadeOut(500, function() {
            currentCard.next().fadeIn(500);
        });

    };

    $scope.logOut = function() {
        window.location.replace("login.html")
    };

	$scope.findArtists = function(artist) {
		window.location.replace('index.html?artist=' + artist.id);
	};

	$scope.addArtist = function(artist) {
		console.log($scope.userFavedArtists);
		//if($scope.userFavedArtists.$indexFor(artist) != -1) {
		$scope.userFavedArtists.$add(artist);
		/*
		 } else {
		 $scope.userFavedArtists.$remove(artist.id);
		 }
		 $scope.userFavedArtists.$save();
		 */
	};

});