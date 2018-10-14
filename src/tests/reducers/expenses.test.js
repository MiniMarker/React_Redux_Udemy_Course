import expenseReducer from '../../reducers/expenses';
import testData from '../fixtures/expenses';

test("DefaultStateTest", () => {
    const state = expenseReducer(undefined, {
    	type: "@@INIT"
    });

	expect(state).toEqual([])
});

test("RemoveExpensValidId", () => {
    const action = {
    	type: "REMOVE_EXPENSE",
	    id: testData[1].id
    };

    const state = expenseReducer(testData, action);

    expect(state.length).toBe(2);
	expect(state).toEqual([testData[0], testData[2]])
});

test("RemoveExpensInvalidId", () => {
	const action = {
		type: "REMOVE_EXPENSE",
		id: "-1"
	};

	const state = expenseReducer(testData, action);

	expect(state.length).toBe(3);
	expect(state).toEqual(testData)
});


test("AddExpenseTest", () => {

	const newExpense = {
		description: "testDescription",
		amount: 29000,
		createdAt: 20000,
		note: "testNote"
	};

	const action = {
		type: "ADD_EXPENSE",
		expense: newExpense
	};

	const state = expenseReducer(testData, action);

	expect(state.length).toBe(4);
	expect(state).toEqual([...testData, newExpense])
});

test("EditExpenseValidIdTest", () => {

	const updatedDescription = "updatedDescription";

	const action = {
		type: "EDIT_EXPENSE",
		id: testData[1].id,
		updates: {
			description: updatedDescription
		}
	};

	const state = expenseReducer(testData, action);

	expect(state[1].description).toBe(updatedDescription)

});

test("EditExpenseInvalidIdTest", () => {

	const updatedDescription = "updatedDescription";

	const action = {
		type: "EDIT_EXPENSE",
		id: "-1",
		updates: {
			description: updatedDescription
		}
	};

	const state = expenseReducer(testData, action);

	expect(state).toEqual(testData)

});