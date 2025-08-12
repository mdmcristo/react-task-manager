import useTask from './useTask';

function TaskProgress({ id }) {
	const {
		state: { tasks },
	} = useTask();

	const steps = tasks.find((task) => task.id === id).steps;

	const stepsTotal = steps.length;
	const stepsCompleted = steps.filter(({ completed }) => completed).length;

	return (
		<progress
			className="progress-bar"
			value={stepsCompleted}
			max={stepsTotal}
		/>
	);
}

export default TaskProgress;
