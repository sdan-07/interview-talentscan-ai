import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useReport } from "../../../hooks/useReport";

export default function InterviewHome() {
  const navigate = useNavigate();
  const [dragActive, setDragActive] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");

  const { loading, handleGenerateReport } = useReport();

  const handleResume = (file: File) => {
    setResume(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleResume(e.dataTransfer.files[0]);
    }
  };

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleGenerateReport({ resume, jobDescription, selfDescription });
    console.log("report generated successfully");
    navigate("/result");
  };

  return (
    <main className="min-h-screen bg-[#131314] text-[#e5e2e3] font-sans">
      {/* Hero Section */}
      <section className="px-6 py-16 md:px-12 md:py-24 text-center max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-pink-300 mb-4">
          Optimize Your Tech Stack Alignment
        </h1>

        <p className="max-w-3xl mx-auto text-[#dfbec9] text-base md:text-lg leading-7">
          AI-powered resume analysis to match your technical skills with
          high-growth engineering roles. Upload your profile and get deep
          insights on architecture patterns and keyword relevance.
        </p>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Side */}
          <div className="lg:col-span-8 bg-[#1c1b1c] border border-[#584049] rounded-2xl p-6 md:p-10 shadow-xl">
            <form className="space-y-8" onSubmit={handleGenerate}>
              {/* Upload Section */}
              <div className="space-y-3">
                <label className="text-sm font-semibold tracking-wide uppercase">
                  Resume Upload
                </label>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                  }}
                  onDragLeave={() => setDragActive(false)}
                  onDrop={handleDrop}
                  className={`
                    relative border-2 border-dashed rounded-2xl p-10
                    flex flex-col items-center justify-center
                    transition-all duration-200 cursor-pointer
                    ${
                      dragActive
                        ? "border-pink-400 bg-pink-500/10"
                        : "border-[#a68993] bg-[#201f20] hover:bg-[#2a2a2b]"
                    }
                  `}
                >
                  {/* Hidden Input */}
                  <input
                    type="file"
                    accept=".pdf"
                    name="resume"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    required
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleResume(e.target.files[0]);
                      }
                    }}
                  />

                  <div className="text-pink-300 text-6xl mb-4">☁️</div>

                  <p className="font-semibold text-lg">
                    Click or drag your resume here
                  </p>

                  <p className="text-sm text-[#a68993] mt-1">PDF • Max 3MB</p>

                  {resume && (
                    <div className="mt-5 px-4 py-2 rounded-xl bg-pink-500/10 border border-pink-400 text-pink-200 text-sm">
                      Uploaded: {resume.name}
                    </div>
                  )}
                </div>
              </div>

              {/* Textareas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Job Description */}
                <div className="space-y-3">
                  <label
                    htmlFor="job-desc"
                    className="text-sm font-semibold tracking-wide uppercase"
                  >
                    Job Description
                  </label>

                  <textarea
                    id="job-desc"
                    name="jobDescription"
                    rows={8}
                    required
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the technical job requirements here..."
                    className="w-full rounded-2xl bg-[#353436] border border-[#584049] p-4 text-white placeholder:text-[#a68993] focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Technical Profile */}
                <div className="space-y-3">
                  <label
                    htmlFor="self-desc"
                    className="text-sm font-semibold tracking-wide uppercase"
                  >
                    Self Description
                  </label>

                  <textarea
                    id="self-desc"
                    name="selfDescription"
                    rows={8}
                    required
                    onChange={(e) => setSelfDescription(e.target.value)}
                    placeholder="Describe your profile as a summary in breif..."
                    className="w-full rounded-2xl bg-[#353436] border border-[#584049] p-4 text-white placeholder:text-[#a68993] focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
              </div>

              {/* Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full md:w-auto px-10 py-4 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-semibold shadow-lg transition active:scale-95"
                >
                  {loading && (
                    <span
                      className="inline-block mt-1 mr-1.5 w-4 h-4 border-2 border-white/20 border-t-white rounded-3xl animate-spin" 
                    />
                  )}
                  {loading ? "Generating..." : "Generate my result"}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Card 1 */}
            <div className="bg-[#2a2a2b] border border-[#584049] rounded-2xl p-6 flex gap-4">
              <div className="bg-pink-500/10 h-12 w-12 rounded-xl flex items-center justify-center text-pink-300 text-xl">
                ⚡
              </div>

              <div>
                <h3 className="font-semibold mb-1">Instant Analysis</h3>

                <p className="text-[#dfbec9] text-sm leading-6">
                  Get deep technical insights on your stack alignment and
                  architecture patterns in seconds.
                </p>
              </div>
            </div>

            {/* Image Card */}
            <div className="overflow-hidden rounded-2xl border border-[#584049] flex-1 min-h-[320px]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiO7zkAiT0DMcHNxSXToVx0-cvMPO9q6xGE9CKq5F0auTAgwjWZWzIEYs3dtUicX1_fUnEwzHEi3Cx92qbTfEnz5HzNgjfli1u4LcobgnUtVYdCazVErd2cyuEbSwlM05eumJFDjl3OZ1q7ClX36VC3ML22usqoo8hCLHPVLiKgUZqRezFF5XWVZMNOMT6TgMtjhcziXg7_TaAUaHaPXFJjfqt2s_zezI6FOndEGZjLbT6TZW_PYLCeC4LjdxGr5RhBJuylter4l67"
                alt="Tech workspace"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
            </div>

            {/* Card 2 */}
            <div className="bg-[#97406d] text-pink-100 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-2">
                <span>✔️</span>
                <span className="font-semibold uppercase text-sm tracking-wide">
                  Engineering Grade
                </span>
              </div>

              <p className="text-sm leading-6 opacity-90">
                Our AI engine benchmarks your profile against standards from
                top-tier tech firms.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
