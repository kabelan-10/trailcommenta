import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MessageSquare, Plus, Trash2, Users, TrendingUp } from 'lucide-react';

const Subreddits: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { projects, updateProject } = useProject();
  const [newSubreddit, setNewSubreddit] = useState('');
  
  const project = projects.find(p => p.id === projectId);
  
  if (!projectId) {
    return <div className="p-6">Project not found</div>;
  }

  if (!project) {
    return <div className="p-6">Project not found</div>;
  }

  const addSubreddit = () => {
    if (newSubreddit.trim() && !project.subreddits.includes(newSubreddit.trim())) {
      updateProject(projectId, {
        ...project,
        subreddits: [...project.subreddits, newSubreddit.trim()]
      });
      setNewSubreddit('');
    }
  };

  const removeSubreddit = (subreddit: string) => {
    updateProject(projectId, {
      ...project,
      subreddits: project.subreddits.filter(s => s !== subreddit)
    });
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Subreddits</h2>
        <p className="text-gray-600">Manage the subreddits you want to monitor for this project.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Subreddit</h3>
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={newSubreddit}
              onChange={(e) => setNewSubreddit(e.target.value)}
              placeholder="Enter subreddit name (e.g., reactjs)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && addSubreddit()}
            />
          </div>
          <button
            onClick={addSubreddit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Monitored Subreddits</h3>
        </div>
        
        {project.subreddits.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>No subreddits added yet</p>
            <p className="text-sm">Add your first subreddit to start monitoring discussions.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {project.subreddits.map((subreddit) => (
              <div key={subreddit} className="p-4 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="h-4 w-4 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">r/{subreddit}</h4>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        Active monitoring
                      </span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Real-time updates
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeSubreddit(subreddit)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Remove subreddit"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Subreddits;