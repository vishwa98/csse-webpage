<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

      <base-material-card
      icon="mdi-clipboard-text"
      title="Subjects"
      class="px-5 py-3"
      >

        <v-card-title>
            <v-spacer></v-spacer>
            <v-text-field
            v-model="search"
            append-icon=""
            label="Search"
            single-line
            hide-details
            color="#2C3A47"
            >
            </v-text-field>
        </v-card-title>

        <v-data-table
        item-key="id"
        :headers="headers"
        :items="posts"
        :search="search"
        >
        </v-data-table>
    </base-material-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from 'vuex';
  export default {
      data: () => ({

          search: '',
		  text: '',
          color: '',

          rules: {
            required: [value => !!value || "Required."]
          },

          posts:[],
          headers: [
              {text: 'offeredYear', value: 'offeredYear', sortable: true},
              {text: 'semester', value: 'semester', sortable: true},
              {text: 'subjectName', value: 'subjectName', sortable: true},
              {text: 'subjectCode', value: 'subjectCode', sortable: true},
              {text: 'lectureHours', value: 'lectureHours', sortable: true},
              {text: 'tutorialHours', value: 'tutorialHours', sortable: false},
              {text: 'labHours' , value: 'labHours' , sortable: true},
              {text: 'evaluationHours' , value: 'evaluationHours' , sortable: true, with: '180px'},
          ],

          postData: {
              name: '',
              description: ''
		  },
		  default: {
              name: '',
              description: ''
          },
          
      }),

        mounted() {
          this.loadsubjecs();
        },
        computed: {
        ...mapState(["mrState"]),
        },
	    methods: {
          loadsubjecs() {
              this.posts = this.mrState.subjects;
          }
	    }

  }
</script>
