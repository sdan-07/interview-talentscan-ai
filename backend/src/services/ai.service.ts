import { GoogleGenAI } from "@google/genai";
import { z } from "zod/v3";
import { zodToJsonSchema } from "zod-to-json-schema";

interface generateReportType {
  resume: any;
  selfDescription: string;
  jobDescription: string;
}

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

//automated retry mechanism (post hitting on quota limit)
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "An overall match percentage from 0 to 100 indicating how well the candidate's profile matches the job description",
    ),

  title: z.string().describe("The title of the job for which the interview report is generated"),

  missingSkills: z.array(
    z.string()
    .describe("Mention only 3-4 name of tools as skills which are missing in candidate's profile"),
  ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The technical question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of the interviewer behind"),
        answer: z
          .string()
          .describe(
            "provide the answer tfor the question you have provided",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview along with their intention and how to answer them",
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe("The behavioral question can be asked in the interview"),
        intention: z
          .string()
          .describe("The intention of the interviewer behind"),
        answer: z
          .string()
          .describe(
            "provide the answer tfor the question you have provided",
          ),
      }),
    )
    .describe(
      "behavioral questions that can be asked in the interview along with their intention and how to answer them",
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z
          .string()
          .describe(
            "The specific technical skill, tool, framework, or soft skill identified as a gap between the candidate's current profile and the target job requirements.",
          ),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The criticality of the skill gap. 'high' means it is a hard prerequisite for the role; 'medium' means it is strongly preferred or frequently used; 'low' means it is a nice-to-have or easily learned on the job.",
          ),
      }),
    )
    .describe(
      "A structured list identifying the core skill deficiencies or areas of improvement discovered after comparing the candidate's resume against the job description.",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe(
            "The sequential day number of the preparation timeline (e.g., 1, 2, 3), starting from 1.",
          ),
        focus: z
          .string()
          .describe(
            "The overarching theme, core skill, or objective for this specific day of preparation.",
          ),
        tasks: z
          .array(
            z
              .string()
              .describe(
                "A highly actionable, specific task or study item the candidate should complete on this day to bridge their skill gaps (e.g., 'Read documentation on Kubernetes Pod lifecycle', 'Build a sample multi-stage Dockerfile').",
              ),
          )
          .describe("List of actionable tasks for this day."),
      }),
    )
    .describe(
      "A day-by-day, step-by-step roadmap or study schedule designed to efficiently prepare the candidate and bridge the identified skill gaps before an interview.",
    ),
});

export const generateInterviewReport = async (
  { resume, selfDescription, jobDescription }: generateReportType,
  retries: number = 3,
): Promise<z.infer<typeof interviewReportSchema>> => {
  const prompt = `Generate an interview report with the following details:
                  resume: ${resume},
                  self description: ${selfDescription},
                  job description: ${jobDescription}`;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseJsonSchema: zodToJsonSchema(interviewReportSchema),
        },
      });

      return interviewReportSchema.parse(JSON.parse(response.text as string));
    } catch (err) {
      if (err == 429 && attempt < retries) {
        console.warn(`Quota hit on attempt ${attempt}. Retrying shortly...`);
        await sleep(12000);
        continue;
      }

      console.error("Final Request Failure: ", err);
      throw err;
    }
  }

  throw new Error(
    "Failed to generate interview report after all retry attempts.",
  );
};
