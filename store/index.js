export const state = () => ({
  loading: true
})

export const mutations = {
	update_loading(state, value){
		state.loading = value
	}
}