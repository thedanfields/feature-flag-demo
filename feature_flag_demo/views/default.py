from pyramid.view import view_config
from appconfig_helper import AppConfigHelper

# #1234postgres1234
# aws_app_config = AppConfigHelper(
#     "ApiAppConfig",
#     "production",
#     "ff-flag",
#     15  # minimum interval between update checks
# )

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


@view_config(route_name='home', renderer='feature_flag_demo:templates/mytemplate.jinja2')
def my_view(request):

    # if aws_app_config.update_config():
    #     print("new config received")

    return {'project': 'feature_flag_demo',
            # 'aws_app_config': aws_app_config.config
            'flags': {
                'unleashed': {
                    "initialized": unleash_client.is_initialized,
                    "demo_test": unleash_client.is_enabled("demo_test"),
                    "demo_release": unleash_client.is_enabled("demo_release"),
                    "wat": unleash_client.is_enabled("wat")
                }
            }

    }
