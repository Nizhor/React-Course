"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBmi = void 0;
function calculateBmi(height, weight) {
    var heightInMeters = height / 100;
    var bmi = weight / (heightInMeters * heightInMeters);
    if (bmi < 18.5) {
        return 'Underweight';
    }
    else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    }
    else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    }
    else {
        return 'Obese';
    }
}
exports.calculateBmi = calculateBmi;
var args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Please provide both height and weight as arguments');
    process.exit(1);
}
var _a = args.map(Number), height = _a[0], weight = _a[1];
console.log(calculateBmi(height, weight));
