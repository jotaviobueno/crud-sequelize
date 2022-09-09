// Dependencies
import express from "express";

// Router Profix
export const UserRoutes = express.Router();

// Controller's
import UserController from "../http/Controller/User/UserController.js";
import AuthLoginController from "../http/Controller/User/AuthLoginController.js";
import UpdateController from "../http/Controller/User/UpdateController.js";

// Routes
UserRoutes.post( "/register", UserController.Storage );
UserRoutes.post( "/login", AuthLoginController.CreateSession );
UserRoutes.get( "/my-account", UserController.SeeAccount );
UserRoutes.patch( "/update-name", UpdateController.UpdateName );