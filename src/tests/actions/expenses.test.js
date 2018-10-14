
import {addExpense, editExpense, removeExpense} from "../../actions/expenses";

test('RemoveExpenseTest', () => {

	const action = removeExpense({
		id: "123abc"
	});

	expect(action).toEqual({
		type: "REMOVE_EXPENSE",
		id: "123abc"
	})
});

test('EditExpenseTest', () => {

	const action = editExpense("123abc", {
		note: "testNote"
	});

	expect(action).toEqual({
		type: 'EDIT_EXPENSE',
		id: '123abc',
		updates: {
			note: 'testNote'
		}
	});
});

test('AddExpenseTest_DefaultValues', () => {
	const action = addExpense();

	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			id: expect.any(String),
			description: "",
			note: "",
			amount: 0,
			createdAt: 0
		}
	})
});

test('AddExpenseTest', () => {

	const expenseData = {
		description: "rent",
		amount: 109500,
		createdAt: 1000,
		note: "this was last moths rent"
	};

	const action = addExpense(expenseData);

	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: {
			...expenseData,
			id: expect.any(String),
		}
	});
});