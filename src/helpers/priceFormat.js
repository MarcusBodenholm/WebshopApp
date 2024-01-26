

const priceFormat = input => {
    const commaRemoved = String(input).split(',')[0];
    const price = String(Math.round(Number(commaRemoved)));
    let result = price.length > 3 ? `${price.slice(0, price.length - 3)} ${price.slice(price.length - 3)}` : price;
    return result
}

export default priceFormat