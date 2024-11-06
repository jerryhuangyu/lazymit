import { Box, Text } from "ink";

interface StepHeaderProps {
	step: number;
	totalSteps: number;
	title: string;
}

const StepHeader = ({ step, totalSteps, title }: StepHeaderProps) => {
	return (
		<Box
			borderColor="greenBright"
			borderLeft={false}
			borderRight={false}
			borderStyle={"bold"}
			borderTop={false}
			flexDirection={"row"}
			justifyContent={"center"}
			paddingLeft={1}
			paddingRight={1}
		>
			<Text bold>{`${step}/${totalSteps} ${title}`.toUpperCase()}</Text>
		</Box>
	);
};
export default StepHeader;
