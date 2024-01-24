
import * as hashing from 'js-sha512'
import { customAlphabet } from 'nanoid'



export const generateRandomString = async (strength: number) => {
	const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRESTUVWXYZ', strength);
	return nanoid().toUpperCase();
}

export const encryptionHashing = async (data: any) => {
	return hashing.sha512(data);
}
