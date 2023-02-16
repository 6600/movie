<template>
  <div class="contain moresuggest">
    <navbar :userinfo="userInfo" />
    <el-row :gutter="10">
      <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
        <p class="mstit">为你推荐</p>
        <div class="mid" v-if="list.length > 0">
          <p class="midp">高分电影</p>
          <div class="listbox">
            <div class="list" v-for="(item, index) in list[0].videoList" :id="4 + index" :key="item.videoId"
              @click="godetail(item)">
              <el-image :src="item.videoCover"></el-image>
              <p>{{ item.videoName }}</p>
            </div>
          </div>
        </div>
        <div class="mid">
          <p class="midp">高分电视剧</p>
          <div class="listbox">
            <div class="list" v-for="(item, index) in list[1].videoList" :id="10 + index" :key="item.videoId"
              @click="godetail(item)">
              <el-image :src="item.videoCover"></el-image>
              <p>{{ item.videoName }}</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import navbar from "@/views/components/navbar";
import Cookies from "js-cookie";
export default {
  components: {
    navbar,
  },
  data() {
    return {
      list: [],
      userInfo: [],
      kd: 0
    };
  },
  mounted() {
    this.getinfo();
    this.getUserInfo();
    let _this = this;
    document.onkeydown = function (event) {
      if (event.keyCode == 37) {
        _this.moveLeft();
      } else if (event.keyCode == 38) {
        _this.moveUp();
      } else if (event.keyCode == 39) {
        _this.moveRight();
      } else if (event.keyCode == 8) {
        _this.$router.go(-1);
      } else if (event.keyCode == 40) {
        _this.moveDown();
      } else if (event.keyCode == 13) {
        _this.activeClick();
      }
    };
  },
  methods: {
    moveLeft() {
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0) {
        this.c.classList.remove("accs");
        this.kd--;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");

      }
    }, moveRight() {
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0) {
        this.c.classList.remove("accs");
        this.kd++;
        if (this.kd > 3 + this.list[0].videoList.length + this.list[1].videoList.length) {
          this.kd = 3 + this.list[0].videoList.length + this.list[1].videoList.length
        }
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");

      }
    }, moveUp() {
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 3 && this.kd < 4 + this.list[0].videoList.length) {
        this.c.classList.remove("accs");
        this.kd = 1;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");

      } else if (this.kd >= 4 + this.list[0].videoList.length && this.kd < 4 + this.list[0].videoList.length + this.list[1].videoList.length) {
        this.c.classList.remove("accs");
        this.kd = 4;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");

      }
    }, moveDown() {
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0 && this.kd <= 3) {
        this.c.classList.remove("accs");
        this.kd = 4;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");

      } else if (this.kd > 3 && this.kd < 4 + this.list[0].videoList.length) {
        this.c.classList.remove("accs");
        this.kd = 4 + this.list[0].videoList.length;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");

      }
    },
    getUserInfo() {
      let c = Cookies.get("token");
      if (c != undefined) {
        this.$http.get(`/user?token=${c}`).then((res) => {
          this.userInfo = res.data.data;
        });
      }
    },
    godetail(val) {
      this.$router.push({ path: "/details", query: { id: val.videoId } });
    },
    getinfo() {
      this.$http.get("/video/category/getHighestScore").then((res) => {
        this.list = res.data.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.mstit {
  padding: 20px 0;
  font-size: 38px;
  color: rgb(249, 219, 158);
}

.mid:not(:first-of-type) {
  margin-top: 20px;
}

.mid {
  background: rgba($color: #fff, $alpha: 0.1);

  .listbox {
    display: flex;
    flex-wrap: wrap;
  }

  .midp {
    padding: 10px 1.3% 0 1.3%;
    font-size: 38px;
    color: #fff;
  }
}

.list {
  position: relative;
  width: 14%;
  padding: 26px 1.3%;

  .el-image {
    border-radius: 10px;
  }

  p {
    position: absolute;
    bottom: 4%;
    left: 0;
    font-size: 21px;
    color: #fff;
    padding: 18pt 14pt;
  }
}
</style>