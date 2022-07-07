export function calculateTotal(items, currency) {
    var total = 0
    items.forEach(element => {
        const selectedCurrencyPrice = element.prices.filter(
            (price) => price.currency.symbol === currency
        );
        const itemWithQty = selectedCurrencyPrice[0].amount * element.qty
        total += itemWithQty
    });
    return total
}
export function calculateQty(item) {
    var qty = 0
    item.forEach(element => {
        qty += element.qty
    })
    return qty
}