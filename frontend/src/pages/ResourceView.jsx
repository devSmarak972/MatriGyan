import React, { useCallback, useEffect, useRef, useState } from "react";
import Sidebar from "../components/StudentDashboard/Sidebar";
import ResourceViewPdf from "../components/Resources/ResourceViewPdf";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function ResourceView(props) {
  const nav = useNavigate();
  const { ID } = useParams();
  const pdfRef = useRef(null);

  const [data, setData] = useState({});

  if (props.user.current.code === 0) {
    toast("Please Login First!");
    nav("/login");
  }

  useEffect(() => {
    axios
      .get(`http://localhost:8000/get-resource/${ID}/`)
      .then((res) => setData(res.data.resource))
      .catch((e) => console.log(e));
  }, []);

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

  console.log(data);
  if (JSON.stringify(data) === "{}") return null;

  return (
    <div className="min-h-[100vh] flex grow bg-slate-50 dark:bg-navy-900 tw-dash-page">
      <Sidebar user={props.user} />
      <div className="main-content w-full px-[var(--margin-x)] flex flex-col lg:flex-row gap-8 mb-[var(--margin-x)]">
        <div className="flex flex-column gap-4 w-1/2">
          <span className="font-semibold text-xl">{data.title}</span>
          {data.description && <p>{data.description}</p>}
          <div className="flex justify-between items-center">
            {/* <div className="flex flex-col gap-2"> */}
            <div className="flex gap-2">
              <div className="avatar h-12 w-12">
                <img
                  className="rounded-full"
                  src="https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png"
                  alt="avatar"
                />
              </div>
              <div className="flex gap-1 flex-column">
                <span>Created by:</span>
                <span className="text-base font-semibold">Ojas Modak</span>
                {/* <span className="text-xs">14/07/2023</span> */}
              </div>
            </div>
            {/* </div> */}
            {/* <button
              onClick={handleDownload}
              className="font-semibold bg-[var(--primary)] text-white rounded-xl px-4 py-2 w-fit h-fit"
            >
              Download
              <FontAwesomeIcon icon={faDownload} />
            </button> */}
          </div>
        </div>
        <ResourceViewPdf pdfRef={pdfRef} url={data.file_url} />
      </div>
    </div>
  );
}

export default ResourceView;
