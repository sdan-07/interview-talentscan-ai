import { useState, type FormEvent } from "react";
import { useReport } from "../../../hooks/useReport";
import { Link, useNavigate } from "react-router-dom";
import UserMenu from "../../../components/UserMenu";

export default function InterviewHome() {
  const [dragActive, setDragActive] = useState(false);
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");

  const { loading, handleGenerateReport, handleDeleteReportById, report } =
    useReport();

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
  const navigation = useNavigate();

  const handleGenerate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!resume) return;

    const generate = await handleGenerateReport({
      resume,
      jobDescription,
      selfDescription,
    });
    if (generate?._id) navigation(`/report/${generate._id}`);
  };

  return (
    <main className="min-h-screen bg-[#131314] text-[#e5e2e3] font-sans">
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#131314]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <div>
            <Link to="/home">
              <p className="font-semibold uppercase tracking-[0.2em] text-pink-300 cursor-pointer">
                TalentScan AI <span className="text-4xl">.</span>
              </p>
            </Link>
            
            {/* <p className="mt-1 text-sm text-[#dfbec9]">
              Resume intelligence workspace
            </p> */}
          </div>

          <UserMenu />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-14 md:px-12 md:py-20 text-center max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-pink-300 mb-4">
          Transform Your Resume with AI Insights
        </h1>

        <p className="max-w-3xl mx-auto text-[#dfbec9] text-base md:text-lg leading-7">
          AI-powered resume analysis to match your overall skills with
          high-growth job roles. Upload your profile and get deep
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
                    placeholder="Paste the job posting and its requirements here..."
                    className="w-full rounded-2xl bg-[#353436] border border-[#584049] p-4 text-white placeholder:text-[#a68993] focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>

                {/* Self Description */}
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
                  className="w-full md:w-auto px-8 py-4 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white font-semibold shadow-lg transition active:scale-95 cursor-pointer"
                >
                  {loading && (
                    <span className="inline-block mt-1 mr-1.5 w-4 h-4 border-2 border-white/20 border-t-white rounded-3xl animate-spin" />
                  )}
                  {loading ?  "Generating..." : (<><span className="brightness-0 invert">✨</span>  Generate my report</>)}
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
                  Instantly identify weak areas, missing skills, and optimization opportunities in your resume.
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
                  Smart Hiring Insights
                </span>
              </div>

              <p className="text-sm leading-6 opacity-90">
                Receive intelligent feedback tailored to improve your chances of landing interviews.
              </p>
            </div>
          </div>

          {/* Generated Reports */}
          <div className="lg:col-span-12 bg-[#1c1b1c] border border-[#584049] rounded-2xl p-6 md:p-8 shadow-xl mt-15">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
              <div>
                <p className="text-sm font-semibold tracking-wide uppercase text-pink-300">
                  Generated Reports
                </p>
                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  Previous resume matches
                </h2>
              </div>

              <p className="text-sm text-[#dfbec9]">
                Review your latest AI-generated role alignment snapshots.
              </p>
            </div>

            <div
              className={`grid grid-cols-1 ${!report ? "md:grid-cols-1" : "md:grid-cols-3"} gap-4`}
            >
              {!report || report.length === 0 ? (
                <div className="md:col-span-3 border border-dashed border-[#584049] bg-[#2a2a2b]/60 rounded-2xl px-6 py-12 flex flex-col items-center justify-center text-center">
                  <h3 className="text-2xl font-semibold italic  text-white mb-5">
                    No reports yet
                  </h3>
                  <p className="text-[#dfbec9] text-sm leading-6 max-w-md">
                    Generate your first resume match report and it will appear
                    here.
                  </p>
                </div>
              ) : (
                report?.map((item) => (
                  <div
                    key={item._id}
                    className="bg-[#2a2a2b] border border-[#584049] rounded-2xl p-5 transition hover:border-pink-400/70 hover:bg-[#302f31] cursor-pointer"
                    onClick={() => navigation(`/report/${item._id}`)}
                  >
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div className="bg-pink-500/10 h-11 w-11 rounded-xl flex items-center justify-center text-pink-300 text-lg">
                        📝
                      </div>

                      <div className="flex gap-3">
                        <div className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/40 text-pink-200 text-sm font-semibold">
                          {item.matchScore}%
                        </div>

                        <div
                          className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-400/40 text-pink-200 text-sm font-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteReportById(item._id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                            aria-hidden="true"
                          >
                            <path d="M3 6h18" />
                            <path d="M8 6V4h8v2" />
                            <path d="M19 6l-1 14H6L5 6" />
                            <path d="M10 11v6" />
                            <path d="M14 11v6" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg text-white mb-3">
                      {item.title}
                    </h3>

                    <div className="flex items-center justify-between gap-4 border-t border-[#584049] pt-4">
                      <span className="text-sm text-[#dfbec9] text-right">
                        {new Date(item.createdAt).toLocaleDateString("en-us", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
