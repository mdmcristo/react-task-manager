import './style.css';
import { TaskList, TaskProvider } from './task';

function App() {
	return (
		<main>
			<h1>Task Manager</h1>
			<TaskProvider>
				<TaskList />
			</TaskProvider>
		</main>
	);
}

export default App;
