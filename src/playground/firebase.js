// database.ref('expenses').push({
// 	id: '1',
// 	description: 'Gum',
// 	amount: 195,
// 	note: '',
// 	createdAt: 0
// });


// database.ref('notes').push({
// 	id: 12,
// 	title: "Hello",
// 	body: "World"
// });

//database.ref('notes/-LP1MzfBg_M03Dx6ADVU').remove();


database.ref('expenses').on('value', (snapshot) => {

	const expenses = [];

	snapshot.forEach((expense) => {
		expenses.push({
			...expense,
			id: expense.key
		})
	});

	console.log(expenses);
});


database.ref('expenses').on('child_removed', (snapshot) => {
	console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_changed', (snapshot) => {
	console.log(snapshot.key, snapshot.val());
});

database.ref('expenses').on('child_added', (snapshot) => {
	console.log(snapshot.key, snapshot.val());
});


//
// database.ref('expenses')
// 	.once('value')
// 	.then((snapshot) => {
//
// 		const expenses = [];
//
// 		snapshot.forEach((expense) => {
// 			expenses.push({
// 				...expense.val(),
// 				id: expense.key
// 			});
// 		});
//
// 		console.log(expenses);
//
// 	});