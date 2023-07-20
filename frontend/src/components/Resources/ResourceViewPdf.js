// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";
// import Sidebar from "../StudentDashboard/Sidebar";
// import filee from "./QueueTheory.pdf";
// import "./resource.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

// function ResourceViewPdf() {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);
//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   const handleNext = () => {
//     if (pageNumber >= numPages) {
//     }
//   };

//   return (
//     <>
//       <div className="pdfcontainer">
//         <div style={{ textAlign: "center" }}>
//           <nav>
//             <button className="toggle" onClick={handleNext}>
//               Next
//             </button>
//             <button className="toggle">Previous</button>
//           </nav>
//         </div>
//         <div className="content">
//           <h1>Preview</h1>
//           <Document
//             file="https://drive.google.com/file/d/1PTrl_M239d-Cg5xcwkHHk0M75z7M7kju/preview"
//             onLoadSuccess={onDocumentLoadSuccess}
//           >
//             <Page pageNumber={pageNumber}></Page>
//           </Document>
//         </div>
//       </div>
//     </>
//   );
// }

// export default ResourceViewPdf;

import React from "react";

function convertToEmbedLink(googleDriveLink) {
  const fileId = googleDriveLink.match(/\/d\/(.+?)\//)[1];
  const embedLink = `https://drive.google.com/file/d/${fileId}/preview`;
  return embedLink;
}

const googleDrivePdfLink =
  "https://drive.google.com/file/d/1bg5bEeSyeVd-_MJ84tU0hIGdV23gYLBVnAAsOjYdsHA/view?usp=sharing";
const embedPdfLink = convertToEmbedLink(googleDrivePdfLink);

const ResourceViewPdf = (props) => {
  return (
    <div className="lg:min-w-[600px] h-full min-h-[400px]">
      <iframe
        title="Preview"
        src={convertToEmbedLink(props.url)}
        className="w-full h-full"
        ref={props.pdfRef}
      />
    </div>
  );
};

export default ResourceViewPdf;
