import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Card } from './card';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  cardForm: FormGroup = this.fb.group({
    number: [null, Validators.required],
    cvv: [null, Validators.required],
    expiryDate: [null, Validators.required],
    type: [null, Validators.required]
  });

  operationType: string | null = "new";

  constructor(private cardService: CardService, private route: ActivatedRoute, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.operationType = this.route.snapshot.paramMap.get('operation');
    if ('card' in localStorage) {
      const oldcard: Card = JSON.parse(localStorage.getItem('card') as any);
      setTimeout(() => {
        this.cardForm.get('number')?.setValue(window.atob(oldcard.number ?? ''));
      }, 500);
    }
  }

  onChangeCardnumber(event: any) {
    const oldcard: Card = JSON.parse(localStorage.getItem('card') ?? '{}' as any);
    oldcard.number = window.btoa(event);
    localStorage.setItem('card', JSON.stringify(oldcard));
  }

  handleSave(response: any) {
    console.log(response);
  }

  handleError(error: any) {
    console.log(error);
  }

  isInvalid(controlName: string): boolean | undefined {
    const status = (this.cardForm.get(controlName)?.status === 'INVALID' && this.cardForm.get(controlName)?.touched);
    return status;
  }

  saveCard() {
    this.cardService.saveCard(this.cardForm.getRawValue() as Card).subscribe({
      next: this.handleSave,
      error: this.handleError
    });
  }
}
