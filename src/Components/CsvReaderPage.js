'use client'
import React, { useState } from 'react';

const CSVReaderPage = () => {
  const [csvData, setCSVData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch('/api/CsvReader', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setCSVData(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>CSV Reader Page</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload CSV</button>
      {csvData && (
        <div>
          <h2>CSV Data:</h2>
          <pre>{JSON.stringify(csvData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CSVReaderPage;
