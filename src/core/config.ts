import Conf from "conf";
import type { LLM_MODEL } from "./llm";

const schema = {
	apiKey: { type: "string" },
	model: { type: "string" },
};

export interface IConfig {
	model: LLM_MODEL;
	apiKey: string;
}

export class Config {
	private config: Conf<IConfig>;

	constructor() {
		this.config = new Conf<IConfig>({ projectName: "lazymit", schema });
	}

	updateApiKey(apiKey: string) {
		this.config.set("apiKey", apiKey);
	}
	private removeApiKey() {
		this.config.delete("apiKey");
	}
	private getApiKey() {
		return this.config.get("apiKey");
	}

	updateModel(model: string) {
		this.config.set("model", model);
	}
	private removeModel() {
		this.config.delete("model");
	}
	private getModel() {
		return this.config.get("model");
	}

	resetConfig() {
		this.removeApiKey();
		this.removeModel();
	}
	getConfig() {
		return {
			model: this.getModel(),
			apiKey: this.getApiKey(),
		};
	}
}
