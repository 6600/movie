<template>
    <div class="contain home">
        <!-- <navbar :userinfo="userInfo" /> -->
        <!-- xs小 xl大 -->
        <el-row :gutter="10">
            <el-col :xs="24" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <div class="typeNavBar">
                    <div class="tnl" id="tnl">
                        <span :class="{ active: index == 0 }" @click="changeIndex(0)" id="1">筛选</span>
                        <span :class="{ active: index == 1 }" @click="changeIndex(1)" id="2">搜索</span>
                        <span :class="{ active: index == 2 }" @click="changeIndex(2)" id="3">我的</span>
                        <span :class="{ active: index == 3 }" @click="changeIndex(3)" id="4">推荐</span>
                        <span :class="{ active: index == 4 }" @click="changeIndex(4)" id="5">专辑</span>
                        <span :class="{ active: index == 5 }" @click="changeIndex(5)" id="6">电视剧</span>
                        <span :class="{ active: index == 6 }" @click="changeIndex(6)" id="7">电影</span>
                        <span :class="{ active: index == 7 }" @click="changeIndex(7)" id="8">综艺</span>
                        <span :class="{ active: index == 8 }" @click="changeIndex(8)" id="9">动漫</span>
                        <span :class="{ active: index == 9 }" @click="index = 9" id="10">纪录片</span>
                    </div>
                </div>
            </el-col>
        </el-row>
        <!-- 搜索 -->
        <transition name="el-fade-in-linear">
            <div class="searchIndex" v-if="index == 1">
                <el-row :gutter="10">
                    <el-col :xs="23" :sm="23" :md="23" :lg="23" :xl="23">
                        <div class="mid">
                            <div class="midl">
                                <div class="sch">
                                    <div class="schr">
                                        <el-input v-model="keyword" readonly placeholder="请输入影片的首字母或全拼">
                                            <i slot="prefix" class="el-input__icon el-icon-search"></i>
                                        </el-input>
                                    </div>
                                </div>
                                <div class="opeater">
                                    <button @click="clear" id="11">
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
                                    <button @click="puback" id="12">
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
                                    <button v-for="(item, index) in list" :key="index" @click="confirm(item)"
                                        :id="13 + Number(index)">
                                        {{ item }}
                                    </button>
                                </div>
                            </div>
                            <div class="midm" id="midm" v-if="keyword != ''">
                                <p class="mtit">猜你想搜</p>
                                <div v-for="(item, index) in hotlist" :key="index"
                                    :id="13 + list.length + Number(index)" :class="{ 'acthot': ah == index }"
                                    @click="getDetail(item.name, index)">
                                    <button v-if="item != null">{{ item.name }}</button>
                                </div>
                            </div>
                            <div class="midr" v-if="keyword != ''" id="midr" v-infinite-scroll="load"
                                style="overflow: auto">
                                <div>
                                    <p class="dzs">“{{ searchKeyword }}”搜索结果</p>
                                </div>
                                <div class="schlistbox">
                                    <div class="schlist" v-for="(item, index) in datalist" :key="item.id"
                                        :id="13 + list.length + hotlist.length + Number(index)"
                                        @click="godetail(item.id)">
                                        <el-image v-if="item.cover != ''" class="img" :src="item.cover">
                                            <div slot="placeholder" class="image-slot">
                                                <el-image :src="require('../assets/his.png')"></el-image>
                                            </div>
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline"></i>
                                            </div>
                                        </el-image>
                                        <el-image v-else :src="require('../assets/his.png')" />
                                        <p class="mrt">{{ item.name }}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="midano" v-if="keyword == ''">
                                <p class="dzs">大家都在搜</p>
                                <div class="midanobox">
                                    <div class="mblist" v-for="(item, index) in hotlist" :key="index" v-if="index < 12">
                                        <div :id="13 + list.length + Number(index)" @click="godetail(item.videoId)"
                                            style="display:inline-block;padding:10px">
                                            <span class="diana"></span>{{ item.name }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <audio controls="controls" hidden :src="require('../assets/music/point.mp3')" ref="ado"></audio> -->
                    </el-col></el-row>
            </div>
        </transition>
        <!-- 筛选 -->
        <transition name="el-fade-in-linear">
            <el-row :gutter="10" v-if="index == 0">
                <el-col :xs="3" :sm="4" :md="4" :lg="4" :xl="4" :offset="1" style="position:relative">
                    <div style="color:#fff;width:100%;height:1px"></div>
                    <div class="allfenlei">
                        <button v-for="(item, index) in typeList.category" :key="item.categoryId"
                            :id="11 + Number(index)" :class="{ activeNav: activeType == item.categoryId }"
                            @click="selectCategory(item.categoryId)">
                            {{ item.name }}
                        </button>
                    </div>
                </el-col>
                <el-col :xs="18" :sm="18" :md="18" :lg="18" :xl="18">
                    <div class="rightbox">
                        <div class="typebox" v-if="typeList != []">
                            <div class="type">
                                <div class="typel">
                                    <p>全部类型</p>
                                </div>
                                <div class="typer">
                                    <button v-for="(item, index) in typeList.type"
                                        :id="11 + typeList.category.length + Number(index)"
                                        :class="{ actives: activeType2 == item.typeId }" :key="item.typeId"
                                        @click="selectType(item.typeId)">
                                        {{ item.name }}
                                    </button>
                                </div>
                            </div>
                            <div class="type">
                                <div class="typel">
                                    <p>全部地区</p>
                                </div>
                                <div class="typer">
                                    <button :id="11 + typeList.category.length + typeList.type.length + Number(index)"
                                        v-for="(item, index) in typeList.region" :key="item.regionId"
                                        :class="{ actives: activeType3 == item.regionId }"
                                        @click="selectRegion(item.regionId)">
                                        {{ item.name }}
                                    </button>
                                </div>
                            </div>
                            <div class="type">
                                <div class="typel">
                                    <p>全部年代</p>
                                </div>
                                <div class="typer">
                                    <button
                                        :id="11 + typeList.category.length + typeList.type.length + typeList.region.length + Number(index)"
                                        v-for="(item, index) in typeList.year" :key="item.yearId"
                                        :class="{ actives: activeType4 == item.years }" @click="selectYear(item.years)">
                                        {{ item.years }}
                                    </button>
                                </div>
                            </div>
                            <div class="type">
                                <div class="typel">
                                    <p>默认排序</p>
                                </div>
                                <div class="typer">
                                    <button
                                        :id="11 + typeList.category.length + typeList.type.length + typeList.region.length + typeList.year.length"
                                        :class="{ actives: activeType5 == 1 }" @click="selectpx(1, 1)">
                                        最热
                                    </button>
                                    <button
                                        :id="12 + typeList.category.length + typeList.type.length + typeList.region.length + typeList.year.length"
                                        :class="{ actives: activeType5 == 3 }" @click="selectpx(2)">
                                        最新
                                    </button>
                                    <button
                                        :id="13 + typeList.category.length + typeList.type.length + typeList.region.length + typeList.year.length"
                                        :class="{ actives: activeType5 == 4 }" @click="selectpx(3)">
                                        评分
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="mid">
                            <div class="list" v-for="(item, index) in dataList" :key="item.id"
                                :id="14 + typeList.category.length + typeList.type.length + typeList.region.length + typeList.year.length + Number(index)"
                                @click="godetails(item)">
                                <el-image :src="item.cover" v-if="item.cover != ''">
                                    <div slot="placeholder" class="image-slot">
                                        <el-image :src="require('../assets/his.png')"></el-image>
                                    </div>
                                    <div slot="error" class="image-slot">
                                        <i class="el-icon-picture-outline"></i>
                                    </div>
                                </el-image>
                                <el-image v-else :src="require('../assets/his.png')">
                                </el-image>
                                <p>{{ item.name }}</p>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </transition>
        <!-- 我的 -->
        <el-row :gutter="10">
            <el-col :xs="22" :sm="22" :md="22" :lg="22" :xl="22" :offset="1">
                <transition name="el-fade-in-linear">
                    <div class="retui" v-if="index == 2">
                        <div class="user">
                            <div class="useri" v-if="userInfo.username">
                                <div class="ut">
                                    <el-image style="width: 140px; height: 140px;border-radius: 50%;" fit="cover"
                                        :src="userInfo.headUrl"></el-image>
                                </div>
                                <div class="um">{{ userInfo.username }}</div>
                                <div class="dlan" style="display:inline-block" @click="goquit" id="11">
                                    退出登录
                                </div>
                            </div>
                            <div class="useri" v-else>
                                <div class="ut">
                                    <el-image style="width: 140px; height: 140px;border-radius: 50%;" fit="cover"
                                        :src="require('../assets/avatarr.png')"></el-image>
                                </div>
                                <div class="um">未登录</div>
                                <div class="dlan" style="display:inline-block" @click="gologin" id="11">
                                    登录
                                </div>
                            </div>
                            <div class="userb">
                            </div>
                        </div>
                        <div class="htpt">
                            <p class="htptt">历史记录</p>
                            <div class="nmovieList" style="min-height:274px">
                                <div class="nmovie" v-for="(item, index) in history"
                                    v-if="history.length > 0 && index < 5" :id="12 + Number(index)"
                                    @click="goDetail(item)">
                                    <el-image v-if="item.cover != ''" :src="item.videoCover" fit="cover">
                                        <div slot="error" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                    <el-image v-else :src="require('../assets/his.png')" mode="none"></el-image>
                                    <p class="introduce">
                                        <span class="i1">{{ item.videoName }}</span>
                                    </p>
                                </div>
                                <div class="nmovie mymovie" @click="gohis(0)" :id="12 + history.length">
                                    <div>
                                        <el-image :src="require('../assets/myhis.png')" mode="contain">
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline"></i>
                                            </div>
                                        </el-image>
                                        <p class="introducemy">
                                            历史记录
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <p class="htptt">我的收藏</p>
                            <div class="nmovieList" style="min-height:274px">
                                <div class="nmovie" v-for="(item, index) in collectList"
                                    :id="13 + history.length + Number(index)" v-if="collectList.length > 0 && index < 5"
                                    @click="goDetail(item)">
                                    <el-image v-if="item.cover != ''" :src="item.cover" mode="contain">
                                        <div slot="error" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                    <el-image v-else :src="require('../assets/his.png')" mode="none"></el-image>
                                    <p class="introduce">
                                        <span class="i1">{{ item.name }}</span>
                                    </p>
                                </div>
                                <div class="nmovie mymovie mymovie2" @click="gohis(1)"
                                    :id="13 + history.length + collectList.length">
                                    <div>
                                        <el-image :src="require('../assets/mysc.png')" mode="contain">
                                            <div slot="error" class="image-slot">
                                                <i class="el-icon-picture-outline"></i>
                                            </div>
                                        </el-image>
                                        <p class="introducemy">
                                            更多收藏
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </transition>
            </el-col>
        </el-row>
        <!-- <audio controls="controls" hidden :src="require('../assets/music/point.mp3')" ref="ado"></audio> -->
    </div>
</template>

<script>
import navbar from "@/views/components/navbar";
import shaixuan from '@/views/classify.vue'
import Cookies from "js-cookie";
export default {
    components: {
        navbar,
        shaixuan
    },
    data() {
        return {
            actives: 0,
            topList: [],
            search: "",
            index: 2,
            kd: 3,
            width: "",
            height: "",
            userInfo: {},
            history: [],
            albumList: [],
            dataList: [],
            collectList: [],
            token: '',
            //筛选
            activeType: 0,
            activeType2: "",
            activeType3: "",
            activeType4: "全部",
            activeType5: 1,
            typeList: [],
            //搜索
            keyword: "",
            searchKeyword: '',
            ah: -1,
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
            datalist: []
        };
    },

    activated() {
        this.getUserInfo();
        this.gethistory()
        this.getType();
        this.getHot();
        this.token = Cookies.get('token')
    },
    mounted() {
        window.activeItem=this
        let _this = this;
        let dk = Cookies.get('kd')
        if (dk != undefined) {
            this.kd = Cookies.get('kd')
            this.index = Cookies.get('index')
            this.changeIndex(this.index)
        }
        this.token = Cookies.get('token')
        this.getinfo();
        this.getUserInfo();
        this.gethistory()
        this.getType();
        this.getHot();
        this.clientHeight = document.documentElement.clientHeight;
        window.addEventListener("scroll", this.scrollBottom, true);
        this.page = 1
        if (this.$route.query.album) {
            _this.changeIndex(this.$route.query.album)
        }
        let d = Cookies.get('randomId')
        if (d == undefined) {
            Cookies.set('randomId', this.GetsingleId())
        }
        document.onkeyup = function (event) {
            if (_this.$route.name == 'mypage') {
                if (event.keyCode == 37) {
                    _this.moveLeft();
                    _this.up()
                } else if (event.keyCode == 38) {
                    _this.moveUp();
                    _this.up()
                } else if (event.keyCode == 39) {
                    _this.moveRight();
                    _this.down()
                } else if (event.keyCode == 8) {
                    _this.$router.go(-1);
                } else if (event.keyCode == 40) {
                    _this.moveDown();
                    _this.down()
                } else if (event.keyCode == 13) {
                    _this.activeClick();
                }
            }
        };
        this.c = document.getElementById(this.kd);
        this.c.classList.add("accs");
    },
    methods: {
        getHot() {
            this.$http.get("/video/stat").then((res) => {
                this.hotlist = res.data.data;
            });
        },
        getDetail(name, val) {
            this.$http.get(`video/searchInfo?name=${name}`).then(res => {
                this.datalist = res.data.data
                this.searchKeyword = name
                this.ah = val
            })
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
                if (this.index == 0) {
                    this.getinfosch()
                } else if (this.index == 1) {
                    this.getinshaixuanfo();
                }
                return;
                // 这这里可以写一些业务逻辑，请求数据等
            }
        },
        confirm(item) {
            this.keyword += item;
            this.page = 1;
            this.getinfosch2();
        },
        getinfosch() {
            this.$http
                .get(`/video/search?page=1&limit=100&keyword=${this.keyword}`)
                .then((res) => {
                    this.hotlist = res.data.data.list;
                });
        },
        getinfosch2() {
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
            this.getinfosch();
        },
        puback() {
            if (this.keyword.length > 0) {
                this.keyword = this.keyword.slice(0, this.keyword.length - 1);
                this.page = 1;
                this.getinfosch();
            }
        },
        selectCategory(val) {
            this.page = 1;
            this.activeType = val;
            this.getinfosch();
        },
        selectpx(val) {
            this.page = 1;
            this.activeType5 = val;
            this.getinshaixuanfo();
        },
        selectYear(val) {
            this.page = 1;
            this.activeType4 = val;
            this.getinshaixuanfo();
        },
        selectRegion(val) {
            this.page = 1;
            this.activeType3 = val;
            this.getinshaixuanfo();
        },
        selectType(val) {
            this.page = 1;
            this.activeType2 = val;
            this.getinshaixuanfo();
        },
        getType() {
            this.$http.get("/video/category/classify").then((res) => {
                this.typeList = res.data.data;
                this.typeList.region.unshift({ regionId: "", name: "全部" })
                this.typeList.type.unshift({ typeId: "", name: "全部" })
                this.typeList.year.unshift({ yearId: "", years: "全部" })
                this.activeType = this.typeList.category[0].categoryId
                this.typeList.category.map(val => {
                    if (val.name == this.nlb) {
                        this.activeType = val.categoryId
                    }
                })
                this.page = 1
                this.getinshaixuanfo();
            });
        },
        getinshaixuanfo() {
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
        gohis(val) {
            Cookies.set('kd', this.kd)
            Cookies.set('index', this.index)
            this.$router.push({ path: '/user', query: { id: val } })

        },
        up() {
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
        },
        down() {
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
        },
        getList(val) {
            this.$http.get(`recommend/other?categoryName=${val}`).then(res => {
                this.dataList = res.data.data
                this.$forceUpdate()
                this.dataList.videoTypeList.unshift({ typeId: "", typeName: "全部" })
            })
        },
        getcoll() {
            this.$http.get('collect/video/page?page=1&limit=5').then(res => {
                if (res.data.code == 0) {
                    this.collectList = res.data.data.list
                }
            })
        },
        goAlbum(val) {
            Cookies.set('kd', this.kd)
            Cookies.set('index', this.index)
            this.$router.push({ path: '/album', query: { id: val.albumId, fm: val.albumTopCover, name: val.albumName } })
        },
        getzj() {
            this.$http.get('video/album/getList').then(res => {
                this.albumList = res.data.data
            })
        },
        gethistory() {
            this.$http.get('browse/records/page?page=1&limit=5').then(res => {
                if (res.data.code == 0) {
                    this.history = res.data.data.list
                } else if (res.data.code == 10021) {
                    this.$store.commit("setUserinfo", {});
                    this.$store.commit("setToken", "");
                    Cookies.remove("userid");
                    Cookies.remove("membership");
                    Cookies.remove("username");
                    Cookies.remove("token");
                }
            })
        },
        activeClick() {
            document.getElementById(this.kd).click();
            return;
        },
        goDetail(val) {
            Cookies.set('kd', this.kd)
            Cookies.set('index', this.index)
            this.$router.push({ path: "/details", query: { id: val.videoId } });
        },
        moveLeft() {
            if (this.kd >= 0 && this.kd < 11) {
                this.c.classList.remove("accs");
                this.kd--;
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
                this.activeClick()
            }
            // this.$refs.ado.currentTime = 0
            // this.$refs.ado.play(); //播放
            if (this.index == 0) {
                if (this.kd == 11 + this.typeList.category.length ||
                    this.kd == 11 + this.typeList.category.length + this.typeList.type.length ||
                    this.kd == 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length ||
                    this.kd == 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
                    this.c.classList.remove("accs");
                    this.kd = 11
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    this.page = 1
                    this.activeClick()
                } else if (this.kd >= 11 + this.typeList.category.length) {
                    this.c.classList.remove("accs");
                    this.kd--;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                }
                return
            }
            if (this.index == 1) {
                if (this.keyword == "" && this.kd > 13 + this.list.length) {
                    this.c.classList.remove("accs");
                    this.kd--;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return;
                }
                if (this.kd == 10) {
                    this.c = document.getElementById(1);
                    this.c.classList.add("accs");
                    this.kd = 11;
                } else if (this.kd > 11) {
                    if (
                        this.kd >= 49 &&
                        this.kd <= 12 + this.list.length + this.hotlist.length
                    ) {
                        this.c.classList.remove("accs");
                        this.kd = 12;
                        this.c = document.getElementById(this.kd);
                        this.c.classList.add("accs");
                        return;
                    }
                    if (this.kd == 13 + this.list.length + this.hotlist.length) {
                        let d = document.getElementsByClassName('acthot')
                        this.c.classList.remove("accs");
                        this.kd = Number(d[0].id);
                        this.c = document.getElementById(this.kd);
                        this.c.classList.add("accs");
                        return;
                    }
                    this.c.classList.remove("accs");
                    this.c.classList.remove("active");
                    this.kd--;
                    if (this.kd > 12 && this.kd < 49) {
                        this.c = document.getElementById(this.kd);
                        this.c.classList.add("active");
                    }
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                }
                if (this.kd > 12 + this.list.length && this.kd < 12 + this.list.length + this.hotlist.length) {
                    var el = document.getElementById(this.kd);
                    const viewPortHeight = document.getElementById("midm").clientHeight;
                    const offsetTop = el.offsetTop;
                    const scrollTop = document.getElementById("midm").scrollTop;
                    const intop = el.offsetHeight;
                    let d = scrollTop < offsetTop;
                    if (d == false) {
                        document.getElementById("midm").scrollTop = offsetTop;
                    }
                }
                if (this.kd > this.list.length + this.hotlist.length) {
                    var el = document.getElementById(this.kd);
                    const viewPortHeight = document.getElementById("midr").clientHeight;
                    const offsetTop = el.offsetTop;
                    const scrollTop = document.getElementById("midr").scrollTop;
                    const intop = el.offsetHeight;
                    let d = scrollTop < offsetTop;
                    if (d == false) {
                        document.getElementById("midr").scrollTop = offsetTop;
                    }
                }
                return
            }
            if (this.index == 2) {
                if (this.kd > 11) {
                    this.c.classList.remove("accs");
                    this.kd--;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                }
                
            }
            this.c = document.getElementById(this.kd);
            this.c.classList.add("accs");
            var el2 = document.getElementById(this.kd);
            var viewPortWidth2 = document.getElementById("tnl").clientWidth;
            var offsetLeft2 = el2.offsetLeft;
            var scrollLeft2 = document.getElementById("tnl").scrollLeft;
            var intop2 = el2.offsetWidth;
            let dd = offsetLeft2 + intop2 > scrollLeft2 && offsetLeft2 + intop2 < scrollLeft2 + viewPortWidth2;
            if (dd == false) {
                document.getElementById("tnl").scrollLeft = offsetLeft2;
            }
        },
        moveRight() {
            if (this.kd >= 0 && this.kd < 11) {
                this.c.classList.remove("accs");
                this.kd++;
                this.c = document.getElementById(this.kd);
                this.c.classList.add("accs");
                this.activeClick()
                return
            }
            // if (this.kd == 2) {
            //   this.index = 2
            // }
            if (this.index == 0) {
                let c = 12 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length + this.dataList.length
                if (this.kd >= 10 && this.kd < 11 + this.typeList.category.length) {
                    this.c.classList.remove("accs");
                    this.kd = 11 + this.typeList.category.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 11 + this.typeList.category.length) {
                    this.c.classList.remove("accs");
                    this.kd++;
                    if (this.kd > c) {
                        this.kd = c
                    }
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                }
                return
            }
            if (this.index == 1) {
                if (this.keyword == "" && this.kd > 12 + this.list.length) {
                    this.c.classList.remove("accs");
                    this.kd++;
                    if (this.kd > 12 + this.list.length + this.hotlist.length) {
                        this.kd = 12 + this.list.length + this.hotlist.length;
                    }
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return;
                }
                if (this.kd > 12 && this.kd < 12 + this.list.length) {
                    this.c.classList.remove("accs");
                    this.c.classList.remove("active");
                    // this.kd++
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    this.c.classList.add("active");
                }
                if (this.keyword == "" && this.kd == 11) {
                    this.c.classList.remove("accs");
                    this.kd = 12
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return;
                }
                if (this.keyword == "" && this.kd == 12) {
                    this.c.classList.remove("accs");
                    this.kd = 13 + this.list.length;
                    if (this.kd > 12 + this.list.length + this.hotlist.length) {
                        this.kd = 12
                    }
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return;
                }
                if (
                    this.kd > 10 &&
                    this.kd <=
                    12 + this.list.length + this.hotlist.length + this.datalist.length
                ) {
                    if (this.kd == 12) {
                        this.c.classList.remove("accs");
                        let d = document.getElementsByClassName('acthot')
                        this.c.classList.remove("accs");
                        this.kd = Number(d[0].id);
                        // this.kd = 3 + this.list.length;
                        if (this.kd > 12 + this.list.length + this.hotlist.length) {
                            this.kd = 12
                        }
                        this.c = document.getElementById(this.kd);
                        this.c.classList.add("accs");
                        return;
                    }
                    if (
                        this.kd >= 49 &&
                        this.kd < 13 + this.list.length + this.hotlist.length
                    ) {
                        this.c.classList.remove("accs");
                        this.kd = 13 + this.list.length + this.hotlist.length;
                        if (this.kd > 12 + this.list.length + this.hotlist.length + this.datalist.length) {
                            this.kd = 12 + this.list.length + this.hotlist.length;
                        }
                        this.c = document.getElementById(this.kd);
                        this.c.classList.add("accs");
                        return;
                    }
                    if (this.kd >= 12 + this.list.length + this.hotlist.length + this.datalist.length) {
                        return
                    }
                    if (this.kd == 18 || this.kd == 24 || this.kd == 30 || this.kd == 36 || this.kd == 42 || this.kd == 48) {
                        this.c.classList.remove("accs");
                        this.c.classList.remove("active");
                        this.kd = 13 + this.list.length
                        this.c = document.getElementById(this.kd);
                        this.c.classList.add("accs");
                        return
                    }
                    this.c.classList.remove("accs");
                    this.c.classList.remove("active");
                    this.kd++;
                    if (this.kd > 12 && this.kd < 49) {
                        this.c = document.getElementById(this.kd);
                        this.c.classList.add("active");
                    }
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                }
                if (this.kd > 12 + this.list.length && this.kd < 12 + this.list.length + this.hotlist.length) {
                    var el = document.getElementById(this.kd);
                    const viewPortHeight = document.getElementById("midm").clientHeight;
                    const offsetTop = el.offsetTop;
                    const scrollTop = document.getElementById("midm").scrollTop;
                    const intop = el.offsetHeight;
                    let d = offsetTop + intop < scrollTop + viewPortHeight;
                    if (d == false) {
                        document.getElementById("midm").scrollTop = offsetTop;
                    }
                }
                if (this.kd > this.list.length + this.hotlist.length) {
                    var el = document.getElementById(this.kd);
                    const viewPortHeight = document.getElementById("midr").clientHeight;
                    const offsetTop = el.offsetTop;
                    const scrollTop = document.getElementById("midr").scrollTop;
                    const intop = el.offsetHeight;
                    let d = offsetTop + intop < scrollTop + viewPortHeight;
                    if (d == false) {
                        document.getElementById("midr").scrollTop = offsetTop;
                    }
                }
                return
            }
            this.c.classList.remove("accs");
            this.kd++;
            this.c = document.getElementById(this.kd);
            this.c.classList.add("accs");
        },
        moveUp() {
            if (this.kd > 49) {
                setTimeout(() => {
                    document.querySelector('#midm .accs').click()
                }, 100);
            }
            // this.$refs.ado.currentTime = 0
            // this.$refs.ado.play(); //播放
            if (this.index == 2) {
                if (this.kd == 11) {
                    this.c.classList.remove("accs");
                    this.kd = 3;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                }
                if (this.kd > 11 && this.kd <= 11 + this.history.length + 1) {
                    this.c.classList.remove("accs");
                    this.kd = 11;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                } else if (this.kd > 11 + this.history.length + 1) {
                    this.c.classList.remove("accs");
                    this.kd = 12;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                }
            }
            if (this.index == 0) {
                let c = 0
                c = 12 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length + this.dataList.length
                if (this.kd == 11) {
                    this.c.classList.remove("accs");
                    this.kd = 2;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    //4-8 9-29 30-32 33-77 78-79
                    // typeList.category typeList.type typeList.region typeList.year
                } else if (this.kd > 11 && this.kd < this.typeList.category.length + 11) {
                    this.c.classList.remove("accs");
                    this.kd--;
                    this.activeClick()
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 11 + this.typeList.category.length && this.kd < 11 + this.typeList.category.length + this.typeList.type.length) {
                    this.c.classList.remove("accs");
                    this.kd = 11 + this.typeList.category.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 11 + this.typeList.category.length + this.typeList.type.length && this.kd < 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length) {
                    this.c.classList.remove("accs");
                    this.kd = 11 + this.typeList.category.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length && this.kd < 11 +
                    this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
                    this.c.classList.remove("accs");
                    this.kd = 11 + this.typeList.category.length + this.typeList.type.length
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length && this.kd <=
                    13 +
                    this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
                    this.c.classList.remove("accs");
                    this.kd = 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 14 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length && this.kd <
                    this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length + 19) {
                    this.c.classList.remove("accs");
                    this.kd = 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length + 16 && this.kd <
                    c) {
                    this.c.classList.remove("accs");
                    this.kd = this.kd - 6;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                }
            }
            if (this.index == 1) {
                if (this.keyword == "" && this.kd > 14 + this.list.length) {
                    this.c.classList.remove("accs");
                    this.kd = this.kd - 2;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return;
                }
                if (this.kd == 11 || this.kd == 12) {
                    this.c.classList.remove("accs");
                    this.kd = 1;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd > 12 && this.kd <= 18) {
                    this.c.classList.remove("accs");
                    this.c.classList.remove("active");
                    this.kd = 12;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd > 18 && this.kd <= 12 + this.list.length) {
                    this.c.classList.remove("accs");
                    this.c.classList.remove("active");
                    this.kd = this.kd - 6;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    this.c.classList.add("active");
                } else if (
                    this.kd > 49 &&
                    this.kd < 13 + this.list.length + this.hotlist.length
                ) {
                    this.c.classList.remove("accs");
                    this.kd--;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd > 15 + this.list.length + this.hotlist.length) {
                    this.c.classList.remove("accs");
                    this.kd = this.kd - 3;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                }
                if (this.kd > 12 + this.list.length && this.kd < 12 + this.list.length + this.hotlist.length) {
                    var el = document.getElementById(this.kd);
                    const viewPortHeight = document.getElementById("midm").clientHeight;
                    const offsetTop = el.offsetTop;
                    const scrollTop = document.getElementById("midm").scrollTop;
                    const intop = el.offsetHeight;
                    let d = scrollTop < offsetTop;
                    if (d == false) {
                        document.getElementById("midm").scrollTop = offsetTop;
                    }
                }
                if (this.kd > this.list.length + this.hotlist.length) {
                    var el = document.getElementById(this.kd);
                    const viewPortHeight = document.getElementById("midr").clientHeight;
                    const offsetTop = el.offsetTop;
                    const scrollTop = document.getElementById("midr").scrollTop;
                    const intop = el.offsetHeight;
                    let d = scrollTop < offsetTop;
                    if (d == false) {
                        document.getElementById("midr").scrollTop = offsetTop;
                    }
                }
            }
        },
        moveDown() {
            if (this.kd > 49) {
                setTimeout(() => {
                    document.querySelector('#midm .accs').click()
                }, 100);
            }
            // this.$refs.ado.currentTime = 0
            // this.$refs.ado.play(); //播放
            if (this.index == 2) {
                if (this.kd <= 10) {
                    this.c.classList.remove("accs");
                    this.kd = 11
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                }
                if (this.kd == 11) {
                    this.c.classList.remove("accs");
                    this.kd++;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                }
                if (this.kd > 11 && this.kd < 11 + this.history.length + 1) {
                    if (this.history.length > 0) {
                        this.c.classList.remove("accs");
                        this.kd = 13 + this.history.length;
                        this.c = document.getElementById(this.kd);
                        this.c.classList.add("accs");
                        return
                    }
                    this.c.classList.remove("accs");
                    this.kd = 12 + this.history.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                } else if (this.kd >= 11 + this.history.length + 1) {
                    this.c.classList.remove("accs");
                    this.kd = 13 + this.history.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                }
            }
            if (this.index == 0) {
                let c = 0
                c = 12 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length + this.dataList.length
                if (this.kd <= 10) {
                    this.c.classList.remove("accs");
                    this.kd = 11
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                } else if (this.kd > 10 && this.kd < 11 + this.typeList.category.length) {
                    this.c.classList.remove("accs");
                    this.kd++;
                    this.activeClick()
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 11 + this.typeList.category.length && this.kd < 11 + this.typeList.category.length + this.typeList.type.length) {
                    this.c.classList.remove("accs");
                    this.kd = 11 + this.typeList.category.length + this.typeList.type.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 11 + this.typeList.category.length + this.typeList.type.length && this.kd < 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length) {
                    this.c.classList.remove("accs");
                    this.kd = 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length && this.kd < 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
                    this.c.classList.remove("accs");
                    this.kd = 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 11 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length && this.kd <=
                    13 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length) {
                    this.c.classList.remove("accs");
                    this.kd = 14 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd >= 14 + this.typeList.category.length + this.typeList.type.length + this.typeList.region.length + this.typeList.year.length && this.kd <= c) {
                    this.c.classList.remove("accs");
                    this.kd = this.kd + 6;
                    if (this.kd > c) {
                        this.kd = c
                    }
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                }
            }
            if (this.index == 1) {
                if (this.keyword == "" && this.kd > 12 + this.list.length) {
                    this.c.classList.remove("accs");
                    this.kd = this.kd + 2;
                    if (this.kd > 12 + this.list.length + this.hotlist.length) {
                        this.kd = this.list.length + this.hotlist.length + 12;
                    }
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return;
                }
                if (this.kd < 10) {
                    this.c.classList.remove("accs");
                    this.kd = 11;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    return
                } else if (this.kd > 10 && this.kd <= 12) {
                    this.c.classList.remove("accs");
                    this.kd = 13;
                    this.c = document.getElementById(this.kd);
                    if (this.kd == 13) {
                        this.c.classList.add("active");
                    }
                    this.c.classList.add("accs");
                } else if (this.kd > 12 && this.kd < 10 + this.list.length - 3) {
                    this.c.classList.remove("active");
                    this.c.classList.remove("accs");
                    this.kd = this.kd + 6;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                    this.c.classList.add("active");
                } else if (
                    this.kd > 12 + this.list.length &&
                    this.kd < 12 + this.list.length + this.hotlist.length
                ) {
                    this.c.classList.remove("accs");
                    this.kd++;
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                } else if (this.kd > 10 + this.list.length + this.hotlist.length) {
                    this.c.classList.remove("accs");
                    this.kd = this.kd + 3;
                    if (
                        this.kd >
                        this.list.length + this.hotlist.length + 12 + this.datalist.length
                    ) {
                        this.kd =
                            this.list.length + this.hotlist.length + 12 + this.datalist.length;
                    }
                    this.c = document.getElementById(this.kd);
                    this.c.classList.add("accs");
                }
                if (this.kd > 12 + this.list.length && this.kd < 12 + this.list.length + this.hotlist.length) {
                    var el = document.getElementById(this.kd);
                    const viewPortHeight = document.getElementById("midm").clientHeight;
                    const offsetTop = el.offsetTop;
                    const scrollTop = document.getElementById("midm").scrollTop;
                    const intop = el.offsetHeight;
                    let d = offsetTop + intop < scrollTop + viewPortHeight;
                    if (d == false) {
                        document.getElementById("midm").scrollTop = offsetTop;
                    }
                }
                if (this.kd > this.list.length + this.hotlist.length) {
                    var el = document.getElementById(this.kd);
                    const viewPortHeight = document.getElementById("midr").clientHeight;
                    const offsetTop = el.offsetTop;
                    const scrollTop = document.getElementById("midr").scrollTop;
                    const intop = el.offsetHeight;
                    let d = offsetTop + intop < scrollTop + viewPortHeight;
                    if (d == false) {
                        document.getElementById("midr").scrollTop = offsetTop;
                    }
                }
            }
        },
        gologin() {
            this.$router.push({ path: "/loginPhone" });
        },
        gosearch() {
            Cookies.set('kd', this.kd)
            Cookies.set('index', this.index)
            this.$router.push({ path: "/search" });
        },
        _S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        },

        // 获取广告请求唯一ID 方式是当前时间戳+13位随机吗
        GetsingleId() {
            var _res = (this._S4() + this._S4() + '-' + this._S4() + '-' + this._S4() + '-' + this._S4() + '-' + this._S4() + this._S4() + this._S4())
            return _res
        },
        getvisit() {
            this.$http.post('visit')
        },
        getUserInfo() {
            let c = Cookies.get("token");
            if (c != undefined) {
                this.$http.get(`/user?token=${c}`).then((res) => {
                    this.userInfo = res.data.data;
                });
            }
        },
        goMore() {
            Cookies.set('kd', this.kd)
            Cookies.set('index', this.index)
            this.$router.push({ path: "/moreSuggest" });
        },
        goAll(lb, id) {
            Cookies.set('kd', this.kd)
            Cookies.set('index', this.index)
            this.$router.push({ path: "/classify", query: { lb: lb, id: id } });
        },
        getinfo() {
            this.$http.get("/recommend/homePage").then((res) => {
                this.topList = res.data.data
            });
        },
        goquit() {
            this.$store.commit("setUserinfo", {});
            this.$store.commit("setToken", "");
            Cookies.remove("userid");
            Cookies.remove("membership");
            Cookies.remove("username");
            Cookies.remove("token");
            // this.$refs.child.quit();
            // this.$router.replace("/");
            location.reload()
        },
        gosx() {
            this.index = 2;
            this.goAll()
        },
        gettv() {
            this.$http.get("/recommend/tv").then((res) => {
                this.tv = res.data.data;
            });
        },
        getfilm() {
            this.$http.get("/recommend/film").then((res) => {
                this.film = res.data.data;
            });
        },
        getvariety() {
            this.$http.get("/recommend/variety").then((res) => {
                this.variety = res.data.data;
            });
        },
        getcomic() {
            this.$http.get("/recommend/comic").then((res) => {
                this.comic = res.data.data;
            });
        },
        load() {
            this.page++;
            this.getinfosch();
        },
        changeIndex(val) {
            let d = Number(val)
            this.index = d
            switch (d) {
                // case 0: this.gosearch(); break;
                case 0: this.$router.push({ path: '/classify' }); break;
                // case 0: this.page = 1; this.getHot(); break;
                case 1: this.page = 1; this.getHot(); this.changeKD(27); break;
                // case 1: this.page = 1; this.getinshaixuanfo(); break;
                // case 1: this.$router.push({ path: '/classifyPage' }); break;
                // case 1: this.$router.push({ path: '/classify' }); break;
                // case 1: this.gosx(); break;
                case 2: this.getcoll(); break;
                case 3:Cookies.remove('kd');Cookies.remove('index'); this.$router.push({ path: '/' }); break;
                // case 4: this.getzj(); break;
                case 4:Cookies.remove('kd');Cookies.remove('index'); this.$router.push({ path: '/albumPage' }); break;
                case 5: this.getList('电视剧'); break;
                case 6: this.getList('电影'); break;
                case 7: this.getList('综艺'); break;
                case 8: this.getList('动漫'); break;
                case 9: this.getList('纪录片'); break;
            }
        },
        changeKD (num) {
            
            setTimeout(() => {
                this.kd = num
                this.c = document.getElementById(this.kd);
                if (this.c) {
                    this.c.classList.add("accs");
                }
            }, 100);
        },
        godetail(item) {
            Cookies.set('kd', this.kd)
            Cookies.set('index', this.index)
            this.$router.push({ path: "/details", query: { id: item } });
        },
        gozj() {
            Cookies.set('kd', this.kd)
            Cookies.set('index', this.index)
            this.$router.push({ path: '/albumPage' })
        },
        swiperClick(val) {
            if (val.type == 2) {
                window.location.href = val.url;
            } else {
                // this.$router.push({path:'/details',query:val})
            }
        },
        swiperChange(val) {
            this.actives = val;
            this.$refs.carousel.setActiveItem(val); // 将tab的下标指定为走马灯的下标
        },
        changeItem(e) {
            this.actives = e; // 将走马灯的 下标 指定为 tab 的下标
        },

        godetails(val) {
            Cookies.set('kd', this.kd)
            Cookies.set('index', this.index)
            this.$router.push({ path: "/details", query: { id: val.id } });
        },
        goDetails(val) {
            Cookies.set('kd', this.kd)
            Cookies.set('index', this.index)
            if (val.type == 2) {
                window.location.href = val.url;
            } else {
                this.$router.push({ path: "/details", query: { id: val.videoId } });
            }
            // this.$router.push({ path: "/details" });
        },
    },
};
</script>
<style lang="scss">
.home {

    .el-input--prefix .el-input__inner {
        padding-left: 43px;
    }

    .el-input__icon {
        font-size: 25px;
        line-height: 35px;
    }

    .el-input__inner {
        border-radius: 30px;
        background: #efefef;
        border: none;
        color: #303030;
        font-size: 20px;
        height: 35px;
    }

    .el-input__inner {
        border-radius: 20px;
        background: #efefef;
    }

    .el-image {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }

    .el-carousel,
    .el-carousel__container {
        height: 100%;
    }

    .el-carousel__indicators--labels li {
        height: 66px;
        line-height: 66px;
        text-align: left;
        background: url("../assets/swbg.png") no-repeat center;
    }

    .el-carousel__indicators--labels li button {
        display: inline-block;
        background: transparent;
        font-size: 28px;
        color: #fff;
    }

    .el-carousel__indicators--vertical {
        bottom: 0%;
        top: auto;

        .el-carousel__button {
            width: auto;
            height: auto;
        }
    }
}

