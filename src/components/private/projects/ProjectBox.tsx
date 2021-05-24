// import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Project } from "../../../graphql/hooks/graphql";

type CarouselBoxProps = {
    project: any,
    isActive: boolean,
    onSelected: () => void
}

// function getMatchingIcon(icon: string) {
// }

function ProjectBox({ project, isActive, onSelected } : CarouselBoxProps ) {
    return (
        <div onClick={onSelected} className={`carousel-card ${isActive ? "active" : ""}`}>
            <div className="carousel-card__icon">
                <i>
                    {/* { item.icon } */}
                </i>
            </div>
            <p className="carousel-card__title">
                { project.title }
            </p>
            <div className="carousel-card__description">
                <span className="counter">0</span>
                <small className="category">Produkte hinterlegt</small>
            </div>
        </div>
    );
}

export default ProjectBox