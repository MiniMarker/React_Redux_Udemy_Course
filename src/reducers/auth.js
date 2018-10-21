
// not strictly nessacary, but i do it for consistency
const authDefaultState = {};

export default (state = authDefaultState, action) => {

	switch(action.type) {

		case "LOGIN":
			return {
				uid: action.uid
			};

		case "LOGOUT":
			return {};

		default:
			return state;

	}
};