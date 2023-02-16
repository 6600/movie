<template>
  <div class="contain loginPhone">
    <div class="mid">
      <div class="midl">
        <p>小太阳</p>
        <el-image :src="require('../assets/sun.png')"></el-image>
      </div>
      <div class="midr">
        <p style="padding-top:7%;font-size: 26px;">验证码登陆</p>
        <div class="ipt" id="1">
          <el-input v-model="keyword" ref="ipt1" @change="changes" placeholder="请输入账号"></el-input>
          <!-- @focus="acf" -->
        </div>
        <div class="ipt ipt2" id="2">
          <el-input placeholder="请输入验证码" ref="ipt2" @change="change2" v-model="keyword3">
            <!-- @focus="codf" -->
          </el-input>
          <div id="3">
            <el-button @click="getcode" type="primary" size="large">{{
              val
            }}</el-button>
          </div>
        </div>
        <div id="4" style="width:80%;margin: auto;">
          <el-button type="primary" size="large" round @click="submit">立即登录</el-button>
        </div>
        <div class="btm">
          <button @click="goback" id="5">返回密码登录</button>
          <button @click="goregister" id="6">注册账号</button>
        </div>
      </div>
    </div>
    <div class="keyboard-mask" v-if="accf">
      <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" />
    </div>
    <div class="keyboard-mask" v-if="passf">
      <SimpleKeyboards @onChange="onChange2" />
    </div>
    <audio controls="controls" hidden :src="require('../assets/music/point.mp3')" ref="ado"></audio>
  </div>
</template>
<script>
import SimpleKeyboard from "./components/simpleKeyboard.vue";
import SimpleKeyboards from "./components/simpleKeyboard2.vue";
import SimpleKeyboardss from "./components/simpleKeyboard3.vue";
import Cookies from "js-cookie";
export default {
  components: {
    SimpleKeyboard,
    SimpleKeyboards,
    SimpleKeyboardss,
  },
  data() {
    return {
      val: "获取验证码",
      accf: false,
      passf: false,
      codef: false,
      input: "",
      keyword: "",
      keyword3: "",
      gtcode: false,
      kd: 0,
    };
  },
  mounted() {
    let _this = this;
    // document.onkeydown = function (event) {
    //   console.log(_this.$route)
    //   if (_this.$route.name == 'codelogin') {
    //     if (event.keyCode == 37) {
    //       _this.moveLeft();
    //     } else if (event.keyCode == 38) {
    //       _this.moveUp();
    //     } else if (event.keyCode == 39) {
    //       _this.moveRight();
    //     } else if (event.keyCode == 8) {
    //       _this.$router.go(-1);
    //     } else if (event.keyCode == 40) {
    //       _this.moveDown();
    //     } else if (event.keyCode == 13) {
    //       _this.activeClick();
    //     }
    //   }
    // };
  },
  methods: {
    focu() {
      this.$nextTick(() => {
        this.$refs.ipt1.focus();
      });
    },
    changes() {
      this.$refs.ipt1.blur();
    },
    changes2() {
      this.$refs.ipt2.blur();
    },
    focu2() {
      this.$refs.ipt2.focus();
    },
    activeClick() {
      document.getElementById(this.kd).click();
      return;
    },
    moveLeft() {
      this.$refs.ado.currentTime = 0
      this.$refs.ado.play(); //播放
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
      this.$refs.ado.currentTime = 0
      this.$refs.ado.play(); //播放
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0 && this.kd <= 6) {
        this.c.classList.remove("accs");
        this.kd++;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
    },
    moveUp() {
      this.$refs.ado.currentTime = 0
      this.$refs.ado.play(); //播放
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0 && this.kd <= 4) {
        this.c.classList.remove("accs");
        this.kd--;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd > 4 && this.kd <= 6) {
        this.c.classList.remove("accs");
        this.kd = 4;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
    },
    moveDown() {
      this.$refs.ado.currentTime = 0
      this.$refs.ado.play(); //播放
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0 && this.kd <= 4) {
        this.c.classList.remove("accs");
        this.kd++;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
    },
    submit() {
      if (this.keyword == "") {
        this.$message.error("请输入手机号");
      } else if (this.keyword3 == "") {
        this.$message.error("请输入验证码");
      } else {
        this.$http
          .post("/phomeLogin", {
            mobile: this.keyword,
            code: this.keyword3,
          })
          .then((res) => {
            if (res.data.code == 0) {
              Cookies.set("token", res.data.data.token);
              this.$store.commit("setToken", res.data.data);
              this.getuserInfo(res.data.data.token);
              this.$router.replace("/");
            }
          });
      }
    },

    getuserInfo(token) {
      this.$http.get(`/user?token=${token}`).then((res) => {
        this.$store.commit("setUserinfo", res.data.data);
        Cookies.set("userid", res.data.data.id);
        Cookies.set("membership", res.data.data.membership);
        Cookies.set("username", res.data.data.username);
        this.$forceUpdate();
      });
    },
    getcode() {
      if (this.gtcode == false) {
        // this.gtcode = true
        this.val = 60;
        this.getcd();
      }
    },
    getcd() {
      this.$http
        .post("/sms/code/sendLogin", {
          mobile: this.keyword,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.$message.success(res.data.msg);
            let timeInterval = setInterval(() => {
              this.val = this.val - 1;
            }, 1000);
            setTimeout(() => {
              clearInterval(timeInterval);
              this.val = "获取验证码";
              this.gtcode = false;
            }, 60000);
          }
        });
    },
    goback() {
      this.$router.push({ path: "/loginPhone" });
    },
    goregister() {
      this.$router.push({ path: "/register" });
    },
    acf() {
      this.accf = true;
      this.passf = false;
    },
    pasf() {
      this.accf = false;
      this.passf = true;
    },
    onChange(input) {
      // input 是当前点击按钮的值
      this.keyword = input;
    },
    onChange2(input) {
      // input 是当前点击按钮的值
      this.keyword2 = input;
    },
    onKeyPress(button) {
      if (button == "{enter}") {
        // 如果按确认键的相应操作
      }
      if (button == "{bksp}") {
        // 删除键的相应操作
      }
    },
  },
};
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>
.contain {
  width: 100%;
  height: 100vh;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('../assets/loginbg.png') no-repeat center;
  background-size: 100% 100%;
}

.mid {
  background: #fff;
  display: flex;
  width: 54%;
  border-radius: 10px;

  .midl {
    width: 50%;

    p {
      color: #232222;
      font-size: 20px;
      text-align: center;
      padding: 29.72% 0 5% 0;
    }

    .el-image {
      width: 100px;
      height: 95px;
    }
  }

  .midr {
    width: 50%;
  }

  .ipt {
    padding: 20px 0;
    width: 80%;
    margin: auto;
  }

  .el-button {
    width: 100%;
    font-size: 24px;
  }
}

.keyboard-mask {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.btm {
  display: flex;
  justify-content: space-between;
  padding: 20px 0 11% 0;
  width: 80%;
  margin: auto;

  button {
    background: transparent;
    color: #303030;
    border: none;
    font-size: 20px;
  }
}

.ipt2 {
  display: flex;
  justify-content: space-between;

  .el-input {
    width: 60%;
  }

  button {
    height: 56px;
    width: 162px !important;
    // line-height: 56px;
  }
}
</style>