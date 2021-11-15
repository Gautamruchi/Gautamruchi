<template>
  <div class=" fixed inset-0 bg-black flex justify-center items-center">
    <div class="modal bg-gray-50 overflow-auto flex-col shadow-md">
   <header class="flex relative bg-blue-500 p-3 justify-between">
        <slot name="header">
        Add 
        </slot>
        <button
          type="button"
          @click="close"
        >
          x
        </button>
      </header>
    <div>
                <!-- class="absolute inset-0 text-sm p-4 bg-opacity-5 bg-purple-600 border-none cursor-pointer" -->

       <section class="relative p-5">
    <form @submit.prevent="handelSubmit">
      <label class="p-1">Name</label>
      <input type="text" class="rounded text-pink-500 p-1"  required v-model="name" />
      <div v-if="name">{{ nameError }}</div>
      <label class=" p-1">Email</label>
      <input type="email" class="rounded text-pink-500 p-1"  required v-model="email" />

      <div class="submit">
        <button class="btn btn-blue" type="submit">Add todo</button>
      </div>
    </form>
     </section>
  </div>
    </div>
  </div>
  
</template>
<script>
import { ref, computed, withCtx } from "vue";
import { onMounted } from "vue";
export default {
  name: "Add",
  props:{data: Object},
   emits: ['close:false'],
  setup(props,{emit}) {
    console.log(props.data,"!!!!!!!!!!!!!!!!!!!!!!!!")
    const name = ref('');
    const email = ref('');
    const nameError = ref("");
    const id = ref("");
      
    const handelSubmit =()=> {
      if (name.value.length < 5) {
        nameError.value =
          name.value.length > 5 ? "" : "Name must be at least 6 char";
        return;
      } else {
         const data ={
        name:name.value,
        email:email.value,
        id:id.value,
        close:false
      }
      emit('closeDilog',data)
      }
    }

    const close =() =>{
      const data ={
        name:name.value,
        email:email.value,
        id:id.value,
        close:false
      }
     emit('closeDilog',data)
    }

    onMounted(() => {
           name.value = props.data.name;
           email.value = props.data.email;
           id.value =  props.data.id
    })
    return {
      name,
      email,
      nameError,
      id,
      handelSubmit,
      close
    };
  },
  //  mounted() {
  //       let vm = this;      
  //       vm.$nextTick(function () {      
  //          console.log(vm.data);
  //          this.name = vm.data.name;
  //          this.email = vm.data.email;
  //          this.id =  vm.data.id
  //       }); 
  // },
 
};
</script>
<style>
.btn {
    @apply font-bold py-2 px-4 m-2.5 rounded;
  }
  .btn-blue {
    @apply bg-blue-500 text-gray-50;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }


</style>
