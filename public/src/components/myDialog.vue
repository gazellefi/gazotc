<template>
  <el-dialog :center="true" v-bind="myDialogOptions" :close-on-press-escape="closePress" :close-on-click-modal="closeModal" :visible.sync="visibleDialog">
    <!--内容区域的默认插槽-->
    <slot></slot>
    <!--使用弹框的footer插槽添加按钮-->
    <template #footer v-if="isShowFooter">
      <!--对外继续暴露footer插槽，有个别弹框按钮需要自定义-->
      <slot name="footer">
        <!--将取消与确定按钮集成到内部-->
        <span>
          <el-button v-if="isShowCancle" @click="_handleCancel">取 消</el-button>
          <el-button v-if="isShowconfirm" type="primary" @click="_handleConfirm">
            确 定
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>
<script>
export default {
  name: 'myDialog',
  props: {
    // 对外暴露visible属性，用于显示隐藏弹框
    visible: {
      type: Boolean,
      default: false,
    },
    title: {},
    isShowFooter: {
      type: Boolean,
      default: true,
    },
    isShowCancle: {
      type: Boolean,
      default: true,
    },
    isShowconfirm: {
      type: Boolean,
      default: true,
    },
    isShowHeader: {
      type: Boolean,
      default: true,
    },
    closePress: {
      type: Boolean,
      default: false,
    },
    closeModal: {
      type: Boolean,
      default: false,
    },
    width: {

    }
  },
  computed: {
    // 通过计算属性，对.sync进行转换，外部也可以直接使用visible.sync
    visibleDialog: {
      get() {
        // console.log("get");
        return this.visible;
      },
      set(val) {
        // console.log("val: ", val);
        this.$emit("update:visible", val);
      },
    },
    myDialogOptions() {
      return {
        title: this.title,
        beforeClose: this._handleCancel,
        class: this.isShowHeader ? 'myDialog' : 'myDialog isShowHeader',
        width: this.width

      }
    },
  },
  methods: {
    // 对外抛出cancel事件
    _handleCancel() {
      this.$emit("cancel");
      this.visibleDialog = false;
    },
    // 对外抛出 confirm事件
    _handleConfirm() {
      this.$emit("confirm");
    },
    // 对外抛出 open事件
    // _handleConfirm() {

    // },
  },
  mounted() { },
  watch: {
    visible() {
      this.visible && this.$emit("open");
    },
  },
};
</script>
<style lang="less">
.myDialog {
  .el-dialog {
    // min-width: 800px !important;
    width: 60vw;
    border-radius: 5px;
    overflow: hidden;
    .el-dialog__header {
      // display: flex;
      // align-items: center;
      padding: 10px 20px 10px;
      // justify-content: space-between;
      background: #fdc500 !important;
      .el-dialog__title {
        color: #fff;
        font-weight: bold;
        // text-align: center;
      }
      .el-dialog__headerbtn {
        // position: static;
        transition: 1s;
        top: 10px !important;
        i {
          color: #fff;
        }
        &:hover {
          transform: rotate(180deg) scale(1.5);
        }
      }
    }

    .el-dialog__body {
      // margin: 10px;
      // border: 1px dashed #dfdfdf;
      max-height: 60vh;
      overflow: auto;
      padding: 0;
      background: #fff;
    }
    .el-dialog__footer {
      .el-button--primary {
        color: #fff;
        background-color: #30343f;
        border-color: #30343f;
      }
    }
    .showMyDialog {
      font-size: 22px;
      > div {
        margin: 5px;
        padding: 10px;
        border-bottom: 1px dashed #888888;
        span {
          font-weight: bold;
          // color: #f4bb21;
        }
      }
    }
  }
}
.isShowHeader {
  .el-dialog__header {
    display: none !important;
  }
}
</style>
