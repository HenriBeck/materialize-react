declare module 'sinon' {
  declare type Spy<T> = {
    (func?: () => void): T,
    callCount: number,
  };

  declare type Sinon = {
    spy: <T>(func: () => T) => Spy<T>,
  };

  declare export default Sinon;
}
