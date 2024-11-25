# Lazymit

> Commit CLI tool, Leverages the power of AI to generate Gitmoji-based commit messages

[![npm version](https://img.shields.io/npm/v/lazymit.svg)](https://www.npmjs.com/package/lazymit)
[![License](https://img.shields.io/npm/l/lazymit.svg)](https://www.npmjs.com/package/lazymit)

## Features

* **AI-Powered:** Automatically generates commit messages using AI.
* **Gitmoji:**  Uses Gitmojis for expressive commit messages.
* **Interactive:**  Guides through process with an intuitive interface.

## Installation

```bash
npm install -g lazymit
```

## Usage

1. Set up your API key and preferred AI model.

```bash
lazymit --init
```

2. Stage the files you want to commit.

```bash
git add <files...>
```

3. Run Lazymit!

```bash
lazymit
```

## Configuration

Lazymit uses a configuration file to store your API key and AI model preferences. The `lazymit --init` command will guide you through setting up this configuration.

## Supported AI Models

- [x] Gemini 1.5 Flash
- [x] Gemini 1.5 Pro
- [x] ChatGPT 4O
- [x] GPT 4O Mini

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
