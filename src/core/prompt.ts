import { COMMIT_TYPE_OPTIONS } from "@/constants";

const MAX_LENGTH = 10;
const LOCALE = "English";

export class Prompt {
	private getBasePrompt(gitDiff: string): string {
		return `You are to act as the author of a commit message in git.
		Your mission is to create clean and comprehensive commit messages in the conventional commit convention and explain WHAT were the changes and WHY the changes were done.
		I'll enter a git diff summary, and your job is to convert it into a useful commit message.
		\n-----\n${gitDiff}\n-----\n
		Add a short description of the changes are done after the commit message.
		Don't start it with 'This commit', just describe the changes.
		Use the present tense.`;
	}

	private getTypeOptions(type?: string): string {
		const typeOptions = Array.from(COMMIT_TYPE_OPTIONS.values())
			.map((option) => `- type: ${option.label}, description: ${option.intro}`)
			.join("\n");
		const selectedType = Array.from(COMMIT_TYPE_OPTIONS.values()).find(
			(option) => option.label.toLowerCase() === type?.toLowerCase(),
		);

		if (!type || !selectedType) {
			return `- Choose only 1 type from the type-to-description below: <${typeOptions}>. Don't use any other type.`;
		}
		return `- Use commit type: ${selectedType.icon} ${selectedType.label}, description: ${selectedType.intro}.`;
	}

	private getMaxMessageLength(): string {
		return `Commit message must below ${MAX_LENGTH} characters.
		And MUST and ONLY return commit message title.
		Make it short in one sentence and concise.`;
	}

	private getLocale(): string {
		return `- Write the commit message in ${LOCALE}.`;
	}

	private getKeepFormat(): string {
		return `- Keep the format of the commit message as "{type}: {subject}".
		Don't change the format.
		If the type is not applicable, just return the subject.
		Don't return any other text except the commit message.
		Don't return any explanation.
		Don't return any example.
		Don't return any note.
		Don't return any warning.
		Don't return any error.
		Don't return any other text except the commit message.
		Don't return any text that is not a commit message.
		Don't return any text that is not in the format of "{type}: {subject}".
		Don't return any text that is not in the format of "{subject}".
		Don't return any text that is not in the format of "{type}: {subject}" if the type is not applicable.
		If the type is not applicable, just return the subject.
		If the type is applicable, return the commit message in the format of "{type}: {subject}".
		If the type is not applicable, just return the subject.
		Don't return any text that is not in the format of "{type}: {subject}" or "{subject}".
		Don't return more than one sentence.`;
	}

	private getKeyPointsForGoodCommitMessage(): string {
		return `Key Elements of a Good Commit Message:
    - Conciseness and Clarity: Summarize changes without excessive detail for easy readability.
    - Present Tense: Use imperative present tense (e.g., "Add feature," "Fix bug") for consistency.
    - First Line as a Summary: Use a brief first line (50 characters or fewer), followed by a blank line for readability.
    - Detailed Explanation (Optional): Add further context in the body if needed to explain motivations or alternatives.
    - Linking to Issue Trackers: Reference issue numbers for traceability with bug tracking or task management systems.
    - Consistency: Follow team-wide or widely accepted conventions to improve readability and cohesion.
    - Avoid Overly Large Commits: Make smaller, focused commits for clearer and more manageable history.`;
	}

	getPrompt(gitDiff: string, options: { commitType?: string }): string {
		return `
			${this.getKeyPointsForGoodCommitMessage()}\n
			${this.getBasePrompt(gitDiff)}\n
			${this.getTypeOptions(options?.commitType)}\n
			${this.getMaxMessageLength()}\n
			${this.getLocale()}\n
			${this.getKeepFormat()}
		`;
	}
}
