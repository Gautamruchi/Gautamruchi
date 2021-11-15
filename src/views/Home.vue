<template>
  <div id="app">
    <h1>My To-Do List</h1>
    <button class="btn btn-blue" type="submit" @click="addUser">
      Add todo
    </button>
    <div class="card grid grid-cols-1 md:grid-cols-4" v-if="list">
      <div class="py-2 px-4 m-2.5" v-for="item in list" :key="item.id">
        <div class="image">
          <img
            src="https://avatars.dicebear.com/v2/avataaars/Leanne Graham.svg?options[mood][]=happy"
            alt="username"
          />
        </div>
        <div>
          {{ item.name }}
        </div>
        <div>
          {{ item.email }}
        </div>
        <div>
          {{ item.phone }}
        </div>
        <div>
          {{ item.website }}
        </div>
        <div class="buttons">
          <ul class="flex-1 bg-gray-300 p-1 justify-around text-canter">
            <li class="pointer pr-5 text-red-600"><font-awesome-icon icon="heart" /></li>
            <li class="pointer pr-5" id="li-border " @click="editList(item)">
              <font-awesome-icon class="" icon="edit" />
            </li>
            <li class="cursor-pointer text-red-600" @click="deletData(item)"> <font-awesome-icon icon="trash" /></li>
          </ul>
        </div>
        <div v-if="isModalVisible">
          <add :data="singleData" @closeDilog="closeModel($event)" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import VueAxios from "vue-axios";
import axios from "axios";
import Add from "../views/Add.vue";
import { ref, computed } from "vue";

export default {
  name: "app",
  components: {
    Add,
  },
  setup(ctx) {
    const list = ref([]);
    const isModalVisible = ref(false);
    const singleData = ref("");
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => (list.value = res.data));

    const closeModel = (data) => {
      console.log(data, "titletitle");
      isModalVisible.value = data.close;
      if (data.id) {
        list.value.forEach((element) => {
          if (element.id == data.id) {
            element.name = data.name;
            element.email = data.email;
          }
        });
      } else {
        list.value.push(data);
      }
    };

    const editList = (item) => {
      singleData.value = item;
      isModalVisible.value = true;
    };

    const deletData = (item) => {
      const newList = list.value.filter((e) => {
        return e.name != item.name;
      });
      list.value = newList;
    };

    const addUser = () => {
      singleData.value = "";
      isModalVisible.value = true;
    };
    return {
      list,
      isModalVisible,
      closeModel,
      data: undefined,
      singleData,
      editList,
      deletData,
      addUser,
    };
  },

  methods: {},
};
</script>

<style>
ul {
  all: unset;
}

li {
  all: unset;
  @apply flex-1 m-1.5;
}

.btn {
  @apply font-bold py-2 px-4 m-2.5 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>
