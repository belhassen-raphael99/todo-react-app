import styles from './TaskFilter.module.css'

function TaskFilter({ currentFilter, setFilter }) {
    const filters = ['all', 'active', 'completed']

    return (
        <div className={styles.filters}>
            {filters.map(filter => (
                <button
                    key={filter}
                    className={`${styles.button} ${currentFilter === filter ? styles.active : ''}`}
                    onClick={() => setFilter(filter)}
                >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
            ))}
        </div>
    )
}

export default TaskFilter
