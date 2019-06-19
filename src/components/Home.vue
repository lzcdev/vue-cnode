<template>
  <div id="app">
    <el-container>
      <el-header>
        <el-link :underline="false">首页</el-link>
        <el-link :underline="false">新手入门</el-link>
        <el-link :underline="false">API</el-link>
        <el-link :underline="false">关于</el-link>
        <el-link :underline="false">注册</el-link>
        <el-link :underline="false">登陆</el-link>
      </el-header>

      <el-main class="middle">
        <div class="main_content">
          <div style="background-color: #F6F6F6; height: 50px;">这是标题</div>
          <div class="main_item" v-for="item in array" :key="item.id">
            <img class="avatar" :src="item.author.avatar_url" alt>
            <div class="reply">
              <span class="reply_count">{{item.reply_count}}/</span>
              <span>{{item.visit_count}}</span>
            </div>

            <div class="tab">{{item.tab == 'share' ? '分享': '问答'}}</div>
            <div>{{item.title}}</div>
          </div>

          <el-pagination background layout="prev, pager, next" :pager-count="5" :total="50"></el-pagination>
        </div>

        <div class="main_right">
          <el-card class="box-card">
            <div style="font-weight: bold;">CNode: Node.js专业中文社区</div>
            <div>您可以 登陆 或 注册，也可以</div>
            <el-button @click="getData">通过 GitHub 登陆</el-button>
          </el-card>
        </div>
      </el-main>

      <el-footer height="200px">
        <div>RSS | 源码地址</div>
        <div>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</div>
        <div>服务器赞助商为 ucloud ，存储赞助商为 七牛云存储 ，由 alinode 提供应用性能服务。</div>
        <div>新手搭建 Node.js 服务器，推荐使用无需备案的 DigitalOcean(https://www.digitalocean.com/)</div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      array: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http({
        method: "get",
        url: "https://cnodejs.org/api/v1/topics",
        data: {}
      }).then(res => {
        console.log(res);
        this.array = res.data.data;
      });
    }
  }
};
</script>


<style>
.el-header {
  background-color: #444444;
  color: #fff;
  text-align: center;
  line-height: 60px;
  height: 60px;
}
.el-link {
  margin: 0 40px;
}
.el-link.el-link--default {
  color: #cccccc;
}
.el-main {
  background-color: #e1e1e1;
  height: 800px;
}

.el-footer {
  background-color: #fff;
}
.main_content {
  margin: 0 20px;
  min-width: 800px;
  width: 80%;
}
.main_right {
  background-color: e1e1e1;
}
.middle {
  display: flex;
}
.box-card {
  width: 300px;
  line-height: 40px;
}
.main_item {
  background: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid lightgray;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}
.reply {
  margin: 0 20px;
  width: 50px;
  max-width: 80px;
  font-size: 14px;
  text-align: center;
}
.tab {
  margin: 0 10px;
  width: 40px;
  padding: 5px;
  background-color: #e5e5e5;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
}
.reply_count {
  color: purple;
  font-size: 16px;
  font-weight: bold;
}
</style>
