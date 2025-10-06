"use client";

import type { Task } from "@/types/task";
import { useState } from "react";

interface TaskItemProps {
	task: Task;
	onToggleStatus: (id: string) => void;
	onTogglePin: (id: string) => void;
	onRemove: (id: string) => void;
	onUpdate: (id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) => void;
}

export default function TaskItem({ task, onToggleStatus, onTogglePin, onRemove, onUpdate }: TaskItemProps) {
	const [isEditing, setIsEditing] = useState(false);
	const [editTitle, setEditTitle] = useState(task.title);
	const [editDesc, setEditDesc] = useState(task.description ?? "");

	function save() {
		const nextTitle = editTitle.trim();
		if (!nextTitle) return;
		onUpdate(task.id, { title: nextTitle, description: editDesc.trim() || undefined });
		setIsEditing(false);
	}

	return (
		<li className="rounded-md border border-black/10 dark:border-white/15 p-3 bg-white/80 dark:bg-black/20 flex flex-col gap-2">
			<div className="flex items-center gap-2">
				<button
					aria-label="toggle status"
					onClick={() => onToggleStatus(task.id)}
					className={`size-5 rounded border ${task.status === "done" ? "bg-green-600 border-green-700" : "border-black/20"}`}
				/>
				{isEditing ? (
					<input
						className="flex-1 bg-transparent border-b border-black/10 dark:border-white/15 outline-none px-1"
						value={editTitle}
						onChange={e => setEditTitle(e.target.value)}
					/>
				) : (
					<div className="flex-1 flex items-center gap-2">
						<span className={`font-medium ${task.status === "done" ? "line-through opacity-60" : ""}`}>{task.title}</span>
						{task.isPinned && <span className="text-xs rounded bg-amber-500/20 text-amber-700 px-1.5 py-0.5">PIN</span>}
					</div>
				)}
				<div className="flex items-center gap-1">
					<button onClick={() => onTogglePin(task.id)} className="text-xs rounded px-2 py-1 border border-black/10 hover:bg-amber-50 dark:hover:bg-amber-900/20">Pin</button>
					{isEditing ? (
						<>
							<button onClick={save} className="text-xs rounded px-2 py-1 bg-blue-600 text-white">保存</button>
							<button onClick={() => setIsEditing(false)} className="text-xs rounded px-2 py-1 border border-black/10">キャンセル</button>
						</>
					) : (
						<>
							<button onClick={() => setIsEditing(true)} className="text-xs rounded px-2 py-1 border border-black/10">編集</button>
							<button onClick={() => onRemove(task.id)} className="text-xs rounded px-2 py-1 border border-red-200 text-red-700 hover:bg-red-50">削除</button>
						</>
					)}
				</div>
			</div>
			{isEditing ? (
				<textarea
					className="w-full bg-transparent border border-black/10 dark:border-white/15 rounded p-2 outline-none"
					rows={2}
					placeholder="詳細を入力"
					value={editDesc}
					onChange={e => setEditDesc(e.target.value)}
				/>
			) : task.description ? (
				<p className="text-sm opacity-80">{task.description}</p>
			) : null}
		</li>
	);
}

