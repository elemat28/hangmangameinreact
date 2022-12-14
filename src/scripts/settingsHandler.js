import { Try } from "@mui/icons-material";

export default class SettingsHandler {
    static storageType = {
        localStorage: 0,
        sessionStorage: 1
    }
    constructor(storageType, key, defaultValue = null, stringify = false) {

        if (storageType === SettingsHandler.storageType.localStorage) {
            this.queryTarget = localStorage;
        }
        else if (storageType === SettingsHandler.storageType.sessionStorage) {
            this.queryTarget = sessionStorage;
        } else {
            throw new Error("Unsupported storage medium");
        }
        if (key == null) {
            throw new Error("Name for the value is required!");
        }
        this.nameOfTheRecord = String(key);
        if (this.nameOfTheRecord.length < 3) {
            throw new Error("Record name has to be at lest 3 characters long!");
        }
        this.defaultValue = defaultValue;
        let type = typeof defaultValue;

        if (defaultValue != null) {
            if ((type === "string") || (type === "number") || (type === "boolean")) {
                this.stringifyRequired = false;
            } else {
                this.stringifyRequired = true;

            }


        } else {
            if (stringify) {
                this.stringifyRequired = true;
            }
        };
        if (this.stringifyRequired == null) {
            this.stringifyRequired = false;
        }
    }

    get() {
        let fetchResult = this.queryTarget.getItem(this.nameOfTheRecord);
        if (fetchResult == null) {
            return fetchResult;
        } else {
            if (this.stringifyRequired) {
                return JSON.parse(fetchResult);
            } else { return fetchResult }
        }
    }
    isPresent() {
        return !(this.get() == null)
    }
    set(valueToSet = null) {
        if (valueToSet == null) {
            if (this.defaultValue == null) {
                throw new Error("Can't instnatiate value to a null! Provide default");
            } else {
                if (this.stringifyRequired) {
                    this.queryTarget.setItem(this.nameOfTheRecord, JSON.stringify(this.defaultValue))
                } else {
                    this.queryTarget.setItem(this.nameOfTheRecord, this.defaultValue);
                }
            }

        } else {
            console.log(this.stringifyRequired)
            if (this.stringifyRequired) { this.queryTarget.setItem(this.nameOfTheRecord, JSON.stringify(valueToSet)) }
            else {
                this.queryTarget.setItem(this.nameOfTheRecord, valueToSet);
            }
        };

    }
    getOrSet(setVal = null) {
        if (!this.isPresent()) {
            this.set(setVal)
        }
        return this.get();
    }
    remove() {
        if (this.IsPresent) {
            this.queryTarget.removeItem(this.nameOfTheRecord)
        } else {
            throw new Error("Can't remove a key that doesn't exist");
        }

    }

    async asyncUpdate(value) {
        this.set(value);
    }
}

export class StateHandler {
    constructor(SettingsHandler, state, setter) {
        this.SettingsHandler = SettingsHandler;
        this.state = state;
        this.setterFunction = setter;
    }
    set(newValue) {
        this.setter(newValue);
        this.SettingsHandler.set(newValue);
    }
    get() {
        return (this.state)
    }
}

export class RefHandler {
    constructor(SettingsHandler, ref) {
        this.SettingsHandler = SettingsHandler;
        this.ref = ref;
    }
    set(newValue) {
        this.ref.current = newValue;
        this.SettingsHandler.set(newValue);
    }
    get() {
        return (this.ref.current)
    }
    push(value) {
        try {
            this.ref.current.push(value);
        } catch {
            throw new Error("ref.current Incompatible with push!");
        }
        try {
            this.SettingsHandler.set(this.ref.current)
        }
        catch {
            throw new Error("Error while handler was setting");
        }
    }

}
