import React from 'react';
import Navbar from "../components/Navbar/Navbar.jsx";
import HeroSection from "../components/HeroSection/HeroSection.jsx";
import PopularClasses from "../components/PopularClasses/PopularClasses.jsx";
import PopularInstructors from "../components/PopularInstructors/PopularInstructors.jsx";

const Home = () => {
    return (
        <div>
            <HeroSection/>
            <PopularClasses/>
            <PopularInstructors/>
        </div>
    );
};

export default Home;