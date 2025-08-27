import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

export interface Env {
    adminApiURL: string;
}
@Injectable({
    providedIn: 'root'
})
export class ToasterService {
    settings = {
        timeOut: 2000,
        progressAnimation: 'decreasing',
        progressBar: true,
        positionClass: 'toast-bottom-right',
    };
    constructor(private http: HttpClient, private toastr: ToastrService, @Inject('environment') private environment: Env) {}

    successToast(message: Toaster, timeOut?: number) {
        setTimeout(() =>
            this.toastr.success(message.content, message.title, {
                timeOut: timeOut ? timeOut : this.settings.timeOut,
                progressBar: this.settings.progressBar,
                positionClass: this.settings.positionClass,
            })
        );
    }

    errorToast(message: Toaster, timeOut?: number) {
        setTimeout(() =>
            this.toastr.error(message.content, message.title, {
                timeOut: timeOut ? timeOut : this.settings.timeOut,
                progressBar: this.settings.progressBar,
                positionClass: this.settings.positionClass,
            })
        );
    }

    warningToast(message: Toaster, timeOut?: number) {
        setTimeout(() =>
            this.toastr.warning(message.content, message.title, {
                timeOut: timeOut || this.settings.timeOut,
                progressBar: this.settings.progressBar,
                positionClass: this.settings.positionClass,
            })
        );
    }

    infoToast(message: Toaster) {
        setTimeout(() =>
            this.toastr.info(message.content, message.title, {
                timeOut: this.settings.timeOut,
                progressBar: this.settings.progressBar,
                positionClass: this.settings.positionClass,
            })
        );
    }

    sendReport(error: { error: string; stackTrace: string; traceId: string; timestamp: string; serviceName: string }) {
        if (this.environment.adminApiURL) {
            const api = `${this.environment.adminApiURL}/error-report`;
            return this.http.post(api, error);
        }
    }
}

export interface Toaster {
    title: string;
    content: string;
}
