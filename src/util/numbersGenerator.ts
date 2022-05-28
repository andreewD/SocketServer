const getRandomArbitraryInteger = (min: number, max: number) => {
    return Math.floor(Math.random() * max) + min;
}

const getRandomFloat = (min: number, max: number, decimals: number) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);

    return parseFloat(str);
}




export { getRandomArbitraryInteger, getRandomFloat }