// todo.component.ts
import { Component, OnInit } from '@angular/core';

interface Task {
  name: string;
  completed: boolean;
  important: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
selectedCategory: any;
addCategory() {
throw new Error('Method not implemented.');
}
  newTask: string = '';
  tasks: Task[] = [];
  filter: string = 'all'; // Filtrer les tâches (all, completed, active)
  editingTask: Task | null = null;
  backgroundImageUrl: string | undefined;
newCategoryTitle: any;

  ngOnInit(): void {
    this.loadTasks();
  }

  // Sauvegarder les tâches dans localStorage
  saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }

  // Charger les tâches à partir de localStorage
  loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  }

  addTask() {
    if (this.newTask.trim()) {
      const newTaskObj: Task = {
        name: this.newTask,
        completed: false,
        important: false
      };
      this.tasks.push(newTaskObj);
      this.newTask = '';
      this.saveTasks();
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.saveTasks();
  }

  toggleComplete(task: Task) {
    task.completed = !task.completed;
    this.saveTasks();
  }

  toggleImportant(task: Task) {
    task.important = !task.important;
    this.saveTasks();
  }

  editTask(task: Task) {
    this.editingTask = task;
  }

  updateTask(task: Task) {
    this.editingTask = null;
    this.saveTasks();
  }

  filterTasks(): Task[] {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'active') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  }

  remainingTasks(): number {
    return this.tasks.filter(t => !t.completed).length;
  }

  allCompleted(): boolean {
    return this.tasks.length > 0 && this.tasks.every(t => t.completed);
  }
  
}