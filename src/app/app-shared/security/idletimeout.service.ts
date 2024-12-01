
import {timer as observableTimer,  Observable, Subject, Subscription, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CacheService } from '../services/cache.service';
import { TokenInfo } from '../../app-models/security.model';

@Injectable()
export class IdleTimeoutService {
    private _count = 0;
    private _serviceId: string = 'idleTimeoutSvc-' + Math.floor(Math.random() * 10000);
    private _timeoutSeconds = 5;
    private timerSubscription?: Subscription;
    private timer?: Observable<number>;
    private resetOnTrigger = false;
    public timeoutExpired: Subject<number> = new Subject<number>();

    constructor(private _cacheService: CacheService) {
        if (this._cacheService.getTicket("Token")) {
            this._count = (<TokenInfo>this._cacheService.getTicket("Token")).Expiry;
            this.timeoutExpired.subscribe(n => {
            });
            this.startTimer();
        }
    }
    public startTimer() {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }

        this.timer = observableTimer(60000);// each 10 seconds
        this.timerSubscription = this.timer.subscribe(n => {
            this.timerComplete(n);
        });
    }

    public stopTimer() {
        this.UpdateExpiry();
        this.timerSubscription?.unsubscribe();
    }

    public resetTimer() {
        if (this.timerSubscription) {
            this.timerSubscription.unsubscribe();
        }

        this.timer = observableTimer(60000);
        this.timerSubscription = this.timer.subscribe(n => {
            this.timerComplete(n);
        });
    }

    private timerComplete(n: number) {
        this.UpdateExpiry();
        if (this._count <= 0) {
            this.timeoutExpired.next(this._count);
        }
        else {
            this.resetTimer();
        }

        if (this.resetOnTrigger) {
            this.startTimer();
        }
    }

    private UpdateExpiry(): void {
        var token = (<TokenInfo>this._cacheService.getTicket("Token"));
        token.Expiry = token.Expiry - 1;
        this._count = token.Expiry;
        this._cacheService.clearDataCache("Token");
        this._cacheService.addTicket("Token", token);
    }
}
