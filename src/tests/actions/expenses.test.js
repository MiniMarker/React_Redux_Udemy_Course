import {startAddExpense, addExpense, editExpense, removeExpense} from "../../actions/expenses";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import testData from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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

/*
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
*/

//Need to mock a store to fake db calls
test("AddExpenseToDbProvidedData", (done) => {

	//create mock store
	const store = createMockStore({});
	const expenseData = {
		description: "Mouse",
		amount: 3000,
		note: "other was broken",
		createdAt: 1000
	};

	store.dispatch(startAddExpense(expenseData)).then(() => {
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...expenseData
			}
		});

		//using promise-nesting to return a promise from the promise
		return database
			.ref(`expenses/${actions[0].expense.id}`)
			.once('value')

	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);

		done();
	});

});

test("AddExpenseToDbDefaultData", (done) => {

	//create mock store
	const store = createMockStore({});
	const defaultExpenseData = {
		description: "",
		note: "",
		amount: 0,
		createdAt: 0
	};

	store.dispatch(startAddExpense(defaultExpenseData)).then(() => {
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: 'ADD_EXPENSE',
			expense: {
				id: expect.any(String),
				...defaultExpenseData
			}
		});

		//using promise-nesting to return a promise from the promise
		return database
			.ref(`expenses/${actions[0].expense.id}`)
			.once('value')

	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(defaultExpenseData);

		done();
	});
});

test('AddExpenseTest', () => {

	const action = addExpense(testData[2]);

	expect(action).toEqual({
		type: 'ADD_EXPENSE',
		expense: testData[2]
	});
});