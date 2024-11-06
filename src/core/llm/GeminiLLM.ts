import { type GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";
import { BaseLLM } from "./BaseLLM";
import type { ModelProvider } from "./ILLM";

export class GeminiLLM extends BaseLLM {
	get providerName(): ModelProvider {
		return "gemini";
	}

	private _geminiFlash: GenerativeModel;

	constructor(uuid: string, model: string, apiKey: string, apiBase: string) {
		super(uuid, model, apiKey, apiBase);
		this._geminiFlash = new GoogleGenerativeAI(apiKey).getGenerativeModel({ model });
	}

	async chat(prompt: string): Promise<string> {
		const response = await this.makeApiRequest("generateContent", prompt);
		return JSON.stringify(response);
	}

	async makeApiRequest(endpoint: string, data: string): Promise<unknown> {
		const result = await this._geminiFlash.generateContent(data);
		return result.response.text();
	}
}
