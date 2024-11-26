import { CheckCircle2, Circle, Clock, Pencil, Trash2 } from 'lucide-react';
import { Goal } from '../types';

interface GoalCardProps {
  goal: Goal;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (goal: Goal) => void;
}

const categoryColors = {
  personal: 'bg-purple-100 text-purple-800',
  work: 'bg-blue-100 text-blue-800',
  health: 'bg-green-100 text-green-800',
  learning: 'bg-orange-100 text-orange-800',
};

export default function GoalCard({ goal, onToggle, onDelete, onEdit }: GoalCardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 transition-all ${
      goal.completed ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onToggle(goal.id)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {goal.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Circle className="w-6 h-6" />
              )}
            </button>
            <h3 className={`text-lg font-semibold ${
              goal.completed ? 'line-through text-gray-500' : 'text-gray-800'
            }`}>
              {goal.title}
            </h3>
          </div>
          <p className="mt-2 text-gray-600 ml-9">{goal.description}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(goal)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            <Pencil className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(goal.id)}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 ml-9">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
          categoryColors[goal.category]
        }`}>
          {goal.category}
        </span>
        <span className="flex items-center gap-1 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          Due: {new Date(goal.dueDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}