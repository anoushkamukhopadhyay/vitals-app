import Anthropic from '@anthropic-ai/sdk';
import { SCHOOLS } from '../src/data/schools';

export const config = { runtime: 'nodejs' };

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequestBody {
  schoolId: string;
  messages: ChatMessage[];
}

function buildSystemPrompt(schoolName: string, knowledge: string): string {
  return [
    `You are the official school information assistant for ${schoolName}.`,
    `You may ONLY answer using the official information below (mission, history, curriculum, values, and admissions philosophy). Do not use outside knowledge, do not speculate, and do not invent facts, statistics, rankings, or URLs that are not present in this text.`,
    `If a question cannot be answered from this information, say so plainly and suggest the student contact the admissions office directly, rather than guessing.`,
    `When you answer, briefly indicate which part of the official information it comes from in natural language (e.g. "According to the school's mission statement…" or "Per the admissions philosophy…") rather than citing a URL.`,
    `Keep answers concise — 2-4 sentences unless the question genuinely requires more.`,
    ``,
    `OFFICIAL INFORMATION — ${schoolName}:`,
    knowledge,
  ].join('\n');
}

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Server is missing ANTHROPIC_API_KEY. Add it in Vercel project settings.' }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }

  let body: ChatRequestBody;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), { status: 400 });
  }

  const school = SCHOOLS.find((s) => s.id === body.schoolId);
  if (!school) {
    return new Response(JSON.stringify({ error: `Unknown schoolId: ${body.schoolId}` }), { status: 400 });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response(JSON.stringify({ error: 'messages must be a non-empty array' }), { status: 400 });
  }

  const anthropic = new Anthropic({ apiKey });

  try {
    const response = await anthropic.messages.create({
      model: 'claude-sonnet-5',
      max_tokens: 500,
      system: buildSystemPrompt(school.name, school.knowledge),
      messages: body.messages.map((m) => ({ role: m.role, content: m.content })),
    });

    const textBlock = response.content.find((block) => block.type === 'text');
    const reply = textBlock && textBlock.type === 'text' ? textBlock.text : '';

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error calling Anthropic API';
    return new Response(JSON.stringify({ error: message }), {
      status: 502,
      headers: { 'content-type': 'application/json' },
    });
  }
}
