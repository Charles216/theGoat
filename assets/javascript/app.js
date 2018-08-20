
var petForm = document.querySelector('#petForm');

$(".animalBtn").on('click', fetchAnimals);

// fetch animals...
function fetchAnimals(event) {
	event.preventDefault();

	//get user input...
	var animal = '';
	if ($(this).attr('id') === "catBtn") {
		animal = "cat";
	} else {
		animal = "dog";
	}
	console.log(animal);
	var zip = document.querySelector('#zipCode').value;

	//Start API sequence...

	var url = 'http://api.petfinder.com/pet.find';
	var apiKey = "0164d1167e200069fe3eb9c06cc6f8b8";

	// Within $.ajax{...} is where we fill out our query... 
	$.ajax({
		url: url,
		jsonp: "callback",
		dataType: "jsonp",
		data: {
			key: apiKey,
			animal: animal,
			'location': zip,
			count: 25,
			output: 'basic',
			format: 'json'
		},
		//response from JSONP...
		success: function (response) {
			showAnimals(response.petfinder.pets.pet);

			// show listing of pets....
			function showAnimals(pets) {
				var results = document.querySelector('#results');
				//clear first...
				results.innerHTML = '';

				pets.forEach((pet) => {
					var divRow = $("<div>");
					divRow.addClass('row');
					
					var divCol = $('<div>');
					divCol.addClass('col s12 m7');
					
					var divCard = $('<div>');
					divCard.addClass('card');

					
					var divCardImg = $('<div>');
					divCardImg.addClass('card-image');
					
					var img = $("<img>");
					img.attr("src", pet.media.photos.photo[2]);	
					img.attr("alt", "picture of animal");
					
					var span = $("<span>").addClass('card-title');
					span.text(pet.name);

					divCardImg.append(img).append(span);
					
					
					var divContent = $("<div>");
					divContent.addClass('card-content');	
					
					var pDescript = $("<p>").text(pet.description);
					divContent.append(pDescript);

					var pEmail = $("<P>").text(pet.contact.email)


					var divAction = $("<div>");
					divAction.addClass('card-action');
					
					
					// console.log(pet);
					// console.log(pet.name);
					// console.log(pet.id);
					// console.log(pet.shelterId);
					// console.log(pet.description);
					// console.log(pet.contact.phone);

					var newDiv = $("<div>");
					//document.querySelector('#results')

				});

			}
		},
	})
};
