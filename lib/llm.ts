// Only file that knows the provider. To move to Anthropic, swap URL/key/model/body here.
const URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.OPENROUTER_MODEL ?? "anthropic/claude-haiku-4.5";

export interface ChatMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string | null;
  tool_calls?: ToolCall[];
  tool_call_id?: string;
}

export interface ToolCall {
  id: string;
  function: { name: string; arguments: string };
}

export type StreamEvent =
  | { kind: "thinking" }
  | { kind: "text"; text: string }
  | { kind: "done"; message: ChatMessage };

interface Delta {
  content?: string | null;
  reasoning?: string | null;
  tool_calls?: { index: number; id?: string; function?: { name?: string; arguments?: string } }[];
}

export async function* stream(messages: ChatMessage[], tools: unknown[], signal?: AbortSignal): AsyncGenerator<StreamEvent> {
  const res = await fetch(URL, {
    method: "POST",
    signal, // stops the upstream call when the visitor disconnects
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ model: MODEL, messages, tools, max_tokens: 1500, stream: true }),
  });
  if (!res.ok || !res.body) throw new Error(`LLM ${res.status}`);

  const message: ChatMessage = { role: "assistant", content: "" };
  const calls: ToolCall[] = [];
  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buf = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += decoder.decode(value, { stream: true });
    const lines = buf.split("\n");
    buf = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
      let chunk: { choices?: { delta: Delta }[]; error?: unknown };
      try {
        chunk = JSON.parse(line.slice(6));
      } catch {
        continue;
      }
      if (chunk.error) throw new Error("LLM stream error");
      const d = chunk.choices?.[0]?.delta;
      if (!d) continue;
      if (d.reasoning) yield { kind: "thinking" };
      if (d.content) {
        message.content += d.content;
        yield { kind: "text", text: d.content };
      }
      for (const t of d.tool_calls ?? []) {
        const c = (calls[t.index] ??= { id: "", function: { name: "", arguments: "" } });
        c.id ||= t.id ?? "";
        c.function.name += t.function?.name ?? "";
        c.function.arguments += t.function?.arguments ?? "";
      }
    }
  }
  if (calls.length) message.tool_calls = calls;
  yield { kind: "done", message };
}
