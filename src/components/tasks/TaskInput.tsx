
import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addTask, type TaskPriority } from '../../store/slices/tasksSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const TaskInput = () => {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('Medium');
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Task title cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    dispatch(
      addTask({
        title: title.trim(),
        priority,
        completed: false,
        date: new Date().toISOString(),
      })
    );
    
    toast({
      title: "Success",
      description: "Task added successfully",
    });
    
    setTitle('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1"
        />
        <Select
          value={priority}
          onValueChange={(value) => setPriority(value as TaskPriority)}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High">High</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Low">Low</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit">Add Task</Button>
      </div>
    </form>
  );
};

export default TaskInput;
