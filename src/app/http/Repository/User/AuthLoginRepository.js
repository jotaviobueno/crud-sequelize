// Dependencies
import { nanoid } from "nanoid";

// Model's
import LoginModel from "../../../Models/User/LoginModel.js";

export default class repository {
	// Private
	_email;

	constructor( email ) {
		this._email = email;
	}

	async CreateSession ( ) {
		return await LoginModel.create({
			session_id: nanoid(),
			email: this._email,
			disconnected_in: null
		});
	}
}