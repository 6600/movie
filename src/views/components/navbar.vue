<template>
  <div class="top navbar">
    <el-row :gutter="10">
      <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23" :offset="1">
        <div style="display: flex; justify-content: space-between">
          <div class="search" @click="gosearch">
            <el-input
            id="1"
              placeholder="请输入内容"
              prefix-icon="el-icon-search"
              v-model="search"
              readonly
            >
            </el-input>
          </div>
          <div class="topr">
            <div id="2"
              v-if="userinfo.username != undefined"
              style="padding-top: 9px; position: relative"
              @click="goLogin2"
            >
              <img
                style="width: 70px; height: 70px"
                :src="require('../../assets/avatar.png')"
                alt=""
              /><img
                class="imghg"
                v-if="userinfo.membership > 0"
                :src="require('../../assets/VIP.png')"
                alt=""
              />
            </div>
            <div id="2" class="login" @click="goLogin" v-else>
              <img src="../../assets/login.png" alt="" />
              <span>登录</span>
            </div>
            <div class="vip"  id="3">
              <img src="../../assets/VIP.png" alt="" />
              <span>开通VIP</span>
              <span>限时特惠</span>
              <span style="margin-left: 10px; padding-right: 10px"
                >低至前3月9.9元/月</span
              >
            </div>
            <div class="time">{{ time }}</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  props:{
    userinfo:{
      type:Array,
      default:[]
    }
  },
  data() {
    return {
      search: "",
      time: "",
      username: Cookies.get("username"),
      membership: Cookies.get("membership"),
      width:'',
      height:'',
    };
  },
  mounted() {
    this.getTime();
    this.width = document.body.clientWidth
    this.height = document.body.clientHeight
  },
  beforeDestroy() {
    clearInterval();
  },
  methods: {
    getUserInfo() {
      let c = Cookies.get("token");
      this.$http.get(`/user?token=${c}`).then((res) => {
        this.list = res.data.data;
      });
    },
    gosearch() {
      this.$router.push({ path: "/search" });
    },
    goLogin2() {
      this.$router.push({ path: "/login" });
    },
    goLogin() {
      this.$router.push({ path: "/loginPhone" });
    },
    getTime() {
      let time = new Date();
      let time1 = time.getHours();
      let time2 = time.getMinutes();
      if (Number(time2) < 10) {
        time2 = "0" + time2;
      }
      this.time = time1 + ":" + time2;
    },
  },
};
</script>
<style lang="scss">
.navbar {
  .el-input__inner {
    background-color: #1c1d40;
    border: 1px solid #1c1d40;
    border-radius: 28px;
    height: 56px;
    line-height: 56px;
    font-size: 28px;
    padding-left: 60px;
  }
  .el-input__prefix {
    left: 16px;
    top: 3px;
  }
  .el-input__icon {
    width: 30px;
    font-size: 30px;
  }
  .el-image {
    width: 100%;
    height: 100%;
  }
}
</style>
<style lang="scss" scoped>
.top {
  height: 90px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  // line-height: 116px;
}
.search {
  padding-top: 20px;
  width: 336px;
}
.el-col {
  border-radius: 4px;
}

.login {
  color: #8989ae;
  margin-top: 20px;
  background: #1d1d45;
  padding: 8px 25px;
  // line-height: 40px;
  letter-spacing: 2px;
  border-radius: 20px;
  text-align: center;
  font-size: 28px;

  img {
    width: 35px;
    height: 36px;
    vertical-align: text-bottom;
    margin-right: 10px;
  }
}

.topr {
  display: flex;

  .vip {
    margin-left: 20px;
    margin-top: 20px;
    height: 56px;
    line-height: 62px;
    font-size: 28px;
    background: url("../../assets/vipbg.png") no-repeat left;
    background-size: 35% 100%;
    color: #ffe4a7;
    border: 1px solid #5b4536;
    border-radius: 28px;

    span:nth-child(3) {
      margin-left: 25px;
    }

    img {
      width: 40px;
      height: 26px;
      margin: 0 15px;
    }
  }

  .time {
    color: #b3b3c5;
    margin-left: 17px;
    height: 20px;
    font-size: 28px;
    line-height: 20px;
    padding-top: 42px;
  }
}
@media screen and (max-width: 1280px) {
  .vip {
    font-size: 16px !important;
    img {
      width: 20px !important;
      height: 16px !important;
    }
  }
  .login {
    font-size: 15px;
    display: flex;
    align-items: center;
    img {
      width: 17.5px;
      height: 18px;
    }
  }
}
.imghg {
  width: 40px!important;
  height: 26px!important;
  position: absolute;
  top: 3%;
  left: 21%;
}
</style>