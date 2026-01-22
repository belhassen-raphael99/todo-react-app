import { useState } from 'react'
import styles from './TaskInput.module.css'

function TaskInput({ onAddTask }) {
    const [text, setText] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (text.trim()) {
            onAddTask(text)
            setText('')
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input
                type="text"
                className={styles.input}
                placeholder="What needs to be done?"
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoFocus
            />
            <button type="submit" className={styles.button} disabled={!text.trim()}>
                Add Task
            </button>
        </form>
    )
}

export default TaskInput
