import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import type { IConfig } from "./config";

export enum LLM_MODEL {
	GEMINI_FLASH = "gemini-1.5-flash-latest",
	GEMINI_PRO = "gemini-1.5-pro-latest",
	GPT_4O_LATEST = "chatgpt-4o-latest",
	GPT_4O_MINI = "gpt-4o-mini",
}

interface LLM {
	chat(prompt: string): Promise<string>;
	providerName: string;
}

abstract class BaseLLM implements LLM {
	constructor(
		public model: string,
		public apiKey: string,
	) {}
	abstract chat(prompt: string): Promise<string>;
	abstract providerName: string;
}

class GeminiLLM extends BaseLLM {
	private _geminiAI: GoogleGenerativeAI;
	get providerName() {
		return "gemini";
	}

	constructor(model: string, apiKey: string) {
		super(model, apiKey);
		this._geminiAI = new GoogleGenerativeAI(apiKey);
	}

	async chat(prompt: string): Promise<string> {
		const result = await this._geminiAI.getGenerativeModel({ model: this.model }).generateContent(prompt);
		return result.response.text();
	}
}

class OpenAILLM extends BaseLLM {
	private _openAI: OpenAI;
	get providerName() {
		return "openai";
	}

	constructor(model: string, apiKey: string) {
		super(model, apiKey);
		this._openAI = new OpenAI({ apiKey });
	}

	async chat(prompt: string): Promise<string> {
		const result = await this._openAI.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			model: this.model,
		});
		return result.choices[0].message?.content ?? "";
	}
}

export function createLLM(config: IConfig): LLM {
	const { model, apiKey } = config;
	if (!apiKey) throw new Error("No API key detected. Run 'lazymit --init'.");
	if (!model) throw new Error("No AI model selected. Run 'lazymit --init'.");

	switch (model) {
		case LLM_MODEL.GEMINI_FLASH:
		case LLM_MODEL.GEMINI_PRO:
			return new GeminiLLM(model, apiKey);
		case LLM_MODEL.GPT_4O_LATEST:
		case LLM_MODEL.GPT_4O_MINI:
			return new OpenAILLM(model, apiKey);
		default:
			throw new Error(`Unsupported LLM model: ${model}. Run 'lazymit --init'.`);
	}
}
