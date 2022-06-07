<template>
    <div class="container w-80 mx-auto my-20 px-6 py-6 shadow">

        <h1 class="text-black-600 font-bold font-sans text-4xl text-center">Add / Edit Todo</h1>
        <div class="h-0.5 bg-gray-200 w-36 mx-auto mt-2.5"></div>
        <form>
            <div class="mb-6">
                <label for="Title"
                    class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                <input v-model="form.title" id="Title"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required>
                <div v-if="errorMsg.bTitle" class="text-red-600 text-left">This field is required</div>
            </div>
            <div class="mb-6">
                <label for="Description"
                    class="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                <textarea v-model="form.desc" id="Description"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required></textarea>
                <div v-if="errorMsg.bDesc" class="text-red-600 text-left">This field is required</div>
            </div>
            <button v-on:click="AddEditTodo($event)"
                class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</button>
        </form>

    </div>
</template>

<script>
export default {
    name: 'Edit-Page',
    data() {
        let val = {
            id: '',
            title: '',
            desc: ''
        }

        return {
            form: val,
            errorMsg: {
                bTitle: false,
                bDesc: false
            }
        }
    },
    beforeMount() {
        const requestOptions = {
            method: "GET",
            headers: { "Authorization": "Bearer " + localStorage.getItem('token') },
        };

        if (this.$route.params.id) {
            fetch("http://localhost:3000/Api/todo/" + this.$route.params.id, requestOptions)
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    const objResp = JSON.parse(data);
                    
                    if (objResp['Status'] && objResp['Status'] == '200') {
                        this.$data.form.id = objResp['Data']['_id'];
                        this.$data.form.title = objResp['Data']['title'];
                        this.$data.form.desc = objResp['Data']['description'];
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
    methods: {
        AddEditTodo($event) {
            $event.preventDefault();

            this.$data.errorMsg.bTitle = false;
            this.$data.errorMsg.bDesc = false;

            if (this.$data.form.title == '') {
                this.$data.errorMsg.bTitle = true
            }
            if (this.$data.form.desc == '') {
                this.$data.errorMsg.bDesc = true
            }

            // Simple POST request with a JSON body using fetch
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json", "Authorization": "Bearer " + localStorage.getItem('token') },
                body: JSON.stringify({
                    id: this.$data.form.id,
                    title: this.$data.form.title,
                    description: this.$data.form.desc
                })
            };
            
            fetch("http://localhost:3000/Api/todo", requestOptions)
                .then(response => {
                    return response.text();
                })
                .then(data => {
                    const objResp = JSON.parse(data);

                    if (objResp['Status'] && objResp['Status'] == '200') {
                        this.$router.push({ path: '/' });
                    }
                    else {
                        if (objResp['Status'] == '100') {
                            return this.$router.push({ path: '/login' });
                        }
                        alert(objResp['Data']);
                    }

                });
        }
    }
};
</script>

<style>
</style>