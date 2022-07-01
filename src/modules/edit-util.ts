export interface SmaliMethodInfo {
	name: string;
	public: boolean;
	returnType: string;
	isConstructor?: boolean;
	static?: boolean;
	final?: boolean;
	synthetic?: boolean;
}

export class SmaliMethod {
	private _parameters: string[] = [];
	private _registerCount: number = 0;
	private _srcList: string[] = [];

	constructor(private readonly _methodInfo: SmaliMethodInfo) {}

	public getSrc(): string {
		if ((this._methodInfo.static || this._methodInfo.synthetic || !this._methodInfo.public) && this._methodInfo.isConstructor)
			throw new Error("Constructor cannot be static or synthetic or private");

		let src = "";

		src += ".method ";
		src += this._methodInfo.public ? "public " : "private ";

		if (this._methodInfo.static) src += "static ";
		if (this._methodInfo.isConstructor) src += "constructor ";
		if (this._methodInfo.final) src += "final ";
		if (this._methodInfo.synthetic) src += "synthetic ";

		src += `${this._methodInfo.name}(`;
		src += this._parameters.join(";");
		src += `)${this._methodInfo.returnType}\n`;
		src += [`    .locals ${this._registerCount}`, ...this._srcList].join("\n\n    ");
		src += "\n.end method";

		return src;
	}

	public addParameter(parameter: string): void {
		this._parameters.push(parameter);
	}

	public setRegisterCount(registerCount: number) {
		this._registerCount = registerCount;
	}

	public addSrc(src: string): void {
		this._srcList.push(src);
	}
}
