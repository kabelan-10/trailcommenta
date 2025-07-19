"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, ArrowLeft } from "lucide-react";
import { apiService, CreateProjectData } from "@/lib/api";
import { toast } from "sonner";

interface CreateProjectFormProps {
  onCreateProject: () => void;
  onBack?: () => void;
}

export default function CreateProjectForm({
  onCreateProject,
  onBack,
}: CreateProjectFormProps) {
  const [formData, setFormData] = useState<CreateProjectData>({
    name: "",
    product_link: "",
    product_explanation: "",
    person_name: "",
    person_role: "",
    person_story: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<CreateProjectData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<CreateProjectData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!formData.product_link.trim()) {
      newErrors.product_link = "Product link is required";
    } else {
      try {
        new URL(formData.product_link);
      } catch {
        newErrors.product_link = "Please enter a valid URL";
      }
    }

    if (!formData.product_explanation.trim()) {
      newErrors.product_explanation = "Product explanation is required";
    }

    if (!formData.person_name.trim()) {
      newErrors.person_name = "Person name is required";
    }

    if (!formData.person_role.trim()) {
      newErrors.person_role = "Person role is required";
    }

    if (!formData.person_story.trim()) {
      newErrors.person_story = "Person story is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiService.createProject(formData);

      if (response.success) {
        toast.success("Project created successfully");
        // Clear the API cache to ensure fresh data
        apiService.clearCache();
        onCreateProject(); // This should redirect to project list
      } else {
        // Handle specific error messages from backend
        if (response.message?.includes("Subreddit limit reached")) {
          toast.error("Subreddit limit reached");
        } else if (
          response.message?.includes("Failed to generate subreddits") ||
          response.message?.includes("Failed to generate keywords")
        ) {
          toast.error("Failed to generate subreddits/keywords");
        } else {
          toast.error(response.message || "Failed to create project");
        }
      }
    } catch (error) {
      toast.error("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof CreateProjectData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {onBack && (
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Create New Project</CardTitle>
          <CardDescription>
            Fill in the details below to create your new project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Project Name *</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your project name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                disabled={isSubmitting}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="product_link">Product Link *</Label>
              <Input
                id="product_link"
                type="url"
                placeholder="https://yourproduct.com"
                value={formData.product_link}
                onChange={(e) =>
                  handleInputChange("product_link", e.target.value)
                }
                disabled={isSubmitting}
                className={errors.product_link ? "border-red-500" : ""}
              />
              {errors.product_link && (
                <p className="text-sm text-red-600">{errors.product_link}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="product_explanation">Product Explanation *</Label>
              <Textarea
                id="product_explanation"
                placeholder="Describe your product and what it does"
                value={formData.product_explanation}
                onChange={(e) =>
                  handleInputChange("product_explanation", e.target.value)
                }
                disabled={isSubmitting}
                rows={4}
                className={errors.product_explanation ? "border-red-500" : ""}
              />
              {errors.product_explanation && (
                <p className="text-sm text-red-600">
                  {errors.product_explanation}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="person_name">Person Name *</Label>
              <Input
                id="person_name"
                type="text"
                placeholder="Enter your name"
                value={formData.person_name}
                onChange={(e) =>
                  handleInputChange("person_name", e.target.value)
                }
                disabled={isSubmitting}
                className={errors.person_name ? "border-red-500" : ""}
              />
              {errors.person_name && (
                <p className="text-sm text-red-600">{errors.person_name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="person_role">Person Role *</Label>
              <Input
                id="person_role"
                type="text"
                placeholder="e.g., Founder, Product Manager, Developer"
                value={formData.person_role}
                onChange={(e) =>
                  handleInputChange("person_role", e.target.value)
                }
                disabled={isSubmitting}
                className={errors.person_role ? "border-red-500" : ""}
              />
              {errors.person_role && (
                <p className="text-sm text-red-600">{errors.person_role}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="person_story">Person Story *</Label>
              <Textarea
                id="person_story"
                placeholder="Tell us about your background and experience with this project"
                value={formData.person_story}
                onChange={(e) =>
                  handleInputChange("person_story", e.target.value)
                }
                disabled={isSubmitting}
                rows={4}
                className={errors.person_story ? "border-red-500" : ""}
              />
              {errors.person_story && (
                <p className="text-sm text-red-600">{errors.person_story}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Project...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
