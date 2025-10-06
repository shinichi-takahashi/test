"use client";

import { useState } from "react";

interface TaskFormProps {
	onAdd: (title: string, description?: string) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	function submit(e: React.FormEvent) {
		e.preventDefault();
		const trimmed = title.trim();
		if (!trimmed) return;
		onAdd(trimmed, description.trim() || undefined);
		setTitle("");
		setDescription("");
	}

	return (
		<form onSubmit={submit} className="w-full flex flex-col gap-2 sm:flex-row sm:items-end">
			<div className="flex-1">
				<label className="block text-sm font-medium mb-1">タイトル</label>
				<input
					type="text"
					placeholder="タスクを入力"
					value={title}
					onChange={e => setTitle(e.target.value)}
					className="w-full rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<div className="flex-1">
				<label className="block text-sm font-medium mb-1">詳細</label>
				<input
					type="text"
					placeholder="オプション"
					value={description}
					onChange={e => setDescription(e.target.value)}
					className="w-full rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
				/>
			</div>
			<button
				type="submit"
				className="h-[38px] rounded-md bg-blue-600 text-white px-4 font-medium hover:bg-blue-700 active:bg-blue-800"
			>
				追加
			</button>
		</form>
	);
}

