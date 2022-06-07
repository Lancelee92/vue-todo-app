<template>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="m-6 float-left">
            <router-link to="/"
                class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
                Back to Home
            </router-link>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        User
                    </th>                    
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row"
                        class="px-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {{ item.username }}
                    </th>                    
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Users-Page',    
    data() {
        const list = [];

        return {
            list: list
        };
    },
    beforeMount() {
        const requestOptions = {
            method: "GET",
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        };

        fetch("http://localhost:3000/Api/GetUsers", requestOptions)
            .then(response => {
                return response.text();
            })
            .then(data => {
                const objResp = JSON.parse(data);
                console.log(objResp);
                if (objResp['Status'] && objResp['Status'] == '200') {
                    this.$data.list = objResp['Data'];
                }
                else {
                    if (objResp['Status'] == '100') {
                        return this.$router.push({ path: '/login' });
                    }
                    alert(objResp['Data']);
                }

            });


    }
};


</script>

<style>
</style>