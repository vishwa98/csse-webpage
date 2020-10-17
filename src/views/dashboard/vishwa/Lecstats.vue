<template>
  <v-container id="regular-tables" fluid tag="section">
    <div class="row mt-5" v-if="arrMax.length > 0">
      <div class="col">
        <h2>Names</h2>


        <bar-chart
          :chartData="arrCenter"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="Students in a program"
        ></bar-chart>

         <line-chart
          :chartData="arrStudentY1Type"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="Number of First year students in each program (Y1)"
        ></line-chart>

        <line-chart
          :chartData="arrStudentY2Type"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="Number of Second year students in each program (Y2)"
        ></line-chart>

        <line-chart
          :chartData="arrStudentY3Type"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="Number of Third year students in each program (Y3)"
        ></line-chart>

        <line-chart
          :chartData="arrStudentY4Type"
          :options="chartOptions"
          :chartColors="positiveChartColors"
          label="Number of Fourth year students in each program (Y4)"
        ></line-chart>

        <pie-chart
          :chartData="arrPieType"
          :options="chartOptions"
          :chartColors="pieChartColors"
          label="Students in a program"
        ></pie-chart>
      </div>
    </div>
  </v-container>
</template>
<script>
import axios from "axios";
import { mapMutations, mapState, mapActions } from "vuex";

