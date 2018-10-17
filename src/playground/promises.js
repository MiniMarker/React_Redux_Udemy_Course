const promise = new Promise((resolve, reject) => {

	resolve({
		name: "Chrsitan",
		age: 24
	});

	reject('ERROR! Something went wrong');
});

console.log("before");

promise.then((data) => {
	console.log("1", data);
}).catch((err) => {
	console.log(err);
});

console.log("after");