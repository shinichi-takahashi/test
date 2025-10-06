"use client";

import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Filters from "@/components/Filters";
import { useTasks } from "@/hooks/useTasks";

export default function Home() {
  const { tasks, filteredTasks, addTask, removeTask, togglePin, toggleStatus, updateTask, filters, setFilters } = useTasks();

  return (
    <div className="min-h-screen p-6 sm:p-10">
      <main className="mx-auto max-w-3xl flex flex-col gap-4">
        <h1 className="text-2xl font-semibold">タスク管理</h1>
        <TaskForm onAdd={addTask} />
        <div className="flex items-center justify-between">
          <Filters filters={filters} onChange={setFilters} />
          <span className="text-sm opacity-70">{filteredTasks.length}/{tasks.length}</span>
        </div>
        <TaskList
          tasks={filteredTasks}
          onToggleStatus={toggleStatus}
          onTogglePin={togglePin}
          onRemove={removeTask}
          onUpdate={updateTask}
        />
      </main>
    </div>
  );
}
