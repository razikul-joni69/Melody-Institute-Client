import { useEffect, useState } from "react";
import { Bounce } from "react-awesome-reveal";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import InstructorCard from "../InstructorCard/InstructorCard";
import Titles from "../Titles/Titles";

const PopularInstructors = () => {
    const [dbAllUsers, dbAllUsersLoading] = useGetAllUsers();
    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        const instrac = dbAllUsers?.filter(
            (ins) => ins?.role === "instructor" && ins
        );
        setInstructors(instrac);
    }, [dbAllUsers]);

    return (
        <div>
            <Bounce>
                <Titles
                    title="Popular Instructors"
                    subTitle="See All of your favourite instructors."
                />
                <InstructorCard
                    instructors={instructors?.slice(0, 6)}
                    dbAllUsersLoading={dbAllUsersLoading}
                />
            </Bounce>
        </div>
    );
};

export default PopularInstructors;
