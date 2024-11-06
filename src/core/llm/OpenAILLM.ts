import { BaseLLM } from "./BaseLLM";
import type { ModelProvider } from "./ILLM";

export class OpenAILLM extends BaseLLM {
	get providerName(): ModelProvider {
		return "openai";
	}

	async chat(prompt: string): Promise<string> {
		// const response = await this.makeApiRequest('generate-text', { prompt });
		return "response.text";
	}
}
