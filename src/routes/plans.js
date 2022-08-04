import initStripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

export async function GET() {
    const stripe = initStripe(process.env['STRIPE_SECRET_KEY']);
    const {
        data: prices
    } = await stripe.prices.list();

    const plans = await Promise.all(prices.map(async (price) => {
        const product = await stripe.products.retrieve(price.product)
        return {
            id: price.id,
            name: product.name,
            price: price.unit_amount,
            interval: price.recurring.interval,
            currency: price.currency
        }
    }))

    return {
        status: 200,
        body: {
            plans
        }
    };
}
