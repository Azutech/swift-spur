"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = require("express");
const users_1 = require("../services/users");
exports.user = (0, express_1.Router)();
exports.user.post('/auth/sign-up', users_1.register);
