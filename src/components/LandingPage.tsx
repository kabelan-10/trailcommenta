import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { ArrowRight, BarChart3, MessageSquare, Target } from 'lucide-react';

const LandingPage: React.FC = () => {
  const { user } = useAuth();

  // If user is already logged in, redirect to projects
  if (user) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Reddit Marketing Dashboard
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Track keywords, monitor subreddits, and manage your Reddit marketing campaigns all in one place.
          </p>
          <Link
            to="/login"
            className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Keyword Tracking</h3>
            <p className="text-gray-600">
              Monitor specific keywords across Reddit to find relevant conversations and opportunities.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Subreddit Monitoring</h3>
            <p className="text-gray-600">
              Keep track of multiple subreddits and stay updated with the latest discussions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Analytics Dashboard</h3>
            <p className="text-gray-600">
              Get insights and analytics on your Reddit marketing performance and engagement.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-4">Ready to start your Reddit marketing journey?</p>
          <Link
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            Sign in to your account →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;