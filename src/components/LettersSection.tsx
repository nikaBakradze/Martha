import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { AlertTriangle, Heart, LoaderCircle, Pencil, Send, Trash2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import {
  createLetter,
  deleteLetter,
  getLetters,
  getOwnerToken,
  updateLetter,
} from '../lib/letters'
import type { Letter } from '../types/letter'

const emptyForm = { name: '', message: '' }

export function LettersSection() {
  const [letters, setLetters] = useState<Letter[]>([])
  const [form, setForm] = useState(emptyForm)
  const [modalEditForm, setModalEditForm] = useState(emptyForm)
  const [isModalEditing, setIsModalEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [readingLetter, setReadingLetter] = useState<Letter | null>(null)
  const [deleteCandidate, setDeleteCandidate] = useState<Letter | null>(null)

  const ownedIds = useMemo(
    () => new Set(letters.filter((letter) => Boolean(getOwnerToken(letter.id))).map((letter) => letter.id)),
    [letters],
  )

  useEffect(() => {
    let isMounted = true
    const loadLetters = async () => {
      try {
        setLetters(await getLetters())
      } catch (loadError) {
        if (isMounted) setError(loadError instanceof Error ? loadError.message : 'Letters could not be loaded.')
      } finally {
        if (isMounted) setIsLoading(false)
      }
    }
    void loadLetters()
    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!readingLetter && !deleteCandidate) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      if (deleteCandidate) {
        setDeleteCandidate(null)
      } else if (isModalEditing) {
        setIsModalEditing(false)
        setModalEditForm(emptyForm)
        setError('')
      } else {
        setReadingLetter(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [readingLetter, deleteCandidate, isModalEditing])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setSuccess('')
    const name = form.name.trim()
    const message = form.message.trim()
    if (!name || !message) {
      setError('Please add your name and a birthday wish.')
      return
    }

    setIsSaving(true)
    try {
      const newLetter = await createLetter({ name, message })
      setLetters((currentLetters) => [newLetter, ...currentLetters])
      setSuccess('Your letter has been added to the keepsake.')
      setForm(emptyForm)
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Your letter could not be saved.')
    } finally {
      setIsSaving(false)
    }
  }

  const startEditing = (letter: Letter) => {
    setModalEditForm({ name: letter.name, message: letter.message })
    setIsModalEditing(true)
    setError('')
    setSuccess('')
  }

  const cancelModalEditing = () => {
    setIsModalEditing(false)
    setModalEditForm(emptyForm)
    setError('')
  }

  const saveModalEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!readingLetter) return
    const name = modalEditForm.name.trim()
    const message = modalEditForm.message.trim()
    if (!name || !message) {
      setError('Please add your name and a birthday wish.')
      return
    }

    const ownerToken = getOwnerToken(readingLetter.id)
    if (!ownerToken) {
      setError('This letter is no longer available to edit on this device.')
      return
    }

    setError('')
    setSuccess('')
    setIsSaving(true)
    try {
      const updatedLetter = await updateLetter({ id: readingLetter.id, name, message, ownerToken })
      setLetters((currentLetters) => currentLetters.map((letter) => letter.id === updatedLetter.id ? updatedLetter : letter))
      setReadingLetter(updatedLetter)
      setIsModalEditing(false)
      setModalEditForm(emptyForm)
      setSuccess('Your letter has been updated.')
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : 'Your letter could not be saved.')
    } finally {
      setIsSaving(false)
    }
  }

  const requestDelete = (letter: Letter) => {
    setDeleteCandidate(letter)
    setError('')
  }

  const handleDelete = async () => {
    if (!deleteCandidate) return
    const letter = deleteCandidate
    const ownerToken = getOwnerToken(letter.id)
    if (!ownerToken) {
      setError('This letter is no longer available to delete on this device.')
      setDeleteCandidate(null)
      return
    }

    setError('')
    setSuccess('')
    setDeletingId(letter.id)
    try {
      await deleteLetter(letter.id, ownerToken)
      setLetters((currentLetters) => currentLetters.filter((currentLetter) => currentLetter.id !== letter.id))
      setDeleteCandidate(null)
      setReadingLetter(null)
      setSuccess('Your letter has been removed.')
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : 'Your letter could not be removed.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <section className="letters-section section-shell" id="letters" aria-labelledby="letters-title">
      <motion.div
        className="letters-panel"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="section-icon"><Heart size={22} fill="currentColor" strokeWidth={1} aria-hidden="true" /></div>
        <p className="eyebrow dark-eyebrow">A keepsake for later</p>
        <h2 id="letters-title">Letters filled<br /><em>with love</em></h2>
        <p className="letters-intro">Leave a wish, a story, or a little love note for Martha to discover someday.</p>

        <form className="letters-form" onSubmit={handleSubmit} noValidate>
          <div className="letters-fields">
            <label htmlFor="letter-name">Your name</label>
            <input
              id="letter-name"
              maxLength={50}
              value={form.name}
              onChange={(event) => setForm({ ...form, name: event.target.value })}
              placeholder="How should we sign your letter?"
              required
            />
            <div className="field-meta"><span>{form.name.length}/50</span></div>
            <label htmlFor="letter-message">Your message</label>
            <textarea
              id="letter-message"
              maxLength={2000}
              rows={5}
              value={form.message}
              onChange={(event) => setForm({ ...form, message: event.target.value })}
              placeholder="Write a little wish for Martha..."
              required
            />
            <div className="field-meta"><span>{form.message.length}/2000</span></div>
          </div>
          <div className="letter-actions">
            <button className="primary-button" type="submit" disabled={isSaving}>
              {isSaving ? <LoaderCircle className="spin" size={16} aria-hidden="true" /> : <Send size={16} aria-hidden="true" />}
              Send a letter
            </button>
          </div>
        </form>

        <div className="letters-status" aria-live="polite">
          {error && <p className="letters-error" role="alert">{error}</p>}
          {success && <p className="letters-success">{success}</p>}
        </div>

        <div className="letters-list-heading">
          <span>From our favourite people</span>
          <span>{letters.length.toString().padStart(2, '0')}</span>
        </div>
        {isLoading ? (
          <div className="letters-state"><LoaderCircle className="spin" size={22} aria-label="Loading letters" /></div>
        ) : letters.length === 0 ? (
          <div className="letters-state">
            <p>The first letter is waiting to be written.</p>
            <span>Be the first to leave a little love.</span>
          </div>
        ) : (
          <div className="letters-list">
            {letters.map((letter) => (
              <motion.button
                className="letter-card"
                key={letter.id}
                type="button"
                onClick={() => setReadingLetter(letter)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -3 }}
              >
                <span className="letter-card-mark" aria-hidden="true">“</span>
                <strong className="letter-author">{letter.name}</strong>
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>
      <AnimatePresence>
        {readingLetter && (
          <motion.div
          className="letter-modal-backdrop"
          role="presentation"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
          if (event.target === event.currentTarget) setReadingLetter(null)
          }}
          >
          <motion.div
            className="letter-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reading-letter-title"
            initial={{ opacity: 0, y: 12, scale: .98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: .22 }}
          >
            <button className="modal-close" type="button" onClick={() => setReadingLetter(null)} aria-label="Close letter">
              <X size={18} />
            </button>
            {isModalEditing ? (
              <form className="modal-edit-form" onSubmit={saveModalEdit} noValidate>
                <p className="eyebrow dark-eyebrow">Edit your letter</p>
                <h3 id="reading-letter-title">Make a little change</h3>
                <label htmlFor="modal-letter-name">Your name</label>
                <input
                  id="modal-letter-name"
                  maxLength={50}
                  value={modalEditForm.name}
                  onChange={(event) => setModalEditForm({ ...modalEditForm, name: event.target.value })}
                  required
                />
                <div className="field-meta"><span>{modalEditForm.name.length}/50</span></div>
                <label htmlFor="modal-letter-message">Your message</label>
                <textarea
                  id="modal-letter-message"
                  maxLength={2000}
                  rows={5}
                  value={modalEditForm.message}
                  onChange={(event) => setModalEditForm({ ...modalEditForm, message: event.target.value })}
                  required
                />
                <div className="field-meta"><span>{modalEditForm.message.length}/2000</span></div>
                <div className="modal-actions">
                  <button className="primary-button" type="submit" disabled={isSaving}>
                    {isSaving ? <LoaderCircle className="spin" size={16} aria-hidden="true" /> : <Pencil size={16} aria-hidden="true" />}
                    Save changes
                  </button>
                  <button className="text-button" type="button" onClick={cancelModalEditing} disabled={isSaving}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <p className="eyebrow dark-eyebrow">A letter filled with love</p>
                <h3 id="reading-letter-title">{readingLetter.name}</h3>
                <p className="letter-full-message">{readingLetter.message}</p>
                <time dateTime={readingLetter.created_at}>{new Date(readingLetter.created_at).toLocaleDateString()}</time>
                {ownedIds.has(readingLetter.id) && (
                  <div className="modal-actions">
                    <button className="text-button" type="button" onClick={() => startEditing(readingLetter)}><Pencil size={14} /> Edit</button>
                    <button className="text-button danger-button" type="button" onClick={() => requestDelete(readingLetter)}><Trash2 size={14} /> Delete</button>
                  </div>
                )}
              </>
            )}
          </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {deleteCandidate && (
          <motion.div
            className="delete-confirm-backdrop"
            role="presentation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setDeleteCandidate(null)
            }}
          >
            <motion.div
              className="delete-confirm-dialog"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="delete-confirm-title"
              aria-describedby="delete-confirm-description"
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
            >
              <div className="delete-confirm-icon" aria-hidden="true"><AlertTriangle size={20} /></div>
              <h3 id="delete-confirm-title">Remove this letter?</h3>
              <p id="delete-confirm-description">Are you sure you want to delete this letter?</p>
              <div className="modal-actions">
                <button className="text-button" type="button" onClick={() => setDeleteCandidate(null)} disabled={deletingId === deleteCandidate.id}>Cancel</button>
                <button className="text-button danger-button" type="button" onClick={() => void handleDelete()} disabled={deletingId === deleteCandidate.id}>
                  {deletingId === deleteCandidate.id ? <LoaderCircle className="spin" size={14} /> : <Trash2 size={14} />} Yes, delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
