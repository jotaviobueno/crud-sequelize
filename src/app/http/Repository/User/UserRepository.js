// Dependencies
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";

// Model's
import UserModel from "../../../Models/User/UserModel.js";
import Loginmodel from "../../../Models/User/LoginModel.js";

export default class repository {
	// Private
	_email;
	_username;
	_password;

	constructor( email, username, password ) {
		this._email = email;
		this._username = username;
		this._password = password;
	}

	async Storage ( ) {
		return await UserModel.create({

			user_id: nanoid(),
			username: this._username,
			email: this._email,
			password: await bcrypt.hash( this._password, 10 ),
			deletedAt: null

		});
	}

	async disconnectAllSession () {
		const findAllSession = await Loginmodel.findAll( { where: { email: this._email, disconnected_in: null } });

		findAllSession.forEach( async ( session ) => {

			return await Loginmodel.update({ disconnected_in: new Date() }, { where: { email: session.dataValues.email, disconnected_in: null } });
		});
	}

	async Delete ( ) {
		return await UserModel.update({ deletedAt: new Date() }, { where: { email: this._email, deletedAt: null } });
	}
}