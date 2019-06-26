import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { WebsiteInfo, Subscription, SubscriptionPlan } from '../website-card/website-info';
import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['../app.component.scss', './dashboard.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

    closeResult: string;


    websites: WebsiteInfo[] = [];
    currentPlan: Subscription;
    allPlans: SubscriptionPlan[] = [];
    public isCollapsed = true;

    constructor(private httpClient: HttpClient, private modalService: NgbModal) { }

    ngOnInit() {
        this.currentPlan = {
            id: 0,
            subscriptionPlan: {
                type: 'no plan subscribed',
                durationInDays: 0,
                cost: 0,
                id: 0
            },
            expiryDate: '',
            purchaseDate: '',
            subscriptionStatus: 'Unknown'
        };
        this.refreshAllMyWebsites();
        this.getMyPlans();
        this.getAllPlans();
    }

    refreshAllMyWebsites() {
        const endpoint = 'site/listMyWebsites';
        this.httpClient.get<WebsiteInfo[]>(endpoint).subscribe((response) => {
            this.websites = response;
        });
        setTimeout(() => {
            this.refreshAllMyWebsites();
        }, 10000);
    }

    getMyPlans() {
        const endpoint = 'subscription/my-subscriptions';
        this.httpClient.get<PlanResponse>(endpoint).subscribe((response) => {
            if (response.result.length > 0) {
                this.currentPlan = response.result[0];
            }
        });
    }

    getAllPlans() {
        const endpoint = 'subscription/all-plans';
        this.httpClient.get<AllPlansResponse>(endpoint).subscribe((response) => {
            this.allPlans = response.result;
        });
    }

    subscribeToPlan(plan: SubscriptionPlan) {
        const endpoint = 'subscription/subscribe-plan/' + plan.id;
        this.httpClient.post<Subscription>(endpoint, {}).subscribe((response) => {
            this.currentPlan = response;
        });
    }

    chargeCreditCard(id: number, modal) {
        const payform = document.getElementById("stripe-payment-form");
        (<any>window).Stripe.card.createToken({
            number: payform.cardNumber.value,
            exp_month: payform.expMonth.value,
            exp_year: payform.expYear.value,
            cvc: payform.cvc.value
        }, (status: number, response: any) => {
            if (status === 200) {
                let token = response.id;
                this.chargeCard(token, id, modal);
            } else {
                console.log(response.error.message);
            }
        });
    }

    chargeCard(token: string, subscriptionId: number, modal) {
        const endpoint = 'subscription/do-payment/' + subscriptionId;
        const data = { 'token': token, 'id': subscriptionId };
        this.httpClient.post<SubscribeResponse>(endpoint, data).subscribe((response) => {
            modal.close("success");
            this.getMyPlans();
        });
    }

    showPaymentDialog(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }
}

interface PlanResponse {
    status: number;
    message: string;
    result: Subscription[];
}

interface SubscribeResponse {
    status: number;
    message: string;
    result: Subscription;
}


interface AllPlansResponse {
    status: number;
    message: string;
    result: SubscriptionPlan[];
}
