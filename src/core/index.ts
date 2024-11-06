import "dotenv/config";
import { COMMIT_TYPE_OPTIONS } from "@/constants";
import { Git } from "@/core/git";
import { GeminiLLM } from "@/core/llm/GeminiLLM";
import { Prompt } from "@/core/prompt";

const git = new Git();

const prompt = new Prompt();

const geminiLLM = new GeminiLLM(
	"uuid-5678",
	// "gemini-1.5-flash-latest",
	"gemini-1.5-pro-latest",
	process.env.GEMINI_API_KEY ?? "",
	"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:",
);

export async function genCommit({ commitType, commitScope }: { commitType: string; commitScope?: string }) {
	try {
		const diff = git.getDiff();
		const promptText = prompt.getPrompt(diff, { commitType });
		const response = await geminiLLM.chat(promptText);
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
	const message = response.split(":")[1].replaceAll('"', "").trim();
	const scopeMessage = scope ? `(${scope})` : "";
	return `${type}${scopeMessage}: ${message}`;
}

export function gitCommit(message: string) {
	git.execGitCommit(message);
}
