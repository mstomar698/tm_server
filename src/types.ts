// Common Types
export declare type DisplayValue = string;

export declare type Path = string | undefined;

export declare type Args = string;

// The options you can pass to the CLI.
export declare interface Options {
  '--help': boolean;
  '--version': boolean;
  '--express': boolean;
  '--static': boolean;
  '--flask': boolean;
  '--java': boolean;
  '--go': boolean;
  '--rust': boolean;
  '--php': boolean;
}

// The arguments passed to the CLI (the options + the positional arguments)
export declare type Arguments = Partial<Options> & {
  _: string[];
};
