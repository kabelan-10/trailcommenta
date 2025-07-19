@@ .. @@
 import React, { useState } from 'react';
+import { useParams } from 'react-router-dom';
 import { Search, Plus, Trash2, TrendingUp } from 'lucide-react';
@@ .. @@
-interface KeywordsProps {
-  projectId: string;
-}
-
-const Keywords: React.FC<KeywordsProps> = ({ projectId }) => {
+const Keywords: React.FC = () => {
+  const { projectId } = useParams<{ projectId: string }>();
   const { projects, updateProject } = useProject();
   const [newKeyword, setNewKeyword] = useState('');
   
-  const project = projects.find(p => p.id === projectId);
+  const project = projects.find(p => p.id === projectId);
+  
+  if (!projectId) {
+    return <div className="p-6">Project not found</div>;
+  }
 
   if (!project) {