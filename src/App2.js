import { Lightning } from '@lightningjs/sdk';
import { List } from '@lightningjs/ui';
import { fetchData, fetchNextPage } from './api';

export default class App2 extends Lightning.Component {
  static _template() {
    return {
      Background: {
        w: 1920,
        h: 1080,
        color: 0xfffbb03b,
        /*src: Utils.asset('images/background.png'),*/
      },
      List: {
        x: 200,
        y: 200,
        w: 1500,
        type: List,
        spacing: 50,
        enableRequests: true,
        /*signals: {
          onRequestItems: true,
        },*/
      },
    };
  }

  async _init() {
    const movies = await fetchData();
    const elements = movies.map((m) => ({
      type: Button,
      title: m.title,
    }));
    console.log('... adding initial elements');
    this.tag('List').add(elements);
  }

  _getFocused() {
    return this.tag('List');
  }

  async onRequestItems() {
    console.log('... requesting new items');
    const movies = fetchNextPage();
    return movies.map((m) => ({
      type: Button,
      title: m.title,
    }));
  }
}

class Button extends Lightning.Component {
  static get height() {
    return 200;
  }

  static get width() {
    return 350;
  }

  static _template() {
    return {
      rect: true,
      color: 0xff000000,
      Text: {
        x: (w) => w / 2,
        y: (h) => h / 2,
        mount: 0.5,
        text: {
          textAlign: 'center',
          text: this.bindProp('title'),
        },
      },
    };
  }

  _init() {
    console.log('Button created');
  }

  _focus() {
    this.patch({
      color: 0xff888888,
    });
  }

  _unfocus() {
    this.patch({
      color: 0xff000000,
    });
  }
}
