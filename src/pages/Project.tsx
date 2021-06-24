import { useEffect, useState } from "react";

import { RouteParameterProps } from "../hoc/AuthRoute";
import { ComparisionType, useProjectQuery } from "../graphql/hooks/graphql";
import FlyoutMenu from "../components/private/FlyoutMenu";
import Header from "../components/private/PrivateHeader";
import ProductCreateForm from "../components/private/project/ProductCreateForm";
import AttributeCreateForm from "../components/private/project/AttributeCreateForm";
import Icon from "../components/Icon";
import FilterBox from "../components/private/project/FilterBox";
import CollaboratorAddForm from "../components/private/project/CollaboratorAddForm";

enum SubmenuValue {
    _,
    PRODUCTS,
    ATTRIBUTES,
    COMPARISONS,
    COLLABORATORS
}

function GetButtonText(value: SubmenuValue) {
    switch (value) {
        case SubmenuValue.ATTRIBUTES:
            return "Add Attribute"
        case SubmenuValue.COMPARISONS:
            return "Add Comparison"
        case SubmenuValue.COLLABORATORS:
            return "Add Collaborator"
        default:
            return "Add Product"
    }
}

function Project({ match } : RouteParameterProps) {
    const [showFlyout, setShowFlyout] = useState<boolean>(false);
    const [buttonText, setButtonText] = useState<string>(GetButtonText(SubmenuValue.PRODUCTS));
    const [subSelection, setSubSelection] = useState<SubmenuValue | null>(SubmenuValue.PRODUCTS)
    
    useEffect(() => {
        subSelection && setButtonText(GetButtonText(subSelection!));
    }, [subSelection]);
    
    const newProductFormId: string = "productcreateform";
    const newAttributeFormId: string = "attributecreateform";
    const newComparisonFormId: string = "comparisoncreateform";
    const addCollaboratorFormId: string = "collaboratoraddform";

    const { data, loading, error, refetch } = useProjectQuery({variables: {id: match.params.id!}});
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

    function handleProjectUpdated() {
        setShowFlyout(false);
        refetch();
    }

    return (
        <>
            <Header title={data?.project?.title} goBackPath="/projects">
                <button onClick={() => setShowFlyout(true)} className="action-btn action-btn-primary">
                    <Icon name="plus" />
                    <span>{buttonText}</span>
                </button>
            </Header>
            {(() => {
                switch (subSelection) {
                    case SubmenuValue.PRODUCTS: return (
                        <FlyoutMenu
                            heading="New Product"
                            formId={newProductFormId}
                            isActive={showFlyout}
                            onClose={() => setShowFlyout(false)}
                        >
                            <ProductCreateForm
                                projectId={match.params.id!}
                                formId={newProductFormId}
                                onCreatedProduct={(product) => handleProjectUpdated()}
                            />
                        </FlyoutMenu>
                    )
                    case SubmenuValue.ATTRIBUTES: return (
                        <FlyoutMenu
                            heading="New Attribute"
                            formId={newAttributeFormId}
                            isActive={showFlyout}
                            onClose={() => setShowFlyout(false)}
                        >
                            <AttributeCreateForm
                                projectId={match.params.id!}
                                formId={newAttributeFormId}
                                onCreatedAttribute={(attribute) => handleProjectUpdated()}
                            />
                        </FlyoutMenu>
                    )
                    case SubmenuValue.COMPARISONS: return (
                        <FlyoutMenu
                            heading="New Comparison"
                            formId={newComparisonFormId}
                            isActive={showFlyout}
                            onClose={() => setShowFlyout(false)}
                        >
                            <ProductCreateForm
                                projectId={match.params.id!}
                                formId={newComparisonFormId}
                                onCreatedProduct={(id) => {console.log(`Comparison created: ${id}`)}}
                            />
                        </FlyoutMenu>
                    )
                    case SubmenuValue.COLLABORATORS: return (
                        <FlyoutMenu
                            heading="Add Collaborators"
                            formId={addCollaboratorFormId}
                            isActive={showFlyout}
                            onClose={() => setShowFlyout(false)}
                        >
                            <CollaboratorAddForm
                                projectId={match.params.id!}
                                formId={addCollaboratorFormId}
                                onCollaboratorsAdded={() => handleProjectUpdated()}
                            />
                        </FlyoutMenu>
                    )
                }
            })()}

            <div id="main">
                <div id="main__content-aware">
                    <h3>{data?.project?.title}</h3>
                </div>
                <div id="main__actions-aware">
                    <div className="action-btn action-btn-primary">
                        <i className="fa fa-plus"></i>
                    </div>
                </div>

                <div id="submenu">
                    <FilterBox
                        title="Products"
                        counter={data?.project?.products?.length ?? 0}
                        isActive={subSelection === SubmenuValue.PRODUCTS}
                        onSelected={() => setSubSelection(subSelection !== SubmenuValue.PRODUCTS ? SubmenuValue.PRODUCTS : null)}
                    />
                    <FilterBox
                        title="Attributes"
                        counter={data?.project?.attributes?.length ?? 0}
                        isActive={subSelection === SubmenuValue.ATTRIBUTES}
                        onSelected={() => setSubSelection(subSelection !== SubmenuValue.ATTRIBUTES ? SubmenuValue.ATTRIBUTES : null)}
                    />
                    <FilterBox
                        title="Comparisons"
                        counter={24}
                        isActive={subSelection === SubmenuValue.COMPARISONS}
                        onSelected={() => setSubSelection(subSelection !== SubmenuValue.COMPARISONS ? SubmenuValue.COMPARISONS : null)}
                    />
                    <div className="submenu-spacer"></div>
                    <FilterBox
                        title="Collaborators"
                        counter={data?.project?.collaborators?.length ?? 0}
                        isActive={subSelection === SubmenuValue.COLLABORATORS}
                        onSelected={() => setSubSelection(subSelection !== SubmenuValue.COLLABORATORS ? SubmenuValue.COLLABORATORS : null)}
                        stylingClass="submenu-item-green"
                    />
                </div>

                {(() => {
                switch (subSelection) {
                    case SubmenuValue.PRODUCTS: return (
                        <>
                        <div className="subheader">
                            <div className="subheader__heading">
                                <h6>Products within this project</h6>
                            </div>
                            <div className="subheader__controls">
                                <label className="switch">
                                    <input id="switch-1" name="switch" type="radio" defaultChecked />
                                    <label htmlFor="switch-1">Alle anzeigen</label>
                                    <input id="switch-2" name="switch" type="radio" />
                                    <label htmlFor="switch-2">Nur unvollständige</label>
                                    <div className="switch-btn switch-btn-tertiary"></div>
                                </label>
                            </div>
                        </div>
                        { data?.project?.products && 
                            <table className="table">
                                <tbody>
                                    {data.project.products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.name}</td>
                                            <td>{product.manufacturer}</td>
                                            <td className="align--right">{product.url &&
                                                <a target="_blank" rel="noreferrer" href={product.url}>Product website <Icon name="external-link-alt" /></a>
                                            }</td>
                                            <td className="align--right"><Icon name="ellipsis-v" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table> 
                        }
                        </>
                    )
                    case SubmenuValue.ATTRIBUTES: return (
                        <>
                        <div className="subheader">
                            <div className="subheader__heading">
                                <h6>Attributes within this project</h6>
                            </div>
                            <div className="subheader__controls">
                                <label className="switch">
                                    <input id="switch-1" name="switch" type="radio" defaultChecked />
                                    <label htmlFor="switch-1">Alle anzeigen</label>
                                    <input id="switch-2" name="switch" type="radio" />
                                    <label htmlFor="switch-2">Nur unvollständige</label>
                                    <div className="switch-btn switch-btn-tertiary"></div>
                                </label>
                            </div>
                        </div>
                        { data?.project?.attributes && 
                            <table className="table">
                                <tbody>
                                    { data.project.attributes.map(attribute => (
                                        <tr key={attribute.id}>
                                            <td>{ attribute.title }</td>
                                            <td>{ attribute.dataType && Object.keys(ComparisionType)[attribute.dataType] }</td>
                                            <td className="align--right"><Icon name="ellipsis-v" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table> 
                        }
                        </>
                    )
                    case SubmenuValue.COMPARISONS: return (
                        <div className="subheader">
                            <div className="subheader__heading">
                                <h6>Comparisons within this project</h6>
                            </div>
                            <div className="subheader__controls">
                                <label className="switch">
                                    <input id="switch-1" name="switch" type="radio" defaultChecked />
                                    <label htmlFor="switch-1">Alle anzeigen</label>
                                    <input id="switch-2" name="switch" type="radio" />
                                    <label htmlFor="switch-2">Nur unvollständige</label>
                                    <div className="switch-btn switch-btn-tertiary"></div>
                                </label>
                            </div>
                        </div>
                    )
                    case SubmenuValue.COLLABORATORS: return (
                        <>
                            <div className="subheader">
                                <div className="subheader__heading">
                                    <h6>Collaborators within this project</h6>
                                </div>
                                <div className="subheader__controls">
                                    <label className="switch">
                                    <input id="switch-1" name="switch" type="radio" defaultChecked />
                                    <label htmlFor="switch-1">Alle anzeigen</label>
                                    <input id="switch-2" name="switch" type="radio" />
                                    <label htmlFor="switch-2">Nur unvollständige</label>
                                        <div className="switch-btn switch-btn-tertiary"></div>
                                    </label>
                                </div>
                            </div>
                            { data?.project?.collaborators && 
                                <table className="table">
                                    <tbody>
                                        {data.project.collaborators.map(user => (
                                            <tr key={user.id}>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td className="align--right"><Icon name="ellipsis-v" /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table> 
                            }
                        </>
                    )
                    default: return (
                        <div className="subheader">
                            <div className="subheader__heading">
                                <h6>Project overview</h6>
                            </div>
                        </div>
                    )
                }
            })()}

        </div>
      </>
    );
}

export default Project;