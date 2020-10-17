<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

      <base-material-card
      icon="mdi-clipboard-text"
      title="Lecturers"
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
              //{text: 'lecturerName', value: 'lecturerName', sortable: true},
              {text: 'lecturerId', value: 'lecturerId', sortable: true},
              {text: 'faculty', value: 'faculty', sortable: true},
              {text: 'department', value: 'department', sortable: true},
              {text: 'center', value: 'center', sortable: true},
              {text: 'building', value: 'building', sortable: false},
              {text: 'level' , value: 'level' , sortable: true},
              //{text: 'unavailableTime' , value: 'unavailableTime' , sortable: true, with: '180px'},
          ],
      }),

        mounted() {
          this.loadlecturers();
        },
        computed: {
        ...mapState(["mrState"]),
        },
	    methods: {
          loadlecturers() {
              this.posts = this.mrState.lecturers;
          }
	    }

  }
</script>

