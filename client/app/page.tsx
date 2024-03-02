"use client"
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './globals.css';

export default function Home() {
  const [url, setURL] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortenedURL, setShortenedURL] = useState('');
  const [qrCodeDataURL, setQrCodeDataURL] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post(
        'https://url-shortener-swop.onrender.com/api/shorten',
        // 'http://localhost:8000/api/shorten', for local development
        { originalUrl: url, customAlias }
      );
      setShortenedURL(response.data.shortBaseUrl);
      setQrCodeDataURL(response.data.qrCodeDataURL);

    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 409) {
        setShortenedURL('');
        setErrorMessage("Custom alias already exists. Please choose another.");
      } else {
        console.error(axiosError.message);
        setErrorMessage("An unexpected error occurred.");
      }
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}

        </form>

      </div>
        {shortenedURL && (

          <div className="shortened-url-container">

            <p>Shortened URL:</p>

            <a href={shortenedURL} rel="noopener noreferrer">
              {shortenedURL}
            </a>

            <CopyToClipboard text={shortenedURL}>

              <button >Copy to Clipboard</button>

            </CopyToClipboard>

            {qrCodeDataURL && (
              <>
                <p>QR Code:</p>
                <img src={qrCodeDataURL} alt="QR Code" />
                {/* Download Link */}
                <a href={qrCodeDataURL} download={`QR_${customAlias || 'link'}.png`}>
                <button >Download QR Code</button>
                </a>
              </>
            )}

          </div>
        )}

      
    </div>

  );

}
