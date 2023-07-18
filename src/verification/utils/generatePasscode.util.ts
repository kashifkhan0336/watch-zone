import { randomBytes } from 'crypto';

export async function generatePasscode(): Promise<string> {
    const randomBuffer = randomBytes(3);
    const passcode = parseInt(randomBuffer.toString('hex'), 16).toString().substr(0, 6);
    return passcode;
}
