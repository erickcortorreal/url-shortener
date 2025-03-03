import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { shortenUrl } from "../services/url-api.ts";
import "./URLShortener.css";

const URLShortener: React.FC = () => {
  const [url, setUrl] = useState("");
  const [slug, setSlug] = useState("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const shortened = await shortenUrl({ url, slug: slug || undefined });
      setShortUrl(shortened);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (shortUrl) {
      navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="background">
      <div className="shortener-container">
        <div className="browser-header">
          <div className="circle dark-gray"></div>
          <div className="circle dark-gray"></div>
          <div className="circle dark-gray"></div>
        </div>

        <div className="shortener-content">
          <h2 className="title">URL Shortener 🔗</h2>
          <p className="description">Enter the URL to shorten</p>

          <form onSubmit={handleSubmit}>
            <label className="input-label">URL</label>
            <Input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setShortUrl(null);
                setError("");
              }}
              placeholder="Enter a URL"
            />

            <label className="input-label">Custom Slug (Optional)</label>
            <Input
              type="text"
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setShortUrl(null);
                setError("");
              }}
              placeholder="Enter a custom slug (optional)"
            />

            <div className="button-container">
              <Button disabled={loading || !!shortUrl} >Shorten</Button>
            </div>
          </form>

          {shortUrl && (
            <div className="success-message">
              <p><strong>Success!</strong> Here’s your short URL:</p>
              <div className="short-url-container">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="short-url">
                  {shortUrl}
                </a>
                <button className="copy-button" onClick={handleCopy}>
                  <span className="copy-icon">📋</span> <span> {copied ? "Copied!" : "Copy"} </span>
                </button>
              </div>
            </div>
          )}

          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default URLShortener;
