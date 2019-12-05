import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RetrospectiveService } from './shared/retrospective.service';
import { first } from 'rxjs/operators';
import { Cards } from './shared/model/retrospective.model';
import * as moment from 'moment';
import { Sprints } from './shared/model/sprints.model';

@Component({
    templateUrl: './retrospective.component.html',
    styleUrls: ['./retrospective.component.scss']
})
export class RetrospectiveComponent implements OnInit {
    cardFormGroup: FormGroup;
    sprintFormGroup: FormGroup;
    filterFormGroup: FormGroup;
    model = new Array<Cards>();
    modelListSprints = new Array<Sprints>();
    itemCard: Cards;
    itemSprint: Sprints;
    modalTitle = 'Create New Card';
    modalSprintTitle = 'Create New Sprint';
    submitButtonText = 'Save';
    filterButtonText = 'Filter';
    modalCardsFormId = 'modalCardsFormId';
    modalSprintFormId = 'modalSprintFormId';
    modalFilterFormId = 'modalFilterFormId';
    modalFilterTitle = 'Filter';
    close = false;
    disabledCreateNewCard = true;
    @ViewChild('openModalButton') openModalButton: ElementRef;

    constructor(private retrospectiveService: RetrospectiveService) {
    }

    ngOnInit() {
        this.listSprints();
        this.listCards();
        this.createCardsForm();
        this.createSprintForm();
        this.createFilterForm();
    }

    createFilterForm(): void {
        this.filterFormGroup = new FormGroup({
            sprint: new FormControl('', [Validators.required])
        });
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

    listCards(sprintCode?: string): void {
        this.retrospectiveService
            .getCards(sprintCode)
            .pipe(first())
            .subscribe(data => {
                if (data.embedded.length > 0) {
                    data.embedded.forEach(item => item.created = moment(+item.created).fromNow());
                }
                this.model = data.embedded;
            });
    }

    listSprints(): void {
        this.retrospectiveService
            .getSprints()
            .pipe(first())
            .subscribe((data: Array<Sprints>) => {
                if (data.length > 0) {
                    this.disabledCreateNewCard = false;
                }
                this.modelListSprints = data;
            });
    }

    saveSprint(): void {
        if (this.sprintFormGroup.valid) {
            this.retrospectiveService.saveSprint({
                ...this.sprintFormGroup.value
            })
            .pipe(first())
            .subscribe((data) => {
                this.itemSprint = data;
                this.closeModal();
                this.disabledCreateNewCard = false;
            });
        }
    }

    saveCard(): void {
        if (this.cardFormGroup.valid && this.submitButtonText === 'Save') {
            this.retrospectiveService.saveCard({
                ...this.cardFormGroup.value,
                sprint: this.filterFormGroup.controls.sprint.value
            })
            .pipe(first())
            .subscribe(() => {
                this.closeModal();
                this.listCards(this.filterFormGroup.controls.sprint.value);
            });
        } else if (this.cardFormGroup.valid && this.submitButtonText === 'Edit') {
            this.retrospectiveService.updateCard({
                ...this.cardFormGroup.value,
                sprint: this.filterFormGroup.controls.sprint.value
            })
            .pipe(first())
            .subscribe(() => {
                this.closeModal();
                this.listCards(this.filterFormGroup.controls.sprint.value);
            });
        }
    }

    filterSprint(): void {
        if (this.filterFormGroup.valid) {
            this.listCards(this.filterFormGroup.controls.sprint.value);
            this.closeModal();
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
                this.listCards(this.filterFormGroup.controls.sprint.value);
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
