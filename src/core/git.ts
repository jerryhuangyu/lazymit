import { execSync } from "node:child_process";

export class Git {
	getDiff() {
		return execSync("git diff --staged --ignore-all-space --diff-algorithm=minimal --function-context --no-ext-diff --no-color", {
			maxBuffer: 1024 ** 6,
		}).toString();
	}

	execGitCommit(message: string) {
		execSync(`git commit -m "${message}"`, {
			maxBuffer: 1024 ** 6,
		});
	}
}
