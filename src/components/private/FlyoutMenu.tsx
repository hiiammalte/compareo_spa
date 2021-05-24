import { ReactNode } from "react";
import Icon from "../Icon";

type FlyoutMenuProps = {
    heading: string,
    children: ReactNode,
    isActive: boolean,
    formId: string,
    onClose: () => void
}

function FlyoutMenu({ heading, children, isActive, formId, onClose } : FlyoutMenuProps) {
    return (
        <>
            <div id="flyout" className={`${isActive ? "active" : ""}`}>
                <div id="flyout__header">
                    <h3>
                        { heading }
                    </h3>
                    <button onClick={onClose} className="action-btn action-btn-dark">
                        <Icon name="times" />
                    </button>
                </div>
                <div id="flyout__main">
                    { children }
                </div>
                <div id="flyout__footer">
                    <div></div>
                    <button type="submit" form={ formId } className="action-btn action-btn-dark">
                        <span>Speichern</span>
                        <Icon name="check" />
                    </button>
                </div>
            </div>
            <div id="flyout__background" onClick={onClose} className={`${isActive ? "active" : ""}`}></div>
        </>
    );
}

export default FlyoutMenu;