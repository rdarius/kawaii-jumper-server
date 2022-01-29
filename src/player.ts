import { Position } from "./position";

const playerSize: Position = {
	x: 50,
	y: 34,
};

export class Player {

    private id: string = '';
    private position = new Position();
    private name: string = 'Player#' + Math.floor(Math.random()*8000)+1000;
    private movingVelocity = new Position();
    private color = 0;
    private direction = 0;
    private grounded = true;

    constructor(socketId: string) {
        this.id = socketId;
        this.position.x = Math.floor(Math.random() * 1080 - playerSize.x);
        this.position.y = 1920 - playerSize.y;
        this.color = Math.floor(Math.random() * 2);
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

    isGrounded(): boolean {
        return this.grounded;
    }

    setGrounded(grounded: boolean): void {
        this.grounded = grounded;
    }

    setColor(color: number) {
        this.color = color;
    }

    setDirection(direction: number) {
        this.direction = direction;
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