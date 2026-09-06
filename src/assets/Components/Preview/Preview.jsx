import React, { useEffect, useState } from 'react'
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import './Preview.css'

const Preview = ({ mode, note, title, content, handleCancel, handleEdit, handleDelete, handleRestore }) => {


    return (
        <div className={
            mode === "preview"
                ? "preview open"
                : "preview"
        }
        >

            <div className="preview-header">
                <h2>Preview Note</h2>
                <div className="Delete" onClick={() => handleDelete(note?.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    {
                        note?.deleted
                            ? "Delete Permanently"
                            : "Delete"
                    }
                </div>
            </div>

            <div className="preview-body">
                <h1 className="preview-title">{title}</h1>

                <div className="preview-content">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                    >
                        {content}
                    </ReactMarkdown>
                </div>
            </div>

            <div className="preview-footer">
                <button className='cancel' onClick={handleCancel}>Cancel</button>
                <button className='edit' onClick={() => {
                    if (note?.deleted) {
                        handleRestore(note.id)
                    } else {
                        handleEdit(note.id)
                    }
                }}
                >
                    {note?.deleted
                        ? "Restore"
                        : "Edit"}
                </button>
            </div>
        </div>
    )
}

export default Preview
