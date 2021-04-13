export interface User {
    gender: string;
    name: Name;
    location: Location;
    email: string;
    login: Login;
    dob: Dod;
    registered: Dod;
    phone: string;
    cell: string;
    id: Id;
    picture: Picture;
    nat: string;
    base64?: string;
}

export interface Name {
    title: string;
    first: string;
    last: string;
}

export interface Location {
    street: string;
    city: string;
    state: string;
    postcode: string;
    coordinates: any;
    timezone: any;
}
export interface Login {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
}
export interface Dod {
    date: string;
    age: string;
}
export interface Dod {
    date: string;
    age: string;
}
export interface Id {
    name: string;
    value: string;
}
export interface Picture {
    large: string;
    medium: string;
    thumbnail: string;
}
