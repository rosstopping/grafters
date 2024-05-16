const stripe = require('stripe')(process.env.STRIPE_SECRET);
const collect = require('collect.js');
const axios = require('axios').default;
// const { getShippingCountries, getPaymentMethods } = require('./util/stripe');

exports.handler = async (event) => {
    /**
     * Create the stripe request
     */
    let create = {
        success_url: `${process.env.URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.URL}`,
        allow_promotion_codes: true,
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        mode: 'payment',
        line_items: [
            // {price: 'price_1KFL29DVeVaT9qPl9jUXIY2T', quantity: 1}, //dev
            {price: 'price_1PH3sbDUZ0lQyLCoI5ESz1CI', quantity: 1}, //live
        ],
        customer_email: event.queryStringParameters.email,
        payment_intent_data: {
            metadata: event.queryStringParameters
        }
    };

    /**
     * Setup session
     */
    const session = await stripe.checkout.sessions.create(create);

    return {
        statusCode: 200,
        body: JSON.stringify({
            stripe_key: process.env.STRIPE_KEY,
            sessionId: session.id
        }),
    }
};