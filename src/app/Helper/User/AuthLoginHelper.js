// Models

// Dependencies
import bcrypt from "bcrypt";

class AuthLoginHelper {

	async ComparePassword ( password, hash ) {
		return await bcrypt.compare( password, hash );
	}
}

export default new AuthLoginHelper;