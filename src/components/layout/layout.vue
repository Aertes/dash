<template>
  <div class="app-wrapper">
    <tables @closeLayer="layerHandle"></tables>
    <upload :uploadLink="link" @closeLayer="layerHandle"></upload>
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
    data(){
      return{
        link:''
      }
    },
    components: {
      NavBar,
      SideBar,
      AppMain,
      Tables,
      Upload
    },
    mounted() {
      this.$Hub.$on('showTables', (id) => {
        this.layerOpen(id)
      });
    },
    methods:{
      uploadHandle(obj){
        this.layerOpen(obj.id)
        this.link = obj.link
      },
      layerHandle(){
        layer.close(layerId)
      },
      layerOpen(id){
        layerId = layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          shadeClose: true,
          area: 'auto auto',
          shade: [0.5, '#fff'],
          content: $(`#${id}`)
        })
      }
    }
  })

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .app-wrapper
    position relative
    margin 0 39px
    height 100%
</style>
