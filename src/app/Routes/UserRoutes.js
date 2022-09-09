// Dependencies
import express from "express";

// Router Profix
export const UserRoutes = express.Router();

// Controller's
import UserController from "../http/Controller/User/UserController.js";
import AuthLoginController from "../http/Controller/User/AuthLoginController.js";
import UpdateController from "../http/Controller/User/UpdateController.js";

// Request
import UserRequest from "../http/Request/User/UserRequest.js";
import AuthLoginRequest from "../http/Request/User/AuthLoginRequest.js";
import UpdateRequest from "../http/Request/User/UpdateRequest.js";

// Routes
UserRoutes.post( "/register", UserRequest.ValidateStorage, UserController.Storage );
UserRoutes.post( "/login", AuthLoginRequest.ValidateCreateSession, AuthLoginController.CreateSession );
UserRoutes.get( "/my-account", UserRequest.ValidateSeeAccount, UserController.SeeAccount );
UserRoutes.patch( "/update-name", UpdateRequest.ValidateUpdateName, UpdateController.UpdateName );
UserRoutes.delete( "/my-account/delete", UserRequest.ValidateDelete, UserController.DeleteAccount );