<template>

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="m-6 float-right">
            <router-link to="/AddEdit"
                class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button">
                Add
            </router-link>
        </div>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="w-4/12 px-6 py-3">
                        Title
                    </th>
                    <th scope="col" class="w-6/12 px-6 py-3">
                        Description
                    </th>
                    <th scope="col" class="w-2/12 px-6 py-3">
                        <span class="sr-only">Edit</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.id"
                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row"
                        class="w-4/12 px-6 py-3 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                        {{ item.title }}
                    </th>
                    <td class="w-6/12 px-6 py-3">
                        {{ item.description }}
                    </td>
                    <td class="w-2/12 px-6 py-3 text-right">
                        <div>
                            <router-link :to="{ path: '/AddEdit/' + item._id }"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</router-link>
                        </div>
                        <div>
                            <a v-on:click="Delete(item._id)" href="javascript:void(0)"
                                class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'Todo-Page',
    methods: {
        Delete(id) {            

            const requestOptions = {
                method: "DELETE",
                headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
            };
            fetch("http://localhost:3000/Api/todo/" + id, requestOptions)
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    const objResp = JSON.parse(data);

                    if (objResp['Status'] && objResp['Status'] == '200') {
                        window.location.reload();
                    }
                    else {
                        if (objResp['Status'] == '100') {
                            return this.$router.push({ path: '/login' });
                        }
                        alert(objResp['Data']);
                    }

                });
        }
    },
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

        fetch("http://localhost:3000/Api/todo", requestOptions)
            .then(response => {
                return response.text();
            })
            .then(data => {
                const objResp = JSON.parse(data);
                
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