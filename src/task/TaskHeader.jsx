import React from 'react';
import useTask from './useTask';
import Button from '../Button';

function TaskHeader({ id, isEditable, setEditable, cardId, titleId }) {
	const {
		state: { expandedId, tasks },
		actions: { toggleExpand, editTask },
	} = useTask();

	const task = tasks.find((task) => task.id === id);

	const { title, steps } = task;

	const isExpanded = expandedId === id;

	const handleEditTask = (evt) => {
		evt.preventDefault();
		editTask({ taskId: id, title: evt.target.title.value });
		setEditable(false);
	};

	const stepsTotal = steps.length;
	const stepsCompleted = steps.filter(({ completed }) => completed).length;
	const stepsCompletion = Math.round((100 * stepsCompleted) / stepsTotal);

	if (isEditable) {
		return (
			<header className="card-header">
				<span
					className={`icon-button card-expand ${
						isExpanded ? 'card-expanded' : ''
					}`}
				>
					<img src="icons/caret.svg" alt="Collapse/Expand" />
				</span>
				<form className="card-title-form" onSubmit={handleEditTask}>
					<input
						id={titleId}
						className="card-title card-title-input"
						defaultValue={title}
						name="title"
					/>
					<Button icon="check" label="Edit task" />
				</form>
				<p className="card-percentage">
					{!isNaN(stepsCompletion) && `${stepsCompletion}%`}
				</p>
			</header>
		);
	}

	return (
		<button
			className="card-header"
			onClick={() => toggleExpand(id)}
			aria-expanded={isExpanded}
			aria-labelledby={titleId}
			aria-controls={cardId}
		>
			<span
				className={`icon-button card-expand ${
					isExpanded ? 'card-expanded' : ''
				}`}
			>
				<img src="icons/caret.svg" alt="Collapse/Expand" />
			</span>
			<p className="card-title" id={titleId}>
				{title}
			</p>
			<p className="card-percentage">
				{!isNaN(stepsCompletion) && `${stepsCompletion}%`}
			</p>
		</button>
	);
}

export default TaskHeader;
