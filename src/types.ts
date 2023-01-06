// Type definitions for the CLI.

// Common Types
export declare type DisplayValue = string;

export declare type Path = string;

// The options you can pass to the CLI.
export declare interface Options {
  '--help': boolean;
  '--version': boolean;
  '--long': boolean;
}

// The arguments passed to the CLI (the options + the positional arguments)
export declare type Arguments = Partial<Options> & {
  _: string[];
};
