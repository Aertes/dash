<template>
  <div class="tables-wrap" id="upLoadBox">
    <div class="tables-title">
      <span>CAMPAIGN RECORD</span>
      <span @click="closeLayerButton"><svg-icon sign="icon-closed"></svg-icon></span>
    </div>
    <div class="upload-file-box" :class="[isFileNone? 'none': '']">
      <div class="upload-file">
        <a href="javascript:;">
          选取文件
          <input type="file" id="picker" name="file" @change="upload" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
        </a>
        <span>{{ fileName }}</span>
      </div>
      <div class="tables-container">
        <h3>History</h3>
        <table id="fileTable" width="100%" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th style="max-width: 20%;">Upload Date</th>
            <th style="max-width: 40%;">Channel</th>
            <th style="max-width: 20%;">Detail</th>
            <th style="max-width: 10%;">Operation</th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in oldFileList" >
                <td>{{item.uploadDate}}</td>
                <td><div :title="item.fileName" style="overflow: hidden;text-overflow:ellipsis;white-space: nowrap;cursor: pointer; width:1.04167rem">{{item.fileName}}</div></td>
                <td><div><a title="Download" class="download" style="color: #2864b0;text-decoration: underline;cursor: pointer;">Download</a></div></td>
                <td><div @click="deleteFile(item.id, index)" ><svg-icon sign="icon-trash"  class="icon-trash" style="cursor: pointer; color:#999999"></svg-icon></div></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="progress-ba" :class="[isProgressNone? 'none': '']">
      <p id="text" class="text">DAtA UPLOADING, PLEASE WAIT...</p>
      <div class="progress">
        <span id="num" class="progressbarNum">{{progress}}%</span>
        <span id="progressBar" class="percentage" :style="{width: progress+'%'}" role="progressbar" aria-valuemin="0"
              aria-valuemax="100"></span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import "./webuploader.min";

