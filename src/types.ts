export interface Goal {
    id: string;
    title: string;
    description: string;
    category: 'personal' | 'work' | 'health' | 'learning';
    completed: boolean;
    dueDate: string;
    createdAt: string;
  }