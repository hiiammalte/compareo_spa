// import { IconProp } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ProjectDataFragment } from "../../../graphql/hooks/graphql";

type CarouselBoxProps = {
    project: ProjectDataFragment,
    isActive: boolean,
    onSelected: (projectId: string) => void
}

// function getMatchingIcon(icon: string) {
// }

function ProjectBox({ project, isActive, onSelected } : CarouselBoxProps ) {
    const [mouseOver, setMouseOver] = useState<boolean>(false);

    return (
        <div
            onClick={() => onSelected(project!.id)}
            onMouseEnter={() => setMouseOver(true)}
            onMouseLeave={() => setMouseOver(false)}
            className={`carousel-card ${isActive ? "active" : ""}`}
        >
            <div className="carousel-card__icon">
                <i>
                    {/* { item.icon } */}
                </i>
            </div>
            <p className="carousel-card__title">
                { project.title }
            </p>
            {mouseOver ?
                <div className="carousel-card__menu">
                    <NavLink
                        exact to={ `/project/${project.id}` }
                        className={ `menu outline-btn ${isActive ? "outline-btn-solid" : ""}` }
                    >Open this Project</NavLink>
                </div> : 
                <div className="carousel-card__description">
                    <span className="counter">{ project.products?.length ?? 0 }</span>
                    <small className="category">Products to compare</small>
                </div>
            }
        </div>
    );
}

export default ProjectBox