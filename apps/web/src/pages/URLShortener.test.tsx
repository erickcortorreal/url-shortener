import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent, waitFor } from "@testing-library/react";
import URLShortener from "./URLShortener";
import { shortenUrl } from "../services/url-api";

vi.mock("../services/url-api", () => ({
  shortenUrl: vi.fn(),
}));

describe("URLShortener Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByText, getByPlaceholderText } = render(<URLShortener />);

    expect(getByText("URL Shortener 🔗")).toBeDefined();
    expect(getByPlaceholderText("Enter a URL")).toBeDefined();
    expect(getByPlaceholderText("Enter a custom slug (optional)")).toBeDefined();
  });

  it("updates input fields", () => {
    const { getByPlaceholderText } = render(<URLShortener />);

    const urlInput = getByPlaceholderText("Enter a URL") as HTMLInputElement;
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });
    expect(urlInput.value).toBe("https://example.com");

    const slugInput = getByPlaceholderText("Enter a custom slug (optional)") as HTMLInputElement;
    fireEvent.change(slugInput, { target: { value: "custom-slug" } });
    expect(slugInput.value).toBe("custom-slug");
  });

  it("submits the form and calls shortenUrl API", async () => {
    vi.mocked(shortenUrl).mockResolvedValue("https://short.ly/abcd");

    const { getByPlaceholderText, getByText } = render(<URLShortener />);

    const urlInput = getByPlaceholderText("Enter a URL") as HTMLInputElement;
    fireEvent.change(urlInput, { target: { value: "https://example.com" } });

    const shortenButton = getByText("Shorten") as HTMLButtonElement;
    fireEvent.click(shortenButton);

    await waitFor(() => expect(shortenUrl).toHaveBeenCalledWith({ url: "https://example.com", slug: undefined }));

    expect(getByText("https://short.ly/abcd")).toBeDefined();
  });

  it("displays error message when API call fails", async () => {
    vi.mocked(shortenUrl).mockRejectedValue(new Error("Failed to shorten URL"));

    const { getByPlaceholderText, getByText } = render(<URLShortener />);

    fireEvent.change(getByPlaceholderText("Enter a URL"), { target: { value: "https://example.com" } });
    fireEvent.click(getByText("Shorten"));

    await waitFor(() => expect(getByText("Failed to shorten URL")).toBeDefined());
  });

  it("copies the short URL when copy button is clicked", async () => {
    vi.mocked(shortenUrl).mockResolvedValue("https://short.ly/abcd");
    const writeTextMock = vi.fn();
    Object.assign(navigator, { clipboard: { writeText: writeTextMock } });

    const { getByPlaceholderText, getByText } = render(<URLShortener />);

    fireEvent.change(getByPlaceholderText("Enter a URL"), { target: { value: "https://example.com" } });
    fireEvent.click(getByText("Shorten"));

    await waitFor(() => expect(getByText("https://short.ly/abcd")).toBeDefined());

    fireEvent.click(getByText("Copy"));
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledWith("https://short.ly/abcd"));
  });
});
