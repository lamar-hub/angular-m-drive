import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {User} from '../../auth/user.model';
import {loadStripe} from '@stripe/stripe-js';
import {Plan} from '../../auth/plan.model';
import {environment} from '../../../environments/environment';


@Component({
  selector: 'app-storage-upgrade',
  templateUrl: './storage-upgrade.component.html',
  styleUrls: ['./storage-upgrade.component.scss']
})
export class StorageUpgradeComponent implements OnInit {

  user: User;
  plan = Plan.free;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService
      .userObservable
      .subscribe(
        user => {
          this.user = user;
          this.plan = user.plan;
        }
      );
  }

  subscribe(plan: Plan) {
    let stripePlanId: string;
    if (plan === Plan.business) {
      stripePlanId = 'price_1HEw5CAp5bE3foz2d2fUoYXF';
    } else {
      stripePlanId = 'price_1HEw3eAp5bE3foz2ceSukKaf';
    }

    if(!stripePlanId) {
      return;
    }

    this.checkout(stripePlanId).then(r => console.log(r));
  }

  async checkout(stripePlanId: string) {
    this.authService.upgradeUser(this.plan === 0 ? (this.plan === 1 ? Plan.business : Plan.pro) : Plan.pro).subscribe();
    const stripe = await loadStripe(environment.stripeKey);
    const error = await stripe.redirectToCheckout({
      items: [
        {
          plan: stripePlanId,
          quantity: 1
        }
      ],
      successUrl: 'http://localhost:4200',
      cancelUrl: 'http://localhost:4200',
    });
    console.log(error);
  }

}
