import { createClient } from "edgedb";
import { createAI, getMutableAIState, render } from "ai/rsc";
import { Message } from "@/components/Message";
import { OpenAI } from "openai";
import e from "../../dbschema/edgeql-js";

// Create an OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_AZURE_KEY,
});

// edgedb client
const client = createClient();

async function getGyms(limit?: number) {
  const gymsQuery = e.select(e.Gyms, (gym) => ({
    ...e.Gyms["*"],
    limit: limit,
    order_by: {
      expression: gym.name,
    },
  }));

  const gyms = await gymsQuery.run(client);
  return gyms;
}

async function submitUserMessage(userInput: string) {
  "use server";

  const aiState = getMutableAIState<typeof AI>();

  aiState.update([
    ...aiState.get(),
    {
      role: "user",
      content: userInput,
    },
  ]);

  const ui = render({
    model: "gpt-3.5-turbo",
    provider: openai,
    messages: [
      {
        role: "system",
        content: `\
        You are a expert crossfit coach and a gym session booking assistant. You can be asked to get information
        for a crossfit gym or get a list of crossfit gyms.
        If you can't find an appropriate function, tell the user to ask
        a different question.
          `,
      },
      { role: "user", content: userInput },
    ],
    text: ({ content, done }) => {
      if (done) {
        aiState.done([
          ...aiState.get(),
          {
            role: "assistant",
            content,
          },
        ]);
      }
      return <Message type="bot">{content}</Message>;
    },
    tools: {
      // Placeholder for future tool implementations
    },
  });

  return {
    id: Date.now(),
    display: ui,
  };
}

const initialAIState: {
  role: "user" | "assistant" | "system" | "function";
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  initialUIState,
  initialAIState,
});
