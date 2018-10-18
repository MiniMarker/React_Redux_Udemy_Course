
// Expenses reducer
const expensesReducerDefaultState = [];

export default (state = expensesReducerDefaultState, action) => {
	switch(action.type) {

		case "ADD_EXPENSE":
			return [
				...state,
				action.expense
			];

		case "REMOVE_EXPENSE":

			//use filter because it returns the updated array, not changing the existing
			return state.filter(( {id} ) => id !== action.id);

		case "EDIT_EXPENSE":
			return state.map((expense) => {
				if(expense.id === action.id) {

					return {
						...expense,
						...action.updates
					}

				} else {
					return expense
				}
			});

		case "SET_EXPENSE":
			return action.expenses;

		default:
			return state;

	}
};