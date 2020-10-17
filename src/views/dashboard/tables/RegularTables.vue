<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >

  <v-btn to="/components/addnewbuilding">Add Building</v-btn>

  <v-btn to="/tables/room">View All Rooms</v-btn>

  <v-dialog v-model="dialog" persistent max-width="800px">

      <v-card>
          <v-form @submit.prevent="savePost" ref="postData" lazy-validation enctype="multipart/form-data" autocomplete="off">
          <v-card-title>
              <span class="headline">Edit Building</span>
          </v-card-title>
          <v-card-text>
              <v-container grid-list-md>
                  <v-layout wrap>
                      <v-flex xs12 sm12 md12>
                          <v-text-field label="Building Name" v-model="postData.name" :rules="rules.required" color="#2C3A47"></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12 md12>
                          <v-text-field label="Center" v-model="postData.description" :rules="rules.required" color="#2C3A47"></v-text-field>
                      </v-flex>
                  </v-layout>
              </v-container>
          </v-card-text>
          <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="#2C3A47" dark @click="close" outlined small>
                  <v-icon left>mdi-exit-to-app</v-icon> Close
              </v-btn>
              <v-btn color="light-green darken-4" dark type="submit" outlined small>
                  <v-icon left>mdi-pencil</v-icon> Edit
              </v-btn>
          </v-card-actions>
          </v-form>
      </v-card>
  </v-dialog>



    <base-v-component
      heading="Simple Tables"
      link="components/simple-tables"
    />

    <v-snackbar
	v-model="snackbar"
	top
	right
	:color="color"
	>
	{{text}}
	<v-btn
	color="white"
	text
	@click="snackbar = false"
	>
	Ok
	</v-btn>

	</v-snackbar>

    <base-material-card
      icon="mdi-clipboard-text"
      title="Buildings"
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


      <template v-slot:[`item.actions`]="{item}">
          <router-link class="nav-link" :to="'/tables/' + item.name">View Rooms</router-link>
          <v-btn color="success" class="mx-2" fab x-small @click="editPost(item)" outlined>
              <v-icon small>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color="pink" fab x-small @click="deletePost(item._id)" outlined>
              <v-icon small>mdi-delete</v-icon>
          </v-btn>
      </template>
      </v-data-table>


    </base-material-card>
  </v-container>
</template>
<script>
import axios from "axios";
  export default {
      data: () => ({

          snackbar: false,
          search: '',
		  text: '',
          color: '',
          dialog: false,

          rules: {
            required: [value => !!value || "Required."]
          },

          min: false,
          dialog:false,
          fab: false,
          posts:[],
          headers: [
              {text: 'Name', value: 'name', sortable: true},
              {text: 'Center', value: 'description', sortable: false},
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

      mounted() {
          this.loadBuildings();
      },

	  methods: {

          close(){
              this.dialog = false;
              setTimeout(()=>{
                  this.postData = Object.assign({}, this.default)
                  this.editedIndex = -1
              }, 3000000)
          },

		  loadBuildings: async function(){

			  console.log("Loading...");

			  let apiURL = 'http://localhost:8000/api/buildings';
			  axios.get(apiURL).then((res) => {
				  this.posts = res.data;
			  }).catch(error => {
				  console.log(error);
			  });

          },

          savePost: async function(){

              this.updatePost();
          },

          editPost(item) {
              this.editedIndex = this.posts.indexOf(item)
              this.postData = Object.assign({}, item)
              this.dialog = true
          },

          updatePost() {

              if(this.$refs.postData.validate()){
              let apiURL = `http://localhost:8000/api/building/${this.postData._id}`;
              axios.post(apiURL, this.postData).then((res) => {
                  console.log(res);
                  this.close();
                  this.loadBuildings();
                  this.color ='info'
                  this.text = 'Building has been updated'
                  this.snackbar = true;
              }).catch(error => {
                  console.log(error)
                  console.log(this.$route.params.id)
              })

              }

          },

          deletePost(id){
              this.$swal({
                  title: 'Are you sure?',
                  text: 'You will not be able to undo this action',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#00b894',
                  cancelButtonColor: '#d63031',
                  confirmButtonText: 'Yes',
                  cancelButtonText: 'No'
              }).then((result)=> {
                  if(result.value){
                      try {
                          let apiURL = `http://localhost:8000/api/deleteBuilding/${id}`;
                          let indexOfArrayItem = this.posts.findIndex(i => i._id === id);
                          axios.delete(apiURL).then(() => {
                              this.posts.splice(indexOfArrayItem, 1);
                          }).catch(error => {
                              console.log(error);
                          });
                          this.$swal(
                              'Deleted!',
                              'Building has been deleted',
                              'success'
                          )
                          this.color = 'error'
                          this.text = 'Building has been deleted'
                          this.snackbar = true;
                      }catch (error){
                          this.$swal("Failed", "There was something wrong", "warning")
                      }
                  }
              })
          }
	  }


  }
</script>
