 
  $(document).ready(function(){ 

  	 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBD2BnNBj332avEgQs9uy_oy2wsEJ65xKY",
    authDomain: "traintracker-25145.firebaseapp.com",
    databaseURL: "https://traintracker-25145.firebaseio.com",
    projectId: "traintracker-25145",
    storageBucket: "traintracker-25145.appspot.com",
    messagingSenderId: "528510593895"
  };

  firebase.initializeApp(config);

  var database = firebase.database().ref();

		var trainName = '';
		var destination = '';
		var firstTrain = '';
		var frequency = '';

	$("#submit").on("click", function() {
     trainName = $("#trainName").val().trim();
     destination = $("#destination").val().trim();
     firstTrain= $('#firstTrain').val().trim();
     frequency = $('#frequency').val().trim();

     var trainInfo = {
			name: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency
		};

		// pushing trainInfo to Firebase
		database.push(trainInfo);

	});

	database.on("child_added", function(childSnapshot) {

     // Log everything that's coming out of snapshot
      console.log(childSnapshot.val().trainName);
      console.log(childSnapshot.val().destination);
      console.log(childSnapshot.val().firstTrain);
      console.log(childSnapshot.val().frequency);

  });
});