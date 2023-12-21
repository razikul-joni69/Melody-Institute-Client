import AboutUs from "../components/AboutUs/AboutUs.jsx";
import HeroSection from "../components/HeroSection/HeroSection.jsx";
import OurVision from "../components/OurVision/OurVision.jsx";
import PopularClasses from "../components/PopularClasses/PopularClasses.jsx";
import PopularInstructors from "../components/PopularInstructors/PopularInstructors.jsx";
import Reviews from "../components/Reviews/Reviews.jsx";
import UpcomingEvents from "../components/UpcomingEvents/UpcomingEvents.jsx";

const Home = () => {
    document.title = "Melody Institute | Home";
    return (
        <div className="space-y-32">
            <HeroSection />
            <PopularClasses />
            <PopularInstructors />
            <UpcomingEvents />
            <OurVision />
            <AboutUs />
            <Reviews />
        </div>
    );
};

export default Home;
