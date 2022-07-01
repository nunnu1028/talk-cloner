import { readFileSync, writeFileSync } from "fs";
import { findMethod, editMethod } from "./util";

/*
	This source code is from New-Banced cloning source code.
	All functions will be changed in a way that uses SmaliMethod. (src/modules/edit-util.ts)
	
	Nunnu1028
 */

export function bypassDetection(tree: string[]): void {
	const platformUtils = tree.find((e) => e.split("\\").pop() === "PlatformUtils.smali")!;
	const appHelper = tree.find((e) => e.split("\\").pop() === "AppHelper.smali")!;

	const appHelperRegex1 = /invoke-virtual {v\d}, Landroid\/app\/Application;->getPackageName\(\)Ljava\/lang/g;
	const appHelperMatch1 = findMethod(appHelperRegex1, appHelper);
	const appHelperRegex2 = /const-string v\d, "Check failed."/g;
	const appHelperMatch2 = findMethod(appHelperRegex2, appHelper);
	const platformUtilsRegex = /const-string v\d, "App.getApp\(\).packageName"/g;
	const platformUtilsMatches = findMethod(platformUtilsRegex, platformUtils);

	const appHelperEdited1 = editMethod(
		appHelperMatch1[0],
		readFileSync(appHelper).toString(),
		"    .locals 1\n\n    const/4 v0, 0x0\n\n    return v0"
	);

	if (!appHelperEdited1) return console.log(`Failed to edit ${appHelper}`);
	const appHelperEdited = editMethod(appHelperMatch2[0], appHelperEdited1, "    .locals 0\n\n    return-void");

	const platformEdited = editMethod(
		platformUtilsMatches.find((e) => e.src.split("\n")[0].endsWith("Z\r"))!,
		readFileSync(platformUtils).toString(),
		"    .locals 1\n\n    const/4 v0, 0x1\n\n    return v0"
	);

	if (!appHelperEdited) return console.log(`Failed to edit ${appHelper}`);
	if (!platformEdited) return console.log(`Failed to edit ${platformUtils}`);

	writeFileSync(appHelper, appHelperEdited);
	writeFileSync(platformUtils, platformEdited);

	const utilityLists = tree.filter((e) => e.split("\\").pop() === "Utility.smali");
	utilityLists.forEach((e) => {
		const regex = /const-string v\d, "Unable to get MessageDigest. signature="/g;
		const match = findMethod(regex, e);

		const edited = editMethod(
			match[0],
			readFileSync(e).toString(),
			`   .locals 1

	const-string v0, "7MRbkCrB6DyL4XWKJX5nSS3jdFY="
	
	return-object v0`
		);
		if (!edited) console.log(`Failed to edit ${e}`);
		writeFileSync(e, edited);
	});
}
