
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FunctionalErrorBoundary from './components/Errorboundry';
import LandingPage from './components/LandingPage';
import TestPlatform from './components/test/TestPlatform';
import TestGenerator from './components/test/TestGenerator';
import About from './components/About';
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/theme-provider';
import TestResults from './components/test/TestResults';



function App() {
  return (
    <FunctionalErrorBoundary>
      <>
    <ThemeProvider>
      
      <Toaster richColors position="top-right" />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
           
             <Route path="/generate" element={<TestGenerator />} />
             <Route path="/about" element={<About />} />

            <Route path="/test/:testId" element={<TestPlatform  />} />

            <Route path="/test-results/:testId" element={<TestResults />} />
           
            
            
          </Routes>
        
      </Router>
     
    </ThemeProvider>
    </>
     </FunctionalErrorBoundary>
  );
}

export default App;