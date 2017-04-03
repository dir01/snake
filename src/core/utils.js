export function randInt(a, b) {
    return a + Math.floor(Math.random() * (++b - a))
}

export function isArraysEqual(array1, array2) {
    return (array1.length === array2.length) && array1.every(function (element, index) {
            return element === array2[index];
        });
}
