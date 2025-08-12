import Step from './Step';
import StepAdd from './StepAdd';
import useStep from './useStep';

function StepList() {
	const {
		state: { steps },
	} = useStep();

	const stepsNames = steps.map(({ step }) => step);

	return (
		<section className="progress">
			<ul className="progress-steps">
				{stepsNames.map((step, index) => (
					<Step index={index} key={step} />
				))}
				<StepAdd />
			</ul>
		</section>
	);
}

export default StepList;
