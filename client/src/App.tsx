
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import TestPlatform from './components/test/TestPlatform';
import TestGenerator from './components/test/TestGenerator';
import About from './components/About';
import { mockTest } from './data/mockData';
import { ThemeProvider } from '@/components/theme-provider';

function App() {
  return (
    <ThemeProvider>
      <Router>
        
          <Routes>
           
            <Route path="/" element={<LandingPage />} />
           
             <Route path="/generate" element={<TestGenerator />} />
             <Route path="/about" element={<About />} />
            
            <Route path="/test" element={<TestPlatform test={mockTest} />} />
           
            
            
          </Routes>
        
      </Router>
    </ThemeProvider>
  );
}

export default App;