const enabled = true;

const DebugControl = {
    AUTH: true,
    FETCH: true,
    READ: true,
    HOOK: false,
    RENDER: true,
    MISC: true,
    WRITE: true,
    MUTATE: true,
} as const;

type DebugType = keyof typeof DebugControl;

const padString = (str: string, length: number) => {
    return str.padEnd(length, ' ');
};

// TODO: fix biome
export const dbg = (t: DebugType, where: string, what?: any) => {
    if (enabled && DebugControl[t]) {
        const logType = padString(`[${t}]`, 10);
        const location = padString(where, 20);
        const message = what ? what : "";
        console.log(`${logType}\t${location}\t${message}`);
    }
}
