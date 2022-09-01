// Dependencies
import express from "express";
import dotenv from "dotenv";

// Port
const port = 8081;

// DataBase Connect
import {db} from "./Config/SequelizeConnect.js";

// Routes
import {UserRoutes} from "./app/Routes/UserRoutes.js";

// Config
const app = express();

dotenv.config();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Routes
app.use("/", UserRoutes);


if ( db ) {
	app.listen( port, () => {
		console.log( "listen on!" );
	});
}