/*
Напишите функцию `findCommonElements`, которая принимает два массива и возвращает массив, содержащий общие элементы из обоих массивов.

Входные данные:

- `array1`: Первый массив, содержащий любые типы данных.
- `array2`: Второй массив, содержащий любые типы данных.

Выходные данные:

- Массив, содержащий элементы, которые присутствуют в обоих исходных массивах.
- Если общих элементов нет, должен вернуться пустой массив

Пример использования:
findCommonElements([1, 2, 3], [2, 3, 4]) // [2, 3]

Подсказка: можно использовать функцию `includesElement`, которую мы написали ранее. Переписывать её не нужно, она доступна по всему проекту за счёт hoisting.
*/

// for (let i = 0; i < arr1.length; i++) {
//  for (let j = 0; j <arr2.length; j++) {
//      if(arr1[i] === arr2[j]){
//
//      }
//  }
// }

const array1 = [1, 2, 3];
const array2 = [5, 6, 7];

function includesElement(arr, el) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === el) {
            return true;
        }
    }
    return false
}

// function findCommonElements(arr1, arr2) {
//     const newArray = [];
//     for (let i = 0; i < arr1.length; i++) {
//         for (let j = 0; j < arr2.length; j++) {
//             if (arr1[i] === arr2[j]) {
//                 newArray.push(arr1[i]);
//             }
//         }
//     }
//     return newArray
// }
//
// console.log(findCommonElements(array1, array2))

function findCommonElements(arr1, arr2) {
    const newArray = [];
    for (let i = 0; i < arr1.length; i++) {
        if(includesElement(arr2, arr1[i])){
            newArray.push(arr1[i]);
        }
    }
    return newArray
}

console.log(findCommonElements(array1, array2))