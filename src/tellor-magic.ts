import {RewardClaimed, Staked as StakedEvent, WithdrawRequested, Withdrawed} from "../generated/TellorMagic/TellorMagic"
import {User} from "../generated/schema";
import { EIGHTEEN_BD, ZERO_BD, ZERO_BI } from "./constants";

export function handleStake(event: StakedEvent): void {
    let user = User.load(event.params.user.toHex());
    if (user == null) {
      user = new User(event.params.user.toHex());
      user.address = event.params.user;
      user.totalStakedAmount = ZERO_BD;
      user.lockedAmount = ZERO_BD;
      user.availableRewards = ZERO_BD;
      user.totalRewards = ZERO_BD;
      user.lockedTimestamp = ZERO_BI;
    }

    user.totalStakedAmount = user.totalStakedAmount.plus(event.params.amount.divDecimal(EIGHTEEN_BD));
    
    user.save();
}

export function handleWithdrawRequest(event: WithdrawRequested): void {
    let user = User.load(event.params.user.toHex());
    if (user == null) {
      user = new User(event.params.user.toHex());
      user.address = event.params.user;
      user.totalStakedAmount = ZERO_BD;
      user.lockedAmount = ZERO_BD;
      user.availableRewards = ZERO_BD;
      user.totalRewards = ZERO_BD;
      user.lockedTimestamp = ZERO_BI;
    }

    user.lockedAmount = user.lockedAmount.plus(event.params.amount.divDecimal(EIGHTEEN_BD));
    user.lockedTimestamp = event.block.timestamp;
    user.totalStakedAmount = user.totalStakedAmount.minus(event.params.amount.divDecimal(EIGHTEEN_BD));

    user.save();
}

export function handleWithdraw(event: Withdrawed): void {
    let user = User.load(event.params.user.toHex());
    if (user == null) {
      user = new User(event.params.user.toHex());
      user.address = event.params.user;
      user.totalStakedAmount = ZERO_BD;
      user.lockedAmount = ZERO_BD;
      user.availableRewards = ZERO_BD;
      user.totalRewards = ZERO_BD;
      user.lockedTimestamp = ZERO_BI;
    }

    user.lockedAmount = ZERO_BD;
    user.lockedTimestamp = ZERO_BI;

    user.save();
}

export function handleClaimReward(event: RewardClaimed): void {
    let user = User.load(event.params.user.toHex());
    if (user == null) {
      user = new User(event.params.user.toHex());
      user.address = event.params.user;
      user.totalStakedAmount = ZERO_BD;
      user.lockedAmount = ZERO_BD;
      user.availableRewards = ZERO_BD;
      user.totalRewards = ZERO_BD;
      user.lockedTimestamp = ZERO_BI;
    }

    user.totalRewards = user.totalRewards.plus(event.params.amount.divDecimal(EIGHTEEN_BD));

    user.save();
}