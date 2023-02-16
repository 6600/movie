<template>
    <div :class="keyboardClass"></div>
  </template>
  
  <script>
  import Keyboard from "simple-keyboard";
  import "simple-keyboard/build/css/index.css";
  
  export default {
    name: "SimpleKeyboard",
    props: {
      keyboardClass: {
        default: "simple-keyboard",
        type: String,
      },
      input: {
        type: String,
      },
    },
    data: () => ({
      keyboard: null,
    }),
    mounted() {
      this.keyboard = new Keyboard(this.keyboardClass, {
        onChange: this.onChange,
        onKeyPress: this.onKeyPress,
      });
      this.setKeyboard();
    },
    methods: {
      onChange(input) {
        this.$emit("onChange", input);
      },
      onKeyPress(button) {
        this.$emit("onKeyPress", button);
      },
      setKeyboard() {
        this.keyboard.setOptions({
          layoutName: "default",
          theme: "hg-theme-default hg-layout-default myTheme",
          layout: {
            default: [
              "1 2 3 4 5 6 7 8 9 0",
              "Q W E R T Y U I O P",
              "A S D F G H J K L",
              "{bksp} Z X C V B N M {enter}",
            ],
          },
          buttonTheme: [
            {
              class: "bksp",
              buttons: "{bksp}",
            },
            {
              class: "enter",
              buttons: "{enter}",
            },
          ],
          display: {
            "{bksp}": "删除",
            "{enter}": "确认",
          },
        });
      },
    },
    watch: {
      input(input) {
        this.keyboard.setInput(input);
      },
    },
  };
  </script>
  <style>
  .simple-keyboard {
    max-width: 850px;
    padding: 15px;
    margin: 0 auto;
    /* margin-top: 380px; */
    box-shadow: 0 4px 0 #b2b2b2, 0 7px 16px rgba(0, 0, 0, 0.6);
  }
  
  .hg-theme-default .hg-button.hg-standardBtn {
    height: 50px;
    margin: 8px 10px;
    font-size: 23px;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    -webkit-box-shadow: 0 4px 0 #b2b2b2, 0 5px 10px rgba(0, 0, 0, 0.7);
    box-shadow: 0 3px 0 #b2b2b2, 0 4px 6px rgba(0, 0, 0, 0.7);
  }
  
  .hg-theme-default .hg-button.hg-standardBtn:active {
    box-shadow: 0 4px 0 #717070, 0 5px 3px rgba(0, 0, 0, 0.9);
    background-color: #efefef;
  }
  
  .simple-keyboard.hg-layout-default .hg-button.bksp {
    height: 50px;
    margin: 8px 10px;
    font-size: 23px;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    -webkit-box-shadow: 0 4px 0 #b2b2b2, 0 5px 10px rgba(0, 0, 0, 0.7);
    box-shadow: 0 3px 0 #b2b2b2, 0 4px 6px rgba(0, 0, 0, 0.7);
    background: #a8001e;
    color: white;
  }
  
  .simple-keyboard.hg-layout-default .hg-button.bksp:active {
    box-shadow: 0 4px 0 #717070, 0 5px 3px rgba(0, 0, 0, 0.9);
    background-color: #efefef;
    color: #000000;
  }
  
  .simple-keyboard.hg-layout-default .hg-button.enter {
    height: 50px;
    margin: 8px 10px;
    font-size: 23px;
    background-color: #fff;
    border-radius: 8px;
    cursor: pointer;
    -webkit-box-shadow: 0 4px 0 #b2b2b2, 0 5px 10px rgba(0, 0, 0, 0.7);
    box-shadow: 0 3px 0 #b2b2b2, 0 4px 6px rgba(0, 0, 0, 0.7);
    background: #a8001e;
    color: white;
  }
  
  .simple-keyboard.hg-layout-default .hg-button.enter:active {
    box-shadow: 0 4px 0 #717070, 0 5px 3px rgba(0, 0, 0, 0.9);
    background-color: #efefef;
    color: #000000;
  }
  </style>