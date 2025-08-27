import { Injectable, TemplateRef, Type } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { map, startWith } from 'rxjs/operators';

type Props<T> = { [key in keyof T]: any };
type InputProps<T> = Partial<Props<T>>;

export class TypedModalRef<T> extends NgbModalRef {
    get componentInstance(): T {
        return super.componentInstance;
    }
}

@Injectable()
export class ModalService {
    constructor(private modalService: NgbModal) {}

    open<T>(component: Type<T> | TemplateRef<T>, options: NgbModalOptions = {}, inputs: InputProps<T> = {}): TypedModalRef<T> {
        const modalRef = this.modalService.open(component, options);

        if (modalRef.componentInstance) {
            for (const prop in inputs) {
                if (inputs.hasOwnProperty(prop)) {
                    modalRef.componentInstance[prop] = inputs[prop];
                }
            }

            modalRef.componentInstance.shown = modalRef.shown.pipe(
                map(() => true),
                startWith(false)
            );
        }

        return modalRef;
    }

    dismissAll() {
        if (this.modalService.hasOpenModals()) {
            this.modalService.dismissAll();
        }
    }

    hasOpenModals() {
        return this.modalService.hasOpenModals();
    }
}
