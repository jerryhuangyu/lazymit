export type ModelProvider = "openai" | "gemini";

export interface ILLM {
	get providerName(): ModelProvider;

	uuid: string;
	model: string;
	apiKey: string;
	apiBase: string;
}
