import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/Home.css";

export default function Home() {
  const { userId } = useParams();
  const [token, setToken] = useState("");
  const [content, setContent] = useState("");
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [title, setTitle] = useState("No Document Selected!");
  const [userName, setUserName] = useState("");
  //   const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const storedUserDetails = localStorage.getItem("userDetails");
    if (!storedUserDetails) {
      window.location.href = "/";
    }
    const parsedUserDetails = JSON.parse(storedUserDetails);
    console.log("token from storage:", parsedUserDetails.token);
    setUserName(parsedUserDetails.user.name || "Unknown User");
    setToken(parsedUserDetails.token || "");
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchDocuments = async () => {
      try {
        console.log("Token being used:", token);
        const response = await fetch(`http://localhost:8080/${userId}/documents`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch documents");
        const data = await response.json();
        setDocuments(data.documents || []);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchDocuments();
  }, [token, userId]); // Runs when token is set


  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
    setContent(document.content);
    setTitle(document.title);
  };

  const handleUpdateDocument = async () => {
    if (!selectedDocument) {
      alert("Please select a document first");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/documents/${selectedDocument.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ title, content, lub: userId }),
        }
      );

      if (!response.ok) throw new Error("Failed to save document");
      const data = await response.json();
      // alert(data.message);
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 2000, // 1 second
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
      });
    } catch (error) {
      console.error("Error saving document:", error);
      toast.error(error.message, {
        position: "bottom-right",
        autoClose: 2000, // 1 second
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "danger",
      });
    }
  };

  const handleTitleChange = (e) => {
    if (selectedDocument) {
      setTitle(e.target.value);
    }
  };

  const handleContentChange = (e) => {
    if (selectedDocument) {
      setContent(e.target.value);
    }
  };

  const shareDocument = async () => { };

  const handleCreateNewButton = async () => { };

  return (
    <>
      <ToastContainer />
      <div className="home-container">
        <div className="main-layout">
          <aside className="sidebar">
            <h3>Documents</h3>
            <ul>
              {/* {console.log("documents: " + documents[0][0])} */}
              {documents.length > 0 && documents[0].length > 0 ? (
                documents[0].map((doc, index) => (
                  <li key={index} onClick={() => handleDocumentClick(doc)}>
                    {doc.title}
                  </li>
                ))
              ) : (
                <li>No documents available!</li>
              )}
            </ul>
          </aside>
          <div className="temp">
            <div className="document-header">
              <div>
                <input
                  type="text"
                  className="title-change-area"
                  value={title}
                  onChange={handleTitleChange}
                  disabled={!selectedDocument}
                />
              </div>
              <div>
                <button
                  type="button"
                  className="btn-area"
                  onClick={shareDocument}
                >
                  SHARE
                </button>
                <button
                  style={{ marginLeft: "10px" }}
                  type="button"
                  className="btn-area"
                  onClick={handleCreateNewButton}
                >
                  + CREATE NEW
                </button>
              </div>
            </div>

            <textarea
              className="document-textarea"
              value={content}
              onChange={handleContentChange} // ✅ Always provide an `onChange`
              disabled={!selectedDocument}
            />
            <button className="save-button" onClick={handleUpdateDocument}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}
