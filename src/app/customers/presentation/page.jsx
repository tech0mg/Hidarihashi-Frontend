"use client";
import React, { useState, useEffect } from 'react';
import { Document, Page } from 'react-pdf';

const PDFViewer = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(300);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

  if (!apiUrl) {
    console.error('API URL is not defined. Please set NEXT_PUBLIC_API_URL in your environment variables.');
  }

  const onLoadSuccess = ({ numPages }) => {
    setTotalPages(numPages);
  };

  const onLoadError = (error) => {
    console.error('Error loading PDF:', error);
  };

  useEffect(() => {
    const updateWidth = () => {
      setPageWidth(window.innerWidth * 0.8); // 画面幅の80%
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const containerStyle = {
    width: "100%",
    height: "100%",
    overflow: 'scroll',
  };

  return (
    <div style={containerStyle} role="document" aria-label="PDF Viewer">
      <Document
        file={`${apiUrl}/PDFのURL`}
        onLoadSuccess={onLoadSuccess}
        onLoadError={onLoadError}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <Page key={index} pageNumber={index + 1} width={pageWidth} />
        ))}
      </Document>
    </div>
  );
};

export default PDFViewer;
