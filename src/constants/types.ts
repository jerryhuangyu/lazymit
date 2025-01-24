import { SCOPE } from "@/ui/stores/commit";

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
