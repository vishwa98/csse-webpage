<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >

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


    <v-row justify="center">
      <v-col
        cols="12"
        md="8"
      >
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Add Building
            </div>

            <div class="subtitle-1 font-weight-light">
              Add Building Details
            </div>
          </template>

          <v-form @submit.prevent="savePost" ref="postData" lazy-validation enctype="multipart/form-data" autocomplete="off" v-model="formValid">
            <v-container class="py-0">
              <v-row>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-text-field
                    class="purple-input"
                    label="Building Name *"
                    v-model="postData.name"
                    :rules="rules.required"
                  />
                </v-col>

                <v-col
                  cols="12"
                  md="4"
                >
                  <v-select
                    :items="availableCenters"
                    label="Centre *"
                    :rules="rules.required"
                    v-model="postData.description"
                    outlined
                  ></v-select>
                </v-col>


                <v-col
                  cols="12"
                  class="text-right"
                >
                  <v-btn
                    color="success"
                    class="mr-0"
					@click="savePost()"
                  >
                    Add Location
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </base-material-card>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <base-material-card
          class="v-card-profile"
          icon="mdi-store"
          avatar=""
        >
          <v-card-text class="text-center">
            <h6 class="display-1 mb-1 grey--text">
              BUILDING
            </h6>

            <h4 class="display-2 font-weight-light mb-3 black--text">
              BUILDING DETAILS
            </h4>
            <p>{{buildings.length}}</p>
            <p class="font-weight-light grey--text">

            </p>

            <v-btn
              color="success"
              rounded
              class="mr-0"
              to="/components/allbuildings"
            >
              View Building Details
            </v-btn>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions, mapState } from 'vuex';
  export default {
      data: () => ({

          formValid: false,

          rules: {
            required: [value => !!value || "Required."]
            },

		  snackbar: false,
		  text: '',
		  color: '',

          postData: {
              name: '',
              description: ''
		  },
		  default: {
              name: '',
              description: ''
          }
      }),

     computed: {
        ...mapState(["buildings"]),

        ...mapState(["vishwaState"]),

        availableCenters() {
        let center = this.vishwaState.center;
      console.log("vishwaState.center", center);
      let selectCenters = [];
      for (var i = 0; i < center.length; i++) {
        selectCenters.push(center[i].name);
      }
      return selectCenters;
    },

    },

    mounted() {
          console.log("Mounted in Add Buildings");

          this.setBuildingsAction();

          console.log(this.buildings);
      },

	  methods: {

          ...mapActions([

               'addStoreBuildingAction'

          ]),

          ...mapActions(["setBuildingsAction"]),

		  savePost: async function(){

				  this.createPost();

				  console.log("Hellloooooo");

          },

          created() {

          console.log("Created");

          this.setBuildingsAction();
      },

      updateBuildingState() {

          this.setBuildingsAction();
      },


		  createPost(){

              const { name, description } = this.postData;

              const payload = {

                      name,
                      description

              }

              if(this.postData.name && this.postData.description != ''){

              for(var i = 0; i < this.buildings.length; i++){

                  if(this.buildings[i].name == this.postData.name)
                  {
                      this.color = 'red'
				      this.text = 'Please enter a unique building name'
                      this.snackbar = true;

                      return false;
                  }
              }
			  console.log("Hello");

			  this.addStoreBuildingAction(payload).then(() => {
				  this.postData = {
					  name: '',
					  description: '',
				  }
				  this.color = 'success'
				  this.text = 'Building Details successfully saved'
                  this.snackbar = true;
                  this.updateBuildingState();
                  this.rules = false;
			  }).catch(error => {
				  console.log(console.error())
              });


          }
          else{
              this.color = "red";
              this.text = "Fields marked * canno't be kept empty";
              this.snackbar = true;
          }

          this.created();

          }


      }



  }
</script>
