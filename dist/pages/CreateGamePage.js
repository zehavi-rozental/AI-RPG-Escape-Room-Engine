"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateGamePage;
const jsx_runtime_1 = require("react/jsx-runtime");
const CreateGameForm_1 = __importDefault(require("../components/CreateGameForm"));
function CreateGamePage() {
    return (0, jsx_runtime_1.jsx)(CreateGameForm_1.default, {});
}
