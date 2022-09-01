// Repository
import repository from "../../Repository/User/UserRepository.js";

// Helper's
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import UserHelper from "../../../Helper/User/UserHelper.js";

// Services

class UserController {

	async Storage ( req, res ) {
		const { username, email, password } = req.body;

		if ( await UserHelper.ExistEmail( email ) )
			return ResponseHelper.unprocessableEntity( res, { error: "email already registered" });

		const StorageInformation = await new repository( username, email, password ).Storage();

		if ( StorageInformation )
			return ResponseHelper.created( res, {
				username: StorageInformation.username,
				email: StorageInformation.email,
				createdAt: StorageInformation.createdAt
			});

		return ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });
	}
}

export default new UserController;