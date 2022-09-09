// Dependencies
import yup from "yup";

class AuthRequest {

	async ValidateCreateSession ( req, res, next ) {

		const BodyValidator = yup.object().shape({
			email: yup.string().email().required(),
			password: yup.string().required(),
		});

		try {
			await BodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}
}

export default new AuthRequest;