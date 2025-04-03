
import React from 'react';
import TaskInput from '../tasks/TaskInput';
import TaskList from '../tasks/TaskList';
import WeatherWidget from '../weather/WeatherWidget';
import AiSuggest from '../ai/AiSuggest';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
          <TaskInput />
          <TaskList />
        </div>
        <div className="lg:col-span-1">
          <WeatherWidget />
          <AiSuggest/>
          <div className="bg-gray-50 rounded-lg p-6 border">
            <h3 className="font-medium mb-3">Task Management Tips</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-600">
              <li>Break large tasks into smaller, manageable pieces</li>
              <li>Prioritize tasks based on urgency and importance</li>
              <li>Set realistic deadlines for your tasks</li>
              <li>Take regular breaks to maintain productivity</li>
              <li>Review your completed tasks to track progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
