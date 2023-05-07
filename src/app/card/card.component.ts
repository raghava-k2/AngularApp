import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Card } from './card';
import { CardService } from './card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  card: Card = { expiryDate: null, type: '' };

  operationType: string | null = "new";

  constructor(private cardService: CardService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.operationType = this.route.snapshot.paramMap.get('operation');
    if ('card' in localStorage) {
      const oldcard: Card = JSON.parse(localStorage.getItem('card') as any);
      this.card.number = window.atob(oldcard.number ?? '');
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

  saveCard() {
    this.cardService.saveCard(this.card).subscribe({
      next: this.handleSave,
      error: this.handleError
    });
  }
}
