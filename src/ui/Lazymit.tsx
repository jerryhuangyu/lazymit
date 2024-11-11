import Preview from "@/ui/pages/Preview";
import ScopeForm from "@/ui/pages/ScopeForm";
import TypeForm from "@/ui/pages/TypeForm";
import { STEP, useCommitSelector } from "@/ui/stores/commit";
import { Box } from "ink";
import StepHeader from "./components/StepHeader";

const LAZYMIT_STEPS = [
	{
		step: 1,
		title: "Select the commit type",
		key: STEP.TYPE,
		sectionComponent: <TypeForm key={STEP.TYPE} />,
	},
	{
		step: 2,
		title: "Select the commit scope (optional)",
		key: STEP.SCOPE,
		sectionComponent: <ScopeForm key={STEP.SCOPE} />,
	},
	{
		step: 3,
		title: "Preview and confirm your commit message",
		key: STEP.PREVIEW,
		sectionComponent: <Preview key={STEP.PREVIEW} />,
	},
];

const Lazymit = () => {
	// state(global)
	const step = useCommitSelector.use.step();
	// var
	const totalSteps = Object.keys(STEP).length;
	const currentStep = LAZYMIT_STEPS.find((s) => s.key === step);

	return (
		<Box width="100%" minHeight={20} borderStyle="single" paddingX={2} paddingY={1} flexDirection="column">
			{/* header */}
			{currentStep && <StepHeader step={currentStep.step} totalSteps={totalSteps} title={currentStep.title} />}
			{/* body */}
			{currentStep?.sectionComponent}
		</Box>
	);
};
export default Lazymit;
