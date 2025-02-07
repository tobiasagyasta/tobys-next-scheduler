"use client";
import { useEffect, useRef } from "react";
import { Task, TimeSlot } from "@/types/schedule";
import { cn } from "@/lib/utils";

interface TimelineProps {
  tasks: Task[];
  onTimeSlotClick: (time: string) => void;
}

export const Timeline = ({ tasks, onTimeSlotClick }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    const time = `${hour}:00`;
    return {
      time,
      tasks: tasks.filter((task) => {
        const taskHour = new Date(`2000-01-01T${task.startTime}`).getHours();
        return taskHour === i;
      }),
    };
  });

  useEffect(() => {
    if (timelineRef.current) {
      const currentHour = new Date().getHours();
      const hourHeight = timelineRef.current.scrollHeight / 24;
      timelineRef.current.scrollTo({
        top: hourHeight * currentHour - hourHeight * 2,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div className="fixed top-14 md:top-16 bottom-0 left-0 right-0 bg-background">
      <div ref={timelineRef} className="h-full overflow-y-auto">
        <div className="relative">
          <div
            className="absolute w-full h-0.5 bg-accent z-10"
            style={{
              top: `${
                ((new Date().getHours() * 60 + new Date().getMinutes()) /
                  (24 * 60)) *
                100
              }%`,
            }}
          >
            <div className="absolute -right-2 -top-1 w-2 h-2 md:w-3 md:h-3 rounded-full bg-accent" />
          </div>

          {timeSlots.map((slot, index) => (
            <div
              key={slot.time}
              className="relative h-20 md:h-24 border-b border-gray-200 hover:bg-gray-50 transition-colors"
              onClick={() => onTimeSlotClick(slot.time)}
            >
              <div className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-background px-1 md:px-2 text-xs md:text-sm text-gray-500">
                {new Date(`2000-01-01T${slot.time}`).toLocaleTimeString(
                  "en-US",
                  {
                    hour: "numeric",
                    hour12: true,
                  }
                )}
              </div>

              {slot.tasks.map((task) => (
                <div
                  key={task.id}
                  className={cn(
                    "absolute left-12 md:left-16 right-2 md:right-4 p-1.5 md:p-2 rounded-md shadow-sm transition-all transform hover:scale-[1.02]",
                    task.completed ? "opacity-50" : "opacity-100",
                    task.priority === "high" &&
                      "bg-red-100 border-l-4 border-red-500",
                    task.priority === "medium" &&
                      "bg-yellow-100 border-l-4 border-yellow-500",
                    task.priority === "low" &&
                      "bg-green-200 border-l-4 border-green-500"
                  )}
                  style={{
                    top: "0.25rem",
                    minHeight: "2.5rem",
                  }}
                >
                  <h4 className="font-medium text-xs md:text-sm line-clamp-1">
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-1 hidden md:block">
                      {task.description}
                    </p>
                  )}
                  <div className="absolute bottom-0.5 md:bottom-1 right-1 md:right-2 text-[10px] md:text-xs text-gray-400">
                    {new Date(
                      `2000-01-01T${task.startTime}`
                    ).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                      hour12: true,
                    })}
                    {" - "}
                    {new Date(`2000-01-01T${task.endTime}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
