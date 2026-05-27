import { useEffect, useState } from "react";
import { useReport } from "../../../hooks/useReport";
import type { QuestionType } from "../../../types/report.types";
import NotFound from "../../../components/NotFound";
import UserMenu from "../../../components/UserMenu";

export default function ShowReport() {
  const [activeTab, setActiveTab] = useState("technical");
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const { report, reportNotFound } = useReport();
  const currentReport = report?.at(-1) ?? null;
  const formatSeverity = (severity = "low") =>
    severity.charAt(0).toUpperCase() + severity.slice(1);

  useEffect(()=>{
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  },[]);

  if (reportNotFound) {
    return <NotFound />;
  }

  const renderAccordion = (items: QuestionType[]) => {
    return items.map((item, index) => (
      <div
        key={index}
        className="
          group
          bg-[#1b1b1d]/80
          backdrop-blur-xl
          border border-[#584049]
          rounded-3xl
          overflow-hidden
          transition-all duration-300
          hover:border-pink-500/40
          hover:shadow-[0_0_35px_rgba(236,72,153,0.10)]
        "
      >
        <button
          onClick={() =>
            setOpenAccordion(openAccordion === index ? null : index)
          }
          className="
            w-full
            p-7
            text-left
            flex items-start justify-between gap-4
            transition-all duration-300
            hover:bg-white/[0.02]
            active:scale-[0.99]
          "
        >
          <div>
            <span
              className="
                inline-flex items-center
                px-3 py-1
                rounded-full
                text-[11px]
                uppercase tracking-[0.2em]
                bg-pink-500/10
                border border-pink-500/20
                text-pink-300
                mb-4
              "
            >
              {item.category ?? activeTab}
            </span>

            <h3
              className="
                text-white
                text-xl
                font-semibold
                leading-relaxed
                group-hover:text-pink-100
                transition-colors
              "
            >
              {item.question}
            </h3>
          </div>

          <div
            className={`
              mt-1 text-pink-300 text-xl
              transition-transform duration-300
              ${openAccordion === index ? "rotate-180" : ""}
            `}
          >
            ▼
          </div>
        </button>

        {/* Animated Content */}
        <div
          className={`
            grid overflow-hidden transition-all duration-500 ease-in-out
            ${
              openAccordion === index
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }
          `}
        >
          <div className="overflow-hidden">
            <div className="px-7 pb-7 space-y-5">
              {/* Intention Card */}
              <div
                className="
                  bg-gradient-to-br
                  from-[#2a2a2d]
                  to-[#232326]
                  border border-white/5
                  rounded-2xl
                  p-5
                "
              >
                <p
                  className="
                    text-pink-300
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    mb-3
                    font-bold
                  "
                >
                  Intention
                </p>

                <p className="text-[#d8c7cf] leading-7 text-[15px]">
                  {item.intention}
                </p>
              </div>

              {/* Answer */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-2xl
                  border border-pink-500/10
                  bg-pink-500/[0.03]
                  p-5
                "
              >
                <div
                  className="
                    absolute left-0 top-0
                    h-full w-1
                    bg-gradient-to-b
                    from-pink-400
                    to-pink-600
                  "
                />

                <p
                  className="
                    uppercase
                    text-sm
                    tracking-widest
                    font-bold
                    mb-3
                    text-pink-200
                  "
                >
                  Model Answer
                </p>

                <p
                  className="
                    italic
                    text-[#dfbec9]
                    leading-8
                    text-[15px]
                  "
                >
                  "{item.answer}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <main
      className="
        min-h-screen
        bg-[#131314]
        text-[#e5e2e3]
        font-sans
        overflow-hidden
        px-32
      "
    >
      {/* navbar */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#131314]/85 backdrop-blur-xl">
              <div className="flex max-w-[1700px] items-center justify-between py-4">
                
                  <p className=" font-semibold uppercase tracking-[0.2em] text-pink-300">
                    TalentScan AI <span className="text-4xl">.</span>
                  </p>
                <UserMenu />
              </div>
            </header>

      {/* Background Glow */}
      <div
        className="
          fixed top-[-200px] left-[-100px]
          w-[500px] h-[500px]
          bg-pink-500/10
          blur-[140px]
          rounded-full
          pointer-events-none
        "
      />

      <div
        className="
          fixed bottom-[-200px] right-[-100px]
          w-[500px] h-[500px]
          bg-fuchsia-500/10
          blur-[140px]
          rounded-full
          pointer-events-none
        "
      />

      <div className="flex max-w-[1700px] mx-auto relative z-10">
        {/* Sidebar */}
        <aside
          className="
            hidden md:flex
            flex-col
            w-72
            border-r border-white/5
            p-6
            gap-3
            sticky top-0
            h-screen
            backdrop-blur-xl
            bg-black/10
            mt-15
          "
        >
          {/* <div className="mb-8">
            <h1
              className="
                text-3xl
                font-black
                tracking-tight
                bg-gradient-to-r
                from-pink-300
                to-fuchsia-400
                bg-clip-text
                text-transparent
              "
            >
              CareerPulse
            </h1>

            <p className="text-sm text-[#9f8d96] mt-2 leading-6">
              AI-powered interview preparation insights.
            </p>
          </div> */}

          {["technical", "behavioral", "roadmap"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenAccordion(null);
              }}
              className={`
                text-left
                px-5 py-4
                rounded-2xl
                capitalize
                transition-all duration-300
                cursor-pointer
                border
                ${
                  activeTab === tab
                    ? "bg-pink-500/10 border-pink-500/20 text-pink-300 shadow-[0_0_20px_rgba(236,72,153,0.08)]"
                    : "border-transparent text-[#c6b6bf] hover:bg-white/[0.03]"
                }
              `}
            >
              {tab}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <section
          className="
            flex-1
            px-6 md:px-10
            py-10 md:py-14
          "
        >
          {/* Hero */}
          <div className="mb-14">
            <div
              className="
                inline-flex items-center
                gap-2
                px-4 py-2
                rounded-full
                border border-pink-500/20
                bg-pink-500/5
                text-pink-300
                text-sm
                mb-6
              "
            >
              ✦ AI Interview Analysis Completed
            </div>

            <h2
              className="
                text-5xl md:text-6xl
                font-black
                tracking-tight
                leading-tight
                max-w-4xl
              "
            >
              {(currentReport?.matchScore ?? 0) <= 77 ? "Uh-oh! Your Profile Requires" : "Excellent! Your Profile shows"}  <br />{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-pink-300
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                "
              >
                {(currentReport?.matchScore ?? 0) <= 77 ? "Better Alignment" : "High Match Score"}
              </span>
            </h2>

            <p
              className="
                text-[#b7a6af]
                text-lg
                mt-6
                leading-8
                max-w-3xl
              "
            >
              We benchmarked your profile against Lead
              Architect-level requirements and generated optimized
              preparation insights.
            </p>
          </div>

          {/* Technical */}
          {activeTab === "technical" && (
            <div className="space-y-6">
              {renderAccordion(currentReport?.technicalQuestions || [])}
            </div>
          )}

          {/* Behavioral */}
          {activeTab === "behavioral" && (
            <div className="space-y-6">
              {renderAccordion(currentReport?.behavioralQuestions || [])}
            </div>
          )}

          {/* Roadmap */}
          {activeTab === "roadmap" && (
            <div className="space-y-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-4xl font-bold text-white">
                  {currentReport?.preparationPlan?.length}-Day Preparation Roadmap
                </h2>

                <div
                  className="
                    px-4 py-2
                    rounded-full
                    bg-pink-500/10
                    border border-pink-500/20
                    text-pink-300
                    text-sm
                  "
                >
                  Priority Focus Areas
                </div>
              </div>

              {(currentReport?.preparationPlan || []).map((plan, index) => {
                const daySkillGap = currentReport?.skillGaps?.[index];
                const dayDifficulty = formatSeverity(daySkillGap?.severity);

                return (
                  <div key={plan.day} className="flex gap-6">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div
                      className="
                        w-11 h-11
                        rounded-2xl
                        bg-gradient-to-br
                        from-pink-500
                        to-fuchsia-600
                        flex items-center justify-center
                        font-bold
                        shadow-lg shadow-pink-500/20
                      "
                    >
                      {plan.day}
                    </div>

                    {plan.day !== 3 && (
                      <div
                        className="
                          w-[2px]
                          flex-1
                          bg-gradient-to-b
                          from-pink-500/40
                          to-transparent
                          mt-3
                        "
                      />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className="
                      flex-1
                      bg-[#1b1b1d]/80
                      backdrop-blur-xl
                      border border-white/5
                      rounded-3xl
                      p-7
                      hover:border-pink-500/20
                      transition-all duration-300
                    "
                  >
                    <h3 className="text-2xl font-bold mb-5">
                      Day {plan.day}: Preparation Focus
                    </h3>

                    <div
                      className="
                        bg-red-500/10
                        border border-red-400/20
                        rounded-2xl
                        p-5
                        mb-5
                      "
                    >
                      <p className="text-red-300 leading-7">
                        <span className="font-bold">
                          Urgent Skill Gap:
                        </span>{" "}
                        {(currentReport?.skillGaps || [])
                          .map((gap) => gap.skill)
                          .join(" / ") || "No urgent gaps found"}
                      </p>
                    </div>

                    {/* Priority Badge */}
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                      <span className="text-sm text-[#b7a6af] font-medium">
                        Difficulty:
                      </span>

                      <div className="flex gap-2">
                        <span
                          className="
                            px-3 py-1
                            rounded-full
                            text-xs
                            font-semibold
                            border
                            border-green-500/20
                            bg-green-500/10
                            text-green-300
                          "
                        >
                          {dayDifficulty}
                        </span>
                      </div>
                    </div>

                    <ul className="space-y-4 text-[#d3c1ca]">
                      {plan.tasks.map((task) => (
                        <li key={task} className="flex gap-3">
                          <span className="text-pink-300">✦</span>
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Right Sidebar */}
        <aside
          className="
            hidden xl:flex
            flex-col
            w-80
            p-6
            border-l border-white/5
            backdrop-blur-xl
            bg-black/10
          "
        >
          {/* Match Card */}
          <div
            className="
              bg-[#1b1b1d]/90
              border border-white/5
              rounded-3xl
              p-7
              mb-6
            "
          >
            <p
              className="
                uppercase
                tracking-[0.3em]
                text-xs
                text-[#a6959d]
                mb-6
              "
            >
              Overall Match
            </p>

            <div className="relative w-52 h-52 mx-auto">
              <svg
                className="w-full h-full -rotate-90"
                viewBox="0 0 120 120"
              >
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  strokeWidth="8"
                  fill="none"
                  className="stroke-[#2d2d31]"
                />

                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  strokeWidth="8"
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray="339.29"
                  strokeDashoffset="23"
                  className="stroke-pink-500"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-black text-pink-300">
                  {currentReport?.matchScore}%
                </span>

                <span className="text-sm text-[#a6959d] mt-2">
                  {(currentReport?.matchScore ?? 0) <= 75 ? "Weak match" : "Strong match" }
                </span>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div
            className="
              bg-[#1b1b1d]/90
              border border-white/5
              rounded-3xl
              p-7
            "
          >
            <h3 className="font-bold text-xl mb-5">
              Missing Skills
            </h3>

            <div className="flex flex-wrap gap-3">
              {currentReport?.missingSkills.map(
                (skill) => (
                  <span
                    key={skill}
                    className="
                      px-4 py-2
                      rounded-full
                      border border-pink-500/10
                      bg-pink-500/[0.03]
                      text-sm
                      text-pink-100
                      hover:border-pink-500/30
                      hover:bg-pink-500/10
                      transition-all duration-300
                      cursor-pointer
                    "
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
