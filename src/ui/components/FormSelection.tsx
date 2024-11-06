import { Box, Text } from "ink";

interface FromSelectionProps {
	icon?: string;
	label: string;
	info: string;
	isSelected: boolean;
}

const FormSelection = ({ icon, label, info, isSelected }: FromSelectionProps) => {
	return (
		<Box key={label} flexDirection="row" gap={1}>
			{icon && (
				<Box minWidth={3}>
					<Text>{icon}</Text>
				</Box>
			)}
			<Box minWidth={12}>
				<Text color={isSelected ? "blueBright" : "white"} bold={isSelected}>
					{label}
				</Text>
			</Box>
			<Text color="white">{info}</Text>
		</Box>
	);
};
export default FormSelection;
