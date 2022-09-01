// Dependencies
import Sequelize  from "sequelize"; 

// DataBase
import { DataBase } from "../../../Config/SequelizeConnect.js";

// Table
const UserModel = DataBase.define( "user", {

	user_id: {
		type: Sequelize.STRING( 300 ),
		allowNull: false
	},

	username: {
		type: Sequelize.STRING( 100 ),
		allowNull: false,
	},

	email: {
		type: Sequelize.STRING( 150 ),
		allowNull: false,
	},

	password: {
		type: Sequelize.STRING( 300 ),
		allowNull: false,
	},

	deletedAt: {
		type: Sequelize.DATE,
	}

});

// Create table...
// UserModel.sync();

export default UserModel;