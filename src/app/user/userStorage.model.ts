import { StorageElement } from "./storageElement.model";

export interface UserStorage {
    id : number;
    used_space: number;
    storage_elements: StorageElement[];
}