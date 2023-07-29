export type StorageInstanceOptions<Value> = {
  key: string;
  defaultValue: Value;
};

export function createStorageInstance<Value>(
  opts: StorageInstanceOptions<Value>
) {
  const { key, defaultValue } = opts;

  function getItem() {
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item) as Value;
    } catch (error) {
      return defaultValue;
    }
  }

  function setItem(value: Value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {}
  }

  function removeItem() {
    window.localStorage.removeItem(key);
  }

  return {
    getItem,
    setItem,
    removeItem,
  };
}
