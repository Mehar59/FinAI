import React from "react";
import * as Sentry from "@sentry/react";


Sentry.init({
  dsn: "https://79161a7c75611207f92eac92ad066198@o4510381182156800.ingest.us.sentry.io/4510381185564672", 
  tracesSampleRate: 0.2, 
});

type Props = {
  children: React.ReactNode;
};

function ErrorFallback() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h2 style={{ fontSize: "22px", fontWeight: 600 }}>Something went wrong</h2>
      <p style={{ fontSize: "15px", color: "#666" }}>
        The issue has been captured using Sentry.
      </p>
    </div>
  );
}

const ErrorBoundary: React.FC<Props> = ({ children }) => (
  <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
    {children}
  </Sentry.ErrorBoundary>
);

export default ErrorBoundary;
