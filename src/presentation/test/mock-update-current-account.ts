import { AccountModel } from "@/domain/models"

export class UpdateCurrentAccountMock {
    account: AccountModel
    async save(account: AccountModel): Promise<void> {
        // this.account = account
    }
}
