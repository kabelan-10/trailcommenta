@@ .. @@
 import React, { useState } from 'react';
+import { Link } from 'react-router-dom';
 import { useProject } from '../contexts/ProjectContext';
@@ .. @@
-interface ProjectListProps {
-  onSelectProject: (projectId: string) => void;
-}
-
-const ProjectList: React.FC<ProjectListProps> = ({ onSelectProject }) => {
+const ProjectList: React.FC = () => {
   const { projects, addProject, deleteProject } = useProject();
@@ .. @@
               <div className="flex items-center justify-between">
                 <div className="flex-1">
-                  <button
-                    onClick={() => onSelectProject(project.id)}
-                    className="text-left w-full"
-                  >
+                  <Link to={`/projects/${project.id}`} className="block">
                     <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                       {project.name}
                     </h3>
@@ .. @@
                       <span className="text-sm text-gray-500">Keywords: {project.keywords.length}</span>
                       <span className="text-sm text-gray-500">Subreddits: {project.subreddits.length}</span>
                     </div>
-                  </button>
+                  </Link>
                 </div>
                 <button