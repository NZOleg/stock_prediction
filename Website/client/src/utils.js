import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

export function parseData(parse) {
    return function(d) {
        d.date = parse(d.date);
        d.open = +d.open;
        d.high = +d.high;
        d.low = +d.low;
        d.close = +d.close;
        d.volume = +d.volume;

        return d;
    };
}

const parseDate = timeParse("%Y-%m-%d");

export function getData(stock, prediction) {
    const promiseMSFT = fetch("/data/"+stock+"/"+prediction+".csv")
        .then(response => response.text())
        .then(data => tsvParse(data, parseData(parseDate)))
    fetch('/api/'+this.state.stock+'/'+this.state.prediction)
        .then(res => res.json())
        .then(data => this.setState({ data }));
    return parseData();
}