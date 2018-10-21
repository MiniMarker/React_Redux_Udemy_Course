import {
	startAddExpense,
	addExpense,
	editExpense,
	removeExpense,
	setExpenses,
	startSetExpenses, startRemoveExpense, startEditExpense
} from "../../actions/expenses";
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import testData from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const testUid = "j132bjk4b3254243e";
const defaultAuthState = {auth: {uid: testUid}};
beforeEach((done) => {


	const expensesData = {};

	testData.forEach((expense) => {
		expensesData[expense.id] = {
			description: expense.description,
			note: expense.note,
			amount: expense.amount,
			createdAt: expense.createdAt
		}
	});

	database.ref(`users/${testUid}/expenses`).set(expensesData).then(() => {
		done();
	})

});

test('RemoveExpenseTest', () => {

	const action = removeExpense({
		id: "123abc"
	});

	expect(action).toEqual({
		type: "REMOVE_EXPENSE",
		id: "123abc"
	})
});

test("RemoveExpenseFromDb", (done) => {
	const store = createMockStore(defaultAuthState);

	store.dispatch(startRemoveExpense(testData[1]))
		.then(() => {
			const actions = store.getActions();

			expect(actions[0]).toEqual({
				type: "REMOVE_EXPENSE",
				id: testData[1].id
			});

			return database.ref(`users/${testUid}/expenses/${testData[1].id}`)
				.once('value')
				.then((snapshot) => {
					expect(snapshot.val()).toBeFalsy();
					done();
				});
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

test("EditExpenseInDb", (done) => {
	const store = createMockStore(defaultAuthState);

	const updatedExpense = {...testData[1], note: "Hello World"};

	store.dispatch(startEditExpense(testData[1].id, updatedExpense))
		.then(() => {

			const actions = store.getActions();

			expect(actions[0]).toEqual({
				type: "EDIT_EXPENSE",
				id: testData[1].id,
				updates: updatedExpense
			});

			return database.ref(`users/${testUid}/expenses/${testData[1].id}`)
				.once('value')
				.then((snapshot) => {
					expect(snapshot.val()).toEqual(updatedExpense);

					done()
				});
		});
});

//Need to mock a store to fake db calls
test("AddExpenseToDbProvidedData", (done) => {

	//create mock store
	const store = createMockStore(defaultAuthState);
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
			.ref(`users/${testUid}/expenses/${actions[0].expense.id}`)
			.once('value')

	}).then((snapshot) => {
		expect(snapshot.val()).toEqual(expenseData);

		done();
	});

});

test("AddExpenseToDbDefaultData", (done) => {

	//create mock store
	const store = createMockStore(defaultAuthState);
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
			.ref(`users/${testUid}/expenses/${actions[0].expense.id}`)
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

test("SetUpSetExpenseObjectWithData", () => {
	const action = setExpenses(testData);

	expect(action).toEqual({
		type: 'SET_EXPENSE',
		expenses: testData
	})
});

test("FetchExpensesFromFirebase", (done) => {
	const store = createMockStore(defaultAuthState);

	store.dispatch(startSetExpenses())
		.then(() => {

			const actions = store.getActions();

			expect(actions[0]).toEqual({
				type: "SET_EXPENSE",
				expenses: testData
			});

			done();
		});
});