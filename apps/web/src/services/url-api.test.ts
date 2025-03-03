import { describe, it, expect, vi, beforeEach } from "vitest";
import { shortenUrl } from "./url-api";

vi.stubGlobal("fetch", vi.fn());

beforeEach(() => {
  vi.resetAllMocks();
  import.meta.env.VITE_API_URL = "http://localhost:3000/api";
});

describe("shortenUrl", () => {
  it("should return a shortened URL on successful response", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Promise.resolve(
        new Response(JSON.stringify({ slug: "abcd" }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      ) as unknown as Response
    );

    const result = await shortenUrl({ url: "https://example.com" });

    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/url/shorten", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://example.com" }),
    });

    expect(result).toBe("http://localhost:3000/api/url/abcd");
  });

  it("should throw an error if the response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Promise.resolve(
        new Response(JSON.stringify({ message: "Invalid URL" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      ) as unknown as Response
    );

    await expect(shortenUrl({ url: "invalid-url" })).rejects.toThrow("Invalid URL");
  });

  it("should throw a generic error if no message is provided", async () => {
    vi.mocked(fetch).mockResolvedValue(
      Promise.resolve(
        new Response(JSON.stringify({}), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        })
      ) as unknown as Response
    );

    await expect(shortenUrl({ url: "https://example.com" })).rejects.toThrow("Failed to shorten URL.");
  });
});
