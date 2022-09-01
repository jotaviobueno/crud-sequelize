// Models
import UserModel from "../../Models/User/UserModel.js";

class UserHelper {

	async ExistEmail ( email ) {
		const findEmail = await UserModel.findOne({ where: { email: email, deletedAt: null } });

		if ( findEmail === null )
			return false;

		return findEmail;
	}
}

export default new UserHelper;