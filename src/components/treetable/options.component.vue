<template>
  <div class="role-options">
    <div class="role-options-options">
      <Checkbox
        v-for="item in actionList"
        :key="item.id"
        class="role-checkbox"
        :label="item.id"
        :value="item._checked"
        @on-change="handleOnChange($event, item)" 
        :style="{pointerEvents: pointEvent}"
      >
        <span>{{item.name}}</span>
      </Checkbox>
    </div>
  </div>
</template>
<script>
export default {
  name: "OptionsNode",
  props: {
    // 按钮列表
    actionList: Array,
    // 是否只读
    readonly: false
  },
  data() {
    return {
      pointEvent: this.readonly ? "none" : "inherit"
    };
  },
  methods: {
    handleOnChange(val,item) {
      item._checked = val
      this.$emit("on-select-change", this.actionList);
    }
  }
};
</script>
