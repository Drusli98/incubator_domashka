/*
 * Напишите код, который будет определять оценку студента (grade) в зависимости от балла (score).
 * Балл может быть целым числом от 0 до 100, а оценки 'F' (0 - 49), 'D' (50 - 69), 'C' (70-79), 'B' (80 - 89), 'A' (90 - 100)
 * Результат сохраните в переменной grade.
 */

let score = 70 ; // тестовое значение, можно изменять
let grade;
let valueisActive = false;


// score = Math.floor(Math.random() * 101);
if (score >= 0 && score <= 100) {
    if (score <= 49) {
        grade = 'F';
        valueisActive = true;
    } else if (score <= 69) {
        grade = 'D';
        valueisActive = true;
    } else if (score <= 79) {
        grade = 'C';
        valueisActive = true;
    } else if (score <= 89) {
        grade = 'B';
        valueisActive = true;
    } else {
        grade = 'A';
        valueisActive = true;
    }
} else {
    alert('Введите корректный балл от 0 до 100')
}

console.log(score);
console.log(grade)


// your code