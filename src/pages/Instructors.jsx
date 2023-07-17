import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import InstructorCard from "../components/InstructorCard/InstructorCard";
import Titles from "../components/Titles/Titles";
import useGetAllUsers from "../hooks/useGetAllUsers";

const Instructors = () => {
    const [dbAllUsers, dbAllUsersLoading] = useGetAllUsers();
    const [instructors, setInstructors] = useState([]);

    document.title = "Melody Institute | Instructors";

    useEffect(() => {
        const instrac = dbAllUsers?.filter(
            (ins) => ins?.role === "instructor" && ins
        );
        setInstructors(instrac);
    }, [dbAllUsers]);

    return (
        <div className="py-10 dark:bg-[#111827]">
            <Zoom>
                <Titles
                    title="All of our Instructors"
                    subTitle="Choose your favourite instructors class."
                />
                <InstructorCard
                    instructors={instructors}
                    dbAllUsersLoading={dbAllUsersLoading}
                />
            </Zoom>
        </div>
    );
};

export default Instructors;