export default {
  name: "upload",
  data() {
    return {
      isFileNone: false,
      isProgressNone: true,
      files: "",
      progress: 0,
      fileName: "未选择文件",
      uploader: null,
      table: null,
      oldFileList: [
        {
          id: "1",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        },
        {
          id: "2",
          uploadDate: "2018/08/10",
          fileName: "Cakadgasdad",
          downloadUrl: ""
        }
      ]
    };
  },
  props:['uploadLink'],
  mounted() {
    // 进度条
    this.init();

    //历史记录
    this.dataTable();
  },
  methods: {
    upload(e) {
      this.isFileNone = true;
      this.isProgressNone = false;
      console.log(e.target.files);
      this.fileName = e.target.files[0].name;
      this.uploader.option( 'server', this.uploadLink)
      this.uploader.addFiles(e.target.files[0]);
    },
    //进度条
    init() {
      this.uploader = WebUploader.create({
        // swf文件路径
        //swf: "../../assets/js/uploads/Uploader.swf",
        // 文件接收服务端。
        server: '',
        auto: true,
        accept: {
          title: "xls",
          mimeTypes: "xls/",
          extensions: "xls,xlsx"
        },
        fileVal: "file",
        // 不压缩image, 默认如果是jpeg，文件上传前会压缩一把再上传！
        resize: false
      });

      // 文件上传过程中创建进度条实时显示。
      this.uploader.on("uploadProgress", function(file, percentage) {
        this.isFileNone = true;
        this.isProgressNone = false;
        var percent = Math.round(percentage * 100);
        $("#num").html("" + percent + " %");
        $("#progressBar").css("width", "" + percent + "%");
      });

      // 上传成功
      this.uploader.on("uploadSuccess", function(file) {
        $("#num").html("100%");
        $("#progressBar").css("width", "100%");
        $("#text").html("UPLOAD SUCCESS!");
        setTimeout(() => {
          this.isFileNone = false;
          this.isProgressNone = true;
        }, 1000);
      });
      // 上传错误
      this.uploader.on("uploadError", function(file) {
        this.isFileNone = true;
        this.isProgressNone = false;
        alert("上传出错");
      });
      this.uploader.on("fileQueued", function(params) {});
    },
    // 历史记录
    dataTable() {
      this.table = $("#fileTable").DataTable({
        searching: false,
        lengthChange: false,
        info: false,
        ordering: false,
        pagingType: "simple_numbers",
        pageLength: 5,
        // drawCallback:()=>{
        //     this.$http.get('../../../static/table.json').then((res)=>{
        //         console.log(res)
        //     })
        // }

      });
    },
    // 删除
    deleteFile(id, index) {
        this.oldFileList.splice(index, 1);
        // this.table.ajax.reload()
    //   this.$http
    //     .post(baseUrl + xhrUrls.DELFILE, id)
    //     .then(res => {
    //       this.oldFileList.splice(index, 1);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    },
    closeLayerButton(){
      this.$emit('closeLayer')
    }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../assets/style/mixin.styl';

.tables-wrap .upload-file-box .tables-container table td, .tables-wrap .upload-file-box .tables-container table th {
    height: 25px;
}

table.dataTable thead th, table.dataTable thead td {
    padding: 10px 20px;
}

table.dataTable.no-footer {
    border-bottom: 0;
}

.tables-wrap {
    width: 720px;
    max-height: 90%;
    background-color: #fff;
    border-radius: 15px;
    z-index: 99999;
    overflow: hidden;
    min-height: 340px;
    display none
    .none{
      display: none
    }
    .tables-title {
        position: relative;
        padding-left: 45px;
        font-size: 30px;
        line-height: 100px;
        color: #a0a0a1;

        .icon {
            e-pos(top: 50%, y: -50%);
            right: 25px;
            font-size: 35px;
            color: #A0A0A1;
            cursor: pointer;
        }
    }

    .upload-file-box {
        .upload-file {
            position: relative;
            margin-bottom: 30px;
            margin-left: 50px;

            a {
                display: inline-block;
                border: 1px solid #abaaab;
                border-radius: 5px;
                position: relative;
                padding: 10px 20px;
                color: #1f61ae;
                cursor: pointer;
            }

            span {
                // position: absolute;
                padding-left: 10px;
                max-width: 500px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                display: inline-block;
            }

            input {
                border: 0;
                width: 120px;
                position: absolute;
                top: 0;
                left: 0;
                cursor: pointer;
                opacity: 0;
            }
        }
    }

    .tables-container {
        padding: 0 50px 50px 50px;
        font-size: 18px;

        .dataTables_info {
            display: none !important;
        }

        .icon-trash {
            cursor: pointer;
        }

        h3 {
            font-weight: 400;
            color: #aeadae;
            margin-bottom: 15px;
            font-size: 26px;
        }

        table {
            border-top: 1px solid #EBEBEB;
            border-left: 1px solid #EBEBEB;
            border-radius: 10px;

            th, td {
                height: 50px;
                border-bottom: 1px solid #EBEBEB;
                border-right: 1px solid #EBEBEB;
                text-align: center;
                vertical-align: center;
            }
        }
    }

    .progress-ba {
        padding: 0 80px;
        text-align: center;

        .text {
            font-size: 24px;
            color: #a0a0a1;
            margin-bottom: 30px;
            margin-top: 50px;
        }

        .progress {
            position: relative;
            border-radius: 30px;
            width: 100%;
            background: #f5f6f8;
            height: 30px;
            position: relative;
            display: inline-block;
            text-align: center;
            line-height: 30px;
            color: #fff;

            .percentage {
                position: absolute;
                border-radius: 30px;
                width: 80%;
                height: 100%;
                left: 0;
                top: 0;
                background: #1f61ae;
            }

            .progressbarNum {
                e-pos(left: 50%, x: -50%);
                z-index: 1;
            }
        }
    }
}
</style>
