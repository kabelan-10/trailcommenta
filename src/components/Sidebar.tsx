@@ .. @@
 import React from 'react';
+import { Link, useLocation, useParams } from 'react-router-dom';
 import { useAuth } from '../contexts/AuthContext';
@@ .. @@
-interface SidebarProps {
-  currentView: string;
-  onViewChange: (view: string) => void;
-  selectedProjectId?: string;
-}
-
-const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, selectedProjectId }) => {
+const Sidebar: React.FC = () => {
   const { user, signOut } = useAuth();
   const { projects } = useProject();
+  const location = useLocation();
+  const { projectId } = useParams();
 
   const handleSignOut = async () => {
@@ .. @@
   };
 
+  const isActive = (path: string) => {
+    return location.pathname === path;
+  };
+
+  const isProjectActive = (id: string) => {
+    return projectId === id;
+  };
+
   return (
@@ .. @@
       <nav className="mt-8">
         <div className="px-4 space-y-2">
-          <button
-            onClick={() => onViewChange('knowledgebase')}
-            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
-              currentView === 'knowledgebase'
+          <Link
+            to="/knowledgebase"
+            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
+              isActive('/knowledgebase')
                 ? 'bg-blue-100 text-blue-700'
                 : 'text-gray-700 hover:bg-gray-100'
             }`}
@@ .. @@
             <BookOpen className="mr-3 h-5 w-5" />
             Knowledge Base
-          </button>
+          </Link>
 
-          <button
-            onClick={() => onViewChange('projects')}
-            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
-              currentView === 'projects'
+          <Link
+            to="/projects"
+            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
+              isActive('/projects')
                 ? 'bg-blue-100 text-blue-700'
                 : 'text-gray-700 hover:bg-gray-100'
             }`}
@@ .. @@
             <FolderOpen className="mr-3 h-5 w-5" />
             Projects
-          </button>
+          </Link>
 
-          <button
-            onClick={() => onViewChange('accounts')}
-            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
-              currentView === 'accounts'
+          <Link
+            to="/accounts"
+            className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
+              isActive('/accounts')
                 ? 'bg-blue-100 text-blue-700'
                 : 'text-gray-700 hover:bg-gray-100'
             }`}
@@ .. @@
             <Users className="mr-3 h-5 w-5" />
             Accounts
-          </button>
+          </Link>
         </div>
 
@@ .. @@
           <div className="px-4 space-y-1">
             {projects.map((project) => (
-              <button
+              <Link
                 key={project.id}
-                onClick={() => onViewChange(`project-${project.id}`)}
-                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
-                  selectedProjectId === project.id
+                to={`/projects/${project.id}`}
+                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
+                  isProjectActive(project.id)
                     ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                     : 'text-gray-600 hover:bg-gray-50'
                 }`}
@@ .. @@
                 <span className="truncate">{project.name}</span>
-              </button>
+              </Link>
             ))}
           </div>
@@ .. @@
         </div>
 
         {/* Project-specific navigation */}
-        {selectedProjectId && (
+        {projectId && (
           <div className="mt-6">
@@ .. @@
             <div className="px-4 space-y-1">
-              <button
-                onClick={() => onViewChange(`project-${selectedProjectId}`)}
-                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
-                  currentView === `project-${selectedProjectId}`
+              <Link
+                to={`/projects/${projectId}`}
+                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
+                  location.pathname === `/projects/${projectId}`
                     ? 'bg-blue-50 text-blue-700'
                     : 'text-gray-600 hover:bg-gray-50'
                 }`}
@@ .. @@
                 <BarChart3 className="mr-3 h-4 w-4" />
                 Dashboard
-              </button>
+              </Link>
               
-              <button
-                onClick={() => onViewChange(`keywords-${selectedProjectId}`)}
-                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
-                  currentView === `keywords-${selectedProjectId}`
+              <Link
+                to={`/projects/${projectId}/keywords`}
+                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
+                  location.pathname === `/projects/${projectId}/keywords`
                     ? 'bg-blue-50 text-blue-700'
                     : 'text-gray-600 hover:bg-gray-50'
                 }`}
@@ .. @@
                 <Search className="mr-3 h-4 w-4" />
                 Keywords
-              </button>
+              </Link>
               
-              <button
-                onClick={() => onViewChange(`subreddits-${selectedProjectId}`)}
-                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
-                  currentView === `subreddits-${selectedProjectId}`
+              <Link
+                to={`/projects/${projectId}/subreddits`}
+                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors ${
+                  location.pathname === `/projects/${projectId}/subreddits`
                     ? 'bg-blue-50 text-blue-700'
                     : 'text-gray-600 hover:bg-gray-50'
                 }`}
@@ .. @@
                 <MessageSquare className="mr-3 h-4 w-4" />
                 Subreddits
-              </button>
+              </Link>
             </div>
           </div>