<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<template>
  <v-app>FILE UPLOADER
    <v-text-field v-model="title" label="title"></v-text-field>
    <v-text-field v-model="content" label="content"></v-text-field>
    <v-text-field v-model="date_now" label="date_now YYYY-MM-DD HH:mm"></v-text-field>
    <el-upload
      class="upload-demo"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      ref="upload"
      :on-change="saveFile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="false"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Drop file here or
        <em>click to upload</em>
      </div>
      <div class="el-upload__tip" slot="tip">jpg/png files with a size less than 500kb</div>
    </el-upload>UPLOADER FOR NEWS LOGO WILL BE HERE
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      // list of files
      // keep it in store, on mounted
      // send request to API and get all files
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ],
      // keep it in store
      // send request on mounted
      // show preview image
      imageUrl: "",

      // variables for test
      title: "",
      content: "",
      date_now: ""
    };
  },
  methods: {
    //mytest methods
    //use file to handle axios post request
    saveFile(file, fileList) {
      console.log("file: ", file.raw);
      console.log("fileList: ", fileList);

      let formData = new FormData();
      formData.append("title", this.title);
      formData.append("content", this.content);
      formData.append("date_now", this.date_now);
      formData.append("upload", file.raw, file.rawname);

      let config = {
        header: {
          "Content-Type": "multipart/form-data"
        }
      };

      axios
        .post("http://localhost:3000/api/admin/upload_news", formData, config)
        .then(responce => {
          console.log("responce.data.insertId: ", responce.data.insertId);
          console.log(responce);
        })
        .finally(() => console.log("completed"));
    },
    // list of file
    // file deletion handler
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // show image preview? Maybe get it from photo-wall
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 3, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    // when it runs?
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    // logo preview
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        this.$message.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>