<template>
	<v-dialog v-model="loading" fullscreen>
	  <v-container fluid fill-height class="progress">
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
		props: {
			loading: Boolean
		}
	}
</script>
<style scoped>
	.progress{background-color: rgba(255, 255, 255, 0.2);}
</style>