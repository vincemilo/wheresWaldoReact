export const apiGet = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

export const apiPost = async (url, body = {}) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

export const apiPatch = async (url, body = {}) => {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};
