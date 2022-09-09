// Repository
import repository from "../../Repository/User/AuthLoginRepository.js";

// Helper's
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import UserHelper from "../../../Helper/User/UserHelper.js";
import AuthLoginHelper from "../../../Helper/User/AuthLoginHelper.js";

// Services

class AuthLoginController {
    
	async CreateSession ( req, res ) {
		const { email, password } = req.body;

		const UserInfo = await UserHelper.ExistEmail( email );

		if (! UserInfo )
			return ResponseHelper.unprocessableEntity( res, { error: "email already registered" });

		if (! await AuthLoginHelper.ComparePassword( password, UserInfo.password ) )
			return ResponseHelper.notAuthorized( res, { error: "invalid credentials" });
			
		await AuthLoginHelper.VerifySession( UserInfo.email );

		const SessionInformation = await new repository( email ).CreateSession();

		if ( SessionInformation )
			return ResponseHelper.created( res, {
				username: UserInfo.username,
				email: SessionInformation.email,
				session_id: SessionInformation.session_id
			});

		return ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });
	} 
}

export default new AuthLoginController;
