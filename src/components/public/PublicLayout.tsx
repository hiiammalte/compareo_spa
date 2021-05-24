import { ReactElement, ReactNode } from "react";
import Logo from "../Logo";
import PublicHeader from "./PublicHeader";

export type ContainerProps = { 
    children: ReactNode;
}

function PublicLayout({ children }: ContainerProps): ReactElement {
    return (
        <div id="public">
            <Logo />
            <PublicHeader />
            {children}
            <div id="footer">
                <div className="badge badge-green badge-block"> Private Beta. Registration currently not possible.</div>
            </div>
        </div>
    );
}

export default PublicLayout;