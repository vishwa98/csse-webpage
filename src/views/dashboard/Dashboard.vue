<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <v-row>
      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Lecturers
          </h4>





          <v-btn to="/components/lecgraphs" color="error">View Statistics</v-btn>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              mdi-apple-keyboard-control
            </v-icon>
            <span class="caption grey--text font-weight-light"></span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Students
          </h4>
            <v-btn to="/components/studentgraphs" color="success">View Statistics</v-btn>
          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            <v-icon
              color="green"
              small
            >

            </v-icon>
            &nbsp;

          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >

            </v-icon>
            <span class="caption grey--text font-weight-light">-</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        lg="4"
      >
        <base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="info"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  color="info"
                  icon
                  v-on="on"
                >
                  <v-icon
                    color="info"
                  >
                    mdi-refresh
                  </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn
                  v-bind="attrs"
                  light
                  icon
                  v-on="on"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            Subjects
          </h3>
                 <v-btn to="/components/subjectstatistics" color="#64B5F6">View Statistics</v-btn>
          <p class="d-inline-flex font-weight-light ml-2 mt-1">

          </p>

          <template v-slot:actions>
            <v-icon
              class="mr-1"
              small
            >
              -
            </v-icon>
            <span class="caption grey--text font-weight-light">-</span>
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="info"
          icon="mdi-store"
          title="Rooms"
          value="4"
          sub-icon="mdi-arrow-right-bold"
          sub-text="Total number of rooms"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="primary"
          icon="mdi-account"
          title="Lecturers"
          value="26"
          sub-icon="mdi-arrow-right-bold"
          sub-text="Total number of lecturers"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="success"
          icon="mdi-store"
          title="Buildings"
          value="8"
          sub-icon="mdi-arrow-right-bold"
          sub-text="Total number of buildings"
        />
      </v-col>

      <v-col
        cols="12"
        sm="6"
        lg="3"
      >
        <base-material-stats-card
          color="orange"
          icon="mdi-account"
          title="Students"
          value="18"
          sub-icon="mdi-arrow-right-bold"
          sub-icon-color="red"
          sub-text="Total number of students"
        />
      </v-col>




    </v-row>
  </v-container>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
  export default {
    name: 'DashboardDashboard',

    data () {
      return {
        dailySalesChart: {
          data: {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [
              [12, 17, 7, 17, 23, 18, 38],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        dataCompletedTasksChart: {
          data: {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [
              [230, 750, 450, 300, 280, 240, 200, 190],
            ],
          },
          options: {
            lineSmooth: this.$chartist.Interpolation.cardinal({
              tension: 0,
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            },
          },
        },
        emailsSubscriptionChart: {
          data: {
            labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De'],
            series: [
              [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],

            ],
          },
          options: {
            axisX: {
              showGrid: false,
            },
            low: 0,
            high: 1000,
            chartPadding: {
              top: 0,
              right: 5,
              bottom: 0,
              left: 0,
            },
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0]
                },
              },
            }],
          ],
        },
        headers: [
          {
            sortable: false,
            text: 'Name',
            value: 'name',
          },
          {
            sortable: false,
            text: 'Room Type',
            value: 'salary',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Maximum Students',
            value: 'country',
            align: 'right',
          },
          {
            sortable: false,
            text: 'Building',
            value: 'city',
            align: 'right',
          },
        ],
        items: [
          {
            name: 'Room1',
            country: '225',
            city: 'B1002',
            salary: 'Lecture',
          },
          {
            name: 'Room2',
            country: '225',
            city: 'B1002',
            salary: 'Lecture',
          },
          {
            name: 'Room3',
            country: '112',
            city: 'A1009',
            salary: 'Lab',
          },
          {
            name: 'Room4',
            country: '334',
            city: 'A2008',
            salary: 'Lecture',
          },
          {
            name: 'Room5',
            country: '555',
            city: 'A1902',
            salary: 'Lecture',
          },
        ],
        tabs: 0,
        tasks: {
          0: [
            {
              text: 'Time table for Mr.Thariq',
              value: true,
            },
            {
              text: 'Time table for Mr.Lakshan',
              value: false,
            },
            {
              text: 'Time table for Mr.Vishwa',
              value: false,
            },
            {
              text: 'Time table for Mr.Mohammed',
              value: true,
            },
          ],
          1: [
            {
              text: 'Time table for Supun',
              value: true,
            },
            {
              text: 'Time table for Vimal',
              value: false,
            },
          ],
          2: [
            {
              text: 'Time table for Room1',
              value: false,
            },
            {
              text: 'Time table for Room2',
              value: true,
            },
            {
              text: 'Time table for Room3',
              value: true,
            },
          ],
        },
        list: {
          0: false,
          1: false,
          2: false,
        },
      }
    },

    computed: {
                ...mapState(["buildings"]),

                ...mapState(["rooms"]),

                ...mapState(["vishwaState"]),

    },

    methods: {
      complete (index) {
        this.list[index] = !this.list[index]
      },
    },
  }
</script>
