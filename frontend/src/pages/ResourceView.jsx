import React from "react";
import Sidebar from "../components/StudentDashboard/Sidebar";
import ResourceViewPdf from "../components/Resources/ResourceViewPdf";

function ResourceView(){

    return(
        <>
            <Sidebar />
            <ResourceViewPdf />
        </>
    );
}

export default ResourceView;