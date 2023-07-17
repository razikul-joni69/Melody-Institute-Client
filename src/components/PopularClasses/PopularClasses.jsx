import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { NavLink } from "react-router-dom";
import useGetAllClasses from "../../hooks/useGetAllClasses";
import ClassCard from "../ClassCard/ClassCard";
import Titles from "../Titles/Titles";

const PopularClasses = () => {
    const [, approvedClasses, , dbAllClassesLoading, refetch] =
        useGetAllClasses();
    const [popularClasses, setPopularClasses] = useState([]);

    useEffect(() => {
        const sortedData = approvedClasses?.sort(
            (a, b) => b.enrolled_students - a.enrolled_students
        );
        setPopularClasses(sortedData);
    }, [approvedClasses]);

    return (
        <div>
            <Fade>
                <Titles
                    title="Popular Classes"
                    subTitle="See All of your favorite Musical classes here."
                />
                <ClassCard
                    approvedClasses={
                        popularClasses.slice(0, 6) ||
                        approvedClasses.slice(0, 6)
                    }
                    dbAllClassesLoading={dbAllClassesLoading}
                    refetch={refetch}
                    id="classes"
                />
                <NavLink to="/classes">
                    <div className="flex items-center justify-center">
                        <button className="btn btn-info">
                            See All Classes
                        </button>
                    </div>
                </NavLink>
            </Fade>
        </div>
    );
};

export default PopularClasses;
