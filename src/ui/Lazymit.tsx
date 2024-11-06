import Preview from "@/ui/pages/Preview";
import ScopeForm from "@/ui/pages/ScopeForm";
import TypeForm from "@/ui/pages/TypeForm";
import { STEP, useCommitSelector } from "@/ui/stores/commit";

const Lazymit = () => {
	const step = useCommitSelector.use.step();

	if (step === STEP.TYPE) return <TypeForm />;
	if (step === STEP.SCOPE) return <ScopeForm />;
	if (step === STEP.PREVIEW) return <Preview />;
	return;
};
export default Lazymit;
