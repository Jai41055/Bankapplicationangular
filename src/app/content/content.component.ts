import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  serviceId: any = 0;
  formShowFlag: boolean = false;
  firstNameflag: boolean = false;
  lastNameflag: boolean = false;
  emailflag: boolean = false;
  phoneflag: boolean = false;
  accountFlag: boolean = false;
  initialflag: boolean = false;
  depositFlag: boolean = false;
  withdrawflag: boolean = false;
  status: any;
  message: any;
  userName: any;
  accountNumber: any;
  accountType: any;
  accountBalance: any;
  interest: any;
  transferList: any;

  constructor(private service: CommonService) {}

  formInput = new FormGroup({
    accountNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+$'),
      Validators.minLength(1),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.pattern('[a-zA-Z]+$'),
      Validators.minLength(1),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.pattern('^[0-9]+$'),
    ]),
    amountInitial: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
    ]),
    withdraw: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.min(1),
    ]),
    deposit: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]+$'),
      Validators.min(1),
    ]),
  });

  get first() {
    return this.formInput.get('firstName');
  }

  get last() {
    return this.formInput.get('lastName');
  }

  get emailAdd() {
    return this.formInput.get('email');
  }

  get mobile() {
    return this.formInput.get('phone');
  }

  get intial() {
    return this.formInput.get('amountInitial');
  }

  get depositMoney() {
    return this.formInput.get('deposit');
  }

  get withdrawMoney() {
    return this.formInput.get('withdraw');
  }

  get accountNo() {
    return this.formInput.get('accountNumber');
  }
  ngOnInit(): void {}

  serviceChange() {
    let id = this.serviceId;

    //reset flags
    this.formShowFlag = false;
    this.firstNameflag = false;
    this.lastNameflag = false;
    this.emailflag = false;
    this.phoneflag = false;
    this.accountFlag = false;
    this.initialflag = false;
    this.depositFlag = false;
    this.withdrawflag = false;

    this.formInput.get('accountNumber')?.setValue('');
    this.formInput.get('firstName')?.setValue('');
    this.formInput.get('lastName')?.setValue('');
    this.formInput.get('email')?.setValue('');
    this.formInput.get('phone')?.setValue('');
    this.formInput.get('amountInitial')?.setValue('');
    this.formInput.get('withdraw')?.setValue('');
    this.formInput.get('deposit')?.setValue('');

    if (id == 0) {
      this.formShowFlag = false;
    } else if (id == 1 || id == 2) {
      this.formShowFlag = true;
      this.firstNameflag = true;
      this.lastNameflag = true;
      this.emailflag = true;
      this.phoneflag = true;
      this.initialflag = true;

      this.formInput.get('accountNumber')?.setValue('1234567890');
      this.formInput.get('withdraw')?.setValue('120');
      this.formInput.get('deposit')?.setValue('120');
    } else if (id == 3) {
      this.formShowFlag = true;
      this.accountFlag = true;
      this.depositFlag = true;

      this.formInput.get('firstName')?.setValue('Test');
      this.formInput.get('lastName')?.setValue('Test');
      this.formInput.get('email')?.setValue('Test@test');
      this.formInput.get('phone')?.setValue('1234567890');
      this.formInput.get('amountInitial')?.setValue('100');
      this.formInput.get('withdraw')?.setValue('100');
    } else if (id == 4) {
      this.formShowFlag = true;
      this.accountFlag = true;
      this.withdrawflag = true;

      this.formInput.get('firstName')?.setValue('Test');
      this.formInput.get('lastName')?.setValue('Test');
      this.formInput.get('email')?.setValue('Test@test');
      this.formInput.get('phone')?.setValue('1234567890');
      this.formInput.get('amountInitial')?.setValue('100');
      this.formInput.get('deposit')?.setValue('100');
    } else if (id == 5 || id == 6) {
      this.formShowFlag = true;
      this.accountFlag = true;

      this.formInput.get('firstName')?.setValue('Test');
      this.formInput.get('lastName')?.setValue('Test');
      this.formInput.get('email')?.setValue('Test@test');
      this.formInput.get('phone')?.setValue('1234567890');
      this.formInput.get('amountInitial')?.setValue('100');
      this.formInput.get('deposit')?.setValue('100');
      this.formInput.get('withdraw')?.setValue('100');
    }
  }

  submitForm() {
    let payload = {};
    let first_name = this.formInput.value.firstName;
    let last_name = this.formInput.value.lastName;
    let accountNo = this.formInput.value.accountNumber;
    let email = this.formInput.value.email;
    let phone = this.formInput.value.phone;
    let amountInitial = this.formInput.value.amountInitial;
    let withdraw = this.formInput.value.withdraw;
    let deposit = this.formInput.value.deposit;
    if (this.serviceId == 1) {
      payload = {
        accountType: 'Checking',
        firstName: first_name,
        lastName: last_name,
        userEmail: email,
        userPhone: phone,
        initialAmount: Number(amountInitial),
        serviceId: 1,
      };

      this.service.createNewAccount(payload).subscribe((res) => {
        this.setValues(res, 1);
      });
    } else if (this.serviceId == 2) {
      payload = {
        accountType: 'Savings',
        firstName: first_name,
        lastName: last_name,
        userEmail: email,
        userPhone: phone,
        initialAmount: Number(amountInitial),
        serviceId: 2,
      };

      this.service.createNewAccount(payload).subscribe((res) => {
        this.setValues(res, 2);
      });
    } else if (this.serviceId == 3) {
      payload = {
        accountNumber: Number(accountNo),
        depositAmount: Number(deposit),
        serviceId: 3,
      };

      this.service.transacion(payload).subscribe((res) => {
        this.setValues(res, 3);
      });
    } else if (this.serviceId == 4) {
      payload = {
        accountNumber: Number(accountNo),
        withdrawAmount: Number(withdraw),
        serviceId: 4,
      };
      this.service.transacion(payload).subscribe((res) => {
        this.setValues(res, 4);
      });
    } else if (this.serviceId == 5 || this.serviceId == 6) {
      payload = {
        accountNumber: Number(accountNo),
        serviceId: this.serviceId,
      };
      if (this.serviceId == 5) {
        this.service.getInterest(payload).subscribe((res) => {
          this.setValues(res, 5);
        });
      } else {
        this.service.getBalance(payload).subscribe((res) => {
          this.setValues(res, 6);
        });
      }
    }

    this.serviceId = 0;
    this.serviceChange();
  }

  setValues(res: any, id: any) {
    this.status = res.status;
    this.message = res.message;
    this.userName = res.userName;
    this.accountNumber = res.accountNumber;
    this.accountType = res.accountType;
    this.accountBalance = res.amount;
    this.interest = res.newBalance - res.existingBalance;
    this.transferList = null;
    if (id == 5) {
      this.accountBalance = res.newBalance;
    }
    if (id == 3 || id == 4) {
      this.transferList = res.transactions.reverse();
    }
  }

  getColor() {
    return this.status == 'SUCCESS' ? 'green' : 'red';
  }

  setTrans(data: any) {
    return data > 0 ? 'Credited' : 'Debited';
  }

  getAmountColor(data: any) {
    return data > 0 ? 'green' : 'red';
  }

  getArrowFlag(item: any) {
    return item > 0 ? true : false;
  }
}
