import type { ILLM, ModelProvider } from "./ILLM";

export abstract class BaseLLM implements ILLM {
	abstract get providerName(): ModelProvider;

	uuid: string;
	model: string;
	apiKey: string;
	apiBase: string;

	constructor(uuid: string, model: string, apiKey: string, apiBase: string) {
		this.uuid = uuid;
		this.model = model;
		this.apiKey = apiKey;
		this.apiBase = apiBase;
	}

	abstract chat(prompt: string): Promise<string>;
}
