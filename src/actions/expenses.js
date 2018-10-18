import uuid from "uuid";
import database from "../firebase/firebase";

// ADD_EXPENSE
export const addExpense = (expense) => ({
	type: "ADD_EXPENSE",
	expense
});

export const startAddExpense = (expenseData = {}) => {

	return (dispatch) => {

		const {
			description = "",
			note = "",
			amount = 0,
			createdAt = 0
		} = expenseData;

		const expense = {description, note, amount, createdAt};

		return database.ref('expenses').push(expense)
			.then((ref) => {

				dispatch(addExpense({
					...expense,
					id: ref.key
				}))

			})
			.catch((err) => {
				console.error(err);
			})
	}
};

// REMOVE_EXPENSE
export const removeExpense = ({id} = {}) => ({
	type: "REMOVE_EXPENSE",
	id
});

export const startRemoveExpense = (expense) => {
	return (dispatch) => {
		return database.ref(`expenses/${expense.id}`)
			.set(null)
			.then(() => {
				dispatch(removeExpense({
					id: expense.id
				}))
			})
			.catch((err) => {
				console.error("ERROR", err);
			});
	}
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
	type: "EDIT_EXPENSE",
	id,
	updates
});

export const startEditExpense = (id, updates) => {
	return (dispatch) => {
		return database.ref(`expenses/${id}`)
			.set({
				...updates
			})
			.then(() => {
				dispatch(editExpense(id, updates))
			})
			.catch((err) => {
				console.error(err);
			})
	}
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
	type: 'SET_EXPENSE',
	expenses
});

export const startSetExpenses = () => {
	return (dispatch) => {

		return database.ref('expenses')
			.once('value')
			.then((snapshot) => {

				const expenses = [];

				snapshot.forEach((expense) => {
					expenses.push({
						...expense.val(),
						id: expense.key
					});
				});

				dispatch(setExpenses(expenses))

			})
			.catch((err) => {
				console.log("ERROR", err);
			});
	}
};