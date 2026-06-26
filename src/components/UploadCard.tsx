"use client";

import { useState } from "react";
import axios from "axios";

interface Product {
  sku: string;
  size: string;
  qty: number;
}

export default function UploadCard() {
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setProducts([]);
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
        "https://myntra-label-extractor-backend-production.up.railway.app/process-pdf",
        formData
      );

      setProducts(response.data.products || []);
    } catch (error) {
      console.error(error);
      alert("Bhai PDF samajh nhi aya, original inovice pdf upload karen");
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
        Extract SKU Details From Myntra Invoices
      </p>

      <p className="text-center text-green-600 mt-3 font-medium">
        SKU • Size • Quantity
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

      <button
        onClick={handleProcess}
        disabled={loading}
        className="w-full mt-8 bg-black text-white py-4 rounded-2xl text-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : "Extract SKU Details"}
      </button>

      {products.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-black mb-4">
            Extract Myntra Label
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3 border text-left text-black">
                    SKU
                  </th>

                  <th className="p-3 border text-left text-black">
                    Size
                  </th>

                  <th className="p-3 border text-left text-black">
                    Qty
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="p-3 border text-black">
                      {product.sku}
                    </td>

                    <td className="p-3 border text-black">
                      {product.size}
                    </td>

                    <td className="p-3 border text-black">
                      {product.qty}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-5 text-center text-green-600 font-medium">
        {loading
          ? "Processing Invoice..."
          : fileName
          ? "Ready"
          : "Waiting For PDF Upload"}
      </div>
    </div>
  );
}