import { expect } from "chai"
import sinon from "sinon"
import { User, UserId, UserName } from "../../domain/user"
import { SlackDriver, UserListResult } from "../../driver/slack-driver"
import { UserGateway } from "../../gateway/user-gateway"

describe('PostGateway.replyのテスト', () => {
    it('driverのreplyを呼びpostIdを返す', async () => {
        const driver = new SlackDriver('')
        const mock = sinon.mock(driver)
        const userGateway = new UserGateway(driver)
        const name = 'test.taro'
        const id = 'taro001'
        const res: UserListResult = { members: [{ name: name, id: id }], ok: true }

        mock.expects('getUsers').once().withArgs().returns(res)
        const result = await userGateway.get(new UserName(name))
        expect(result).to.deep.equal(new User(new UserId(id), new UserName(name)))
        mock.verify()
    })
})
