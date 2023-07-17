import { Rating } from "@smastrom/react-rating";
import { useEffect, useState } from "react";
import { Bounce, Slide } from "react-awesome-reveal";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Titles from "../Titles/Titles";
import "./Reviews.css";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/reviews.json")
            .then((res) => res.json())
            .then((data) => setReviews(data));
    }, []);
    
    return (
        <div>
            <Bounce>
                <Titles title="Reviews" subTitle="What Our Students say" />
            </Bounce>

            <Slide direction="right">
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    autoplay={true}
                    loop={true}
                    slidesPerView={"auto"}
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
                    {reviews.map((review, index) => (
                        <SwiperSlide className="" key={index}>
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
                                        {new Date().toLocaleDateString(
                                            "en-US",
                                            {
                                                month: "short",
                                                day: "2-digit",
                                                year: "numeric",
                                            }
                                        )}
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
            </Slide>
        </div>
    );
};

export default Reviews;
