export type TaskId = string;

export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
	id: TaskId;
	title: string;
	description?: string;
	status: TaskStatus;
	isPinned: boolean;
	createdAt: string; // ISO string
	updatedAt: string; // ISO string
}

export interface TaskFilters {
	query: string;
	status: TaskStatus | "all";
	showPinnedFirst: boolean;
}

export const defaultFilters: TaskFilters = {
	query: "",
	status: "all",
	showPinnedFirst: true,
};

export function createTaskId(): TaskId {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

