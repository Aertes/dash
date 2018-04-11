<template>
  <div class="app-wrapper">
    <tables @closeLayer="layerHandle" :tableData="tableData"></tables>
    <upload :uploadLink="link" :types="uploadType" :title="name" @closeLayer="layerHandle"></upload>
    <!-- :tableSearch="tableSearch" :tableDel="tableDel" :tableDownload="tableDownload" -->
    <nav-bar ></nav-bar>
    <div class="clear">
      <side-bar></side-bar>
      <keep-alive>
          <app-main v-if="isSetting" @showUpload="uploadHandle"></app-main>
          <system-settings v-if="!isSetting"></system-settings>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import NavBar from '../navbar/navbar'
  import SideBar from '../sidebar/sidebar'
  import AppMain from '../appmain/appmain'
  import Tables from '../tables/tables'
  import Upload from '@/components/upload/upload'
  import SystemSettings from '@/components/setting/setting'
  
  let layerId
  export default ({
    data() {
      return {
        link: '',
        uploadType: '',
        name: '',
        tableData: '',
        isSetting: false
      }
    },
    components: {
      NavBar,
      SideBar,
      AppMain,
      Tables,
      Upload,
      SystemSettings,
    },
    computed: {
      type() {
        return this.$store.state.type
      }
    },
    mounted() {

      this.$Hub.$on('showTables', (obj) => {
        this.layerOpen(obj.id)
        this.tableData = obj.tableData
      });

      this.$Hub.$on('sentData', (obj) => {
        this.tableData = obj.tableData
      })

    },
    methods: {
      uploadHandle(obj) {
        this.layerOpen(obj.id)
        this.link = obj.link,
          this.uploadType = obj.type,
          this.name = obj.name
        // this.tableSearch = obj.tableSearch,
        // this.tableDel = obj.tableDel,
        // this.tableDownload = obj.tableDownload
      },
      layerHandle() {
        layer.close(layerId)
      },
      layerOpen(id) {
        layerId = layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          shadeClose: false,
          area: 'auto auto',
          shade: [0.5, '#fff'],
          content: $(`#${id}`)
        })
      },
    }
  })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../assets/style/mixin.styl'
  .app-wrapper
    position relative
    margin 0 39px
    height 100%
</style>
