<template>
  <Checkbox :indeterminate="indeterminate" 
  :value="checked" @on-change="handleOnChange" 
  :style="{pointerEvents: pointEvent}"></Checkbox>
</template>
<script>
export default {
  name: "checkboxCell",
  props: {
    // 是否不确定
    indeterminate: false,
    // 是否选中
    checked: false,
    // 是否只读
    readonly: false
  },
  data() {
    return {
      pointEvent: this.readonly ? 'none' : 'inherit',
    };
  },
  methods: {
    handleOnChange(val) {
      this.$emit("on-change", val);
    }
  }
};
</script>

