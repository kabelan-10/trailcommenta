@@ .. @@
 import React from 'react';
+import { useParams } from 'react-router-dom';
 import { BarChart3, TrendingUp, MessageSquare, Target } from 'lucide-react';
@@ .. @@
-interface ProjectDashboardProps {
-  projectId: string;
-}
-
-const ProjectDashboard: React.FC<ProjectDashboardProps> = ({ projectId }) => {
+const ProjectDashboard: React.FC = () => {
+  const { projectId } = useParams<{ projectId: string }>();
   const { projects } = useProject();
   
-  const project = projects.find(p => p.id === projectId);
+  const project = projects.find(p => p.id === projectId);
+  
+  if (!projectId) {
+    return <div className="p-6">Project not found</div>;
+  }
 
   if (!project) {