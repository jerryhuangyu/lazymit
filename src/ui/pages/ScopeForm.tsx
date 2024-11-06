import { COMMIT_SCOPE_OPTIONS } from "@/constants";
import FormSelection from "@/ui/components/FormSelection";
import StepHeader from "@/ui/components/StepHeader";
import { SCOPE, STEP, setSelectedScope, setStep, useCommitSelector } from "@/ui/stores/commit";
import { TextInput } from "@inkjs/ui";
import { Box } from "ink";
import { useEffect, useState } from "react";

const ScopeForm = () => {
	const [searchPattern, setSearchPattern] = useState<string>("");
	const selectedScope = useCommitSelector.use.selectedScope();

	const handleSubmit = () => {
		setStep(STEP.PREVIEW);
	};

	useEffect(() => {
		const selectedCommitScope = Array.from(COMMIT_SCOPE_OPTIONS.values()).find(({ label }) =>
			label.toLowerCase().includes(searchPattern.toLowerCase()),
		);
		setSelectedScope(selectedCommitScope?.id ?? SCOPE.NONE);
	}, [searchPattern]);

	return (
		<Box width="100%" minHeight={25} borderStyle="single" paddingX={2} paddingY={1} flexDirection="column">
			{/* header */}
			<StepHeader step={2} totalSteps={Object.keys(STEP).length} title="Select the commit scope (optional)" />

			{/* search */}
			<Box borderBottom={true} borderColor="cyanBright" borderStyle="round" flexDirection={"row"} paddingX={1} marginBottom={1}>
				<TextInput
					onChange={setSearchPattern}
					placeholder="Search commit <scope>, or press [Enter] to skip..."
					onSubmit={handleSubmit}
				/>
			</Box>

			{/* selections */}
			<Box flexDirection="column">
				{Array.from(COMMIT_SCOPE_OPTIONS.values()).map(({ label, id, description }) => (
					<FormSelection key={label} label={label} info={`- ${description}`} isSelected={id === selectedScope} />
				))}
			</Box>
		</Box>
	);
};
export default ScopeForm;
