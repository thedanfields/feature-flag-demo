class MyTemplate {
  constructor(app) {

    this._taco_options = new TacoOptions()
    this._flags = new FeatureFlags(app.flags, (flags) => this._taco_options.render(flags))
  }

  get flags() {
    return this._flags;
  }

  render() {
    this._taco_options.render();
  }

  order() {
    const order = this._taco_options.order();
    console.log('ordered')
    return order;
  }
}