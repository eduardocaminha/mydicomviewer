import { ThemeProvider } from './components/theme-provider';
import { Header } from './components/Header';
import ExamList from './components/ExamList';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="dicom-viewer-theme">
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight">DICOM Viewer</h1>
              <p className="text-muted-foreground">
                View and manage medical imaging studies
              </p>
            </div>
            <ExamList />
          </div>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;