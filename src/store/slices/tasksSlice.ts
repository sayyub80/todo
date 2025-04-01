
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TaskPriority = 'High' | 'Medium' | 'Low';

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  completed: boolean;
  date: string;
}

interface TasksState {
  tasks: Task[];
}

const loadTasksFromStorage = (): Task[] => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

const saveTasksToStorage = (tasks: Task[]) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const initialState: TasksState = {
  tasks: loadTasksFromStorage(),
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const newTask = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.tasks.push(newTask);
      saveTasksToStorage(state.tasks);
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    toggleCompleteTask: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToStorage(state.tasks);
      }
    },
    updateTaskPriority: (state, action: PayloadAction<{ id: string, priority: TaskPriority }>) => {
      const task = state.tasks.find(task => task.id === action.payload.id);
      if (task) {
        task.priority = action.payload.priority;
        saveTasksToStorage(state.tasks);
      }
    },
  },
});

export const { addTask, deleteTask, toggleCompleteTask, updateTaskPriority } = tasksSlice.actions;

export default tasksSlice.reducer;
