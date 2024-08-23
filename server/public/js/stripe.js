const stripe = Stripe(process.env.StripeKey);
import showAlert from "./alert.js";

export const bookTour = async tourId => {
    try {
        const session = await axios(`http://127.0.0.1:3000/api/v1/users/${tourId}`);

        await stripe.redirectToCheckout({ sessionId: session.data.session.id }
        )
    } catch (err) {
        console.log(err);
        showAlert(err);
    }
}