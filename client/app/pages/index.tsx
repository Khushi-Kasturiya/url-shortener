import React, { useState } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function Home() {
  const [url, setURL] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3000/api/shorten',
        { originalUrl: url, customAlias }
      );
      setShortenedURL(response.data.shortBaseUrl);
      setURL('');
      setCustomAlias('');

      // Display success message or handle accordingly.

    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (

    <div className="container">

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter URL here..."
          className="url-input"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          required />

        <input
          type="text"
          placeholder="Custom alias (optional)"
          className="alias-input"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)} />

        <button type="submit">Shorten</button>

      </form>

      {shortenedURL && (

        <div className="shortened-url-container">

          <p>Shortened URL:</p>

          <a href={shortenedURL} target="_blank" rel="noopener noreferrer">
            {shortenedURL}
          </a>

          <CopyToClipboard text={shortenedURL}>

            <button className="copy-btn">Copy to Clipboard</button>

          </CopyToClipboard>

        </div>
      )}

    </div>

  );

}
