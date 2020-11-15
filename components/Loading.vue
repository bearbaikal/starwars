<template>
	<v-dialog v-model="loading" fullscreen>
	  <v-container fluid fill-height style="background-color: rgba(255, 255, 255, 0.9);">
	    <v-layout justify-center align-center>
	      <v-progress-circular
	        indeterminate
	        color="primary">
	      </v-progress-circular>
	    </v-layout>
	  </v-container>
	</v-dialog>
</template>
<script>
	export default {
  	computed: {
  		loading() {
  			return this.$store.state.loading
  		}
  	}
	}
</script>