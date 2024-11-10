import { COMMIT_TYPE_OPTIONS } from "@/constants";
import { Config } from "@/core/config";
import { Git } from "@/core/git";
import { LLM_MODEL } from "@/core/llm";
import { GeminiLLM } from "@/core/llm/GeminiLLM";
import { OpenAILLM } from "@/core/llm/OpenAILLM";
import { Prompt } from "@/core/prompt";

const git = new Git();
const prompt = new Prompt();
const config = new Config();

export async function genCommit({ commitType, commitScope }: { commitType: string; commitScope?: string }) {
	const diff = git.getDiff();
	const promptText = prompt.getPrompt(diff, { commitType });

	const { model, apiKey } = config.getConfig();
	if (!model) throw new Error("No AI model detected. Try using with -i or --init to configure settings.");
	if (!apiKey) throw new Error("No API key detected. Try using with -i or --init to configure settings.");

	let aiModel = undefined;
	if (model === LLM_MODEL.GEMINI_FLASH || model === LLM_MODEL.GEMINI_PRO) {
		aiModel = new GeminiLLM("test", model, apiKey, "");
	}
	if (model === LLM_MODEL.GPT_4O_LATEST || model === LLM_MODEL.GPT_4O_MINI) {
		aiModel = new OpenAILLM("test", model, apiKey, "");
	}

	if (!aiModel) throw new Error(`The AI model: ${model} not supported.`);

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
