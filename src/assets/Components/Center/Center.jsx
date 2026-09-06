import React, { useState, useEffect } from 'react'
import './Center.css'

const Center = ({ notes, search, handleSearch, handlePreview, section, selectedId, handleMenu, openMenuId, handleEdit, handleDelete, handleRestore }) => {

    const searchedNotes = notes?.filter(item => {

        const matchesSearch =
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.content.toLowerCase().includes(search.toLowerCase())

        const matchesSection =
            section === "all"
                ? !item.deleted
                : item.deleted

        return matchesSearch && matchesSection
    })

    return (
        <div className='center'>
            <div className="search">
                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z" stroke="var(--muted-text-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearch}
                    placeholder='Search'
                />
            </div>

            <div className="notes">
                {section === "all" && searchedNotes?.map(item => {

                    if (item.deleted) return null;

                    return <div className={`note ${item.id === selectedId
                        ? "selected"
                        : ""}`}
                        key={item.id}
                        onClick={() => handlePreview(item.id, item.title, item.content)}
                    >
                        <div className="note-text">
                            <div className="note-title">
                                {item.title}
                            </div>

                            <div className="note-content">
                                {item.content}
                            </div>
                        </div>

                        <div className="date">
                            <span>created: {new Date(item.createdAt).toLocaleString()}</span>
                            {item.updatedAt ? <span>Updated: {new Date(item.updatedAt).toLocaleString()}</span> : ""}
                        </div>

                        <div className="more"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleMenu(item.id)
                            }}>
                            <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z" fill="var(--text-color)"></path> <path d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" fill="var(--text-color)"></path> <path d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z" fill="var(--text-color)"></path></g></svg>
                            <ul
                                className={`more-window ${openMenuId === item.id ? "open" : ""
                                    }`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <li onClick={(e) => {
                                    e.stopPropagation()
                                    handleEdit(item.id)
                                }}>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.1497 7.93997L8.27971 19.81C7.21971 20.88 4.04971 21.3699 3.27971 20.6599C2.50971 19.9499 3.06969 16.78 4.12969 15.71L15.9997 3.84C16.5478 3.31801 17.2783 3.03097 18.0351 3.04019C18.7919 3.04942 19.5151 3.35418 20.0503 3.88938C20.5855 4.42457 20.8903 5.14781 20.8995 5.90463C20.9088 6.66146 20.6217 7.39189 20.0997 7.93997H20.1497Z" stroke="var(--text-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 21H12" stroke="var(--text-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                                    <span>Edit</span>
                                </li>
                                <li className='Delete' onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(item.id)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                    <span>Delete</span></li>
                            </ul>
                        </div>
                    </div>
                })}

                {section === "trash" && searchedNotes?.map(item => {

                    if (!item.deleted) return null

                    return <div className={`note ${item.id === selectedId
                        ? "selected"
                        : ""}`}
                        key={item.id}
                        onClick={() => handlePreview(item.id, item.title, item.content)}
                    >
                        <div className="note-text">
                            <div className="note-title">
                                {item.title}
                            </div>

                            <div className="note-content">
                                {item.content}
                            </div>
                        </div>

                        <div className="date">
                            <span>created: {new Date(item.createdAt).toLocaleString()}</span>
                            {item.updatedAt ? <span>Updated: {new Date(item.updatedAt).toLocaleString()}</span> : ""}
                        </div>

                        <div className="more"
                            onClick={(e) => {
                                e.stopPropagation()
                                handleMenu(item.id)
                            }}>
                            <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 12C9.10457 12 10 12.8954 10 14C10 15.1046 9.10457 16 8 16C6.89543 16 6 15.1046 6 14C6 12.8954 6.89543 12 8 12Z" fill="var(--text-color)"></path> <path d="M8 6C9.10457 6 10 6.89543 10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6Z" fill="var(--text-color)"></path> <path d="M10 2C10 0.89543 9.10457 -4.82823e-08 8 0C6.89543 4.82823e-08 6 0.895431 6 2C6 3.10457 6.89543 4 8 4C9.10457 4 10 3.10457 10 2Z" fill="var(--text-color)"></path></g></svg>
                            <ul
                                className={`more-window ${openMenuId === item.id ? "open" : ""
                                    }`}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <li onClick={(e) => {
                                    e.stopPropagation()
                                    handleRestore(item.id)
                                }}>
                                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4.52185 7H7C7.55229 7 8 7.44772 8 8C8 8.55229 7.55228 9 7 9H3C1.89543 9 1 8.10457 1 7V3C1 2.44772 1.44772 2 2 2C2.55228 2 3 2.44772 3 3V5.6754C4.26953 3.8688 6.06062 2.47676 8.14852 1.69631C10.6633 0.756291 13.435 0.768419 15.9415 1.73041C18.448 2.69239 20.5161 4.53782 21.7562 6.91897C22.9963 9.30013 23.3228 12.0526 22.6741 14.6578C22.0254 17.263 20.4464 19.541 18.2345 21.0626C16.0226 22.5842 13.3306 23.2444 10.6657 22.9188C8.00083 22.5931 5.54702 21.3041 3.76664 19.2946C2.20818 17.5356 1.25993 15.3309 1.04625 13.0078C0.995657 12.4579 1.45216 12.0088 2.00445 12.0084C2.55673 12.0079 3.00351 12.4566 3.06526 13.0055C3.27138 14.8374 4.03712 16.5706 5.27027 17.9625C6.7255 19.605 8.73118 20.6586 10.9094 20.9247C13.0876 21.1909 15.288 20.6513 17.0959 19.4075C18.9039 18.1638 20.1945 16.3018 20.7247 14.1724C21.2549 12.043 20.9881 9.79319 19.9745 7.8469C18.9608 5.90061 17.2704 4.3922 15.2217 3.6059C13.173 2.8196 10.9074 2.80968 8.8519 3.57803C7.11008 4.22911 5.62099 5.40094 4.57993 6.92229C4.56156 6.94914 4.54217 6.97505 4.52185 7Z" fill="var(--text-color)"></path> </g></svg>

                                    <span>Restore</span>
                                </li>
                                <li className='Delete' onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(item.id)
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                    <span>Delete Permanently</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                })}
            </div>
        </div >
    )
}

export default Center
