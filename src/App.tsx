import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './components/Login';
import KnowledgeBase from './components/KnowledgeBase';
import ProjectList from './components/ProjectList';
import ProjectDashboard from './components/ProjectDashboard';
import Keywords from './components/Keywords';
import Subreddits from './components/Subreddits';
import Accounts from './components/Accounts';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <AuthProvider>
      <ProjectProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected routes with layout */}
              <Route path="/knowledgebase" element={
                <ProtectedRoute>
                  <Layout>
                    <KnowledgeBase />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/projects" element={
                <ProtectedRoute>
                  <Layout>
                    <ProjectList />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/projects/:projectId" element={
                <ProtectedRoute>
                  <Layout>
                    <ProjectDashboard />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/projects/:projectId/keywords" element={
                <ProtectedRoute>
                  <Layout>
                    <Keywords />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/projects/:projectId/subreddits" element={
                <ProtectedRoute>
                  <Layout>
                    <Subreddits />
                  </Layout>
                </ProtectedRoute>
              } />
              
              <Route path="/accounts" element={
                <ProtectedRoute>
                  <Layout>
                    <Accounts />
                  </Layout>
                </ProtectedRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </ProjectProvider>
    </AuthProvider>
  );
}

export default App;