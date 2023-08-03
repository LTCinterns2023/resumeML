import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if a file was selected
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file format (PDF or Word)
    const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedFileTypes.includes(file.type)) {
      setSelectedFile(null);
      setErrorMessage('Files should be in PDF or Word format.');
    } else {
      setSelectedFile(file);
      setErrorMessage('');
    }
  };

  const handleFileUpload = () => {
    // Check if a file was selected before attempting to upload
    if (!selectedFile) {
      setErrorMessage('Please select a file before uploading.');
      return;
    }

    // Reference to the storage bucket where you want to store the file
    const storageRef = firebase.storage().ref();

    // Create a reference to the file you want to upload
    const fileRef = storageRef.child(selectedFile.name);

    // Upload the file to Firebase Storage
    const uploadTask = fileRef.put(selectedFile);

    // Register 'state_changed' observer for progress updates (optional)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Observe the upload progress
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle errors here
        console.error('Error uploading file:', error);
      },
      () => {
        // Upload completed successfully, now get the file URL
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);

          // Here you can save the downloadURL to your Firebase Database or use it as needed in your application.
          // For example, if you have a database of users, you can store the downloadURL under the user's profile.
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} accept=".pdf, .doc, .docx" />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={handleFileUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;