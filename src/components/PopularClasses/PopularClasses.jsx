import ClassCard from "../ClassCard/ClassCard";
import Titles from "../Titles/Titles";

const PopularClasses = () => {
    return (
        <div>
            <Titles
                title="Popular Classes"
                subTitle="See All of your favourite Musical classes here."
            />
            <ClassCard />
        </div>
    );
};

export default PopularClasses;
