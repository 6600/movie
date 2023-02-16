<template>
  <div class="contain searchIndex">
    <el-row :gutter="10">
      <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
        <div class="mid">
          <div class="midl">
            <div class="sch">
              <!-- <div class="schl">
                <el-image class="img" :src="require('../assets/search.png')">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div> -->
              <div class="schr">
                <el-input v-model="keyword" readonly placeholder="请输入影片的首字母或全拼">
                  <i slot="prefix" class="el-input__icon el-icon-search"></i>
                </el-input>
              </div>
            </div>
            <div class="opeater">
              <button @click="clear" id="1">
                <el-image class="img" :src="require('../assets/del.png')">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                清空
              </button>
              <button @click="puback" id="2">
                <el-image class="img2" :src="require('../assets/back.png')">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                退格
              </button>
            </div>
            <div class="jianpan">
              <button v-for="(item, index) in list" :key="index" @click="confirm(item)" :id="3 + Number(index)">
                {{ item }}
              </button>
            </div>
          </div>
          <div class="midm" id="midm" v-if="keyword != ''">
            <p class="mtit">猜你想搜</p>
            <div v-for="(item, index) in hotlist" :key="index" :id="3 + list.length + Number(index)"
              :class="{ 'acthot': ah == index }" @click="getDetail(item.name, index)">
              <button v-if="item != null">{{ item.name }}</button>
            </div>
          </div>
          <div class="midr" v-if="keyword != ''" id="midr" v-infinite-scroll="load" style="overflow: auto">
            <div>
              <p class="dzs">“{{ searchKeyword }}”搜索结果</p>
            </div>
            <div class="schlistbox">
              <div class="schlist" v-for="(item, index) in datalist" :key="item.id"
                :id="3 + list.length + hotlist.length + Number(index)" @click="godetail(item.id)">
                <el-image class="img" :src="item.cover">
                  <div slot="placeholder" class="image-slot">
                    <el-image :src="require('../assets/his.png')"></el-image>
                  </div>
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
                <p class="mrt">{{ item.name }}</p>
              </div>
            </div>
          </div>
          <div class="midano" v-if="keyword == ''">
            <p class="dzs">大家都在搜</p>
            <div class="midanobox">
              <div class="mblist" v-for="(item, index) in hotlist" :key="index">
                <div :id="3 + list.length + Number(index)" @click="godetail(item.videoId)"
                  style="display:inline-block;padding:10px">
                  <span></span>{{ item.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <audio controls="controls" hidden :src="require('../assets/music/point.mp3')" ref="ado"></audio> -->
      </el-col></el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      keyword: "",
      list: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ],
      hotlist: [],
      page: 1,
      datalist: [],
      kdd: 0,
      searchKeyword: '',
      ah: -1
    };
  },
  mounted() {
    this.kdd = 0;
    // this.clientHeight = document.documentElement.clientHeight;
    // window.addEventListener("scroll", this.scrollBottom, true);
    this.getHot();
    let _this = this;
    // document.onkeydown = function (event) {
    //   if (_this.$route.name == "search") {
    //     if (event.keyCode == 37) {
    //       _this.c.classList.add("accs");
    //       _this.moveLeft();
    //     } else if (event.keyCode == 38) {
    //       _this.moveUp();
    //     } else if (event.keyCode == 39) {
    //       _this.moveRight();
    //     } else if (event.keyCode == 8) {
    //       _this.$router.go(-1);
    //     }
    //     if (event.keyCode == 40) {
    //       _this.moveDown();
    //     }
    //     if (event.keyCode == 13) {
    //       _this.activeClick();
    //     }
    //   }
    // };
  },
  methods: {
    getDetail(name, val) {
      this.$http.get(`video/searchInfo?name=${name}`).then(res => {
        this.datalist = res.data.data
        this.searchKeyword = name
        this.ah = val
      })
    },
    activeClick() {
      document.getElementById(this.kdd).click();
    },
    moveLeft() {
      // this.$refs.ado.currentTime = 0;
      // this.$refs.ado.play(); //播放
      if (this.keyword == "" && this.kdd > 3 + this.list.length) {
        this.c.classList.remove("accs");
        this.kdd--;
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
        return;
      }
      if (this.kdd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kdd = 1;
      } else if (this.kdd > 0) {
        if (
          this.kdd >= 39 &&
          this.kdd <= 2 + this.list.length + this.hotlist.length
        ) {
          this.c.classList.remove("accs");
          this.kdd = 2;
          this.c = document.getElementById(this.kdd);
          this.c.classList.add("accs");
          return;
        }
        if (this.kdd == 3 + this.list.length + this.hotlist.length) {
          let d = document.getElementsByClassName('acthot')
          this.c.classList.remove("accs");
          this.kdd = Number(d[0].id);
          this.c = document.getElementById(this.kdd);
          this.c.classList.add("accs");
          return;
        }
        this.c.classList.remove("accs");
        this.c.classList.remove("active");
        this.kdd--;
        if (this.kdd > 2 && this.kdd < 39) {
          this.c = document.getElementById(this.kdd);
          this.c.classList.add("active");
        }
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
      }
      if (this.kdd > 2 + this.list.length && this.kdd < 2 + this.list.length + this.hotlist.length) {
        var el = document.getElementById(this.kdd);
        const viewPortHeight = document.getElementById("midm").clientHeight;
        const offsetTop = el.offsetTop;
        const scrollTop = document.getElementById("midm").scrollTop;
        const intop = el.offsetHeight;
        let d = scrollTop < offsetTop;
        if (d == false) {
          document.getElementById("midm").scrollTop = offsetTop;
        }
      }
      if (this.kdd > this.list.length + this.hotlist.length) {
        var el = document.getElementById(this.kdd);
        const viewPortHeight = document.getElementById("midr").clientHeight;
        const offsetTop = el.offsetTop;
        const scrollTop = document.getElementById("midr").scrollTop;
        const intop = el.offsetHeight;
        let d = scrollTop < offsetTop;
        if (d == false) {
          document.getElementById("midr").scrollTop = offsetTop;
        }
      }
    },
    moveRight() {
      // this.$refs.ado.currentTime = 0;
      // this.$refs.ado.play(); //播放
      if (this.keyword == "" && this.kdd > 2 + this.list.length) {
        this.c.classList.remove("accs");
        this.kdd++;
        if (this.kdd > 2 + this.list.length + this.hotlist.length) {
          this.kdd = 2 + this.list.length + this.hotlist.length;
        }
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
        return;
      }
      if (this.keyword == "" &&this.kdd == 2) {
          this.c.classList.remove("accs");
          this.kdd = 3 + this.list.length;
          if (this.kdd > 2 + this.list.length + this.hotlist.length) {
            this.kdd = 2
          }
          this.c = document.getElementById(this.kdd);
          this.c.classList.add("accs");
          return;
        }
      if (this.kdd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kdd = 1;
      } else if (
        this.kdd > 0 &&
        this.kdd <=
        2 + this.list.length + this.hotlist.length + this.datalist.length
      ) {
        if (this.kdd == 2) {
          this.c.classList.remove("accs");

          let d = document.getElementsByClassName('acthot')
          this.c.classList.remove("accs");
          this.kdd = Number(d[0].id);
          // this.kdd = 3 + this.list.length;
          if (this.kdd > 2 + this.list.length + this.hotlist.length) {
            this.kdd = 2
          }
          this.c = document.getElementById(this.kdd);
          this.c.classList.add("accs");
          return;
        }
        if (
          this.kdd >= 39 &&
          this.kdd < 3 + this.list.length + this.hotlist.length
        ) {
          this.c.classList.remove("accs");
          this.kdd = 3 + this.list.length + this.hotlist.length;
          if (this.kdd > 2 + this.list.length + this.hotlist.length + this.datalist.length) {
            this.kdd = 2 + this.list.length + this.hotlist.length;
          }
          this.c = document.getElementById(this.kdd);
          this.c.classList.add("accs");
          return;
        }
        if (this.kdd >= 2 + this.list.length + this.hotlist.length + this.datalist.length) {
          return
        }
        if (this.kdd == 8 || this.kdd == 14 || this.kdd == 20 || this.kdd == 26 || this.kdd == 32 || this.kdd == 38) {
          this.c.classList.remove("accs");
          this.c.classList.remove("active");
          this.kdd = 3 + this.list.length
          this.c = document.getElementById(this.kdd);
          this.c.classList.add("accs");
          return
        }
        this.c.classList.remove("accs");
        this.c.classList.remove("active");
        this.kdd++;
        if (this.kdd > 2 && this.kdd < 39) {
          this.c = document.getElementById(this.kdd);
          this.c.classList.add("active");
        }
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
      }
      if (this.kdd > 2 + this.list.length && this.kdd < 2 + this.list.length + this.hotlist.length) {
        var el = document.getElementById(this.kdd);
        const viewPortHeight = document.getElementById("midm").clientHeight;
        const offsetTop = el.offsetTop;
        const scrollTop = document.getElementById("midm").scrollTop;
        const intop = el.offsetHeight;
        let d = offsetTop + intop < scrollTop + viewPortHeight;
        if (d == false) {
          document.getElementById("midm").scrollTop = offsetTop;
        }
      }
      if (this.kdd > this.list.length + this.hotlist.length) {
        var el = document.getElementById(this.kdd);
        const viewPortHeight = document.getElementById("midr").clientHeight;
        const offsetTop = el.offsetTop;
        const scrollTop = document.getElementById("midr").scrollTop;
        const intop = el.offsetHeight;
        let d = offsetTop + intop < scrollTop + viewPortHeight;
        if (d == false) {
          document.getElementById("midr").scrollTop = offsetTop;
        }
      }
    },
    moveUp() {
      // this.$refs.ado.currentTime = 0;
      // this.$refs.ado.play(); //播放
      if (this.keyword == "" && this.kdd > 4 + this.list.length) {
        this.c.classList.remove("accs");
        this.kdd = this.kdd - 2;
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
        return;
      }
      if (this.kdd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kdd = 1;
      } else if (this.kdd == 2) {
        this.c.classList.remove("accs");
        this.kdd = 1;
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
      } else if (this.kdd > 2 && this.kdd <= 8) {
        this.c.classList.remove("accs");
        this.c.classList.remove("active");
        this.kdd = 2;
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
      } else if (this.kdd > 8 && this.kdd <= 2 + this.list.length) {
        this.c.classList.remove("accs");
        this.c.classList.remove("active");
        this.kdd = this.kdd - 6;
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
        this.c.classList.add("active");
      } else if (
        this.kdd > 39 &&
        this.kdd < 3 + this.list.length + this.hotlist.length
      ) {
        this.c.classList.remove("accs");
        this.kdd--;
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
      } else if (this.kdd > 5 + this.list.length + this.hotlist.length) {
        this.c.classList.remove("accs");
        this.kdd = this.kdd - 3;
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
      }
      if (this.kdd > 2 + this.list.length && this.kdd < 2 + this.list.length + this.hotlist.length) {
        var el = document.getElementById(this.kdd);
        const viewPortHeight = document.getElementById("midm").clientHeight;
        const offsetTop = el.offsetTop;
        const scrollTop = document.getElementById("midm").scrollTop;
        const intop = el.offsetHeight;
        let d = scrollTop < offsetTop;
        if (d == false) {
          document.getElementById("midm").scrollTop = offsetTop;
        }
      }
      if (this.kdd > this.list.length + this.hotlist.length) {
        var el = document.getElementById(this.kdd);
        const viewPortHeight = document.getElementById("midr").clientHeight;
        const offsetTop = el.offsetTop;
        const scrollTop = document.getElementById("midr").scrollTop;
        const intop = el.offsetHeight;
        let d = scrollTop < offsetTop;
        if (d == false) {
          document.getElementById("midr").scrollTop = offsetTop;
        }
      }
    },
    moveDown() {
      // this.$refs.ado.currentTime = 0;
      // this.$refs.ado.play(); //播放
      if (this.keyword == "" && this.kdd > 2 + this.list.length) {
        this.c.classList.remove("accs");
        this.kdd = this.kdd + 2;
        if (this.kdd > 2 + this.list.length + this.hotlist.length) {
          this.kdd = this.list.length + this.hotlist.length + 2;
        }
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
        return;
      }
      if (this.kdd == 0) {
        this.c = document.getElementById(1);
        this.c.classList.add("accs");
        this.kdd = 1;
      } else if (this.kdd > 0 && this.kdd <= 2) {
        this.c.classList.remove("accs");
        this.kdd++;
        this.c = document.getElementById(this.kdd);
        if (this.kdd == 3) {
          this.c.classList.add("active");
        }
        this.c.classList.add("accs");
      } else if (this.kdd > 2 && this.kdd < this.list.length - 3) {
        this.c.classList.remove("active");
        this.c.classList.remove("accs");
        this.kdd = this.kdd + 6;
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
        this.c.classList.add("active");
      } else if (
        this.kdd > 2 + this.list.length &&
        this.kdd < 2 + this.list.length + this.hotlist.length
      ) {
        this.c.classList.remove("accs");
        this.kdd++;
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
      } else if (this.kdd > this.list.length + this.hotlist.length) {
        this.c.classList.remove("accs");
        this.kdd = this.kdd + 3;
        if (
          this.kdd >
          this.list.length + this.hotlist.length + 2 + this.datalist.length
        ) {
          this.kdd =
            this.list.length + this.hotlist.length + 2 + this.datalist.length;
        }
        this.c = document.getElementById(this.kdd);
        this.c.classList.add("accs");
      }
      if (this.kdd > 2 + this.list.length && this.kdd < 2 + this.list.length + this.hotlist.length) {
        var el = document.getElementById(this.kdd);
        const viewPortHeight = document.getElementById("midm").clientHeight;
        const offsetTop = el.offsetTop;
        const scrollTop = document.getElementById("midm").scrollTop;
        const intop = el.offsetHeight;
        let d = offsetTop + intop < scrollTop + viewPortHeight;
        if (d == false) {
          document.getElementById("midm").scrollTop = offsetTop;
        }
      }
      if (this.kdd > this.list.length + this.hotlist.length) {
        var el = document.getElementById(this.kdd);
        const viewPortHeight = document.getElementById("midr").clientHeight;
        const offsetTop = el.offsetTop;
        const scrollTop = document.getElementById("midr").scrollTop;
        const intop = el.offsetHeight;
        let d = offsetTop + intop < scrollTop + viewPortHeight;
        if (d == false) {
          document.getElementById("midr").scrollTop = offsetTop;
        }
      }
    },
    godetail(item) {
      this.$router.push({ path: "/details", query: { id: item } });
    },
    scrollBottom() {
      this.page++;
      this.getinfo();
    },
    getHot() {
      this.$http.get("/video/stat").then((res) => {
        this.hotlist = res.data.data;
      });
    },
    load() {
      this.page++;
      this.getinfo();
    },
    confirm(item) {
      console.log('!')
      this.keyword += item;
      this.page = 1;
      this.getinfo2();
    },
    getinfo() {
      this.$http
        .get(`/video/search?page=1&limit=100&keyword=${this.keyword}`)
        .then((res) => {
          this.hotlist = res.data.data.list;
        });
    },
    getinfo2() {
      this.$http
        .get(`/video/search?page=1&limit=100&keyword=${this.keyword}`)
        .then((res) => {
          this.hotlist = res.data.data.list;
          this.getDetail(this.hotlist[0].name, 0)
        });
    },
    clear() {
      this.keyword = "";
      this.page = 1;
      this.getinfo();
    },
    puback() {
      if (this.keyword.length > 0) {
        this.keyword = this.keyword.slice(0, this.keyword.length - 1);
        this.page = 1;
        this.getinfo();
      }
    },
  },
};
</script>
<style lang="scss">
.searchIndex {
  .el-input--prefix .el-input__inner {
    padding-left: 43px;
  }

  .el-input__icon {
    font-size: 21px;
    line-height: 55px;
  }

  .el-input__inner {
    border-radius: 30px;
    background: #efefef;
    border: none;
    color: #303030;
    font-size: 16px;
    height: 55px;
  }
}
</style>
<style lang="scss" scoped>
body {
  background: #fff;
}

