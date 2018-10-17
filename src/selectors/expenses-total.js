export default (expenses) => {

	return expenses.length === 0
		? 0
		: expenses
			.map((expense) => expense.amount)
			.reduce((sum, value) => sum + value, 0)
};


