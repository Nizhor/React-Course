"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var bmiCalculator_1 = require("./bmiCalculator"); // import the function
var app = (0, express_1.default)();
var PORT = 3000;
app.get('/hello', function (_req, res) {
    res.send('Hello Full Stack!');
});
app.get('/bmi', function (req, res) {
    var height = Number(req.query.height);
    var weight = Number(req.query.weight);
    if (!height || !weight || isNaN(height) || isNaN(weight)) {
        res.status(400).send({ error: "malformatted parameters" });
        return;
    }
    var bmi = (0, bmiCalculator_1.calculateBmi)(height, weight);
    res.send({
        weight: weight,
        height: height,
        bmi: bmi
    });
});
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
