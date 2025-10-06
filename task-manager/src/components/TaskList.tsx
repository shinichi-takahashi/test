"use client";

import type { Task } from "@/types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
	tasks: Task[];
	onToggleStatus: (id: string) => void;
	onTogglePin: (id: string) => void;
	onRemove: (id: string) => void;
	onUpdate: (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
}

export default function TaskList({ tasks, onToggleStatus, onTogglePin, onRemove, onUpdate }: TaskListProps) {
	if (tasks.length === 0) {
		return <p className="text-sm opacity-70">タスクがありません。</p>;
	}
	return (
		<ul className="flex flex-col gap-2">
			{tasks.map(task => (
				<TaskItem
					key={task.id}
					task={task}
					onToggleStatus={onToggleStatus}
					onTogglePin={onTogglePin}
					onRemove={onRemove}
					onUpdate={onUpdate}
				/>
			))}
		</ul>
	);
}

