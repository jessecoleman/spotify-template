/*
	Cole Chamberlin
    11/2/15
    INFO 343
    Spotify Challenge

    This file contains all the logic for login.html
 */

var loginApp = angular.module('loginApp', ['firebase']);

var loginCtrl = loginApp.controller('loginCtrl', function($scope, $http, $firebaseAuth, $firebaseObject, $firebaseArray) {
	//initialize firebase
	var ref = new Firebase("https://showfinder.firebaseio.com");
	var users = ref.child('Users');

	$scope.users = $firebaseObject(users);
	$scope.authObj = $firebaseAuth(ref);

	// display sign in first
	$scope.signUpView = false;

	var authData = $scope.authObj.$getAuth();


	if(authData) {
		$scope.userId = authData.uid;
		/*
		$scope.logOut()
		.then(window.location.replace("index.html"));
		*/
	}


	// SignUp
	$scope.signUp = function() {
		$scope.authObj.$createUser({
			email: $scope.newEmail,
			password: $scope.newPassword
		}).then($scope.logIn())
		.then(function (authData) {
			$scope.users[authData.uid] = {
				//set user data
				email: $scope.newEmail,
				favedArtists: []
			};
			$scope.users.$save();
			window.location.replace("index.html");
		}).catch(function (error) {
			console.error("Error: ", error);
		});
	};

	// SignIn
	$scope.signIn = function() {
		$scope.logIn()
		.then(function (authData) {
			$scope.userId = authData.uid;
			window.location.replace("index.html");
		});
	};

	// LogIn
	$scope.logIn = function() {
		return $scope.authObj.$authWithPassword({
			email: $scope.email,
			password: $scope.password
		})
	};

	// LogOut
	$scope.logOut = function() {
		$scope.authObj.$unauth();
		$scope.userId = null;
		return;
	};

});