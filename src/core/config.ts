import Conf from "conf";

const schema = {
	api_key: { type: "string" },
	model: { type: "string" },
};

type Schema = { model: string; api_key: string };

export class Config {
	private config: Conf<Schema>;

	constructor() {
		this.config = new Conf<Schema>({ projectName: "lazymit", schema });
	}

	updateApiKey(apiKey: string) {
		this.config.set("api_key", apiKey);
	}
	private removeApiKey() {
		this.config.delete("api_key");
	}
	private getApiKey() {
		return this.config.get("api_key");
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
