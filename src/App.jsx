import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Techniques from './pages/Techniques.jsx';
import TechniqueDetail from './pages/TechniqueDetail.jsx';
import LessonPlanner from './pages/LessonPlanner.jsx';
import PageNotFound from './lib/PageNotFound.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/Dashboard" replace />} />
        <Route path="/Dashboard" element={<Layout currentPageName="Dashboard"><Dashboard /></Layout>} />
        <Route path="/Techniques" element={<Layout currentPageName="Techniques"><Techniques /></Layout>} />
        <Route path="/TechniqueDetail" element={<Layout currentPageName="TechniqueDetail"><TechniqueDetail /></Layout>} />
        <Route path="/LessonPlanner" element={<Layout currentPageName="LessonPlanner"><LessonPlanner /></Layout>} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}