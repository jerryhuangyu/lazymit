import { COMMIT_TYPE } from "@/ui/stores/commit";

export const COMMIT_TYPE_OPTIONS = new Map([
	[
		COMMIT_TYPE.FEAT,
		{
			icon: "💎",
			label: "feat",
			intro: "- Introduce new features",
			id: COMMIT_TYPE.FEAT,
		},
	],
	[
		COMMIT_TYPE.FIX,
		{
			icon: "🐛",
			label: "fix",
			intro: "- Fix a bug",
			id: COMMIT_TYPE.FIX,
		},
	],
	[
		COMMIT_TYPE.REFACTOR,
		{
			icon: "🔄",
			label: "refactor",
			intro: "- Refactor code that enhance code base",
			id: COMMIT_TYPE.REFACTOR,
		},
	],
	[
		COMMIT_TYPE.PERF,
		{
			icon: "🚀",
			label: "perf",
			intro: "- A code change that improves performance",
			id: COMMIT_TYPE.PERF,
		},
	],
	[
		COMMIT_TYPE.STYLE,
		{
			icon: "💄",
			label: "style",
			intro: "- Add or update style that do not affect the meaning of code",
			id: COMMIT_TYPE.STYLE,
		},
	],
	[
		COMMIT_TYPE.TEST,
		{
			icon: "🔬",
			label: "test",
			intro: "- Adding missing tests or correcting existing tests",
			id: COMMIT_TYPE.TEST,
		},
	],
	[
		COMMIT_TYPE.DOCS,
		{
			icon: "📝",
			label: "docs",
			intro: "- Documentation only changes",
			id: COMMIT_TYPE.DOCS,
		},
	],
	[
		COMMIT_TYPE.CI,
		{
			icon: "👷",
			label: "ci",
			intro: "- Changes to our CI configuration files and scripts",
			id: COMMIT_TYPE.CI,
		},
	],
	[
		COMMIT_TYPE.CHORE,
		{
			icon: "🔧",
			label: "chore",
			intro: "- Other changes that don't modify src or test file",
			id: COMMIT_TYPE.CHORE,
		},
	],
	[
		COMMIT_TYPE.BUILD,
		{
			icon: "📦",
			label: "build",
			intro: "- Make architectural changes",
			id: COMMIT_TYPE.BUILD,
		},
	],
	[
		COMMIT_TYPE.INIT,
		{
			icon: "🌱",
			label: "init",
			intro: "- Init awesome project",
			id: COMMIT_TYPE.INIT,
		},
	],
]);