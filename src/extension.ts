// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getRandomAffirmation } from './lib/affirmations';
import axios from 'axios';

async function getAffirmation() {
	try {
		vscode.window.showInformationMessage(
			(
				await axios.get('https://jamesinaxx.me/api/affirmations', {
					timeout: 10,
				})
			).data.affirmation
		);
	} catch (error) {
		if (error.dueToNoInternetConnection) {
			vscode.window.showInformationMessage(getRandomAffirmation());
		}
	}
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension vscode-devaffirmations has been enabled');

	getAffirmation();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand(
		'vscode-devaffirmations.affirm',
		() => getAffirmation()
	);

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
