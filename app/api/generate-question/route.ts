import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const prompt = (
  position: string,
  description: string,
  duration: string,
  interviewTypes: string[],
) => {
  return `const PROMPT 'You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: ${position}
Job Description: ${description}
Interview Duration: ${duration}
Interview Type: ${interviewTypes}
Your task:
Analyze the job description to identify key responsibilities, required skills, and expected experience.
Generate a list of interview questions depends on interview duration
Adjust the number and depth of questions to match the interview duration.
Ensure the questions match the tone and structure of a real-life ${interviewTypes} interview.
Format your response in JSON format with array list of questions.
Not include any explanations or additional context.
Make sure Not include any explanations or additional context.
Only return the JSON object with the questions and their types.
format: interviewQuestions=[
{question:"",
type:' Technical/Behavioral/Experince/Problem Solving/Leaseship'},
{question:"",
type:' Technical/Behavioral/Experince/Problem Solving/Leaseship'},
]
The goal is to create a structured, relevant, and time-optimized interview plan for a ${position} role.`;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-chat-v3-0324:free",
      messages: [
        {
          role: "system",
          content: "You are a JSON-only response generator. Do not include any explanatory text, markdown formatting, or code blocks. Return only valid JSON objects."
        },
        {
          role: "user",
          content: prompt(
            body.position,
            body.description,
            body.duration,
            body.interviewTypes,
          ),
        },
      ],
      response_format: {
        type: "json_object",
      },
    });

    console.log(completion.choices[0].message.content);

    return NextResponse.json({
      data: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate question" },
      { status: 500 },
    );
  }
}
