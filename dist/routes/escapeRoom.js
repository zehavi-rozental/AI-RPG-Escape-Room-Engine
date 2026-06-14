"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middleware/auth");
const EscapeRoomService_1 = require("../services/EscapeRoomService");
const router = (0, express_1.Router)();
router.get('/', auth_1.protect, async (req, res, next) => {
    try {
        const page = Number.parseInt(req.query.page, 10) || 1;
        const genre = req.query.genre;
        const { rooms, total } = await EscapeRoomService_1.EscapeRoomService.getRooms(page, 6, genre);
        res.json({
            data: rooms,
            pagination: { total, page, pages: Math.ceil(total / 6) },
        });
    }
    catch (error) {
        next(error);
    }
});
router.post('/:id/verify', auth_1.protect, async (req, res, next) => {
    try {
        const roomId = Array.isArray(req.params.id)
            ? req.params.id[0]
            : req.params.id;
        const { riddleId, answer } = req.body;
        const { isCorrect, room } = await EscapeRoomService_1.EscapeRoomService.verifyAnswer(roomId ?? '', riddleId, answer);
        if (!room) {
            res.status(404).json({ correct: false, message: 'Room not found' });
            return;
        }
        if (!isCorrect) {
            res.json({ correct: false, message: 'Wrong answer' });
            return;
        }
        if (riddleId === 3) {
            res.json({ correct: true, gameFinished: true });
            return;
        }
        const nextRiddle = room.riddles.find((r) => r.id === riddleId + 1);
        res.json({ correct: true, nextRiddle });
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
