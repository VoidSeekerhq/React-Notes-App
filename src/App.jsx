import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './assets/Components/Sidebar/Sidebar'
import Center from './assets/Components/Center/Center'
import Preview from './assets/Components/Preview/Preview'
import Edit from './assets/Components/Edit/Edit'

function App() {

  const [selectedId, setSelectedId] = useState(null)
  // const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mode, setMode] = useState("none")
  const [section, setSection] = useState("all")

  const [notes, setNotes] = useState(() => {
    const storedNotes = localStorage.getItem("notes")

    return storedNotes
      ? JSON.parse(storedNotes)
      : []
  })

  const selectedNote = notes.find(
    item => item.id === selectedId
  )

  const [search, setSearch] = useState("")

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  )

  const [openMenuId, setOpenMenuId] = useState(null)

  useEffect(() => {
    localStorage.setItem("theme", theme)
  }, [theme])

  const handleTheme = () => {
    setTheme(prev =>
      prev === "light"
        ? "dark"
        : "light"
    )
  }




  useEffect(() => {
    localStorage.setItem(
      "notes",
      JSON.stringify(notes)
    )
  }, [notes])

  useEffect(() => {

    const handleOutsideClick = (e) => {

      if (
        e.target.closest(".nav") ||
        e.target.closest(".preview") ||
        e.target.closest(".Edit") ||
        e.target.closest(".note")
      ) return

      if (
        mode === "edit" &&
        !confirm("Are you sure you want to leave?")
      ) {
        return
      }

      setSelectedId(null)
      setTitle("")
      setContent("")
      setMode("none")
    }

    window.addEventListener("click", handleOutsideClick)

    return () =>
      window.removeEventListener("click", handleOutsideClick)

  }, [mode])


  const handleAdd = () => {
    setTitle("")
    setContent("")
    setSelectedId(null)
    setMode("edit")
  }

  const handleSave = () => {
    if (selectedId === null) {
      const newNote = {
        id: Date.now(),
        title,
        content,
        deleted: false,
        createdAt: Date.now(),
        updatedAt: Date.now()
      }

      if (newNote.title === "" || newNote.content === "") return alert("title or content cannot be empty")

      setNotes([...notes, newNote])
    } else {
      setNotes(

        notes.map(item =>
          item.id === selectedId
            ? {
              ...item,
              title,
              content,
              updatedAt: Date.now()
            }
            : item
        )
      )
    }

    setSelectedId(null)
    setTitle("")
    setContent("")
    setMode("none")
  }

  const handlePreview = (id, title, content) => {
    if (selectedId === id) {
      if (confirm("are you sure you want to leave?") === false) return
      setSelectedId(null)
      setTitle("")
      setContent("")
      setMode("none")
      return
    }

    setSelectedId(id)
    setTitle(title)
    setContent(content)
    setMode("preview")
  }

  const handleCancel = () => {
    if (mode === "edit" && !confirm("are you sure you want to leave?")) return
    setSelectedId(null)
    setTitle("")
    setContent("")
    setMode("none")
  }

  const handleEdit = (id) => {
    const note = notes.find(
      item => item.id === id
    )

    if (!note) return

    setSelectedId(id)

    setTitle(note.title)

    setContent(note.content)

    setMode("edit")

    setOpenMenuId(null)
  }

  const handleDelete = (id) => {
    const selectedNote = notes.find(
      item => item.id === id
    )

    if (!selectedNote) return

    if (!selectedNote.deleted) {
      if (!confirm("are you sure you want to delete this note?")) return
      setNotes(
        notes.map(item =>
          item.id === id
            ? {
              ...item,
              deleted: true
            }
            : item
        )
      )

    } else {
      if (confirm("are you sure you want to permanently delete this note?") === true) {
        setNotes(
          notes.filter(
            item => item.id !== id
          )
        )
      } else return

    }

    setSelectedId(null)
    setTitle("")
    setContent("")
    setMode("none")
    setOpenMenuId(null)
  }

  const handleRestore = (id) => {
    const selectedNote = notes.find(
      item => item.id === id
    )

    if (!selectedNote) return

    if (selectedNote.deleted) {
      setNotes(
        notes.map(item =>
          item.id === id
            ? {
              ...item,
              deleted: false
            }
            : item
        )
      )
    }

    setSelectedId(null)
    setTitle("")
    setContent("")
    setMode("none")
    setOpenMenuId(null)
  }

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  const handleMenu = (id) => {
    setOpenMenuId(prev =>
      prev === id
        ? null
        : id
    )
  }

  useEffect(() => {

    const closeMenu = () => {
      setOpenMenuId(null)
    }

    window.addEventListener(
      "click",
      closeMenu
    )

    return () =>
      window.removeEventListener(
        "click",
        closeMenu
      )

  }, [])

  const handleSection = (newSection) => {
    if(mode === "edit" && !confirm("are you sure you want to leave")) return;

    setSection(newSection)
    setSearch("")


    setSelectedId(null)
    setTitle("")
    setContent("")
    setMode("none")
  }



  return (
    <div className={`app ${theme}`}>
      <Sidebar
        handleAdd={handleAdd}
        handleSection={handleSection}
        section={section}
        setSection={setSection}
        theme={theme}
        handleTheme={handleTheme}
      />

      <Center
        notes={notes}
        search={search}
        handleSearch={handleSearch}
        handlePreview={handlePreview}
        section={section}
        selectedId={selectedId}
        handleMenu={handleMenu}
        openMenuId={openMenuId}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleRestore={handleRestore}
      />

      <Preview
        mode={mode}
        note={selectedNote}
        title={title}
        content={content}
        handleCancel={handleCancel}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleRestore={handleRestore}
      />

      <Edit
        mode={mode}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        handleSave={handleSave}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        selectedId={selectedId}
      />
    </div>
  )
}

export default App