import {ExtendedResolvedModule} from "../service/cache/resolve-cache/i-resolve-cache";

export function pickResolvedModule(resolvedModule: ExtendedResolvedModule, preferAmbient: true): string;
export function pickResolvedModule(resolvedModule: ExtendedResolvedModule, preferAmbient: false): string | undefined;
export function pickResolvedModule(resolvedModule: ExtendedResolvedModule, preferAmbient: boolean): string | undefined;
export function pickResolvedModule(resolvedModule: ExtendedResolvedModule, preferAmbient: boolean): string | undefined {
	if (preferAmbient) {
		return resolvedModule.resolvedAmbientFileName ?? resolvedModule.resolvedFileName!;
	} else {
		return resolvedModule.resolvedFileName;
	}
}
