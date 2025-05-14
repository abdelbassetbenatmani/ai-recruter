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
  return `You are an expert technical interviewer.
Based on the following inputs, generate a well-structured list of high-quality interview questions:
Job Title: ${position}
Job Description: ${description}
Interview Duration: ${duration}
Interview Type: ${interviewTypes}

IMPORTANT: Your response must be ONLY valid JSON with no additional text, comments, or explanations.

Return a JSON object with this exact structure:
{
  "interviewQuestions": [
    {
      "question": "Question text here",
      "type": "Technical/Behavioral/Experience/Problem Solving/Leadership"
    }
  ]
}

Do not include any text before or after the JSON object.`;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log(body);

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-prover-v2:free",
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

    

    const content = completion.choices[0].message.content || "";

    // Parse the response to ensure it's valid JSON
    let parsedResponse;
    try {
      // First attempt: direct parsing
      parsedResponse = JSON.parse(content);
    } catch {
      // Second attempt: try to extract JSON using regex
      try {
        // Look for JSON object pattern
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedResponse = JSON.parse(jsonMatch[0]);
        } else {
          // Third attempt: try to clean common formatting issues
          const cleanedContent = content
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          parsedResponse = JSON.parse(cleanedContent);
        }
      } catch (extractError) {
        console.error("Error extracting JSON:", extractError);
        return NextResponse.json(
          { error: "Failed to parse AI response" },
          { status: 500 }
        );
      }
    }

    // Return the parsed JSON directly
    console.log(parsedResponse);
    
    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to generate question" },
      { status: 500 },
    );
  }
}
