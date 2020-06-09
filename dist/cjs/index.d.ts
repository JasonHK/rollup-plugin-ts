import * as TS from "typescript";
import { Plugin } from "rollup";
import { TransformOptions } from "@babel/core";
interface IExtendedDiagnostic extends TS.Diagnostic {
    scope?: string;
}
interface ICustomTransformerOptions {
    program: TS.Program | undefined;
    printer: TS.Printer;
    typescript: typeof TS;
    addDiagnostics(...diagnostics: IExtendedDiagnostic[]): void;
}
type CustomTransformersFunction = (options: ICustomTransformerOptions) => TS.CustomTransformers;
interface FileSystem {
    newLine: string;
    useCaseSensitiveFileNames: boolean;
    fileExists(path: string): boolean;
    readFile(path: string, encoding?: string): string | undefined;
    writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
    readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): readonly string[];
    ensureDirectory(path: string): string;
    realpath(path: string): string;
    getDirectories(path: string): string[];
    directoryExists(path: string): boolean;
}
type Transpiler = "typescript" | "babel";
interface DebugTransformerData {
    kind: "transformer";
    fileName: string;
    text: string;
}
interface DebugEmitData {
    kind: "emit";
    fileName: string;
    text: string;
    fileKind: EmitPathKind;
}
interface DebugMetricsData {
    kind: "metrics";
    fileName?: string;
}
type DebugData = DebugTransformerData | DebugEmitData | DebugMetricsData;
type DebugOptionCallback = (data: DebugData) => boolean;
interface IBrowserslistPathConfig {
    path: string;
}
interface IBrowserslistQueryConfig {
    query: string[] | string;
}
type BrowserslistConfig = IBrowserslistPathConfig | IBrowserslistQueryConfig;
interface TsConfigResolverWithFileName {
    fileName: string;
    hook(resolvedOptions: TS.CompilerOptions): TS.CompilerOptions;
}
type TsConfigResolver = TsConfigResolverWithFileName["hook"];
type OutputPathKind = "declaration" | "declarationMap" | "buildInfo";
type TranspilationPhase = "file" | "chunk";
type EmitPathKind = OutputPathKind | "javascript";
type OutputPathHook = (path: string, kind: OutputPathKind) => string | undefined;
type DiagnosticsHook = (diagnostics: readonly TS.Diagnostic[]) => readonly TS.Diagnostic[] | undefined;
type BabelConfigHook = (config: TransformOptions | undefined, fileName: string | undefined, phase: TranspilationPhase) => TransformOptions | undefined;
interface HookRecord {
    outputPath: OutputPathHook;
    diagnostics: DiagnosticsHook;
    babelConfig: BabelConfigHook;
}
interface InputCompilerOptions extends Omit<TS.CompilerOptions, "module" | "moduleResolution" | "newLine" | "jsx" | "target"> {
    module: string;
    moduleResolution: string;
    newLine: string;
    jsx: string;
    target: string;
}
interface ITypescriptPluginBaseOptions {
    transpiler: Transpiler;
    tsconfig?: string | Partial<TS.CompilerOptions> | Partial<InputCompilerOptions> | TS.ParsedCommandLine | TsConfigResolver | TsConfigResolverWithFileName;
    browserslist?: false | string[] | string | BrowserslistConfig;
    cwd: string;
    transformers?: (TS.CustomTransformers | CustomTransformersFunction)[] | TS.CustomTransformers | CustomTransformersFunction;
    include: string[] | string;
    exclude: string[] | string;
    transpileOnly?: boolean;
    fileSystem: FileSystem;
    hook: Partial<HookRecord>;
    debug: boolean | DebugOptionCallback;
    typescript: typeof TS;
}
interface ITypescriptPluginTypescriptOptions extends ITypescriptPluginBaseOptions {
    transpiler: "typescript";
}
interface ITypescriptPluginBabelOptions extends ITypescriptPluginBaseOptions {
    transpiler: "babel";
    babelConfig?: string | Partial<TransformOptions>;
}
type TypescriptPluginOptions = ITypescriptPluginTypescriptOptions | ITypescriptPluginBabelOptions;
/**
 * A Rollup plugin that transpiles the given input with Typescript
 */
declare function typescriptRollupPlugin(pluginInputOptions?: Partial<TypescriptPluginOptions>): Plugin;
export { ICustomTransformerOptions, CustomTransformersFunction, typescriptRollupPlugin as default, TypescriptPluginOptions, BrowserslistConfig, IBrowserslistPathConfig, IBrowserslistQueryConfig, ITypescriptPluginBabelOptions, ITypescriptPluginTypescriptOptions };
//# sourceMappingURL=index.d.ts.map