// repository
import repository from "../../Repository/User/UpdateRepository.js";

// Helper's
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import UserHelper from "../../../Helper/User/UserHelper.js";
import AuthLoginHelper from "../../../Helper/User/AuthLoginHelper.js";

class UpdateController {

	async UpdateName ( req, res ) {
		const { session_id } = req.headers;
		const { new_name } = req.body;

		const SessionInformation = await AuthLoginHelper.ExistSession( session_id );

		if (! SessionInformation )
			return ResponseHelper.unprocessableEntity( res, { error: "session is invalid" });

		const UserInfo = await UserHelper.ExistEmail( SessionInformation.email );

		if (! UserInfo )
			return ResponseHelper.unprocessableEntity( res, { error: "email already registered" });
	
		if ( new_name === UserInfo.username )
			return;
    
		const update = await new repository( UserInfo.email, new_name ).UpdateNameAndCreateLog();

		if ( update )
			return ResponseHelper.success( res, {
				new_name: update.username,
				old_name: UserInfo.username,
				updatedAt: update.updatedAt,

			});

		return ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });
	}

}

export default new UpdateController;