import useStep from './useStep';
import StepEdit from './StepEdit';
import StepCheckbox from './StepCheckbox';
import StepControls from './StepControls';

function Step({ index }) {
	const {
		state: { editingStep },
	} = useStep();

	const isEditing = editingStep === index;

	return (
		<li className="step">
			{isEditing ? (
				<StepEdit index={index} />
			) : (
				<>
					<StepCheckbox index={index} />
					<StepControls index={index} />
				</>
			)}
		</li>
	);
}

export default Step;
