import useStep from './useStep';

function StepCheckbox({ index }) {
	const {
		state: { steps },
		actions: { check },
	} = useStep();

	const { step, completed } = steps[index];

	return (
		<label className="step-label">
			<input
				name="stepCheck"
				type="checkbox"
				checked={completed}
				onChange={() => check(index)}
			/>
			{completed ? <s>{step}</s> : step}
		</label>
	);
}

export default StepCheckbox;
