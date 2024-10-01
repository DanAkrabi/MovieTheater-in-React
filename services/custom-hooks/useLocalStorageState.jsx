import { useState, useEffect } from "react";
export function useLocalStorageState(defaultValue, key) {
  const [state, setState] = useState(() => {
    const localStorageValue = localStorage.getItem(key);
    return localStorageValue !== null
      ? JSON.parse(localStorageValue)
      : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
