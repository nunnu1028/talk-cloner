import { existsSync, mkdirSync } from "fs";
import { bypassDetection, changePackage, decompileAPK, getTreeOfFolder, recompileAPK, removeSplit, signAPK } from "./modules";

export interface SigningOptions {
	keyPath: string;
	keyAlias: string;
	keyPassword: string;
}

export interface CloningOptions {
	srcPath: string;
	distFolderPath: string;
	fromPackageName: string;
	toPackageName: string;
	signing?: boolean;
	signingOptions?: SigningOptions;
}

/*
	Portions of this source code is from New-Banced cloning source code.
	Cloned KakaoTalk apk file recycling is not possible. (Maybe)
	To use this function, you need to set options with srcPath, distFolderPath, fromPackageName, toPackageName.
	FromPackageName and ToPackageName must come from the end of PackageName. (com.kakao.talk -> talk)

	Nunnu1028
 */
export async function cloneKakaoTalk(options: CloningOptions): Promise<string> {
	if (options.signing && !options.signingOptions) throw new Error("If you want to sign, you need to provide signing options");
	if (!existsSync(options.srcPath)) throw new Error("Source path does not exist");
	if (!existsSync(options.distFolderPath)) throw new Error("Dist folder path does not exist");

	await decompileAPK(options.srcPath, `${options.distFolderPath}/decompiled/`);
	const tree = getTreeOfFolder(`${options.distFolderPath}/decompiled/`);
	bypassDetection(tree);
	removeSplit(options.distFolderPath);
	changePackage(tree, options.distFolderPath, options.toPackageName, options.fromPackageName);
	await recompileAPK(`${options.distFolderPath}/decompiled/`, `${options.distFolderPath}/build.apk`);

	if (options.signing) {
		await signAPK(
			`${options.distFolderPath}/build.apk`,
			options.signingOptions!.keyPath,
			options.signingOptions!.keyAlias,
			options.signingOptions!.keyPassword
		);
	}

	return `${options.distFolderPath}/build.apk`;
}

(async () => {
	const date = Date.now();
	const workingPath = `${process.cwd()}/temp-folder-${date}`;
	mkdirSync(workingPath);
	await cloneKakaoTalk({
		srcPath: "./apk/com.kakao.talk.apk",
		toPackageName: "talc",
		fromPackageName: "talk",
		distFolderPath: workingPath,
		signing: true,
		signingOptions: {
			keyPath: "./key.keystore",
			keyAlias: "key",
			keyPassword: "bullshit"
		}
	});

	console.log(`Working Finished. time: ${(Date.now() - date) / 1000 / 60} min`);
})();
