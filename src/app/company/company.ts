export interface ICompany {
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
    companyNotes: Date;
    rating: number;
    nearby: boolean;
    appropriate: number;
    consultants: boolean;
}
