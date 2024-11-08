import { DESCRIPTION, VERSION } from "@/constants";
import Lazymit from "@/ui/Lazymit";
import Remove from "@/ui/Remove";
import Settings from "@/ui/Settings";
import { Command, Option } from "commander";
import { render } from "ink";

const lazymit = new Command();

lazymit
	.name("lazymit")
	.description(DESCRIPTION)
	.version(VERSION)
	.addOption(new Option("-i, --init", "Initialize lazymit config"))
	.addOption(new Option("-r, --remove", "Remove config file"));

lazymit.parse();

const options = lazymit.opts();
if (options.init) {
	render(<Settings />);
} else if (options.remove) {
	render(<Remove />);
} else {
	render(<Lazymit />);
}
