const VISITOR_ID_STORAGE_KEY = "portfolio-chat-visitor-id";

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getOrCreateVisitorId() {
  const existingValue = window.localStorage.getItem(VISITOR_ID_STORAGE_KEY);

  if (existingValue) {
    return existingValue;
  }

  const nextValue = createId();
  window.localStorage.setItem(VISITOR_ID_STORAGE_KEY, nextValue);
  return nextValue;
}
