<template>
  <div class="app-wrapper">
  
    <img v-if='goDown' src="../../assets/img/down.gif" alt="" class="goDown">
    <img v-if='goUp' src="../../assets/img/up.gif" alt="" class="goUp">
  
    <tables @closeLayer="layerHandle" :tableData="tableData"></tables>
    <upload :uploadLink="link" :types="uploadType" :title="name" @closeLayer="layerHandle"></upload>
    <!-- :tableSearch="tableSearch" :tableDel="tableDel" :tableDownload="tableDownload" -->
    <nav-bar></nav-bar>
    <div class="clear">
      <side-bar></side-bar>
      <app-main @showUpload="uploadHandle"></app-main>
    </div>
  </div>
</template>

<script>
  import NavBar from '../navbar/navbar'
  import SideBar from '../sidebar/sidebar'
  import AppMain from '../appmain/appmain'
  import Tables from '../tables/tables'
  import Upload from '@/components/upload/upload'
  
  let layerId
  export default ({
    data() {
      return {
        link: '',
        uploadType: '',
        name: '',
        goDown: true,
        goUp: false,
        tableData: ''
      }
    },
    components: {
      NavBar,
      SideBar,
      AppMain,
      Tables,
      Upload
    },
    computed: {
      type() {
        return this.$store.state.type
      }
    },
    mounted() {
  
      this.goUpDown()
  
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
      goUpDown() {
        if (this.type == 0) {
          this.goDown = true
          this.goUp = false
        } else if (this.type == 11) {
          this.goUp = true
          this.goDown = false
        } else {
          this.goUp = true
          this.goDown = true
        }
      }
    },
    watch: {
      type: function() {
        this.goUpDown()
      }
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

  .goUp,
  .goDown
    e-pos(left:50%, x:-50%)
    bottom 10px
    margin-left 100px
    width 30px
    z-index 99999
</style>
