export class Profile {
    constructor(id, name, gender, age, height, location, image, premium) {
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.height = height;
        this.location = location;
        this.image = image;
        this.premium = premium;
    }
}

export class Premium extends Profile {
    constructor(id, name, gender, age, height, location, image, premium, hobbies) {
        super(id, name, gender, age, height, location, image, premium);
        this.hobbies = hobbies;
    }
}