// Mock Payment Service
// In production, replace with actual Stripe or PayPal SDK

exports.createPaymentIntent = async (amount, currency = 'USD') => {
    // Mock payment intent creation
    // In production, this would be: stripe.paymentIntents.create({ amount, currency })

    return {
        id: `pi_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        amount: amount,
        currency: currency,
        status: 'requires_payment_method',
        client_secret: `mock_secret_${Math.random().toString(36).substr(2, 16)}`
    };
};

exports.confirmPayment = async (paymentIntentId) => {
    // Mock payment confirmation
    // In production, this would be: stripe.paymentIntents.confirm(paymentIntentId)

    return {
        id: paymentIntentId,
        status: 'succeeded',
        amount_received: 0
    };
};

exports.refundPayment = async (paymentIntentId, amount) => {
    // Mock refund
    // In production, this would be: stripe.refunds.create({ payment_intent: paymentIntentId })

    return {
        id: `rf_mock_${Date.now()}`,
        payment_intent: paymentIntentId,
        amount: amount,
        status: 'succeeded'
    };
};
