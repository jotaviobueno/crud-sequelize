// Dependencies
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

// Model's
import UserModel from "../../../Models/User/UserModel.js";

export default class repository {
	// Private
	_username;
	_email;
	_password;

	constructor( username, email, password ) {
		this._username = username;
		this._email = email;
		this._password = password;
	}

	async Storage( ) {
		return await UserModel.create({

			user_id: nanoid(),
			username: this._username,
			email: this._email,
			password: await bcrypt.hash( this._password, 10 ),
			deletedAt: null

		});
	}
}