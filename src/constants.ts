import packageJson from "@/../../package.json";
import { COMMIT_TYPE, SCOPE } from "@/ui/stores/commit";

// * METADATA
export const DESCRIPTION = packageJson.description;
export const VERSION = `V${packageJson.version}`;

// * OPTIONS
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
export const COMMIT_SCOPE_OPTIONS = new Map([
	[
		SCOPE.NONE,
		{
			id: SCOPE.NONE,
			label: "[Enter]",
			value: undefined,
			description: "(No scope)",
		},
	],
	[
		SCOPE.DEPS,
		{
			id: SCOPE.DEPS,
			label: "deps",
			value: "deps",
			description: "Package management changes, such as adding, updating, or removing dependencies.",
		},
	],
	[
		SCOPE.CONFIG,
		{
			id: SCOPE.CONFIG,
			label: "config",
			value: "config",
			description: "Configuration file changes, such as adding, updating, or removing configuration options.",
		},
	],
	[
		SCOPE.UI,
		{
			id: SCOPE.UI,
			label: "ui",
			value: "ui",
			description: "User interface changes, such as layout, style, or interaction modifications.",
		},
	],
	[
		SCOPE.API,
		{
			id: SCOPE.API,
			label: "api",
			value: "api",
			description: "API interface changes, such as adding, modifying, or removing API endpoints.",
		},
	],
	[
		SCOPE.DATABASE,
		{
			id: SCOPE.DATABASE,
			label: "database",
			value: "database",
			description: "Database changes, such as adding, modifying, or removing tables, fields, or indexes.",
		},
	],
	[
		SCOPE.MODEL,
		{
			id: SCOPE.MODEL,
			label: "model",
			value: "model",
			description: "Data model changes, such as adding, modifying, or removing data models.",
		},
	],
	[
		SCOPE.CONTROLLER,
		{
			id: SCOPE.CONTROLLER,
			label: "controller",
			value: "controller",
			description: "Controller changes, such as adding, modifying, or removing controllers.",
		},
	],
	[
		SCOPE.VIEW,
		{
			id: SCOPE.VIEW,
			label: "view",
			value: "view",
			description: "View changes, such as adding, modifying, or removing views.",
		},
	],
	[
		SCOPE.ROUTE,
		{
			id: SCOPE.ROUTE,
			label: "route",
			value: "route",
			description: "Route changes, such as adding, modifying, or removing routes.",
		},
	],
	[
		SCOPE.TEST,
		{
			id: SCOPE.TEST,
			label: "test",
			value: "test",
			description: "Test changes, such as adding, modifying, or removing test cases.",
		},
	],
]);
