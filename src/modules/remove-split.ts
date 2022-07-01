import { readFileSync, writeFileSync } from "fs";

export function removeSplit(workingPath: string): void {
	const manifest = readFileSync(`${workingPath}/decompiled/AndroidManifest.xml`).toString();
	const splitedManifest = manifest.split("\n");
	const index = splitedManifest.findIndex((e) => e.includes('<meta-data android:name="com.android.vending.splits"'));
	splitedManifest.splice(index, index > 0 ? 1 : 0);
	const newManifest = splitedManifest.join("\n");
	writeFileSync(`${workingPath}/decompiled/AndroidManifest.xml`, newManifest);
}
