import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CoordService {
    public radius = 30

    ChangeHandler() {
        this.radius = this.radius / 100000
        console.log(this.radius);
    }
}