.contain {
  background: #fff;
  min-height: 100vh;

  .el-image {
    border-radius: 10px;
  }

  .mid {
    display: flex;
    min-height: 100vh;

    .midl {
      width: 27.63%;

      // width: 31%;
      background: #fff;

      .sch {
        padding-top: 50px;
        width: 86%;
        margin: auto;

        .schr {
          // width: 70%;
          margin: auto;
        }

        .img {
          width: 30px;
          height: 30px;
          vertical-align: middle;
        }

        display: flex;
        line-height: 36px;
      }

      .opeater {
        display: flex;
        padding: 34px 0;
        justify-content: center;

        button {
          border-radius: 10px;
          border: none;
          color: #303030;
          background: transparent;
          font-size: 20px;
          padding: 16px 26px;
          font-weight: bold;
          // margin: 0 42px;
        }

        .img {
          width: 26px;
          height: 28px;
          vertical-align: middle;
          margin-right: 10px;
        }

        .img2 {
          width: 28px;
          height: 18px;
          vertical-align: text-bottom;
          border-radius: 0 !important;
          margin-right: 12px;
        }
      }

      .jianpan {
        overflow: hidden;
        position: relative;
        display: flex;
        flex-wrap: wrap;

        button {
          background: transparent;
          border: none;
          color: #202020;
          font-size: 28px;
          /* padding: 20px 7.6%; */
          padding: 0 !important;
          margin: 20px 1%;
          width: 46px;
          text-align: center;
          cursor: pointer;
          font-weight: bold;
        }
      }
    }
  }
}

