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
            label="Total Subjects for a year"
            ></line-chart>

            <line-chart
            :chartData="arrMax"
            :options="chartOptioons"
            :chartColors="positiveChartColors"
            label="Lecture hours for a subject"
            ></line-chart>

            <line-chart
            :chartData="arrTute"
            :options="chartOptioons"
            :chartColors="positiveChartColors"
            label="Tutorial hours for a subject"
            ></line-chart>

            <line-chart
            :chartData="arrLab"
            :options="chartOptioons"
            :chartColors="positiveChartColors"
            label="Lab hours for a subject"
            ></line-chart>

            <line-chart
            :chartData="arrEva"
            :options="chartOptioons"
            :chartColors="positiveChartColors"
            label="Evaluation hours for a subject"
            ></line-chart>

            <pie-chart
            :chartData="arrCenter"
            :options="chartOptions"
            :chartColors="pieChartColors"
            ></pie-chart>
            <h1 align="center">Lecture Hours for a subject</h1>
            <pie-chart
            :chartData="arrMax"
            :options="chartOptions"
            :chartColors="pieChartColors"
            ></pie-chart>
            <h1 align="center">Tutorial Hours for a subject</h1>
            <pie-chart
            :chartData="arrTute"
            :options="chartOptions"
            :chartColors="pieChartColors"
            ></pie-chart>
            <h1 align="center">Lab Hours for a subject</h1>
            <pie-chart
            :chartData="arrLab"
            :options="chartOptions"
            :chartColors="pieChartColors"
            ></pie-chart>
            <h1 align="center">Evaluation Hours for a subject</h1>
            <pie-chart
            :chartData="arrEva"
            :options="chartOptions"
            :chartColors="pieChartColors"
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
          arrTute:[],
          arrLab: [],
          arrEva: [],
          arrCenter: [],
          arrDept: [],
          arrFaculty: [],
          arrStudentY1Type: [],
          arrStudentY2Type: [],
          arrStudentY3Type: [],
          arrStudentY4Type: [],

          positiveChartColors: {
        backgroundColor: "#E9967A"
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

          getSubjectY1Batch() {
            let arrMalabe = this.mrState.subjects.filter(
            (x) => x.offeredYear=== 1
            );
            return arrMalabe;
        },

        getSubjectY2Batch() {
            let arrMetro = this.mrState.subjects.filter(
            (x) => x.offeredYear=== 2
            );
            return arrMetro;
        },

        getSubjectY3Batch() {
            let arrMalabe = this.mrState.subjects.filter(
            (x) => x.offeredYear=== 3
            );
            return arrMalabe;
        },

        getSubjectY4Batch() {
            let arrMetro = this.mrState.subjects.filter(
            (x) => x.offeredYear=== 4
            );
            return arrMetro;
        },

      },

      created() {

          console.log(this.rooms);

          console.log("MRRRR", this.mrState.subjects);

          const subjectListY1 = this.getSubjectY1Batch();
          const subjectListY2 = this.getSubjectY2Batch();
          const subjectListY3 = this.getSubjectY3Batch();
          const subjectListY4 = this.getSubjectY4Batch();
          this.arrCenter.push({ name: "Total Y1 Subjects", total: subjectListY1.length });
          this.arrCenter.push({ name: "Total Y2 Subjects", total: subjectListY2.length });
          this.arrCenter.push({ name: "Total Y3 Subjects", total: subjectListY3.length });
          this.arrCenter.push({ name: "Total Y4 Subjects", total: subjectListY4.length });

          console.log("Subject Y4", subjectListY4);

          this.setRoomsAction();

          this.mrState.subjects.forEach(e => {

              const {
                  subjectName,
                  lectureHours
              } = e;

              this.arrMax.push({name: subjectName, total: lectureHours});

              console.log(this.arrMax);
          });

          this.mrState.subjects.forEach(e => {

              const {
                  subjectName,
                  tutorialHours
              } = e;

              this.arrTute.push({name: subjectName, total: tutorialHours});

              console.log(this.arrTute);
          });

          this.mrState.subjects.forEach(e => {

              const {
                  subjectName,
                  labHours
              } = e;

              this.arrLab.push({name: subjectName, total: labHours});

              console.log(this.arrLab);
          });

          this.mrState.subjects.forEach(e => {

              const {
                  subjectName,
                  evaluationHours
              } = e;

              this.arrEva.push({name: subjectName, total: evaluationHours});

              console.log(this.arrEva);
          });



      }


  }
</script>
