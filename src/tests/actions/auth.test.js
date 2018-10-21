import {login, logout} from "../../actions/auth";

test("SetLoginUid", () => {

	const uid = 23456789876543;

	const auth = login(uid);

	expect(auth).toEqual({
		type: "LOGIN",
		uid
	})
});

test("SetLogout", () => {

	const auth = logout();

	expect(auth).toEqual({
		type: "LOGOUT",
	})
});