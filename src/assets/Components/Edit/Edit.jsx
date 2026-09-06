import React, { useEffect, useState, useRef } from 'react'
import './Edit.css'

const Edit = ({ mode, handleSave, title, setTitle, content, setContent, handleCancel, handleDelete, selectedId }) => {



    const handleTitle = (e) => {
        setTitle(e.target.value)
    }

    const handleContent = (e) => {
        setContent(e.target.value)
    }

    const textareaRef = useRef(null)

    const insertMarkdown = (before, after = before) => {

        const textarea = textareaRef.current

        const start = textarea.selectionStart
        const end = textarea.selectionEnd

        const selectedText =
            content.substring(start, end)

        const newText =
            content.substring(0, start) +
            before +
            selectedText +
            after +
            content.substring(end)

        setContent(newText)
    }

    return (
        <div className={
            mode === "edit"
                ? "Edit open"
                : "Edit"
        }>
            <div className="edit-header">
                <h2>Edit Note</h2>
                {selectedId === null
                    ? ""
                    : <div className="Delete" onClick={handleDelete}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" y1="11" x2="10" y2="17" />
                        <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                    <span>Delete</span>
                    </div>}
            </div>

            <div className="edit-body">
                <div className="edit-title">
                    <h3>Title</h3>
                    <input type="text" className='title-input' value={title} onChange={handleTitle} />
                </div>

                <div className="edit-content">
                    <h3>Content</h3>
                    <textarea
                        ref={textareaRef}
                        className="content-input"
                        value={content}
                        onChange={handleContent}
                    />
                </div>
            </div>

            <div className="markdown-toolbar">

                <button
                    onClick={() =>
                        insertMarkdown("# ", "")
                    }
                >
                    H1
                </button>

                <button
                    onClick={() =>
                        insertMarkdown("## ", "")
                    }
                >
                    H2
                </button>

                <button
                    onClick={() =>
                        insertMarkdown("### ", "")
                    }
                >
                    H3
                </button>

                <button
                    onClick={() =>
                        insertMarkdown("**")
                    }
                >
                    B
                </button>

                <button
                    onClick={() =>
                        insertMarkdown("*")
                    }
                >
                    I
                </button>

                <button
                    onClick={() =>
                        insertMarkdown("~~")
                    }
                >
                    S
                </button>

                <button
                    onClick={() =>
                        insertMarkdown("==")
                    }
                >
                    HL
                </button>

                <button
                    onClick={() =>
                        insertMarkdown("- ", "")
                    }
                >
                    • List
                </button>

            </div>

            <div className="edit-footer">
                <button className='cancel' onClick={handleCancel}>Cancel</button>
                <button className='save' onClick={handleSave}>Save</button>
            </div>
        </div>
    )
}

export default Edit
