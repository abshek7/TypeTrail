import  { useState } from 'react';
import { Goal } from './types';
import GoalCard from './components/GoalCard';
import GoalForm from './components/GoalForm';
import { ListPlus, Target } from 'lucide-react';

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>();
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const handleAddGoal = (newGoal: Omit<Goal, 'id' | 'createdAt'>) => {
    const goal: Goal = {
      ...newGoal,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setGoals([...goals, goal]);
  };

  const handleEditGoal = (updatedGoal: Omit<Goal, 'id' | 'createdAt'>) => {
    if (!editingGoal) return;
    setGoals(goals.map(goal => 
      goal.id === editingGoal.id 
        ? { ...goal, ...updatedGoal }
        : goal
    ));
    setEditingGoal(undefined);
  };

  const handleToggleGoal = (id: string) => {
    setGoals(goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    ));
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  const filteredGoals = goals.filter(goal => {
    if (filter === 'active') return !goal.completed;
    if (filter === 'completed') return goal.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">Goal Tracker</h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ListPlus className="w-5 h-5" />
            Add Goal
          </button>
        </div>

        <div className="mb-6 flex gap-2">
          {(['all', 'active', 'completed'] as const).map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-lg capitalize ${
                filter === option
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredGoals.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No goals found. Start by adding a new goal!</p>
            </div>
          ) : (
            filteredGoals.map(goal => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onToggle={handleToggleGoal}
                onDelete={handleDeleteGoal}
                onEdit={setEditingGoal}
              />
            ))
          )}
        </div>
      </div>

      {(showForm || editingGoal) && (
        <GoalForm
          onSubmit={editingGoal ? handleEditGoal : handleAddGoal}
          onClose={() => {
            setShowForm(false);
            setEditingGoal(undefined);
          }}
          editingGoal={editingGoal}
        />
      )}
    </div>
  );
}