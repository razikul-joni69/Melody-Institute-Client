import ClassCard from "../components/ClassCard/ClassCard";
import Titles from "../components/Titles/Titles";

const Classes = () => {
    return (
        <div className="py-10 dark:bg-[#111827]">
            <Titles
                title="All Classes"
                subTitle="All of your favourite classes is here."
            />
            <ClassCard />
        </div>
    );
};

export default Classes;
