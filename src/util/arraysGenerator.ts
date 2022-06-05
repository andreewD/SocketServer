import { getRandomArbitraryInteger, getRandomFloat } from './numbersGenerator'

const generator = () => {
    let X: Array<number> = []
    let Y: Array<number> = []

    for (let x = 0; x < 9; x++) {
        X.push(getRandomArbitraryInteger(0, 1000))
        Y.push(getRandomFloat(0, 1000, 2))
    }

    return { X, Y }
}

export { generator }





