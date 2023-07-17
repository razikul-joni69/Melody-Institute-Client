import { useEffect, useState } from "react";
import { Bounce } from "react-awesome-reveal";
import { NavLink } from "react-router-dom";
import useGetAllUsers from "../../hooks/useGetAllUsers";
import InstructorCard from "../InstructorCard/InstructorCard";
import Titles from "../Titles/Titles";

const PopularInstructors = () => {
    const [dbAllUsers, dbAllUsersLoading] = useGetAllUsers();
    const [instructors, setInstructors] = useState([]);
    const [PopularInstructors, setPopularInstructors] = useState([]);

    useEffect(() => {
        const instrac = dbAllUsers?.filter(
            (ins) => ins?.role === "instructor" && ins
        );
        setInstructors(instrac);

        const sortedData = instructors?.sort(
            (a, b) => b.total_students - a.total_students
        );
        setPopularInstructors(sortedData);
    }, [dbAllUsers]);

    return (
        <div>
            <Bounce>
                <Titles
                    title="Popular Instructors"
                    subTitle="See All of your favorite instructors."
                />
                <InstructorCard
                    instructors={
                        PopularInstructors?.slice(0, 6) ||
                        instructors?.slice(0, 6)
                    }
                    dbAllUsersLoading={dbAllUsersLoading}
                />
                <NavLink to="/instructors">
                    <div className="flex items-center justify-center pt-8">
                        <button className="btn btn-info">
                            See All Instructors
                        </button>
                    </div>
                </NavLink>
            </Bounce>
        </div>
    );
};

export default PopularInstructors;
