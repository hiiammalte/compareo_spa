import React from "react";
import SidemenuContainer from "../components/public/Sidemenu";

const Unauthorized: React.FC = () => {
    return (
        <SidemenuContainer heading={<h5>Welcome back! <br/> Sign in</h5>} >
            <h2>Test</h2>
        </SidemenuContainer>
        
    );
}

export default Unauthorized;