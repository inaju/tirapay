import { Button } from "@/components/ui/button";
import React from "react";
import { Document, Page } from "react-pdf";

const index = () => {
  const samplePdf = "/sample-pdf-file.pdf";
  return (
    <main
      className={`  rounded-lg flex min-h-screen flex-col items-center justify-between p-10 pt-24`}
    >
      <div className="space-y-4 w-[350px] border border-slate-300 rounded-lg p-4">
        <h1>You can now download your receipt</h1>
        <iframe
          src={
            "https://www.learningcontainer.com/wp-content/uploads/2019/09/sample-pdf-file.pdf"
          }
          height="300px"
          width="300px"
        />
        <Button onClick={() => downloadPdf(samplePdf, `Receipt Download`)}>
          Download Pdf
        </Button>
      </div>
    </main>
  );
};

export default index;

function downloadPdf(pdfUrl, pdfName) {
  try {
    fetch(pdfUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = pdfName;
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }, 0);
      })
      .catch((error) => {
        console.error("Error downloading the PDF:", error);
      });
  } catch (err) {
    console.log("this is the error", err);
  }
}
