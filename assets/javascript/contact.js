console.log("Contact us at AppDoption!");

$(document).ready(function () {
    $('input#input_text, textarea#textarea2').characterCounter();
});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC7oyQ1aPCN5NPe7vw4JsWx4ABIOdWDplA",
    authDomain: "appdoption-15539.firebaseapp.com",
    databaseURL: "https://appdoption-15539.firebaseio.com",
    projectId: "appdoption-15539",
    storageBucket: "",
    messagingSenderId: "988267477269"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var nameData = $("#name-input").val().trim();
    var emailData = $("#email-input").val().trim();
    var messageData = $("#message-input").val().trim();

    // Creates local "temporary" object for contact data
    var newContact = {
        name: nameData,
        email: emailData,
        message: messageData
    };

    // Uploads message data to the database
    database.ref().push(newContact);

    // Logs everything to console
    console.log(newContact.name);
    console.log(newContact.email);
    console.log(newContact.message);

    alert("Your message has been sent!");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#email-input").val("");
    $("#message-input").val("");
});

// 3. Create Firebase event for adding the message to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var nameData = childSnapshot.val().name;
    var emailData = childSnapshot.val().email;
    var messageData = childSnapshot.val().message;

    // the message Info
    console.log(nameData);
    console.log(emailData);
    console.log(messageData);
});