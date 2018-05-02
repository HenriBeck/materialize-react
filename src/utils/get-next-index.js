// @flow strict

export default function getNextIndex(
  array: $ReadOnlyArray<mixed>,
  currentIndex: number,
  direction: 'left' | 'right',
): number {
  switch (direction) {
    case 'left': return currentIndex === 0 ? array.length - 1 : currentIndex - 1;
    case 'right': return currentIndex === array.length - 1 ? 0 : currentIndex + 1;
    default: return currentIndex;
  }
}
