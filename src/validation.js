const url = require("url")
const httpMethods = require("./http-methods")
const httpVersions = require("./http-versions")


function validateHttpVersion(version) {
    for(let validVersion in httpVersions) {
        if(version === httpVersions[validVersion]) return
    }

    throw new Error(`Invalid HTTP version: ${version}`)
}

function validateUrlPath(path) {
    url.parse(path)
}

function validateHttpMethod(method) {
    for(let validMethod in httpMethods) {
        if(method === httpMethods[validMethod]) return
    }

    throw new Error(`Invalid HTTP method: ${method}`)
}

module.exports = {
    validateHttpVersion, 
    validateUrlPath,
    validateHttpMethod
}
