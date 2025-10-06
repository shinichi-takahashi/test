"use client";

import type { TaskFilters, TaskStatus } from "@/types/task";

interface FiltersProps {
	filters: TaskFilters;
	onChange: (updater: (prev: TaskFilters) => TaskFilters) => void;
}

const statusOptions: Array<{ value: TaskStatus | "all"; label: string }> = [
	{ value: "all", label: "すべて" },
	{ value: "todo", label: "未着手" },
	{ value: "in_progress", label: "進行中" },
	{ value: "done", label: "完了" },
];

export default function Filters({ filters, onChange }: FiltersProps) {
	return (
		<div className="flex flex-col sm:flex-row gap-2 items-center">
			<input
				type="text"
				placeholder="検索"
				value={filters.query}
				onChange={e => onChange(prev => ({ ...prev, query: e.target.value }))}
				className="w-full sm:w-64 rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-black/20 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
			/>
			<select
				value={filters.status}
				onChange={e => onChange(prev => ({ ...prev, status: e.target.value as TaskStatus | "all" }))}
				className="rounded-md border border-black/10 dark:border-white/15 bg-white/80 dark:bg-black/20 px-3 py-2"
			>
				{statusOptions.map(opt => (
					<option key={opt.value} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			<label className="inline-flex items-center gap-2 text-sm">
				<input
					type="checkbox"
					checked={filters.showPinnedFirst}
					onChange={e => onChange(prev => ({ ...prev, showPinnedFirst: e.target.checked }))}
				/>
				ピン留め優先
			</label>
		</div>
	);
}

