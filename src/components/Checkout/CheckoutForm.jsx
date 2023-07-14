import {
    CardElement,
    Elements,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { showErrorMessage, showSuccessMessage } from "../../utils/Notification";
import "./CheckoutForm.css";
const CheckoutForm = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_payment_getway_pk);
    return (
        <div className="">
            <Elements stripe={stripePromise}>
                <Payment />
            </Elements>
        </div>
    );
};
export default CheckoutForm;

const Payment = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const { user } = useContext(AuthContext);
    const [processing, setProcessing] = useState(false);
    const { classId } = useParams();
    const [cls, setCls] = useState({});

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/v1/classes/${classId}`, {
                price: 100,
            })
            .then((res) => {
                setCls(res?.data[0]);
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });

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
            <div className="flex flex-col items-center rounded-lg shadow order-gray-200 mborder g-white md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <img
                    className="object-cover w-full h-full rounded-t-lg md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={cls?.img}
                    alt=""
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Class Name: {cls?.class_name}
                    </h5>
                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Price: {cls?.price}
                    </h5>
                    <form className="w-full max-w-l" onSubmit={handleSubmit}>
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
                    v
                </div>
            </div>
        </div>
    );
};
// export default Payment;
