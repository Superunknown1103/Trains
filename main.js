 
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
			trainName: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency
		};

		// pushing trainInfo to Firebase
		database.push(trainInfo);

	console.log(trainInfo.trainName);
	console.log(trainInfo.destination);
	console.log(trainInfo.firstTrain);
	console.log(trainInfo.frequency);

	});

	database.on("child_added", function(childSnapshot) {

		console.log(childSnapshot.val());

      var fireTrainName = childSnapshot.val().trainName;
      var fireDestination = childSnapshot.val().destination;
      var fireFrequency = childSnapshot.val().firstTrain;
      var fireFirstTrain = childSnapshot.val().frequency;

      $("#trainlist > tbody").append("<tr><td>" + fireTrainName + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + fireFirstTrain + "</td></tr>");
	});
});

