<template>
  <div class="contain login">
    <navbar :userinfo="userInfo" />
    <div class="mid">
      <el-row :gutter="10">
        <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
          <div class="logintop">
            <div class="ltl">
              <div class="tv" v-if="username == undefined">
                <el-image class="tvimg" :src="require('../assets/tv.png')"></el-image>
              </div>
              <div class="tv2" v-else></div>
              <div class="wz">
                <p class="tztit" v-if="userInfo.username == undefined">
                  登录解锁更多权益
                </p>
                <p class="tztit" v-else>
                  {{ userInfo.username }}

                  <el-image v-show="userInfo.membership > 0" style="width: 40px; height: 26px; padding-left: 10px"
                    :src="require('../assets/VIP.png')"></el-image>
                </p>
                <p class="tzcon" v-if="
                  userInfo.membership == 0 || userInfo.membership == undefined
                ">
                  <span>您当前不是VIP，</span>开通VIP立享大屏超清体验
                </p>
                <p class="tzcon" v-if="userInfo.membership == 1">
                  <span>您是VIP，可以享受全部权益</span>
                </p>
                <button class="quit" @click="quit" id="4">退出登录</button>
              </div>
            </div>
            <div class="ltr">
              <p class="trtit">金卡vip</p>
              <p class="trcon">金卡专属特权+专属权益</p>
              <div class="ltrb">
                <p class="trcon2">开通VIP立享大屏超清影视</p>
                <button @click="gobuy" v-if="
                  userInfo.membership == '' ||
                  userInfo.membership == undefined ||
                  userInfo.membership == 0
                " id="5">
                  立即开通
                </button>
                <button @click="gobuy" v-if="userInfo.membership > 0" id="5">
                  去续费
                </button>
              </div>
            </div>
          </div>
          <div class="histroy">
            <p class="tithis">我的收藏</p>
            <div class="hisbox">
              <div class="hisl">
                <div class="hislist" v-for="(item, index) in list" :key="item.videoId" @click="godetails(item.videoId)"
                  :id="6 + Number(index)">
                  <el-image :src="item.cover" mode="contain"></el-image>

                  <el-image class="imgvip" v-if="item.membership == 1" :src="require('../assets/vip3.png')"></el-image>
                  <p>{{ item.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- <audio controls="controls" hidden :src="require('../assets/music/point.mp3')" ref="ado"></audio> -->
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
      username: Cookies.get("username"),
      token: Cookies.get("token"),
      membership: Cookies.get("membership"),
      list: [],
      userInfo: [],
      kd: 0,
    };
  },
  mounted() {
    this.getinfo();
    this.getUserInfo();
    let _this = this;
    document.onkeydown = function (event) {
      if (_this.$route.name == 'login') {
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
      }
    };
  },
  methods: {
    activeClick() {
      document.getElementById(this.kd).click();
      return;
    },
    moveLeft() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
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
    },
    moveRight() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0) {
        this.c.classList.remove("accs");
        this.kd++;
        if (this.kd > 5 + this.list.length) {
          this.kd = 5 + this.list.length
        }
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
    },
    moveUp() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      }
      if (this.kd >= 4 && this.kd <= 5) {
        this.c.classList.remove("accs");
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd >= 6 && this.kd <= 11) {
        this.kd = 4;
      } else if (this.kd > 10 && this.kd <= 6 + this.list.length) {
        this.c.classList.remove("accs");
        this.kd = this.kd - 6;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
    },
    moveDown() {
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0 && this.kd <= 3) {
        this.c.classList.remove("accs");
        this.kd = 4;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 4 && this.kd <= 5) {
        this.c.classList.remove("accs");
        this.kd = 6;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 6 && this.kd < 6 + this.list.length) {
        if (this.kd > this.list.length - 5) {
          this.c.classList.remove("accs");
          this.kd = 6 + this.list.length - 1;
          this.c = document.getElementById(this.kd);
          this.c.classList.add("accs");
          return;
        }
        this.c.classList.remove("accs");
        this.kd = this.kd + 6;
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
    godetails(val) {
      this.$router.push({ path: "/details", query: { id: val } });
    },
    getinfo() {
      this.$http.get("/collect/video/page?page=1&limit=10000").then((res) => {
        this.list = res.data.data.list;
      });
    },
    quit() {
      this.$store.commit("setUserinfo", {});
      this.$store.commit("setToken", "");
      Cookies.remove("userid");
      Cookies.remove("membership");
      Cookies.remove("username");
      Cookies.remove("token");
      // this.$refs.child.quit();
      this.$router.replace("/");
    },
    gobuy() {
      this.$router.push({ path: "/buyvip" });
    },
  },
};
</script>
<style lang="scss" scoped>
.logintop {
  display: flex;
  justify-content: space-between;
  padding: 50px;
  background: rgba($color: #fff, $alpha: 0.06);
  margin-top: 1%;
  border-radius: 10px;

  .ltl {
    display: flex;
    padding-top: 20px;
    width: 50%;
  }

  .tv2 {
    background: url("../assets/avatar.png") no-repeat center;
    width: 25%;
    background-position: 0% 0%;
    background-size: contain;
    text-align: center;
    line-height: 128px;
  }

  .tv {
    background: url("../assets/loginb1.png") no-repeat center;
    width: 25%;
    background-position: 0% 0%;
    background-size: contain;
    text-align: center;
    line-height: 128px;

    .tvimg {
      padding-top: 19%;
      width: 50%;
    }
  }

  .wz {
    margin-left: 30px;
  }

  .tztit {
    color: #fff;
    font-size: 40px;
  }

  .tzcon {
    font-size: 30px;
    color: #ffde05;
    margin-top: 25px;

    span {
      color: #b3b2c5;
    }
  }
}

.ltr {
  background: url("../assets/loginb2.png") no-repeat center;
  background-size: 100% 100%;
  width: 540px;
  height: 246px;
  color: #fff;

  .trtit {
    font-size: 40px;
    padding-bottom: 14px;
    padding-top: 10%;
    padding-left: 7%;
  }

  .trcon {
    font-size: 26px;
    padding-left: 7%;
    padding-bottom: 14px;
  }

  .ltrb {
    display: flex;
    justify-content: space-between;
    padding: 0 3% 0 7%;

    .trcon2 {
      line-height: 56px;
      // margin-right: 36px;
    }

    button {
      cursor: pointer;
      background: url("../assets/loginb3.png") no-repeat center;
      background-size: 100% 100%;
      border: none;
      color: #fff;
      width: 196px;
      height: 56px;
      line-height: 44px;
      font-size: 28px;
    }
  }
}

.histroy {
  padding-top: 1%;
  color: #fff;

  .el-image {
    border-radius: 10px;
  }

  .tithis {
    padding-bottom: 29px;
    font-size: 40px;
  }

  .hisbox {
    .hisl {
      display: flex;
      width: 100%;
      flex-wrap: wrap;
      overflow: auto;
    }

    .hislist:nth-child(n + 7) {
      margin-top: 10px;
    }

    .hisl::-webkit-scrollbar {
      display: none;
    }

    .hislist {
      margin-left: 30px;
    }

    .hislist {
      flex: none;
      width: 14.5%;
      position: relative;

      p {
        position: absolute;
        bottom: 13px;
        left: 24px;
        color: #fff;
        font-size: 1rem;
      }
    }

    .hisr {
      margin-left: 30px;
      width: 60px;
      height: 350px;
      background: url("../assets/hab.png") no-repeat center;
      background-size: 100% 100%;
      border-radius: 10px;
      line-height: 350px;
      text-align: center;

      .hisrimg {
        width: 28px;
        height: 28px;
      }
    }
  }
}

@media screen and (max-width: 1024px) {
  .tztit {
    font-size: 24px !important;
  }

  .tzcon {
    font-size: 24px !important;
  }

  .trtit {
    font-size: 24px !important;
  }

  .trcon {
    font-size: 24px !important;
  }

  .trcon2 {
    font-size: 14px !important;
  }

  .ltrb {
    button {
      width: 42% !important;
      height: 44px !important;
      margin-top: 1%;
    }
  }
}

.quit {
  background: #ffde05;
  font-size: 20px;
  padding: 5px 20px;
  border-radius: 30px;
  display: inline-block;
  margin-top: 30px;
  cursor: pointer;
}

.imgvip {
  width: 76px;
  height: 36px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>