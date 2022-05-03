/**
 * The backend is responsible for extending this class and registering it
 * somewhere...
 */
export abstract class RockPaperScissorsChannel {
	private socket: net.Socket;

	constuctor() {
		this.socket = new net.Socket();
		// ...
	}

	private _initialize = async (body: binary): Promise<binary> => {
		// this doesn't allow for decoding diffs (since that is stateful).
		// Maybe this class has a stateful UserStateInfo.Decoder?
		const decodedBody = UserStateInfo.decode(body);
		const decodedResponse = await this.initialize(decodedBody);
		const encodedResponse = UserStateInfo.encode(decodedResponse);
		return encodedResponse;
	};
	public abstract initialize: (body: UserStateInfo) => Promise<UserStateUpdate>;

	// these will similarly have wrapper ser-de wrapper methods
	public abstract joinGame: (body: UserStateInfo) => Promise<UserStateUpdate>;
	public abstract chooseGesture: (
		body: ChooseGestureBody
	) => Promise<UserStateUpdate>;
	public abstract nextRound: (body: UserStateInfo) => Promise<UserStateUpdate>;
}

export type UserId = string;
export type StateId = string;

export enum Gesture {
	ROCK,
	PAPER,
	SCISSORS,
}

export interface PlayerInfo {
	id: UserId;
	score: number;
	gesture: Gesture | null | undefined;
}

export interface PlayerState {
	round: number;
	player1: PlayerInfo | null | undefined;
	player2: PlayerInfo | null | undefined;
}

export type UserState = PlayerState;

export interface UserStateInfo {
	stateId: StateId;
	userId: UserId;
}

export interface UserStateUpdate extends PlayerState {
	stateId: StateId;
	userId: UserId;
}

export interface ChooseGestureBody extends UserStateInfo {
	gesture: Gesture;
}

// ignore me
type binary = string;
