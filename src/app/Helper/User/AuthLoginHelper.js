// Models
import LoginModel from "../../Models/User/LoginModel.js";

// Dependencies
import bcrypt from "bcrypt";

class AuthLoginHelper {

	async ComparePassword ( password, hash ) {
		return await bcrypt.compare( password, hash );
	}

	async ExistSession ( session_id ) {
		const findId = await LoginModel.findOne({ where: { session_id: session_id, disconnected_in: null } });

		if ( findId === null )
			return false;

		return findId;
	}
}

export default new AuthLoginHelper;