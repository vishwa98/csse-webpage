<template>
  <v-container>
    <v-row justify="start" wrap>
      <Tag v-for="(tag, i) in availableTags" :key="i" :tagName="tag" :id="i" />
    </v-row>
    <v-row>
      <v-col>
        <v-alert
          v-model="alertBox"
          border="left"
          close-text="Close Alert"
          :color="alertBoxColor"
          :type="alertBoxType"
          dark
          dismissible
          >{{ alertBoxMessage }}</v-alert
        >
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-form @submit.prevent="addTag">
          <v-container>
            <v-row justify="center" wrap>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="name"
                  label="Tag name"
                  class="purple-input"
                />
              </v-col>
              <v-col cols="12" md="3" class="text-center">
                <v-btn type="submit" color="success" class="mr-0"
                  >Add Tag</v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Tag from "../components/tharikComponents/Tag";
export default {
  name: "Tags",
  components: {
    Tag,
  },
  data() {
    return {
      alertBox: false,
      alertBoxMessage: "",
      alertBoxType: "success",
      alertBoxColor: "red",
      name: "",
    };
  },
  computed: {
    ...mapState(["tharikState", "alert"]),
    availableTags() {
      let tags = this.tharikState.tags;

      let selectTags = [];
      for (var i = 0; i < tags.length; i++) {
        selectTags.push(tags[i].name);
      }
      return selectTags;
    },
  },
  methods: {
    ...mapActions(["addTagAction"]),

    addTag() {
      let payload = {
        name: this.name,
      };

      this.addTagAction(payload);

      this.name = "";
      this.alertBox = true;

      this.alertBoxMessage = this.alert.message;
      this.alertBoxType = this.alert.type;
      this.alertBoxColor = this.alert.color;

    },
  },
};
</script>
