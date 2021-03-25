<template>
  <div>
    <GmapMap :center="center" :zoom="zoom" ref="mapRef"></GmapMap>
  </div>
</template>
<script>
/* global google */
export default {
  data() {
    return {
      zoom: 12,
      center: { lat: 51.5287718, lng: -0.2416804 },
    };
  },
  mounted: function () {
    this.$refs.mapRef.$mapPromise.then(() => {
      this.initSlidingMarker(this.$refs.mapRef.$mapObject);
    });
  },
  methods: {
      //this.newmarkers.push({position:{lat:e.latLng.lat(),lng: e.latLng.lat()}})
    initSlidingMarker(map) {
      const SlidingMarker = require("marker-animate-unobtrusive");
      SlidingMarker.initializeGlobally();
      const marker = new SlidingMarker({
        position: map.getCenter(),
        map: map,
        title: "Im sliding marker",
      });
      google.maps.event.addListener(map, "click", (event) => {
        marker.setDuration(1000);
        marker.setEasing("linear");
        marker.setPosition(event.latLng);
      });
    },
  },
};
</script>
<style>
.vue-map-container {
  height: 640px;
}
</style>