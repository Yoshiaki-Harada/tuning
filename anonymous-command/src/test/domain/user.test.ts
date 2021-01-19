import { expect } from "chai"
import { getUserNames, UserName } from "../../domain/user"

describe('文字列をパースしてEmojiを作成する', () => {
    it('メンションがついている場合ユーザの名前のリストを返す', () => {
        const originalText = 'test @test.taro @yamada.test'
        const users: UserName[] = getUserNames(originalText)
        expect(users).to.be.deep.eq([new UserName('test.taro'), new UserName('yamada.test')])
    }),
    it('メンションがついていない場合空リストを返す', () => {
        const originalText = 'test'
        const users: UserName[] = getUserNames(originalText)
        expect(getUserNames(originalText)).to.be.deep.eq([])
    })
})