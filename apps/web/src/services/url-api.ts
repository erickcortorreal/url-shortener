const API_URL = import.meta.env.VITE_API_URL;

export interface ShortenResponse {
  shortUrl: string;
}

export interface ShortenRequest {
  url: string;
  slug?: string;
}

export const shortenUrl = async (data: ShortenRequest): Promise<string> => {
  const response = await fetch(`${API_URL}/url/shorten`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to shorten URL.");
  }
  return `${API_URL}/url/${result.slug}`;
};
