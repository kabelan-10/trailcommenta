@@ .. @@
 import React, { useState } from 'react';
+import { useParams } from 'react-router-dom';
 import { MessageSquare, Plus, Trash2, Users, TrendingUp } from 'lucide-react';
@@ .. @@
-interface SubredditsProps {
-  projectId: string;
-}
-
-const Subreddits: React.FC<SubredditsProps> = ({ projectId }) => {
+const Subreddits: React.FC = () => {
+  const { projectId } = useParams<{ projectId: string }>();
   const { projects, updateProject } = useProject();
   const [newSubreddit, setNewSubreddit] = useState('');
   
-  const project = projects.find(p => p.id === projectId);
+  const project = projects.find(p => p.id === projectId);
+  
+  if (!projectId) {
+    return <div className="p-6">Project not found</div>;
+  }
 
   if (!project) {