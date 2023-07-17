import "swiper/css";
import "swiper/css/effect-cards";
import { Autoplay, EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img1 from "../../assets/images/HeroImages/Shiny Happy - Outdoors.png";
import {
    default as img2,
    default as img7,
} from "../../assets/images/HeroImages/bass-guitar.png";
import img3 from "../../assets/images/HeroImages/drum.png";
import img4 from "../../assets/images/HeroImages/flute.png";
import img5 from "../../assets/images/HeroImages/trumpet.png";
import img6 from "../../assets/images/HeroImages/violin.png";
import "./HeroSection.css";

const HeroSection = () => {
    const images = [img1, img2, img3, img4, img5, img6, img7];
    return (
        <div>
            <section className="bg-white dark:bg-gray-900">
                <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                            Learn Your Favorite Instruments With Us
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            Learn your favorite instruments with us from
                            scratch. We don't just tech you, we feel you the
                            rhythm. Lets start your journey with us.
                        </p>
                        <button id="classes" className="btn">
                            Explore Courses{" "}
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <Swiper
                            effect={"cards"}
                            grabCursor={true}
                            autoplay={true}
                            modules={[EffectCards, Autoplay]}
                            className="mySwipe"
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <img
                                        className=""
                                        src={img}
                                        alt="hero instruments"
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
