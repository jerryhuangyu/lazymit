import { DESCRIPTION, VERSION } from "@/constants";
import Lazymit from "@/ui/Lazymit";
import { Command } from "commander";
import { render } from "ink";

const lazymit = new Command();

lazymit.name("lazymit").description(DESCRIPTION).version(VERSION);

lazymit.parse();

const options = lazymit.opts();

render(<Lazymit />);
