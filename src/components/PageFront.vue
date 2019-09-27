<template>
  <div class="main-content">
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
                    ></td>
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
// import socket from '../assets/js/socket.io.js';
// import $ from 'jquery';
// import VueSocketIO from 'vue-socket.io';
// import ccc_streamer_utilities from '../assets/js/ccc-streamer-utilities.js';
// import currency_list_stream from '../assets/js/currency_list_stream.js';
import { config } from '../config.js';
import axios from 'axios';
// import price_graph from '../assets/js/price_graph.js';
// var Highcharts = require('highcharts');
export default {
  name: 'PageFront',
  data() {
    return {
      items: [],
      drupalUrl: config.drupalURL,
      loading: true
    };
  },
  mounted() {
    axios
      .get('http://cryptocurrentsvue.dd:8083/api/coin-list?_format=json')
      .then(response => {
        console.log(response.data);
        this.items = response.data;
        this.loading = false;
      })
      .catch(error => {
        console.log(error);
      });
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
