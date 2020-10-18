import { StorageElement } from "./storageElement.model";

export interface UserStorage {
    used_space: number;
    storage_elements: StorageElement[];
}