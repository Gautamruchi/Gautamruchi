<template>
  <div id="app">
    <h1>My To-Do List</h1>
    <button class="btn btn-blue" type="submit" @click="addUser">
      Add todo
    </button>
    <div class="card grid grid-cols-1 md:grid-cols-4" v-if="list">
      <div class="py-2 px-4 m-2.5" v-for="item in list" :key="item.id">
        <div class="image" data-v-3ed2ff7e="">
          <img
            src="https://avatars.dicebear.com/v2/avataaars/Leanne Graham.svg?options[mood][]=happy"
            alt="username"
            data-v-3ed2ff7e=""
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
        <div class="buttons" data-v-3ed2ff7e="">
          <ul data-v-3ed2ff7e="">
            <li class="pointer" data-v-3ed2ff7e="">Like</li>
            <li
              class="pointer"
              id="li-border"
              data-v-3ed2ff7e=""
              @click="editList(item)"
            >
              Edit
            </li>
            <li data-v-3ed2ff7e="" class="pointer" @click="deletData(item)">
              Delete
            </li>
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
    fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
      res.json().then((data) => (list.value = data))
    );

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

    const deletData = (item)=> {
      const newList = list.value.filter((e) => {
        return e.name != item.name;
      });
     list.value = newList;
    }

    const addUser =()=>{
       singleData.value = '';
      isModalVisible.value = true;
    }
    return {
      list,
      isModalVisible,
      closeModel,
      data: undefined,
      singleData,
      editList,
      deletData,
      addUser
    };
  },

  methods: {
    
  },
};
</script>

<style>
.mylist {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
ul {
  all: unset;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fafafa;
  border-top: 1px solid #e8e8e8;
}

li {
  all: unset;
  flex: 1;
  margin: 12px 0;
}
.pointer {
  cursor: pointer;
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
