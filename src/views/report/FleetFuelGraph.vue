<template>
  <!-- <CWidgetDropdown>
    <template #default>
      <CDropdown color="transparent p-0" placement="bottom-end">
        <template #toggler-content>
          <CIcon name="cil-settings" />
        </template>
        <CDropdownItem>Daily</CDropdownItem>
        <CDropdownItem>Monthly</CDropdownItem>
      </CDropdown>
    </template>

    <template #footer> -->
      <div id="chart">
        <apexchart
          type="line"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
    <!-- </template>
  </CWidgetDropdown> -->
</template>
<script>
export default {
  data: function () {
    return {
      series: [
        {
          name: "Monatary Loss",
          data: [28, 29, 33, 36, 32, 32, 33],
        },
        {
          name: "Idle Hours",
          data: [12, 11, 14, 18, 17, 13, 13],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#000",
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#FF000C", "#5DADE2"],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Idle Hours & Monatary Loss",
          align: "left",
        },
        grid: {
          borderColor: "#e7e7e7",
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        markers: {
          size: 1,
        },
        xaxis: {
          //categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
          categories: ["V1", "V2", "V3", "V4", "V5", "V6", "V7"],
          title: {
            text: "Vehicles",
          },
        },
        yaxis: {
          title: {
            text: "Temperature",
          },
          min: 5,
          max: 40,
        },
        legend: {
          position: "top",
          horizontalAlign: "right",
          floating: true,
          offsetY: -25,
          offsetX: -5,
        },
      },
    };
  },
};
</script>