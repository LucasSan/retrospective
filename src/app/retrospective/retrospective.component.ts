import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
    selectors = ['To Improve', 'Went Well', 'Actions'];
    model = new Cards();
    @ViewChild('retrospectiveModal') retrospectiveModal: ElementRef;

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
                this.listCards();
            });
        }
    }

    setSelected(value: string): void {
        this.cardFormGroup.controls.type.setValue(value);
    }

    openModal() {
        this.retrospectiveModal.nativeElement.className = 'modal fade show';
    }

    closeModal() {
        this.retrospectiveModal.nativeElement.className = 'modal hide';
    }
}
