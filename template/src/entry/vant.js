// ------------------------------------------------------------------------------
// name: ui
// author: mudas( mschool.tech )
// created: 2019.10.02 下午 16:47
// ------------------------------------------------------------------------------
import Vue from 'vue';
import {
  // layout
  Row,
  Col,

  // base
  Icon,
  Button,
  Image,
  Cell,
  CellGroup,
  Popup,

  // show
  Swipe,
  SwipeItem,
  List,
  NoticeBar,
  Lazyload,
  Sticky,
  CountDown,
  Panel,
  Step,
  Steps,

  // feedback
  Loading,
  Toast,
  Notify,
  Dialog,
  DropdownMenu,
  DropdownItem,

  // Nav
  Grid,
  GridItem,
  Tab,
  Tabs,

  // form
  Field,
  Rate,
  Search,
  Switch,
  DatetimePicker,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Tag
} from 'vant';

// layout
Vue.use(Row);
Vue.use(Col);

// base
Vue.use(Icon);
Vue.use(Image);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Button);
Vue.use(Popup);

// show
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(List);
Vue.use(NoticeBar);
Vue.use(Lazyload);
Vue.use(Sticky);
Vue.use(CountDown);
Vue.use(Panel);
Vue.use(Step);
Vue.use(Steps);

// feedback
Vue.use(Loading);
Vue.use(Toast);
Vue.use(Notify);
Vue.use(Dialog);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);

Vue.toast = Toast;
Vue.notify = Notify;
Vue.dialog = Dialog;

// Nav
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Tab);
Vue.use(Tabs);

// form
Vue.use(Field);
Vue.use(Rate);
Vue.use(Search);
Vue.use(Switch);
Vue.use(DatetimePicker);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Tag);

// 顶部提示信息公共配置
Notify.setDefaultOptions({ duration: 2500 });
