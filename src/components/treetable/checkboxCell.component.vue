<template>
  <Checkbox :indeterminate="indeterminate_" 
  :value="checked_" @on-change="handleOnChange" 
  :style="{pointerEvents: pointEvent}"></Checkbox>
</template>
<script>
export default {
  name: "checkboxCell",
  props: {
    indeterminate: false,
    checked: false,
    disabled: false
  },
  data() {
    return {
      pointEvent: this.disabled ? 'none' : 'inherit',
      checked_: _.clone(this.checked),
      indeterminate_: _.clone(this.indeterminate)
    };
  },
  watch: {
    checked() {
      this.checked_ = _.clone(this.checked);
    },
    indeterminate() {
      this.indeterminate_ = _.clone(this.indeterminate);
    }
  },
  methods: {
    handleOnChange(val) {
      this.$emit("on-change", val);
    }
  }
};
</script>

