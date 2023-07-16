import InstructorCard from "../components/InstructorCard/InstructorCard";
import Titles from "../components/Titles/Titles";

const Instructors = () => {
    return (
        <div className="my-10">
            <Titles
                title="All of our Instructors"
                subTitle="Choose your favourite instructors class."
            />
            <InstructorCard />
        </div>
    );
};

export default Instructors;
