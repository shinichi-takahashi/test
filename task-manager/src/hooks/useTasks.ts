"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Task, TaskFilters, TaskId, TaskStatus } from "@/types/task";
import { createTaskId, defaultFilters } from "@/types/task";

const STORAGE_KEY = "task-manager/tasks/v1";

function readFromStorage(): Task[] {
	if (typeof window === "undefined") return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw) as Task[];
		if (!Array.isArray(parsed)) return [];
		return parsed;
	} catch {
		return [];
	}
}

function writeToStorage(tasks: Task[]): void {
	if (typeof window === "undefined") return;
	try {
		window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
	} catch {
		// ignore write errors
	}
}

export interface UseTasksResult {
	tasks: Task[];
	filters: TaskFilters;
	filteredTasks: Task[];
	addTask: (title: string, description?: string) => void;
	updateTask: (id: TaskId, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
	removeTask: (id: TaskId) => void;
	toggleStatus: (id: TaskId) => void;
	togglePin: (id: TaskId) => void;
	setFilters: (updater: (prev: TaskFilters) => TaskFilters) => void;
}

export function useTasks(initialTasks?: Task[]): UseTasksResult {
	const [tasks, setTasks] = useState<Task[]>(() => initialTasks ?? readFromStorage());
	const [filters, setFiltersState] = useState<TaskFilters>(defaultFilters);
	const hasMountedRef = useRef(false);

	useEffect(() => {
		if (hasMountedRef.current) {
			writeToStorage(tasks);
		} else {
			hasMountedRef.current = true;
		}
	}, [tasks]);

	const addTask = useCallback((title: string, description?: string) => {
		const now = new Date().toISOString();
		setTasks(prev => [
			{
				id: createTaskId(),
				title: title.trim(),
				description: description?.trim() || undefined,
				status: "todo",
				isPinned: false,
				createdAt: now,
				updatedAt: now,
			},
			...prev,
		]);
	}, []);

	const updateTask = useCallback(
		(id: TaskId, updates: Partial<Omit<Task, "id" | "createdAt">>) => {
			setTasks(prev =>
				prev.map(task =>
					task.id === id
						? {
							...task,
							...updates,
							updatedAt: new Date().toISOString(),
						}
						: task,
				),
			);
		},
		[],
	);

	const removeTask = useCallback((id: TaskId) => {
		setTasks(prev => prev.filter(task => task.id !== id));
	}, []);

	const toggleStatus = useCallback((id: TaskId) => {
		setTasks(prev =>
			prev.map(task => {
				if (task.id !== id) return task;
				const nextStatus: TaskStatus = task.status === "done" ? "todo" : "done";
				return { ...task, status: nextStatus, updatedAt: new Date().toISOString() };
			}),
		);
	}, []);

	const togglePin = useCallback((id: TaskId) => {
		setTasks(prev =>
			prev.map(task => (task.id === id ? { ...task, isPinned: !task.isPinned, updatedAt: new Date().toISOString() } : task)),
		);
	}, []);

	const setFilters = useCallback((updater: (prev: TaskFilters) => TaskFilters) => {
		setFiltersState(prev => updater(prev));
	}, []);

	const filteredTasks = useMemo(() => {
		const normalizedQuery = filters.query.trim().toLowerCase();
		const sorted = [...tasks].sort((a, b) => {
			if (filters.showPinnedFirst && a.isPinned !== b.isPinned) {
				return a.isPinned ? -1 : 1;
			}
			return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
		});

		return sorted.filter(task => {
			const matchesQuery =
				!normalizedQuery ||
				task.title.toLowerCase().includes(normalizedQuery) ||
				(task.description ?? "").toLowerCase().includes(normalizedQuery);
			const matchesStatus = filters.status === "all" || task.status === filters.status;
			return matchesQuery && matchesStatus;
		});
	}, [tasks, filters]);

	return {
		tasks,
		filters,
		filteredTasks,
		addTask,
		updateTask,
		removeTask,
		toggleStatus,
		togglePin,
		setFilters,
	};
}

