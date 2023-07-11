import { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./Reviews.css";

// import required modules
import { Rating } from "@smastrom/react-rating";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/reviews.json")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);
    return (
        <div>
            <div className="my-5 text-center">
                <div className="space-y-3 text-center ">
                    <h1 className="text-4xl font-bold md:text-5xl">Reviews</h1>
                    <p className="text-xl text-gray-500">
                        What Our Students say
                    </p>
                </div>
            </div>
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                autoplay={true}
                loop={true}
                slidesPerView={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                pagination={true}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mb-10 mySwiper"
            >
                {reviews.map((review) => (
                    <SwiperSlide key={review._id}>
                        <div className="h-full p-5 bg-white border border-gray-200 rounded-lg shadow bordered dark:bg-gray-800 dark:border-gray-700">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img
                                        className="w-20 h-20 rounded-full"
                                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                        alt="Bonnie image"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 truncate text-md dark:text-white">
                                        {review.student_name}
                                    </p>
                                    <p className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full dark:text-gray-400">
                                        {review.enrolled_course}
                                    </p>
                                </div>
                            </div>
                            <hr className="my-4" />
                            <div className="text-sm font-normal text-gray-900 dark:text-white">
                                {review.review_description.slice(0, 400)}
                            </div>

                            <div className="flex items-center justify-between mt-3">
                                <div className="text-sm font-bold text-gray-900 dark:text-white">
                                    {new Date().toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "2-digit",
                                        year: "numeric",
                                    })}
                                </div>
                                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <Rating
                                        style={{ maxWidth: 130 }}
                                        value={review.rating}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Reviews;
