"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthService_1 = require("../services/AuthService");
const router = (0, express_1.Router)();
router.post('/register', async (req, res, _next) => {
    try {
        const user = await AuthService_1.AuthService.registerUser(req.body);
        res.status(201).json({
            er_token: AuthService_1.AuthService.generateToken(user._id.toString(), user.role),
            er_role: user.role,
            er_user: user.email,
        });
    }
    catch (_error) {
        _next(_error);
    }
});
router.post('/login', async (req, res, _next) => {
    try {
        const user = await AuthService_1.AuthService.loginUser(req.body.email, req.body.password);
        res.json({
            er_token: AuthService_1.AuthService.generateToken(user._id.toString(), user.role),
            er_role: user.role,
            er_user: user.email,
        });
    }
    catch (error) {
        res.status(401).json({ message: error.message });
    }
});
exports.default = router;
