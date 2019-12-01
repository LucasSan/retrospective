import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RetrospectiveService } from './shared/retrospective.service';
import { first } from 'rxjs/operators';
import { Cards } from './shared/model/retrospective.model';
import * as moment from 'moment';

@Component({
    templateUrl: './retrospective.component.html',
    styleUrls: ['./retrospective.component.scss']
})
export class RetrospectiveComponent implements OnInit {
    cardFormGroup: FormGroup;
    selectors = ['To Improve', 'Went Well', 'Actions'];
    model = new Array<Cards>();
    @ViewChild('closeModal') closeModalButton: ElementRef;
    @ViewChild('openModalButton') openModalButton: ElementRef;

    constructor(private retrospectiveService: RetrospectiveService) {
    }

    ngOnInit() {
        this.listCards();
        this.createForm();
    }

    createForm(): void {
        this.cardFormGroup = new FormGroup({
            type: new FormControl('', Validators.required),
            title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            message: new FormControl('', [Validators.required, Validators.maxLength(280)])
        });
    }

    listCards(): void {
        this.retrospectiveService
            .getCards()
            .pipe(first())
            .subscribe(data => {
                data.forEach(item => item.created = moment(+item.created).fromNow());
                this.model = data;
            });
    }

    saveCard(): void {
        if (this.cardFormGroup.valid) {
            this.retrospectiveService.saveCard({
                ...this.cardFormGroup.value
            })
            .pipe(first())
            .subscribe(() => {
                this.closeModal();
                this.listCards();
            });
        }
    }

    setSelected(value: string): void {
        this.cardFormGroup.controls.type.setValue(value);
    }

    editItem(item: Cards): void {
        this.openModalButton.nativeElement.click();
        this.openModal();

        this.cardFormGroup.controls.type.setValue(item.type);
        this.cardFormGroup.controls.title.setValue(item.title);
        this.cardFormGroup.controls.message.setValue(item.message);
    }

    deleteItem(item: Cards): void {
        item.status = 'inactive';
        this.retrospectiveService
            .deleteCard(item)
            .pipe(first())
            .subscribe(data => {
                this.listCards();
            });
    }

    openModal(): void {
        this.createForm();
    }

    closeModal(): void {
        this.closeModalButton.nativeElement.click();
    }
}
