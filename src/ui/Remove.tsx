import { Config } from "@/core/config";
import { ConfirmInput, StatusMessage } from "@inkjs/ui";
import { Box, Text } from "ink";
import { useState } from "react";

const Remove = () => {
	const [choice, setChoice] = useState<"agreed" | "disagreed" | undefined>();

	return (
		<Box flexDirection="column">
			<Text bold>Removing settings will restore defaults. Continue?</Text>
			{!choice && (
				<ConfirmInput
					onConfirm={() => {
						setChoice("agreed");
						const config = new Config();
						config.resetConfig();
					}}
					onCancel={() => setChoice("disagreed")}
				/>
			)}

			{choice === "agreed" && <StatusMessage variant="success">Settings have been reset to default.</StatusMessage>}
			{choice === "disagreed" && <StatusMessage variant="info">Ok, Your settings remain unchanged.</StatusMessage>}
		</Box>
	);
};
export default Remove;
