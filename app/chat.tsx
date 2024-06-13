"use client";

import { useChatStore } from "@markprompt/react";
import { useEffect, useState } from "react";

export const Chat = () => {
  const [hasCancelledOnce, setHasCancelledOnce] = useState(false);
  const submitChat = useChatStore((s) => s.submitChat);
  const messages = useChatStore((s) => s.messages);
  const state = messages?.[messages.length - 1]?.state;
  const selectThread = useChatStore((state) => state.selectThread);

  useEffect(() => {
    if (state === "cancelled") {
      setHasCancelledOnce(true);
    }
  }, [state]);

  useEffect(() => {
    selectThread(undefined);
  }, [selectThread]);

  return (
    <div className="flex flex-col gap-2 items-start">
      <div>State: {state || "unknown"}</div>
      <div>Has cancelled once: {hasCancelledOnce ? "yes" : "no"}</div>
      <div className="flex flex-row gap-2 items-center">
        <button
          className="border p-2 rounded"
          onClick={() => {
            submitChat([
              {
                role: "user",
                content: "how to properly cancel a membership",
              },
            ]);
          }}
        >
          Submit
        </button>
        <button
          className="border p-2 rounded"
          onClick={() => {
            selectThread(undefined);
          }}
        >
          Reset
        </button>
      </div>
      <div>
        {messages.map((m, i) => {
          return <div key={`key-${m}-${i}`}>{m.content}</div>;
        })}
      </div>
    </div>
  );
};
