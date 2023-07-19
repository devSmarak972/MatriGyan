import React, { useCallback, useRef } from "react";
import Sidebar from "../components/StudentDashboard/Sidebar";
import ResourceViewPdf from "../components/Resources/ResourceViewPdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

function ResourceView() {
  const pdfRef = useRef(null);

    const handleDownload = useCallback(async () => {
      try {
        const response = await fetch(pdfRef.current.src);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "download.pdf";
        link.click();
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    }, []);

  return (
    <div className="min-h-[100vh] flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
      <Sidebar />
      <div className="main-content w-full px-[var(--margin-x)] flex flex-col lg:flex-row gap-8 mb-[var(--margin-x)]">
        <div className="flex flex-column gap-4">
          <span className="font-semibold text-xl">
            Integral Calculus Formulae
          </span>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. A
            accusamus excepturi eveniet cum quae, nesciunt delectus, deserunt
            aliquid molestiae assumenda modi mollitia dolores ipsam repellendus
            adipisci amet ipsum illo unde quis tempore esse officiis hic
            distinctio. Repudiandae non culpa quaerat consectetur quae
            temporibus voluptatibus, neque necessitatibus? A omnis eveniet
            accusamus minima exercitationem minus possimus facilis eligendi
            laudantium dolorum. Eius, sit debitis quia eveniet nostrum alias
            laudantium delectus distinctio maiores aliquam, fuga incidunt omnis
            quibusdam. Officiis?
          </p>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <span>Created by:</span>
              <div className="flex gap-2">
                <div className="avatar h-12 w-12">
                  <img
                    className="rounded-full"
                    src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
                    alt="avatar"
                  />
                </div>
                <div className="flex gap-1 flex-column">
                  <span className="text-base font-semibold">Ojas Modak</span>
                  <span className="text-xs">14/07/2023</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleDownload}
              className="font-semibold bg-[var(--primary)] text-white rounded-xl px-4 py-2 w-fit h-fit"
            >
              Download
              <FontAwesomeIcon icon={faDownload} />
            </button>
          </div>
        </div>
        <ResourceViewPdf
          pdfRef={pdfRef}
          url={
            "https://drive.google.com/file/d/1Q91g5B6F96AbtGEJoZP3pM8Gm9hhhfkl/view"
          }
        />
      </div>
    </div>
  );
}

export default ResourceView;
