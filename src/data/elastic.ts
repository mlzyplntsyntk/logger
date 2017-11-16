import {data} from '../util/data';
var elasticsearch = require('elasticsearch');

export class elastic extends data {
    client:any;    

    configure() {
        this.client = new elasticsearch.Client({
            host: 'localhost:9200',
            log: 'trace'
        });
        this.client.ping({
            requestTimeout: 1000
          }, function (error) {
            if (error) 
              console.trace('elasticsearch cluster is down!');
          });
    }

}