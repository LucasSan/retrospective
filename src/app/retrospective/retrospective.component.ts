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
    sprintFormGroup: FormGroup;
    model = new Array<Cards>();
    itemCard: Cards;
    modalTitle = 'Create New Card';
    modalSprintTitle = 'Create New Sprint';
    submitButtonText = 'Save';
    modalCardsFormId = 'modalCardsFormId';
    modalSprintFormId = 'modalSprintFormId';
    close = false;
    @ViewChild('openModalButton') openModalButton: ElementRef;

    constructor(private retrospectiveService: RetrospectiveService) {
    }

    ngOnInit() {
        this.listCards();
        this.createCardsForm();
        this.createSprintForm();
    }

    createSprintForm(): void {
        this.sprintFormGroup = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.maxLength(20)])
        });
    }

    createCardsForm(): void {
        this.cardFormGroup = new FormGroup({
            code: new FormControl(''),
            type: new FormControl('', Validators.required),
            title: new FormControl('', [Validators.required, Validators.maxLength(20)]),
            message: new FormControl('', [Validators.required, Validators.maxLength(280)])
        });

        if (this.itemCard) {
            this.cardFormGroup.controls.code.setValue(this.itemCard.code);
            this.cardFormGroup.controls.type.setValue(this.itemCard.type);
            this.cardFormGroup.controls.title.setValue(this.itemCard.title);
            this.cardFormGroup.controls.message.setValue(this.itemCard.message);
            this.itemCard = undefined;
        }
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

    saveSprint(): void {
        debugger;
        if (this.sprintFormGroup.valid) {
            this.retrospectiveService.saveSprint({
                ...this.sprintFormGroup.value
            })
            .pipe(first())
            .subscribe(() => {
                debugger;
            });
        }
    }

    saveCard(): void {
        if (this.cardFormGroup.valid && this.submitButtonText === 'Save') {
            this.retrospectiveService.saveCard({
                ...this.cardFormGroup.value
            })
            .pipe(first())
            .subscribe(() => {
                this.closeModal();
                this.listCards();
            });
        } else if (this.cardFormGroup.valid && this.submitButtonText === 'Edit') {
            this.retrospectiveService.updateCard({
                ...this.cardFormGroup.value
            })
            .pipe(first())
            .subscribe(() => {
                this.closeModal();
                this.listCards();
            });
        }
    }

    editItem(item: Cards): void {
        this.itemCard = item;
        this.openModalButton.nativeElement.click();
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
        if (this.itemCard) {
            this.modalTitle = 'Edit Card';
            this.submitButtonText = 'Edit';
        } else {
            this.modalTitle = 'Create New Card';
            this.submitButtonText = 'Save';
        }

        this.close = false;
        this.createCardsForm();
    }

    closeModal(): void {
        this.itemCard = undefined;
        this.close = true;
    }
}
