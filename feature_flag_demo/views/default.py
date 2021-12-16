from pyramid.response import Response
from pyramid.view import view_config
from appconfig_helper import AppConfigHelper


aws_app_config = AppConfigHelper(
    "ApiAppConfig",
    "demo",
    "demo",
    15  # minimum interval between update checks
)

from UnleashClient import UnleashClient
from configparser import ConfigParser

config = ConfigParser()
config.read('feature_flag_config.ini')

unleash_client = UnleashClient(
    url=config.get('unleashed', 'endpoint'),
    app_name="feature_flag_demo",
    environment=config.get('unleashed', 'environment'),
    custom_headers={'Authorization': config.get('unleashed', 'api_secret_key')})


unleash_client.initialize_client()

import ldclient
from ldclient.config import Config

ldclient.set_config(Config(config.get('launch_darkly', 'sdk_key')))


def _get_flags():
    if aws_app_config.update_config():
        print("new config received")

    aws_config_remapped = {k: aws_app_config.config[k]["enabled"] for k in aws_app_config.config}
    launch_darkly_client = ldclient.get()

    return {
        'aws_app_config': aws_config_remapped,
        'launch_darkly': {
            "extra_pepper": launch_darkly_client.variation("extra_pepper", {"key": "user@test.com"}, False),
            "extra_avocado": launch_darkly_client.variation("extra_avocado", {"key": "user@test.com"}, False)
        },
        'unleashed': {
            "protein_add_nopal": unleash_client.is_enabled("protein_add_nopal"),
            "protein_add_cricket": unleash_client.is_enabled("protein_add_cricket"),
            "protein_add_fish": unleash_client.is_enabled("protein_add_fish")
        }
    }


@view_config(route_name='home', renderer='feature_flag_demo:templates/mytemplate.jinja2')
def my_view(request):



    return {
        'flags': _get_flags()
    }


@view_config(route_name='get_feature_flags', renderer='json')
def get_feature_flags(context, request):
    return _get_flags()
