import { useState } from "react";

import { ProjectDataFragment, useProjectsQuery } from "../graphql/hooks/graphql";
import ProjectBox from "../components/private/projects/ProjectBox";
import FlyoutMenu from "../components/private/FlyoutMenu";
import Header from "../components/private/PrivateHeader";
import ProjectCreateForm from "../components/private/projects/ProjectCreateForm";
import Icon from "../components/Icon";

function Projects() {
    const [activeProjectId, setActiveId] = useState<string | null>(null);
    const [showFlyout, setShowFlyout] = useState<boolean>(false);
    const formId: string = "projectcreateform";

    const { data, loading, error } = useProjectsQuery();
    if (loading) {
        return (
            <div id="main">
                <p>loading...</p>
            </div>
        )
    } else if (error) {
        if (error.networkError) {
            return (
                <div id="main">
                    <p>A network error occurred.</p>
                </div>
            )
        } else {
            return (
                <div id="main">
                    <p>{error.message}</p>
                </div>
            )
        }
    }

    function handleProjectCreated(project: ProjectDataFragment) {
        console.log("Project created:", project);
        setShowFlyout(false);
    }

    return (
        <>
            <Header title="Your Projects">
                <button onClick={() => setShowFlyout(true)} className="action-btn action-btn-primary">
                    <Icon name="plus" />
                    <span>Add Project</span>
                </button>
            </Header>
            <FlyoutMenu heading="New Project" formId={formId}
                isActive={showFlyout}
                onClose={() => setShowFlyout(false)} >
                <ProjectCreateForm formId={formId} onCreatedProject={(project) => handleProjectCreated(project)} />
            </FlyoutMenu>

            <div id="main">
                <div id="main__content-aware">
                    <h3>Your Projects</h3>
                </div>
                <div id="main__actions-aware">
                    <button onClick={() => setShowFlyout(true)} className="action-btn action-btn-primary">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
                { data?.projects &&
                    <>
                        <div id="carousel">
                            { data.projects.map(project => (
                                <ProjectBox
                                    key={ project.id }
                                    project={ project }
                                    isActive={ project.id === activeProjectId }
                                    onSelected={() => setActiveId(project.id !== activeProjectId ? project.id : null)} />
                            )) }
                        </div>

                        <div className="subheader">
                            <div className="subheader__heading">
                                <h6>Product comparison overview</h6>
                            </div>
                            <div className="subheader__controls">
                                <label className="switch">
                                <input id="switch-1" name="switch" type="radio" defaultChecked />
                                <label htmlFor="switch-1">Show all</label>
                                <input id="switch-2" name="switch" type="radio" />
                                <label htmlFor="switch-2">Incompletes only</label>
                                    <div className="switch-btn switch-btn-tertiary"></div>
                                </label>
                            </div>
                        </div>

                        <table className="table">
                            <tbody>
                                <tr >
                                    <td>The Mirror & the Light</td>
                                    <td>Hilary Mantel</td>
                                    <td>New this Week</td>
                                    <td className="align--right">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Journey of the Pharaohs</td>
                                    <td>Clive Cussler and Graham Brown</td>
                                    <td>New this Week</td>
                                    <td className="align--right">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Where the Crawdads Sing</td>
                                    <td>Delia Owens</td>
                                    <td>79</td>
                                    <td className="align--right">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>American Dirt</td>
                                    <td>Jeanine Cummings</td>
                                    <td>8</td>
                                    <td className="align--right">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Little Fires Everywhere</td>
                                    <td>Celeste Ng</td>
                                    <td>57</td>
                                    <td className="align--right">
                                        <i className="fa fa-ellipsis-v"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                }
                
        </div>
      </>
    );
}

export default Projects;