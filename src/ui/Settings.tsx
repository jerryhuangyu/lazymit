import { Config } from "@/core/config";
import { Badge, Select, TextInput } from "@inkjs/ui";
import { Box, Text } from "ink";
import { useState } from "react";
import StepHeader from "./components/StepHeader";

enum SETTINGS {
	MODEL = "model",
	API_KEY = "api_key",
	COMPLETION = "completion",
}

const Settings = () => {
	const [step, setStep] = useState<SETTINGS>(SETTINGS.MODEL);
	const config = new Config();

	return (
		<Box width="100%" minHeight={25} borderStyle="single" paddingX={2} paddingY={1} flexDirection="column" gap={1}>
			{/* header */}
			<StepHeader step={1} totalSteps={3} title="Lazymit Settings" />
			<Box flexDirection="row" gap={1}>
				<StepItem isActive={step === SETTINGS.MODEL} label="AI Model" />
				<Text> -&gt; </Text>
				<StepItem isActive={step === SETTINGS.API_KEY} label="API Key" />
				<Text> -&gt; </Text>
				<StepItem isActive={step === SETTINGS.COMPLETION} label="Settings" />
			</Box>

			{step === SETTINGS.MODEL && (
				<ModelSection
					onChange={(model) => {
						config.updateModel(model);
						setStep(SETTINGS.API_KEY);
					}}
				/>
			)}
			{step === SETTINGS.API_KEY && (
				<ApiKeySection
					onSubmit={(apiKey) => {
						config.updateApiKey(apiKey);
						setStep(SETTINGS.COMPLETION);
					}}
				/>
			)}
			{step === SETTINGS.COMPLETION && <CompletionSection model={config.getConfig().model} apiKey={config.getConfig().apiKey} />}
		</Box>
	);
};
export default Settings;

const StepItem = ({ label, isActive }: { label: string; isActive: boolean }) => (
	<Box>
		{isActive && <Badge color="greenBright">{label}</Badge>}
		{!isActive && <Text color="greenBright">{label}</Text>}
	</Box>
);

const CompletionSection = ({ model, apiKey }: { model: string; apiKey: string }) => (
	<Box flexDirection="column">
		<Box paddingX={2} gap={1}>
			<Box width={12}>
				<Text color="#363636">AI Model: </Text>
			</Box>
			<Text color="#363636">{model}</Text>
		</Box>
		<Box paddingX={2} gap={1}>
			<Box width={12}>
				<Text color="#363636">API Key: </Text>
			</Box>
			{!!apiKey && <Text color="#363636">{"*".repeat(apiKey.length)}</Text>}
		</Box>
	</Box>
);

const ApiKeySection = ({ onSubmit }: { onSubmit: (apiKey: string) => void }) => (
	<Box flexDirection="column">
		<Box borderBottom={true} borderColor="cyanBright" borderStyle="round" paddingX={1}>
			<TextInput placeholder="Gemini API key..." onSubmit={onSubmit} />
		</Box>
		<Box paddingX={2}>
			<Text color="#363636">Enter your API key to use the AI model.</Text>
		</Box>
	</Box>
);

const ModelSection = ({ onChange }: { onChange: (model: string) => void }) => (
	<Box flexDirection="column">
		<Box borderBottom={true} borderColor="cyanBright" borderStyle="round" flexDirection="row" paddingX={1}>
			<Select
				onChange={onChange}
				options={[
					{ label: "Gemini Flash", value: "gemini-1.5-flash-latest" },
					{ label: "Gemini Pro", value: "gemini-1.5-pro-latest" },
				]}
			/>
		</Box>
		<Box paddingX={2}>
			<Text color="#363636">Select a model to use for generating commit messages.</Text>
		</Box>
	</Box>
);
