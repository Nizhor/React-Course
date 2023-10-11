"use strict";
function calculateExercises(dailyHours, target) {
    var periodLength = dailyHours.length;
    var trainingDays = dailyHours.filter(function (hours) { return hours > 0; }).length;
    var average = dailyHours.reduce(function (sum, hours) { return sum + hours; }, 0) / periodLength;
    var rating;
    var ratingDescription;
    if (average >= target) {
        rating = 3;
        ratingDescription = 'well done! target achieved';
    }
    else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    }
    else {
        rating = 1;
        ratingDescription = 'you should definitely train more';
    }
    return {
        periodLength: periodLength,
        trainingDays: trainingDays,
        success: average >= target,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average
    };
}
var args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Please provide at least the target and one day of exercise hours as arguments');
    process.exit(1);
}
var target = Number(args[0]);
var dailyHours = args.slice(1).map(Number);
console.log(calculateExercises(dailyHours, target));
