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
import Loading from "../Loading/Loading";
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
    const [dbLoading, setDbLoading] = useState(false);

    useEffect(() => {
        setDbLoading(true);
        axios
            .get(`http://localhost:8000/api/v1/classes/${classId}`)
            .then((res) => {
                setCls(res?.data[0]);
                setDbLoading(false);
                axios
                    .post(
                        "http://localhost:8000/api/v1/create-payment-intent",
                        {
                            price: res?.data[0]?.price,
                        }
                    )
                    .then((res) => {
                        setClientSecret(res?.data?.clientSecret);
                    })
                    .catch((err) => {
                        showErrorMessage(err.message);
                    });
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    }, []);

    const handleUpdateCart = async () => {
        await axios
            .get(`http://localhost:8000/api/v1/cart/${user?.email}`)
            .then((res) => {
                if (res?.data?.length) {
                    const oldClasses = res?.data[0]?.enrolled_classes;
                    const updateCartData = {
                        classes: [...oldClasses, cls],
                    };
                    const exist = oldClasses.find(
                        (oldCls) => oldCls._id === cls._id
                    );
                    if (!exist) {
                        axios
                            .patch(
                                `http://localhost:8000/api/v1/cart/${user?.email}?class_type=enrolled&id=${cls?._id}`,
                                updateCartData
                            )
                            .then((res) => {
                                if (
                                    res?.data?.lastErrorObject?.updatedExisting
                                ) {
                                    showSuccessMessage(
                                        "👍 Enrolled New Class!"
                                    );
                                }
                            })
                            .catch((err) => {
                                showErrorMessage(err.message);
                            });
                    } else {
                        showErrorMessage("Already Enrolled this class");
                    }
                } else {
                    axios
                        .post(`http://localhost:8000/api/v1/cart/`, cls)
                        .then((res) => {
                            showSuccessMessage("👍 Enrolled to New Course!");
                        })
                        .catch((err) => {
                            showErrorMessage(err.message);
                        });
                }
            })
            .catch((err) => {
                showErrorMessage(err.message);
            });
    };

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

        if (error) {
            console.log("[error]", error);
            showErrorMessage(error.message);
        }
        // else {
        //     console.log("[PaymentMethod]", paymentMethod);
        //     showSuccessMessage("🆗 Payment Successfull");
        //     // TODO: Payment successfull do backend call
        // }

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
            const paymentInfo = {
                transectionAmount: paymentIntent?.amount / 100,
                transectionStatus: paymentIntent?.status,
                transectionId: paymentIntent?.id,
            };
            cls.paymentInfo = paymentInfo;
            handleUpdateCart();
        }
    };

    if (dbLoading) {
        return <Loading />;
    }
    return (
        <div className="grid w-full mt-5 space-y-5 justify-items-center">
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
                </div>
            </div>
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
                    className="text-white btn btn-success"
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}
                >
                    Pay
                </button>
            </form>
        </div>
    );
};
// export default Payment;
