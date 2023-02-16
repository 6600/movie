<template>
  <div class="contain buyvip">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="22" :lg="22" :xl="22" :offset="1">
        <div class="avatar">
          <el-image style="width: 100px; height: 100px" :src="require('../assets/avatar.png')"></el-image>
          <p>{{ list.username }}</p>
          <el-image v-show="list.membership > 0" style="
              width: 40px;
              height: 26px;
              padding-top: 32px;
              padding-left: 10px;
            " :src="require('../assets/VIP.png')"></el-image>
        </div>
        <div class="list" :class="{ active: index == val }" v-for="(item, index) in 3" :key="index"
          v-on:mouseover="val = index">
          <div class="listl">
            <p class="llt">黄金月卡</p>
            <div class="llb">
              <el-image style="width: 30px; height: 30px" :src="require('../assets/vs2.png')"></el-image>
              <p class="sf">尊享身份</p>
              <p class="sx"></p>
              <el-image style="width: 30px; height: 30px" :src="require('../assets/vs1.png')"></el-image>
              <p class="sf">vip片库</p>
            </div>
          </div>
          <div class="listr">
            <p><span class="s1">30</span> <span class="s2">元</span></p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Cookies from "js-cookie";
export default {
  data() {
    return {
      val: -1,
      list: [],
    };
  },
  mounted() {
    this.getinfo();
  },
  methods: {
    getinfo() {
      let c = Cookies.get("token");
      this.$http.get(`/user?token=${c}`).then((res) => {
        this.list = res.data.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.buyvip {
  color: #fff;

  .avatar {
    height: 100px;
    line-height: 100px;
    display: flex;
    font-size: 24px;
    padding: 5% 9% 0% 9%;
  }
}

.list {
  width: 80%;
  margin: auto;
  display: flex;
  margin-top: 30px;
  position: relative;

  .listl {
    width: 80%;
    height: 140px;
    background-color: rgba(242, 242, 242, 0.3);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .listr {
    width: 20%;
    height: 140px;
    background-color: rgba(242, 242, 242, 0.5);
    line-height: 140px;

    p {
      font-size: 0px;
      padding-left: 15%;
      font-weight: bold;

      .s1 {
        font-size: 50px;
      }

      .s2 {
        font-size: 24px;
      }
    }
  }
}

.llt {
  font-size: 30px;
  color: #dddcdc;
  font-weight: bold;
  padding: 4% 0 1% 6%;
}

.llb {
  display: flex;
  color: #333;
  font-size: 18px;
  font-weight: bold;
  line-height: 40px;
  padding-left: 6%;

  .sf {
    padding: 0 12px;
  }

  .sx {
    width: 2px;
    height: 24px;
    background: #fff;
    margin-top: 5px;
    margin-right: 12px;
  }
}

.active {
  .llt {
    color: #9e8163;
  }

  .listl {
    width: 80%;
    height: 160px;
    background: -webkit-linear-gradient(0deg,
        rgba(246, 226, 189, 1) 9%,
        rgba(200, 165, 127, 1) 61%);
    background: -moz-linear-gradient(90deg,
        rgba(246, 226, 189, 1) 9%,
        rgba(200, 165, 127, 1) 61%);
    background: linear-gradient(90deg,
        rgba(246, 226, 189, 1) 9%,
        rgba(200, 165, 127, 1) 61%);
    border: none;
    border-radius: 0px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }

  .listr {
    width: 20%;
    height: 160px;
    background-color: rgba(181, 145, 109, 1);

    p {
      color: #6b4725;
    }
  }
}
</style>
