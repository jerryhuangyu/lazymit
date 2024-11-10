import OpenAI from "openai";
import { BaseLLM } from "./BaseLLM";
import type { ModelProvider } from "./ILLM";

export class OpenAILLM extends BaseLLM {
	get providerName(): ModelProvider {
		return "openai";
	}

	private _openAI: OpenAI;

	constructor(uuid: string, model: string, apiKey: string, apiBase: string) {
		super(uuid, model, apiKey, apiBase);
		this._openAI = new OpenAI({ apiKey });
	}

	async chat(prompt: string): Promise<string> {
		const response = await this.makeApiRequest(prompt);
		return response;
	}

	async makeApiRequest(prompt: string): Promise<string> {
		const result = await this._openAI.chat.completions.create({
			messages: [{ role: "user", content: prompt }],
			model: this.model,
		});
		return result.choices[0].message?.content ?? "";
	}
}
