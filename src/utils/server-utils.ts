// utils/env.ts
function parseEnvValue(raw: string | undefined | null, fallback: boolean | number | string = true) {
    if (raw == null) return fallback;
    const v = raw.trim().toLowerCase();
    if (v === "true") return true;
    if (v === "false") return false;
    const asNum = Number(raw);
    if (!Number.isNaN(asNum)) return asNum;
    return raw;
}

function parseFields(raw: string | undefined, defaults: string[]): string[] {
    return raw
        ? raw.split(",").map(s => s.trim()).filter(Boolean)
        : defaults;
}

function getNested(obj: unknown, path: string): unknown {
    if (!obj || !path) return undefined;
    return path.split(".").reduce<any>((acc, key) => (acc == null ? acc : acc[key]), obj as any);
}

export { parseEnvValue, parseFields, getNested };