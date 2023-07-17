import InstructorCard from "../components/InstructorCard/InstructorCard";
import Titles from "../components/Titles/Titles";

const Instructors = () => {
    return (
        <div className="py-10 dark:bg-[#111827]">
            <Titles
                title="All of our Instructors"
                subTitle="Choose your favourite instructors class."
            />
            <InstructorCard />
        </div>
    );
};

export default Instructors;
