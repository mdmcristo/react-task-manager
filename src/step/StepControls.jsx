import Button from '../Button';
import useStep from './useStep';

function StepButton(props) {
	return <Button className="step-button" {...props} />;
}

function StepControls({ index }) {
	const {
		actions: { remove, setEditingStep, moveUp, moveDown },
	} = useStep();

	return (
		<>
			<StepButton
				icon="pencil"
				label="Edit task"
				onClick={() => setEditingStep(index)}
			/>
			<StepButton
				icon="trash"
				label="Delete task"
				onClick={() => remove(index)}
			/>
			<StepButton
				icon="up"
				label="Move up"
				onClick={() => moveUp(index)}
			/>
			<StepButton
				icon="down"
				label="Move down"
				onClick={() => moveDown(index)}
			/>
		</>
	);
}

export default StepControls;
