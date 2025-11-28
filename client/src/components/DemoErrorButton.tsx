// client/src/components/DemoErrorButton.tsx
import { useState } from "react";

export default function DemoErrorButton() {
  const [trigger, setTrigger] = useState(false);

  if (trigger) {
    // This error will be caught by Sentry ErrorBoundary
    throw new Error("Demo error for Sentry showcase");
  }

  return (
    <button
      onClick={() => setTrigger(true)}
      style={{
        marginTop: "20px",
        padding: "10px 16px",
        backgroundColor: "#ef4444",
        color: "white",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      Trigger Sentry Error
    </button>
  );
}
