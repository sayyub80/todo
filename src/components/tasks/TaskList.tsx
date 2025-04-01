
import React from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { deleteTask, toggleCompleteTask, updateTaskPriority, type TaskPriority } from '../../store/slices/tasksSlice';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Trash, MoreVertical, CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';

const getPriorityColor = (priority: TaskPriority) => {
  switch (priority) {
    case 'High':
      return 'bg-red-50 border-red-200 text-red-700';
    case 'Medium':
      return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    case 'Low':
      return 'bg-green-50 border-green-200 text-green-700';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-700';
  }
};

const TaskList = () => {
  const { tasks } = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleToggleComplete = (id: string) => {
    dispatch(toggleCompleteTask(id));
  };

  const handleUpdatePriority = (id: string, priority: TaskPriority) => {
    dispatch(updateTaskPriority({ id, priority }));
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tasks yet. Add one to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {tasks.map((task) => (
        <Card 
          key={task.id}
          className={cn(
            "border-l-4 transition-all",
            task.completed ? "opacity-60" : "opacity-100",
            getPriorityColor(task.priority)
          )}
        >
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => handleToggleComplete(task.id)}
                id={`task-${task.id}`}
              />
              <div>
                <label 
                  htmlFor={`task-${task.id}`}
                  className={cn(
                    "font-medium",
                    task.completed && "line-through text-gray-500"
                  )}
                >
                  {task.title}
                </label>
                <div className="text-xs text-gray-500 mt-1">
                  Added on {new Date(task.date).toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm font-medium px-2 py-1 rounded-full bg-opacity-10">
                {task.priority}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleUpdatePriority(task.id, 'High')}>
                    High Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdatePriority(task.id, 'Medium')}>
                    Medium Priority
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleUpdatePriority(task.id, 'Low')}>
                    Low Priority
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => handleDeleteTask(task.id)}
              >
                <Trash className="h-4 w-4 text-red-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
