import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RetrospectiveService } from './shared/retrospective.service';
import { first } from 'rxjs/operators';
import { Cards } from './shared/model/retrospective.model';

@Component({
    templateUrl: './retrospective.component.html',
    styleUrls: ['./retrospective.component.scss']
})
export class RetrospectiveComponent implements OnInit {
    cardFormGroup: FormGroup;
    selectors = ['To Improve', 'Went Well'];
    value: string;
    model = new Cards();

    constructor(private retrospectiveService: RetrospectiveService) {
    }

    ngOnInit() {
        this.listCards();
        this.createForm();
    }

    createForm(): void {
        this.cardFormGroup = new FormGroup({
            title: new FormControl('', Validators.required),
            message: new FormControl('', Validators.required)
        });
    }

    listCards(): void {
        this.retrospectiveService
            .getCards()
            .pipe(first())
            .subscribe(data => {
                this.model = data;
            });
    }

    saveCard(): void {
        this.retrospectiveService.saveCard({
            ...this.cardFormGroup.value,
            type: this.value
        })
        .pipe(first())
        .subscribe(data => {
            this.listCards();
        });
    }

    setSelected(value: string): void {
        this.value = value;
    }
}
