import { useState } from 'react'
import styles from './TaskItem.module.css'

function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(task.text)

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleSave = () => {
        if (editText.trim()) {
            onEdit(task.id, editText)
            setIsEditing(false)
        } else {
            // If empty, maybe revert or delete? Let's just revert for safety
            setEditText(task.text)
            setIsEditing(false)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSave()
        }
    }

    return (
        <div className={styles.item}>
            <input
                type="checkbox"
                className={styles.checkbox}
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />

            {isEditing ? (
                <input
                    type="text"
                    className={styles.editInput}
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            ) : (
                <span
                    className={`${styles.text} ${task.completed ? styles.completed : ''}`}
                    onDoubleClick={handleEdit}
                    title="Double click to edit"
                >
                    {task.text}
                </span>
            )}

            <button className={styles.deleteBtn} onClick={() => onDelete(task.id)}>Delete</button>
        </div>
    )
}

export default TaskItem
