require('dotenv').config();
const https = require('https');

const getClient = (id) => {
    if(!id) {
        https.get(createUrl(id), (resp) => {
            let data = '';
            
            //response non entiere
            resp.on('data', (chunk) => {
                data += chunk;
            })

            //response entiere
            resp.on('end', () => {
                console.log(JSON.parse(data));
            })

            return data;
        }).on('error', (err) => {
            throw new Error();
        })
    } 
}

const createUrl = (id) => {
    if(!id) {
        return `${process.env.URL_MUTUALISEE}/clients/${id}`;
    }
}
