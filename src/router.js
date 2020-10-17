import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("@/views/dashboard/Index"),
      children: [
        // Dashboard
        {
          name: "Dashboard",
          path: "/",
          component: () => import("@/views/dashboard/Dashboard"),
        },
        {
          name: "Notifications",
          path: "components/notifications",
          component: () => import("@/views/dashboard/component/Notifications"),
        },
        {
          name: "Tags",
          path: "components/icons",
          component: () => import("@/views/dashboard/component/Icons"),
        },
        {
          name: "Locations",
          path: "components/typography",
          component: () => import("@/views/dashboard/component/Typography"),
        },
        // Tables
        {
          name: "Buildings",
          path: "tables/regular-tables",
          component: () => import("@/views/dashboard/tables/RegularTables"),
        },
        // Upgrade
        {
          name: "Upgrade",
          path: "upgrade",
          component: () => import("@/views/dashboard/Upgrade"),
        },
        //Rooms
        {
          name: "Rooms",
          path: "tables/room",
          component: () => import("@/views/dashboard/vishwa/Rooms"),
        },
        //Add Rooms
        {
          name: "Add Room",
          path: "tables/addroom",
          component: () => import("@/views/dashboard/vishwa/Addroom"),
        },
        //Add Routes
        {
            name: "Add Route",
            path: "tables/addroute",
            component: () => import("@/views/dashboard/vishwa/AddRoute"),
          },
          //All Routes
        {
            name: "All Routes",
            path: "tables/allroutes",
            component: () => import("@/views/dashboard/vishwa/AllRoutes"),
          },
        //Halts for a route
        {
            name: "Halts",
            path: "halts/:slug",
            component: () => import("@/views/dashboard/vishwa/HaltsForRoutes"),
          },
          //Add Inspector
        {
            name: "Add Inspector",
            path: "tables/addinspector",
            component: () => import("@/views/dashboard/vishwa/AddInspector"),
          },
          //Add Driver
        {
            name: "Add Driver",
            path: "tables/addDriver",
            component: () => import("@/views/dashboard/vishwa/AddDriver"),
        },
          //All Inspectors
        {
            name: "All Inspectors",
            path: "tables/allinspectors",
            component: () => import("@/views/dashboard/vishwa/AllInspectors"),
          },
        //All Drivers
        {
            name: "All Drivers",
            path: "tables/alldrivers",
            component: () => import("@/views/dashboard/vishwa/AllDrivers"),
          },
        //Rooms in a building
        {
          name: "Rooms",
          path: "tables/:building",
          component: () => import("@/views/dashboard/vishwa/Roomforbuilding"),
        },
        //Times in a building
        {
          name: "Times",
          path: "roomut/:slug",
          component: () => import("@/views/dashboard/vishwa/Unavailabletimes"),
        },
        //Add Building
        {
          name: "Add building",
          path: "components/addnewbuilding",
          component: () => import("@/views/dashboard/vishwa/Addbuilding"),
        },
        //Dashboard stats
        {
          name: "Statistics Dashboard",
          path: "components/dashstats",
          component: () => import("@/views/dashboard/Dashboardstatistics"),
        },
        //Lecturer statistics
        {
          name: "Lecturer Statistics",
          path: "components/lecgraphs",
          component: () => import("@/views/dashboard/vishwa/Lecturergraph"),
        },
        //Lect statistics
        {
            name: "Lecturer Statistics",
            path: "components/lecstats",
            component: () => import("@/views/dashboard/vishwa/Lecstats"),
          },
        //Student statistics
        {
          name: "Student statistics",
          path: "components/studentgraphs",
          component: () => import("@/views/dashboard/vishwa/Studentgraph"),
        },
        //Subjects graph
        {
          name: "Subjects Statistics",
          path: "components/subjects",
          component: () => import("@/views/dashboard/Subjects"),
        },
        //Subjects graph
        {
            name: "Subjects Statistics",
            path: "components/subjectstatistics",
            component: () => import("@/views/dashboard/vishwa/Subjectstats"),
          },
        //Buidings Display
        {
          name: "Buildings",
          path: "components/allbuildings",
          component: () => import("@/views/dashboard/vishwa/Allbuildings"),
        },
        //Lecturer Page
        {
          name: "Lecturers",
          path: "pages/lecturerpage",
          component: () => import("@/views/dashboard/pages/lecturerPage"),
          children: [
            //add lecturer
            {
              name: "Add new lecturer",
              path: "addNewLecturer",
              component: () =>
                import(
                  "@/views/dashboard/components/mrComponents/AddNewLecturer"
                ),
            },
            //view lecturer
            {
              name: "View Lecturer",
              path: "view",
              component: () =>
                import(
                  "@/views/dashboard/components/mrComponents/ViewLecturer"
                ),
            },


            //new view all lecturer
            {
              name: "View All Lecturer",
              path: "viewall",
              component: () =>
                import(
                  "@/views/dashboard/components/mrComponents/ViewAllLecturers"
                ),
            },


          ],
        },
        //Subject Page
        {
          name: "Subjects",
          path: "pages/subjectpage",
          component: () => import("@/views/dashboard/pages/subjectPage"),
          children: [
            //add subject
            {
              name: "Add new subject",
              path: "addNewSubject",
              component: () =>
                import(
                  "@/views/dashboard/components/mrComponents/AddNewSubject"
                ),
            },
            //view subject
            {
              name: "View Subject",
              path: "view",
              component: () =>
                import("@/views/dashboard/components/mrComponents/ViewSubject"),
            },

            //new view all page
            {
              name: "View All Subject",
              path: "viewall",
              component: () =>
                import("@/views/dashboard/components/mrComponents/ViewAllSubjects"),
            },

          ],
        },
        //Session Page
        {
          name: "Sessions",
          path: "pages/sessionpage",
          component: () => import("@/views/dashboard/pages/sessionPage"),
          children: [
            //add session
            {
              name: "Add new session",
              path: "addNewSession",
              component: () =>
                import(
                  "@/views/dashboard/components/mrComponents/AddNewSession"
                ),
            },
            //view session
            {
              name: "View Session",
              path: "view",
              component: () =>
                import(
                  "@/views/dashboard/components/mrComponents/ViewSession"
                ),
            },


            //new view all session
            {
              name: "View All Session",
              path: "viewall",
              component: () =>
                import(
                  "@/views/dashboard/components/mrComponents/ViewAllSessions"
                ),
            },


          ],
        },
        //student page
        {
          name: "Students",
          path: "pages/student",
          component: () => import("@/views/dashboard/pages/studentPage"),
          children: [
            //add student batch
            {
              name: "Add new Student Batch",
              path: "",

              component: () =>
                import(
                  "@/views/dashboard/components/tharikComponents/AddStudentBatchForm"
                ),
            },
            //view student batch
            {
              name: "View Student Batch",
              path: "view",
              component: () =>
                import(
                  "@/views/dashboard/components/tharikComponents/ViewStudentBatch"
                ),
            },
            //crud programs
            {
              name: "Programs",
              path: "program",
              component: () =>
                import(
                  "@/views/dashboard/components/tharikComponents/Programs"
                ),
            },
          ],
        },
        // tag Page
        {
          name: "Tags",
          path: "pages/tag",
          component: () => import("@/views/dashboard/pages/Tags"),
        },
        // Working days and hours
        {
          name: "Working Days & Hours",
          path: "working-days",
          component: () => import("@/views/Third/AddWorkingDaysHours"),
        },
        // Time Tables
        {
          name: "Time Tables",
          path: "time-tables",
          component: () => import("@/views/Third/TimeTableList"),
        },
        // Time Tables
        {
          name: "Edit Time Table",
          path: "time-tables/edit/:id",
          component: () => import("@/views/Third/EditCalender"),
        },
        //Sessions page
        {
          name: "session Group",
          path: "pages/sessionGroup",
          component: () => import("@/views/dashboard/pages/sessionsGroupPage"),
          children: [
            //add consecutive session
            {
              name: "Add Consecutive Session",
              path: "",
              component: () =>
                import(
                  "@/views/dashboard/components/tharikComponents/AddConsecutiveSessionForm"
                ),
            },
            //view Consecutive Session
            {
              name: "View Consecutive Session",
              path: "viewconsecutive",
              component: () =>
                import(
                  "@/views/dashboard/components/tharikComponents/ViewConsecutiveSession"
                ),
            },
            //Add parallel Session
            {
              name: "Add Parallel Session",
              path: "addparallel",
              component: () =>
                import(
                  "@/views/dashboard/components/tharikComponents/AddParallelSessionForm"
                ),
            },
            //view Parallel session
            {
              name: "View Parallel Session",
              path: "viewparallel",
              component: () =>
                import(
                  "@/views/dashboard/components/tharikComponents/ViewParallelSession"
                ),
            },
          ],
        },
      ],
    },
  ],
});
