import React from 'react';
import HeroSection from "../components/HeroSection/HeroSection.jsx";
import PopularClasses from "../components/PopularClasses/PopularClasses.jsx";
import PopularInstructors from "../components/PopularInstructors/PopularInstructors.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";

const Home = () => {
    return (
        <div className="space-y-32">
            <HeroSection/>
            <PopularClasses/>
            <PopularInstructors/>
            <Reviews/>
        </div>
    );
};

export default Home;