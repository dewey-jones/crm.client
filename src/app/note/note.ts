interface INote {
    id: number;
    contactId: number;
    contactDate: Date;
    noteText: string;
}

class Note implements INote {
    id: number;
    contactId: number;
    contactDate: Date;
    noteText: string;

    constructor() {
        this.id = 0;
        this.contactId = 0;
        this.contactDate = null;
        this.noteText = "";
    }
}

export {
    INote,
    Note
}