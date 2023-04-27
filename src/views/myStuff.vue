<template>
    <div class="contain classify">
        <el-row :gutter="10">
            <el-col :xs="3" :sm="4" :md="4" :lg="4" :xl="4" :offset="1" style="position:relative">
                <div style="color:rgb(239,239,239)">1</div>
                <div class="allfenlei">
                    <button @click="gethis" id="1" :class="{ activeNav: activeType == 0 }">历史记录</button>
                    <button @click="getcol" id="2" :class="{ activeNav: activeType == 1 }">我的收藏</button>
                </div>
            </el-col>
            <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18" style="background:#efefef">
                <div class="rightbox">
                    <div class="mid" v-if="activeType == 0">
                        <div class="list" v-for="(item, index) in dataList" :key="item.id" :id="3 + Number(index)"
                            @click="godetails(item.videoId)">
                            <el-image :src="item.videoCover">
                                <div slot="placeholder" class="image-slot">
                                    <el-image :src="require('../assets/his.png')"></el-image>
                                </div>
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                            <el-image class="vip3" v-if="item.membership == 1"
                                :src="require('../assets/vip4.png')"></el-image>
                            <p>{{ item.videoName }}</p>
                        </div>
                    </div>
                    <div class="mid" v-if="activeType == 1">
                        <div class="list" v-for="(item, index) in dataList2" :key="item.id" :id="3 + Number(index)"
                            @click="godetails(item.videoId)">
                            <el-image :src="item.cover">
                                <div slot="placeholder" class="image-slot">
                                    <el-image :src="require('../assets/his.png')"></el-image>
                                </div>
                                <div slot="error" class="image-slot">
                                    <i class="el-icon-picture-outline"></i>
                                </div>
                            </el-image>
                            <el-image class="vip3" v-if="item.membership == 1"
                                :src="require('../assets/vip4.png')"></el-image>
                            <p>{{ item.name }}</p>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
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
            activeType: 0,
            activeType2: "",
            activeType3: "",
            activeType4: "全部",
            activeType5: 1,
            typeList: [],
            page: 1,
            dataList: [],
            dataList2: [],
            clientHeight: 0,
            userInfo: [],
            kd: 0,
            nlb: '',
            nlx: ''
        };
    },
    mounted() {
        this.activeType = this.$route.query.id
        if (this.activeType == 0) {
            this.gethis()
        } else if (this.activeType == 1) {
            this.getcol()
        }
        setTimeout(() => {
            this.c = document.getElementById(Number(this.$route.query.id) + 1);
            console.log(this.c)
            this.c.classList.add("accs");
        }, 200);
        this.getUserInfo();
        this.clientHeight = document.documentElement.clientHeight;
        window.addEventListener("scroll", this.scrollBottom, true);
        let _this = this;
        document.onkeydown = function (event) {
            if (_this.$route.name == 'user') {
                if (event.keyCode == 37) {
                    _this.moveLeft();
                } else if (event.keyCode == 38) {
                    _this.moveUp();
                } else if (event.keyCode == 39) {
                    _this.moveRight();
                } else if (event.keyCode == 8) {
                    _this.$router.go(-1)
                } else if (event.keyCode == 40) {
                    _this.moveDown();
                } else if (event.keyCode == 13) {
                    _this.activeClick();
                } else if (event.keyCode == 8) {
                    this.$router.go(-1)
                }
            }
        };
    },
    methods: {
        gethis() {
            this.$http.get(`browse/records/page?page=${this.page}&limit=150`).then(res => {
                this.activeType = 0
                if (this.page == 1) {
                    this.dataList = res.data.data.list;
                } else {
                    res.data.data.list.map((val) => {
                        this.dataList.push(val);
                    });
                }
            })
        },
        getcol() {
            this.$http.get(`collect/video/page?page=${this.page}&limit=150`).then(res => {
                this.activeType = 1
                if (this.page == 1) {
                    this.dataList2 = res.data.data.list;
                } else {
                    res.data.data.list.map((val) => {
                        this.dataList2.push(val);
                    });
                }
            })
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
            } else if (this.kd > 1 && this.kd <= 2 + this.dataList.length) {
                if (this.kd == 3) {
                    this.c.classList.remove("accs");
                    this.kd = Number(this.activeType) + 1
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                }
                this.c.classList.remove("accs");
                this.kd--
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
            }
            // if (this.kd > 6 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
            var el = document.getElementById(this.kd);
            const viewPortHeight =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            const offsetTop = el.offsetTop;
            const scrollTop = document.documentElement.scrollTop;
            const top = offsetTop - scrollTop;
            const intop = el.offsetHeight;
            let d = top >= 0;
            if (d == false) {
                document.documentElement.scrollTop = document.getElementById(
                    this.kd
                ).offsetTop;
            }
            // console.log(element.offsetHeight);
            // }
        },
        moveRight() {
            // this.$refs.ado.currentTime = 0
            // this.$refs.ado.play(); //播放
            if (this.kd == 0) {
                this.c = document.getElementById(1);
                this.c.classList.add("accs");
                this.kd = 1;
            }
            if (this.kd >= 0 && this.kd < 3) {
                this.c.classList.remove("accs");
                this.kd = 3
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
            } else if (this.kd >= 3) {
                this.c.classList.remove("accs");
                this.kd++;
                if (this.kd > 2 + this.dataList.length) {
                    this.kd = 2 + this.dataList.length
                }
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
            }
            var el = document.getElementById(this.kd);
            const viewPortHeight =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            const offsetTop = el.offsetTop;
            const scrollTop = document.documentElement.scrollTop;
            const top = offsetTop - scrollTop;
            const intop = el.offsetHeight;
            let d = top + intop <= viewPortHeight;
            if (d == false) {
                document.documentElement.scrollTop = document.getElementById(
                    this.kd
                ).offsetTop;
            }
            // console.log(element.offsetHeight);
            // }
        },
        moveUp() {
            // this.$refs.ado.currentTime = 0
            // this.$refs.ado.play(); //播放
            if (this.kd == 0) {
                this.c = document.getElementById(1);
                this.c.classList.add("accs");
                this.kd = 1;
            } else if (this.kd > 1 && this.kd < 3) {
                this.c.classList.remove("accs");
                this.kd--;
                this.activeType = 0
                this.activeClick()
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
            } else if (this.kd > 8) {
                this.c.classList.remove("accs");
                this.kd = this.kd - 6;
                this.activeClick()
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
            }
            var el = document.getElementById(this.kd);
            const viewPortHeight =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            const offsetTop = el.offsetTop;
            const scrollTop = document.documentElement.scrollTop;
            const top = offsetTop - scrollTop;
            const intop = el.offsetHeight;
            let d = top >= 0;
            if (d == false) {
                document.documentElement.scrollTop = document.getElementById(
                    this.kd
                ).offsetTop - intop;
            }
            // console.log(element.offsetHeight);
            // }
        },
        moveDown() {
            // this.$refs.ado.currentTime = 0
            // this.$refs.ado.play(); //播放
            if (this.kd == 0) {
                this.c = document.getElementById(1);
                this.c.classList.add("accs");
                this.kd = 1;
                //4-8 9-27 28-30 31-69 70-71
            } else if (this.kd > 0 && this.kd < 2) {
                this.c.classList.remove("accs");
                this.kd++;
                this.activeType = 1
                this.page = 1
                this.activeClick()
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
            } else if (this.kd >= 3 && this.kd <= 2 + this.dataList.length) {
                this.c.classList.remove("accs");
                this.kd = this.kd + 6;
                if (this.kd > 2 + this.dataList.length) {
                    this.kd = 2 + this.dataList.length
                }
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
            }
            var el = document.getElementById(this.kd);
            const viewPortHeight =
                window.innerHeight ||
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            const offsetTop = el.offsetTop;
            const scrollTop = document.documentElement.scrollTop;
            const top = offsetTop - scrollTop;
            const intop = el.offsetHeight;
            console.log('viewPortHeight', viewPortHeight)
            console.log('offsetTop', offsetTop)
            console.log('scrollTop', scrollTop)
            console.log('top', top)
            console.log('intop', intop)
            let d = top + intop <= viewPortHeight;
            if (d == false) {
                document.documentElement.scrollTop = document.getElementById(
                    this.kd
                ).offsetTop - intop;
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
        scrollBottom() {
            let scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            let clientHeight = document.documentElement.clientHeight;
            let scrollHeight = document.documentElement.scrollHeight;
            if (scrollTop + clientHeight >= scrollHeight) {
                // 滚动到底部，逻辑代码
                //事件处理
                this.page++;
                this.getinfo();
                console.log('我触发了吗')
                return;
                // 这这里可以写一些业务逻辑，请求数据等
            }
        },
        getinfo() {
            this.$http
                .get(
                    `/video/page?page=${this.page}&limit=30&regionId=${this.activeType3}&sort=${this.activeType5}&categoryId=${this.activeType}&typeId=${this.activeType2}&years=
        ${this.activeType4}`,
                    {
                        page: this.page,
                        // [string]	是	页码
                        limit: 30,
                        // [string]	是	条数
                        sort: this.activeType5,
                        // [string]		排序	展开
                        categoryId: this.activeType,
                        // [string]		类别标识
                        typeId: this.activeType2,
                        // [string]		类型标识
                        years: this.activeType4,
                        // [string]		年份标识
                        regionId: this.activeType3,
                        // [string]		地区标识复制
                    }
                )
                .then((res) => {
                    if (this.page == 1) {
                        this.dataList = res.data.data.list;
                    } else {
                        res.data.data.list.map((val) => {
                            this.dataList.push(val);
                        });
                    }
                });
        },
        getType() {
            this.page = 1
            this.getinfo()
        },
    },
};
</script>
<style lang="scss" scoped>
.classify {
    background: #efefef;
    min-height: 100vh;
}

