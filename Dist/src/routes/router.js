"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const users_1 = require("./auth/users");
exports.routes = (0, express_1.Router)();
exports.routes.use('/users', users_1.user);
