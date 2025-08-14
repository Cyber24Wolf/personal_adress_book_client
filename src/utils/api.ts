export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorText = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      if (errorData && typeof errorData.message === 'string') {
        errorText = errorData.message;
      }
    } catch {
    }
    throw new Error(errorText);
  }
  return response.json();
}