"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './globals.css';

export default function Home() {
  const [url, setURL] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/shorten',
        { originalUrl: url, customAlias }
      );
      setShortenedURL(response.data.shortBaseUrl);
      // Display success message or handle accordingly.

    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <div>
    <h1 className='pageHeading'>URL Shortener</h1>
    <div className="container">

      <form onSubmit={handleSubmit}>
        <p>Convert long URLs into shortened versions with a single click.</p>
        <input
          type="text"
          placeholder="Enter URL here.."
          className="url-input"
          value={url}
          onChange={(e) => setURL(e.target.value)}
          required />
        <p>Create personalized and memorable links for your URLs (Optional)</p>
        <input
          type="text"
          placeholder="Example: favourite-link"
          className="alias-input"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)} />
        <br></br>
        <button type="submit">Get your Link</button>

      </form>

      {shortenedURL && (

        <div className="shortened-url-container">

          <p>Shortened URL:</p>

          <a href={shortenedURL} rel="noopener noreferrer">
            {shortenedURL}
          </a>

          <CopyToClipboard text={shortenedURL}>

            <button >Copy to Clipboard</button>

          </CopyToClipboard>

        </div>
      )}

    </div>
    </div>

  );

}
