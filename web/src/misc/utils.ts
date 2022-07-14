export const groupContBy =
  <T>(eq: (a: T, b: T) => boolean, add: (a: T, b: T) => T) =>
  (arr: T[]): T[] => {
    return arr.reduce<T[]>((acc, next) => {
      const prev = acc.pop();
      if (!prev) {
        acc.push(next);
      } else if (eq(prev, next)) {
        acc.push(add(prev, next));
      } else {
        acc.push(prev, next);
      }

      return acc;
    }, []);
  };
