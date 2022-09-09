// Models
import UserModel from "../../../Models/User/UserModel.js";

export default class repository {
	// Private
	_email;
	_newname;

	constructor ( email, newname ) {
		this._email = email;
		this._newname = newname;
	}

	async UpdateNameAndCreateLog ( ) {
		await UserModel.update({ username: this._newname }, { where: { email: this._email, deletedAt: null } });

		return await UserModel.findOne({ where: { email: this._email, deletedAt: null } });
	}
}