/*
const person = {
	//name: "Christian",
	age: 24,
	location: {
		city: "Oslo",
		temp: 10
	}
};

// Add default value and rename the variable
const {name: firstName = "Anonymous", age} = person;
//const name = person.name;
//const age = person.age;

console.log(`${firstName} is ${age}.`);

// rename the variable
const {temp: temperature, city} = person.location;

if(temperature && city) {
	console.log(`It's ${temperature} in ${city}`);
}

*/
/*
const book = {
	title: "The Hitchhikers guide to the galaxy",
	author: "Douglas Adams",
	publisher: {
		name: "Voyager"
	}
};

const {
	name: publisherName = "Self-Published"
} = book.publisher;


console.log(`${book.title} is published by ${publisherName}`);

*/

const address = [
	"1299 S Jupiter Street",
	"Philadelphia",
	"Pennsylvania",
	"19147"
];

//const [street, city, state, zip] = address;
const [, city, state = "New York"] = address;

console.log(`You are in ${city}, ${state}`);

const item = ["Coffee (hot)", 2.0, 2.5, 2.75];

const [name, , mediumCoffePrice] = item;

console.log(`A ${name} costs $${mediumCoffePrice}`);
