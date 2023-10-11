


interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

function calculateExercises(dailyHours: number[], target: number): Result {
    const periodLength = dailyHours.length;
    const trainingDays = dailyHours.filter(hours => hours > 0).length;
    const average = dailyHours.reduce((sum, hours) => sum + hours, 0) / periodLength;
    let rating: number;
    let ratingDescription: string;

    if (average >= target) {
        rating = 3;
        ratingDescription = 'well done! target achieved';
    } else if (average >= target * 0.75) {
        rating = 2;
        ratingDescription = 'not too bad but could be better';
    } else {
        rating = 1;
        ratingDescription = 'you should definitely train more';
    }

    return {
        periodLength,
        trainingDays,
        success: average >= target,
        rating,
        ratingDescription,
        target,
        average
    };
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Please provide at least the target and one day of exercise hours as arguments');
    process.exit(1);
}

const target = Number(args[0]);
const dailyHours = args.slice(1).map(Number);
console.log(calculateExercises(dailyHours, target));