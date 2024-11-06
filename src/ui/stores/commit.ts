import { create } from "zustand";
import { createSelectors } from "./utils";

export enum STEP {
	TYPE = "type",
	SCOPE = "scope",
	PREVIEW = "preview",
}

export enum COMMIT_TYPE {
	FEAT = "feat",
	FIX = "fix",
	REFACTOR = "refactor",
	PERF = "perf",
	STYLE = "style",
	TEST = "test",
	DOCS = "docs",
	CI = "ci",
	CHORE = "chore",
	BUILD = "build",
	INIT = "init",
}

export enum SCOPE {
	DEPS = "deps",
	CONFIG = "config",
	UI = "ui",
	API = "api",
	DATABASE = "database",
	MODEL = "model",
	CONTROLLER = "controller",
	VIEW = "view",
	TEST = "test",
	ROUTE = "route",
	NONE = "none",
}

type State = {
	step: STEP;
	selectedType: COMMIT_TYPE;
	selectedScope: SCOPE;
};

const defaultData: State = {
	step: STEP.TYPE,
	selectedType: COMMIT_TYPE.FEAT,
	selectedScope: SCOPE.NONE,
};

const useStore = create<State>()(() => defaultData);
export const useCommitSelector = createSelectors(useStore);

const set = useStore.setState;
const get = useStore.getState;

export const setStep = (step: STEP) => set({ step });

export const setSelectedType = (selectedType: COMMIT_TYPE) => set({ selectedType });

export const setSelectedScope = (selectedScope: SCOPE) => set({ selectedScope });
