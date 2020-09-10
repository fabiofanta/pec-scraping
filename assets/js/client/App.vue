<template>
	<section>
		<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
			<a class="navbar-brand" href="#">PECScraping</a>
		</nav>
		<section class="container mt-5">
			<form  @submit.prevent= "searchVat()" >
				<div class="form-group">
					<label for="vatInput">VAT Code</label>
						<input v-model= "search" type="text" name="vat" class="form-control" id="vatInput" aria-describedby="vatInput" placeholder="Enter VAT Code">
						<small id="vatInput" class="form-text text-muted">Insert VAT Code, without letters. Wait 30 seconds</small>
				</div>
				<button v-if="spin === false" type="submit" class="btn btn-primary">Search</button>
			</form>
		</section>
		<section class="container mt-5">
			<div v-if="spin === true" class="spinner-border"></div>
			<div v-else-if="justmounted === false" class="alert alert-success" role="alert">
			 		{{ payload }}
			</div>
		</section>
	</section>
</template>

<script>

import axios from 'axios';

export default {
	data() {
            return {
                search: '',
				payload: '',
				spin: false,
				justmounted:true
            }
        },
	methods: {
		searchVat() {
			var self = this;
			if (self.spin === false ) {
				self.spin = true;
				self.justmounted = true;
			}
			axios.post('/',this.search,{
				headers: {
	        		'Content-Type': 'text/plain',
					'X-Requested-With': 'XMLHttpRequest'
	    		}
			})
			.then(function (response) {
				console.log(response);
				self.payload = response.data.pec;
				self.spin = false;
				self.justmounted = false;

			});
		}
	}
}
</script>

<style>
@import url(https://bootswatch.com/4/minty/bootstrap.min.css);
</style>
