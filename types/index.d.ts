declare namespace Picker {
  export interface HeadersOptions {
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
    second?: string;
    millisecond?: string;
  }

  export interface IncrementOptions {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
  }

  export interface TextOptions extends HeadersOptions {
    title?: string;
    cancel?: string;
    confirm?: string;
  }

  export interface Options {
    container?: string | Element;
    controls?: boolean;
    date?: string | Date;
    format?: string;
    headers?: boolean | HeadersOptions;
    hidden?(event: CustomEvent): void;
    hide?(event: CustomEvent): void;
    increment?: number | IncrementOptions;
    inline?: boolean;
    language?: string;
    months?: string[];
    monthsShort?: string[];
    pick?(event: CustomEvent): void;
    rows?: number;
    show?(event: CustomEvent): void;
    shown?(event: CustomEvent): void;
    text?: TextOptions;
    translate?(type: string, text: string): string;
  }
}

declare class Picker {
  constructor(element: HTMLElement, options?: Picker.Options);
  destroy(): Picker;
  formatDate(date: Date): string;
  getDate(formatted?: boolean): Date | string;
  hide(): Picker;
  next(type: string): Picker;
  parseDate(date: string): Date;
  pick(): Picker;
  prev(type: string): Picker;
  reset(): Picker;
  setDate(date: Date): Picker;
  show(): Picker;
  update(): Picker;
  static noConflict(): Picker;
  static setDefaults(options: Picker.Options): void;
}

declare module 'pickerjs' {
  export default Picker;
}
