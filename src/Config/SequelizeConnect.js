import Sequelize from "sequelize";

export const db = new Sequelize( "crud", "root", "abc123", {
	host: "localhost",
	dialect: "mysql"
});

db.authenticate().then( () => {

	return true, console.log("Connected to MySQL");

}).catch( (e) => {

	return false, console.log(e);
	
});
