"use client";
import { useState } from "react";
import Header from "@/components/Header";
import { Timeline } from "@/components/Timeline";
import { Task } from "@/types/schedule";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Morning Stand-up",
      description: "Daily team sync",
      startTime: "09:00",
      endTime: "09:30",
      priority: "medium",
      completed: false,
      date: new Date().toISOString().split("T")[0],
    },
    {
      id: "2",
      title: "Project Review",
      description: "Review Q1 deliverables",
      startTime: "14:00",
      endTime: "15:00",
      priority: "high",
      completed: false,
      date: new Date().toISOString().split("T")[0],
    },
  ]);

  const handleTimeSlotClick = (time: string) => {
    console.log("Clicked time slot:", time);
  };
  const handleAddTask = () => {
    console.log("Add task clicked");
  };

  const handleToggleCalendar = () => {
    console.log("Toggle calendar clicked");
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Header
          onAddTask={handleAddTask}
          onToggleCalendar={handleToggleCalendar}
        />
        <Timeline tasks={tasks} onTimeSlotClick={handleTimeSlotClick} />
      </main>
    </div>
  );
}
