import InstructorCard from "../InstructorCard/InstructorCard";
import Titles from "../Titles/Titles";

const PopularInstructors = () => {
    return (
        <div>
            <Titles
                title="Popular Instructors"
                subTitle="See All of your favourite instructors."
            />
            <InstructorCard />
        </div>
    );
};

export default PopularInstructors;
