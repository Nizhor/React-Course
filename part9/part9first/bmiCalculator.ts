


export function calculateBmi(height: number, weight: number): string {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);

    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        return 'Normal (healthy weight)';
    } else if (bmi >= 25 && bmi < 30) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.error('Please provide both height and weight as arguments');
    process.exit(1);
}

const [height, weight] = args.map(Number);
console.log(calculateBmi(height, weight));
