<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

    <div class="row mt-5">
        <div class="col">
            <h2>Names</h2>


            <line-chart
            :chartData="arrCenter"
            :options="chartOptioons"
            :chartColors="positiveChartColors"
            label="Total Lecturers in a center"
            ></line-chart>

            <line-chart
            :chartData="arrDept"
            :options="chartOptioons"
            :chartColors="positiveChartColors"
            label="Total Lecturers in a department"
            ></line-chart>

            <line-chart
            :chartData="arrFaculty"
            :options="chartOptioons"
            :chartColors="positiveChartColors"
            label="Total Lecturers in a faculty"
            ></line-chart>

            <pie-chart
            :chartData="arrCenter"
            :options="chartOptioons"
            :chartColors="pieChartColors"
            label="Total Lecturers in a Center"
            ></pie-chart>

            <pie-chart
            :chartData="arrDept"
            :options="chartOptioons"
            :chartColors="pieChartColors"
            label="Total Lecturers in a Department"
            ></pie-chart>

            <pie-chart
            :chartData="arrFaculty"
            :options="chartOptioons"
            :chartColors="pieChartColors"
            label="Total Lecturers in a Faculty"
            ></pie-chart>
        </div>
    </div>


  </v-container>
</template>
<script>
import axios from "axios";
import { mapMutations, mapState, mapActions } from 'vuex';

import LineChart from "./LineChart";
import PieChart from "./PieChart";
  export default {
      components: {
          LineChart,
          PieChart
      },

      data: () => ({


          snackbar: false,
		  text: '',
          color: '',
          dialog: false,

          arrMax:[],
          arrCenter: [],
          arrDept: [],
          arrFaculty: [],
          arrStudentY1Type: [],
          arrStudentY2Type: [],
          arrStudentY3Type: [],
          arrStudentY4Type: [],

          positiveChartColors: {
        backgroundColor: "#E46651"
      },
      pieChartColors: {
        backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#E9967A"]
    },
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

          chartOptioons: {
                 responsive: true,
                maintainAspectRatio: false,
                scales: {
                 yAxes: [{

              stacked: true,
               ticks: {
                  min: 0,
                  stepSize: 1,
              }

          }]
            }
          },

          min: false,
          dialog:false,
          fab: false,
          posts:[],
          examp:[],
          headers: [
              {text: 'Name', value: 'name', sortable: true},
              {text: 'Description', value: 'description', sortable: false},
              {text: 'Action' , value: 'actions' , sortable: true, with: '180px'},
          ],

          postData: {
              name: '',
              description: ''
		  },
		  default: {
              name: '',
              description: ''
          },
          editedIndex: -1,
      }),

      computed: {
        ...mapState(["rooms"]),

        ...mapState(["mrState"]),

    },

      mounted() {

      },

	  methods: {

          ...mapActions(["setBuildingsAction"]),

          ...mapActions(["setRoomsAction"]),

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

        getLecturerKandyBatch() {
            let arrKandy = this.mrState.lecturers.filter(
            (x) => x.center=== "Kandy"
            );
            return arrKandy;
        },

        getLecturerMataraBatch() {
            let arrMatara = this.mrState.lecturers.filter(
            (x) => x.center=== "Matara"
            );
            return arrMatara;
        },

        getLecturerSEBatch() {
            let arrSE = this.mrState.lecturers.filter(
            (x) => x.department=== "SE"
            );
            return arrSE;
        },

        getLecturerITBatch() {
            let arrIT = this.mrState.lecturers.filter(
            (x) => x.department=== "IT"
            );
            return arrIT;
        },

        getLecturerDSBatch() {
            let arrDS = this.mrState.lecturers.filter(
            (x) => x.department=== "DS"
            );
            return arrDS;
        },

        getLecturerCSBatch() {
            let arrCS = this.mrState.lecturers.filter(
            (x) => x.department=== "CS"
            );
            return arrCS;
        },

        getLecturerComputingBatch() {
            let arrFacultySE = this.mrState.lecturers.filter(
            (x) => x.faculty=== "Computing"
            );
            return arrFacultySE;
        },

        getLecturerEngineeringBatch() {
            let arrFacultyENG = this.mrState.lecturers.filter(
            (x) => x.faculty=== "Engineering"
            );
            return arrFacultyENG;
        },

        getLecturerBMBatch() {
            let arrFacultyBM = this.mrState.lecturers.filter(
            (x) => x.faculty=== "BusinessManagement"
            );
            return arrFacultyBM;
        },

      },

      created() {

          console.log(this.rooms);

          console.log("MRRRR", this.mrState.lecturers);

          const lecturerListMalabe = this.getLecturerMalabeBatch();
          const lecturerListMetro = this.getLecturerMetroBatch();
          const lecturerListMatara = this.getLecturerMataraBatch();
          const lecturerListKandy = this.getLecturerKandyBatch();
          this.arrCenter.push({ name: "Lecturers in Malabe", total: lecturerListMalabe.length });
          this.arrCenter.push({ name: "Lecturers in Metro", total: lecturerListMetro.length });
          this.arrCenter.push({ name: "Lecturers in Matara", total: lecturerListMatara.length });
          this.arrCenter.push({ name: "Lecturers in Kandy", total: lecturerListKandy.length });

          const lecturerListSE = this.getLecturerSEBatch();
          const lecturerListIT = this.getLecturerITBatch();
          const lecturerListDS = this.getLecturerDSBatch();
          const lecturerListCS = this.getLecturerCSBatch();
          this.arrDept.push({ name: "Lecturers for SE Department", total: lecturerListSE.length });
          this.arrDept.push({ name: "Lecturers for IT Department", total: lecturerListIT.length });
          this.arrDept.push({ name: "Lecturers for DS Department", total: lecturerListDS.length });
          this.arrDept.push({ name: "Lecturers for CS Department", total: lecturerListCS.length });

          const lecturerListComputingFaculty = this.getLecturerComputingBatch();
          const lecturerListEngFaculty = this.getLecturerEngineeringBatch();
          const lecturerListBMFaculty = this.getLecturerBMBatch();
          this.arrFaculty.push({ name: "Lecturers for Computing faculty", total: lecturerListComputingFaculty.length });
          this.arrFaculty.push({ name: "Lecturers for Engineering faculty", total: lecturerListEngFaculty.length });
          this.arrFaculty.push({ name: "Lecturers for Business Management faculty", total: lecturerListBMFaculty.length });


          this.setRoomsAction();

          this.rooms.forEach(e => {

              const {
                  name,
                  max
              } = e;

              this.arrMax.push({name, total: max});

              console.log(this.arrMax);
          });



      }


  }
</script>