@media screen and (max-width: 1280px) {
    .el-input__inner {
        padding-left: 28px !important;
        font-size: 14px !important;
        line-height: 50px !important;
        padding-right: 5px !important;
    }

    .el-input__icon {
        font-size: 18px !important;
        line-height: 20px !important;
    }
}
</style>
<style lang="scss" scoped>
.contain {
    width: 100%;
}

.el-col {
    border-radius: 4px;
}

.login {
    color: #8989ae;
    margin-top: 10px;
    background: #1d1d45;
    width: 90px;
    height: 40px;
    line-height: 40px;
    letter-spacing: 2px;
    border-radius: 20px;
    text-align: center;
    font-size: 14px;

    img {
        width: 17px;
        height: 17px;
        vertical-align: text-bottom;
        margin-right: 2px;
    }
}

.typeNavBar {
    display: flex;
    // padding: 15px 0 30px 0;
    padding: 15px 0 10px 0;

    .tnr {
        margin-right: 39px;
    }

    .tnl {
        // align-items: center;
        display: flex;
        // width: 68%;
        width: 100%;
        overflow-x: scroll;
        position: relative;
        height: 40px;
        padding: 6px 5px;
        margin-top: 2px;
    }

    .arrowdown {
        width: 28px;
        height: 28px;
    }

    span:not(:first-of-type) {
        margin-left: 21px;
    }

    span {
        padding: 0px 20px;
        text-align: center;
        cursor: pointer;
        color: #333;
        font-size: 28px;
        white-space: nowrap;
        border-radius: 40px !important;
        // padding: 0 !important;
        box-shadow: none;
        border: none;
    }

    img {
        width: 40px;
        height: 37px;
    }
}

