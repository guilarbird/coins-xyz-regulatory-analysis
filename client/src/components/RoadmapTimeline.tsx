import { CheckCircle2, Clock, Circle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Milestone {
  date: string;
  title: string;
  status: "completed" | "in-progress" | "upcoming" | "planned";
  description?: string;
}

interface RoadmapTimelineProps {
  milestones: Milestone[];
}

export default function RoadmapTimeline({ milestones }: RoadmapTimelineProps) {
  const getStatusIcon = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-orange-600 animate-pulse" />;
      case "upcoming":
      case "planned":
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: Milestone["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case "in-progress":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">In Progress</Badge>;
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Upcoming</Badge>;
      case "planned":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Planned</Badge>;
    }
  };

  return (
    <div className="bg-white border-b">
      <div className="container max-w-7xl py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <span className="text-2xl">🗓️</span>
          Key Milestones Timeline
        </h2>
        
        {/* Desktop: Horizontal Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-200"></div>
            
            {/* Milestones */}
            <div className="grid grid-cols-5 gap-4">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative">
                  {/* Status Icon */}
                  <div className="absolute top-5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-10">
                    {getStatusIcon(milestone.status)}
                  </div>
                  
                  {/* Content */}
                  <div className="pt-12">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-900 mb-1">{milestone.date}</p>
                      <p className="text-xs text-gray-600 mb-2">{milestone.title}</p>
                      <div className="flex justify-center">
                        {getStatusBadge(milestone.status)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: Vertical Timeline */}
        <div className="md:hidden space-y-4">
          {milestones.map((milestone, index) => (
            <div key={index} className="flex gap-3">
              <div className="flex flex-col items-center">
                {getStatusIcon(milestone.status)}
                {index < milestones.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 mt-2"></div>
                )}
              </div>
              <div className="flex-1 pb-4">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold text-gray-900">{milestone.date}</p>
                  {getStatusBadge(milestone.status)}
                </div>
                <p className="text-sm text-gray-600">{milestone.title}</p>
                {milestone.description && (
                  <p className="text-xs text-gray-500 mt-1">{milestone.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
