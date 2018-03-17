interface IContact {
    id: number;
    companyId: number;
    lName: string;
    fName: string;
    phone: string;
    ext: string;
    email: string;
    title: string;
    dept: string;
    shouldContact: boolean;
    dateContacted: Date;
    dateMailed: Date;
    noChance: boolean;
    nextCall: Date;
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    zip: string;
    rating: number;
    networkingContact: boolean;    
}

// function createContact(
//     id: number,
//     companyId?: number,
//     lName?: string,
//     fName?: string,
//     phone?: string,
//     ext?: string,
//     email?: string,
//     title?: string,
//     dept?: string,
//     shouldContact?: boolean,
//     dateContacted?: Date,
//     dateMailed?: Date,
//     noChance?: boolean,
//     nextCall?: Date,
//     addr1?: string,
//     addr2?: string,
//     city?: string,
//     state?: string,
//     zip?: string,
//     rating?: number,
//     networkingContact?: boolean
// ): IContact {
//     return {
//         id,
//         companyId,
//         lName,
//         fName,
//         phone,
//         ext,
//         email,
//         title,
//         dept,
//         shouldContact,
//         dateContacted,
//         dateMailed,
//         noChance,
//         nextCall,
//         addr1,
//         addr2,
//         city,
//         state,
//         zip,
//         rating,
//         networkingContact
//     }
// }

class Contact implements IContact {
    id: number;
    companyId: number;
    lName: string;
    fName: string;
    phone: string;
    ext: string;
    email: string;
    title: string;
    dept: string;
    shouldContact: boolean;
    dateContacted: Date;
    dateMailed: Date;
    noChance: boolean;
    nextCall: Date;
    addr1: string;
    addr2: string;
    city: string;
    state: string;
    zip: string;
    rating: number;
    networkingContact: boolean;    

    constructor() {
        this.id = 0;
        this.companyId = 0;
        this.lName = "";
        this.fName = "";
        this.phone = "";
        this.ext = "";
        this.email = "";
        this.title = "";
        this.dept = "";
        this.shouldContact = false;
        this.dateContacted = null;
        this.dateMailed = null;
        this.noChance = false;
        this.nextCall = null;
        this.addr1 = "";
        this.addr2 = "";
        this.city = "";
        this.state = "";
        this.zip = "";
        this.rating = 0;
        this.networkingContact = false;    
    }
}

export {
    IContact,
    Contact
}