import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { showErrorMessage, showSuccessMessage } from "../../utils/Notification";
const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useContext(AuthContext);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        axios
            .post("http://localhost:8000/api/v1/payment", {
                price: 100,
            })
            .then((res) => {
                setClientSecret(res?.data?.clientSecret);
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card,
        });

        console.log("card", card);

        if (error) {
            console.log("[error]", error);
            showErrorMessage(error.message);
        } else {
            console.log("[PaymentMethod]", paymentMethod);
            showSuccessMessage("🆗 Payment Successfull");
            // TODO: Payment successfull do backend call
        }
        
        setProcessing(true);

        const { paymentIntent, error: confirmError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user?.displayName || "unknown",
                        email: user?.email || "unknown",
                    },
                },
            });

        if (confirmError) {
            showErrorMessage(confirmError.message);
        }
        
        setProcessing(false);
        if (paymentIntent?.status === "succeeded") {
            showSuccessMessage("🆗 Payment Successfull");
        }
    };
    return (
        <div>
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#424770",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#9e2146",
                            },
                        },
                    }}
                />
                <button
                    className="mt-3 btn btn-success"
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                >
                    Pay
                </button>
            </form>
        </div>
    );
};
export default Payment;
