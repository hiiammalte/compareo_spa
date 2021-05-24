import { ReactElement, ReactNode } from "react";

export type ContainerProps = { 
    heading: ReactNode;
    children: ReactNode;
}

function SidemenuContainer({ heading, children }: ContainerProps): ReactElement {
    return (
        <div id="login">
            <div id="login__header">
                {heading}
            </div>
            <div id="login__main">
                {children}
            </div>
        </div>
    );
}

export default SidemenuContainer;