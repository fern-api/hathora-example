import { ChooseGestureBody, RockPaperScissorsChannel, UserStateInfo } from "../generated-by-fern/RockPaperScissorsChannel";

export class Wrapper extends RockPaperScissorsChannel {
	public async initialize = (body: UserStateInfo): Promise<UserStateUpdate> {
		this.getResult(body.userId, ...);
	}
	public async joinGame = (body: UserStateInfo): Promise<UserStateUpdate> {
		this.getResult(body.userId, ...);
	}
	public async chooseGesture = (body: ChooseGestureBody): Promise<UserStateUpdate> {
		this.getResult(body.userId, ...);
	}
	public async nextRound = (body: UserStateInfo): Promise<UserStateUpdate> {
		this.getResult(body.userId, ...);
	}

	private async getResult() {
		// call into BE dev's Impl and get the result
	}
}