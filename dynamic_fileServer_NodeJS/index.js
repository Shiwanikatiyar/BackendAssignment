const http = require('http');
const fs = require('fs');

const app = http.createServer((req, res) => {
    // part 1

    if (req.url == "/") {
        let data = fs.readdirSync("./", 'utf-8')
        console.log(data)
        // res.end("This is home page");

        res.writeHead(200, {
            'Content-Type': 'text/html'
        })
        data.forEach((el, i) => {
            res.write(`<a href=${el}> <li> ${el} </li>  </a>`)
        })

        res.end()
    }
    // part 2
    else if (req.url != "/favicon.ico") {
        let path = fs.existsSync(`.${req.url}`)
        // console.log(path)
        if (path == true) {
            let check = fs.statSync(`.${req.url}`).isDirectory()
            // console.log('req.url in else if', req.url)

            if (check == false) {
                let data = fs.readFileSync(`.${req.url}`, 'utf-8')
                res.end(data)
            } else if (check == true) {
                let data = fs.readdirSync(`.${req.url}`, 'utf-8')
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                })
                data.forEach((el, i) => {
                    (fs.statSync(`.${req.url}`).isDirectory())
                    res.write(`<a href= ${req.url}/${el}> <li>${el}</li> </a>`)

                })


            }
        }
        else {
            res.end("Not a valid path")
        }
        res.end()
    }

})

app.listen(8181);