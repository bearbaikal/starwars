<template>
	<v-row>
		<v-col cols="2"></v-col>
		<v-col cols="8">
		  <v-row>
		    <v-col md="12" xs="12">
		      <v-card class="person-card">
		      	<h1>{{ person.name }}</h1>
		      	<v-row>
		      		<v-col xs="6">
				      	Height: {{ person.height }}<br>
				      	Mass: {{ person.mass }}<br>
				      	Skin color: {{ person.grey }}<br>
				      	Hair color: {{ person.hair_color }}<br>
				      	Eye color: {{ person.eye_color }}<br>
				      	Birth year: {{ person.birth_year }}<br>
			      	</v-col>
			      	<v-col>
			      		<b>Films</b>
			      		{{ films }}
			      		<ul>
			      			<li>
	      					</li>
		      			</ul>
		      		</v-col>
		      	</v-row>
		      	<NuxtLink to="/people">Back to list</NuxtLink>
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
        axios.get("https://swapi.dev/api/people/" + this.$route.params.id, {
        }).then(response => {
          this.person = response.data
          console.log(this.person)
	  			if (this.person.films.length) {
		  			this.person.films.forEach((film_link, undefined, film_arr) => {
			        axios.get(film_link, {
	  		      }).then(response => {
	  		      	let film_title = response.data.title
	  		      	this.films.push({ title: film_title })
			      	})
	  				})
					}				
        })
	  	}
  	}
	}
</script>
<style scoped>
</style>
