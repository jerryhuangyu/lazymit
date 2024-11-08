import { COMMIT_SCOPE_OPTIONS, COMMIT_TYPE_OPTIONS } from "@/constants";
import { genCommit, gitCommit } from "@/core";
import StepHeader from "@/ui/components/StepHeader";
import { STEP, useCommitSelector } from "@/ui/stores/commit";
import { Alert, Spinner, TextInput } from "@inkjs/ui";
import { Box, Text } from "ink";
import { useEffect, useState } from "react";

const Preview = () => {
	// state(local)
	const [commitMessage, setCommitMessage] = useState<string | null>(null);
	const [error, setError] = useState<{ message: string } | null>(null);
	// state(global)
	const selectedTypeID = useCommitSelector.use.selectedType();
	const selectedScope = useCommitSelector.use.selectedScope();
	// var
	const type = COMMIT_TYPE_OPTIONS.get(selectedTypeID);
	const scope = COMMIT_SCOPE_OPTIONS.get(selectedScope);

	useEffect(() => {
		async function tryGenCommitMessage() {
			try {
				const commitMsg = await genCommit({
					commitType: type?.label ?? "",
					commitScope: scope?.value,
				});
				setCommitMessage(commitMsg);
				setError(null);
			} catch (error) {
				let message = "Unknown Error";
				if (error instanceof Error) {
					message = error.message;
				}
				setError({ message: message });
			}
		}

		tryGenCommitMessage();
	}, [type, scope]);

	const handleSubmit = (commitMessage: string) => {
		if (!error) {
			gitCommit(commitMessage);
		}
		process.exit(0);
	};

	return (
		<Box width="100%" minHeight={25} borderStyle="single" paddingX={2} paddingY={1} flexDirection="column">
			{/* header */}
			<StepHeader step={3} totalSteps={Object.keys(STEP).length} title="Commit message" />
			{/* Input */}
			{!commitMessage && !error && (
				<Box borderBottom={true} borderColor="cyanBright" borderStyle="round" flexDirection="row" paddingX={1} marginBottom={1}>
					<Spinner label="Generating commit message..." />
					<TextInput placeholder="" />
				</Box>
			)}
			{commitMessage && (
				<Box borderBottom={true} borderColor="cyanBright" borderStyle="round" flexDirection="row" paddingX={1} marginBottom={1}>
					<TextInput defaultValue={commitMessage} onSubmit={handleSubmit} />
				</Box>
			)}
			{error && (
				<Box>
					<Alert variant="error">{error.message}</Alert>
				</Box>
			)}
			{/* Footer */}
			<Box width="100%" flexGrow={1} flexDirection="row" justifyContent="center" alignItems="flex-end">
				{commitMessage && <Text color="grey">(Enter to submit commit)</Text>}
			</Box>
		</Box>
	);
};
export default Preview;
