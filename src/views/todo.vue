<template>
  <div class="todo-page">
    <ul>
      <todo-item
        v-for="(item, index) in list"
        :item="item"
        :index="index"
        :editting-index="edittingIndex"
        @on-save="handleSave"
        @on-edit="handleEdit"
        @on-cancel="handleCancel"
        :key="index"
      >
        <span v-if="edittingIndex !== index">
          {{ item.text }}
        </span>
        <span v-else>editting</span>
      </todo-item>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TodoItem from "../components/todo-item";

@Component({
  name: "TodoPage",
  components: {
    TodoItem,
  },
})
export default class TodoPage extends Vue {
  public edittingIndex = 0;
  public list = [
    {
      text: "学习《typeScript全面解读》",
      complete: false,
    },
    {
      text: "学习《vue技术栈全面解读》",
      complete: false,
    },
  ];
  public handleSave({ index, context }) {
    console.log(index, context);
    this.list[index].text = context;
    this.handleCancel();
  }
  public handleEdit(index) {
    this.edittingIndex = index;
  }
  public handleCancel() {
    this.edittingIndex = -1;
  }
}
</script>
