"use client";

import { useState } from "react";
import axios from "axios";

export default function UploadCard() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };

  const handleProcess = async () => {
    if (!file) {
      alert("Please select a PDF first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        "https://myntra-label-extractor-backend-production.up.railway.app/extract-label",
        formData,
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([response.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = `label_${file.name}`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error(error);
      alert("Label extraction failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm p-10">
      <h1 className="text-center text-5xl font-bold text-gray-900">
        Myntra Label Extractor
      </h1>

      <p className="text-center text-black mt-3 font-medium">
        Convert Myntra Invoices into Print-Ready Shipping Labels
      </p>

      <p className="text-center text-green-600 mt-3 font-medium">
        Fast • Accurate • Print Ready
      </p>

      <div className="mt-10 border-2 border-dashed border-gray-300 rounded-2xl p-12">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
            📄
          </div>

          <h3 className="text-xl font-semibold mt-4 text-black">
            Upload Myntra Invoice PDF
          </h3>

          

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            id="pdf-upload"
            onChange={handleFileChange}
          />

          <label
            htmlFor="pdf-upload"
            className="mt-6 px-6 py-3 bg-black text-white rounded-xl cursor-pointer hover:bg-gray-800 transition"
          >
            Choose PDF
          </label>

          {fileName && (
            <div className="mt-4 text-green-600 font-medium text-center">
              Selected File: {fileName}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 bg-gray-50 rounded-2xl p-5">
        <h3 className="font-semibold mb-3 text-lg text-blue-800">
          Supported Features
        </h3>

        <ul className="space-y-2 text-gray-600">
          <li>✅ Myntra Invoice Upload</li>
          <li>✅ Automatic Label Detection</li>
          <li>✅ Barcode-Based Extraction</li>
          <li>✅ Print Ready PDF Output</li>
          <li>✅ Fast Processing</li>
        </ul>
      </div>

      <button
        onClick={handleProcess}
        disabled={loading}
        className="w-full mt-8 bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : "Extract Myntra Label"}
      </button>

      <div className="mt-5 text-center text-green-600 font-medium">
        {loading
          ? "Extracting Label..."
          : fileName
          ? "Ready For Label Extraction"
          : "Waiting For PDF Upload"}
      </div>
    </div>
  );
}