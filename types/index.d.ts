declare namespace Picker {
  export interface IncrementOptions {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
    millisecond?: number;
  }

  export interface TextOptions {
    title?: string;
    cancel?: string;
    confirm?: string;
  }

  export interface Options {
    container?: string | Element;
    date?: string | Date;
    format?: string;
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
}

declare module 'pickerjs' {
  export default Picker;
}
