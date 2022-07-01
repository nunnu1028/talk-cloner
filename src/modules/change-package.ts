import { existsSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from "fs";
import { join } from "path";
import { editMethod, findMethod } from "./util";

/*
	This source code is from New-Banced cloning source code.
	All functions will be changed in a way that uses SmaliMethod. (src/modules/edit-util.ts)
	
	Nunnu1028
 */

const dreamFields = `# instance fields
.field private final dreamArr1:[Ljava/lang/String;
		
.field private final dreamArr2:[Ljava/lang/String;`;

const dreamSrc1 = `    .locals 4

    .line 1
    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    const/16 v2, 0x36

    new-array v1, v2, [Ljava/lang/String;

    const-string v0, "adrp.ldrsh.ldnp"

    const/4 v2, 0x0

    aput-object v0, v1, v2

    const-string v0, "ldpsw"

    const/4 v2, 0x1

    aput-object v0, v1, v2

    const/4 v2, 0x2

    const-string v0, "umax"

    aput-object v0, v1, v2

    const-string v0, "stnp.rsubhn"

    const/4 v2, 0x3

    aput-object v0, v1, v2

    const-string v0, "sqdmlsl"

    const/4 v2, 0x4

    aput-object v0, v1, v2

    const-string v0, "uqrshl.csel"

    const/4 v2, 0x5

    aput-object v0, v1, v2

    const-string v0, "sqshlu"

    const/4 v2, 0x6

    aput-object v0, v1, v2

    const-string v0, "umin.usubl.umlsl"

    const/4 v2, 0x7

    aput-object v0, v1, v2

    const-string v0, "cbnz.adds"

    const/16 v2, 0x8

    aput-object v0, v1, v2

    const-string v0, "tbnz"

    const/16 v2, 0x9

    aput-object v0, v1, v2

    const/16 v2, 0xa

    const-string v0, "usubl2"

    aput-object v0, v1, v2

    const/16 v2, 0xb

    const-string v0, "stxr"

    aput-object v0, v1, v2

    const/16 v2, 0xc

    const-string v0, "sbfx"

    aput-object v0, v1, v2

    const/16 v2, 0xd

    const-string v0, "strh"

    aput-object v0, v1, v2

    const-string v0, "stxrb.adcs"

    const/16 v2, 0xe

    aput-object v0, v1, v2

    const-string v0, "stxrh"

    const/16 v2, 0xf

    aput-object v0, v1, v2

    const/16 v2, 0x10

    const-string v0, "ands.urhadd"

    aput-object v0, v1, v2

    const/16 v2, 0x11

    const-string v0, "subs"

    aput-object v0, v1, v2

    const/16 v2, 0x12

    const-string v0, "sbcs"

    aput-object v0, v1, v2

    const/16 v2, 0x13

    const-string v0, "fnmadd.ldxrb.saddl"

    aput-object v0, v1, v2

    const/16 v2, 0x14

    const-string v0, "stur"

    aput-object v0, v1, v2

    const/16 v2, 0x15

    const-string v0, "ldrsb"

    aput-object v0, v1, v2

    const/16 v2, 0x16

    const-string v0, "strb"

    aput-object v0, v1, v2

    const/16 v2, 0x17

    const-string v0, "prfm"

    aput-object v0, v1, v2

    const/16 v2, 0x18

    const-string v0, "ubfiz"

    aput-object v0, v1, v2

    const/16 v2, 0x19

    const-string v0, "ldrsw.madd.msub.sturb.ldursb"

    aput-object v0, v1, v2

    const/16 v2, 0x1a

    const-string v0, "ldrb"

    aput-object v0, v1, v2

    const/16 v2, 0x1b

    const-string v0, "b.eq"

    aput-object v0, v1, v2

    const/16 v2, 0x1c

    const-string v0, "ldur.sbfiz"

    aput-object v0, v1, v2

    const/16 v2, 0x1d

    const-string v0, "extr"

    aput-object v0, v1, v2

    const/16 v2, 0x1e

    const-string v0, "fmadd"

    aput-object v0, v1, v2

    const/16 v2, 0x1f

    const-string v0, "uqadd"

    aput-object v0, v1, v2

    const/16 v2, 0x20

    const-string v0, "sshr.uzp1.sttrb"

    aput-object v0, v1, v2

    const/16 v2, 0x21

    const-string v0, "umlsl2"

    aput-object v0, v1, v2

    const/16 v2, 0x22

    const-string v0, "rsubhn2.ldrh.uqsub"

    aput-object v0, v1, v2

    const/16 v2, 0x23

    const-string v0, "uqshl"

    aput-object v0, v1, v2

    const/16 v2, 0x24

    const-string v0, "uabd"

    aput-object v0, v1, v2

    const/16 v2, 0x25

    const-string v0, "ursra"

    aput-object v0, v1, v2

    const/16 v2, 0x26

    const-string v0, "usubw"

    aput-object v0, v1, v2

    const/16 v2, 0x27

    const-string v0, "uaddl2"

    aput-object v0, v1, v2

    const/16 v2, 0x28

    const-string v0, "b.gt"

    aput-object v0, v1, v2

    const/16 v2, 0x29

    const-string v0, "b.lt"

    aput-object v0, v1, v2

    const/16 v2, 0x2a

    const-string v0, "sqshl"

    aput-object v0, v1, v2

    const/16 v2, 0x2b

    const-string v0, "bics"

    aput-object v0, v1, v2

    const/16 v2, 0x2c

    const-string v0, "smin.ubfx"

    aput-object v0, v1, v2

    const/16 v2, 0x2d

    const-string v0, "smlsl2"

    aput-object v0, v1, v2

    const/16 v2, 0x2e

    const-string v0, "uabdl2"

    aput-object v0, v1, v2

    const/16 v2, 0x2f

    const-string v0, "zip2.ssubw2"

    aput-object v0, v1, v2

    const/16 v2, 0x30

    const-string v0, "ccmp"

    aput-object v0, v1, v2

    const/16 v2, 0x31

    const-string v0, "sqdmlal"

    aput-object v0, v1, v2

    const/16 v2, 0x32

    const-string v0, "b.al"

    aput-object v0, v1, v2

    const/16 v2, 0x33

    const-string v0, "smax.ldurh.uhsub"

    aput-object v0, v1, v2

    const/16 v2, 0x34

    const-string v0, "fcvtxn2"

    aput-object v0, v1, v2

    const/16 v2, 0x35

    const-string v0, "b.pl"

    aput-object v0, v1, v2

    iput-object v1, p0, Lcom/kakao/talk/dream/Projector;->dreamArr1:[Ljava/lang/String;

    const/16 v2, 0x39

    new-array v1, v2, [Ljava/lang/String;

    const-string v0, "saddl"

    const/4 v2, 0x0

    aput-object v0, v1, v2

    const-string v0, "urhadd"

    const/4 v2, 0x1

    aput-object v0, v1, v2

    const-string v0, "ubfiz.sqdmlsl.tbnz.stnp"

    const/4 v2, 0x2

    aput-object v0, v1, v2

    const-string v0, "smin"

    const/4 v2, 0x3

    aput-object v0, v1, v2

    const-string v0, "strh"

    const/4 v2, 0x4

    aput-object v0, v1, v2

    const-string v0, "ccmp"

    const/4 v2, 0x5

    aput-object v0, v1, v2

    const-string v0, "usubl"

    const/4 v2, 0x6

    aput-object v0, v1, v2

    const-string v0, "umlsl"

    const/4 v2, 0x7

    aput-object v0, v1, v2

    const-string v0, "uzp1"

    const/16 v2, 0x8

    aput-object v0, v1, v2

    const-string v0, "sbfx"

    const/16 v2, 0x9

    aput-object v0, v1, v2

    const-string v0, "b.eq"

    const/16 v2, 0xa

    aput-object v0, v1, v2

    const-string v0, "zip2.prfm.strb"

    const/16 v2, 0xb

    aput-object v0, v1, v2

    const-string v0, "msub"

    const/16 v2, 0xc

    aput-object v0, v1, v2

    const-string v0, "b.pl"

    const/16 v2, 0xd

    aput-object v0, v1, v2

    const-string v0, "csel"

    const/16 v2, 0xe

    aput-object v0, v1, v2

    const-string v0, "stxrh.ldxrb"

    const/16 v2, 0xf

    aput-object v0, v1, v2

    const/16 v2, 0x10

    const-string v0, "uqrshl.ldrh"

    aput-object v0, v1, v2

    const/16 v2, 0x11

    const-string v0, "cbnz"

    aput-object v0, v1, v2

    const/16 v2, 0x12

    const-string v0, "ursra"

    aput-object v0, v1, v2

    const/16 v2, 0x13

    const-string v0, "sshr.ubfx.ldur.ldnp"

    aput-object v0, v1, v2

    const/16 v2, 0x14

    const-string v0, "fcvtxn2"

    aput-object v0, v1, v2

    const/16 v2, 0x15

    const-string v0, "usubl2"

    aput-object v0, v1, v2

    const/16 v2, 0x16

    const-string v0, "uaddl2"

    aput-object v0, v1, v2

    const/16 v2, 0x17

    const-string v0, "b.al"

    aput-object v0, v1, v2

    const/16 v2, 0x18

    const-string v0, "ssubw2"

    aput-object v0, v1, v2

    const/16 v2, 0x19

    const-string v0, "umax"

    aput-object v0, v1, v2

    const/16 v2, 0x1a

    const-string v0, "b.lt"

    aput-object v0, v1, v2

    const/16 v2, 0x1b

    const-string v0, "adrp.sturb"

    aput-object v0, v1, v2

    const/16 v2, 0x1c

    const-string v0, "extr"

    aput-object v0, v1, v2

    const/16 v2, 0x1d

    const-string v0, "uqshl"

    aput-object v0, v1, v2

    const/16 v2, 0x1e

    const-string v0, "smax"

    aput-object v0, v1, v2

    const/16 v2, 0x1f

    const-string v0, "uqsub.sqshlu"

    aput-object v0, v1, v2

    const/16 v2, 0x20

    const-string v0, "ands"

    aput-object v0, v1, v2

    const/16 v2, 0x21

    const-string v0, "madd"

    aput-object v0, v1, v2

    const/16 v2, 0x22

    const-string v0, "umin"

    aput-object v0, v1, v2

    const/16 v2, 0x23

    const-string v0, "b.gt"

    aput-object v0, v1, v2

    const/16 v2, 0x24

    const-string v0, "uabdl2"

    aput-object v0, v1, v2

    const/16 v2, 0x25

    const-string v0, "ldrsb.ldpsw.rsubhn"

    aput-object v0, v1, v2

    const/16 v2, 0x26

    const-string v0, "uqadd"

    aput-object v0, v1, v2

    const/16 v2, 0x27

    const-string v0, "sttrb"

    aput-object v0, v1, v2

    const/16 v2, 0x28

    const-string v0, "stxr"

    aput-object v0, v1, v2

    const/16 v2, 0x29

    const-string v0, "adds"

    aput-object v0, v1, v2

    const/16 v2, 0x2a

    const-string v0, "rsubhn2.umlsl2"

    aput-object v0, v1, v2

    const/16 v2, 0x2b

    const-string v0, "sbcs.fmadd"

    aput-object v0, v1, v2

    const/16 v2, 0x2c

    const-string v0, "usubw"

    aput-object v0, v1, v2

    const/16 v2, 0x2d

    const-string v0, "sqshl"

    aput-object v0, v1, v2

    const/16 v2, 0x2e

    const-string v0, "stur.ldrsh.smlsl2"

    aput-object v0, v1, v2

    const/16 v2, 0x2f

    const-string v0, "ldrsw"

    aput-object v0, v1, v2

    const/16 v2, 0x30

    const-string v0, "fnmadd"

    aput-object v0, v1, v2

    const/16 v2, 0x31

    const-string v0, "stxrb.sbfiz"

    aput-object v0, v1, v2

    const/16 v2, 0x32

    const-string v0, "adcs"

    aput-object v0, v1, v2

    const/16 v2, 0x33

    const-string v0, "bics.ldrb"

    aput-object v0, v1, v2

    const/16 v2, 0x34

    const-string v0, "ldursb"

    aput-object v0, v1, v2

    const/16 v2, 0x35

    const-string v0, "subs.uhsub"

    aput-object v0, v1, v2

    const/16 v2, 0x36

    const-string v0, "ldurh"

    aput-object v0, v1, v2

    const/16 v2, 0x37

    const-string v0, "uabd"

    aput-object v0, v1, v2

    const/16 v2, 0x38

    const-string v0, "sqdmlal"

    aput-object v0, v1, v2

    iput-object v1, p0, Lcom/kakao/talk/dream/Projector;->dreamArr2:[Ljava/lang/String;

    return-void`;

const dreamSrc2 = `    .locals 3
    .annotation build Lorg/jetbrains/annotations/NotNull;
    .end annotation

    .line 15
    new-instance v0, Ljava/lang/StringBuilder;

    invoke-direct {v0}, Ljava/lang/StringBuilder;-><init>()V

    iget-object v1, p0, Lcom/kakao/talk/dream/Projector;->dreamArr1:[Ljava/lang/String;

    rem-int/lit8 v2, p1, 0x36

    aget-object v1, v1, v2

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    const-string v1, "."

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    iget-object v1, p0, Lcom/kakao/talk/dream/Projector;->dreamArr2:[Ljava/lang/String;

    add-int/lit8 v2, p1, 0x1f

    rem-int/lit8 v2, v2, 0x39

    aget-object v1, v1, v2

    invoke-virtual {v0, v1}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    invoke-virtual {v0}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v0

    return-object v0`;

function hashCode(str: string): number {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
		var code = str.charCodeAt(i);
		hash = (hash << 5) - hash + code;
		hash = hash & hash; // Convert to 32bit integer
	}
	return hash;
}

