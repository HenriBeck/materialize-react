declare type StoryFunc<T> = () => T;
declare type Info = {|
  kind: string,
  story: string,
|};

declare module '@storybook/react' {
  declare class Story { add(name: string, func: StoryFunc<Node>): Story }

  declare export function configure(func: () => void, typeof module): void;
  declare export function addDecorator((story: StoryFunc<Node>, info: Info) => Node): void;
  declare export function storiesOf(name: string, module: typeof module): Story;
}

declare module '@storybook/addon-actions' {
  declare export function action(name: string): (...args: $ReadOnlyArray<mixed>) => void;
}

declare module '@storybook/addon-knobs' {
  declare export function number(name: string, defaultValue?: number, options?: {
    range: boolean,
    min: number,
    max: number,
    step: number,
  }): number;
  declare export function text(name: string, defaultValue?: string): string;
  declare export function boolean(name: string, defaultValue?: boolean): boolean;
  declare export function select<Options>(
    name: string,
    options: Options,
    defaultValue: $Keys<Options>
  ): $Keys<Options>;

  declare export function withKnobs<T: Node>(story: StoryFunc<T>, info: Info): T;
}

declare module '@storybook/addon-options' {
  declare export function setOptions(options: {
    name: string,
    url: string,
  }): void;
}
