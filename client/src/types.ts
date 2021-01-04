export type FileType = File & { preview: string; rotation: number };

export type BEMType = { modifiers?: string[]; mixes?: string[] };

export type OptionType = { value: string; label: string; [index: string]: any };
