// Dependencies
import yup from "yup";

class UpdateRequest {

	async ValidateUpdateName ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_id: yup.string().required()
		});
    
		const BodyValidator = yup.object().shape({
			new_name: yup.string().required(),
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

export default new UpdateRequest;