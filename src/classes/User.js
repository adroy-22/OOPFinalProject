class User {
  constructor(userId, name, email) {
    this._userId = userId;
    this._name = name;
    this._email = email;
  }

  get userId() {
    return this._userId;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  get email() {
    return this._email;
  }

  set email(newEmail) {
    this._email = newEmail;
  }

  toDict() {
    return {
      user_id: this.userId,
      name: this.name,
      email: this.email
    };
  }

  static fromDict(data) {
    return new User(
      data.user_id,
      data.name,
      data.email
    );
  }
}

export default User; 