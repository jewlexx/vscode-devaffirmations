// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from 'axios';
import { affirmations } from './lib/affirmations.json';

const getRandomAffirmation = async () =>
	affirmations[Math.floor(Math.random() * affirmations.length)];

async function showAffirmation() {
	const affirmation = new Promise((resolve, _reject) => {
		axios
			.get('https://jamesinaxx.me/api/affirmations', {
				timeout: 10,
			})
			.then(async res => resolve(res.data.affirmation))
			.catch(async () => resolve(await getRandomAffirmation()));
	});

	affirmation.then((res: any) => {
		console.log('Showing affirmation: ' + res);
		vscode.window.showInformationMessage(res);
	});
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension vscode-devaffirmations has been enabled');

	showAffirmation();

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let command = vscode.commands.registerCommand(
		'vscode-devaffirmations.affirm',
		showAffirmation
	);

	context.subscriptions.push(command);
}

// this method is called when your extension is deactivated
export function deactivate() {}
