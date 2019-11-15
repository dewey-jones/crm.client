interface ICompany {
    id: number;
    companyName: string;
    sales: number;
    employees: number;
    addr1: string;
    addr2?: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    contact: boolean;
    mail: boolean;
    mailDate: Date;
    callOn: Date;
    companyNotes: string;
    rating: number;
    nearby: boolean;
    appropriate: number;
    consultants: boolean;
}

class Company implements ICompany {
  id: number;
  companyName: string;
  sales: number;
  employees: number;
  addr1: string;
  addr2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  contact: boolean;
  mail: boolean;
  mailDate: Date;
  callOn: Date;
  companyNotes: string;
  rating: number;
  nearby: boolean;
  appropriate: number;
  consultants: boolean;

  constructor() {
      this.id = 0;
      this.companyName = "";
      this.sales = 0;
      this.employees = 0;
      this.addr1 = "";
      this.addr2 = "";
      this.city = "";
      this.state = "";
      this.zip = "";
      this.phone = "";
      this.contact = false;
      this.mail = false;
      this.mailDate = null;
      this.callOn = null;
      this.companyNotes = "";
      this.rating = 0;
      this.nearby = false;
      this.appropriate = 0;
      this.consultants = false;    
  }
}

export {
  ICompany,
  Company
}