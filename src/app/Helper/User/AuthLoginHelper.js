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

	async VerifySession ( email ) {
		const findAllSession = await LoginModel.findAll( { where: { email: email, disconnected_in: null } });

		if ( findAllSession.length >= 1 )
			findAllSession.forEach( async ( session ) => {
				return await LoginModel.update({ disconnected_in: new Date() }, { where: { email: session.dataValues.email, disconnected_in: null } });
			});
	}
}

export default new AuthLoginHelper;