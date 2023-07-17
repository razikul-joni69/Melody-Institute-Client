import { Fade } from "react-awesome-reveal";
import useGetAllClasses from "../../hooks/useGetAllClasses";
import ClassCard from "../ClassCard/ClassCard";
import Titles from "../Titles/Titles";

const PopularClasses = () => {
    const [, approvedClasses, , dbAllClassesLoading, refetch] =
        useGetAllClasses();
    return (
        <div>
            <Fade>
                <Titles
                    title="Popular Classes"
                    subTitle="See All of your favourite Musical classes here."
                />
                <ClassCard
                    approvedClasses={approvedClasses.slice(0, 6)}
                    dbAllClassesLoading={dbAllClassesLoading}
                    refetch={refetch}
                    id="classes"
                />
            </Fade>
        </div>
    );
};

export default PopularClasses;