function toHex(num: number): string {
	const str = num.toString(16);
	return str[0] === "-" ? "-0x" + str.substring(1) : "0x" + str;
}

export function hashCoding1(tree: string[], toPackageName: string, fromPackageName: string = "talk"): void {
	const gateway = tree.find((e) => e.split("\\").pop() === "NotificationGatewayActivity.smali")!;

	const gatewayRegex = /invoke-virtual {v0}, Ljava\/lang\/String;->hashCode\(\)I/g;
	const gatewayMatch = findMethod(gatewayRegex, gateway);

	const list = [
		`com.kakao.${fromPackageName}.notification.action.CHAT_LIST`,
		`com.kakao.${fromPackageName}.notification.action.FORWARD`,
		`com.kakao.${fromPackageName}.notification.action.NEW_MESSAGE`,
		`com.kakao.${fromPackageName}.notification.action.IN_APP_BROWSER`
	];

	const listHash1 = list.map((e) => toHex(hashCode(e)));
	const listHash2 = list.map((e) => e.replace(fromPackageName, toPackageName)).map((e) => toHex(hashCode(e)));
	let src = gatewayMatch[0].src;

	listHash1.forEach((e, i) => {
		src = src.replace(e, listHash2[i]);
	});

	const gatewayEdited = editMethod(gatewayMatch[0], readFileSync(gateway).toString(), src.split("\n").slice(1, -1).join("\n"));
	if (!gatewayEdited) console.log(`Failed to edit ${gateway}`);
	writeFileSync(gateway, gatewayEdited);
}

