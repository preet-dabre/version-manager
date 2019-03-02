const cheerio = require('cheerio');
const fetch = require('node-fetch');
const {Package} = require('./models/package');

function getUrl(packageName) {
    const tempUrl = `https://raw.githubusercontent.com/`;
    const jsonPath = `/master/package.json`;
    let url = `https://raw.githubusercontent.com/${packageName}js/${packageName}/master/package.json`;
    return Package.findOne({name: packageName})
        .then((package) => {
            const partUrl = package.url.match('https://github.com/(.*)')[1];
            return tempUrl + partUrl + jsonPath;
        })
        .catch((err) => {
            return 'cannot find';
        });
}

async function getPackageDetails(packageName) {
    const fetchedUrl = await getUrl(packageName);
    if(fetchedUrl === 'cannot find') {
        // console.log(typeof `abc${fetchedUrl}`);
        return Promise.resolve({text: 'cannot find package'});
    }
    return fetch(fetchedUrl)
        .then(response => response.json())
        .then(body => {
            return {
                version: body.version
            };
        });
}



module.exports = {
    getPackageDetails
};
