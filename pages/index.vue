<template>
	<v-row>
		<v-col cols="2"></v-col>
		<v-col cols="8">
		  <v-row>
		    <v-col md="6" xs="12" v-for="(person, pers_index) in people" :key="person.name"  style="height:100%">
		      <v-card class="person-card">
		      	<h1>{{ person.name }}</h1>
		      	<v-row>
		      		<v-col cols="6">
				        <div>Gender: {{ person.gender }}</div>
				        <div>Height: {{ person.height }}</div>
				        <div>Mass: {{ person.mass }}</div>
			        </v-col>
			        <v-col cols="6">
			        	<b>Vehicles</b>
			        	<ul v-if="person.vehicles.length">
			        		
			        		<li v-for="(vehicle, veh_index) in vehicles[pers_index]">
			        			{{ vehicle['name'] }}
			        		</li>
			        	</ul>
			        	<div v-else>I don't have vehicle :)</div>
							</v-col>			        	
		        </v-row>
		      </v-card>
		    </v-col>
		  </v-row>
      <v-pagination
          v-model="paginator.page"
          v-if="!paginator.loading"
          @input="get_people"
          :length="paginator.pages_count"
          :total-visible="16"
          class="my-2 mx-15">
      </v-pagination>
	  </v-col>
  </v-row>
</template>

<script>
	import axios from 'axios'
	export default {
	  data: () => ({
	  	people: [],
	  	vehicles: [],
			paginator: { page:1, pages_count:1, loading:true }
	  }),
	  created() {
	  	this.get_people()
  	},
	  methods: {
	  	get_people(){
        axios.get("https://swapi.dev/api/people/", {
        	params: { page: this.paginator.page}
        }).then(response => {
        	let data = response.data
          this.people = data.results
          this.vehicles = []
          this.get_vehicles()
          this.paginator.pages_count = Math.floor(data.count/10) + 1
          this.paginator.loading = false
        })
	  	},
	  	get_vehicles(){
	  		this.people.forEach((pers, pers_index, pers_arr) => {
	  			this.vehicles.push([])
	  			if (pers.vehicles.length) {
		  			pers.vehicles.forEach((veh_link, veh_index, veh_arr) => {
			        axios.get(veh_link, {
	  		      }).then(response => {
	  		      	let veh_name = response.data.name
	  		      	this.vehicles[pers_index].push({ name: veh_name, link: veh_link })
			      	})
	  				})
					}				
	  		})
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
