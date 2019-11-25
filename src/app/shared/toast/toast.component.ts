import {Component, HostBinding, HostListener, OnInit, TemplateRef} from '@angular/core';
import {ToastService} from '../../drive/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  constructor(private toastService: ToastService) {
  }

  ngOnInit() {
  }
}