.midm {
  // padding: 0 61px;
  // width: 17%;
  width: 22.22%;
  max-height: 99vh;
  overflow: auto;
  // padding-right: 1%;
  background: linear-gradient(270deg, #ffffff, #efefef);

  .mtit {
    font-size: 40px;
    color: #303030;
    text-align: center;
    padding-bottom: 5px;
  }

  div {
    margin-top: 17px;
    width: 94%;
    margin: auto;
  }

  button {
    background: transparent;
    border: none;
    color: #303030;
    font-size: 32px;
    width: 98%;
    height: 90px;
  }

  button:hover {
    border: none;
    color: #ff6936;
    background-size: 100% 100%;
  }
}

.schlist:not(:nth-child(3n + 1)) {
  margin-left: 2%;
}

.schlistbox {
  display: flex;
  flex-wrap: wrap;
}

.midr {
  // width: 47%;
  width: 48.15%;
  // justify-content: space-around;
  max-height: 99vh;
  overflow: auto;
  position: relative;
  padding-left: 1%;
  background: linear-gradient(270deg, #ffffff, #efefef);

  .dzs {
    font-size: 40px;
    color: #303030;
    text-align: left;
    padding-bottom: 5px;
  }

  .schlist {
    position: relative;
    // padding: 0 20px;
    margin-top: 20px;
    text-align: center;
    width: 29%;

    .el-image {
      height: 100%;
    }

    .img {
      // width: 220px;
      // height: 320px;
    }

    .mrt {
      color: #fff;
      font-size: 28px;
      padding: 5px 0 0 4%;
      text-align: left;
      position: absolute;
      position: absolute;
      bottom: 0%;
      background: linear-gradient(0deg, rgba(#000, 0.5), rgba(#333, 0));
      border-radius: 0 0 10px 10px;
      width: 96%;
    }
  }
}

.midr::-webkit-scrollbar {
  display: none;
}

.midm::-webkit-scrollbar {
  display: none;
}

.imgvip {
  width: 76px;
  height: 36px;
  position: absolute;
  top: 0;
  right: 0;
}

.midano {
  width: 72.37%;

  // width: 69%;
  background: linear-gradient(270deg, #ffffff, #efefef);

  .dzs {
    font-size: 35px;
    color: #232222;
    padding-left: 6%;
    padding-top: 4%;
  }

  .midanobox {
    overflow: hidden;
    padding-left: 10%;
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 5px;

    .mblist {
      width: 46%;
      font-size: 32px;
      color: #232222;
      margin-top: 36px;
      margin-right: 2%;

      span {
        width: 4px;
        height: 4px;
        background: #fe8b3b;
        display: inline-block;
        vertical-align: middle;
        margin-right: 17px;
        border-radius: 50%;
      }
    }
  }
}

.acthot {
  background: #FE9D3E;

  button {
    color: #fff
  }
}
</style>
