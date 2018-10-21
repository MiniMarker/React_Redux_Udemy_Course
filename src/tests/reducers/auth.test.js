import authReducer from '../../reducers/auth';

test("LoginSaveUid", () => {

	const uid = 23456787;

    const state = authReducer(undefined, {
	    type: "LOGIN",
	    uid
    });

    expect(state).toEqual({
	    uid
    })
});

test("LogoutWipeUid", () => {

	const state = authReducer({
		uid: "1234567890"
	}, {
		type: "LOGOUT"
	});

	expect(state).toEqual({});

});