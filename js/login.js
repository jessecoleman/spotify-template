/*
	Cole Chamberlin
    11/2/15
    INFO 343
    Spotify Challenge

    This file contains all the logic for login.html
 */

var loginApp = angular.module('loginApp', ['firebase']);

loginApp.controller('loginCtrl', function($scope, $http, $firebaseAuth, $firebaseObject, $firebaseArray) {

	// display sign in first
	$scope.signUpView = false;

	// initialize firebase
	var ref = new Firebase("https://showfinder.firebaseio.com");
	var usersRef = ref.child('users');

	$scope.users = $firebaseObject(usersRef);
	// authorization object
	$scope.authObj = $firebaseAuth(ref);

	// user object
	$scope.user = {};

	// test if user is already logged in
	var authData = $scope.authObj.$getAuth();

	// LogIn
	$scope.logIn = function(userEmail, userPassword) {
		return $scope.authObj.$authWithPassword({
			email: userEmail,
			password: userPassword
		});
	};

	// SignUp
	$scope.signUp = function() {
		//create user
		$scope.authObj.$createUser({
			email: $scope.newEmail,
			password: $scope.newPassword
		}).then($scope.logIn($scope.newEmail, $scope.newPassword))
		.then(function (authData) {
			$scope.user.id = authData.uid;
			// add user to users firebase array
			$scope.users[authData.uid] = {
				//set user data
				email: $scope.newEmail,
				favedArtists: ['test']
			};
			//save firebase array
			$scope.users.$save();
			window.location.replace("setup.html");
		}).catch(function (error) {
			$scope.error = error;
		});
	};

	// SignIn
	$scope.signIn = function() {
		$scope.logIn($scope.email, $scope.password)
		.then(function(authData) {
			$scope.user.id = authData.uid;
			window.location.replace("index.html");
		}).catch(function(error) {
			$scope.error = error;
		});
	};

	// LogOut
	$scope.logOut = function() {
		$scope.authObj.$unauth();
		$scope.user.id = null;
		return;
	};


	//if directed to from logged in user
	if(authData) {
		$scope.logOut();
	}

});