const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
var csv = require('csv-parser')
var PythonShell = require('python-shell');
var fs = require('fs')
const app = express();


var CronJob = require('cron').CronJob;
var job = new CronJob({
        cronTime: '00 30 11 * * 1-5',
        onTick: function() {
            PythonShell.run('update_stocks.py', function (err) {
                if (err) throw err;
                console.log('updating is done');
            });
        },
    start: false,
    timeZone: 'America/Los_Angeles'
});
job.start();


// Serve static files from the React app
//app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'

app.get('/api/:stock/:days', (req,res)=>{
    let stockInfo = [];
    console.log('data/'+req.params.stock+'-'+req.params.days+'.csv');
    fs.createReadStream('data/'+req.params.stock+'-'+req.params.days+'.csv')
        .pipe(csv())
        .on('data', function (data) {

            stockInfo.push(data)
        })
        .on('end', function () {
            console.log();
            res.json(stockInfo);
        })
        .on('error', e =>{
            console.log(e);
        });

});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname+'/client/build/index.html'));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);