var firebaseConfig = {
    apiKey: "AIzaSyAeCs6YDbOslXK1QOzZ1SSgl5ErIvemaNA",
    authDomain: "david-s-first-firebase-project.firebaseapp.com",
    databaseURL: "https://david-s-first-firebase-project.firebaseio.com",
    projectId: "david-s-first-firebase-project",
    storageBucket: "",
    messagingSenderId: "257188751768",
    appId: "1:257188751768:web:c70b0914bf0d0b6d8a23ed"
};

firebase.initializeApp(firebaseConfig);


var database = firebase.database();

var trainName = "";
var destination = "";
var trainTime = "";
var frequency = "";

// onClick event
$("#train-form").submit( function (event) {
    event.preventDefault();
    trainName = $("#train-name-input").val().trim();
    destination = $("#destination-input").val().trim();
    trainTime = $("#train-time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    database.ref().push({
        trainName: trainName,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency

    });
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
});
//Puts firebase into HTML.
database.ref().on("child_added", function (childSnapshot) {
    var trainName = childSnapshot.val().trainName;
    var destination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().trainTime;
    var frequency = childSnapshot.val().frequency;

    //converts the times
    var firstTrainTime = moment(trainTime, "hh:mm a").subtract(1, "years");
    var nextTrainTime = moment().diff(firstTrainTime, "minutes");
    var timeRemaining = nextTrainTime % frequency;
    var timeUntilTheNextTrain = frequency - timeRemaining;
    var theTrainAfterThat = moment().add(timeUntilTheNextTrain, "minutes");
    //calculates everything and creates new slots for the trains using bootstrap properties.
    var trainSlots = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(theTrainAfterThat),
        $("<td>").text(timeUntilTheNextTrain)

    )

    $("#trains > tbody").append(trainSlots);

    

});
