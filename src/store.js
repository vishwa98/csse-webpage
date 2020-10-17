import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import stateTharik from "./storeTharik.js";

import stateVishwa from "./storeVishwa.js";

import stateMr from "./storeMr";


Vue.use(Vuex);

const buildingsURL = "http://localhost:8000/api/buildings";
const roomsURL = "http://localhost:8000/api/addRoom";
const roomListURL = "http://localhost:8000/api/room";
const addbuildingURL = "http://localhost:8000/api/createBuilding";
const allRoomsURL = "http://localhost:8000/api/viewrooms";

const createRouteURL = "http://localhost:8000/api/addRoute";

const listRoutesURL = "http://localhost:8000/api/viewRoutes";

const createInspectorURL = "http://localhost:8000/api/addInspector";

const listInspectorsURL = "http://localhost:8000/api/viewInspectors";

const createDriverURL = "http://localhost:8000/api/addDriver";

const listDriversURL = "http://localhost:8000/api/viewDrivers";

const apiUrl = "http://localhost:8000";

export default new Vuex.Store({
  state: {
    barColor: "rgba(0, 0, 0, .8), rgba(0, 0, 0, .8)",
    barImage:
      "https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-1.jpg",
    drawer: null,
    mrState: stateMr,
    tharikState: { ...stateTharik },

    vishwaState: { ...stateVishwa},

    timeTables: [],
    buildings: [],
    rooms: [],
    routes: [],
    inspectors: [],
    drivers: [],
    alert: {
      success: false,
      message: "",
      color: "",
      type: "",
    },
  },
  mutations: {
    SET_BAR_IMAGE(state, payload) {
      state.barImage = payload;
    },
    SET_DRAWER(state, payload) {
      state.drawer = payload;
    },

    setBuildings(state, buildings) {
      state.buildings = buildings;
    },
    setRooms(state, rooms) {
      state.rooms = rooms;
    },

    setRoutes(state, routes) {
        state.routes = routes;
    },

    setInspectors(state, inspectors) {
        state.inspectors = inspectors;
    },

    setDrivers(state, drivers) {
        state.drivers = drivers;
    },

    //chnaged place
    addNewSessionMutation: (state, payload) => {
      // if the session array is not yet created
      if(!state.mrState.sessions){
        state.mrState = {...state.mrState, sessions: [payload]};
      }else{
        state.mrState.sessions.push(payload);
      }
    },
    editNewSessionMutation: (state, payload) => {
      state.mrState.sessions = state.mrState.sessions.map((x) => {
        if (x.sessionId === payload.oldsessionId) {
          x = {
            ...payload,
          };
        }
        return x;
      });
    },
    deleteNewSessionMutation: (state, payload) => {
      state.mrState.sessions = state.mrState.sessions.filter(
        (x) => x.sessionId !== payload.sessionId
      );
    },




    addStudentBatchMutation: (state, payload) => {
      let bIdExist = false;
      state.tharikState.studentBatches.map((x) => {
        if (x.bId === payload.bId) {
          bIdExist = true;
        }
        return x;
      });
      if (!bIdExist) {
        state.tharikState.studentBatches.push({
          ...payload,
        });
        state.alert = {
          success: true,
          message: "Successfully Added Batch",
          color: "green",
          type: "success",
        };
      } else {
        state.alert = {
          success: false,
          message: "Batch ID Exists",
          color: "red",
          type: "error",
        };
      }
    },
    editStudentBatchMutation: (state, payload) => {
      let bIdExist = false;
      if (payload.bId !== payload.oldBId) {
        state.tharikState.studentBatches.map((x) => {
          if (x.bId === payload.bId) {
            bIdExist = true;
          }
          return x;
        });
      }
      if (!bIdExist) {
        state.tharikState.studentBatches = state.tharikState.studentBatches.map(
          (x) => {
            if (x.bId === payload.oldBId) {
              x = {
                ...payload,
              };
            }
            return x;
          }
        );
        state.alert = {
          success: true,
          message: "Successfully Edited Batch",
          color: "green",
          type: "success",
        };
      } else {
        state.alert = {
          success: false,
          message: "Batch ID Exists",
          color: "red",
          type: "error",
        };
      }
    },
    deleteStudentBatchMutation: (state, payload) => {
      state.tharikState.studentBatches = state.tharikState.studentBatches.filter(
        (x) => x.bId !== payload.bId
      );
    },
    addProgramMutation: (state, payload) => {
      let programExist = false;
      state.tharikState.programs = state.tharikState.programs.map((x) => {
        if (x.name === payload.name) {
          programExist = true;
        }

        return x;
      });
      if (!programExist) {
        state.tharikState.programs.push({
          ...payload,
        });
        state.alert = {
          success: true,
          message: "Successfully Added Program",
          color: "green",
          type: "success",
        };
      } else {
        state.alert = {
          success: false,
          message: "Program Exist",
          color: "red",
          type: "error",
        };
      }
    },
    editProgramMutation: (state, payload) => {
      let programExist = false;
      state.tharikState.programs.map((x) => {
        if (x.name === payload.name) {
          programExist = true;
        }

        return x;
      });
      if (!programExist) {
        let i = 0;
        state.tharikState.programs = state.tharikState.programs.map((x) => {
          if (i === payload.id) {
            x = {
              name: payload.name,
            };
          }
          i++;
          return x;
        });
        state.alert = {
          success: true,
          message: "Successfully Edited Program",
          color: "green",
          type: "success",
        };
      } else {
        state.alert = {
          success: false,
          message: "Program Exist",
          color: "red",
          type: "error",
        };
      }
    },
    deleteProgramMutation: (state, payload) => {
      state.tharikState.programs = state.tharikState.programs.filter(
        (x) => x.name !== payload.name
      );
    },
    addTagMutation: (state, payload) => {
      let tagExist = false;
      state.tharikState.tags = state.tharikState.tags.map((x) => {
        if (x.name === payload.name) {
          tagExist = true;
        }

        return x;
      });
      if (!tagExist) {
        state.tharikState.tags.push({
          ...payload,
        });
        state.alert = {
          success: true,
          message: "Successfully Added Tag",
          color: "green",
          type: "success",
        };
      } else {
        state.alert = {
          success: false,
          message: "Tag Exist",
          color: "red",
          type: "error",
        };
      }
    },
    editTagMutation: (state, payload) => {
      let tagExist = false;
      state.tharikState.tags.map((x) => {
        if (x.name === payload.name) {
          tagExist = true;
        }

        return x;
      });
      if (!tagExist) {
        let i = 0;
        state.tharikState.tags = state.tharikState.tags.map((x) => {
          if (i === payload.id) {
            x = {
              name: payload.name,
            };
          }
          i++;
          return x;
        });
        state.alert = {
          success: true,
          message: "Successfully Added Tag",
          color: "green",
          type: "success",
        };
      } else {
        state.alert = {
          success: false,
          message: "Tag Exist",
          color: "red",
          type: "error",
        };
      }
    },
    deleteTagMutation: (state, payload) => {
      state.tharikState.tags = state.tharikState.tags.filter(
        (x) => x.name !== payload.name
      );
    },
    ADD_NEW_TIME_TABLE(state, payload) {
      state.timeTables.push(payload);
    },
    MODIFY_TIME_TABLE_EVENTS(state, payload) {
      state.timeTables[payload.index].events = payload.events;
    },
    addNewLecturerMutation: (state, payload) => {
      state.mrState.lecturers.push({
        ...payload,
      });
    },
    editNewLecturerMutation: (state, payload) => {
      state.mrState.lecturers = state.mrState.lecturers.map((x) => {
        if (x.rank === payload.oldrank) {
          x = {
            ...payload,
          };
        }
        return x;
      });
    },
    deleteNewLecturerMutation: (state, payload) => {
      state.mrState.lecturers = state.mrState.lecturers.filter(
        (x) => x.rank !== payload.rank
      );
    },
    addNewSubjectMutation: (state, payload) => {
      state.mrState.subjects.push({
        ...payload,
      });
    },
    editNewSubjectMutation: (state, payload) => {
      state.mrState.subjects = state.mrState.subjects.map((x) => {
        if (x.sId === payload.oldsId) {
          x = {
            ...payload,
          };
        }
        return x;
      });
    },
    deleteNewSubjectMutation: (state, payload) => {
      state.mrState.subjects = state.mrState.subjects.filter(

        (x) => x.subjectCode !== payload.subjectCode
      );
    },
    addNewSessionMutation: (state, payload) => {
      state.mrState.sessions.push({
        ...payload,
      });

    },
    editNewSessionMutation: (state, payload) => {
      state.mrState.sessions = state.mrState.sessions.map((x) => {
        if (x.sessionId === payload.oldsessionId) {
          x = {
            ...payload,
          };
        }
        return x;
      });
    },
    deleteNewSessionMutation: (state, payload) => {
      state.mrState.sessions = state.mrState.sessions.filter(
        (x) => x.sessionId !== payload.sessionId

      );
    },

    //consecutive
    addConsecutiveSessionMutation: (state, payload) => {
      state.tharikState.consecutiveSessions.push({
        ...payload,
      });
      state.alert = {
        success: true,
        message: "Successfully Added Tag",
        color: "green",
        type: "success",
      };
    },
    deleteConsecutiveSessionMutation: (state, payload) => {
      let sessions = state.tharikState.consecutiveSessions;
      console.log(sessions);
      let i = 0;
      session = sessions.consecutiveSessions.filter((x) => {
        if (
          x.year == payload.year &&
          x.semester == payload.semester &&
          i == payload.id
        ) {
          return;
        }
        i++;
        return x;
      });
    },
    editConsecutiveSessionMutation: (state, payload) => {
      state.tharikState.consecutiveSessions = state.tharikState.consecutiveSessions.map(
        (x) => {
          if (x.sid === payload.oldSid) {
            x = {
              ...payload,
            };
          }
          return x;
        }
      );
      state.alert = {
        success: true,
        message: "Successfully Added Tag",
        color: "green",
        type: "success",
      };
    },
    //parallel
    addParallelSessionMutation: (state, payload) => {
      state.tharikState.parallelSessions.push({
        ...payload,
      });
      state.alert = {
        success: true,
        message: "Successfully Added Tag",
        color: "green",
        type: "success",
      };
    },
    deleteParallelSessionMutation: (state, payload) => {
      let sessions = state.tharikState.parallelSessions;
      console.log(sessions);
      let i = 0;
      session = sessions.parallelSessions.filter((x) => {
        if (
          x.year == payload.year &&
          x.semester == payload.semester &&
          i == payload.id
        ) {
          return;
        }
        i++;
        return x;
      });
    },
    editParallelSessionMutation: (state, payload) => {
      state.tharikState.parallelSessions = state.tharikState.parallelSessions.map(
        (x) => {
          if (x.sid === payload.oldSid) {
            x = {
              ...payload,
            };
          }
          return x;
        }
      );
      state.alert = {
        success: true,
        message: "Successfully Added Tag",
        color: "green",
        type: "success",
      };
    },
  },
  actions: {

    //Add Routes
    async addStoreRoute(context, payload) {
        await axios.post(createRouteURL, payload);
      },

    //Load Routes
    async setRoutesAction(context) {
        context.commit("setRoutes", (await axios.get(listRoutesURL)).data);
        console.log("Routes options");
    },

    //halts in a route
    async setHaltsByRoomAction(context, slug) {
        let url;

        url = `http://localhost:8000/api/halts/${slug}`;

        context.commit("setRoutes", (await axios.get(url)).data);
      },

    //Add Inspectors
    async addStoreInspector(context, payload) {
        await axios.post(createInspectorURL, payload);

        console.log("Inspector Details", payload);
      },

      //Add Drivers
    async addStoreDriver(context, payload) {
        await axios.post(createDriverURL, payload);

        console.log("Driver Details", payload);
      },

    //Load Inspectors
    async setInspectorsAction(context) {
        context.commit("setInspectors", (await axios.get(listInspectorsURL)).data);
        console.log("Inspector options");
    },

    //Load Drivers
    async setDriversAction(context) {
        context.commit("setDrivers", (await axios.get(listDriversURL)).data);
        console.log("Driver options");
    },

    //Load all buildings
    async setBuildingsAction(context) {
      context.commit("setBuildings", (await axios.get(buildingsURL)).data);
      console.log("Buildings options");
    },
    //Rooms in a building
    async setRoomsByBuildingAction(context, building) {
      let url;
      url = `${roomListURL}/${building}`;
      context.commit("setRooms", (await axios.get(url)).data);
    },
    //Adding building Details
    async addStoreBuildingAction(context, payload) {
      await axios.post(addbuildingURL, payload);
    },
    //times in a room
    async setRoomsByUtAction(context, slug) {
      let url;

      url = `http://localhost:8000/api/ut/${slug}`;

      context.commit("setRooms", (await axios.get(url)).data);
    },
    //Add Rooms
    async addStoreRoom(context, payload) {
      await axios.post(roomsURL, payload);
    },
    //Load all rooms
    async setRoomsAction(context) {
      context.commit("setRooms", (await axios.get(allRoomsURL)).data);

      console.log("Rooms options");
    },
    addStudentBatchAction: ({ commit }, payload) => {
      commit("addStudentBatchMutation", payload);
    },
    editStudentBatchAction: ({ commit }, payload) => {
      commit("editStudentBatchMutation", payload);
    },
    deleteStudentBatchAction: ({ commit }, payload) => {
      commit("deleteStudentBatchMutation", payload);
    },
    addProgramAction: ({ commit }, payload) => {
      commit("addProgramMutation", payload);
    },
    editProgramAction: ({ commit }, payload) => {
      commit("editProgramMutation", payload);
    },
    deleteProgramAction: ({ commit }, payload) => {
      commit("deleteProgramMutation", payload);
    },
    addTagAction: ({ commit }, payload) => {
      commit("addTagMutation", payload);
    },
    editTagAction: ({ commit }, payload) => {
      commit("editTagMutation", payload);
    },
    deleteTagAction: ({ commit }, payload) => {
      commit("deleteTagMutation", payload);
    },
    addNewLecturerAction: ({ commit }, payload) => {
      commit("addNewLecturerMutation", payload);
    },
    editNewLecturerAction: ({ commit }, payload) => {
      commit("editNewLecturerMutation", payload);
    },
    deleteNewLecturerAction: ({ commit }, payload) => {
      commit("deleteNewLecturerMutation", payload);
    },
    addNewSubjectAction: ({ commit }, payload) => {
      commit("addNewSubjectMutation", payload);
    },
    editNewSubjectAction: ({ commit }, payload) => {
      commit("editNewSubjectMutation", payload);
    },
    deleteNewSubjectAction: ({ commit }, payload) => {
      commit("deleteNewSubjectMutation", payload);
    },
    addNewSessionAction: ({ commit }, payload) => {
      commit("addNewSessionMutation", payload);
    },
    editNewSessionAction: ({ commit }, payload) => {
      commit("editNewSessionMutation", payload);
    },
    deleteNewSessionAction: ({ commit }, payload) => {
      commit("deleteNewSessionMutation", payload);
    },

    //database
    addConsecutiveSessionAction: ({ commit }, payload) => {
      commit("addConsecutiveSessionMutation", payload);
    },
    deleteConsecutiveSessionAction: ({ commit }, payload) => {
      commit("deleteConsecutiveSessionMutation", payload);
    },
    editConsecutiveSessionAction: ({ commit }, payload) => {
      commit("editConsecutiveSessionMutation", payload);
    },
    addParallelSessionAction: ({ commit }, payload) => {
      commit("addParallelSessionMutation", payload);
    },
    deleteParallelSessionAction: ({ commit }, payload) => {
      commit("deleteParallelSessionMutation", payload);
    },
    editParallelSessionAction: ({ commit }, payload) => {
      commit("editParallelSessionMutation", payload);
    },
  },
  getters: {
    getTimeTables: (state) => {
      return state.timeTables;
    },
  },
});
