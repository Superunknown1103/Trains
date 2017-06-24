 
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
		var firstTrain = 0;
		var frequency = 0;
    var minutesAway = '';

	$("#submit").on("click", function() {
     trainName = $("#trainName").val().trim();
     destination = $("#destination").val().trim();
     firstTrain= $("#trainInput").val();
     frequency = $('#frequency').val().trim();
     then = moment(firstTrain, 'HH:mm').subtract(1, 'years');
     diff = moment().diff(moment(then), 'minutes');
     remainder = diff % frequency;
     minRemain = frequency - remainder;
     next = moment().add(minRemain, 'minutes');
     nextArrival = moment(next).format('HH:mm');
     console.log(nextArrival);

     var trainInfo = {
			trainName: trainName,
			destination: destination,
			firstTrain: firstTrain,
			frequency: frequency,
      nextArrival: nextArrival,
      minutesAway: minRemain,
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
      var fireNextArrival = childSnapshot.val().nextArrival;
      var fireMinutesAway = childSnapshot.val().minutesAway;

      // var differenceTimes = moment().diff(moment.unix(fireFirstTrain), "minutes");
      // var remainder = moment().diff(moment.unix(fireFirstTrain), "minutes") % fireFrequency ;
      
      // console.log(fireFrequency);
      // console.log(remainder);

      // var minutes = fireFrequency - remainder;

      // var arrival = moment().add(minutes, "m").format("hh:mm: A");
      // console.log(minutes);
      // console.log(arrival);

      // console.log(moment().format("hh:mm A"));
      // console.log(arrival);
      // console.log(moment().format("X"));





      $("#trainlist > tbody").append("<tr><td>" + fireTrainName + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + fireFirstTrain + "</td><td>" + fireNextArrival + "</td></td>" + fireMinutesAway + "</td></tr>");
	});
});

