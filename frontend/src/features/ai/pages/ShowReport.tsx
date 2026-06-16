import { useEffect, useState } from "react";
import { useReport } from "../../../hooks/useReport";
import type { QuestionType } from "../../../types/report.types";
import NotFound from "../../../components/NotFound";
import UserMenu from "../../../components/UserMenu";
import { Link } from "react-router-dom";

export default function ShowReport() {
  const [activeTab, setActiveTab] = useState("technical");
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const { report, reportNotFound } = useReport();
  const currentReport = report?.at(-1) ?? null;
  const tabs = ["technical", "behavioral", "roadmap"];
  const formatSeverity = (severity = "low") =>
    severity.charAt(0).toUpperCase() + severity.slice(1);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  if (reportNotFound) {
    return <NotFound />;
  }

  const renderSummaryCards = () => (
    <>
      <div
        className="
          bg-[#1b1b1d]/90
          border border-white/5
          rounded-2xl
          p-5 sm:p-6 xl:p-7
        "
      >
        <p
          className="
            uppercase
            tracking-[0.25em]
            text-[11px] sm:text-xs
            text-[#a6959d]
            mb-5 sm:mb-6
          "
        >
          Overall Match
        </p>

        <div className="relative mx-auto h-36 w-36 sm:h-44 sm:w-44 xl:h-52 xl:w-52">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
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
            <span className="text-3xl font-black text-pink-300 sm:text-4xl xl:text-5xl">
              {currentReport?.matchScore ?? 0}%
            </span>

            <span className="mt-2 text-xs text-[#a6959d] sm:text-sm">
              {(currentReport?.matchScore ?? 0) <= 75
                ? "Weak match"
                : "Strong match"}
            </span>
          </div>
        </div>
      </div>

      <div
        className="
          bg-[#1b1b1d]/90
          border border-white/5
          rounded-2xl
          p-5 sm:p-6 xl:p-7
        "
      >
        <h3 className="mb-4 text-lg font-bold sm:mb-5 sm:text-xl">
          Missing Skills
        </h3>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {currentReport?.missingSkills.map((skill) => (
            <span
              key={skill}
              className="
                max-w-full
                break-words
                rounded-full
                border border-pink-500/10
                bg-pink-500/[0.03]
                px-3 py-2
                text-xs
                text-pink-100
                transition-all duration-300
                hover:border-pink-500/30
                hover:bg-pink-500/10
                sm:px-4 sm:text-sm
              "
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const renderAccordion = (items: QuestionType[]) => {
    return items.map((item, index) => (
      <div
        key={index}
        className="
          group
          bg-[#1b1b1d]/80
          backdrop-blur-xl
          border border-[#584049]
          rounded-2xl
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
            p-4 sm:p-5 lg:p-7
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
                uppercase tracking-[0.16em] sm:tracking-[0.2em]
                bg-pink-500/10
                border border-pink-500/20
                text-pink-300
                mb-3 sm:mb-4
              "
            >
              {item.category ?? activeTab}
            </span>

            <h3
              className="
                text-white
                text-base sm:text-lg lg:text-xl
                font-semibold
                leading-7 sm:leading-relaxed
                group-hover:text-pink-100
                transition-colors
                break-words
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
            <div className="space-y-4 px-4 pb-4 sm:px-5 sm:pb-5 lg:space-y-5 lg:px-7 lg:pb-7">
              {/* Intention Card */}
              <div
                className="
                  bg-gradient-to-br
                  from-[#2a2a2d]
                  to-[#232326]
                  border border-white/5
                  rounded-xl sm:rounded-2xl
                  p-4 sm:p-5
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

                <p className="break-words text-sm leading-6 text-[#d8c7cf] sm:text-[15px] sm:leading-7">
                  {item.intention}
                </p>
              </div>

              {/* Answer */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-xl sm:rounded-2xl
                  border border-pink-500/10
                  bg-pink-500/[0.03]
                  p-4 sm:p-5
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
                    break-words
                    text-[#dfbec9]
                    leading-7
                    text-sm sm:text-[15px] sm:leading-8
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
        overflow-x-hidden
        px-4 sm:px-6 lg:px-8 2xl:px-12
      "
    >
      {/* navbar */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-[#131314]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1700px] items-center justify-between py-3 sm:py-4">
          <Link to="/home">
            <p className="cursor-pointer text-sm font-semibold uppercase tracking-[0.16em] text-pink-300 sm:text-base sm:tracking-[0.2em]">
              TalentScan AI <span className="text-3xl sm:text-4xl">.</span>
            </p>
          </Link>
          <UserMenu />
        </div>
      </header>

      {/* Background Glow */}
      <div
        className="
          fixed top-[-200px] left-[-100px]
          w-[260px] h-[260px] sm:w-[500px] sm:h-[500px]
          bg-pink-500/10
          blur-[140px]
          rounded-full
          pointer-events-none
        "
      />

      <div
        className="
          fixed bottom-[-200px] right-[-100px]
          w-[260px] h-[260px] sm:w-[500px] sm:h-[500px]
          bg-fuchsia-500/10
          blur-[140px]
          rounded-full
          pointer-events-none
        "
      />

      <div className="relative z-10 mx-auto flex max-w-[1700px]">
        {/* Sidebar */}
        <aside
          className="
            hidden md:flex
            flex-col
            w-56 lg:w-64 2xl:w-72
            shrink-0
            border-r border-white/5
            p-4 lg:p-6
            gap-3
            sticky top-[61px] sm:top-[73px]
            h-[calc(100vh-61px)] sm:h-[calc(100vh-73px)]
            backdrop-blur-xl
            bg-black/10
            overflow-y-auto
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

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setOpenAccordion(null);
              }}
              className={`
                text-left
                px-4 py-3 lg:px-5 lg:py-4
                rounded-xl lg:rounded-2xl
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
            min-w-0
            px-0 md:px-6 lg:px-8 xl:px-10
            py-8 sm:py-10 md:py-12 lg:py-14
          "
        >
          {/* Hero */}
          <div className="mb-8 sm:mb-10 lg:mb-14">
            <div
              className="
                inline-flex items-center
                gap-2
                px-3 py-2 sm:px-4
                rounded-full
                border border-pink-500/20
                bg-pink-500/5
                text-pink-300
                text-xs sm:text-sm
                mb-5 sm:mb-6
                max-w-full
              "
            >
              ✦ AI Interview Analysis Completed
            </div>

            <h2
              className="
                text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl
                font-black
                tracking-tight
                leading-tight
                max-w-4xl
                break-words
              "
            >
              {(currentReport?.matchScore ?? 0) <= 77
                ? "Uh-oh! Your Profile Requires"
                : "Excellent! Your Profile shows"}{" "}
              <br />{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-pink-300
                  to-fuchsia-400
                  bg-clip-text
                  text-transparent
                "
              >
                {(currentReport?.matchScore ?? 0) <= 77
                  ? "Better Alignment"
                  : "High Match Score"}
              </span>
            </h2>

            <p
              className="
                text-[#b7a6af]
                text-base sm:text-lg
                mt-5 sm:mt-6
                leading-7 sm:leading-8
                max-w-3xl
              "
            >
              We benchmarked your profile against Lead Architect-level
              requirements and generated optimized preparation insights.
            </p>
          </div>

          <div className="mb-6 flex gap-2 overflow-x-auto pb-2 md:hidden">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setOpenAccordion(null);
                }}
                className={`
                  shrink-0
                  rounded-full
                  border
                  px-4 py-2
                  text-sm
                  capitalize
                  transition-all duration-300
                  ${
                    activeTab === tab
                      ? "bg-pink-500/10 border-pink-500/20 text-pink-300"
                      : "border-white/10 text-[#c6b6bf] hover:bg-white/[0.03]"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:hidden">
            {renderSummaryCards()}
          </div>

          {/* Technical */}
          {activeTab === "technical" && (
            <div className="space-y-4 sm:space-y-6">
              {renderAccordion(currentReport?.technicalQuestions || [])}
            </div>
          )}

          {/* Behavioral */}
          {activeTab === "behavioral" && (
            <div className="space-y-4 sm:space-y-6">
              {renderAccordion(currentReport?.behavioralQuestions || [])}
            </div>
          )}

          {/* Roadmap */}
          {activeTab === "roadmap" && (
            <div className="space-y-7 sm:space-y-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                  {currentReport?.preparationPlan?.length}-Day Preparation
                  Roadmap
                </h2>

                <div
                  className="
                    px-4 py-2
                    rounded-full
                    bg-pink-500/10
                    border border-pink-500/20
                    text-pink-300
                    text-xs sm:text-sm
                  "
                >
                  Priority Focus Areas
                </div>
              </div>

              {(currentReport?.preparationPlan || []).map((plan, index) => {
                const daySkillGap = currentReport?.skillGaps?.[index];
                const dayDifficulty = formatSeverity(daySkillGap?.severity);

                return (
                  <div key={plan.day} className="flex gap-3 sm:gap-5 lg:gap-6">
                    {/* Timeline */}
                    <div className="flex shrink-0 flex-col items-center">
                      <div
                        className="
                        w-9 h-9 sm:w-11 sm:h-11
                        rounded-xl sm:rounded-2xl
                        bg-gradient-to-br
                        from-pink-500
                        to-fuchsia-600
                        flex items-center justify-center
                        text-sm font-bold sm:text-base
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
                      rounded-2xl
                      p-4 sm:p-5 lg:p-7
                      hover:border-pink-500/20
                      transition-all duration-300
                      min-w-0
                    "
                    >
                      <h3 className="mb-4 break-words text-xl font-bold sm:mb-5 sm:text-2xl">
                        Day {plan.day}: Preparation Focus
                      </h3>

                      <div
                        className="
                        bg-red-500/10
                        border border-red-400/20
                        rounded-xl sm:rounded-2xl
                        p-4 sm:p-5
                        mb-5
                      "
                      >
                        <p className="break-words text-sm leading-6 text-red-300 sm:text-base sm:leading-7">
                          <span className="font-bold">Urgent Skill Gap:</span>{" "}
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

                      <ul className="space-y-3 text-sm text-[#d3c1ca] sm:space-y-4 sm:text-base">
                        {plan.tasks.map((task) => (
                          <li key={task} className="flex gap-3">
                            <span className="shrink-0 text-pink-300">✦</span>
                            <span className="min-w-0 break-words">{task}</span>
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
            w-72 2xl:w-80
            shrink-0
            gap-6
            p-4 2xl:p-6
            border-l border-white/5
            backdrop-blur-xl
            bg-black/10
            sticky top-[73px]
            h-[calc(100vh-73px)]
            overflow-y-auto
          "
        >
          {renderSummaryCards()}
        </aside>
      </div>
    </main>
  );
}
