from pyramid.view import view_config


@view_config(route_name='home', renderer='feature_flag_demo:templates/mytemplate.jinja2')
def my_view(request):
    return {'project': 'feature_flag_demo'}
