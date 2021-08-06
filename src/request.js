const https = require('https');
const fs = require('fs');
const Stream = require('stream');

const contract_request = (filename, options) => {
    return new Promise((resolve, reject) => {
        if (filename && options) {
            var writeableStream = fs.createWriteStream(filename);
        } else reject('Usage: contract_request(filename, request_options)');

        const readableStream = new Stream.Readable({
            read() {}
          })

        readableStream.pipe(writeableStream);
    
        const req = https.get(options, (res) => {
                let data = ""

                console.log(`statusCode: ${res.statusCode}`)
                
                res.on('data', chunk => {
                    data += chunk.toString();
                })

                res.on('close', () =>{
                    try {
                        data_json = JSON.parse(data);
                        console.log('Contract data:', data_json.result)
                        readableStream.push(JSON.stringify(data_json.result));
                    } catch(e) {
                        reject(e); 
                    }
                    writeableStream.close();
                })

                res.on('error', (error) => reject(error) );

            })

        
        req.on('error', error => {
            reject(error);
        })
        
        req.on('close', () => {
            resolve('Success')
        })
    })

}

exports.contract_request = contract_request;