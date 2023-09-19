import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class CoordService {
    public radius = 33

    constructor (){}

    ChangeHandler() {
        console.log('radius: ' + this.radius);
    }
}