// Repository
import repository from "../../Repository/User/UserRepository.js";

// Helper's
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import UserHelper from "../../../Helper/User/UserHelper.js";
import AuthLoginHelper from "../../../Helper/User/AuthLoginHelper.js";

// Services

class UserController {

	async Storage ( req, res ) {
		const { username, email, password } = req.body;

		if ( await UserHelper.ExistEmail( email ) )
			return ResponseHelper.unprocessableEntity( res, { error: "email already registered" });

		const StorageInformation = await new repository( email, username, password ).Storage();

		if ( StorageInformation )
			return ResponseHelper.created( res, {
				username: StorageInformation.username,
				email: StorageInformation.email,
				createdAt: StorageInformation.createdAt
			});

		return ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });
	}

	async SeeAccount ( req, res ) {
		const { session_id } = req.headers;

		const SessionInformation = await AuthLoginHelper.ExistSession( session_id );

		if (! SessionInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "session is invalid" });

		const UserInfo = await UserHelper.ExistEmail( SessionInformation.email );

		if (! UserInfo )
			return ResponseHelper.unprocessableEntity( res, { error: "email already registered" });

		if ( UserInfo )
			return ResponseHelper.created( res, {
				username: UserInfo.username,
				email: UserInfo.email,
				createdAt: UserInfo.createdAt,
				updatedAt: UserInfo.updatedAt,
				deletedAt: UserInfo.deletedAt

			});
	
		return ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });
	}

	async DeleteAccount ( req, res ) {
		const { session_id } = req.headers;
		const { password } = req.body;

		const SessionInformation = await AuthLoginHelper.ExistSession( session_id );

		if (! SessionInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "session is invalid" });

		const UserInfo = await UserHelper.ExistEmail( SessionInformation.email );

		if (! UserInfo )
			return ResponseHelper.unprocessableEntity( res, { error: "email already registered" });

		if (! await AuthLoginHelper.ComparePassword( password, UserInfo.password ) )
			return ResponseHelper.notAuthorized( res, { error: "invalid credentials" });

		if ( await new repository( UserInfo.email ).Delete() ) {

			await new repository(UserInfo.email).disconnectAllSession();

			return ResponseHelper.success( res, { success: "account deleted!" });

		}
	
		return ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });
	}

}

export default new UserController;