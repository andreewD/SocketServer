import { getRandomArbitraryInteger, getRandomFloat } from './numbersGenerator'

let N: number
let X: Array<number> = []
let Y: Array<number> = []

for (let x = 0; x < 9; x++) {
    N = getRandomArbitraryInteger(1, 200)
    X.push(getRandomArbitraryInteger(1, 15))
    Y.push(getRandomFloat(0, 18, 2))
}


export { X, Y, N }




