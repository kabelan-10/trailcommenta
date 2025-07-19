import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '../contexts/ProjectContext';
import { BookOpen, FolderOpen, Users, BarChart3, Search, MessageSquare, LogOut } from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user, signOut } = useAuth();
  const { projects } = useProject();
  const location = useLocation();
  const { projectId } = useParams();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const isProjectActive = (id: string) => {
    return projectId === id;
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* User info */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
            <p className="text-xs text-gray-500">Admin</p>
          </div>
          <button
            onClick={handleSignOut}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="mt-8">
        <div className="px-4 space-y-2">
          <Link
            to="/knowledgebase"
            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive('/knowledgebase')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BookOpen className="mr-3 h-5 w-5" />
            Knowledge Base
          </Link>

          <Link
            to="/projects"
            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive('/projects')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <FolderOpen className="mr-3 h-5 w-5" />
            Projects
          </Link>

          <Link
            to="/accounts"
            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive('/accounts')
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users className="mr-3 h-5 w-5" />
            Accounts
          </Link>
        </div>

        {/* Projects list */}
        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Projects
          </h3>
          <div className="px-4 space-y-1">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                  isProjectActive(project.id)
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className="truncate">{project.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Project-specific navigation */}
        {projectId && (
          <div className="mt-6">
            <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Project Tools
            </h3>
 \           <div className="px-4 space-y-1">
              <Link
                to={`/projects/${projectId}`}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                  location.pathname === `/projects/${projectId}`
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <BarChart3 className="mr-3 h-4 w-4" />
                Dashboard
              </Link>
              
              <Link
                to={`/projects/${projectId}/keywords`}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                  location.pathname === `/projects/${projectId}/keywords`
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Search className="mr-3 h-4 w-4" />
                Keywords
              </Link>
              
              <Link
                to={`/projects/${projectId}/subreddits`}
                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
                  location.pathname === `/projects/${projectId}/subreddits`
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="mr-3 h-4 w-4" />
                Subreddits
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;