.top-suggest {
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    justify-content: space-between;
}

.max-suggest {
    position: relative;
    // width: 855px;
    width: 48%;
    // height: 494px;
    margin-left: 20px;

    img {
        height: 100%;
    }
}

.mid-suggest {
    position: relative;
    width: 24%;

    // height: 494px;
    // margin: 0 30px;
    img {
        height: 100%;
    }
}

.right-box {
    width: 23.7%;
}

.right-suggest {
    position: relative;
    // width: 24%;
    // height: 232px;
}

.right-suggest2 {
    margin-top: 30px;
}

.active {
    color: #fff !important;
    background: linear-gradient(140deg, #FE9D3E, #FF4330) !important;
    padding: 7px 15px;
    outline: none !important;
    border-radius: 40px;
    // border: none !important;
}

.movieList {
    display: flex;
    flex-wrap: wrap;
    // justify-content: center;
    justify-content: space-between;
    margin-top: 10px;
    width: 100%;

    .movie {
        position: relative;
        // height: 232px;
        width: 24.66%;
        // margin-left: 20px;
    }
}

.imgvip {
    width: 76px;
    height: 36px;
    position: absolute;
    top: 0;
    right: 0;
}

.introduce {
    position: absolute;
    bottom: 0%;

    // background: linear-gradient(0deg, rgba(#000, 0.5), rgba(#333, 0));
    // span {
    //   font-size: 12px;
    // }

    background: rgba($color: #202020, $alpha: 0.7);
    text-align: center;
    height: 4vh;
    line-height: 4vh;
    left: 0;
    width: 100%;
    border-radius: 0 0 10px 10px;

    .i1 {
        font-size: 18px;
        color: #fff;
        padding: 18pt;
    }

    .i2 {
        font-size: 24px;
        color: #fff;
    }
}

.guomanbox {
    display: flex;
    justify-content: center;
}

.moviefirst {
    background: url("../assets/sybg.png") no-repeat center;
    background-size: cover;
    border-radius: 10px;
    margin-left: 20px;

    .mft {
        color: #fff;
        font-size: 28px;
        padding: 35px 0 16px 30px;
    }

    .mfst {
        font-size: 24px;
        color: #9a96bc;
        padding: 0 30px;
    }
}

.swiperTitleBox {
    position: absolute;
    bottom: 0;
    z-index: 999;
    width: 100%;
}

.swiperTitle {
    height: 66px;
    line-height: 66px;
    text-align: left;
    background: url("../assets/swbg.png") no-repeat center;
    background-size: 100% 100%;
    font-size: 28px;
    color: #9a96bc;
    padding-left: 25px;
    cursor: pointer;
}

.activeSwiper {
    color: #fff;
}

.s1,
.s2,
.s3 {
    font-size: 40px;
    padding-right: 1%;
    vertical-align: middle;
}

.s1 {
    color: #ffde05;
}

.s2 {
    color: #33cd9c;
}

.s3 {
    color: #ffffff;
}

.ml20 {
    margin-left: 20px;
}

// @media screen and (max-width: 1280px) {
//   .typeNavBar span {
//     font-size: 24px;
//     padding: 7px 15px;
//   }

//   .typeNavBar {
//     .arrowdown {
//       width: 20px;
//       height: 20px;
//     }
//   }
// }

.spimg {
    width: 49%;

    .el-image {
        border-radius: 10px 0 0 10px;
    }
}

.spimg2 {
    width: 49%;

    .el-image {
        border-radius: 0 10px 10px 0;
    }
}

.hotput {
    display: flex;
    justify-content: space-between;

    .history {
        width: 23%;
        position: relative;
        margin-right: 2%;
        display: flex;
        flex-flow: column nowrap;

        .hisbg {
            position: absolute;
            right: 0;
            bottom: 0;

            .el-icon-time {
                color: #fff;
                font-size: 250px;
            }
        }

        .hist {
            position: relative;
            min-height: 180px;
            background: #FDE7CA;
            border-radius: 5px;
            margin-bottom: 1vh;
            height: 18vh;

            .introduce {
                bottom: 0%;
                color: #fff;
                // padding-left: 10%;
                width: 100%;
            }
        }

        .hitlist {
            flex: 1;
            font-size: 17px;
            background: #f3f3f3;
            border-radius: 5px;

            p {
                padding: 8px 13px;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //用省略号显示
                white-space: nowrap; //不换行
                font-size: 22px;
            }
        }
    }

    .swiper {

        width: 50%;
    }

    .swiperbox {
        width: 25%;
    }

    .swiperr {
        background: #f3f3f3;

        .swiperrt {
            padding: 5% 0 0 7%;
            color: #464646;
            font-size: 28px;
        }

        .swiperrp {
            font-size: 22px;
            padding: 0% 2% 5% 7%;
        }
    }
}

.swiperrbox {
    // background: #FBF0E5;
}

.activesswiper {
    background: #FBF0E5;

    .swiperrt {
        color: #FE9D3E !important;
        font-size: 15px;
    }

    .swiperrp {
        color: #FE9D3E !important;
        font-size: 12px;
    }
}

.hotputBox {
    display: flex;
    display: flex;
    flex-wrap: wrap;

    .hotputBox-list {
        position: relative;
        width: 15.58%;
        margin: 6px 0.5%;

        .el-image {
            border-radius: 10px;
        }

        p {
            position: absolute;
            bottom: 0%;
            border-radius: 0 0 10px 10px;
            left: 0;
            font-size: 1rem;
            color: #fff;
            background: rgba(32, 32, 32, 0.7);
            text-align: center;
            height: 4vh;
            line-height: 4vh;
            width: 100%;
        }
    }
}

.zjtop {
    display: flex;
    justify-content: space-between;
    position: relative;

    .topb {
        width: 49.3%;
        position: relative;

        p {
            position: absolute;
            bottom: 0%;
            height: 4vh;
            background: rgba($color: #202020, $alpha: 0.7);
            text-align: center;
            width: 98.9%;
            padding-left: 1.1%;
            color: #fff;
            line-height: 4vh;
            border-radius: 0px 0px 6px 6px;
            font-size: 20px;
        }
    }
}

.introduce2 {
    position: absolute;
    bottom: 0%;
    height: 4vh;
    background: rgba($color: #202020, $alpha: 0.7);
    text-align: center;
    width: 95%;
    color: #fff;
    padding-left: 5%;
    line-height: 4vh;
    border-radius: 0px 0px 10px 10px;
    font-size: 20px;
}

.htpt {
    .htptt {
        font-size: 32px;
        padding: 27px 0 12px 5px;
    }
}

.tvtop {
    display: flex;
    justify-content: space-between;

    .tvtopbox {
        position: relative;
        width: 32%;
        height: 36vh;
    }
}

.nmovie:not(:nth-child(6n+1)) {
    margin-left: 2%;
}

.nmovieList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 17px;
    width: 100%;

    p {
        font-size: 14pt;
    }
}

.h33 {
    height: 33vh;
}

.nmovie {
    position: relative;
    // height: 232px;
    // width: 14.86%;
    width: 15%;

    .introduce {
        bottom: 0%;
    }
}

.nmovie2:not(:nth-child(4n+1)) {
    margin-left: 1% !important;
}

.nmovie2 {
    position: relative;
    // height: 232px;
    width: 24.25%;

    .introduce {
        bottom: 0%;
    }
}

.typeList p:not(:nth-child(6n+1)) {
    margin-left: 22px;
}

.typeList {
    display: flex;
    justify-content: space-between;
    margin: 23px 0 0 0;
    // font-size: 14px;
    cursor: pointer;

    p {
        font-weight: bold;
        width: 15.19%;
        padding: 20px 0;
        text-align: center;
        background: #F3F3F3;
        border-radius: 10px;
    }
}

.user {
    width: 35%;
    position: relative;

    .useri {
        position: relative;
        z-index: 10;
        text-align: center;

        .ut {
            width: 140px;
            height: 140px;
            margin: auto;
        }

        .um {
            padding: 6px 0 10px 0;
            font-size: 28px;
        }

        .dlan {
            font-size: 28px;
            padding: 6px 27px;
            margin-bottom: 21px;
            background: linear-gradient(140deg, #FE9D3E, #FF4330) !important;
            border-radius: 20px;
            width: 105px;
            height: 26px;
            color: #fff;
            line-height: 26px;
        }
    }

    .userb {
        position: absolute;
        bottom: 0;
        left: 0;
        // height: 256px;
        height: 200px;
        width: 100%;
        border-radius: 10px;
        background: #FDE7CA;
    }
}

.mymovie,
.mymovie2 {
    text-align: center;
    // width: 170px !important;
}

.introducemy {
    color: #FFFFFF;
    font-size: 15px !important;
    padding-top: 0 !important;
}

.mymovie {
    background: linear-gradient(-44deg, #4F93F9, #3E7AD1);
    border-radius: 10px;

    .el-image {
        padding-top: 50%;
        width: 60px;
        height: 60px;
    }
}

.mymovie2 {
    background: linear-gradient(-44deg, #37CC68, #199B51);
    border-radius: 10px;

    .el-image {
        width: 63px;
        height: 61px;
    }
}

.introduce4 {
    position: absolute;
    background: rgb(235, 224, 214);
    height: 4vh;
    line-height: 4vh;
    left: 0;
    border-radius: 0 0 10px 10px;
    bottom: 0%;
    color: #303030;
    padding: 0 4%;
    width: 92%;
    font-size: 20px;
    display: flex;
    justify-content: space-between;

    .indl {
        color: #e42121;
        padding: 5px 20px;
        border-radius: 20px;
        background: #fff;
    }
}

.activeNav {
    color: #FE9D3E;
    background: #FBF0E5 !important;
}

.allfenlei {
    position: fixed;
    height: 100vh;
    width: 16.66667%;
    background: #fff;
    border-radius: 10px;

    // top: 0%;
    button:first-of-type {
        border-radius: 10px 10px 0 0;
    }

    button {
        display: block;
        background: transparent;
        border: none;
        width: 100%;
        font-size: 24px;
        padding: 19px 0;
        box-shadow: none;
    }
}

.rightbox {
    min-height: 93vh;
    margin: 0 29px;

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

                .accs {
                    // outline: 4px solid rgba(239, 70, 4, 0.7098039216) !important;
                }

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
                    box-shadow: none;

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

    .list:nth-child(n+7) {
        margin-top: 10px;
    }

    .list {
        position: relative;
        // width: 14.75%;
        width: 15%;

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

}

.searchIndex {

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
                padding-top: 0px;
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
                padding: 15px 0;
                justify-content: center;

                button {
                    border-radius: 10px;
                    border: none;
                    color: #303030;
                    background: transparent;
                    font-size: 20px;
                    padding: 16px 26px;
                    font-weight: bold;
                    box-shadow: none;
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
                    margin: 10px 0%;
                    width: 16.666%;
                    text-align: center;
                    cursor: pointer;
                    font-weight: bold;
                    box-shadow: none;
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
        width: 85%;
        margin: auto;
        box-shadow: none;
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

            .image-slot {
                height: 100%
            }
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
        padding-top: 2%;
    }

    .midanobox {
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        padding: 10px 0 10px 10%;

        .mblist {
            width: 46%;
            font-size: 32px;
            color: #232222;
            // margin-top: 10px;
            margin-right: 2%;

            div {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                box-shadow: none;
                max-width: 100%;
            }

            .sl {}

            .diana {
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

@media screen and (max-width: 1280px) {
    .searchIndex .mid .midl .jianpan button {
        font-size: 20px;
    }

    .midr .dzs {
        font-size: 26px;
        color: #303030;
        text-align: left;
        padding-bottom: 5px;
    }

    .midm .mtit {
        font-size: 26px;
        color: #303030;
        text-align: center;
        padding-bottom: 5px;
    }

    .midm button {
        background: transparent;
        border: none;
        color: #303030;
        font-size: 24px;
        width: 98%;
        height: 90px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .opeater {
        button {
            padding: 8px 13px !important;
        }
    }

    .midano .dzs {
        font-size: 24px;
        color: #232222;
        padding-left: 6%;
        padding-top: 2%;
    }

    .midano .midanobox .mblist {
        font-size: 20px;
    }

    .user {
        .useri {
            .um {
                font-size: 14px;
            }

            .dlan {
                font-size: 14px;
                width: 57px;
            }

            .ut {
                width: 70px;
                height: 70px;

                .el-image {
                    width: 70px !important;
                    height: 70px !important;
                }

            }
        }

        .userb {
            height: 140px;
        }
    }

    .retui {
        .nmovieList {
            min-height: 170px !important;
            margin-top: 0;

            .mymovie {
                .el-image {
                    padding-top: 30%;
                }
            }
        }
    }

    .htptt {
        padding: 8px 0 6px 5px !important;
    }
}

//720p over
</style>