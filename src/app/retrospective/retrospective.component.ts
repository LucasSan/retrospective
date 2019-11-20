import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RetrospectiveService } from './shared/retrospective.service';
import { first } from 'rxjs/operators';

@Component({
    templateUrl: './retrospective.component.html',
    styleUrls: ['./retrospective.component.scss']
})
export class RetrospectiveComponent implements OnInit {
    cardFormGroup: FormGroup;
    selectors = ['To Improve', 'Went Well'];
    value: string;

    constructor(private retrospectiveService: RetrospectiveService) {
    }

    ngOnInit() {
        this.listCards();
        this.createForm();
    }

    createForm(): void {
        this.cardFormGroup = new FormGroup({
            message: new FormControl('', Validators.required)
        });
    }

    listCards(): void {
        this.retrospectiveService
            .getCards()
            .pipe(first())
            .subscribe(data => {
            });
    }

    saveCard(): void {
        this.retrospectiveService.saveCard({
            ...this.cardFormGroup.value,
            message: this.value
        })
        .pipe(first())
        .subscribe(data => {
        });
    }

    setSelected(value: string) {
        this.value = value;
    }
}
