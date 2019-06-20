<template>
  <div id="app">
    <!-- <el-container> -->
    <!-- <el-header>
        <el-link :underline="false">首页</el-link>
        <el-link :underline="false">新手入门</el-link>
        <el-link :underline="false">API</el-link>
        <el-link :underline="false">关于</el-link>
        <el-link :underline="false">注册</el-link>
        <el-link :underline="false">登陆</el-link>
    </el-header>-->

    <!-- <el-main class="middle"> -->
    <div class="container">
      <div class="main_content">
        <div class="type_header">
          <button
            :class="activeClass == index ? 'type type_active': 'type type_normal' "
            v-for="(item, index) in typeList"
            :key="index"
            @click="getData(index)"
          >{{item.title}}</button>
        </div>
        <div class="main_item" v-for="item in array" :key="item.id">
          <img class="avatar" :src="item.author.avatar_url" alt>
          <div class="reply">
            <span class="reply_count">{{item.reply_count}}/</span>
            <span class="visit_count">{{item.visit_count}}</span>
          </div>

          <div class="tab">{{item.tab == 'share' ? '分享': '问答'}}</div>
          <div class="title">
            <a>{{item.title}}</a>
          </div>
          <div class="time">{{getDate(item.last_reply_at)}}</div>
        </div>

        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :pager-count="5" :total="50"></el-pagination>
        </div>
      </div>

      <div class="main_right">
        <el-card class="box-card">
          <div style="font-weight: bold;">CNode: Node.js专业中文社区</div>
          <div>您可以 登陆 或 注册，也可以</div>
          <el-button @click="getData">通过 GitHub 登陆</el-button>
        </el-card>
      </div>
      <!-- </el-main> -->
    </div>

    <!-- <el-footer height="200px">
        <div>RSS | 源码地址</div>
        <div>CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</div>
        <div>服务器赞助商为 ucloud ，存储赞助商为 七牛云存储 ，由 alinode 提供应用性能服务。</div>
        <div>新手搭建 Node.js 服务器，推荐使用无需备案的 DigitalOcean(https://www.digitalocean.com/)</div>
    </el-footer>-->
    <!-- </el-container> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      array: [],
      activeClass: 0,
      typeList: [
        { index: 0, title: "全部" },
        { index: 1, title: "精华" },
        { index: 2, title: "分享" },
        { index: 2, title: "问答" },
        { index: 2, title: "招聘" },
        { index: 2, title: "客户端测试" }
      ]
    };
  },
  mounted() {
    this.getData(0);
  },
  methods: {
    getData(index) {
      this.activeClass = index;
      this.$http({
        method: "get",
        url: "https://cnodejs.org/api/v1/topics",
        data: {}
      }).then(res => {
        console.log(res);
        this.array = res.data.data;
      });
    },
    getDate(time) {
      var year = parseInt(time.substring(0, 4));
      var month = parseInt(time.substring(5, 7));
      var day = parseInt(time.substring(8, 10));
      var hour = parseInt(time.substring(11, 13));
      var myDate = new Date();
      const currentYear = myDate.getFullYear();
      const currentMonth = myDate.getMonth() + 1;
      const currentDay = myDate.getDate();
      const currentHour = myDate.getHours();
      if (currentYear > year) {
        return currentYear - year + " 年前";
      } else {
        if (currentMonth > month) {
          return currentMonth - month + " 个月前";
        } else {
          if (currentDay > day) {
            return currentDay - day + " 天前";
          } else {
            return currentHour - hour + " 小时前";
          }
        }
      }
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
.container {
  display: flex;
  background-color: #e1e1e1;
  padding: 20px;
}

.el-footer {
  background-color: #fff;
}
.main_content {
  margin: 0 40px;
  min-width: 600px;
  width: 60%;

}
.title {
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.title a:hover {
  text-decoration: underline;
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
  position: relative;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #f6f6f6;
}
.main_item:hover {
  background-color: #f6f6f6;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 4px;
}
.reply {
  margin: 0 15px;
  width: 50px;
  max-width: 80px;
  font-size: 14px;
  text-align: center;
}
.tab {
  color: #b4b4b4;
  margin: 0 5px;
  width: 40px;
  padding: 2px;
  background-color: #e5e5e5;
  border-radius: 2px;
  text-align: center;
  font-size: 12px;
}
.reply_count {
  color: purple;
  font-size: 14px;
  font-weight: bold;
}
.visit_count {
  color: #b4b4b4;
  font-size: 12px;
}
.time {
  margin-left: 40px;
  font-size: 13px;
  text-align: right;
  color: #7c858c;
  position: absolute;
  right: 20px;
}
.type_header {
  background-color: #f6f6f6;
  height: 50px;
  display: flex;
  align-items: center;
}

.type {
  padding: 5px 10px;
  margin: 0 10px;
  border: none;
  font-size: 14px;
  outline: none;
  border-radius: 2px;
}
.type_normal {
  background-color: #f6f6f6;
  color: #82bb23;
}
.type_normal:hover {
  color: #60c0dc;
}
.type_active {
  background-color: #82bb23;
  color: #fff;
}
.pagination {
  padding: 10px 0;
  margin-bottom: 20px;
  background-color: #82bb23;
}
</style>
