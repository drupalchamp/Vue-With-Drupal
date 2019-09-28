<template>
  <div v-if="loading">Loading...</div>
  <div class="main-content" v-else>
    <div class="container midcontent">
      <div class="row">
        <div id="midcontent_area" class="column content">
          <div id="content">
            <a id="main-content"></a>
            <div
              class="currency view view-currency-listing view-id-currency_listing"
            >
              <table className="table table-hover table-striped" width="100%">
                <thead>
                  <tr>
                    <th className="views-field views-field-counter">#</th>
                    <th className="views-field views-field-nothing">Name</th>
                    <th className="views-field views-field-field-last">
                      Price
                    </th>
                    <th className="views-field views-field-field-market-cap">
                      Market Cap
                    </th>
                    <th className="views-field views-field-field-volume">
                      Volume(24h)
                    </th>
                    <th className="views-field views-field-field-high">High</th>
                    <th className="views-field views-field-field-low">Low</th>
                    <th
                      className="views-field views-field-field-change-24h-pct"
                    >
                      Change (24h)
                    </th>
                    <th className="chart views-field views-field-nothing-1">
                      Chart
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" v-bind:key="index">
                    <td className="views-field views-field-counter">
                      {{ index + 1 }}
                    </td>
                    <td
                      className="views-field views-field-nothing"
                      v-html="item.nothing"
                    ></td>
                    <td
                      className="views-field views-field-field-last"
                      v-html="item.field_last"
                    ></td>
                    <td
                      className="views-field views-field-field-market-cap"
                      v-html="item.field_market_cap"
                    ></td>
                    <td
                      className="views-field views-field-field-volume"
                      v-html="item.field_volume"
                    ></td>
                    <td
                      className="views-field views-field-field-high"
                      v-html="item.field_high"
                    ></td>
                    <td
                      className="views-field views-field-field-low"
                      v-html="item.field_low"
                    ></td>
                    <td
                      className="views-field views-field-field-change-24h-pct"
                      v-html="item.field_change_24h_pct"
                    ></td>
                    <td
                      className="chart views-field views-field-nothing-1"
                      v-if="stockOptions[index]"
                    >
                      <div id="chart" :symbol="item.field_symbol"></div>
                      <highcharts
                        :class="'stock'"
                        :constructor-type="'stockChart'"
                        :options="stockOptions[index]"
                      ></highcharts>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="more-link form-group">
                <a href="/coins/list">View All Coins</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import socket from '../assets/js/socket.io.js';
import $ from 'jquery';
//import VueSocketIO from 'vue-socket.io';
// import VueSocketIOExt from 'vue-socket.io-extended';
// import io from 'socket.io-client';
//import cccStreamerUtilities from '../assets/js/ccc-streamer-utilities.js';
//import currencyListStream from '../assets/js/currency_list_stream.js';
import { config } from '../config.js';
import axios from 'axios';

export default {
  name: 'PageFront',
  data() {
    return {
      loading: true,
      drupalUrl: config.drupalURL,
      items: [],
      chart: null,
      stockOptions: []
    };
  },
  mounted() {
    var $this = this;
    axios
      .get('http://cryptocurrentsvue.dd:8083/api/coin-list?_format=json')
      .then(response => {
        console.log('Coin List Response', response.data);
        this.items = response.data;

        for (var i = 0; i < $this.items.length; i++) {
          const tsym = 'USD';
          const fsym = $this.items[i].field_symbol;

          /*// Subscribe websocket & update currency data...
          var subscription = [];
          if (fsym) {
            subscription.push('5~CCCAGG~' + fsym + '~USD');
            subscription.push('11~' + fsym);
          }

          var socket = VueSocketIO.connect(
            'https://streamer.cryptocompare.com/'
          );
          socket.emit('SubAdd', { subs: subscription });
          socket.on('m', function(message) {
            var messageType = message.substring(0, message.indexOf('~'));
            if (messageType == CCC.STATIC.TYPE.CURRENTAGG) {
              dataUnpack(message);
            } else if (messageType == CCC.STATIC.TYPE.FULLVOLUME) {
              decorateWithFullVolume(message);
            }
          });*/

          axios
            .get(
              'https://min-api.cryptocompare.com/data/histoday?fsym=' +
                fsym +
                '&tsym=' +
                tsym +
                '&limit=50&api_key=' +
                config.CRYPTOCOMPARE_API_KEY
            )
            .then(response => {
              // console.log('Currency Price Response', response.data);

              var seriesOptions = [];
              var close = [];
              var color = '#f5f5f5';
              var green = '#3d9400';
              var red = '#A11B0A';
              var oldVal = 0;
              var result = response.data;
              $.each(result.Data, function(kt, vt) {
                if (oldVal < vt['close']) {
                  color = green;
                } else if (oldVal > vt['close']) {
                  color = red;
                }
                oldVal = vt['close'];
                var time = Number(vt['time']);
                var value = Number(vt['close']);
                close[kt] = {
                  date: time,
                  y: value,
                  segmentColor: color
                };
              });
              $.each(close, function(key, value) {
                seriesOptions[0] = {
                  // type: 'coloredline',
                  name: 'Price',
                  data: close,
                  visible: true
                };
              });

              $this.stockOptions.push({
                chart: {
                  width: 175,
                  height: 36,
                  spacing: [0, 0, 0, 0],
                  margin: [0, 0, 0, 0]
                },
                title: {
                  text: null
                },
                legend: { enabled: false },
                credits: { enabled: false },
                scrollbar: { enabled: false },
                navigator: { enabled: false },
                exporting: { enabled: false },
                rangeSelector: { enabled: false },
                yAxis: {
                  labels: {
                    formatter: function() {}
                  },
                  plotLines: [
                    {
                      value: 0,
                      width: 0,
                      color: 'silver'
                    }
                  ]
                },
                xAxis: {
                  lineWidth: 0,
                  minorGridLineWidth: 0,
                  lineColor: 'transparent',
                  gridLineColor: 'transparent',
                  labels: {
                    enabled: false
                  },
                  minorTickLength: 0,
                  tickLength: 0,
                  visible: false,
                  plotLines: [
                    {
                      value: 0,
                      width: 0,
                      color: 'silver'
                    }
                  ]
                },
                plotOptions: {
                  series: {
                    lineWidth: 1
                  }
                },
                series: seriesOptions
              });
            })
            .catch(error => {
              console.log(error);
            });
        }
      })
      .catch(error => {
        console.log(error);
      });

    // When all execution done set loading false
    this.loading = false;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
@import '../assets/css/style.css';
@import '../assets/css/themes.css';
@import '../assets/css/responsive.css';
a {
  color: white;
}
.price-display {
  font-weight: bold;
  text-align: center;
}
span {
  color: #121212;
  font-size: 14px;
}
.views-field-field-last span {
  background: #f5f5f5;
  border: 1px solid #eee;
  text-align: center;
  white-space: nowrap;
}
.view-currency-listing span {
  padding: 2px 12px;
}
.view-currency-listing span.up {
  color: #fff;
  background: #3d9400;
}
.view-currency-listing span.down {
  color: #fff;
  background: #a11b0a;
}
.SUPPLY.up,
.MKCAP.up,
.pct-up {
  font-size: 12px;
  color: #096b23;
  padding-left: 2%;
  font-weight: bold;
}
.SUPPLY.down,
.MKCAP.down,
.pct-down {
  font-size: 12px;
  color: #f00;
  padding-left: 2%;
  font-weight: bold;
}
</style>
