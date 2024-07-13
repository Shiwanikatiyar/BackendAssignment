const fs = require("fs")


fs.readFile("./tst.txt", "utf-8",(err,data) => {
    if(err){
        console.log("Cannot read the file")
        console.log(err)
    }
    else{
        console.log((data))
    }
})

// const data = fs.readFileSync('./test.txt', 'utf-8')

// console.log((data))