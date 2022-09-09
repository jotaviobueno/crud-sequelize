// Dependencies
import yup from "yup";

class UserRequest {

	async ValidateStorage ( req, res, next ) {

		const BodyValidator = yup.object().shape({
			username: yup.string().required(),
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

	async ValidateSeeAccount ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_id: yup.string().required()
		});
    
		try {
			await HeadersValidator.validate(req.headers);
    
		} catch (err) {
			return res.status(422).json({errors: err.errors});
    
		}
    
		await next();
	}

	async ValidateDelete ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_id: yup.string().required()
		});
    
		const BodyValidator = yup.object().shape({
			password: yup.string().required(),
		});
    
		try {
			await HeadersValidator.validate(req.headers);
			await BodyValidator.validate(req.body);
    
		} catch (err) {
			return res.status(422).json({errors: err.errors});
    
		}
    
		await next();
	}
}

export default new UserRequest;