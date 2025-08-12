import { useMemo, useState } from 'react';
import TaskHeader from './TaskHeader';
import TaskControls from './TaskControls';
import useTask from './useTask';
import StepProvider from '../step/StepProvider';
import StepList from '../step/StepList';
import TaskProgress from './TaskProgress';

function Task({ id }) {
	const {
		state: { expandedId },
	} = useTask();

	const isExpanded = expandedId === id;

	const [isEditable, setEditable] = useState(false);

	const cardId = useMemo(() => `card-${Math.random() * 10e17}`, []);
	const titleId = useMemo(() => `title-${Math.random() * 10e17}`, []);

	return (
		<li className="card">
			<TaskHeader
				id={id}
				isEditable={isEditable}
				setEditable={setEditable}
				cardId={cardId}
				titleId={titleId}
			/>
			{isExpanded && (
				<>
					<TaskControls
						id={id}
						isEditable={isEditable}
						setEditable={setEditable}
					/>
					<StepProvider taskId={id}>
						<StepList />
					</StepProvider>
				</>
			)}
			<TaskProgress id={id} />
		</li>
	);
}

export default Task;
