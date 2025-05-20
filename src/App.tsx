import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layout/MainLayout";
import Home from "./pages/Home";
import { NoteEditorPage } from "./pages/NoteEditorPage";
import EditorTest from "./pages/EditorTest";
import NotFound from "./pages/NotFound";
import { Navigation } from './components/Navigation'
import { ThemeProvider } from './lib/theme'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navigation />
            <main>
              <Routes>
                <Route element={<MainLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/notes/:noteId" element={<NoteEditorPage />} />
                  <Route path="/test" element={<EditorTest />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
