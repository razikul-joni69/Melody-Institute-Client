import ClassCard from "../components/ClassCard/ClassCard";
import Titles from "../components/Titles/Titles";

const Classes = () => {
    return (
        <div className="my-10">
            <Titles
                title="All Classes"
                subTitle="All of your favourite classes is here."
            />
            <ClassCard />
        </div>
    );
};

export default Classes;
