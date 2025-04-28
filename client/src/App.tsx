import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import TestPlatform from './components/test/TestPlatform';
import TestGenerator from './components/test/TestGenerator';
import About from './components/About';
import Features from './components/Features';
import { mockTest } from './data/mockData';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/test" element={<TestPlatform test={mockTest} />} />
            <Route path="/generate" element={<TestGenerator />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;