# Descrition
Simple HTTP request parser. 

# Usage
### Raw request
```javascript
const HttpParser = require("parser")

const request = `POST /about HTTP/1.0\n\rHost: test.com\r\nAccept: text/html, application/xhtml+xml, application/xml;\n\r"Accept-Language: en-US,en;q=0.5\r\n\n\r<h1>hello world</h1>`

HttpParser.parseRawRequest(request) 
```

Returns an object with properties: requestLine (1st line), headers and body.  

### Request line
```javascript
const HttpParser = require("parser")

HttpParser.parseRequestLine("GET /about HTTP/1.0")
```

### Headers 
```javascript
const HttpParser = require("parser")

HttpParser.parseHeaders(["Host: test.com", "Accept: text/html, application/xhtml+xml, application/xml;", "Accept-Language: en-US,en;q=0.5"])
```

Returns an object with key/value pairs.  

# Implementation
- Handles RCLF and LF characters
- Inline  header values
- Method type validation function
- HTTP version validation function

## Supported methods
- GET
- HEAD
- POST
- PUT
- DELETE

## Http versions
- HTTP/1.0
- HTTP/1.1
- HTTP/2.0
- HTTP/3.0


# Further implementation
- multi-line header values
- query strings parser
- body (JSON)

# Notes
This codebase for leaning purposes only. 

Feel free to report any error detected :)

# References
https://stackoverflow.com/questions/72026266/how-to-parse-http-messages
