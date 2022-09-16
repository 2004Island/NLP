import { queueData } from "../src/client/js/app";

describe('check queuedata is in system', function () {
    test("return true", () => {
        expect(queueData).toBeDefined();
    })
})