<template>
  <div class="roleEdit-wrap">
    <div action="" class="clearfix search-wrap">
      <div class="search">
        <label for="roleName">Role Name <span style="color: red">*</span></label>
        <input id="roleName" type="text" placeholder="Please enter a character name" v-model="roleName" ref="roleNameInput" :disabled="viewRole">
      </div>
      <div class="search">
        <label>Status</label>
        <selection :selections="selectStatusOptions" class="role-select" ref="roleSelect" :perm="viewRole"></selection>
      </div>
      <div class="search">
        <label>Role Permission <span style="color:red;">*</span></label>
        <div class="role-tree">
          <p class="title">Authority Structure</p>
          <div class="role-tree-cont">
            <ul class="ztreeDome ztree" id="roleZtree">
            </ul>
          </div>
        </div>
      </div>
      <div class="search role-tree-wrap">
        <label></label>
        <div class="button-wrap">
          <button class="box-shadow save-button" :disabled="viewRole" @click="saveRole">Save</button>
          <button class="box-shadow back-button" @click="goBack">Back</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import xhrUrls from '../../assets/config/xhrUrls'
  import {get, post, uploadPost} from '../../assets/config/http'

  let ROLE_SEARCH = xhrUrls.ROLE_SEARCH
  let ROLE_DELETE = xhrUrls.ROLE_DELETE
  let ROLE_DISABLE = xhrUrls.ROLE_DISABLE
  let ROLE_ENABLE = xhrUrls.ROLE_ENABLE
  let ROLE_TREE = xhrUrls.ROLE_TREE
  let ROLE_GETROLE = xhrUrls.ROLE_GETROLE
  let ROLE_SAVE = xhrUrls.ROLE_SAVE
  let ROLE_UPDATE = xhrUrls.ROLE_UPDATE

  export default {
    name: "roleEdit",
    data() {
      return {
        selectStatusOptions: ['Disable','Enable'],
        tableData: '',
        ztreeNodeData: [],
        nodeSetting: {
          check: {
            enable: this.viewRole,
            chkboxType: { "Y": "ps", "N": "ps" }
          },
          data: {
            simpleData: {
              enable: true,
              pIdKey: "parentId"
            }
          }
        },
        roleName: '',
        treeId:[]
      }
    },
    props: ['toRoleEditId','viewRole','isSave'],
    mounted() {
    },
    activated(){
      try{
        if(this.toRoleEditId==''){
          this.getTreeData()
        }else{
          this.getRoleEdit()
        }
      }catch (e){}
    },
    methods: {
      getRoleEdit(){
        this.ztreeNodeData = [];
        get(`${ROLE_GETROLE}${this.toRoleEditId}`).then(res => {
          let nodeData = res.data.nodes
          let roleData = res.data.role
          this.roleName = roleData.name
          if(roleData.status==1){
            this.$refs.roleSelect.nowIndex = 1
          }else{
            this.$refs.roleSelect.nowIndex = 0
          }
          nodeData.forEach((v, i) => {
            this.ztreeNodeData.push({name: v.name, id: v.id, parentId: v.parentId,checked:(v.checked=='TRUE'?true:false)})
          })
          this.nodeSetting.check.enable = !this.viewRole
          $.fn.zTree.init($("#roleZtree"), this.nodeSetting, this.ztreeNodeData).expandAll(true);
        }).catch(err => console.log(err))
      },
      getTreeData() {
        this.ztreeNodeData=[]
        post(ROLE_TREE, {}).then(res => {
          let nodeData = res.data.resultList
          this.roleName = ''
          this.$refs.roleSelect.nowIndex = 0
          nodeData.forEach((v, i) => {
            this.ztreeNodeData.push({name: v.name, id: v.id, parentId: v.parentId})
          })
          this.nodeSetting.check.enable = true
          $.fn.zTree.init($("#roleZtree"), this.nodeSetting, this.ztreeNodeData).expandAll(true);
        }).catch(err => console.log(err))
      },
      goBack(){
        this.$emit('closeRoleEdit')
      },
      saveRole(){
        let that = this
        let treeObj = $.fn.zTree.getZTreeObj("roleZtree")
        let status = this.$refs.roleSelect.nowIndex
        let nodes = treeObj.getCheckedNodes(true)
        $.each(nodes,function(i){
          if(i==0){
            that.treeId = nodes[i].id;
          }else{
            that.treeId += ","+nodes[i].id+"";
          }
        });
        if(this.roleName==''){
          layer.msg('Role name is empty!', {
            time: 2000,
            skin: 'fontColor'
          })
        }else if(this.treeId==''){
          layer.msg('Role permission is empty!', {
            time: 2000,
            skin: 'fontColor'
          }, function(index) {
            layer.close(index);
          })
        }else{
          if(this.isSave){
            post(ROLE_SAVE,{
              "name": this.roleName,
              "permissions": this.treeId,
              "status": status
            }).then(res=>{
              if(res.data.code==200){
                layer.msg('Save Success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function(index) {
                  layer.close(index);
                  that.goBack()
                })
              }else{
                layer.msg(res.data.errMsg, {
                  time: 2000,
                  skin: 'fontColor'
                }, function(index) {
                  layer.close(index);
                })
              }
            })
          }else{
            post(ROLE_UPDATE,{
              "name": this.roleName,
              "permissions": this.treeId,
              "status": status,
              "id":this.toRoleEditId
            }).then(res=>{
              if(res.data.code==200){
                layer.msg('Update success!', {
                  time: 2000,
                  skin: 'fontColor'
                }, function(index) {
                  layer.close(index);
                  that.goBack()
                })
              }else{
                layer.msg(res.data.errMsg, {
                  time: 2000,
                  skin: 'fontColor'
                }, function(index) {
                  layer.close(index);
                })
              }
            })
          }
        }
      }
    }
  }
