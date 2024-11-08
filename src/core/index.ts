import { COMMIT_TYPE_OPTIONS } from "@/constants";
import { Git } from "@/core/git";
import { GeminiLLM } from "@/core/llm/GeminiLLM";
import { Prompt } from "@/core/prompt";
import { Config } from "./config";

const git = new Git();
const prompt = new Prompt();
const config = new Config();

export async function genCommit({ commitType, commitScope }: { commitType: string; commitScope?: string }) {
	const diff = git.getDiff();
	const promptText = prompt.getPrompt(diff, { commitType });

	const { model, apiKey } = config.getConfig();
	if (!model) throw new Error("No AI model detected. Try using with -i or --init to configure settings");
	if (!apiKey) throw new Error("No API key detected. Try using with -i or --init to configure settings.");

	let aiModel = undefined;
	// TODO: handle un-support model error
	aiModel = new GeminiLLM("uuid-5678", model, apiKey, `https://generativelanguage.googleapis.com/v1beta/models/${model}:`);

	try {
		const response = await aiModel.chat(promptText);
		const typeWithIcon = getCommitTypeWithIcon(response, commitType);
		const formattedResponse = formatCommitMessage({ response, type: typeWithIcon, scope: commitScope });
		return formattedResponse;
	} catch (error) {
		console.error("Error generating commit message:", error);
		throw error;
	}
}

function getCommitTypeWithIcon(response: string, type: string) {
	const responseCommitType = response.split(":")[0].toLowerCase();
	const option = Array.from(COMMIT_TYPE_OPTIONS.values()).find((opt) => responseCommitType.includes(opt.label));
	if (!option) {
		const defaultOption = Array.from(COMMIT_TYPE_OPTIONS.values()).find((opt) => type.includes(opt.label));
		return defaultOption ? `${defaultOption.icon} ${defaultOption.label}` : "";
	}
	return `${option.icon} ${option.label}`;
}

function formatCommitMessage({ response, type, scope }: { response: string; type: string; scope?: string }) {
	const message = response.split(":")[1]?.replaceAll('"', "").trim();
	const scopeMessage = scope ? `(${scope})` : "";
	return `${type}${scopeMessage}: ${message ?? ""}`;
}

export function gitCommit(message: string) {
	// TODO: check have staged file
	git.execGitCommit(message);
}
