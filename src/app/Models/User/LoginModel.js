// Dependencies
import Sequelize  from "sequelize"; 

// DataBase
import { DataBase } from "../../../Config/SequelizeConnect.js";

// Table
const LoginModel = DataBase.define( "session", {

	session_id: {
		type: Sequelize.STRING( 200 ),
		allowNull: false
	},

	email: {
		type: Sequelize.STRING( 150 ),
		allowNull: false,
	},

	disconnected_in: { 
		type: Sequelize.DATE,
		allowNull: true
	}

});

// Create table...
// LoginModel.sync();

export default LoginModel;