import Vue from 'vue';
import Router from 'vue-router';
import PageFront from '@/components/PageFront';
import Highcharts from 'highcharts';
import mapInit from 'highcharts/modules/map';
import stockInit from 'highcharts/modules/stock';
import highchartsMore from 'highcharts/highcharts-more';
import HighchartsVue from 'highcharts-vue';

mapInit(Highcharts);
highchartsMore(Highcharts);
stockInit(Highcharts);

// Vue.use(Router);
Vue.use(HighchartsVue);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'PageFront',
      component: PageFront
    }
  ]
});
