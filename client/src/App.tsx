import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { StepProvider } from "./contexts/StepContext";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Journey from "./pages/Journey";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/journey"} component={Journey} />
      <Route path={"/signin"} component={SignIn} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <StepProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </StepProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
