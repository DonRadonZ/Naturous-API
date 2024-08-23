const stripe = Stripe(process.env.StripeKey);
import showAlert from "./alert.js";

export const bookTour = async tourId => {
    try {
        const session = await axios(`/api/v1/users/${tourId}`);

        await stripe.redirectToCheckout({ sessionId: session.data.session.id }
        )
    } catch (err) {
        console.log(err);
        showAlert(err);
    }
}