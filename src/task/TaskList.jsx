import Task from './Task';
import TaskAdd from './TaskAdd';
import useTask from './useTask';

function TaskList() {
	const {
		state: { tasks },
	} = useTask();

	const taskIds = tasks.map(({ id }) => id);

	return (
		<ol className="lane">
			{taskIds.map((taskId, index) => (
				<Task id={taskId} key={index} />
			))}
			<TaskAdd />
		</ol>
	);
}

export default TaskList;
