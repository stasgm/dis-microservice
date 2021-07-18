import {ABlobLink} from "../ABlobLink";

export class BlobLink extends ABlobLink {

    /** Gets the blob's id. */
    public readonly id = new Uint8Array(8);

    constructor(id: Uint8Array) {
        super();
        this.id.set(id);
    }
}
