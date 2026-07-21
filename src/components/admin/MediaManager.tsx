"use client";

import { useState, useEffect } from "react";
import { Upload, Copy, Check, FileImage, Trash } from "lucide-react";
import Image from "next/image";

export function MediaManager() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [successUrl, setSuccessUrl] = useState("");
  const [recentUploads, setRecentUploads] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("print_dekho_uploads");
    if (saved) {
      try {
        setRecentUploads(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setMessage("");
      setSuccessUrl("");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage("");
    setSuccessUrl("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setSuccessUrl(data.url);
        setMessage("File uploaded successfully!");
        setFile(null);

        const updated = [data.url, ...recentUploads.filter(url => url !== data.url)].slice(0, 16);
        setRecentUploads(updated);
        localStorage.setItem("print_dekho_uploads", JSON.stringify(updated));
      } else {
        setMessage(data.message || "Upload failed");
      }
    } catch (err) {
      setMessage("Server connection error during upload");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const clearHistory = () => {
    setRecentUploads([]);
    localStorage.removeItem("print_dekho_uploads");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-extrabold text-xl text-secondary">Media Manager</h2>
        <p className="text-muted text-xs mt-1">Upload brand images, product photos, and banners to use across the site.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Card */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 border border-border shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-heading font-extrabold text-sm text-secondary mb-4 flex items-center gap-2">
              <Upload size={16} className="text-accent" /> Upload New File
            </h3>
            <form onSubmit={handleUpload} className="space-y-4">
              <div className="border-2 border-dashed border-border/80 hover:border-accent/40 rounded-[20px] p-6 text-center transition-colors relative cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <FileImage className="w-10 h-10 text-muted/60 group-hover:text-accent/80 mx-auto transition-colors" />
                <p className="mt-3 text-xs text-secondary font-bold">
                  {file ? file.name : "Select an image file"}
                </p>
                <p className="text-[10px] text-muted mt-1">PNG, JPG, JPEG or WEBP up to 5MB</p>
              </div>

              {message && (
                <div className={`p-3 rounded-lg text-xs font-semibold ${
                  successUrl ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
                }`}>
                  {message}
                </div>
              )}

              {successUrl && (
                <div className="p-3 bg-stone border border-border rounded-xl space-y-2">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-muted">Uploaded Path (Copy this):</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value={successUrl}
                      className="w-full bg-white px-2.5 py-1.5 border border-border rounded-lg text-[11px] font-mono text-secondary"
                    />
                    <button
                      type="button"
                      onClick={() => copyToClipboard(successUrl, -1)}
                      className="p-1.5 bg-accent text-white rounded-lg cursor-pointer shadow-xs hover:bg-accent/90"
                    >
                      {copiedIndex === -1 ? <Check size={13} /> : <Copy size={13} />}
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={!file || uploading}
                className="w-full py-3 bg-secondary hover:bg-secondary/90 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50 transition-colors"
              >
                {uploading ? "Uploading file..." : "Upload File"}
              </button>
            </form>
          </div>
        </div>

        {/* History Gallery */}
        <div className="bg-white rounded-[24px] p-6 md:p-8 border border-border shadow-sm lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading font-extrabold text-sm text-secondary">Recently Uploaded Files</h3>
            {recentUploads.length > 0 && (
              <button
                onClick={clearHistory}
                className="text-[10px] font-bold text-red-600 hover:underline cursor-pointer"
              >
                Clear History
              </button>
            )}
          </div>

          {recentUploads.length === 0 ? (
            <div className="text-center py-16 text-muted text-xs bg-stone/20 rounded-[20px]">
              No uploaded files found in history cache.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {recentUploads.map((url, index) => (
                <div
                  key={index}
                  className="bg-stone/30 border border-border/80 rounded-[18px] overflow-hidden flex flex-col justify-between group hover:border-accent/15 transition-all"
                >
                  <div className="relative h-28 w-full bg-stone/60 overflow-hidden">
                    <Image
                      src={url}
                      alt="Uploaded media"
                      fill
                      className="object-cover group-hover:scale-102 transition-transform duration-500"
                      sizes="15vw"
                    />
                  </div>
                  <div className="p-3 bg-white border-t border-border/40">
                    <p className="text-[10px] font-mono text-secondary truncate mb-2">{url}</p>
                    <button
                      onClick={() => copyToClipboard(url, index)}
                      className="w-full py-1.5 flex items-center justify-center gap-1.5 bg-stone hover:bg-accent/5 text-muted hover:text-accent rounded-lg text-[10px] font-bold cursor-pointer transition-colors border border-border"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check size={11} /> Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={11} /> Copy Link
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
