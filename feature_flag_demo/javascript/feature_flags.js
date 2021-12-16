class FeatureFlags {
  constructor(flags, flag_refresh_callback) {
    this.flag_refresh_callback = flag_refresh_callback;
    this.setup(flags, this.flag_refresh_callback);
    const self = this;
    setInterval(function() { self.refresh_flags(self.flag_refresh_callback) }, 1_000 * 20)
  }

  get current_flags() {
    return this.flags;
  }

  refresh_flags(flag_refresh_callback) {
    this.get_flags()
        .then(flags => this.setup(flags, flag_refresh_callback))
  }

  async get_flags() {
    const response = await fetch('/api/feature_flags')
    const json = await response.json()
    return response.ok ? json : Promise.reject(json);
  }

  setup(flags, flag_refresh_callback) {
    this.flags = flags;
    this.render(flags)
    flag_refresh_callback(flags);
    console.log(`loaded flags ${ JSON.stringify(flags)} `)
  }

  render(flags) {
    const flag_info = []
    for (const flag_source in flags) {
      flag_info.push(this.generate_table(flag_source, this.flags[flag_source]))
    }

    const flag_list = this.generate_list(flag_info)
    $('#feature-flags').html(flag_list)
  }

  generate_list(flag_info) {
    const html = ` ${ flag_info.map(f => `<div>${ f }</div>`).join('') } `
    return html
  }

  generate_table(flag_source, flags) {
    const title = `<div>${flag_source}</div>`;

    const list_items = []
    for (const flag in flags) {
      const name = flag;
      const value = flags[flag];
      const label_class = value === true ? 'success' : 'danger'
      list_items.push(`<li> <span class="label label-${ label_class }">${ name } </span> </li>`)
    }

    const html = ` ${title} <ul class="list-unstyled"> ${ list_items.join('') } </ul>`
    return html
  }


}