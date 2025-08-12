import useTask from './useTask';

function TaskControls({ id, isEditable, setEditable }) {
	const {
		actions: { deleteTask },
	} = useTask();

	const handleDeleteTask = () => deleteTask(id);

	return (
		<ul className="card-controls">
			{!isEditable && (
				<li>
					<button
						className="card-control"
						onClick={() => setEditable(true)}
					>
						Edit
					</button>
				</li>
			)}

			<li>
				<button className="card-control" onClick={handleDeleteTask}>
					Delete
				</button>
			</li>
		</ul>
	);
}

export default TaskControls;
