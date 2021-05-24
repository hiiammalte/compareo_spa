import { ReactElement } from "react";

const defaultContainerProps = {
    heading: "Compare[]"
}

PublicHeader.defaultProps = defaultContainerProps;

function PublicHeader({ heading }: { heading: string } & typeof defaultContainerProps): ReactElement {
    return (
        <div id="title">
            <h5>{heading}</h5>
        </div>
    );
}

export default PublicHeader;