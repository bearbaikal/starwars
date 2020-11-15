<template>
	<v-row>
		<v-col cols="2"></v-col>
		<v-col cols="8">
		  <v-row justify="center" align="center">
		    <v-col cols="6" v-for="(person, pers_index) in people" :key="person.name">
		      <v-card class="person-card">
		        <h1>{{ person.name }}</h1>
		        <div>Gender: {{ person.gender }}</div>
		        <div>Height: {{ person.height }}</div>
		        <div>Mass: {{ person.mass }}</div>
	        	<ul v-if="person.vehicles.length">
	        		<li v-for="(vehicle, veh_index) in vehicles[pers_index]">
	        			{{ vehicle['name'] }}
	        		</li>
	        	</ul>
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
	  	people: [],
	  	vehicles: []
	  }),
	  created() {
	  	this.get_people()
  	},
	  methods: {
	  	get_people(){
        axios.get("https://swapi.dev/api/people/", {
        }).then(response => {
          //console.log(response.data)
          this.people = response.data.results
          this.get_vehicles()
        })
	  	},
	  	get_vehicles(){
	  		this.people.forEach((pers, pers_index, pers_arr) => {
	  			this.vehicles.push([])
	  			if (pers.vehicles.length) {
	  				console.log(pers_index)
		  			pers.vehicles.forEach((veh_link, veh_index, veh_arr) => {
			        axios.get(veh_link, {
	  		      }).then(response => {
	  		      	let veh_name = response.data.name
	  		      	console.log(veh_link)
	  		      	console.log(veh_name)
	  		      	this.vehicles[pers_index].push({link: veh_link, name: veh_name})
			      	})
	  				})
					}				
	  		})
	  		console.log("Vehicles:")
	  		console.log(this.vehicles)
	  	}
  	}
	}
</script>
<style scoped>
	h1{font-size:1.2rem;}
	.person-card{padding:10px 30px;}
</style>