import LineChart from "./LineChart";
import PieChart from "./PieChart";
import BarChart from "./BarChart";
export default {
  components: {
    LineChart,
    PieChart,
    BarChart
  },

  data: () => ({
    arrMax: [],
    positiveChartColors: {
        backgroundColor: "#41B883"
      },
    pieChartColors: {
        backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#E9967A"]
    },
    arrStudentType: [],
    arrStudentY1Type: [],
    arrStudentY2Type: [],
    arrStudentY3Type: [],
    arrStudentY4Type: [],
    arrCenter: [],
    arrPieType: [],
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
        ticks: {
         stepSize: 50,
         maxTicksLimit: 3
      }
   }]
}
    },

    studentBatch: {
      bId: "",
      year: "",
      semester: "",
      program: "",
      groupNumber: "",
      subGroupNumber: "",
      prefferedRooms: [],
      unavailableDays: [],
    },
  }),

  computed: {
    ...mapState(["rooms"]),

    ...mapState(["tharikState"]),

    ...mapState(["mrState"]),
  },

  mounted() {
    this.setRoomsAction();
  },

  methods: {
    ...mapActions(["setBuildingsAction"]),

    ...mapActions(["setRoomsAction"]),

    getStudentSEBatch() {
      let studentBatchArr = this.tharikState.studentBatches.filter(
        (x) => x.program === "SE"
      );
      return studentBatchArr;
    },

    getStudentITBatch() {
      let studentBatchITArr = this.tharikState.studentBatches.filter(
        (x) => x.program === "IT"
      );
      return studentBatchITArr;
    },

    getStudentDSBatch() {
      let studentBatchArr = this.tharikState.studentBatches.filter(
        (x) => x.program === "DS"
      );
      return studentBatchArr;
    },

    getStudentCSBatch() {
      let studentBatchITArr = this.tharikState.studentBatches.filter(
        (x) => x.program === "CS"
      );
      return studentBatchITArr;
    },

    getStudentY1SEBatch() {
      let studentBatchy1Arr = this.tharikState.studentBatches.filter(
        (x) => x.year === 1 && x.program === "SE"
      );

      console.log("Year1SE", studentBatchy1Arr);
      return studentBatchy1Arr;
    },

    getStudentY1ITBatch() {
      let studentBatchyIT1Arr = this.tharikState.studentBatches.filter(
        (x) => x.year === 1 && x.program === "IT"
      );

      console.log("Year1IT", studentBatchyIT1Arr);
      return studentBatchyIT1Arr;
    },

    getStudentY1DSBatch() {
      let studentBatchy1DSArr = this.tharikState.studentBatches.filter(
        (x) => x.year === 1 && x.program === "DS"
      );

      console.log("Year1DS", studentBatchy1DSArr);
      return studentBatchy1DSArr;
    },

    getStudentY1CSBatch() {
      let studentBatchy1DSArr = this.tharikState.studentBatches.filter(
        (x) => x.year === 1 && x.program === "CS"
      );

      console.log("Year1CS", studentBatchy1DSArr);
      return studentBatchy1DSArr;
    },

    getStudentY2SEBatch() {
      let studentBatchy1Arr = this.tharikState.studentBatches.filter(
        (x) => x.year === 2 && x.program === "SE"
      );

      console.log("Year1", studentBatchy1Arr);
      return studentBatchy1Arr;
    },

    getStudentY2ITBatch() {
      let studentBatchyIT1Arr = this.tharikState.studentBatches.filter(
        (x) => x.year === 2 && x.program === "IT"
      );

      console.log("Year1IT", studentBatchyIT1Arr);
      return studentBatchyIT1Arr;
    },

    getStudentY2DSBatch() {
      let studentBatchy1DSArr = this.tharikState.studentBatches.filter(
        (x) => x.year === 2 && x.program === "DS"
      );

      console.log("Year1DS", studentBatchy1DSArr);
      return studentBatchy1DSArr;
    },

    getStudentY2CSBatch() {
      let studentBatchy1DSArr = this.tharikState.studentBatches.filter(
        (x) => x.year === 2 && x.program === "CS"
      );

      console.log("Year1CS", studentBatchy1DSArr);
      return studentBatchy1DSArr;
    },

    getStudentY3SEBatch() {
      let studentBatchy1Arr = this.tharikState.studentBatches.filter(
        (x) => x.year === 3 && x.program === "SE"
      );

      console.log("Year1SE", studentBatchy1Arr);
      return studentBatchy1Arr;
    },

    getStudentY3ITBatch() {
      let studentBatchyIT1Arr = this.tharikState.studentBatches.filter(
        (x) => x.year === 3 && x.program === "IT"
      );

      console.log("Year1IT", studentBatchyIT1Arr);
      return studentBatchyIT1Arr;
    },

    getStudentY3DSBatch() {
      let studentBatchy1DSArr = this.tharikState.studentBatches.filter(
        (x) => x.year === 3 && x.program === "DS"
      );

      console.log("Year1DS", studentBatchy1DSArr);
      return studentBatchy1DSArr;
    },

    getStudentY3CSBatch() {
      let studentBatchy1DSArr = this.tharikState.studentBatches.filter(
        (x) => x.year === 3 && x.program === "CS"
      );

      console.log("Year1CS", studentBatchy1DSArr);
      return studentBatchy1DSArr;
    },

    getStudentY4SEBatch() {
      let studentBatchy1Arr = this.tharikState.studentBatches.filter(
        (x) => x.year === 4 && x.program === "SE"
      );

      console.log("Year1SE", studentBatchy1Arr);
      return studentBatchy1Arr;
    },

    getStudentY4ITBatch() {
      let studentBatchyIT1Arr = this.tharikState.studentBatches.filter(
        (x) => x.year === 4 && x.program === "IT"
      );

      console.log("Year1IT", studentBatchyIT1Arr);
      return studentBatchyIT1Arr;
    },

    getStudentY4DSBatch() {
      let studentBatchy1DSArr = this.tharikState.studentBatches.filter(
        (x) => x.year === 4 && x.program === "DS"
      );

      console.log("Year1DS", studentBatchy1DSArr);
      return studentBatchy1DSArr;
    },

    getStudentY4CSBatch() {
      let studentBatchy1DSArr = this.tharikState.studentBatches.filter(
        (x) => x.year === 4 && x.program === "CS"
      );

      console.log("Year1CS", studentBatchy1DSArr);
      return studentBatchy1DSArr;
    },

    getLecturerMalabeBatch() {
        let arrMalabe = this.mrState.lecturers.filter(
            (x) => x.center=== "Malabe"
            );

            return arrMalabe;
        },

    getLecturerMetroBatch() {
            let arrMetro = this.mrState.lecturers.filter(
            (x) => x.center=== "Metro"
            );

            return arrMetro;
        },

  },



  created() {
    console.log(this.rooms);
    this.setRoomsAction();

    console.log("MRRRR", this.mrState.lecturers);

    const studentListSEY1 = this.getStudentY1SEBatch();
    const studentListITY1 = this.getStudentY1ITBatch();
    const studentListDSY1 = this.getStudentY1DSBatch();
    const studentListCSY1 = this.getStudentY1CSBatch();
    this.arrStudentY1Type.push({ name: "SE(Y1)", total: studentListSEY1.length });
    this.arrStudentY1Type.push({ name: "IT(Y1)", total: studentListITY1.length });
    this.arrStudentY1Type.push({ name: "DS(Y1)", total: studentListDSY1.length });
    this.arrStudentY1Type.push({ name: "CS(Y1)", total: studentListCSY1.length });

    const studentListSEY2 = this.getStudentY2SEBatch();
    const studentListITY2 = this.getStudentY2ITBatch();
    const studentListDSY2 = this.getStudentY2DSBatch();
    const studentListCSY2 = this.getStudentY2CSBatch();
    this.arrStudentY2Type.push({ name: "SE(Y2)", total: studentListSEY2.length });
    this.arrStudentY2Type.push({ name: "IT(Y2)", total: studentListITY2.length });
    this.arrStudentY2Type.push({ name: "DS(Y2)", total: studentListDSY2.length });
    this.arrStudentY2Type.push({ name: "CS(Y2)", total: studentListCSY2.length });

    const studentListSEY3 = this.getStudentY3SEBatch();
    const studentListITY3 = this.getStudentY3ITBatch();
    const studentListDSY3 = this.getStudentY3DSBatch();
    const studentListCSY3 = this.getStudentY3CSBatch();
    this.arrStudentY3Type.push({ name: "SE(Y3)", total: studentListSEY3.length });
    this.arrStudentY3Type.push({ name: "IT(Y3)", total: studentListITY3.length });
    this.arrStudentY3Type.push({ name: "DS(Y3)", total: studentListDSY3.length });
    this.arrStudentY3Type.push({ name: "CS(Y3)", total: studentListCSY3.length });

    const studentListSEY4 = this.getStudentY4SEBatch();
    const studentListITY4 = this.getStudentY4ITBatch();
    const studentListDSY4 = this.getStudentY4DSBatch();
    const studentListCSY4 = this.getStudentY4CSBatch();
    this.arrStudentY4Type.push({ name: "SE(Y4)", total: studentListSEY4.length });
    this.arrStudentY4Type.push({ name: "IT(Y4)", total: studentListITY4.length });
    this.arrStudentY4Type.push({ name: "DS(Y4)", total: studentListDSY4.length });
    this.arrStudentY4Type.push({ name: "CS(Y4)", total: studentListCSY4.length });

    const studentListSE = this.getStudentSEBatch();
    const studentListIT = this.getStudentITBatch();
    const studentListDS = this.getStudentDSBatch();
    const studentListCS = this.getStudentCSBatch();
    this.arrStudentType.push({ name: "SE", total: studentListSE.length });
    this.arrStudentType.push({
      name: "Total of All",
      total: this.tharikState.studentBatches.length,
    });
    this.arrStudentType.push({ name: "IT", total: studentListIT.length });
    this.arrStudentType.push({ name: "DS", total: studentListDS.length });
    this.arrStudentType.push({ name: "CS", total: studentListCS.length });

    const studentListPIESE = this.getStudentSEBatch();
    const studentListPIEIT = this.getStudentITBatch();
    const studentListPIEDS = this.getStudentDSBatch();
    const studentListPIECS = this.getStudentCSBatch();
    this.arrPieType.push({ name: "SE", total: studentListPIESE.length });
    this.arrPieType.push({ name: "IT", total: studentListPIEIT.length });
    this.arrPieType.push({ name: "DS", total: studentListPIEDS.length });
    this.arrPieType.push({ name: "CS", total: studentListPIECS.length });

    const lecturerListMalabe = this.getLecturerMalabeBatch();
    const lecturerListMetro = this.getLecturerMetroBatch();
    this.arrCenter.push({ name: "Malabe", total: lecturerListMalabe.length });
    this.arrCenter.push({ name: "Metro", total: lecturerListMetro.length });

    this.rooms.forEach((e) => {
      const { name, max } = e;

      this.arrMax.push({ name, total: max });

      console.log(this.arrMax);
    });
  },
};
</script>
