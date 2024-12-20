import { COMMIT_TYPE_OPTIONS } from "@/constants";
import FormSelection from "@/ui/components/FormSelection";
import { COMMIT_TYPE, STEP, setSelectedType, setStep, useCommitSelector } from "@/ui/stores/commit";
import { TextInput } from "@inkjs/ui";
import { Box } from "ink";
import { useEffect, useState } from "react";

const TypeForm = () => {
	const [searchPattern, setSearchPattern] = useState<string>("");
	const selectedType = useCommitSelector.use.selectedType();

	const handleSubmit = () => {
		setStep(STEP.SCOPE);
	};

	useEffect(() => {
		const selectedCommitTypes = Array.from(COMMIT_TYPE_OPTIONS.values()).find(({ label }) =>
			label.toLowerCase().includes(searchPattern.toLowerCase()),
		);
		setSelectedType(selectedCommitTypes?.id ?? COMMIT_TYPE.FEAT);
	}, [searchPattern]);

	return (
		<>
			{/* search */}
			<Box borderBottom={true} borderColor="cyanBright" borderStyle="round" flexDirection={"row"} paddingX={1} marginBottom={1}>
				<TextInput onChange={setSearchPattern} placeholder="Search commit <type>..." onSubmit={handleSubmit} />
			</Box>

			{/* selections */}
			<Box flexDirection="column">
				{Array.from(COMMIT_TYPE_OPTIONS.values()).map(({ icon, label, intro, id }) => (
					<FormSelection key={label} label={label} icon={icon} info={intro} isSelected={id === selectedType} />
				))}
			</Box>
		</>
	);
};
export default TypeForm;
