import { useProjectsQuery } from "../graphql/hooks/graphql";

function Project() {
    console.log("ENTERING PROJECT")
    
    return (
        <div id="main">
            <div id="main__content-aware">
                <h3>Produktvergleiche</h3>
            </div>
            <div id="main__actions-aware">
                <div className="action-btn action-btn-primary">
                    <i className="fa fa-plus"></i>
                </div>
            </div>

            <div id="submenu">
                <button onClick={() => {}} className="submenu-item active">
                    <div className="submenu-item__counter">
                    <span className="counter">24</span>
                    </div>
                    <div className="submenu-item__description">
                    <small className="category">Produkte</small>
                    </div>
                </button>

                <button onClick={() => {}} className="submenu-item">
                    <div className="submenu-item__counter">
                    <span className="counter">24</span>
                    </div>
                    <div className="submenu-item__description">
                    <small className="category">Vergleichskriterien</small>
                    </div>
                </button>
                <button onClick={() => {}} className="submenu-item">
                    <div className="submenu-item__counter">
                    <span className="counter">24</span>
                    </div>
                    <div className="submenu-item__description">
                    <small className="category">Auswertungen</small>
                    </div>
                </button>
                <div className="submenu-spacer"></div>
                <button onClick={() => {}}  className="submenu-item submenu-item-green">
                    <div className="submenu-item__counter">
                    <span className="counter">2</span>
                    </div>
                    <div className="submenu-item__description">
                    <small className="category">Teammitglieder</small>
                    </div>
                </button>
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
      </div>
    );
}

export default Project;