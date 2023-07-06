import React, {useEffect, useRef, useState} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import "./Reviews.css"

// import required modules
import {Autoplay, EffectCoverflow, Pagination} from 'swiper/modules';
import {Rating} from "@smastrom/react-rating";

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch("/reviews.json").then(res => res.json()).then(data => setReviews(data))
    }, [])
    return (
        <div>
            <div className="text-center my-5">
                <div className="text-center space-y-3 ">
                    <h1 className="text-4xl md:text-5xl font-bold">
                        Reviews
                    </h1>
                    <p className="text-xl text-gray-500">
                        What Our Students say
                    </p>
                </div>
            </div>
            <Swiper
                effect={'coverflow'}
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
                className="mySwiper mb-10"
            >
                {
                    reviews.map(review => <SwiperSlide>
                        <div
                            className="h-full bordered bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-5">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0">
                                    <img className="w-20 h-20 rounded-full"
                                         src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                         alt="Bonnie image"/>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-md font-bold text-gray-900 truncate dark:text-white">
                                        {review.student_name}
                                    </p>
                                    <p className="bg-gray-200 inline-block rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 dark:text-gray-400">
                                        {review.enrolled_course}
                                    </p>
                                </div>

                            </div>
                            <hr className="my-4"/>
                            <div className="font-normal text-sm text-gray-900 dark:text-white">
                                {
                                    review.review_description.slice(0, 400)
                                }
                            </div>


                            <div className="flex justify-between items-center mt-3">
                                <div className="text-sm font-bold text-gray-900 dark:text-white">
                                    {new Date().toLocaleDateString("en-US", {
                                        month: 'short',
                                        day: '2-digit',
                                        year: 'numeric'
                                    })}
                                </div>
                                <div
                                    className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                    <Rating
                                        style={{maxWidth: 130}}
                                        value={review.rating}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>)
                }

            </Swiper>
        </div>
    );
};

export default Reviews;