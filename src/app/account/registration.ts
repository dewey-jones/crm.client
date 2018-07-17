interface IRegistration {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

class Registration implements IRegistration {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;

  constructor() {
    this.email = "";
    this.userName = "";
    this.password = "";
    this.confirmPassword = "";
  }
}

export {
  IRegistration,
  Registration
}
