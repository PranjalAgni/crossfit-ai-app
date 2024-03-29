"use client";

import { useState } from "react";
import { useActions, useUIState } from "ai/rsc";
import { AI } from "./action";
import { Message } from "@/components/Message";
import UserInput from "@/components/UserInput";
import { EdgeDB_Vercel } from "@/components/Logo";

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  return (
    <main className="bg-gray-100 flex flex-col min-h-full max-h-full h-full relative items-center">
      <div className="flex flex-1 w-full overflow-scroll md:p-12 sm:p-8 p-4 flex-col-reverse">
        {messages.toReversed().map((message) => (
          <div className="flex flex-col w-full mb-4" key={message.id}>
            <div className="text-gray-600">{message.display}</div>
          </div>
        ))}

        <Message type="bot" className="mb-4">
          <div className="p-4">
            <h1 className="text-xl font-semibold text-gray-800">
              Ask me about crossfit gyms around globe and crossfit workout is
              coming soon
            </h1>
            <p className="text-gray-600 mt-2">
              Here are some example questions you can ask:
            </p>
            <div className="text-gray-600 mt-2 cursor-pointer hover:text-gray-900 flex flex-col items-start gap-y-1">
              <button
                className="text-blue-600 hover:text-blue-800 text-left"
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: Date.now(),
                      display: (
                        <Message type="user">
                          Give me 5 Crossfit gyms in USA
                        </Message>
                      ),
                    },
                  ]);

                  const responseMessage = await submitUserMessage(
                    "Give me 5 Crossfit gyms in USA"
                  );
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                }}
              >
                — List of 5 Crossfit gyms in USA
              </button>
              <button
                className="text-blue-600 hover:text-blue-800 text-left"
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: Date.now(),
                      display: (
                        <Message type="user">
                          Give me 2 Crossfit gyms in India
                        </Message>
                      ),
                    },
                  ]);

                  const responseMessage = await submitUserMessage(
                    "Give me 2 Crossfit gyms in India"
                  );
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                }}
              >
                — List of 2 Crossfit gyms in India
              </button>
              <button
                className="text-blue-600 hover:text-blue-800 text-left"
                onClick={async () => {
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: Date.now(),
                      display: (
                        <Message type="user">
                          Give me 7 Crossfit gyms in Europe
                        </Message>
                      ),
                    },
                  ]);

                  const responseMessage = await submitUserMessage(
                    "Give me 7 Crossfit gyms in Europe"
                  );
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage,
                  ]);
                }}
              >
                — List of 7 Crossfit gyms in Europe
              </button>
            </div>
          </div>
        </Message>

        <div className="flex flex-1 justify-center m-6 mb-16">
          <div className="flex flex-col items-center">
            <EdgeDB_Vercel />
            <p className="text-zinc-400 text-xs text-center mt-3 max-w-md">
              An app for the love of crossfit and building. Backed by Crossfit
              API and Vercel&nbsp;AI&nbsp;SDK.
            </p>
          </div>
        </div>
      </div>

      <div className="flex mt-auto w-full md:p-12 sm:p-8 p-4 bg-zinc-300">
        <div className="mx-auto max-w-4xl h-full w-full self-end">
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              setMessages((currentMessages) => [
                ...currentMessages,
                {
                  id: Date.now(),
                  display: <Message type="user">{inputValue}</Message>,
                },
              ]);

              setInputValue("");

              const responseMessage = await submitUserMessage(inputValue);
              setMessages((currentMessages) => [
                ...currentMessages,
                responseMessage,
              ]);
            }}
          >
            <UserInput
              onChange={(prompt) => {
                setInputValue(prompt);
              }}
              value={inputValue}
            />
          </form>
        </div>
      </div>
    </main>
  );
}