export function hashCoding2(tree: string[], toPackageName: string, fromPackageName: string = "talk"): void {
	const service = tree.find((e) => e.split("\\").pop() === "NotificationActionService.smali")!;

	const serviceRegex = /invoke-virtual {v0}, Ljava\/lang\/String;->hashCode\(\)I/g;
	const serviceMatch = findMethod(serviceRegex, service);

	const list = [
		`com.kakao.${fromPackageName}.notification.READ_MESSAGE`,
		`com.kakao.${fromPackageName}.notification.REPLY_MESSAGE`,
		`com.kakao.${fromPackageName}.notification.DELETE_NOTIFICATION_MESSAGE`
	];

	const listHash1 = list.map((e) => toHex(hashCode(e)));
	const listHash2 = list.map((e) => e.replace(fromPackageName, toPackageName)).map((e) => toHex(hashCode(e)));
	let src = serviceMatch[0].src;

	listHash1.forEach((e, i) => {
		src = src.replace(e, listHash2[i]);
	});

	const serviceEdited = editMethod(serviceMatch[0], readFileSync(service).toString(), src.split("\n").slice(1, -1).join("\n"));
	if (!serviceEdited) console.log(`Failed to edit ${service}`);
	writeFileSync(service, serviceEdited);
}

export function changePackage(tree: string[], workingPath: string, toPackageName: string, fromPackageName: string = "talk"): void {
	const dream = tree.find((e) => e.split("\\").pop() === "Projector.smali")!;

	writeFileSync(
		dream,
		readFileSync(dream)
			.toString()
			.split("\n# direct methods")
			.join(dreamFields + "\n\n# direct methods")
	);

	const dreamRegex1 = /invoke-direct {p0}, Ljava\/lang\/Object;-><init>\(\)V/g;
	const dreamMatch1 = findMethod(dreamRegex1, dream);
	const dreamEdited1 = editMethod(dreamMatch1[0], readFileSync(dream).toString(), dreamSrc1);
	writeFileSync(dream, dreamEdited1);

	const dreamRegex2 = /\.annotation build Lorg\/jetbrains\/annotations\/NotNull;/g;
	const dreamMatch2 = findMethod(dreamRegex2, dream);
	const dreamEdited2 = editMethod(dreamMatch2[1], dreamEdited1, dreamSrc2, ".method public final incept(I)Ljava/lang/String;");
	writeFileSync(dream, dreamEdited2);

	const splitGatewayActivity = tree.find((e) => e.split("\\").pop() === "SplitGatewayActivity.smali")!;
	const splitGatewayActivityRegex = /invoke-virtual {p0}, Landroid\/app\/Activity;->finish\(\)V/g;
	const splitGatewayActivityMatch = findMethod(splitGatewayActivityRegex, splitGatewayActivity);

	const splitGatewayActivityEdited = editMethod(
		splitGatewayActivityMatch[0],
		readFileSync(splitGatewayActivity).toString(),
		splitGatewayActivityMatch[0].src.replaceAll("goto :goto_0", "goto :cond_1").split("\n").slice(1, -1).join("\n")
	);
	if (!splitGatewayActivityEdited) console.log(`Failed to edit ${splitGatewayActivity}`);
	writeFileSync(splitGatewayActivity, splitGatewayActivityEdited);

	hashCoding1(tree, toPackageName, fromPackageName);
	hashCoding2(tree, toPackageName, fromPackageName);

	tree.forEach((e) => {
		const data = readFileSync(e).toString();
		if (data.includes("com.kakao.talk") || data.includes("com/kakao/talk")) {
			writeFileSync(
				e,
				readFileSync(e)
					.toString()
					.replaceAll(`com.kakao.${fromPackageName}`, `com.kakao.${toPackageName}`)
					.replaceAll(`com/kakao/${fromPackageName}`, `com/kakao/${toPackageName}`)
			);
		}
	});

	const dirs = readdirSync(`${workingPath}/decompiled/`);
	const folders = dirs.filter((e) => statSync(join(`${workingPath}/decompiled/`, e)).isDirectory());

	folders.forEach((e) => {
		if (existsSync(`${workingPath}/decompiled/${e}/com/kakao/${fromPackageName}`)) {
			renameSync(`${workingPath}/decompiled/${e}/com/kakao/${fromPackageName}`, `${workingPath}/decompiled/${e}/com/kakao/${toPackageName}/`);
		}
	});
}
