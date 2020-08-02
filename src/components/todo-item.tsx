import { Component, Prop, Watch, Emit, Vue } from "vue-property-decorator";

interface Item {
  text: string;
  complete: boolean;
}

@Component({
  name: "TodoItem",
})
export default class TodoItem extends Vue {
  @Prop(Object) public item!: Item;
  @Prop(Number) public index!: number;
  @Prop(Number) public edittingIndex!: number;

  public edittingContent = "";

  @Watch("edittingIndex")
  public edittingChange(index) {
    if (index === this.index) {
      this.edittingContent = this.item.text;
    } else {
      this.edittingContent = "";
    }
  }

//   public save() {
//     this.$emit("on-save", {
//       index: this.index,
//       context: this.edittingContent,
//     });
//     console.log(this.edittingContent);
//   }


// ts写法
  @Emit("on-save")
  public save() {
    return {
      index: this.index,
      context: this.edittingContent,
    };
  }

  public edit() {
    this.$emit("on-edit", this.index);
  }

  public cancel() {
    this.$emit("on-cancel");
  }
  protected render() {
    return (
      <li>
        {this.edittingIndex === this.index ? (
          <div>
            <a-input
              placeholder="Basic usage"
              v-model={this.edittingContent}
              style="width:200px"
            />
            <a-icon type="check" nativeOn-click={this.save} />
            <a-icon type="close" nativeOn-click={this.cancel} />
          </div>
        ) : (
          <div>
            <span>{this.item.text}</span>
            <a-icon type="edit" nativeOn-click={this.edit} />
          </div>
        )}
      </li>
    );
  }
}
