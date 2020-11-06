<template>
  <div class="baidumap">
    <button @click="changeDate">changeData</button>
    <baidu-map
      class="map"
      :center="{ lng: 116.404, lat: 39.915 }"
      :zoom="5"
      :scroll-wheel-zoom="true"
      :mapStyle="mapStyle"
      @ready="handler"
      ak="rpSv7RsGWmLUeBvOWyZrbu0a8nUohXEM"
    />
  </div>
</template>
<script>
import { BaiduMap, BmScale, BmGeolocation } from "vue-baidu-map";
/* 
center 中心点
zoom 缩放等级
center 设置中心点坐标
scroll-wheel-zoom 允许滚轮缩放
*/
export default {
  name: "baidumap",
  components: {
    BaiduMap
  },
  data() {
    return {
      BMap: null,
      map: null,
      dataSet: null,
      mapvLayer: null,
      interfaceData: [
        { lng: 116.92327630569085, lat: 31.701708606130868, fillStyle: "red" },
        { lng: 115.97697284641086, lat: 29.56170947518192, fillStyle: "yellow" }
      ],
      mapStyle: {
        styleJson: [
          {
            featureType: "water",
            elementType: "all",
            stylers: {
              color: "#044161"
            }
          },
          {
            featureType: "land",
            elementType: "all",
            stylers: {
              color: "#091934"
            }
          },
          {
            featureType: "boundary",
            elementType: "geometry",
            stylers: {
              color: "#064f85"
            }
          },
          {
            featureType: "railway",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highway",
            elementType: "geometry.fill",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "highway",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry",
            stylers: {
              color: "#004981",
              lightness: -39
            }
          },
          {
            featureType: "arterial",
            elementType: "geometry.fill",
            stylers: {
              color: "#00508b"
            }
          },
          {
            featureType: "poi",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "green",
            elementType: "all",
            stylers: {
              color: "#056197",
              visibility: "off"
            }
          },
          {
            featureType: "subway",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "manmade",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "local",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "arterial",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "boundary",
            elementType: "geometry.fill",
            stylers: {
              color: "#029fd4"
            }
          },
          {
            featureType: "building",
            elementType: "all",
            stylers: {
              color: "#1a5787"
            }
          },
          {
            featureType: "label",
            elementType: "all",
            stylers: {
              visibility: "off"
            }
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: {
              color: "#ffffff"
            }
          },
          {
            featureType: "poi",
            elementType: "labels.text.stroke",
            stylers: {
              color: "#1e1c1c"
            }
          },
          {
            featureType: "administrative",
            elementType: "labels",
            stylers: {
              visibility: "on"
            }
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: {
              visibility: "off"
            }
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    handler({ BMap, map }) {
      this.BMap = BMap;
      this.map = map;
      this.drawBoundary(BMap, map);
      this.drawPoint(BMap, map);
    },
    changeDate() {
      let mapv = require("mapv");
      this.interfaceData = [
        {
          lng: 116.92327630569085,
          lat: 31.701708606130868,
          fillStyle: "green"
        }
      ];
      let data = this.splicingData(this.interfaceData);
      // 重置数据使用dataSet.set()
      this.dataSet.set(data);
    },
    /*画遮蔽层的相关方法
     *思路: 首先在中国地图最外画一圈，圈住理论上所有的中国领土，然后再将每个闭合区域合并进来，并全部连到西北角。
     *      这样就做出了一个经过多次西北角的闭合多边形*/
    //定义中国东南西北端点，作为第一层
    //向数组中添加一次闭合多边形，并将西北角再加一次作为之后画闭合区域的起点
    drawBoundary(BMap, map) {
      let pStart = new BMap.Point(180, 90);
      let pEnd = new BMap.Point(0, -90);
      let pArray = [
        new BMap.Point(pStart.lng, pStart.lat),
        new BMap.Point(pEnd.lng, pStart.lat),
        new BMap.Point(pEnd.lng, pEnd.lat),
        new BMap.Point(pStart.lng, pEnd.lat)
      ];
      let closedArea = [
        { lng: 135.077218, lat: 48.544352 },
        { lng: 134.92218, lat: 48.584352 },
        { lng: 134.827218, lat: 48.534352 },
        { lng: 134.727669, lat: 48.495377 },
        { lng: 134.304531, lat: 48.394091 },
        { lng: 133.513447, lat: 48.177476 },
        { lng: 132.832747, lat: 48.054205 },
        { lng: 132.519993, lat: 47.789172 },
        { lng: 131.765704, lat: 47.813962 },
        { lng: 131.103402, lat: 47.776772 },
        { lng: 130.919429, lat: 48.331824 },
        { lng: 130.77225, lat: 48.868729 },
        { lng: 129.907577, lat: 49.351849 },
        { lng: 128.73015, lat: 49.699156 },
        { lng: 127.791888, lat: 49.85404 },
        { lng: 127.791888, lat: 50.492084 },
        { lng: 126.927215, lat: 51.616759 },
        { lng: 126.467283, lat: 52.579818 },
        { lng: 125.952158, lat: 53.059077 },
        { lng: 124.701142, lat: 53.313247 },
        { lng: 123.56051, lat: 53.664362 },
        { lng: 121.555204, lat: 53.46722 },
        { lng: 120.340983, lat: 53.125528 },
        { lng: 119.95464, lat: 52.579818 },
        { lng: 120.616942, lat: 52.523746 },
        { lng: 120.506559, lat: 52.095236 },
        { lng: 119.862653, lat: 51.616759 },
        { lng: 119.365926, lat: 50.959196 },
        { lng: 119.089967, lat: 50.362806 },
        { lng: 119.108364, lat: 50.05583 },
        { lng: 118.133307, lat: 49.925357 },
        { lng: 117.471005, lat: 49.794528 },
        { lng: 116.808702, lat: 49.889712 },
        { lng: 116.385564, lat: 49.758785 },
        { lng: 115.962426, lat: 48.953617 },
        { lng: 115.520891, lat: 48.147476 },
        { lng: 115.796851, lat: 47.677465 },
        { lng: 116.27518, lat: 47.652609 },
        { lng: 117.103059, lat: 47.652609 },
        { lng: 118.004526, lat: 47.801568 },
        { lng: 118.887596, lat: 47.577968 },
        { lng: 119.402721, lat: 47.127871 },
        { lng: 119.402721, lat: 46.800397 },
        { lng: 118.464459, lat: 46.825659 },
        { lng: 117.103059, lat: 46.648575 },
        { lng: 115.980824, lat: 46.088213 },
        { lng: 115.226534, lat: 45.702829 },
        { lng: 114.159491, lat: 45.275796 },
        { lng: 112.761297, lat: 45.171782 },
        { lng: 111.639061, lat: 45.132727 },
        { lng: 111.436691, lat: 44.55683 },
        { lng: 111.51028, lat: 44.001703 },
        { lng: 110.682402, lat: 43.387647 },
        { lng: 108.897864, lat: 42.658724 },
        { lng: 106.892559, lat: 42.522781 },
        { lng: 103.82021, lat: 42.140555 },
        { lng: 102.422016, lat: 42.536389 },
        { lng: 101.336575, lat: 42.82146 },
        { lng: 99.478448, lat: 42.929712 },
        { lng: 97.601924, lat: 42.997272 },
        { lng: 96.019756, lat: 43.815487 },
        { lng: 92.72664, lat: 45.288784 },
        { lng: 91.144473, lat: 45.599605 },
        { lng: 91.457227, lat: 46.483616 },
        { lng: 90.794924, lat: 47.553064 },
        { lng: 89.562305, lat: 48.221295 },
        { lng: 88.2377, lat: 48.953617 },
        { lng: 87.722576, lat: 49.279683 },
        { lng: 87.097067, lat: 49.255604 },
        { lng: 86.60034, lat: 49.122957 },
        { lng: 86.177203, lat: 48.710696 },
        { lng: 85.533297, lat: 48.344091 },
        { lng: 85.404516, lat: 47.875888 },
        { lng: 85.349324, lat: 47.390897 },
        { lng: 84.926186, lat: 47.215692 },
        { lng: 83.233635, lat: 47.315881 },
        { lng: 82.865689, lat: 47.328391 },
        { lng: 82.258578, lat: 45.844449 },
        { lng: 82.368962, lat: 45.366651 },
        { lng: 82.093003, lat: 45.30177 },
        { lng: 80.989165, lat: 45.275796 },
        { lng: 79.903724, lat: 45.015402 },
        { lng: 80.326862, lat: 44.332772 },
        { lng: 80.510835, lat: 43.642047 },
        { lng: 80.621219, lat: 43.186043 },
        { lng: 80.27167, lat: 43.010775 },
        { lng: 79.885327, lat: 42.304653 },
        { lng: 79.259819, lat: 41.838593 },
        { lng: 78.487133, lat: 41.576647 },
        { lng: 77.916816, lat: 41.341363 },
        { lng: 77.272911, lat: 41.16086 },
        { lng: 76.739389, lat: 41.02167 },
        { lng: 76.26106, lat: 40.546202 },
        { lng: 75.672346, lat: 40.75639 },
        { lng: 74.881262, lat: 40.630357 },
        { lng: 74.255754, lat: 40.293095 },
        { lng: 73.777425, lat: 39.939968 },
        { lng: 73.74063, lat: 39.556517 },
        { lng: 73.53826, lat: 39.34256 },
        { lng: 73.685438, lat: 38.725549 },
        { lng: 74.034987, lat: 38.407771 },
        { lng: 74.458125, lat: 38.335352 },
        { lng: 74.734084, lat: 38.074036 },
        { lng: 74.844468, lat: 37.577865 },
        { lng: 74.678892, lat: 37.21089 },
        { lng: 74.6237, lat: 36.975076 },
        { lng: 75.414784, lat: 36.501232 },
        { lng: 75.801127, lat: 35.934721 },
        { lng: 76.518622, lat: 35.379154 },
        { lng: 77.309706, lat: 35.137703 },
        { lng: 77.972008, lat: 34.758986 },
        { lng: 78.376749, lat: 34.241106 },
        { lng: 78.523927, lat: 33.473647 },
        { lng: 78.7079, lat: 32.978834 },
        { lng: 78.450338, lat: 32.745921 },
        { lng: 78.30316, lat: 32.340745 },
        { lng: 78.431941, lat: 32.04349 },
        { lng: 78.671106, lat: 31.572152 },
        { lng: 78.855079, lat: 31.145879 },
        { lng: 79.425395, lat: 30.797108 },
        { lng: 80.087697, lat: 30.447053 },
        { lng: 81.301919, lat: 29.855455 },
        { lng: 81.90903, lat: 30.0157 },
        { lng: 82.7921, lat: 29.485907 },
        { lng: 84.539843, lat: 28.661613 },
        { lng: 85.71727, lat: 28.124721 },
        { lng: 86.821108, lat: 27.732537 },
        { lng: 87.998535, lat: 27.69979 },
        { lng: 88.568851, lat: 27.716165 },
        { lng: 88.863208, lat: 27.108656 },
        { lng: 89.580703, lat: 27.190949 },
        { lng: 89.654292, lat: 27.765274 },
        { lng: 90.923705, lat: 27.650651 },
        { lng: 91.751584, lat: 27.223849 },
        { lng: 92.04594, lat: 26.778874 },
        { lng: 92.965805, lat: 26.646689 },
        { lng: 93.830478, lat: 26.960375 },
        { lng: 94.860727, lat: 27.453873 },
        { lng: 96.185332, lat: 27.798001 },
        { lng: 97.123594, lat: 27.503101 },
        { lng: 97.620321, lat: 27.896122 },
        { lng: 97.675513, lat: 28.059457 },
        { lng: 98.080254, lat: 27.306056 },
        { lng: 98.595378, lat: 27.009824 },
        { lng: 98.393008, lat: 26.066566 },
        { lng: 97.804294, lat: 25.483523 },
        { lng: 97.528335, lat: 24.847254 },
        { lng: 97.417951, lat: 24.10637 },
        { lng: 97.804294, lat: 23.717348 },
        { lng: 98.595378, lat: 23.886634 },
        { lng: 98.834543, lat: 23.123105 },
        { lng: 99.239283, lat: 22.697005 },
        { lng: 99.165694, lat: 22.303805 },
        { lng: 99.386462, lat: 21.857966 },
        { lng: 100.251135, lat: 21.445169 },
        { lng: 100.839848, lat: 21.290063 },
        { lng: 101.704521, lat: 21.031186 },
        { lng: 102.05407, lat: 21.152053 },
        { lng: 101.998878, lat: 21.582901 },
        { lng: 101.962083, lat: 22.132497 },
        { lng: 102.587591, lat: 22.355156 },
        { lng: 103.599443, lat: 22.338041 },
        { lng: 104.482513, lat: 22.560368 },
        { lng: 105.383981, lat: 22.799392 },
        { lng: 106.083078, lat: 22.59454 },
        { lng: 106.469421, lat: 22.286683 },
        { lng: 106.874162, lat: 21.754879 },
        { lng: 107.315697, lat: 21.514051 },
        { lng: 107.812424, lat: 21.410715 },
        { lng: 107.775629, lat: 21.134792 },
        { lng: 106.929353, lat: 20.269201 },
        { lng: 106.175064, lat: 19.17158 },
        { lng: 106.377435, lat: 18.470789 },
        { lng: 107.297299, lat: 17.23746 },
        { lng: 109.008248, lat: 15.675143 },
        { lng: 109.688948, lat: 13.705222 },
        { lng: 109.652153, lat: 11.664031 },
        { lng: 108.750686, lat: 9.571001 },
        { lng: 108.198767, lat: 6.876803 },
        { lng: 108.493124, lat: 5.090099 },
        { lng: 109.817729, lat: 3.612656 },
        { lng: 111.10554, lat: 3.298351 },
        { lng: 114.71141, lat: 5.514272 },
        { lng: 116.256783, lat: 7.556636 },
        { lng: 118.758815, lat: 10.883133 },
        { lng: 119.531502, lat: 13.669242 },
        { lng: 119.494707, lat: 16.617614 },
        { lng: 120.414572, lat: 18.961654 },
        { lng: 121.51841, lat: 20.633358 },
        { lng: 122.751029, lat: 22.303805 },
        { lng: 123.247756, lat: 23.378111 },
        { lng: 124.811526, lat: 25.68375 },
        { lng: 126.577667, lat: 25.900278 },
        { lng: 127.479134, lat: 26.67975 },
        { lng: 128.454191, lat: 28.189945 },
        { lng: 128.766945, lat: 29.93561 },
        { lng: 128.73015, lat: 31.650877 },
        { lng: 127.957464, lat: 32.153119 },
        { lng: 127.221572, lat: 32.745921 },
        { lng: 127.019202, lat: 33.596907 },
        { lng: 125.988953, lat: 33.827543 },
        { lng: 125.731391, lat: 34.546135 },
        { lng: 125.878569, lat: 35.454458 },
        { lng: 125.731391, lat: 36.634799 },
        { lng: 125.80498, lat: 37.51927 },
        { lng: 124.425183, lat: 37.972159 },
        { lng: 124.498772, lat: 38.58128 },
        { lng: 125.013896, lat: 39.242487 },
        { lng: 124.590758, lat: 39.471014 },
        { lng: 124.296402, lat: 39.840762 },
        { lng: 124.388388, lat: 40.081441 },
        { lng: 124.940307, lat: 40.335346 },
        { lng: 125.731391, lat: 40.630357 },
        { lng: 126.448885, lat: 40.96591 },
        { lng: 126.798434, lat: 41.493704 },
        { lng: 127.111188, lat: 41.410654 },
        { lng: 127.883875, lat: 41.271998 },
        { lng: 128.490985, lat: 41.452192 },
        { lng: 128.307012, lat: 41.879854 },
        { lng: 128.950918, lat: 41.921089 },
        { lng: 129.484439, lat: 42.12686 },
        { lng: 129.999564, lat: 42.549994 },
        { lng: 130.073153, lat: 42.807915 },
        { lng: 130.404304, lat: 42.495557 },
        { lng: 130.77225, lat: 42.359256 },
        { lng: 130.698661, lat: 42.726583 },
        { lng: 131.195388, lat: 42.848541 },
        { lng: 131.360964, lat: 43.494895 },
        { lng: 131.342566, lat: 44.491021 },
        { lng: 131.820896, lat: 45.002351 },
        { lng: 132.998323, lat: 44.976239 },
        { lng: 133.623831, lat: 45.599605 },
        { lng: 134.102161, lat: 46.394582 },
        { lng: 134.37812, lat: 47.228226 },
        { lng: 134.874847, lat: 47.851127 },
        { lng: 134.985231, lat: 48.233588 },
        { lng: 135.13241, lat: 48.454352 },
        { lng: 135.077218, lat: 48.474352 }
      ];
      //循环添加各闭合区域
      closedArea.forEach(item => {
        pArray.push(new BMap.Point(item.lng, item.lat));
      });

      // 添加左侧遮蔽层
      let plyall = new BMap.Polygon(pArray, {
        strokeOpacity: 1,
        strokeColor: "#091934",
        strokeWeight: 1,
        fillColor: "#091934",
        fillOpacity: 1
      }); //建立多边形覆盖物
      map.addOverlay(plyall);

      // 添加右侧遮蔽层
      pStart = new BMap.Point(180, 90);
      pEnd = new BMap.Point(0, -90);
      pArray = [
        new BMap.Point(135.077218, 48.454352),
        new BMap.Point(pStart.lng, pStart.lat),
        new BMap.Point(pStart.lng, pEnd.lat),
        new BMap.Point(135.077218, 48.454352)
      ];
      let sanjiaoxing = new BMap.Polygon(pArray, {
        strokeOpacity: 1,
        strokeColor: "#091934",
        strokeWeight: 1,
        fillColor: "#091934",
        fillOpacity: 1
      }); //建立多边形覆盖物
      map.addOverlay(sanjiaoxing);
    },
    // 组装数据
    splicingData(sourceData) {
      let data = [];
      sourceData.forEach(item => {
        data.push({
          geometry: {
            type: "Point",
            coordinates: [item.lng, item.lat]
          },
          fillStyle: item.fillStyle // 标记点颜色
        });
      });
      return data;
    },
    // 画点
    drawPoint(BMap, map) {
      let mapv = require("mapv");

      let data = this.splicingData(this.interfaceData);
      this.dataSet = new mapv.DataSet(data);

      var options = {
        shadowColor: "rgba(255, 250, 50, 0.5)",
        shadowBlur: 3,
        globalCompositeOperation: "lighter",
        methods: {
          // 标记点点击事件
          click: function(item) {
            console.log(item);
          }
        },
        size: 5, // 标记点大小
        draw: "simple"
      };
      this.mapvLayer = new mapv.baiduMapLayer(map, this.dataSet, options);
      this.mapvLayer.show(); // 显示图层
    }
  }
};
</script>

<style lang="less" scoped>
.baidumap {
  width: 100%;
  height: 900px;
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>