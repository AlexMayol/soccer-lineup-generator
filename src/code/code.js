var theme = Vue.component('theme-picker', {
  data: function () {
    return {
      theme: 'default'
    }
  },
  watch:{
    theme: function(){
      document.body.removeAttribute("class")
      document.body.classList.add(this.theme);
    }
  },
  template: `<select v-model="theme">
              <option value="dark">Dark green</option>
              <option value="light">Light green</option>
            </select>`
})


new Vue({
  el: "#app",
  components:{
    'theme-picker':theme
  },
  data: {
    formaciones: {
      "3-4-3": "_3-4-3",
      "4-3-3": "_4-3-3",
      "2-5-3": "_2-5-3",
      "2-1-4-3": "_2-1-4-3",
      "3-3-4": "_3-3-4",
      "1-3-2-4": "_1-3-2-4",
      "2-2-2-4": "_2-2-2-4",
      "2-4-4": "_2-4-4",
      "1-5-4": "_1-5-4",
      "2-1-3-4": "_2-1-3-4",
      "1-4-5": "_1-4-5",
      "2-3-5": "_2-3-5"
    },
    formacionActual: '_3-4-3',

    leagues: [],

    selectedLeague: null,

    teams: [],
    selectedTeam: null,


    players: [],
    selectedPlayers: [],
  },
  watch: {
    selectedLeague: function () { //generate team based on league
      for (let i = 0; i < this.leagues.length; i++) {
        console.log(this.leagues[i].name);
        if (this.leagues[i].name == this.selectedLeague) {
          this.teams = this.leagues[i].teams;
        }
      }
    },
    selectedTeam: function () {
      for (let i = 0; i < this.teams.length; i++) {
        console.log(this.teams[i].name);
        if (this.teams[i].name == this.selectedTeam) {
          this.players = this.teams[i].players;
        }
      }
    }
  },
  mounted() {
    let self = this;

    axios
      .get("https://api.myjson.com/bins/ay44u")
      .then(function (response) {
        self.leagues = response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    let a = 0;
    while (a < 11) {
      var player = {
        name: "Jugador",
        src: "https://images.vexels.com/media/users/3/129733/isolated/preview/a558682b158debb6d6f49d07d854f99f-casual-male-avatar-silhouette-by-vexels.png",
        profile: "https://www.google.com/"
      }

      this.selectedPlayers.push(player)
      a++;
    }

  },
  methods: {
    snapshot() {
      let img = document.querySelector(".field");
      html2canvas(img).then(function (canvas) {
        document.body.appendChild(canvas);
      });
    }
  }
});
