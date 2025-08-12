import { useEffect, useReducer } from 'react';
import initialState from './fixture';

function reducer(state, { type, payload }) {
	switch (type) {
		case 'TOGGLE': //! payload = taskId: number
			return {
				...state,
				expandedId: state.expandedId === payload ? null : payload,
			};

		case 'ADD_TASK': //! payload = title: string
			return {
				...state,
				tasks: state.tasks.concat([
					{ id: Math.random() * 10e16, title: payload, steps: [] },
				]),
			};

		case 'EDIT_TASK': //! payload = {taskId: number, title: string}
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === payload.taskId
						? { ...task, title: payload.title }
						: task
				),
			};

		case 'DELETE_TASK': //! payload = taskId: number
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== payload),
			};

		case 'CHECK_STEP': //! payload = {taskId: number, step: number}
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === payload.taskId
						? {
								...task,
								steps: [
									...task.steps.slice(0, payload.step),
									{
										...task.steps[payload.step],
										completed:
											!task.steps[payload.step].completed,
									},
									...task.steps.slice(payload.step + 1),
								],
						  }
						: task
				),
			};

		case 'ADD_STEP': //! payload = {taskId: number, step: string}
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === payload.taskId
						? {
								...task,
								steps: task.steps.concat([
									{ step: payload.step, completed: false },
								]),
						  }
						: task
				),
			};

		case 'EDIT_STEP': //! payload = {taskId: number, step: number, text: string}
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === payload.taskId
						? {
								...task,
								steps: [
									...task.steps.slice(0, payload.step),
									{
										...task.steps[payload.step],
										step: payload.text,
									},
									...task.steps.slice(payload.step + 1),
								],
						  }
						: task
				),
			};

		case 'DELETE_STEP': //! payload = {taskId: number, step: number}
			return {
				...state,
				tasks: state.tasks.map((task) =>
					task.id === payload.taskId
						? {
								...task,
								steps: [
									...task.steps.slice(0, payload.step),
									...task.steps.slice(payload.step + 1),
								],
						  }
						: task
				),
			};

		case 'MOVE_UP': //! payload = {taskId: number, step: number}
			return {
				...state,
				tasks: state.tasks.map((task) => {
					if (task.id !== payload.taskId || payload.step === 0) {
						return task;
					}

					const newSteps = task.steps.slice();
					const temp = newSteps[payload.step];

					newSteps[payload.step] = newSteps[payload.step - 1];
					newSteps[payload.step - 1] = temp;

					return {
						...task,
						steps: newSteps,
					};
				}),
			};

		case 'MOVE_DOWN': //! payload = {taskId: number, step: number}
			return {
				...state,
				tasks: state.tasks.map((task) => {
					if (
						task.id !== payload.taskId ||
						payload.step === task.steps.length - 1
					) {
						return task;
					}

					const newSteps = task.steps.slice();
					const temp = newSteps[payload.step];

					newSteps[payload.step] = newSteps[payload.step + 1];
					newSteps[payload.step + 1] = temp;

					return {
						...task,
						steps: newSteps,
					};
				}),
			};

		default:
			return state;
	}
}

function getInitialState() {
	const tasks =
		JSON.parse(localStorage.getItem('task-manager-items-priority')) ||
		initialState;

	return {
		expandedId: null,
		tasks,
	};
}

function useTaskReducer() {
	const [state, dispatch] = useReducer(reducer, null, getInitialState);

	useEffect(() => {
		localStorage.setItem(
			'task-manager-items-priority',
			JSON.stringify(state.tasks)
		);
	}, [state.tasks]);

	const toggleExpand = (payload) => dispatch({ type: 'TOGGLE', payload });
	const addTask = (payload) => dispatch({ type: 'ADD_TASK', payload });
	const editTask = (payload) => dispatch({ type: 'EDIT_TASK', payload });
	const deleteTask = (payload) => dispatch({ type: 'DELETE_TASK', payload });
	const checkStep = (payload) => dispatch({ type: 'CHECK_STEP', payload });
	const addStep = (payload) => dispatch({ type: 'ADD_STEP', payload });
	const editStep = (payload) => dispatch({ type: 'EDIT_STEP', payload });
	const deleteStep = (payload) => dispatch({ type: 'DELETE_STEP', payload });
	const moveStepUp = (payload) => dispatch({ type: 'MOVE_UP', payload });
	const moveStepDown = (payload) => dispatch({ type: 'MOVE_DOWN', payload });

	return {
		state,
		actions: {
			toggleExpand,
			addTask,
			editTask,
			deleteTask,
			checkStep,
			addStep,
			editStep,
			deleteStep,
			moveStepUp,
			moveStepDown,
		},
	};
}

export default useTaskReducer;