</script>

<style scoped rel="stylesheet/stylus" lang="stylus">
  .roleEdit-wrap
    .search-wrap
      width 100%
    .search
      margin-bottom 20px
      .dropdown-wrap
        display inline-block
        height 40px
        line-height 40px
        .dropdown-show
          height 40px
          line-height 40px
      label
        color #717071
        font-size 22px
        margin-right 15px
        line-height 40px
        display inline-block
        width 35%
        text-align right
      input, select
        margin-right 30px
        appearance none
        border 1px solid #E2DFDE
        border-radius 5px
        width 400px
        height 40px
        line-height 40px
        padding 0 10px
    .searchIcon
      font-size 30px
      color #717071
      margin-left 30px
      margin-top 7px
      cursor pointer
    .tables
      width 100%
      margin-top 30px
      .user-create
        color #2061ae
        font-size 22px
        vertical-align -3px
      .create
        border 1px solid #b3b1b2
        border-radius 5px
        height 55px
        line-height 55px
        cursor pointer
        padding-left 20px
        background rgba(241, 240, 240, 0.7)
        .newUser
          margin-left 10px
          color: #2061ae
        span
          color #838383
          font-size 20px
      .role-table
        margin-top 20px
        position relative
        width 100%

    .role-tree-wrap
      margin-bottom 0
    .role-tree
      display inline-block
      border 1px solid #ECECEC
      width 400px
      height 345px
      vertical-align top
      margin-bottom 0
      .title
        background-color #528FBA
        color #fff
        text-align center
        font-size 16px
        line-height 40px
      .role-tree-cont
        padding-top 10px
        padding-left 10px
        height 305px
        overflow auto
    .button-wrap
      display inline-block
      width 400px
      text-align center
      vertical-align top
      .save-button
      .back-button
        width 100px
        height 35px
        margin 0 20px
        background-color #2061AE
        border-radius 10px
        color #fff
        border medium
        outline none
        cursor pointer
      .back-button
        background-color #00AEEA
</style>
