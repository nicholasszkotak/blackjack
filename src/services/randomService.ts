export interface IRandomService { 
    
    /**
     * Returns a random number.
     */
    random() : number;
}

export class RandomService implements IRandomService {

    random(): number {
        return Math.random();
    }
}
