import { CalendarDays, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAddTask: () => void;
  onToggleCalendar: () => void;
}

export const Header = ({ onAddTask, onToggleCalendar }: HeaderProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-4 md:h-16 md:px-6">
        <div className="mr-4 hidden sm:flex">
          <h1 className="text-lg font-semibold md:text-xl">Chronicle</h1>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2">
          <div className="w-full max-w-[12rem] flex-1 sm:max-w-none md:w-auto md:flex-none">
            <Button
              variant="outline"
              className="relative h-8 w-full justify-start text-xs text-muted-foreground md:h-9 md:text-sm md:w-40 lg:w-64"
              onClick={onToggleCalendar}
            >
              <span className="hidden lg:inline-flex">View Calendar</span>
              <span className="inline-flex lg:hidden">Calendar</span>
              <CalendarDays className="ml-2 h-3 w-3 md:h-4 md:w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 md:h-9 md:w-9"
            >
              <Search className="h-3 w-3 md:h-4 md:w-4" />
              <span className="sr-only">Search tasks</span>
            </Button>

            <Button
              variant="default"
              size="sm"
              className="h-8 md:h-9"
              onClick={onAddTask}
            >
              <Plus className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
              <span className="hidden sm:inline-flex">Add Task</span>
              <span className="inline-flex sm:hidden">Add</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
