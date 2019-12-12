import { Injectable } from '@angular/core';
declare var toastr: any;

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: string[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
  success(title, msg) {
    toastr.success(msg, title);
  }
  info(title, msg) {
    toastr.info(msg, title);
  }
  warning(title, msg) {
    toastr.warning(msg, title);
  }
  error(title, msg) {
    toastr.error(msg, title);
  }

  wait(title, msg) {
    toastr.info(msg, title, { timeOut: 3000 });
  }
}
