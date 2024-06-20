import { isProxy, isReactive, isRef, toRaw, } from 'vue';

/**
 * @Author Hulkmaster
 * @Source https://github.com/vuejs/core/issues/5303
 * @Description Unwraps refs, reactive, proxy, etc. but recursively. Vue 3 at this point somehow did not implement it yet.
 */
export function deepToRaw<T extends Record<string, any>>(sourceObj: T): T {
  const objectIterator = (input: any): any => {
    if (Array.isArray(input)) {
      return input.map((item) => objectIterator(item));
    }
    if (isRef(input) || isReactive(input) || isProxy(input)) {
      return objectIterator(toRaw(input));
    }
    if (input && typeof input === 'object') {
      return Object.keys(input).reduce((acc, key) => {
        acc[key as keyof typeof acc] = objectIterator(input[key]);
        return acc;
      }, {} as T);
    }
    return input;
  };

  return objectIterator(sourceObj);
}

export const unrefDeep = <T extends Record<string, any>>(sourceObj: T): T => {
  return JSON.parse(JSON.stringify(sourceObj)) as T;
}
