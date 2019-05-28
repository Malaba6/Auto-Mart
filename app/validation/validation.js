import url from "url";


const Validator = {
    isValidName(name) {
        if (typeof name !== "string" || name.trim().length < 3) {
            return "Name must be a string at least 3 characters";
        }
        const patern = /^[^.]*[a-zA-Z]$/.test(name);

        if (!patern) {
            return "Name must not contain a special character";
        }
        return "valid";
    },

    isValidPassword(password) {
        if (typeof password !== "string" || password.length < 6) {
            return "Password must be a string of at least 6 characters";
        }
        return "valid";
    },

    isValidEmail(email) {
        if (typeof email !== "string") {
            return "Email must be of string type";
        }
        const patern = /[\w-]+@[\w-]+\.+/.test(email);
        if (!patern) {
            return "Email must be of the format eric@gmail.com";
        }
        return "valid";
    },

    isValidAddress(address) {
        if (typeof address !== "string") {
            return "Address must be a string of characters";
        }
        return "valid";
    },

    isValidState(state) {
        if (state !== "new" && state !== "used") {
            return "State must be either new or used";
        }
        return "valid";
    },

    isValidPrice(price) {
        if (+price !== price || price <= 1) {
            return "Price must be a number greater than 0";
        }
        return "valid";
    },

    isValidManufacturer(manufacturer) {
        if (typeof manufacturer !== "string" || manufacturer.trim().length === 0) {
            return "Manufacturer must be a string of characters not null";
        }
        return "valid";
    },

    isValidModel(model) {
        if (typeof model !== "string" || model.trim().length === 0) {
            return "Model must be a string of characters not null";
        }
        return "valid";
    },

    isValidType(type) {
        if (typeof type !== "string" || type.length === 0) {
            return "Type must be a string of characters not null";
        }
        return "valid";
    },

    isValidImageUrl(photo) {
        if (typeof photo !== "string" || photo.length === 0) {
            return "The Photo Url must be a string of characters not null";
        }
        if (!photo.match(/(.jpg|.png|.jpeg)$/g)) {
            return "Image must be one of these formats .jpg .jpn .jpeg";
        }
        if (!photo.includes("https://res.cloudinary.com")) {
            return `Couldn't find image ${photo}`;
        }
        return "valid";
    }
}

export default Validator;