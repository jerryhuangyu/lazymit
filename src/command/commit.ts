import { COMMIT_TYPE_OPTIONS } from "@/constants";
import { Config, Git, Prompt, createLLM } from "@/core";

export async function generateCommitMessage({ commitType, commitScope }: { commitType: string; commitScope?: string }) {
	const git = new Git();
	const prompt = new Prompt();
	const config = new Config();

	try {
		const aiConfig = config.getConfig();
        if (!aiConfig.apiKey || !aiConfig.model) {
            throw new Error("API key or model not configured. Please run 'lazymit --init' first.");
        }

		const diff = git.getDiff();
		const promptText = prompt.getPrompt(diff, { commitType });
		const aiModel = createLLM(aiConfig);

		const response = await aiModel.chat(promptText);
		const typeWithIcon = resolveCommitTypeWithIcon(response, commitType);
		return formatCommitMessage({ response, type: typeWithIcon, scope: commitScope });
	} catch (error) {
        if (error instanceof Error) {
            console.error(`Error generating commit message: ${error.message}`);
        } else {
            console.error("An unexpected error occurred while generating commit message");
        }
        throw error;
	}
}

function resolveCommitTypeWithIcon(response: string, type: string) {
	const responseCommitType = response.split(":")[0].toLowerCase();
	const matchedOption = Array.from(COMMIT_TYPE_OPTIONS.values()).find((opt) => responseCommitType.includes(opt.label));

	if (matchedOption) {
		return `${matchedOption.icon} ${matchedOption.label}`;
	}

	const defaultOption = Array.from(COMMIT_TYPE_OPTIONS.values()).find((opt) => type.includes(opt.label));
	return defaultOption ? `${defaultOption.icon} ${defaultOption.label}` : "";
}

function formatCommitMessage({ response, type, scope }: { response: string; type: string; scope?: string }) {
	const message = response.split(":")[1]?.replace(/"/g, "").trim();
	const scopeMessage = scope ? `(${scope})` : "";
	return `${type}${scopeMessage}: ${message ?? ""}`;
}

export function commitChanges(message: string) {
	const git = new Git();
	git.execGitCommit(message);
}

export function checkHaveStagedFiles() {
	const git = new Git();
	const diff = git.getDiff();
	if (diff.length === 0) {
		console.error("No staged files detected. Please use 'git add <files...>' to stage files before generating a commit message.");
		process.exit(0);
	}
}
