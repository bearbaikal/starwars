<template>
	<v-row>
		<v-col cols="2"></v-col>
		<v-col cols="8">
		  <v-row>
		    <v-col md="12" xs="12">
		      <v-card class="person-card">
		      	<h1>{{ person.name }}</h1>
		      	Height: {{ person.height }}
		      	Hair color: {{ person.hair_color }}
		      	Eye color: {{ person.eye_color }}
		      	Birth year: {{ person.birth_year }}
		      </v-card>
		    </v-col>
		  </v-row>
	  </v-col>
  </v-row>
</template>

<script>
	import axios from 'axios'
	export default {
	  data: () => ({
	  	person: {},
	  	films: []
	  }),
	  created() {
	  	this.get_person()
  	},
	  methods: {
	  	get_person(){
	  		let person_number = this.$route.params.id
	  		let page_number = Math.floor(person_number/10)
	  		person_number - page_number * 10 ? page_number++ : undefined;
	  		let person_index = person_number - (page_number - 1) * 10 -1
        axios.get("https://swapi.dev/api/people/", {
        	params: { page: page_number}
        }).then(response => {
          this.person = response.data.results[person_index]
          this.get_films()
        })
	  	},
	  	get_films(){
	  		// this.people.forEach((pers, pers_index, pers_arr) => {
	  		// 	this.vehicles.push([])
	  		// 	if (pers.vehicles.length) {
		  	// 		pers.vehicles.forEach((veh_link, veh_index, veh_arr) => {
			  //       axios.get(veh_link, {
	  		//       }).then(response => {
	  		//       	let veh_name = response.data.name
	  		//       	this.vehicles[pers_index].push({ name: veh_name, link: veh_link })
			  //     	})
	  		// 		})
					// }				
	  		// })
	  	}
  	}
	}
</script>
<style scoped>
	h1{font-size:1.2rem;}
	.person-card{padding:20px 30px 10px;min-width:300px;}
	ul{list-style-type:none;padding-left:0;}
	li{padding-left:0;}
</style>
