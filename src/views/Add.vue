<template>
  <div class="about modal-backdrop">
    <div class="modal">
   <header class="modal-header">
        <slot name="header">
        Add 
        </slot>
        <button
          type="button"
          class="btn-close"
          @click="close"
        >
          x
        </button>
      </header>
    <div>
       <section class="modal-body">
    <form @submit.prevent="handelSubmit">
      <label>Name</label>
      <input type="text" class="rounded text-pink-500"  required v-model="name" />
      <div v-if="name">{{ nameError }}</div>
      <label>Email</label>
      <input type="email" class="rounded text-pink-500"  required v-model="email" />

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
    @apply bg-blue-500 text-white;
  }
  .btn-blue:hover {
    @apply bg-blue-700;
  }

   .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }
</style>
