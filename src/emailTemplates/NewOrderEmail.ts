import * as format from 'string-template';

class NewOrderEmail {
    public subject = 'New order';

    public render(userName: string, productName: string, priceValue: number, priceCurrency: string) {
        return format('Hello {userName}! You have bought {productName} for {priceValue} {priceCurrency}.', {
            userName,
            productName,
            priceValue,
            priceCurrency,
        });
    }
}

export const newOrderEmail = new NewOrderEmail();
