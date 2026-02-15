export const AuthConfig = {
  storageUserDataName: "user",
};

interface TokenType {
  accessToken: string;
  refreshToken: string;
}

export interface StoredUserDataType {
  id: string;
  fullName: string;
  email: string;
}

export function getToken(): TokenType | null {
  try {
    const user = localStorage.getItem(AuthConfig.storageUserDataName);
    if (!user) return null;
    const parsed = JSON.parse(user) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "accessToken" in parsed &&
      typeof (parsed as TokenType).accessToken === "string"
    ) {
      return parsed as TokenType;
    }
    return null;
  } catch {
    return null;
  }
}

export function setToken(token: TokenType): void {
  localStorage.setItem(AuthConfig.storageUserDataName, JSON.stringify(token));
}

export function getStoredUser(): StoredUserDataType | null {
  try {
    const raw = localStorage.getItem(AuthConfig.storageUserDataName);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "user" in parsed &&
      parsed.user &&
      typeof (parsed as { user: StoredUserDataType }).user === "object"
    ) {
      const { user } = parsed as { user: StoredUserDataType };
      if (
        typeof user.id === "string" &&
        typeof user.fullName === "string" &&
        typeof user.email === "string"
      ) {
        return user;
      }
    }
    return null;
  } catch {
    return null;
  }
}

export function setUserData(user: StoredUserDataType): void {
  localStorage.setItem(
    AuthConfig.storageUserDataName,
    JSON.stringify({ user })
  );
}

export function getItemJson(key: string) {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item);
  }

  return null;
}

export function getOrDefault<T>(key: string, defaultObject: T) {
  const item = localStorage.getItem(key);
  if (item) {
    return JSON.parse(item) as T;
  }

  return defaultObject;
}

export function setItem(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function removeItem(key: string) {
  localStorage.removeItem(key);
}

export function clear() {
  localStorage.clear();
}