.rightbox {

    margin: 29px 29px;
}

.typebox {
    background: #fff;
    margin-bottom: 29px;
    border-radius: 10px;

    .type {
        display: flex;
        font-size: 1.2rem;
        padding: 10px 0;

        .typel {
            color: #FE9D3E;
            // font-weight: bold;
            height: 1rem;
            line-height: 1.8rem;
            width: 75px;
            padding-left: 10px;

            p {
                background: #F9F9F9;
                width: 75px;
                border-radius: 20px;
                text-align: center
            }

            ;
        }

        .typer {
            width: calc(100% - 75px);
            margin-left: 20px;

            // line-height: 1.8em;
            button {
                background: transparent;
                color: #202020;
                font-size: 1rem;
                border: none;
                cursor: pointer;
                padding: 0 20px;

                font-family: 'sc' !important;
                // width: 128px;
            }
        }
    }
}

.mid {
    background: rgba($color: #fff, $alpha: 0.1);
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
}

.list:not(:nth-child(6n+1)) {
    margin-left: 2%;
}
.list:nth-child(n+6){
    margin-top: 15px;
}
.list {
    position: relative;
    width: 14.75%;
    .el-image {
        border-radius: 10px;
        height: 100%;
    }

    p {
        // font-size: 12px;
        position: absolute;
        bottom: 0%;
        left: 0;
        color: #fff;
        background: rgba(32, 32, 32, 0.7);
        border-radius: 0 0 10px 10px;
        text-align: center;
        height: 4vh;
        line-height: 4vh;
        width: 100%;
    }
}

.actives {
    color: #FE9D3E !important;
}

.vip3 {
    width: 45px;
    height: 27px;
    position: absolute;
    top: 8.6%;
    right: 8%;
}

@media screen and (max-width: 1280px) {
    .vip3 {
        width: 45px;
        height: 27px;
        top: 11%;
        right: 8%;
        border-radius: none !important;
    }
}

.allfenlei {
    position: fixed;
    height: 100vh;
    width: 16.66667%;
    background: #fff;
    border-radius: 10px;
    text-align: center;

    button:first-of-type {
        border-radius: 10px 10px 0 0;
    }

    button {
        display: block;
        background: transparent;
        border: none;
        width: 99%;
        font-size: 24px;
        padding: 19px 0;
        margin: auto;
    }
}

.activeNav {
    color: #FE9D3E;
    background: #FBF0E5;
}
</style>