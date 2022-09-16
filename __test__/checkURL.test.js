import { checkURL } from "../src/client/js/checkURL";

describe('testing checkurl for real urls', function () {
    test("it should filter by a search term (link)", () => {
        const input = 'https://google.com'
        const output = true
        expect(checkURL(input)).toEqual(output);
    })
})

describe('testing checkurl for broken urls', function () {
    test("it should filter by a search term (link)", () => {
        const input = 'not_a_url'
        const output = false
        expect(checkURL(input)).toEqual(output);
    })
})