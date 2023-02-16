<template>
  <div class="contain loginPhone">
    <div class="mid">
      <div class="midl">
        <p>小太阳</p>
        <el-image :src="require('../assets/sun.png')"></el-image>
      </div>
      <div class="midr">
        <div class="midt">
          <p @click="index = 0" id="1">扫码登陆</p>
          <p @click="index = 1" id="2">账号登陆</p>
          <p :class="{ 'act1': index == 0, 'act2': index == 1 }"></p>
        </div>
        <div class="zhdl" v-show="index == 1">
          <div class="ipt" @click="focu" id="3">
            <el-input v-model="keyword" ref="ipt1" @change="changes" placeholder="请输入您的手机号"></el-input>
          </div>
          <div class="ipt" @click="focu2" id="4">
            <el-input ref="ipt2" v-model="keyword2" @change="changes2" placeholder="请输入您的登录密码"></el-input>
          </div>
          <div style="width:80%;margin: auto;">
            <el-button id="5" type="primary" size="large" round @click="submit">立即登录</el-button>
          </div>
          <div class="btm">
            <button @click="goback" id="6">返回</button>
            <button @click="goregister" id="7">注册账号</button>
            <button @click="gocode" id="8">验证码登录</button>
          </div>
        </div>
        <div class="smdl" v-show="index == 0" style="height:395px">
          <iframe style="height:100%;margin-top: 10px;" :src="url" frameborder="0" sandbox="allow-scripts allow-top-navigation"></iframe>
          <!-- <div class="emw" style="padding-top:50px">
             <el-image style="width:152px" :src="require('../assets/ewm.png')"></el-image>
          </div> -->
          <!-- <p style="padding-top:3.42%;font-size: 12px;font-weight: bold;color: #202020;">请用微信扫码登录</p> -->
        </div>
      </div>
    </div>
    <div class="keyboard-mask" v-if="accf">
      <SimpleKeyboard @onChange="onChange" @onKeyPress="onKeyPress" />
    </div>
    <div class="keyboard-mask" v-if="passf">
      <SimpleKeyboards @onChange="onChange2" />
    </div>
    <!-- <audio controls="controls" hidden :src="require('../assets/music/point.mp3')" ref="ado"></audio> -->
  </div>
</template>
<script>
import SimpleKeyboard from "./components/simpleKeyboard.vue";
import SimpleKeyboards from "./components/simpleKeyboard2.vue";
import Cookies from "js-cookie";
export default {
  components: {
    SimpleKeyboard,
    SimpleKeyboards,
  },
  data() {
    return {
      accf: false,
      passf: false,
      input: "",
      index: 0,
      keyword: "",
      keyword2: "",
      kd: 0,
      url: ''
    };
  },
  mounted() {
    let _this = this;
    this.getcode()
    document.onkeydown = function (event) {
      if (_this.$route.name == 'loginPhone') {
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
    getcode() {
      this.$http.get('wx/attestation/getLoginUrl').then(res => {
        this.url = res.data.data
      })
    },
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
      // this.$refs.ado.currentTime = 0
      // this.$refs.ado.play(); //播放
      if (this.kd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kd = 1;
      } else if (this.kd > 0) {

        this.c.classList.remove("accs");
        this.kd--;
        if (this.kd <= 2) {
          this.activeClick()
        }
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
      } else if (this.kd > 0 && this.kd <= 2) {
        this.c.classList.remove("accs");
        this.kd++;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
        this.activeClick()
      } else if (this.kd > 2 && this.kd <= 8) {
        this.c.classList.remove("accs");
        this.kd++;
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
      } else if (this.kd > 2 && this.kd < 6) {
        this.c.classList.remove("accs");
        this.kd--;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd >= 6 && this.kd <= 8) {
        this.c.classList.remove("accs");
        this.kd = 5;
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
      } else if (this.kd > 0 && this.kd <= 2) {
        this.c.classList.remove("accs");
        this.kd++;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      } else if (this.kd > 2 && this.kd < 6) {
        this.c.classList.remove("accs");
        this.kd++;
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
      }
    },
    submit() {
      if (this.keyword == "") {
        this.$message.error("请输入手机号");
      } else if (this.keyword2 == "") {
        this.$message.error("请输入密码");
      } else {
        this.$http
          .post("/login", {
            mobile: this.keyword,
            password: this.keyword2,
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
    goback() {
      this.$router.push({ path: "/" });
    },
    goregister() {
      this.$router.push({ path: "/register" });
    },
    gocode() {
      this.$router.push({ path: "/codelogin" });
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
.loginPhone {
  .el-input__inner {
    // background: transparent;
    // border: none;
    // color: #b3b2c5;
    // font-size: 30px;
    height: 56px;
    line-height: 56px;
    font-size: 20px !important;
  }
}
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
  min-height: 470px;

  .midl {
    width: 50%;

    p {
      color: #232222;
      font-size: 30px;
      text-align: center;
      padding: 20% 0 5% 0;
    }

    .el-image {
      width: 200px;
      height: 190px;
    }
  }

  .midr {
    width: 50%;
  }

  .ipt {
    width: 80%;
    margin: 20px auto;
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
  padding: 30px 0 11% 0;
  width: 80%;
  margin: auto;

  button {
    background: transparent;
    color: #303030;
    border: none;
    font-size: 20px;
  }
}

.midt {
  display: flex;
  justify-content: center;
  padding-top: 7%;
  font-size: 20px;
  font-weight: bold;
  position: relative;
  p {
    width: 30%;
  }

  .act1 {
    position: absolute;
    width: 27px;
    height: 4px;
    background: #FE9D3E;
    bottom: -10px;
    left: 32%;
  }

  .act2 {
    position: absolute;
    width: 27px;
    height: 4px;
    background: #FE9D3E;
    bottom: -10px;
    left: 62.5%;
  }
}
.zhdl{
  padding-top: 26px;
}
</style>