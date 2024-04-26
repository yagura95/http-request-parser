class Parser {
    constructor() {}
}

/*
 * @description Parse raw request into 3 main components: request line, headers, body
 */
function parseRawRequest(request) {
    // handle CRLF and LF characters (meaning \r\n and \n)
    const lines = request.split("\n").map(line => line.replaceAll("\r", ""))

    const bodyStart = lines.findIndex(line => line.trim() === "")

    if(bodyStart === -1) {
        return {
            requestLine: lines[0],
            headers: lines.slice(1), 
            body: [] 
        }
    }

    return {
        requestLine: lines[0],
        headers: lines.slice(1, bodyStart), 
        body: lines.slice(bodyStart + 1)
    }
}

/*
 * First line has 3 parts: 
 *     - method
 *     - resource requested local path
 *     - HTTP version
 */
function parseRequestLine (line) {
    const params = line.split(" ").filter(word => word !== "")

    return {
        method: params[0],
        path: params[1],
        httpVersion: params[2]
    }
}

function parseHeaders(headers) {
    const parsedHeaders = {}

    const hArr = headers

    hArr.forEach((header) => {
        const h = header.split(" ").filter(word => word !== "").join(" ").split(":")        
        const key = h[0]
        const value = h[1]

        parsedHeaders[key] = value
    })

    return parsedHeaders
}

Parser.prototype.parseRawRequest = parseRawRequest
Parser.prototype.parseRequestLine = parseRequestLine
Parser.prototype.parseHeaders = parseHeaders

module.exports = Parser
