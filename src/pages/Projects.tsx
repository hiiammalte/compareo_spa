import { useState } from "react";

import { Project, useProjectsQuery } from "../graphql/hooks/graphql";
import ProjectBox from "../components/private/projects/ProjectBox";
import FlyoutMenu from "../components/private/FlyoutMenu";
import Header from "../components/private/PrivateHeader";
import ProjectCreateForm from "../components/private/projects/ProjectCreateForm";
import Icon from "../components/Icon";

function Projects() {
    const [activeProject, setActive] = useState<any | null>(null);
    const [showFlyout, setShowFlyout] = useState<boolean>(false);
    const formId: string = "projectcreateform";

    const { data, loading, error } = useProjectsQuery()
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

    return (
        <>
            <Header title="Projekte">
                <button onClick={() => setShowFlyout(true)} className="action-btn action-btn-primary">
                    <Icon name="plus" />
                    <span>Projekt hinzufügen</span>
                </button>
            </Header>
            <FlyoutMenu heading="Neuen Vergleich erstellen" formId={formId}
                isActive={showFlyout}
                onClose={() => setShowFlyout(false)} >
                <ProjectCreateForm formId={formId} onCreatedProject={(id) => {console.log(`Project created: ${id}`)}} />
            </FlyoutMenu>
            <div id="main">
                <div id="main__content-aware">
                    <h3>Produktvergleiche</h3>
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
                                <ProjectBox key={ project.id }
                                    project={ project }
                                    isActive={ project === activeProject }
                                    onSelected={() => setActive(project.id !== activeProject.id ? project : null)} />
                            )) }
                        </div>

                        <div className="subheader">
                            <div className="subheader__heading">
                                <h6>Produktvergleiche zum ausgewählten Projekt</h6>
                            </div>
                            <div className="subheader__controls">
                                <label className="switch">
                                <input id="switch-1" name="switch" type="radio" checked />
                                <label htmlFor="switch-1">Alle anzeigen</label>
                                <input id="switch-2" name="switch" type="radio" />
                                <label htmlFor="switch-2">Nur unvollständige</label>
                                    <div className="switch-btn switch-btn-tertiary"></div>
                                </label>
                            </div>
                        </div>

                        <table className="table">
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
                        </table>
                    </>
                }
                
        </div>
      </>
    );
}

export default Projects;