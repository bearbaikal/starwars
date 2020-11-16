<template>
	<v-row>
		<v-col cols="2"></v-col>
		<v-col cols="8">
		  <v-row>
		    <v-col md="6" xs="12" v-for="(person, person_index) in people" :key="person.name"  style="height:100%">
		      <v-card class="person-card">
		      	<h1>{{ person.name }}</h1>
		      	<v-row>
		      		<v-col xs="6">
				        <div>Gender: {{ person.gender }}</div>
				        <div>Height: {{ person.height }}</div>
				        <div>Mass: {{ person.mass }}</div>
			        </v-col>
			        <v-col xs="6">
			        	<b>Vehicles</b>
			        	<ul v-if="person.vehicles.length">
			        		<li v-for="(vehicle, vehicle_index) in vehicles[person_index]">
			        			{{ vehicle['name'] }}
			        		</li>
			        	</ul>
			        	<div v-else>I don't have vehicle :)</div>
							</v-col>			        	
		        </v-row>
		        <NuxtLink :to="person.app_url">More info</NuxtLink>
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
      <Loading :loading="loading"/>
	  </v-col>
  </v-row>
</template>

<script>
	import axios from 'axios'
	var count = 0
	export default {
	  data: () => ({
	  	people: [],
	  	vehicles: [],
			paginator: { page:1, pages_count:1, loading:true },
			loading: true
	  }),
	  created() {
	  	this.get_people( () => {
        count--
        0 == count ? this.loading = false : undefined;
	    })
  	},
	  methods: {
	  	get_people(callback){
        axios.get("https://swapi.dev/api/people/", {
        	params: { page: this.paginator.page}
        }).then(response => {
        	let data = response.data
          this.people = data.results
          this.vehicles = []
		  		this.people.forEach((person, person_index, people_array) => {
		  			this.vehicles.push([])
		  			people_array[person_index].app_url = "/people/" + person.url.split("/")[5]
		  			if (person.vehicles.length) {
		  				count += person.vehicles.length
			  			person.vehicles.forEach((vehicle_link) => {
				        axios.get(vehicle_link, {
		  		      }).then(response => {
		  		      	callback()
		  		      	let vehicle_name = response.data.name
		  		      	this.vehicles[person_index].push({ name: vehicle_name })
				      	})
		  				})
						}				
		  		})
          this.paginator.pages_count = Math.floor(data.count/10) + 1
          this.paginator.loading = false
        })
	  	}
  	}
	}
</script>