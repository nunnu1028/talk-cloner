import { exec } from "child_process";
import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";

const apkToolPath = "./bin/apktool_2.6.1.jar";
const uberApkSignerPath = "./bin/uber-apk-signer-1.2.1.jar";
const zipAlignPath = "./bin/zipalign.exe";

export async function execution(command: string): Promise<string> {
	return new Promise((resolve, reject) => {
		exec(command, { maxBuffer: Infinity }, (error, stdout) => {
			if (error) {
				reject(error);
			}
			resolve(stdout);
		});
	});
}

export async function decompileAPK(apkPath: string, outputPath: string): Promise<void> {
	const command = `java -jar ${apkToolPath} d -f -m -o ${outputPath} ${apkPath}`;
	await execution(command);
}

export async function recompileAPK(srcPath: string, outputPath: string): Promise<void> {
	const command = `java -jar ${apkToolPath} --use-aapt2 b -f -o ${outputPath} ${srcPath}`;
	await execution(command);
}

export async function generateKeyUsingKeyTool(outputPath: string, alias: string, password: string): Promise<void> {
	const command = `keytool -genkey -v -keystore ${outputPath} -alias ${alias} -keyalg RSA -keysize 2048 -validity 10000 -storepass ${password} -dname "CN=${alias}, OU=, O=, L=, S=, C="`;
	await execution(command);
}

export async function signAPK(apkPath: string, keyPath: string, alias: string, password: string): Promise<void> {
	const command = `java -jar ${uberApkSignerPath} --ks ${keyPath} --ksAlias ${alias} --ksPass ${password} --ksKeyPass ${password} --apk ${apkPath} --zipAlignPath ${zipAlignPath} --overwrite`;
	await execution(command);
}

export function getTreeOfFolder(folderPath: string): string[] {
	const files = readdirSync(folderPath);
	const filePaths = [];

	for (const file of files) {
		const filePath = join(folderPath, file);
		const stat = statSync(filePath);
		if (stat.isDirectory()) {
			filePaths.push(...getTreeOfFolder(filePath));
		} else {
			filePaths.push(filePath);
		}
	}

	return filePaths;
}

export interface MethodInfo {
	src: string;
	methodName: string;
	startLine: number;
	endLine: number;
}

export function editMethod(method: MethodInfo, originalSrc: string, newSrc: string, methodName: string = ""): string {
	if (!method) return "";
	const originalLines = originalSrc.split("\n");
	const newLines = [methodName ? methodName : originalLines[method.startLine], "\n" + newSrc, originalLines[method.endLine--].trim()];
	originalLines.splice(method.startLine, method.endLine - method.startLine, newLines.join(""));

	return originalLines.join("\n");
}

export function findMethodByMethodName(method: string, filePath: string): MethodInfo[] {
	const methodInfos: MethodInfo[] = [];
	const file = readFileSync(filePath).toString();
	const lines = file.split("\n");

	const startLine = lines.findIndex((line) => line.startsWith(method));
	const endLine = startLine + lines.slice(startLine).findIndex((line) => line.startsWith(".end method")) + 1;
	const slicedSrc = lines.slice(startLine, endLine);
	const src = slicedSrc.join("\n");
	const methodName = slicedSrc[0].split(" ").reverse()[0];

	methodInfos.push({
		src,
		methodName,
		startLine,
		endLine
	});

	return methodInfos;
}

export function findMethod(regexp: RegExp, filePath: string): MethodInfo[] {
	const file = readFileSync(filePath).toString();
	const matches = file.matchAll(regexp);
	const res: MethodInfo[] = [];

	if (matches) {
		for (const match of matches) {
			const index = match.index!;
			const slicedLines = file.slice(0, index).split("\n");
			const lines = file.split("\n");

			const startLine = slicedLines.length - slicedLines.reverse().findIndex((line) => line.startsWith(".method")) - 1;
			const endLine = startLine + lines.slice(startLine).findIndex((line) => line.startsWith(".end method")) + 1;
			const slicedSrc = lines.slice(startLine, endLine);
			const src = slicedSrc.join("\n");
			const methodName = slicedSrc[0].split(" ").reverse()[0];

			res.push({
				src,
				methodName,
				startLine,
				endLine
			});
		}
	}

	return res;
}
