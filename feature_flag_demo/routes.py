def includeme(config):
    config.add_static_view('static', 'static')
    config.add_static_view('javascript', 'javascript')
    config.add_route('home', '/')
    config.add_route('get_feature_flags', '/api/feature_flags')
