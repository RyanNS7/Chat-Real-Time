import { Unique_ID } from "../../../external/cryptography/unique_id"

describe("unique ID", () => {

    it("should be create unic id", () => {

        const sut = Unique_ID.creationUniqueID()

        expect(sut.body.status).toBeTruthy()

    })

})