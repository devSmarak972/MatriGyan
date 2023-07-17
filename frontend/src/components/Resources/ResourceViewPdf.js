import React,{ useState } from 'react';
import { Document, Page } from 'react-pdf';
import Sidebar from '../StudentDashboard/Sidebar';
import filee from "./QueueTheory.pdf"
import "./resource.css";

function ResourceViewPdf(){
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    const handleNext = () =>{
        
        if(pageNumber>=numPages){

        }
    }

    return(
        <>
        <div className='pdfcontainer'>
        <div style={{"textAlign":"center"}}>
            <nav>
                <button className='toggle' onClick={handleNext}>Next</button>
                <button className='toggle'>Previous</button>
            </nav>
        </div>
        <div className='content'>
        <h1>
            Preview
        </h1>
        <Document file="https://drive.google.com/file/d/1PTrl_M239d-Cg5xcwkHHk0M75z7M7kju/view?usp=sharing" onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber}></Page>
        </Document>
        </div>
        </div>
        </>
    );
}

export default ResourceViewPdf;