export function handleResponse(response) {
  if (response.status >= 200 && response.status <= 399) return response.data;
  if (response.status === 400) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    const error = response.data.error;
    throw new Error(error);
  }
  throw new Error(response);
}

export function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed. " + error);
  throw error;
}
