import { ReactElement, ReactNode } from "react";
import Logo from "../Logo";
import Navbar from "./Navbar";

export type ContainerProps = { 
    children: ReactNode;
}

function PrivateLayout({ children }: ContainerProps): ReactElement {
    return (
        <div id="app">
            <Logo />
            <Navbar />
            { children }
        </div>
    );
}

export default PrivateLayout;