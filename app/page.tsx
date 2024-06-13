"use client";

import { ChatProvider } from "@markprompt/react";
import { Chat } from "./chat";

export default function Home() {
  return (
    <ChatProvider
      projectKey={
        process.env.NEXT_PUBLIC_PROJECT_KEY || "please set a project key"
      }
    >
      <Chat />
    </ChatProvider>
  );
}
