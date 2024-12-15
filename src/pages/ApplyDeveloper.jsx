import React, { useRef, useState } from 'react';
import ComHeader from '../components/ComHeader';
import ComSidebar from '../components/ComSidebar';

const ApplyDeveloper = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [selectedPage, setSelectedPage] = useState('apply'); // Default to 'apply'

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const renderContent = () => {
    if (selectedPage === 'apply') {
      return (
        <div
          className="d-flex justify-content-center align-items-start"
          style={{ minHeight: 'calc(100vh - 75px)', width: '100%' }}
        >
          <div
            className="bg-white p-4 rounded shadow"
            style={{
              maxWidth: '900px',
              width: '100%',
              marginBottom: '10px',
            }}
          >
            <h3
              className="text-center mb-4"
              style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333' }}
            >
              Apply for Developer Position
            </h3>

            {/* Drag-and-Drop or Upload Area */}
            <div
              className="text-center mb-3"
              style={{
                border: '2px dotted #d9d9d9', // Dotted border
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#f4f4f4',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
              }}
              onClick={handleFileClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p style={{ fontSize: '1rem', color: '#666' }}>Drag and drop a file here</p>
              {fileName && (
                <p style={{ fontSize: '0.9rem', color: '#007bff', marginTop: '10px' }}>
                  Selected file: {fileName}
                </p>
              )}
              <button
                className="btn btn-outline-primary mt-3"
                style={{ fontSize: '0.9rem', padding: '8px 16px' }}
                onClick={handleFileClick}
              >
                Browse
              </button>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />

            {/* Input Fields */}
            <input
              type="text"
              placeholder="Full name"
              className="form-control mb-3"
              style={{ backgroundColor: '#fafafa', fontSize: '1rem' }}
            />
            <input
              type="text"
              placeholder="Username"
              className="form-control mb-3"
              style={{ backgroundColor: '#fafafa', fontSize: '1rem' }}
            />
            <textarea
              placeholder="Why do you want to become a developer?"
              className="form-control mb-3"
              style={{
                backgroundColor: '#fafafa',
                fontSize: '1rem',
                resize: 'none',
                height: '75px',
              }}
            ></textarea>

            {/* Submit Button */}
            <button
              className="btn btn-primary d-block w-100 mb-3"
              style={{ fontSize: '1rem', padding: '12px' }}
            >
              Submit
            </button>

            {/* Note Section */}
            <div
              className="p-3 bg-light"
              style={{
                borderLeft: '5px solid #007bff',
                fontSize: '1rem',
                color: '#333',
              }}
            >
              <p className="m-0">
                <strong>Note:</strong> Your CV must include all necessary information including
                your qualification with certificates as proof, previous/current job, technologies
                you are expert in, link of your Github, and link of all important projects.
              </p>
            </div>
          </div>
        </div>
      );
    }
    return null; // If additional pages are added later
  };

  return (
    <>
      {/* Header */}
      <ComHeader />

      <div className="d-flex">
        {/* Sidebar */}
        <ComSidebar onSelectPage={setSelectedPage} />

        {/* Main Content */}
        <div
          className="mt-4"
          style={{
            flexGrow: 1,
            paddingBottom: '50px',
          }}
        >
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default ApplyDeveloper;
