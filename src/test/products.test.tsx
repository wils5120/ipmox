import { LocalStorageType } from '../models';
import {describe, expect, test} from '@jest/globals';



const setLocalStorage = (id: string, data: any) => {
    window.localStorage.setItem(id, JSON.stringify(data));
};


describe('test storage', () => {

    it("data is added into local storage", () => {
        const mockJson = { data: "json data" };
        setLocalStorage(LocalStorageType.Product, mockJson);
        expect(localStorage.getItem(LocalStorageType.Product)).toEqual(JSON.stringify(mockJson));
      });
})