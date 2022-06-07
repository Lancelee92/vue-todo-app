<template>
  <div class="container w-80 mx-auto my-20 px-6 py-6 shadow">

    <h1 class="text-black-600 font-bold font-sans text-4xl text-center">Login</h1>
    <div class="h-0.5 bg-gray-200 w-36 mx-auto mt-2.5"></div>
    <form>
      <div class="mb-6">
        <label for="username" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your
          username</label>
        <input v-model="form.username" id="username"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required>
        <div v-if="errorMsg.bUsername" class="text-red-600 text-left">This field is required</div>
      </div>
      <div class="mb-6">
        <label for="password" class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your
          password</label>
        <input v-model="form.password" type="password" id="password"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required>
        <div v-if="errorMsg.bPassword" class="text-red-600 text-left">This field is required</div>
      </div>
      <!-- <div class="flex items-start mb-6">
        <div class="flex items-center h-5">
          <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required>
        </div>
        <label for="remember" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
      </div> -->
      <div class="text-blue-600 text-left my-8">
        <router-link to="/Registration">Register Now</router-link>
      </div>
      <button v-on:click="LoginUser($event)"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
    </form>

  </div>
</template>

<script>
export default {
  name: 'Login-Page',
  data() {
    let val = {
      username: '',
      password: '',
    }

    return {
      form: val,
      errorMsg: {
        bUsername: false,
        bPassword: false,
      }
    }
  },
  beforeMount() {
    if (localStorage.getItem('token') != null) {
      localStorage.removeItem('token');
    }
  },
  methods: {
    LoginUser($event) {
      $event.preventDefault();

      this.$data.errorMsg.bUsername = false;
      this.$data.errorMsg.bPassword = false;

      if (this.$data.form.username == '') {
        this.$data.errorMsg.bUsername = true
      }
      if (this.$data.form.password == '') {
        this.$data.errorMsg.bPassword = true
      }

      // Simple POST request with a JSON body using fetch
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: this.$data.form.username,
          pwd: this.$data.form.password,
        })
      };

      fetch("http://localhost:3000/Login", requestOptions)
        .then(response => {
          return response.text();
        })
        .then(data => {
          const objResp = JSON.parse(data);

          if (objResp['Status'] && objResp['Status'] == '200' && objResp['Data'] == 'Success!') {
            localStorage.setItem('token', objResp['Token']);

            this.$router.push({ path: '/' });
          }
          else {
            alert(objResp['Data']);
          }

        });
    }
  }
};
</script>

<style>
</style>