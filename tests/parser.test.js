const Parser = require("../src/parser")

describe("parser", () => {
    const parser = new Parser()

    test("parse raw request", () => {
        const requestLine = "GET /en-US/docs/Glossary/Simple_header HTTP/1.1\n\r"
        const headers = "Host: developer.mozilla.org\n\rUser-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0\n\rAccept: text/html, application/xhtml+xml, application/xml;\n\rAccept-Language: en-US,en;q=0.5\n\rReferer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header\n\r"
        const body = "\n\r<h1>Hello World</h1>"
    
        const request = requestLine + headers + body

        const result = parser.parseRawRequest(request)

        expect(result.requestLine).toEqual("GET /en-US/docs/Glossary/Simple_header HTTP/1.1")
        expect(result.headers).toEqual(["Host: developer.mozilla.org", "User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0", "Accept: text/html, application/xhtml+xml, application/xml;", "Accept-Language: en-US,en;q=0.5", "Referer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header"])
        expect(result.body).toEqual(["<h1>Hello World</h1>"])
    })

    test("parse requestLine", () => {
        const requestLine = "   GET   /en-US/docs/Glossary/Simple_header    HTTP/1.1   \r   "          
        const parser = new Parser()

        const result = parser.parseRequestLine(requestLine)

        expect(result.method).toBe("GET")
        expect(result.path).toBe("/en-US/docs/Glossary/Simple_header")
        expect(result.httpVersion).toBe("HTTP/1.1")
    })

    test("parse headers", () => {
        const headers = ["   Host:   developer.mozilla.org", "  User-Agent:   Mozilla/5.0   (Macintosh;    Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0", "Accept: text/html, application/xhtml+xml, application/xml;", "Accept-Language: en-US,en;q=0.5", "Referer: https://developer.mozilla.org/en-US/docs/Glossary/Simple_header"]

        const parser = new Parser()

        const hObj = parser.parseHeaders(headers)

        expect(hObj).toHaveProperty("Host")
        expect(hObj).toHaveProperty("User-Agent")
        expect(hObj).toHaveProperty("Accept")
        expect(hObj).toHaveProperty("Accept-Language")
        expect(hObj).toHaveProperty("Referer")
    })
})
