import { GoogleGenerativeAI } from "@google/generative-ai";
import { BaseLLM } from "./BaseLLM";
import type { ModelProvider } from "./ILLM";

export class GeminiLLM extends BaseLLM {
	get providerName(): ModelProvider {
		return "gemini";
	}

	private _geminiAI: GoogleGenerativeAI;

	constructor(uuid: string, model: string, apiKey: string, apiBase: string) {
		super(uuid, model, apiKey, apiBase);
		this._geminiAI = new GoogleGenerativeAI(apiKey);
	}

	async chat(prompt: string): Promise<string> {
		const response = await this.makeApiRequest(prompt);
		return response;
	}

	async makeApiRequest(prompt: string): Promise<string> {
		const result = await this._geminiAI.getGenerativeModel({ model: this.model }).generateContent(prompt);
		return result.response.text();
	}
}
