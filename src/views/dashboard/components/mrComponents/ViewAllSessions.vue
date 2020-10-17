<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

      <base-material-card
      icon="mdi-clipboard-text"
      title="Sessions"
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
              {text: 'lecturers', value: 'lecturers', sortable: true},
              {text: 'tag', value: 'tag', sortable: true},
              {text: 'batch', value: 'batch', sortable: true},
              {text: 'subject', value: 'subject', sortable: true},
              {text: 'noOfStudents', value: 'noOfStudents', sortable: true},
              {text: 'duration', value: 'duration', sortable: false},
              //{text: 'unavailableTime' , value: 'unavailableTime' , sortable: true},
              //{text: 'prefferedRooms' , value: 'prefferedRooms' , sortable: true, with: '180px'},
          ],

      }),

        mounted() {
          this.loadsessions();
        },
        computed: {
        ...mapState(["mrState"]),
        },
	    methods: {
          loadsessions() {
              this.posts = this.mrState.sessions;
          }
	    }

  }
</script>
