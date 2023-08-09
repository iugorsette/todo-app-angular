import { Component, DoCheck } from '@angular/core';
import { TaskList } from '../../model/task-list';
import * as moment from 'moment';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements DoCheck {
  public taskList: Array<TaskList> = JSON.parse(localStorage.getItem('list') || '[]')

  ngDoCheck() {
    this.setLocalStorage();
  }

  public deleteItemTaskList(event: number) {
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList() {
    const confirm = window.confirm(
      'Deseja realmente excluir todas as tarefas?'
    );
    if (confirm) {
      this.taskList = [];
    }
  }

  public setEmitTaskList(event: string) {
    this.taskList.push({ task: event, checked: false , createdAt : new Date()});
  }

  public validationInput(event: string, index: number) {
    if (!event.length) {
      const confirm = window.confirm('Deseja deletar?');

      if (confirm) {
        this.deleteItemTaskList(index);
      }
    }
    this.taskList[index].task = event;
  }

  public setLocalStorage(){
    if (this.taskList){
      this.taskList.sort(
        (first, last) => Number(first.checked) - Number(last.checked)
      );
      localStorage.setItem('list', JSON.stringify(this.taskList));
    }
  }
  getRelativeTime(date: Date): string {
    const now = moment();
    const createdAt = moment(date);
    const diffInMinutes = now.diff(createdAt, 'minutes');

    if (diffInMinutes < 60) {
      if(diffInMinutes < 1){
        return `agora`;
      }
      if (diffInMinutes === 1) {
        return `há ${Math.floor(diffInMinutes)} minuto`;
      }
      return `há ${diffInMinutes} minutos`;
    } else if (diffInMinutes < 1440) {
      return `há ${Math.floor(diffInMinutes / 60)} horas`;
    } else {
      return `há ${Math.floor(diffInMinutes / 1440)} dias`;
    }
  }
}
