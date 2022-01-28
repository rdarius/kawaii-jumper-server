import { Position } from "./position";

export class Player {

    private id: string = '';
    private position = new Position();
    private name: string = '';
    private movingVelocity = new Position();

    constructor(socketId: string) {
        this.id = socketId;
        this.position.x = Math.floor(Math.random() * 500);
        this.position.y = 50;
    }

    getId(): string {
        return this.id;
    }

    getPosition(): Position {
        return this.position;
    }

    getName(): string {
        return this.name;
    }

    getMovingVelocity(): Position {
        return this.movingVelocity;
    }

    setPosition(x: number, y: number) {
        this.position.x = x;
        this.position.y = y;
    }

    setName(name: string) {
        // TODO: add checks for name length and banned words
        this.name = name;
    }

    setMovingVelocity(x: number, y: number) {
        this.movingVelocity.x = x;
        this.movingVelocity.y = y;
    }

}