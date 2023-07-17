import { Slide, Zoom } from "react-awesome-reveal";
import ClassCard from "../components/ClassCard/ClassCard";
import Titles from "../components/Titles/Titles";
import useGetAllClasses from "../hooks/useGetAllClasses";

const Classes = () => {
    const [, approvedClasses, , dbAllClassesLoading, refetch] =
        useGetAllClasses();
    return (
        <div className="py-10 dark:bg-[#111827]">
            <Zoom>
                <Titles
                    title="All Classes"
                    subTitle="All of your favourite classes is here."
                />
            </Zoom>
            <Slide direction="down">
                <ClassCard
                    approvedClasses={approvedClasses}
                    dbAllClassesLoading={dbAllClassesLoading}
                    refetch={refetch}
                    id="classes"
                />
            </Slide>
        </div>
    );
};

export default Classes;
